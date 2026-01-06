import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(req: Request) {
  const u = new URL(req.url);
  const days = Math.max(1, Math.min(90, Number(u.searchParams.get("days") ?? 28)));

  try {
    const sb = supabaseServer();

    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await sb
      .from("campaign_metrics")
      .select("impressions, clicks, cost, revenue, conversions, created_at")
      .gte("created_at", since)
      .order("created_at", { ascending: true });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    const rows = data ?? [];
    const sum = rows.reduce(
      (a, r: any) => {
        a.impressions += Number(r.impressions ?? 0);
        a.clicks += Number(r.clicks ?? 0);
        a.cost += Number(r.cost ?? 0);
        a.revenue += Number(r.revenue ?? 0);
        a.conversions += Number(r.conversions ?? 0);
        return a;
      },
      { impressions: 0, clicks: 0, cost: 0, revenue: 0, conversions: 0 }
    );

    const ctr = sum.impressions > 0 ? (sum.clicks / sum.impressions) * 100 : 0;
    const cpc = sum.clicks > 0 ? sum.cost / sum.clicks : 0;
    const roas = sum.cost > 0 ? sum.revenue / sum.cost : 0;

    return NextResponse.json({
      ok: true,
      windowDays: days,
      kpi: {
        impressions: sum.impressions,
        clicks: sum.clicks,
        ctr,
        cost: sum.cost,
        cpc,
        revenue: sum.revenue,
        roas,
        conversions: sum.conversions,
      },
      rows: rows.length,
      ts: new Date().toISOString(),
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "unknown" }, { status: 500 });
  }
}
