"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type AiMetrics = {
  ai_on?: boolean;
  intent?: string;
  ctr?: number;
  cpc?: number;
  roas?: number;
  window_days?: number;
};

type CampaignRow = {
  campaign_id: string;
  impressions: number;
  clicks: number;
  cost: number;
  revenue: number;
  created_at: string;
};

type DashboardMetrics = {
  rows: CampaignRow[];
  totals: {
    impressions: number;
    clicks: number;
    cost: number;
    revenue: number;
    ctr: number;
    cpc: number;
    roas: number;
  };
};

export default function DashboardPage() {
  const [aiMetrics, setAiMetrics] = useState<AiMetrics | null>(null);
  const [dbMetrics, setDbMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const [aiRes, dbRes] = await Promise.all([
          fetch("/api/ai/metrics", { cache: "no-store" }),
          fetch("/api/dashboard/metrics", { cache: "no-store" }),
        ]);

        if (aiRes.ok) {
          const aiData = await aiRes.json();
          setAiMetrics(aiData);
        }

        if (dbRes.ok) {
          const dbData = await dbRes.json();
          setDbMetrics(dbData);
        } else {
          console.error("Errore metrics dashboard:", await dbRes.text());
        }
      } catch (err) {
        console.error("Errore caricamento dashboard:", err);
        setError("Errore nel caricamento dei dati. Riprova tra poco.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const ctrDisplay =
    aiMetrics?.ctr ??
    dbMetrics?.totals?.ctr ??
    0;

  const cpcDisplay =
    aiMetrics?.cpc ??
    dbMetrics?.totals?.cpc ??
    0;

  const roasDisplay =
    aiMetrics?.roas ??
    dbMetrics?.totals?.roas ??
    0;

  const aiOn = aiMetrics?.ai_on ?? true;
  const intentLabel = aiMetrics?.intent ?? "alto";

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
        {/* TOP BAR */}
        <header className="mb-6 flex flex-col gap-3 md:mb-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/50 bg-emerald-500/10 shadow-[0_0_25px_rgba(16,185,129,0.7)]">
              <span className="text-xs font-semibold tracking-[0.18em] text-emerald-300">
                AI
              </span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xs uppercase tracking-[0.26em] text-emerald-400/80">
                AI Ads Revolution
              </span>
              <span className="text-[11px] text-slate-200">
                Dashboard inserzionista · Motore neurale di advertising
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <Link
              href="/"
              className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 hover:border-emerald-400 hover:text-emerald-200 transition-colors"
            >
              ← Torna alla home
            </Link>
            <Link
              href="/auth/logout"
              className="rounded-full border border-red-500/60 bg-red-500/10 px-3 py-1.5 text-red-200 hover:bg-red-500/20 transition-colors"
            >
              Esci
            </Link>
          </div>
        </header>

        {/* STATO AI + KPI */}
        <section className="grid gap-4 md:grid-cols-[1.2fr,1fr]">
          {/* Stato AI */}
          <div className="rounded-2xl border border-emerald-500/40 bg-slate-950/80 p-4 shadow-[0_0_40px_rgba(16,185,129,0.35)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-300">
                  AI Neural Campaign Engine
                </p>
                <p className="mt-1 text-xs text-emerald-100/90">
                  Live · Realtime signals · Finestra ultimi{" "}
                  {aiMetrics?.window_days ?? 28} giorni
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-200">AI</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-100">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                  {aiOn ? "ON" : "OFF"}
                </span>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-slate-950 to-slate-950/80 p-3">
              <p className="text-xs text-slate-200">
                Intento di acquisto{" "}
                <span className="font-semibold text-emerald-300">
                  {intentLabel}
                </span>
              </p>
              <p className="mt-1 text-[11px] text-emerald-200/90">
                L&apos;AI distribuisce il budget sulle sorgenti con maggiore
                probabilità di conversione, aggiornando offerte e creatività in
                tempo reale.
              </p>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-3">
                <p className="text-[11px] text-slate-200">CTR medio</p>
                <p className="mt-1 text-lg font-semibold text-emerald-300">
                  {ctrDisplay.toFixed(1)}%
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  Click / impression negli ultimi{" "}
                  {aiMetrics?.window_days ?? 28} giorni.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-3">
                <p className="text-[11px] text-slate-200">CPC medio</p>
                <p className="mt-1 text-lg font-semibold text-emerald-300">
                  € {cpcDisplay.toFixed(2)}
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  Costo medio per clic delle campagne attive.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-3">
                <p className="text-[11px] text-slate-200">ROAS medio</p>
                <p className="mt-1 text-lg font-semibold text-emerald-300">
                  {roasDisplay.toFixed(1)}x
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  Ritorno sulla spesa pubblicitaria (revenue / cost).
                </p>
              </div>
            </div>
          </div>

          {/* Riepilogo DB */}
          <div className="rounded-2xl border border-slate-700 bg-slate-950/70 backdrop-blur-xl p-4 shadow-[0_0_40px_rgba(15,23,42,0.9)]">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-200">
              Riepilogo account
            </p>

            {loading ? (
              <div className="mt-4 space-y-3">
                <div className="h-4 w-1/2 rounded bg-slate-800 animate-pulse" />
                <div className="h-4 w-2/3 rounded bg-slate-800 animate-pulse" />
                <div className="h-4 w-1/3 rounded bg-slate-800 animate-pulse" />
              </div>
            ) : error ? (
              <p className="mt-3 text-xs text-red-400">{error}</p>
            ) : (
              <div className="mt-4 space-y-3 text-sm text-slate-200">
                <p>
                  Impression totali:{" "}
                  <span className="font-semibold text-emerald-300">
                    {dbMetrics?.totals.impressions ?? 0}
                  </span>
                </p>
                <p>
                  Click totali:{" "}
                  <span className="font-semibold text-emerald-300">
                    {dbMetrics?.totals.clicks ?? 0}
                  </span>
                </p>
                <p>
                  Spesa totale:{" "}
                  <span className="font-semibold text-emerald-300">
                    € {(dbMetrics?.totals.cost ?? 0).toFixed(2)}
                  </span>
                </p>
                <p>
                  Entrate totali:{" "}
                  <span className="font-semibold text-emerald-300">
                    € {(dbMetrics?.totals.revenue ?? 0).toFixed(2)}
                  </span>
                </p>
                <p className="text-[11px] text-slate-500">
                  I dati provengono dalla tabella{" "}
                  <span className="font-mono text-emerald-300">
                    campaign_metrics
                  </span>{" "}
                  su Supabase.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* TABELLA CAMPAGNE */}
        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 md:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-100">
                Ultime metriche campagna
              </h2>
              <p className="mt-1 text-[11px] text-slate-500">
                Ultime righe registrate in{" "}
                <span className="font-mono text-emerald-300">
                  campaign_metrics
                </span>
                . Quando lancerai campagne reali, vedrai qui le performance
                aggiornate.
              </p>
            </div>
            <Link
              href="/auth/register"
              className="hidden rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-200 hover:border-emerald-400 hover:text-emerald-200 md:inline-flex"
            >
              Crea nuova campagna
            </Link>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] text-slate-200">
                  <th className="px-2 py-2 font-normal">Campaign ID</th>
                  <th className="px-2 py-2 font-normal text-right">
                    Impression
                  </th>
                  <th className="px-2 py-2 font-normal text-right">Click</th>
                  <th className="px-2 py-2 font-normal text-right">CTR</th>
                  <th className="px-2 py-2 font-normal text-right">Costo</th>
                  <th className="px-2 py-2 font-normal text-right">
                    Entrate
                  </th>
                  <th className="px-2 py-2 font-normal text-right">ROAS</th>
                  <th className="px-2 py-2 font-normal text-right">
                    Data
                  </th>
                </tr>
              </thead>
              <tbody>
                {dbMetrics?.rows && dbMetrics.rows.length > 0 ? (
                  dbMetrics.rows.map((row) => {
                    const ctrRow =
                      row.impressions > 0
                        ? (row.clicks / row.impressions) * 100
                        : 0;
                    const roasRow =
                      row.cost > 0 ? row.revenue / row.cost : 0;
                    return (
                      <tr
                        key={row.campaign_id + row.created_at}
                        className="border-b border-slate-900/80 last:border-0"
                      >
                        <td className="px-2 py-2 font-mono text-[11px] text-slate-200">
                          {row.campaign_id}
                        </td>
                        <td className="px-2 py-2 text-right text-slate-200">
                          {row.impressions}
                        </td>
                        <td className="px-2 py-2 text-right text-slate-200">
                          {row.clicks}
                        </td>
                        <td className="px-2 py-2 text-right text-slate-200">
                          {ctrRow.toFixed(1)}%
                        </td>
                        <td className="px-2 py-2 text-right text-slate-200">
                          € {row.cost.toFixed(2)}
                        </td>
                        <td className="px-2 py-2 text-right text-slate-200">
                          € {row.revenue.toFixed(2)}
                        </td>
                        <td className="px-2 py-2 text-right text-slate-200">
                          {roasRow.toFixed(1)}x
                        </td>
                        <td className="px-2 py-2 text-right text-slate-200">
                          {new Date(row.created_at).toLocaleString("it-IT")}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-2 py-6 text-center text-[11px] text-slate-500"
                    >
                      Nessuna metrica ancora registrata. Appena AI-Core
                      aggiorna la tabella{" "}
                      <span className="font-mono text-emerald-300">
                        campaign_metrics
                      </span>
                      , vedrai qui le prime righe reali.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
