import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

function num(v: any): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export async function POST(req: Request) {
  try {
    const u = new URL(req.url);
    const days = Number(u.searchParams.get("days") || 28);
    const origin = u.origin;

    const r = await fetch(`${origin}/api/googleads/summary?days=${days}`, { cache: "no-store" });
    if (!r.ok) {
      const t = await r.text();
      return NextResponse.json({ ok: false, error: `summary ${r.status}: ${t}` }, { status: 500 });
    }

    const data: any = await r.json();
    const campaigns: any[] = Array.isArray(data?.campaigns) ? data.campaigns : [];
    if (!campaigns.length) {
      return NextResponse.json({ ok: false, error: "Nessuna campaign in /api/googleads/summary" }, { status: 400 });
    }

    const today = new Date().toISOString().slice(0, 10);
    const ts = new Date().toISOString();

    const rows = campaigns.map((c: any) => {
      const impressions = num(c.impressions ?? c.metrics?.impressions);
      const clicks = num(c.clicks ?? c.metrics?.clicks);
      const conversions = num(c.conversions ?? c.metrics?.conversions);

      const costEUR =
        (c.costEUR != null ? num(c.costEUR) :
        (c.cost_eur != null ? num(c.cost_eur) :
        (c.cost != null ? num(c.cost) :
        (c.metrics?.cost_micros != null ? num(c.metrics.cost_micros) / 1_000_000 : 0))));

      const revenueEUR =
        (c.convValue != null ? num(c.convValue) :
        (c.revenueEUR != null ? num(c.revenueEUR) :
        (c.revenue_eur != null ? num(c.revenue_eur) :
        (c.revenue != null ? num(c.revenue) :
        (c.metrics?.conversions_value != null ? num(c.metrics.conversions_value) : 0)))));

      const roas = costEUR > 0 ? revenueEUR / costEUR : 0;

      return {
        campaign_id: String(c.campaign_id ?? c.campaignId ?? c.id ?? c.campaign?.id ?? ""),
        campaign_name: String(c.campaign_name ?? c.campaignName ?? c.name ?? c.campaign?.name ?? ""),
        impressions,
        clicks,
        conversions,
        cost: costEUR,
        cost_eur: costEUR,
        revenue: revenueEUR,
        revenue_eur: revenueEUR,
        roas,
        date: today,
        ts
      };
    }).filter(x => x.campaign_id);

    const { error } = await supabase.from("campaign_metrics").insert(rows);
    if (error) {
      console.error("❌ Supabase insert error:", error);
      return NextResponse.json({ ok: false, error }, { status: 500 });
    }

    return NextResponse.json({ ok: true, inserted: rows.length, date: today });
  } catch (e) {
    console.error("❌ Sync error:", e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
