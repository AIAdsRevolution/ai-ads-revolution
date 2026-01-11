import { NextResponse } from "next/server";

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export async function GET() {
  const env = process.env;
  const CLIENT_ID = env.GOOGLE_ADS_CLIENT_ID;
  const CLIENT_SECRET = env.GOOGLE_ADS_CLIENT_SECRET;
  const REFRESH_TOKEN = env.GOOGLE_ADS_REFRESH_TOKEN;
  const DEV_TOKEN = env.GOOGLE_ADS_DEVELOPER_TOKEN;
  const CUSTOMER_ID = env.GOOGLE_ADS_CUSTOMER_ID;
  const LOGIN_CUSTOMER_ID = env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;

  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN || !DEV_TOKEN || !CUSTOMER_ID || !LOGIN_CUSTOMER_ID) {
    return NextResponse.json({ ok: false, error: "Missing env vars" }, { status: 500 });
  }

  // OAuth
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });

  const tokenJson: any = await tokenRes.json();
  if (!tokenRes.ok) return NextResponse.json({ ok: false, step: "oauth_token", tokenJson }, { status: 500 });

  const accessToken = tokenJson.access_token as string;

  // Range last 28 days
  const end = new Date();
  const start = new Date(Date.now() - 27 * 24 * 60 * 60 * 1000);

  const gaql =
    "SELECT " +
    "campaign.id, campaign.name, campaign.status, " +
    "metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions, metrics.conversions_value " +
    "FROM campaign " +
    "WHERE segments.date BETWEEN '" + isoDate(start) + "' AND '" + isoDate(end) + "' " +
    "LIMIT 50";

  const apiUrl =
    "https://googleads.googleapis.com/v22/customers/" +
    CUSTOMER_ID +
    "/googleAds:searchStream";

  const adsRes = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "developer-token": DEV_TOKEN,
      "login-customer-id": LOGIN_CUSTOMER_ID,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: gaql }),
  });

  const text = await adsRes.text();
  if (!adsRes.ok) return NextResponse.json({ ok: false, step: "googleads_api", status: adsRes.status, body: text }, { status: 500 });

  const parsed = JSON.parse(text);
  const rows = Array.isArray(parsed) ? parsed.flatMap((c: any) => c.results ?? []) : [];

  const campaigns = rows.map((r: any) => {
    const impressions = Number(r.metrics?.impressions ?? 0);
    const clicks = Number(r.metrics?.clicks ?? 0);
    const costEUR = Number(r.metrics?.costMicros ?? 0) / 1_000_000;
    const conversions = Number(r.metrics?.conversions ?? 0);
    const convValue = Number(r.metrics?.conversionsValue ?? 0);

    const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
    const cpc = clicks > 0 ? costEUR / clicks : 0;
    const roas = costEUR > 0 ? convValue / costEUR : 0;

    return {
      id: r.campaign?.id,
      name: r.campaign?.name,
      status: r.campaign?.status,
      impressions,
      clicks,
      costEUR,
      ctr,
      cpc,
      conversions,
      convValue,
      roas,
    };
  });

  return NextResponse.json({
    ok: true,
    apiVersion: "v22",
    customerId: CUSTOMER_ID,
    loginCustomerId: LOGIN_CUSTOMER_ID,
    range: { start: isoDate(start), end: isoDate(end) },
    campaignsCount: campaigns.length,
    campaigns,
  });
}
