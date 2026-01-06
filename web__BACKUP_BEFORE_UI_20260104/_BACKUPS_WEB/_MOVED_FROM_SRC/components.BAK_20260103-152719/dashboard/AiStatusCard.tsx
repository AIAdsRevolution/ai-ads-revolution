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
