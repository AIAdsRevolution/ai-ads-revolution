import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.error("Manca NEXT_PUBLIC_SUPABASE_URL nelle variabili d'ambiente.");
}

if (!serviceRoleKey) {
  console.error("Manca SUPABASE_SERVICE_ROLE_KEY nelle variabili d'ambiente.");
}

const supabase =
  supabaseUrl && serviceRoleKey
    ? createClient(supabaseUrl, serviceRoleKey)
    : null;

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase non è configurato correttamente" },
        { status: 500 }
      );
    }

    const { data, error } = await supabase
      .from("campaign_metrics")
      .select("campaign_id, impressions, clicks, cost, revenue, created_at")
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      console.error("Errore Supabase campaign_metrics:", error);
      return NextResponse.json(
        { error: "Errore nel leggere i dati dal database" },
        { status: 500 }
      );
    }

    const rows = data ?? [];

    let totalImpressions = 0;
    let totalClicks = 0;
    let totalCost = 0;
    let totalRevenue = 0;

    for (const row of rows) {
      totalImpressions += row.impressions ?? 0;
      totalClicks += row.clicks ?? 0;
      totalCost += row.cost ?? 0;
      totalRevenue += row.revenue ?? 0;
    }

    const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    const cpc = totalClicks > 0 ? totalCost / totalClicks : 0;
    const roas = totalCost > 0 ? totalRevenue / totalCost : 0;

    return NextResponse.json({
      rows,
      totals: {
        impressions: totalImpressions,
        clicks: totalClicks,
        cost: totalCost,
        revenue: totalRevenue,
        ctr,
        cpc,
        roas,
      },
    });
  } catch (err) {
    console.error("Errore API /api/dashboard/metrics:", err);
    return NextResponse.json(
      { error: "Errore interno nel calcolo delle metriche" },
      { status: 500 }
    );
  }
}
