import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key);
}

export async function GET() {
  const sb = supabaseAdmin();
  const { data, error } = await sb
    .from("google_ads_connections")
    .select("refresh_token, customer_id, updated_at")
    .eq("id", "singleton")
    .maybeSingle();

  if (error) return NextResponse.json({ connected: false, error: error.message });

  return NextResponse.json({
    connected: !!data?.refresh_token,
    customer_id: data?.customer_id || null,
    updated_at: data?.updated_at || null,
  });
}
