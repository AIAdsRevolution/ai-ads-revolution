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
  const adGroupId = url.searchParams.get("adGroupId");

  if (!adGroupId || !/^\d+$/.test(adGroupId)) {
    return NextResponse.json({ ok: false, error: "Missing/invalid adGroupId" }, { status: 400 });
  }

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

  const query = `
    SELECT
      ad_group_ad.resource_name,
      ad_group_ad.status,
      ad_group_ad.ad.id,
      ad_group_ad.ad.type,
      ad_group.id,
      ad_group.name
    FROM ad_group_ad
    WHERE ad_group.id = ${adGroupId}
    ORDER BY ad_group_ad.ad.id DESC
    LIMIT 20
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
    resourceName: x.adGroupAd?.resourceName,
    status: x.adGroupAd?.status,
    adId: x.adGroupAd?.ad?.id,
    adType: x.adGroupAd?.ad?.type,
    adGroupId: x.adGroup?.id,
    adGroupName: x.adGroup?.name,
  }));

  return NextResponse.json({ ok: true, customerId: CUSTOMER_ID, items });
}
