import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key);
}

export async function GET(req: Request) {
  const u = new URL(req.url);
  const code = u.searchParams.get("code");
  const error = u.searchParams.get("error");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const redirectTo = `${baseUrl}/settings/google-ads`;

  if (error) return NextResponse.redirect(`${redirectTo}?error=${encodeURIComponent(error)}`);
  if (!code) return NextResponse.redirect(`${redirectTo}?error=missing_code`);

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) return NextResponse.redirect(`${redirectTo}?error=missing_google_oauth_env`);

  const redirectUri = `${baseUrl}/api/google/callback`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  const tokenJson: any = await tokenRes.json();
  if (!tokenRes.ok) return NextResponse.redirect(`${redirectTo}?error=token_exchange_failed`);

  const refresh_token = tokenJson.refresh_token;
  if (!refresh_token) return NextResponse.redirect(`${redirectTo}?error=no_refresh_token`);

  const sb = supabaseAdmin();
  const { error: upErr } = await sb.from("google_ads_connections").upsert(
    { id: "singleton", refresh_token, updated_at: new Date().toISOString() },
    { onConflict: "id" }
  );

  if (upErr) return NextResponse.redirect(`${redirectTo}?error=supabase_save_failed`);
  return NextResponse.redirect(`${redirectTo}?connected=1`);
}
