import { NextResponse } from "next/server";

type AdEventRow = {
  event_type: string;
  value: number | null;
};

function requireSupabaseEnv() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anon) {
    return { ok: false as const, missing: {
      NEXT_PUBLIC_SUPABASE_URL: !supabaseUrl,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !anon
    }};
  }
  return { ok: true as const, supabaseUrl, anon };
}

export async function GET() {
  try {
    const env = requireSupabaseEnv();
    if (!env.ok) {
      return NextResponse.json(
        { ok: false, error: "Missing Supabase env vars", missing: env.missing },
        { status: 500 }
      );
    }

    const url = new URL(`${env.supabaseUrl}/rest/v1/ad_events`);
    url.searchParams.set("select", "event_type,value");
    url.searchParams.set("order", "created_at.desc");
    url.searchParams.set("limit", "500"); // safe default

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        apikey: env.anon,
        Authorization: `Bearer ${env.anon}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const text = await res.text();
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "Supabase request failed", status: res.status, body: text.slice(0, 2000) },
        { status: 500 }
      );
    }

    let rows: AdEventRow[] = [];
    try {
      rows = JSON.parse(text) as AdEventRow[];
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON from Supabase", body: text.slice(0, 2000) },
        { status: 500 }
      );
    }

    // Aggregate totals by event_type
    const totals: Record<string, number> = {};
    for (const r of rows) {
      const k = String(r.event_type || "unknown");
      const v = Number(r.value ?? 0);
      totals[k] = (totals[k] ?? 0) + (Number.isFinite(v) ? v : 0);
    }

    return NextResponse.json({
      ok: true,
      count: rows.length,
      totals,
      rows,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
