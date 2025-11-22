import Link from "next/link";

const heroStats = [
  { label: "CTR medio", value: "+32%", hint: "su campagne ottimizzate con AI" },
  { label: "CPC medio", value: "€0,21", hint: "costo per clic medio indicativo" },
  { label: "ROAS", value: "4,7x", hint: "ritorno sull'investimento pubblicitario" },
];

const funnelStats = [
  { label: "Impression", value: "1,2M", level: 100 },
  { label: "Click", value: "84K", level: 65 },
  { label: "Vendite", value: "9,4K", level: 40 },
];

const journeyBlocks = [
  {
    icon: "📈",
    title: "Migliora la visibilità dei prodotti",
    description:
      "Aiuta i clienti a trovare i tuoi prodotti tramite annunci che appaiono in ricerche e posizionamenti altamente rilevanti, scelti automaticamente dall'AI.",
  },
  {
    icon: "✨",
    title: "Raggiungi nuovi clienti",
    description:
      "Formati creativi coinvolgenti generati e testati automaticamente. La rete neurale individua i messaggi più efficaci per ciascun segmento.",
  },
  {
    icon: "💸",
    title: "Vendi in modo efficiente",
    description:
      "Parole chiave e segnali di intento per apparire in ricerche ad alta probabilità di acquisto, riducendo al minimo gli sprechi pubblicitari.",
  },
];

const budgetBlocks = [
  {
    icon: "💰",
    title: "Nessun costo iniziale",
    description:
      "Il prezzo si basa sul costo per clic: paghi solo quando un acquirente interagisce con il tuo annuncio.",
  },
  {
    icon: "🌱",
    title: "Inizia con poco",
    description:
      "Imposta un budget ridotto e lascia che l'AI individui le opportunità migliori. Potrai aumentarlo quando inizierai a vedere risultati.",
  },
  {
    icon: "🎯",
    title: "Controllo totale",
    description:
      "Definisci budget giornaliero e mensile: non ti verrà mai addebitato un importo superiore a quello impostato.",
  },
];

const goals = [
  "Creare brand awareness",
  "Raggiungere più clienti",
  "Aumentare il traffico",
  "Aumentare vendite e conversioni",
  "Migliorare la fidelizzazione",
];

const products = [
  "Annunci sponsorizzati",
  "Sponsored Products",
  "Sponsored Brands",
  "Annunci display",
  "Annunci video & audio",
];

const analytics = [
  "AI Analytics",
  "Attribution",
  "Reportistica campagne",
  "Dati omnicanale",
];

