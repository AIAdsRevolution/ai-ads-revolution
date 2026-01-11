import { NextResponse } from "next/server";

type Body = { resourceName: string; status?: "ENABLED" | "PAUSED" };

export async function POST(req: Request) {
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

  const body = (await req.json()) as Body;
  const resourceName = String(body.resourceName || "").trim();
  const status = (body.status || "ENABLED") as "ENABLED" | "PAUSED";

  if (!resourceName.startsWith("customers/")) {
    return NextResponse.json({ ok: false, error: "Invalid resourceName" }, { status: 400 });
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

  const mutateUrl = `https://googleads.googleapis.com/v22/customers/${CUSTOMER_ID}/adGroupAds:mutate`;

  const payload = {
    operations: [
      {
        update: {
          resourceName,
          status,
        },
        updateMask: "status",
      },
    ],
  };

  const r = await fetch(mutateUrl, {
    method: "POST",
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
      "developer-token": String(GOOGLE_ADS_DEVELOPER_TOKEN ?? ""),
      ...(LOGIN_CUSTOMER_ID ? { "login-customer-id": LOGIN_CUSTOMER_ID } : {}),
      "Content-Type": "application/json",
    }) as any,
    body: JSON.stringify(payload),
  });

  const t = await r.text();
  if (!r.ok) {
    return NextResponse.json(
      { ok: false, step: "mutate", status: r.status, body: t },
      { status: 500 }
    );
  }

  let parsed: any = null;
  try { parsed = JSON.parse(t); } catch { parsed = t; }

  return NextResponse.json({ ok: true, customerId: CUSTOMER_ID, updated: parsed, setStatus: status });
}
