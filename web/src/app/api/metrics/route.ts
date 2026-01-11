import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const days = Number(searchParams.get("days") || 28);

  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - days);

  const { data, error } = await supabase
    .from("kpi_metrics")
    .select("*")
    .gte("date", fromDate.toISOString().slice(0, 10))
    .order("date", { ascending: true });

  if (error || !data || data.length === 0) {
    return NextResponse.json({
      source: "fallback",
      lastUpdated: null,
      metrics: [
        { label: "CTR medio", value: "0.0%" },
        { label: "CPC medio", value: "€ 0.00" },
        { label: "ROAS medio", value: "0.0x" },
        { label: "AI Actions", value: "0" }
      ]
    });
  }

  const avg = (arr: number[]) =>
    arr.reduce((a, b) => a + b, 0) / arr.length;

  const ctr = avg(data.map(d => Number(d.ctr)));
  const cpc = avg(data.map(d => Number(d.cpc)));
  const roas = avg(data.map(d => Number(d.roas)));
  const actions = data.reduce((a, b) => a + Number(b.ai_actions), 0);

  return NextResponse.json({
    source: "supabase",
    lastUpdated: data[data.length - 1].date,
    metrics: [
      { label: "CTR medio", value: (ctr * 100).toFixed(1) + "%" },
      { label: "CPC medio", value: "€ " + cpc.toFixed(2) },
      { label: "ROAS medio", value: roas.toFixed(1) + "x" },
      { label: "AI Actions", value: actions.toString() }
    ]
  });
}
