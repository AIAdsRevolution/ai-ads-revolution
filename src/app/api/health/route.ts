import { NextResponse } from "next/server";

export async function GET() {
  const keys = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "STRIPE_SECRET_KEY",
    "NEXTAUTH_SECRET",
    "AI_CORE_URL",
  ];
  const missing = keys.filter((k) => !process.env[k]);

  return NextResponse.json({
    ok: missing.length === 0,
    missing,
    port: process.env.PORT ?? null,
  });
}
