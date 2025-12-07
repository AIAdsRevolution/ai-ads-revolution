import Link from "next/link";

export default function StatusPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-black 
via-slate-950 to-black text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-4 
pb-10 pt-8 md:px-6">
        {/* HEADER */}
        <header className="mb-6 flex items-center justify-between border-b 
border-slate-800/80 pb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] 
text-emerald-400/80">
              AI ADS REVOLUTION
            </p>
            <h1 className="mt-1 text-xl font-semibold">
              Status piattaforma · panoramica servizi
            </h1>
          </div>
          <Link
            href="/"
            className="rounded-full border border-slate-700 
bg-slate-900/70 px-3 py-1.5 text-xs text-slate-200 
hover:border-emerald-400 hover:text-emerald-200 transition-colors"
          >
            ← Torna alla home
          </Link>
        </header>

        {/* STATO GENERALE */}
        <section className="mb-6 rounded-2xl border border-emerald-500/40 
bg-slate-950/80 p-4 shadow-[0_0_40px_rgba(16,185,129,0.35)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] 
text-emerald-400/80">
                STATO GENERALE
              </p>
              <p className="mt-2 text-sm text-slate-100">
                Tutti i sistemi principali sono{" "}
                <span className="font-semibold text-emerald-300">
                  operativi
                </span>
                .
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Questa pagina riassume lo stato dei componenti chiave 
della
                piattaforma in fase beta. In futuro potrà essere collegata 
a
                monitoraggi automatici (ping, allarmi, log di errore).
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="inline-flex items-center gap-2 rounded-full 
border border-emerald-500/60 bg-emerald-500/10 px-3 py-1 text-[11px] 
font-medium text-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400 
shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                Uptime demo · Beta
              </span>
            </div>
          </div>
        </section>

        {/* STATO SERVIZI */}
        <section>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400 
mb-3">
            Stato servizi
          </p>

          <div className="space-y-4">
            {/* Web app */}
            <div className="rounded-2xl border border-slate-800 
bg-slate-950/80 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-100">
                    Web app AI Ads Revolution
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Homepage, auth e dashboard inserzionista.
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Nessun problema segnalato.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 
rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium 
text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 
shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                  Online
                </div>
              </div>
            </div>

            {/* AI Core */}
            <div className="rounded-2xl border border-slate-800 
bg-slate-950/80 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-100">
                    AI Core (motore neurale)
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Endpoint /health e /metrics/update raggiungibili.
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Analisi metriche demo attive.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 
rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium 
text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 
shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                  Online
                </div>
              </div>
            </div>

            {/* Supabase */}
            <div className="rounded-2xl border border-slate-800 
bg-slate-950/80 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-100">
                    Supabase (database e auth)
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Login, registrazione e storage dati base.
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Nessuna anomalia nota.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 
rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium 
text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 
shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                  Operativo
                </div>
              </div>
            </div>

            {/* Stripe + Chatbot */}
            <div className="rounded-2xl border border-slate-800 
bg-slate-950/80 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-100">
                    Stripe (pagamenti sandbox)
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Checkout Piano Basic in modalità test.
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Transazioni reali ancora disattivate.
                  </p>
                </div>

                <Link
                  href="/ai-chatbot"
                  className="inline-flex items-center gap-2 rounded-full 
bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-slate-950 
shadow-[0_0_18px_rgba(16,185,129,0.7)] hover:bg-emerald-400 
transition-colors"
                >
                  <span className="h-2 w-2 rounded-full bg-slate-950" />
                  AI Chatbot
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

