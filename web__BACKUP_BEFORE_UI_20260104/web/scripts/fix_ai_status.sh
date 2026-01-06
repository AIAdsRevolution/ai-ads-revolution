#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "✅ Project:" "$(pwd)"

# stop dev + unlock
pkill -f "next dev" 2>/dev/null || true
pkill -f "node.*next" 2>/dev/null || true
rm -f .next/dev/lock 2>/dev/null || true

mkdir -p src/lib/ai src/app/api/ai/status src/components/dashboard

cat > src/lib/ai/neuralBaseline.ts <<'EOT'
export type AiReadiness = "COLLECTING" | "BASELINE" | "READY_SOFT" | "READY_FULL";
export type AiStatus = {
  readiness: AiReadiness;
  confidence: number;
  stable: boolean;
  reasons: string[];
  nextSteps: string[];
  guardrails: { minImpressions: number; minClicks: number; minDays: number; coolDownHours: number };
};
type Kpi = { impressions: number; clicks: number; ctr: number; cost: number; cpc: number; revenue: number; roas: number; conversions: number };

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
function scoreFromVolume(impressions: number, clicks: number, days: number) {
  const s1 = Math.log10(Math.max(10, impressions)) / 6;
  const s2 = Math.log10(Math.max(10, clicks)) / 5;
  const s3 = Math.log10(Math.max(2, days)) / 2;
  return clamp01(0.55 * s1 + 0.35 * s2 + 0.10 * s3);
}
export function buildAiStatus(args: { windowDays: number; rows: number; kpi: Kpi }): AiStatus {
  const { windowDays, rows, kpi } = args;
  const guardrails = { minImpressions: 5000, minClicks: 120, minDays: 2, coolDownHours: 12 };
  const reasons: string[] = [];
  const nextSteps: string[] = [];

  const hasMinDays = windowDays >= guardrails.minDays;
  const hasVolume = kpi.impressions >= guardrails.minImpressions && kpi.clicks >= guardrails.minClicks;

  const ctrOk = Number.isFinite(kpi.ctr) && kpi.ctr > 0.2 && kpi.ctr < 25;
  const stable = ctrOk && kpi.impressions > 0 && kpi.clicks > 0;

  let readiness: AiReadiness = "COLLECTING";
  if (!hasMinDays) { reasons.push("Finestra dati troppo breve: servono almeno 48h di raccolta segnali."); nextSteps.push("Lascia attiva la raccolta dati per almeno 2 giorni."); }
  if (!hasVolume) { reasons.push("Volume insufficiente per ottimizzazioni affidabili (serve baseline)."); nextSteps.push(`Punta a ≥ ${guardrails.minImpressions.toLocaleString()} impression e ≥ ${guardrails.minClicks} click in finestra.`); }

  if (hasMinDays && !hasVolume) readiness = "BASELINE";
  if (hasMinDays && hasVolume) readiness = "READY_SOFT";

  const hasConversions = (kpi.conversions ?? 0) >= 15;
  if (readiness === "READY_SOFT" && hasConversions) {
    readiness = "READY_FULL";
    reasons.push("Soglia conversioni raggiunta: il sistema può eseguire ottimizzazioni graduali.");
  } else if (readiness === "READY_SOFT") {
    reasons.push("Baseline KPI pronta: abilitate ottimizzazioni leggere (senza cambi aggressivi).");
    nextSteps.push("Collega conversion tracking/valore per passare a ottimizzazioni complete.");
  }

  if (!stable) { reasons.push("Dati non ancora stabili: l’AI resta in modalità osservazione per evitare azioni rischiose."); nextSteps.push("Controlla coerenza tracking e attendi più segnali."); }
  if (rows <= 0) { reasons.push("Nessuna riga disponibile in tabella: verifica che AI-Core scriva su Supabase."); nextSteps.push("Verifica inserimento su campaign_metrics e permessi/RLS."); }

  const volScore = scoreFromVolume(kpi.impressions, kpi.clicks, windowDays);
  const conf = clamp01(volScore * (stable ? 1 : 0.55));
  if (reasons.length === 0) reasons.push("Sistema operativo: raccolta segnali e calibrazione baseline.");
  if (nextSteps.length === 0) nextSteps.push("Continua raccolta dati e collega conversion tracking per ROAS reale.");

  return { readiness, confidence: conf, stable, reasons, nextSteps, guardrails };
}
EOT

