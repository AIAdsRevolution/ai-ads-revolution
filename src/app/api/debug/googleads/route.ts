import { NextResponse } from "next/server";

function mask(v?: string) {
  const s = (v || "").trim();
  if (!s) return null;
  return { len: s.length, tail: s.slice(-6) };
}

export async function GET() {
  // ✅ Blocca in produzione
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  const env = process.env;
  return NextResponse.json({
    ok: true,
    GOOGLE_ADS_CLIENT_ID: mask(env.GOOGLE_ADS_CLIENT_ID),
    GOOGLE_ADS_CLIENT_SECRET: mask(env.GOOGLE_ADS_CLIENT_SECRET),
    GOOGLE_ADS_REFRESH_TOKEN: mask(env.GOOGLE_ADS_REFRESH_TOKEN),
    GOOGLE_ADS_DEVELOPER_TOKEN: mask(env.GOOGLE_ADS_DEVELOPER_TOKEN),
    GOOGLE_ADS_CUSTOMER_ID: mask(env.GOOGLE_ADS_CUSTOMER_ID),
    GOOGLE_ADS_LOGIN_CUSTOMER_ID: mask(env.GOOGLE_ADS_LOGIN_CUSTOMER_ID),
  });
}
