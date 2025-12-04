import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

/**
 * API /api/dashboard
 * Legge i dati da Supabase e calcola:
 * - KPI totali
 * - serie giornaliere per grafici
 * - lista campagne
 *
 * ATTENZIONE:
 * Adatta il nome tabella e le colonne a quelle reali di Supabase.
 */

export async function GET() {
  // 🔧 CAMBIA QUI se la tabella ha un nome diverso
  const { data, error } = await supabaseServer
    .from("ad_events")
    .select(
      `
      id,
      campaign_name,
      status,
      impressions,
      clicks,
      conversions,
      spend,
      created_at
    `
    )
    .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 
1000).toISOString()) // ultimi 7 giorni
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[AIAdsRevolution] Errore Supabase /api/dashboard:", 
error);
    return NextResponse.json(
      { error: "Errore nel recupero dei dati dalla dashboard." },
      { status: 500 }
    );
  }

  const rows = data || [];

  // Se non ci sono dati, ritorniamo valori base
  if (!rows.length) {
    return NextResponse.json({
      kpis: {
        impressions: 0,
        clicks: 0,
        ctr: 0,
        conversions: 0,
        spend: 0,
        trend: 0,
      },
      charts: {
        daily: [],
        ctr: [],
        conversions: [],
        spend: [],
      },
      campaigns: [],
    });
  }

  let impressions = 0;
  let clicks = 0;
  let conversions = 0;
  let spend = 0;

  const dailyMap = new Map<string, { impressions: number; clicks: number; 
conversions: number; spend: number }>();

  for (const row of rows as any[]) {
    impressions += Number(row.impressions || 0);
    clicks += Number(row.clicks || 0);
    conversions += Number(row.conversions || 0);
    spend += Number(row.spend || 0);

    const dayKey = (row.created_at || "").slice(0, 10); // yyyy-mm-dd
    if (!dailyMap.has(dayKey)) {
      dailyMap.set(dayKey, { impressions: 0, clicks: 0, conversions: 0, 
spend: 0 });
    }
    const agg = dailyMap.get(dayKey)!;
    agg.impressions += Number(row.impressions || 0);
    agg.clicks += Number(row.clicks || 0);
    agg.conversions += Number(row.conversions || 0);
    agg.spend += Number(row.spend || 0);
  }

  const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;

  // Serie giornaliere ordinate per data
  const days = Array.from(dailyMap.keys()).sort();
  const daily = days.map((day) => {
    const agg = dailyMap.get(day)!;
    const dayCtr = agg.impressions > 0 ? (agg.clicks / agg.impressions) * 
100 : 0;
    return {
      date: day,
      impressions: agg.impressions,
      clicks: agg.clicks,
      conversions: agg.conversions,
      spend: agg.spend,
      ctr: dayCtr,
    };
  });

  // Trend = CTR oggi vs CTR inizio periodo
  const first = daily[0];
  const last = daily[daily.length - 1];
  const ctrStart = first?.ctr ?? 0;
  const ctrEnd = last?.ctr ?? 0;
  const trend = ctrStart > 0 ? ((ctrEnd - ctrStart) / ctrStart) * 100 : 0;

  // Campagne (aggregazione semplificata per demo)
  const campaignMap = new Map<
    string,
    { name: string; status: string; impressions: number; clicks: number; 
conversions: number; spend: number }
  >();

  for (const row of rows as any[]) {
    const key = row.campaign_name || "Campagna senza nome";
    if (!campaignMap.has(key)) {
      campaignMap.set(key, {
        name: key,
        status: row.status || "Attiva",
        impressions: 0,
        clicks: 0,
        conversions: 0,
        spend: 0,
      });
    }
    const c = campaignMap.get(key)!;
    c.impressions += Number(row.impressions || 0);
    c.clicks += Number(row.clicks || 0);
    c.conversions += Number(row.conversions || 0);
    c.spend += Number(row.spend || 0);
  }

  const campaigns = Array.from(campaignMap.values());

  return NextResponse.json({
    kpis: {
      impressions,
      clicks,
      ctr,
      conversions,
      spend,
      trend,
    },
    charts: {
      daily,
    },
    campaigns,
  });
}

