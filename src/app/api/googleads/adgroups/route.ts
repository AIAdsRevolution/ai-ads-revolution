import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const {
    GOOGLE_ADS_CLIENT_ID,
    GOOGLE_ADS_CLIENT_SECRET,
    GOOGLE_ADS_DEVELOPER_TOKEN,
    GOOGLE_ADS_CUSTOMER_ID,
    GOOGLE_ADS_REFRESH_TOKEN,
    GOOGLE_ADS_LOGIN_CUSTOMER_ID,
  } = process.env;

  if (
    !GOOGLE_ADS_CLIENT_ID ||
    !GOOGLE_ADS_CLIENT_SECRET ||
    !GOOGLE_ADS_DEVELOPER_TOKEN ||
    !GOOGLE_ADS_CUSTOMER_ID ||
    !GOOGLE_ADS_REFRESH_TOKEN
  ) {
    return NextResponse.json(
      { ok: false, error: "Missing Google Ads env vars" },
      { status: 500 }
    );
  }

  const url = new URL(req.url);
  const campaignId = url.searchParams.get("campaignId"); // opzionale

  // refresh_token -> access_token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: GOOGLE_ADS_CLIENT_ID,
      client_secret: GOOGLE_ADS_CLIENT_SECRET,
      refresh_token: GOOGLE_ADS_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });

  const tokenJson: any = await tokenRes.json();
  if (!tokenRes.ok) {
    return NextResponse.json(
      { ok: false, step: "oauth_token", tokenJson },
      { status: 500 }
    );
  }
  const accessToken = tokenJson.access_token as string;

  const CUSTOMER_ID = String(GOOGLE_ADS_CUSTOMER_ID).replace(/-/g, "");
  const LOGIN_CUSTOMER_ID = (GOOGLE_ADS_LOGIN_CUSTOMER_ID || "").replace(/-/g, "");
  const apiUrl = `https://googleads.googleapis.com/v22/customers/${CUSTOMER_ID}/googleAds:searchStream`;

  const where = campaignId ? `WHERE campaign.id = ${campaignId}` : "";
  const query = `
    SELECT
      campaign.id,
      campaign.name,
      ad_group.id,
      ad_group.name,
      ad_group.status
    FROM ad_group
    ${where}
    ORDER BY campaign.id, ad_group.id
    LIMIT 50
  `;

  const r = await fetch(apiUrl, {
    method: "POST",
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
      "developer-token": String(GOOGLE_ADS_DEVELOPER_TOKEN ?? ""),
      ...(LOGIN_CUSTOMER_ID ? { "login-customer-id": LOGIN_CUSTOMER_ID } : {}),
      "Content-Type": "application/json",
    }) as any,
    body: JSON.stringify({ query }),
  });

  const t = await r.text();
  if (!r.ok) {
    return NextResponse.json(
      { ok: false, step: "googleads_api", status: r.status, body: t },
      { status: 500 }
    );
  }

  let parsed: any = null;
  try { parsed = JSON.parse(t); } catch { parsed = t; }

  const rows =
    Array.isArray(parsed)
      ? parsed.flatMap((chunk: any) => chunk.results ?? [])
      : [];

  const items = rows.map((x: any) => ({
    campaignId: x.campaign?.id,
    campaignName: x.campaign?.name,
    adGroupId: x.adGroup?.id,
    adGroupName: x.adGroup?.name,
    adGroupStatus: x.adGroup?.status,
  }));

  return NextResponse.json({ ok: true, customerId: CUSTOMER_ID, items });
}
