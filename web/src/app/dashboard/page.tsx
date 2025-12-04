"use client";

import Link from "next/link";
import NeuralBackground from "@/components/NeuralBackground";
import { AIMetrics } from "@/components/AIMetrics";

export default function DashboardPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-slate-100">
      <NeuralBackground />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-10 pt-6 md:px-6 md:pt-8">
        {/* TOP BAR DASHBOARD */}
        <header className="flex items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/60 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.7)]">
              <span className="text-xs font-semibold tracking-[0.18em] text-emerald-300">
                AI
              </span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] uppercase tracking-[0.26em] text-emerald-400/90">
                AI Ads Revolution
              </span>
              <span className="text-[11px] text-slate-400">
                Dashboard inserzionista · Motore neurale di advertising
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/"
              className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-slate-200 hover:border-emerald-400 hover:text-emerald-200 transition-colors"
            >
              ← Torna alla home
            </Link>
            <button
              className="btn-primary-3d rounded-full bg-slate-900 px-4 py-1.5 text-xs font-medium text-slate-100 border border-slate-700 hover:border-emerald-400 hover:text-emerald-200 transition-colors"
            >
              Logged in
            </button>
            <Link
              href="/auth/logout"
              className="rounded-full border border-red-500/60 bg-red-500/10 px-4 py-1.5 text-xs font-medium text-red-200 hover:bg-red-500/20 transition-colors"
            >
              Esci
            </Link>
          </div>
        </header>

        {/* BLOCCO KPI AI (riusa AIMetrics) */}
        <div className="mt-6">
          <AIMetrics />
        </div>

        {/* GRIGLIA PRINCIPALE */}
        <section className="mt-4 grid gap-4 lg:grid-cols-[1.3fr,1fr]">
          {/* Colonna sinistra: riepilogo + ultime metriche */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 backdrop-blur-xl p-4 shadow-[0_0_30px_rgba(15,23,42,0.9)]">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                    Riepilogo account
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    Panoramica sintetica delle performance delle tue campagne AI.
                  </p>
                </div>
                <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-200 border border-emerald-400/40">
                  Modalità demo attiva
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 text-center text-xs">
                <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-2 py-2">
                  <p className="text-[11px] text-slate-400">Impression totali</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-300">0</p>
                  <p className="mt-0.5 text-[10px] text-slate-500">Ultimi 28 giorni</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-2 py-2">
                  <p className="text-[11px] text-slate-400">Click totali</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-300">0</p>
                  <p className="mt-0.5 text-[10px] text-slate-500">Click validi</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-2 py-2">
                  <p className="text-[11px] text-slate-400">Spesa totale</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-300">€ 0.00</p>
                  <p className="mt-0.5 text-[10px] text-slate-500">Budget investito</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-2 py-2">
                  <p className="text-[11px] text-slate-400">Entrate totali</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-300">€ 0.00</p>
                  <p className="mt-0.5 text-[10px] text-slate-500">Valore attribuito</p>
                </div>
              </div>

              <p className="mt-3 text-[11px] text-slate-500">
                I dati in tempo reale verranno letti dalla tabella <span className="text-emerald-300">campaign_metrics</span> su
                Supabase, non appena collegherai le tue campagne reali.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 backdrop-blur-xl p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  Ultime metriche campagna
                </p>
                <Link
                  href="/campaigns/new"
                  className="btn-primary-3d rounded-full bg-emerald-500 px-4 py-1.5 text-[11px] font-semibold text-slate-950 hover:bg-emerald-300 transition-colors"
                >
                  + Crea nuova campagna
                </Link>
              </div>

              <p className="mt-2 text-xs text-slate-300">
                Ultime righe registrate in <span className="text-emerald-300">campaign_metrics</span>. Quando lancerai
                campagne reali, vedrai qui le performance aggiornate.
              </p>

              <div className="mt-4 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60">
                <table className="min-w-full text-left text-[11px]">
                  <thead className="bg-slate-900/80 text-slate-400">
                    <tr>
                      <th className="px-3 py-2 font-medium">Campaign ID</th>
                      <th className="px-3 py-2 font-medium">Impression</th>
                      <th className="px-3 py-2 font-medium">Click</th>
                      <th className="px-3 py-2 font-medium">CTR</th>
                      <th className="px-3 py-2 font-medium">Costo</th>
                      <th className="px-3 py-2 font-medium">Entrate</th>
                      <th className="px-3 py-2 font-medium">ROAS</th>
                      <th className="px-3 py-2 font-medium">Data</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="px-3 py-3 text-slate-500" colSpan={8}>
                        Nessuna metrica ancora registrata. Appena AI-Core aggiorna la tabella{" "}
                        <span className="text-emerald-300">campaign_metrics</span>, vedrai qui le prime righe reali.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Colonna destra: pannelli stile exchange */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-emerald-400/40 bg-slate-950/70 backdrop-blur-xl p-4 shadow-[0_0_40px_rgba(16,185,129,0.55)]">
              <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-300">
                Stato motore AI
              </p>
              <p className="mt-2 text-xs text-slate-200">
                L&apos;AI sta analizzando segnali di intento, contesto e storico delle campagne per
                decidere dove allocare il budget nel modo più efficiente.
              </p>

              <div className="mt-3 grid grid-cols-3 gap-3 text-center text-[11px]">
                <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-2 py-2">
                  <p className="text-slate-400">Segnali/min</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-300">∞</p>
                  <p className="mt-0.5 text-slate-500">Simulazione neurale</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-2 py-2">
                  <p className="text-slate-400">Modalità</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-300">Beta live</p>
                  <p className="mt-0.5 text-slate-500">Ottimizzazione continua</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-2 py-2">
                  <p className="text-slate-400">Stato</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-300">Stabile</p>
                  <p className="mt-0.5 text-slate-500">Monitoraggio attivo</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 backdrop-blur-xl p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                Prossimi grafici realtime
              </p>
              <p className="mt-2 text-xs text-slate-300">
                Qui potrai visualizzare grafici in tempo reale su:
              </p>
              <ul className="mt-2 space-y-1 text-xs text-slate-300">
                <li>• Andamento giornaliero di impression, click e conversioni</li>
                <li>• Distribuzione del budget per sorgente di traffico</li>
                <li>• ROAS per canale e per campagna</li>
              </ul>
              <p className="mt-3 text-[11px] text-slate-500">
                Questa sezione verrà collegata alle API AI-Core e a Supabase nelle prossime release,
                per mostrare grafici animati stile exchange / trading.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
