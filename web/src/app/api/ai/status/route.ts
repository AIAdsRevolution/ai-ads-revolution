import { NextResponse } from "next/server";
import { buildAiStatus } from "../../../../lib/ai/neuralBaseline";
import { supabaseServer } from "../../../../lib/supabaseServer";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const days = Math.max(2, Math.min(90, Number(url.searchParams.get("days") || 28)));
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    const sb = supabaseServer();
    const { data, error } = await sb
      .from("campaign_metrics")
      .select("date, impressions, clicks, cost, revenue, conversions")
      .gte("date", since)
      .order("date", { ascending: true });

    if (error) return NextResponse.json({ ok:false, error: error.message }, { status: 500 });

    const rows = data?.length ?? 0;
    const sum = (data || []).reduce(
      (a: any, r: any) => {
        a.impressions += Number(r.impressions || 0);
        a.clicks += Number(r.clicks || 0);
        a.cost += Number(r.cost || 0);
        a.revenue += Number(r.revenue || 0);
        a.conversions += Number(r.conversions || 0);
        return a;
      },
      { impressions: 0, clicks: 0, cost: 0, revenue: 0, conversions: 0 }
    );

    const ctr = sum.impressions > 0 ? (sum.clicks / sum.impressions) * 100 : 0;
    const cpc = sum.clicks > 0 ? sum.cost / sum.clicks : 0;
    const roas = sum.cost > 0 ? sum.revenue / sum.cost : 0;

    const kpi = { impressions: sum.impressions, clicks: sum.clicks, ctr, cost: sum.cost, cpc, revenue: sum.revenue, roas, conversions: sum.conversions };
    const ai = buildAiStatus({ windowDays: days, rows, kpi });

    return NextResponse.json({ ok: true, windowDays: days, rows, kpi, ai, ts: new Date().toISOString() });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "unknown" }, { status: 500 });
  }
}