export default function HomePage() {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      {/* TOP BAR FUTURISTICA */}
      <header className="border-b border-slate-900 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Logo + Beta */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-slate-50 to-slate-400 text-slate-950 flex items-center justify-center text-[10px] font-bold tracking-[0.15em]">
                AI
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase">
                  Ads
                </span>
                <span className="text-[10px] text-slate-400">
                  AI Ads Revolution
                </span>
              </div>
            </Link>
            <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-0.5 text-[10px] font-semibold text-emerald-300">
              Beta
            </span>
          </div>

          {/* Switch segmenti */}
          <nav className="hidden items-center gap-4 text-[11px] text-slate-300 sm:flex">
            <button className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-slate-50">
              Piccola impresa
            </button>
            <button className="rounded-full border border-transparent px-3 py-1 hover:border-slate-700 hover:bg-slate-900/70">
              Azienda di grandi dimensioni
            </button>
            <button className="rounded-full border border-transparent px-3 py-1 hover:border-slate-700 hover:bg-slate-900/70">
              Partner
            </button>
            <a href="#journey" className="hover:text-slate-50">
              Scopri
            </a>
          </nav>

          {/* Auth */}
          <div className="flex items-center gap-2">
            <Link
              href="/auth/login"
              className="hidden rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-200 hover:bg-slate-900 sm:inline"
            >
              Accedi
            </Link>
            <Link
              href="/auth/register"
              className="rounded-full bg-slate-50 px-4 py-1.5 text-[11px] font-semibold text-slate-950 hover:bg-white"
            >
              Registrati
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO SECTION – DARK FUTURE + GRAFICI */}
        <section
          id="hero"
          className="border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950/95"
        >
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 sm:py-14 md:grid-cols-[1.4fr,1.1fr] md:items-center">
            {/* Testo principale */}
            <div className="space-y-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                Piattaforma di advertising AI-first
              </p>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                Fai crescere la tua attività
                <br />
                con annunci potenziati dall&apos;intelligenza artificiale.
              </h1>
              <p className="text-[13px] leading-relaxed text-slate-300">
                Raggiungi gli acquirenti nel momento esatto in cui cercano
                prodotti come i tuoi. AI Ads Revolution analizza milioni di
                segnali in tempo reale per ottimizzare visibilità, traffico e
                conversioni.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/auth/register"
                  className="rounded-full bg-slate-50 px-5 py-2 text-[12px] font-semibold text-slate-950 hover:bg-white"
                >
                  Inizia ora
                </Link>
                <a
                  href="#journey"
                  className="flex items-center gap-1 text-[12px] text-slate-200 underline-offset-4 hover:underline"
                >
                  <span>Guarda come funziona</span>
                  <span>→</span>
                </a>
              </div>

              <div className="pt-3 text-[11px] text-slate-300">
                <span className="text-emerald-300 font-semibold">30%</span>{" "}
                Le piccole imprese che utilizzano AI Ads Revolution attribuiscono
                in media il 30% delle vendite alle nostre campagne ottimizzate
                dall&apos;AI.*
              </div>
              <p className="text-[9px] text-slate-500 max-w-md">
                *Dati interni AI Ads Revolution, risultati medi aggregati non
                garantiscono performance future.
              </p>
            </div>

            {/* Lato destro: pannello dashboard + grafici */}
            <div className="space-y-4">
              {/* Card campagna */}
              <div className="relative overflow-hidden rounded-3xl bg-slate-950/90 p-4 ring-1 ring-slate-800 shadow-[0_0_40px_rgba(15,23,42,0.8)]">
                <div className="absolute inset-px rounded-[1.3rem] border border-emerald-500/10 pointer-events-none" />
                <div className="mb-3 flex items-center justify-between gap-2 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.7)]" />
                    <span className="font-semibold text-slate-50">
                      Campagna AI attiva
                    </span>
                  </div>
                  <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] text-slate-400">
                    Budget efficiente
                  </span>
                </div>

                {/* KPI principali */}
                <div className="grid gap-3 text-[11px] sm:grid-cols-3">
                  {heroStats.map((s) => (
                    <div key={s.label} className="space-y-1">
                      <div className="text-slate-400">{s.label}</div>
                      <div className="text-[15px] font-semibold text-slate-50">
                        {s.value}
                      </div>
                      <div className="text-[9px] text-slate-500">{s.hint}</div>
                    </div>
                  ))}
                </div>

                {/* Grafico funnel / barre */}
                <div className="mt-4 grid gap-3 md:grid-cols-[1.2fr,1fr]">
                  {/* Barre verticali */}
                  <div className="rounded-2xl bg-slate-950/90 p-3 ring-1 ring-slate-800/80">
                    <div className="mb-2 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Performance ultime 4 settimane</span>
                      <span className="text-emerald-300 font-medium">
                        +19% conversioni
                      </span>
                    </div>
                    <div className="flex items-end gap-3">
                      {funnelStats.map((f) => (
                        <div key={f.label} className="flex flex-1 flex-col gap-1">
                          <div className="h-20 rounded-md bg-slate-900 flex items-end">
                            <div
                              className="w-full rounded-md bg-gradient-to-t from-emerald-500 to-cyan-400 shadow-[0_0_18px_rgba(45,212,191,0.7)]"
                              style={{ height: `${f.level}%` }}
                            />
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {f.label}
                          </div>
                          <div className="text-[10px] text-slate-200">
                            {f.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* “Immagine” piattaforma AI (mock) */}
                  <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-3 ring-1 ring-slate-800/80">
                    <div className="mb-2 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Motore AI &amp; rete neurale</span>
                      <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[9px] text-emerald-300">
                        Visualizzazione live
                      </span>
                    </div>
                    {/* “mini screenshot” con card e bolle */}
                    <div className="relative h-24 overflow-hidden rounded-xl bg-slate-950">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.18),_transparent_55%)]" />
                      <div className="absolute inset-0 flex flex-col justify-between p-3">
                        <div className="flex gap-2">
                          <div className="flex-1 rounded-lg bg-slate-900/80 p-2 text-[9px] text-slate-300">
                            <div className="text-[9px] text-slate-400">
                              Segmento attivo
                            </div>
                            <div className="text-[10px] text-emerald-300">
                              Intento di acquisto alto
                            </div>
                          </div>
                          <div className="w-10 rounded-lg bg-slate-900/80 p-1 text-[8px] text-slate-300 flex flex-col items-center justify-center">
                            <span>AI</span>
                            <span className="text-[8px] text-emerald-300">
                              ON
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-[9px] text-slate-400">
                          <span>Neural engine: ottimizzazione creatività</span>
                          <span className="text-emerald-300">Realtime</span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-[9px] text-slate-500">
                      La rete neurale addestrata su scenari reali guida
                      l&apos;ottimizzazione di copy, creatività e bid in modo
                      continuo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* JOURNEY – RAGGIUNGI I CLIENTI */}
        <section
          id="journey"
          className="border-b border-slate-900 bg-slate-950"
        >
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 space-y-5">
            <div className="space-y-1 text-center">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                Raggiungi i clienti in ogni fase del percorso di acquisto
              </h2>
              <p className="text-[13px] text-slate-300 max-w-3xl mx-auto">
                L&apos;intelligenza artificiale di AI Ads Revolution ottimizza
                le tue campagne dalla scoperta alla conversione, adattando
                budget, creatività e targeting in tempo reale.
              </p>
            </div>

            <div className="grid gap-4 text-[12px] md:grid-cols-3">
              {journeyBlocks.map((b) => (
                <div
                  key={b.title}
                  className="rounded-2xl bg-slate-950/90 p-4 ring-1 ring-slate-800"
                >
                  <div className="text-[20px] mb-1">{b.icon}</div>
                  <div className="text-[11px] font-semibold text-slate-50">
                    {b.title}
                  </div>
                  <p className="mt-2 text-[11px] text-slate-400">
                    {b.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BUDGET – SOLUZIONI PER OGNI BUDGET */}
        <section
          id="budget"
          className="border-b border-slate-900 bg-slate-950/98"
        >
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 space-y-5">
            <div className="space-y-1">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                Soluzioni pubblicitarie per ogni budget
              </h2>
              <p className="text-[13px] text-slate-300 max-w-3xl">
                Scegli il budget ideale per la tua azienda. Sei tu a decidere
                quanto investire: aumentare la spesa può contribuire a
                incrementare le vendite, mentre l&apos;AI lavora per trovare il
                punto di equilibrio migliore.
              </p>
            </div>

            <div className="grid gap-4 text-[12px] md:grid-cols-3">
              {budgetBlocks.map((b) => (
                <div
                  key={b.title}
                  className="rounded-2xl bg-slate-950/90 p-4 ring-1 ring-slate-800"
                >
                  <div className="text-[20px] mb-1">{b.icon}</div>
                  <div className="text-[11px] font-semibold text-slate-50">
                    {b.title}
                  </div>
                  <p className="mt-2 text-[11px] text-slate-400">
                    {b.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-6 text-[12px] md:grid-cols-[1.3fr,1fr]">
              <div className="space-y-2">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Non sai da dove cominciare?
                </h3>
                <p className="text-[11px] text-slate-300">
                  Impara a promuovere la crescita del tuo business con la guida
                  AI. Ti mostreremo come creare, lanciare e ottimizzare
                  campagne con pochi clic.
                </p>
                <p className="text-[11px] text-slate-400">
                  Nessuna esperienza tecnica richiesta: l&apos;AI ti guida
                  passo dopo passo, suggerendo formati e strategie a seconda
                  degli obiettivi che imposti.
                </p>
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center rounded-full bg-slate-50 px-4 py-1.5 text-[11px] font-semibold text-slate-950 hover:bg-white mt-2"
                >
                  Inizia subito
                </Link>
              </div>

              {/* Mini card “progresso AI” */}
              <div className="rounded-2xl bg-slate-950/90 p-4 ring-1 ring-slate-800">
                <div className="text-[11px] font-semibold text-slate-50">
                  Assistenza AI integrata
                </div>
                <p className="mt-2 text-[11px] text-slate-400">
                  Il sistema ti propone obiettivi, budget iniziale e tipi di
                  campagna. Puoi accettare i suggerimenti o personalizzarli in
                  ogni momento.
                </p>
                <div className="mt-3 space-y-2 text-[10px] text-slate-300">
                  <div className="flex items-center justify-between">
                    <span>Setup campagna guidato</span>
                    <span className="text-emerald-300">100%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-900">
                    <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400" />
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

        {/* CTA FINALE */}
        <section className="border-b border-slate-900 bg-slate-950">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 text-center text-[12px] space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
              Inizia subito a far crescere la tua attività
            </h2>
            <p className="text-[11px] text-slate-300 max-w-2xl mx-auto">
              Con le soluzioni self-service di AI Ads Revolution puoi creare
              campagne complete in pochi minuti. Imposta obiettivi, collega
              prodotti e lascia che l&apos;AI lavori per te.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/auth/register"
                className="rounded-full bg-slate-50 px-5 py-2 text-[12px] font-semibold text-slate-950 hover:bg-white"
              >
                Inizia ora
              </Link>
              <Link
                href="/auth/login"
                className="rounded-full border border-slate-700 px-5 py-2 text-[12px] text-slate-200 hover:bg-slate-900"
              >
                Accedi alla dashboard
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER – OBIETTIVI, PRODOTTI, ANALYTICS, AZIENDA */}
      <footer className="border-t border-slate-900 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-6 text-[10px] text-slate-500 space-y-6">
          <div className="grid gap-6 md:grid-cols-4">
            <div>
              <div className="text-[11px] font-semibold text-slate-100">
                Obiettivi
              </div>
              <ul className="mt-2 space-y-1">
                {goals.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-100">
                Prodotti
              </div>
              <ul className="mt-2 space-y-1">
                {products.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-100">
                Dati &amp; analisi
              </div>
              <ul className="mt-2 space-y-1">
                {analytics.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-100">
                Chi siamo
              </div>
              <ul className="mt-2 space-y-1">
                <li>La nostra missione</li>
                <li>Supporto</li>
                <li>Partners</li>
                <li>Posizioni aperte (presto)</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-900 pt-3">
            <div>© {year} AI Ads Revolution. Tutti i diritti riservati.</div>
            <div className="flex flex-wrap gap-3">
              <button className="text-slate-400 hover:text-slate-200">
                Informativa sulla privacy
              </button>
              <button className="text-slate-400 hover:text-slate-200">
                Termini e condizioni
              </button>
              <button className="text-slate-400 hover:text-slate-200">
                Informativa cookie
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
