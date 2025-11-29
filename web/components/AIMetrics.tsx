"use client";

import { useEffect, useState } from "react";

type Metrics = {
  ctr: number;
  cpc: number;
  roas: number;
  window_days: number;
};

export function AIMetrics() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchMetrics() {
      try {
        const res = await fetch("/api/ai/metrics");
        if (!res.ok) {
          throw new Error("Response non ok");
        }
        const data = await res.json();
        if (!cancelled) {
          setMetrics({
            ctr: data.ctr ?? 0,
            cpc: data.cpc ?? 0,
            roas: data.roas ?? 0,
            window_days: data.window_days ?? 28,
          });
          setLoading(false);
          setError(null);
        }
      } catch (err) {
        console.error("Errore caricando /api/ai/metrics", err);
        if (!cancelled) {
          setError("Non riesco a leggere le metriche AI in questo momento.");
          setLoading(false);
        }
      }
    }

    fetchMetrics();
    const id = setInterval(fetchMetrics, 15000); // refresh ogni 15s

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const ctr = metrics?.ctr ?? 0;
  const cpc = metrics?.cpc ?? 0;
  const roas = metrics?.roas ?? 0;

  const statusLabel = roas >= 4 ? "Intento alto · AI ON" : roas >= 2 ? "Intento medio · AI ON" : "Raccolta dati in corso";

  return (
    <section className="mx-auto mb-6 mt-3 flex max-w-6xl flex-col gap-4 px-4 md:px-6">
      <div className="grid gap-4 md:grid-cols-[1.4fr,1fr]">
        {/* Pannello stato AI */}
        <div className="rounded-2xl border border-emerald-400/30 bg-slate-950/70 backdrop-blur-xl p-4 shadow-[0_0_40px_rgba(16,185,129,0.45)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-300">
                AI Neural Campaign Engine
              </p>
              <p className="mt-1 text-[11px] text-emerald-200/80">
                Live · Realtime signals · Finestra ultimi {metrics?.window_days ?? 28} giorni
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-300">AI</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/25 px-2 py-0.5 text-[10px] font-medium text-emerald-100 shadow-[0_0_14px_rgba(16,185,129,0.75)]">
                <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)]" />
                ON
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-200">
                {statusLabel}
              </p>
              <p className="text-[11px] text-slate-400">
                L&apos;AI ottimizza offerte, creatività e sorgenti di traffico in tempo reale,
                spostando il budget dove vede più probabilità di conversione.
              </p>
            </div>

            {/* Piccolo grafico animato stile exchange */}
            <div className="relative h-20 w-full max-w-xs overflow-hidden rounded-xl border border-emerald-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-black px-3 py-2">
              <div className="flex items-center justify-between text-[10px] text-emerald-200/90">
                <span>Trend AI</span>
                <span className="text-[10px] text-emerald-300">
                  ROAS {roas.toFixed(1)}x
                </span>
              </div>
              <svg
                viewBox="0 0 160 60"
                className="mt-1 h-[52px] w-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="aiLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
                    <stop offset="40%" stopColor="#22c55e" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="aiFill" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(16,185,129,0.35)" />
                    <stop offset="100%" stopColor="rgba(15,23,42,0)" />
                  </linearGradient>
                </defs>

                <path
                  d="M0 40 L20 38 L40 32 L60 36 L80 24 L100 30 L120 18 L140 26 L160 20"
                  fill="none"
                  stroke="url(#aiLine)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  className="sparkline-path"
                />
                <path
                  d="M0 40 L20 38 L40 32 L60 36 L80 24 L100 30 L120 18 L140 26 L160 20 L160 60 L0 60 Z"
                  fill="url(#aiFill)"
                  className="sparkline-fill"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* KPI card */}
        <div className="rounded-2xl border border-slate-700 bg-slate-950/70 backdrop-blur-xl p-4 shadow-[0_0_32px_rgba(15,23,42,0.85)]">
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
            KPI principali AI
          </p>

          <div className="mt-3 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl border border-slate-700/80 bg-slate-900/70 px-2 py-2">
              <p className="text-[10px] text-slate-400">CTR medio</p>
              <p className="mt-1 text-sm font-semibold text-emerald-300">
                {loading ? "…" : ctr.toFixed(1) + "%"}
              </p>
              <p className="mt-0.5 text-[10px] text-slate-500">
                Click / impression
              </p>
            </div>
            <div className="rounded-xl border border-slate-700/80 bg-slate-900/70 px-2 py-2">
              <p className="text-[10px] text-slate-400">CPC medio</p>
              <p className="mt-1 text-sm font-semibold text-emerald-300">
                {loading ? "…" : `€ ${cpc.toFixed(2)}`}
              </p>
              <p className="mt-0.5 text-[10px] text-slate-500">
                Costo per clic
              </p>
            </div>
            <div className="rounded-xl border border-slate-700/80 bg-slate-900/70 px-2 py-2">
              <p className="text-[10px] text-slate-400">ROAS medio</p>
              <p className="mt-1 text-sm font-semibold text-emerald-300">
                {loading ? "…" : roas.toFixed(1) + "x"}
              </p>
              <p className="mt-0.5 text-[10px] text-slate-500">
                Ritorno spesa adv
              </p>
            </div>
          </div>

          {error && (
            <p className="mt-3 text-[11px] text-amber-400">
              {error}
            </p>
          )}

          {!error && !loading && (
            <p className="mt-3 text-[11px] text-slate-500">
              Dati demo forniti da AI-Core. Quando collegherai campagne reali,
              questi valori rifletteranno le performance effettive.
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        .sparkline-path {
          stroke-dasharray: 260;
          stroke-dashoffset: 260;
          animation: sparkMove 4.5s ease-in-out infinite;
        }

        .sparkline-fill {
          opacity: 0.0;
          animation: sparkFill 4.5s ease-in-out infinite;
        }

        @keyframes sparkMove {
          0% {
            stroke-dashoffset: 260;
            opacity: 0.1;
          }
          35% {
            stroke-dashoffset: 160;
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0.3;
          }
        }

        @keyframes sparkFill {
          0% {
            opacity: 0;
          }
          35% {
            opacity: 0.35;
          }
          100% {
            opacity: 0.08;
          }
        }
      `}</style>
    </section>
  );
}
