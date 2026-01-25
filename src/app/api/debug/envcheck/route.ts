import { NextResponse } from "next/server";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ ok: false }, { status: 404 });
  }
  const has = (k: string) => !!(process.env[k] || "").trim();
  return NextResponse.json({
    ok: true,
    OPENAI_API_KEY: has("OPENAI_API_KEY"),
    AI_CORE_URL: has("AI_CORE_URL"),
    GOOGLE_ADS_CLIENT_ID: has("GOOGLE_ADS_CLIENT_ID"),
    GOOGLE_ADS_CLIENT_SECRET: has("GOOGLE_ADS_CLIENT_SECRET"),
    GOOGLE_ADS_REFRESH_TOKEN: has("GOOGLE_ADS_REFRESH_TOKEN"),
    STRIPE_SECRET_KEY: has("STRIPE_SECRET_KEY"),
    STRIPE_PRICE_BASIC: has("STRIPE_PRICE_BASIC") || has("STRIPE_BASIC_PRICE_ID"),
  });
}
