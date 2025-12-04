"use client";

import Link from "next/link";

const services = [
  {
    name: "Web app AI Ads Revolution",
    status: "Online",
    desc: "Homepage, auth e dashboard inserzionista.",
    impact: "Nessun problema segnalato.",
  },
  {
    name: "AI Core (motore neurale)",
    status: "Online",
    desc: "Endpoint /health e /metrics/update raggiungibili.",
    impact: "Analisi metriche demo attive.",
  },
  {
    name: "Supabase (database e auth)",
    status: "Operativo",
    desc: "Login, registrazione e storage dati base.",
    impact: "Nessuna anomalia nota.",
  },
  {
    name: "Stripe (pagamenti sandbox)",
    status: "Online (test)",
    desc: "Checkout Piano Basic in modalità test.",
    impact: "Transazioni reali ancora disattivate.",
  },
];

const history = [
  {
    date: "29 Nov 2025",
    title: "Deploy nuova homepage + fix AI Core 0.3.0",
    detail: "UI migliorata, Stripe collegato in sandbox, AI Core reso più resiliente.",
  },
  {
    date: "28 Nov 2025",
    title: "Attivato backup automatico su AWS S3",
    detail: "Backup zip giornalieri di ai-ads-revolution su bucket dedicato.",
  },
  {
    date: "26–27 Nov 2025",
    title: "Integrazione Stripe checkout Piano Basic",
    detail: "Creazione price su Stripe e collegamento al bottone \"Attiva piano Basic\".",
  },
];

export default function StatusPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-10 pt-8 md:px-6">
        {/* Top bar */}
        <header className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/40 bg-emerald-500/10 shadow-[0_0_25px_rgba(16,185,129,0.6)]">
              <span className="text-xs font-semibold tracking-[0.18em] text-emerald-300">
                AI
              </span>
            </div>
            <div className="leading-tight">
              <p className="text-xs uppercase tracking-[0.26em] text-emerald-400/80">
                AI Ads Revolution
              </p>
              <p className="text-[11px] text-slate-400">
                Status piattaforma · panoramica servizi
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="text-xs text-slate-300 hover:text-emerald-300 transition-colors"
          >
            ← Torna alla home
          </Link>
        </header>

        {/* Overall status */}
        <section className="mt-6 rounded-2xl border border-emerald-500/40 bg-slate-950/60 p-4 shadow-[0_0_35px_rgba(16,185,129,0.35)] backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
            Stato generale
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <p className="text-sm font-medium text-slate-100">
              Tutti i sistemi principali sono <span className="text-emerald-300">operativi</span>.
            </p>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-medium text-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
              Uptime demo · Beta
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Questa pagina riassume lo stato dei componenti chiave della piattaforma in fase beta.
            In futuro potrà essere collegata a monitoraggi automatici (ping, allarmi, log di errore).
          </p>
        </section>

        {/* Services status */}
        <section className="mt-8">
          <h2 className="text-sm font-semibold text-slate-100">
            Stato servizi
          </h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {services.map((s) => (
              <div
                key={s.name}
                className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13px] font-medium text-slate-100">
                    {s.name}
                  </p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                    {s.status}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-300">{s.desc}</p>
                <p className="mt-1 text-[11px] text-slate-500">{s.impact}</p>
              </div>
            ))}
          </div>
        </section>

        {/* History */}
        <section className="mt-10 border-t border-slate-800 pt-6">
          <h2 className="text-sm font-semibold text-slate-100">
            Cronologia aggiornamenti recenti
          </h2>
          <div className="mt-3 space-y-3 text-xs">
            {history.map((h) => (
              <div
                key={h.date + h.title}
                className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3"
              >
                <p className="text-[11px] text-slate-400">{h.date}</p>
                <p className="mt-1 text-sm font-medium text-slate-100">{h.title}</p>
                <p className="mt-1 text-[11px] text-slate-400">{h.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer note */}
        <section className="mt-8 border-t border-slate-800 pt-4 text-[11px] text-slate-500">
          <p>
            AI Ads Revolution è attualmente in fase beta privata. Le informazioni presenti in questa
            pagina hanno scopo informativo e potranno essere integrate con monitoraggio automatico
            quando la piattaforma sarà in produzione.
          </p>
        </section>
      </div>
    </main>
  );
}
