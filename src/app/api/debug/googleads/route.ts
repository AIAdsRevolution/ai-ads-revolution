import { NextResponse } from "next/server";

function mask(v?: string) {
  if (!v) return null;
  const s = v.trim();
  return {
    len: s.length,
    tail: s.slice(-6),
    head: s.slice(0, 6),
  };
}

export async function GET() {
  const adsId = process.env.GOOGLE_ADS_CLIENT_ID;
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const refresh = process.env.GOOGLE_ADS_REFRESH_TOKEN;

  return NextResponse.json({
    ok: true,
    GOOGLE_ADS_CLIENT_ID: mask(adsId),
    GOOGLE_CLIENT_ID: mask(clientId),
    hasRefresh: Boolean(refresh && refresh.trim().length > 20),
  });
}