cat > src/app/api/ai/status/route.ts <<'EOT'
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

    if (error) throw new Error(error.message);

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
EOT

cat > src/components/dashboard/AiStatusCard.tsx <<'EOT'
"use client";
import { useEffect, useMemo, useState } from "react";

type Api = {
  ok: boolean;
  error?: string;
  windowDays?: number;
  rows?: number;
  ai?: { readiness: "COLLECTING"|"BASELINE"|"READY_SOFT"|"READY_FULL"; confidence: number; stable: boolean; reasons: string[]; nextSteps: string[];
    guardrails: { minImpressions: number; minClicks: number; minDays: number; coolDownHours: number } };
};

const title = (r: any) => r==="READY_FULL" ? "Ottimizzazione completa"
  : r==="READY_SOFT" ? "Ottimizzazione leggera"
  : r==="BASELINE" ? "Baseline in costruzione"
  : "Raccolta segnali";

export function AiStatusCard({ days = 28 }: { days?: number }) {
  const [data, setData] = useState<Api | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetch(`/api/ai/status?days=${days}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => alive && setData(j))
      .catch((e) => alive && setData({ ok: false, error: e?.message || "fetch_error" }))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [days]);

  const confPct = useMemo(() => Math.round(((data?.ai?.confidence ?? 0) * 100)), [data]);

  if (loading) return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
      <div className="text-xs text-slate-400">AI Neural Engine</div>
      <div className="mt-2 h-6 w-56 rounded bg-slate-800/40 animate-pulse" />
      <div className="mt-4 h-3 w-full rounded bg-slate-800/40 animate-pulse" />
    </div>
  );

  if (!data?.ok) return (
    <div className="rounded-2xl border border-red-900/40 bg-slate-950/70 p-5">
      <div className="text-xs text-slate-400">AI Neural Engine</div>
      <div className="mt-1 text-sm font-semibold text-red-300">Errore AI status</div>
      <div className="mt-2 text-xs text-slate-400">{data?.error || "unknown"}</div>
    </div>
  );

  const ai = data.ai!;
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs text-slate-400">AI Neural Engine</div>
          <div className="mt-1 text-lg font-semibold text-slate-100">{title(ai.readiness)}</div>
          <div className="mt-1 text-xs text-slate-400">Ultimi {data.windowDays} giorni · Righe: {data.rows}</div>
        </div>
        <div className="text-right">
          <div className="text-[11px] text-slate-400">Confidence</div>
          <div className="text-2xl font-semibold text-slate-100">{confPct}%</div>
          <div className="text-[11px] text-slate-500">{ai.stable ? "Stabile" : "In calibrazione"}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
          <div className="text-xs font-semibold text-slate-200">Perché il sistema è in questo stato</div>
          <ul className="mt-2 space-y-1 text-xs text-slate-400">
            {ai.reasons.slice(0,6).map((r,i)=> <li key={i}>• {r}</li>)}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
          <div className="text-xs font-semibold text-slate-200">Prossimi passi consigliati</div>
          <ul className="mt-2 space-y-1 text-xs text-slate-400">
            {ai.nextSteps.slice(0,6).map((r,i)=> <li key={i}>• {r}</li>)}
          </ul>
          <div className="mt-3 text-[11px] text-slate-500">
            Guardrails: ≥ {ai.guardrails.minImpressions.toLocaleString()} impr · ≥ {ai.guardrails.minClicks} click · cooldown {ai.guardrails.coolDownHours}h
          </div>
        </div>
      </div>
    </div>
  );
}
EOT

echo "✅ Files written."

git add -A
git commit -m "AI: add /api/ai/status + neural baseline + AiStatusCard" || true

echo "✅ Done."
