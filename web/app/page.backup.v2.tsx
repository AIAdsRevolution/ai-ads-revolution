import React from "react";
import Link from "next/link";
import ProductsFormatsSection from "../components/ProductsFormatsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Glow di sfondo neurale */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.15),_transparent_55%)] opacity-80" />

      <div className="relative z-10">
        {/* NAVBAR */}
        <header className="border-b border-slate-800/60 bg-slate-950/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-[0_0_25px_rgba(45,212,191,0.65)]">
                <span className="text-xs font-black tracking-[0.16em] text-slate-950">
                  AI
                </span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm uppercase tracking-[0.2em] text-emerald-300/90">
                  Ads
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold">
                    AI Ads Revolution
                  </span>
                  <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-[2px] text-[10px] uppercase tracking-[0.18em] text-emerald-300">
                    Beta
                  </span>
                </div>
              </div>
            </div>

            <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
              <button className="text-xs font-medium text-slate-400 hover:text-slate-100">
                Piccola impresa
              </button>
              <button className="text-xs font-medium text-slate-400 hover:text-slate-100">
                Azienda di grandi dimensioni
              </button>
              <button className="text-xs font-medium text-slate-400 hover:text-slate-100">
                Partner
              </button>
              <button className="text-xs font-medium text-slate-400 hover:text-slate-100">
                Scopri
              </button>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="text-xs font-medium text-slate-300 hover:text-slate-50"
              >
                Accedi
              </Link>
              <Link
                href="/auth/register"
                className="rounded-full bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-950 hover:bg-emerald-400 hover:text-slate-950"
              >
                Registrati
              </Link>
            </div>
          </div>
        </header>

        {/* HERO PRINCIPALE */}
        <section className="border-b border-slate-800/60">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] md:py-16 lg:py-20">
            {/* Colonna sinistra: testo */}
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-emerald-300">
                <span className="h-[7px] w-[7px] rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                Piattaforma di advertising AI-first
              </p>

              <div>
                <h1 className="text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
                  Fai crescere la tua attività
                  <span className="block text-emerald-400">
                    con annunci potenziati dall&apos;intelligenza artificiale.
                  </span>
                </h1>
                <p className="mt-4 max-w-xl text-sm text-slate-300 md:text-base">
                  Raggiungi gli acquirenti nel momento esatto in cui cercano
                  prodotti come i tuoi. AI Ads Revolution analizza milioni di
                  segnali in tempo reale per ottimizzare visibilità, traffico e
                  conversioni.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/auth/register"
                  className="rounded-full bg-emerald-400 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-950 shadow-[0_0_30px_rgba(52,211,153,0.75)] hover:bg-emerald-300"
                >
                  Inizia ora
                </Link>
                <button className="inline-flex items-center gap-2 text-xs font-medium text-slate-200 hover:text-emerald-300">
                  Guarda come funziona
                  <span className="text-lg">→</span>
                </button>
              </div>

              <div className="mt-4 flex flex-col gap-2 text-xs text-slate-400 md:flex-row md:items-baseline md:gap-4">
                <p>
                  <span className="font-semibold text-emerald-300">30%</span>{" "}
                  Le piccole imprese che utilizzano AI Ads Revolution
                  attribuiscono in media il 30% delle vendite alle nostre
                  campagne ottimizzate dall&apos;AI.*
                </p>
                <p className="text-[10px]">
                  *Dati interni AI Ads Revolution, risultati medi aggregati non
                  garantiscono performance future.
                </p>
              </div>
            </div>

            {/* Colonna destra: pannello campagna + KPI */}
            <div className="space-y-4">
              {/* Card campagna */}
              <div className="rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900/90 p-4 shadow-[0_0_40px_rgba(15,23,42,0.95)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Campagna AI attiva
                    </p>
                    <p className="text-sm font-semibold text-slate-50">
                      Q4 – Performance Boost
                    </p>
                  </div>
                  <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                    Live
                  </span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
                    <p className="text-[11px] text-slate-400">CTR medio</p>
                    <p className="text-lg font-semibold text-emerald-300">
                      +32%
                    </p>
                    <p className="text-[10px] text-slate-500">
                      su campagne AI ottimizzate
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
                    <p className="text-[11px] text-slate-400">CPC medio</p>
                    <p className="text-lg font-semibold text-sky-300">
                      €0,21
                    </p>
                    <p className="text-[10px] text-slate-500">
                      costo per clic indicativo
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
                    <p className="text-[11px] text-slate-400">ROAS</p>
                    <p className="text-lg font-semibold text-amber-300">
                      4,7×
                    </p>
                    <p className="text-[10px] text-slate-500">
                      ritorno medio sull&apos;investimento
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/80 p-3">
                  <p className="text-[11px] font-medium text-slate-400">
                    Performance ultime 4 settimane
                  </p>
                  <div className="mt-2 flex flex-wrap gap-4 text-xs">
                    <div className="flex flex-col">
                      <span className="text-slate-400">Conversioni</span>
                      <span className="font-semibold text-emerald-300">
                        +19%
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-400">Impression</span>
                      <span className="font-semibold text-slate-100">
                        1,2M
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-400">Click</span>
                      <span className="font-semibold text-slate-100">
                        84K
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-400">Vendite</span>
                      <span className="font-semibold text-slate-100">
                        9,4K
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card motore AI */}
              <div className="rounded-2xl border border-emerald-500/40 bg-slate-950/90 p-4 shadow-[0_0_45px_rgba(16,185,129,0.6)]">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                    Motore AI & Neural Engine
                  </p>
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px2 py-1 px-2">
                      <span className="h-[7px] w-[7px] rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                      <span className="font-semibold text-emerald-200">
                        AI: ON
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 px-2 py-1 text-[10px] text-emerald-200">
                      Neural engine
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-emerald-50/90">
                  La rete neurale addestrata su scenari reali guida
                  l&apos;ottimizzazione di copy, creatività e bid in modo
                  continuo, adattandosi al comportamento degli utenti in tempo
                  reale.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEZIONE BENEFICI */}
        <section className="border-b border-slate-800/60 bg-slate-950/60">
          <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Raggiungi i clienti in ogni fase del percorso di acquisto
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-300 md:text-base">
              L&apos;intelligenza artificiale di AI Ads Revolution ottimizza le
              tue campagne dalla scoperta alla conversione, adattando budget,
              creatività e targeting in tempo reale.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
                <p className="text-xl">📈</p>
                <h3 className="mt-3 text-sm font-semibold md:text-base">
                  Migliora la visibilità dei prodotti
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  Aiuta i clienti a trovare i tuoi prodotti tramite annunci che
                  appaiono in ricerche e posizionamenti altamente rilevanti,
                  scelti automaticamente dall&apos;AI.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
                <p className="text-xl">✨</p>
                <h3 className="mt-3 text-sm font-semibold md:text-base">
                  Raggiungi nuovi clienti
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  Formati creativi coinvolgenti generati e testati
                  automaticamente. La rete neurale individua i messaggi più
                  efficaci per ciascun segmento.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
                <p className="text-xl">💸</p>
                <h3 className="mt-3 text-sm font-semibold md:text-base">
                  Vendi in modo efficiente
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  Parole chiave e segnali di intento per apparire in ricerche ad
                  alta probabilità di acquisto, riducendo al minimo gli sprechi
                  pubblicitari.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BUDGET & CONTROLLO */}
        <section className="border-b border-slate-800/60">
          <div className="mx-auto max-w-6xl px-4 py-10 md:flex md:items-center md:justify-between md:gap-10 md:py-14">
            <div className="max-w-xl">
              <h2 className="text-2xl font-semibold md:text-3xl">
                Soluzioni pubblicitarie per ogni budget
              </h2>
              <p className="mt-3 text-sm text-slate-300 md:text-base">
                Scegli il budget ideale per la tua azienda. Sei tu a decidere
                quanto investire: aumentare la spesa può contribuire a
                incrementare le vendite, mentre l&apos;AI lavora per trovare il
                punto di equilibrio migliore.
              </p>
            </div>
            <div className="mt-6 grid flex-1 gap-4 md:mt-0 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                <p className="text-xl">💰</p>
                <h3 className="mt-2 text-sm font-semibold md:text-base">
                  Nessun costo iniziale
                </h3>
                <p className="mt-2 text-xs text-slate-300 md:text-sm">
                  Il prezzo si basa sul costo per clic: paghi solo quando un
                  acquirente interagisce con il tuo annuncio.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                <p className="text-xl">🌱</p>
                <h3 className="mt-2 text-sm font-semibold md:text-base">
                  Inizia con poco
                </h3>
                <p className="mt-2 text-xs text-slate-300 md:text-sm">
                  Imposta un budget ridotto e lascia che l&apos;AI individui le
                  opportunità migliori. Potrai aumentarlo quando inizierai a
                  vedere risultati.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                <p className="text-xl">🎯</p>
                <h3 className="mt-2 text-sm font-semibold md:text-base">
                  Controllo totale
                </h3>
                <p className="mt-2 text-xs text-slate-300 md:text-sm">
                  Definisci budget giornaliero e mensile: non ti verrà mai
                  addebitato un importo superiore a quello impostato.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ASSISTENTE AI */}
        <section className="border-b border-slate-800/60 bg-slate-950/70">
          <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
            <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
              <div>
                <h2 className="text-2xl font-semibold md:text-3xl">
                  Non sai da dove cominciare?
                  <span className="block text-emerald-400">
                    Ci pensa la nostra AI.
                  </span>
                </h2>
                <p className="mt-3 text-sm text-slate-300 md:text-base">
                  Impara a promuovere la crescita del tuo business con la guida
                  AI. Ti mostreremo come creare, lanciare e ottimizzare campagne
                  con pochi clic.
                </p>
                <p className="mt-2 text-sm text-slate-300 md:text-base">
                  Nessuna esperienza tecnica richiesta: l&apos;AI ti guida passo
                  dopo passo, suggerendo formati e strategie a seconda degli
                  obiettivi che imposti.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <Link
                    href="/auth/register"
                    className="rounded-full bg-emerald-400 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-950 shadow-[0_0_30px_rgba(52,211,153,0.75)] hover:bg-emerald-300"
                  >
                    Inizia subito
                  </Link>
                  <Link
                    href="/dashboard/ai"
                    className="text-xs font-medium text-emerald-300 hover:text-emerald-200"
                  >
                    Prova l&apos;assistente AI →
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
                  Assistenza AI integrata
                </p>
                <div className="mt-3 space-y-3 text-xs text-slate-300">
                  <p>
                    Il sistema ti propone obiettivi, budget iniziale e tipi di
                    campagna. Puoi accettare i suggerimenti o personalizzarli in
                    ogni momento.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Setup campagna guidato</span>
                      <span className="text-emerald-300">100%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-800">
                      <div className="h-full w-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.9)]" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Ottimizzazione automatica</span>
                    <span className="text-emerald-300">Attiva</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Suggerimenti creativi</span>
                    <span className="text-emerald-300">Disponibili</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEZIONE PRODOTTI & FORMATI (component già creato) */}
        <ProductsFormatsSection />

        {/* SEZIONE GLOBALE */}
        <section className="border-t border-slate-800/60 bg-slate-950">
          <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
            <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
              <div>
                <h2 className="text-2xl font-semibold md:text-3xl">
                  Una piattaforma globale.
                  <span className="block text-emerald-400">
                    Pronta per ogni Paese.
                  </span>
                </h2>
                <p className="mt-3 max-w-xl text-sm text-slate-300 md:text-base">
                  AI Ads Revolution nasce per essere utilizzata in tutto il
                  mondo. La piattaforma è progettata per espandersi su più
                  mercati con supporto multilingua e regole di targeting
                  avanzate.
                </p>
              </div>
              <div className="grid gap-2 text-xs text-slate-300 sm:grid-cols-2 md:text-sm">
                <div>
                  <p className="text-slate-400">Europa</p>
                  <p>Italia · Spagna · Francia · Germania · Paesi Bassi</p>
                </div>
                <div>
                  <p className="text-slate-400">Medio Oriente</p>
                  <p>Emirati Arabi Uniti · Arabia Saudita</p>
                </div>
                <div>
                  <p className="text-slate-400">Nord America</p>
                  <p>Stati Uniti · Canada</p>
                </div>
                <div>
                  <p className="text-slate-400">Altro</p>
                  <p>Brasile · India · Singapore · Australia</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-slate-800/60 bg-slate-950">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-4">
              <span className="font-semibold text-slate-200">
                © 2025 AI Ads Revolution
              </span>
              <span>Obiettivi</span>
              <span>Prodotti</span>
              <span>Dati &amp; analisi</span>
              <span>Supporto</span>
              <span>Partners</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="hover:text-slate-200">
                Informativa sulla privacy
              </button>
              <button className="hover:text-slate-200">
                Termini e condizioni
              </button>
              <button className="hover:text-slate-200">
                Informativa cookie
              </button>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
