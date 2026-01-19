import { NextResponse } from "next/server";

export async function POST() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = `${baseUrl}/api/google/callback`;
  const scope = encodeURIComponent("https://www.googleapis.com/auth/adwords");
  const state = "aiadsrevolution_googleads";

  if (!clientId) return NextResponse.json({ ok: false, error: "Missing GOOGLE_CLIENT_ID" }, { status: 500 });

  const url =
    "https://accounts.google.com/o/oauth2/v2/auth" +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code` +
    `&scope=${scope}` +
    `&access_type=offline` +
    `&prompt=consent` +
    `&state=${encodeURIComponent(state)}`;

  return NextResponse.json({ ok: true, url });
}
