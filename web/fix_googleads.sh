#!/usr/bin/env bash
set -euo pipefail

ENV_FILE="$HOME/aiadsrevolution/web/.env.local"
ROUTE_FILE="$HOME/aiadsrevolution/web/src/app/api/googleads/metrics/route.ts"

# 1) aggiorna env (senza trattini)
tmp="$(mktemp)"
grep -v '^GOOGLE_ADS_CUSTOMER_ID=' "$ENV_FILE" | grep -v '^GOOGLE_ADS_LOGIN_CUSTOMER_ID=' > "$tmp" || true
cat "$tmp" > "$ENV_FILE"
rm -f "$tmp"

echo 'GOOGLE_ADS_CUSTOMER_ID="9705373084"' >> "$ENV_FILE"
echo 'GOOGLE_ADS_LOGIN_CUSTOMER_ID="8313486354"' >> "$ENV_FILE"

# 2) scrive route.ts pulito (niente backtick)
cat > "$ROUTE_FILE" << 'EOF'
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
  const CUSTOMER_ID = env.GOOGLE_ADS_CUSTOMER_ID;            // cliente
  const LOGIN_CUSTOMER_ID = env.GOOGLE_ADS_LOGIN_CUSTOMER_ID; // MCC/manager

  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN || !DEV_TOKEN || !CUSTOMER_ID || !LOGIN_CUSTOMER_ID) {
    return NextResponse.json(
      {
        ok: false,
        error: "Missing Google Ads env vars",
        missing: {
          GOOGLE_ADS_CLIENT_ID: !CLIENT_ID,
          GOOGLE_ADS_CLIENT_SECRET: !CLIENT_SECRET,
          GOOGLE_ADS_REFRESH_TOKEN: !REFRESH_TOKEN,
          GOOGLE_ADS_DEVELOPER_TOKEN: !DEV_TOKEN,
          GOOGLE_ADS_CUSTOMER_ID: !CUSTOMER_ID,
          GOOGLE_ADS_LOGIN_CUSTOMER_ID: !LOGIN_CUSTOMER_ID,
        },
      },
      { status: 500 }
    );
  }

  // OAuth refresh_token -> access_token
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
  if (!tokenRes.ok) {
    return NextResponse.json({ ok: false, step: "oauth_token", tokenJson }, { status: 500 });
  }

  const accessToken = tokenJson.access_token as string;

  // Last 28 days via BETWEEN
  const end = new Date();
  const start = new Date(Date.now() - 27 * 24 * 60 * 60 * 1000);

  const gaql =
    "SELECT campaign.id, campaign.name, campaign.status, metrics.impressions, metrics.clicks, metrics.cost_micros " +
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

  const adsText = await adsRes.text();

  if (!adsRes.ok) {
    return NextResponse.json(
      { ok: false, step: "googleads_api", status: adsRes.status, body: adsText },
      { status: 500 }
    );
  }

  const parsed = JSON.parse(adsText);
  const rows = Array.isArray(parsed) ? parsed.flatMap((c: any) => c.results ?? []) : [];

  const campaigns = rows.map((r: any) => ({
    id: r.campaign?.id,
    name: r.campaign?.name,
    status: r.campaign?.status,
    impressions: Number(r.metrics?.impressions ?? 0),
    clicks: Number(r.metrics?.clicks ?? 0),
    costEUR: Number(r.metrics?.costMicros ?? 0) / 1_000_000,
  }));

  return NextResponse.json({
    ok: true,
    apiVersion: "v22",
    customerId: CUSTOMER_ID,
    loginCustomerId: LOGIN_CUSTOMER_ID,
    campaignsCount: campaigns.length,
    campaigns,
  });
}
EOF

echo "✅ route.ts aggiornato"
echo "✅ .env.local aggiornato (CUSTOMER + LOGIN MCC)"

# 3) restart dev server
cd "$HOME/aiadsrevolution/web"
pkill -f "next dev" >/dev/null 2>&1 || true
echo "🚀 Avvio Next su :3000..."
npm run dev -- -p 3000
