import Link from "next/link";

const steps = [
  {
    step: "01",
    title: "Input",
    description:
      "Imposti obiettivi, budget, mercati e colleghi il catalogo prodotti o i servizi da promuovere.",
  },
  {
    step: "02",
    title: "Raccolta segnali",
    description:
      "Vengono analizzati segnali di intento, contesto, dispositivo, storico campagne e stagionalità.",
  },
  {
    step: "03",
    title: "Rete neurale",
    description:
      "La rete neurale generativa testa combinazioni di creatività, audience e offerte in tempo reale.",
  },
  {
    step: "04",
    title: "Ottimizzazione continua",
    description:
      "Il sistema ribilancia budget e targeting per aumentare CTR, conversioni e ROAS nel tempo.",
  },
];

const beforeAfter = [
  { label: "CTR", unit: "%", before: 1.2, after: 3.1, beforeBar: 30, afterBar: 85 },
  { label: "CPC", unit: "€", before: 0.42, after: 0.21, beforeBar: 70, afterBar: 40 },
  { label: "ROAS", unit: "x", before: 1.8, after: 4.7, beforeBar: 35, afterBar: 90 },
];

export default function ComeFunzionaPage() {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      {/* NAVBAR */}
      <header className="border-b border-slate-900 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
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
              Neural Engine v2
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <Link
              href="/auth/login"
              className="hidden rounded-full border border-slate-700 px-3 py-1 text-slate-200 hover:bg-slate-900 sm:inline"
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
        {/* HERO ULTRA FUTURISTICA */}
        <section className="relative border-b border-slate-900">
          {/* Glow di sfondo */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 left-10 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />
            <div className="absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.2),transparent_55%),radial-gradient(circle_at_80%_120%,rgba(15,118,110,0.25),transparent_60%)] opacity-60" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 space-y-6">
            {/* Breadcrumb */}
            <div className="text-[11px] text-slate-400">
              <Link href="/" className="hover:text-slate-100">
                Home
              </Link>{" "}
              <span className="mx-1">/</span>
              <span className="text-slate-300">Come funziona</span>
            </div>

            <div className="grid gap-10 md:grid-cols-[1.4fr,1.1fr] md:items-center">
              {/* Testo */}
              <div className="space-y-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-300">
                  Motore AI &amp; rete neurale proprietaria
                </p>
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                  Un sistema operativo
                  <br />
                  per la tua pubblicità AI-driven.
                </h1>
                <p className="text-[13px] leading-relaxed text-slate-200">
                  AI Ads Revolution analizza milioni di segnali ogni giorno:
                  intenzione di acquisto, percorso utente, contesto e storico
                  delle campagne. La rete neurale decide **dove**, **quando** e
                  **come** mostrare i tuoi annunci per massimizzare il ritorno.
                </p>
                <p className="text-[12px] text-slate-400">
                  Non è solo un pannello di controllo, ma un cervello che
                  ragiona sui tuoi dati pubblicitari in tempo reale, come un
                  team di esperti media che lavora 24/7.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href="/auth/register"
                    className="rounded-full bg-slate-50 px-5 py-2 text-[12px] font-semibold text-slate-950 hover:bg-white"
                  >
                    Crea un account
                  </Link>
                  <Link
                    href="/dashboard/ai"
                    className="rounded-full border border-slate-700 px-4 py-2 text-[12px] text-slate-200 hover:bg-slate-900"
                  >
                    Apri il pannello AI
                  </Link>
                </div>
              </div>

              {/* Pannello AI cinematografico */}
              <div className="relative overflow-hidden rounded-3xl bg-slate-950/95 p-4 ring-1 ring-slate-800 shadow-[0_0_60px_rgba(15,23,42,1)]">
                <div className="absolute inset-px rounded-[1.4rem] border border-slate-700/70 pointer-events-none" />
                {/* Header pannello */}
                <div className="mb-3 flex items-center justify-between text-[10px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(16,185,129,0.9)]" />
                    <span>Neural Control Panel</span>
                  </div>
                  <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[9px] text-emerald-300">
                    Live • Ottimizzazione attiva
                  </span>
                </div>

                {/* Layout interno a 2 colonne */}
                <div className="grid gap-3 md:grid-cols-[1.3fr,1fr]">
                  {/* Colonna sinistra: grafico linea + heat */}
                  <div className="rounded-2xl bg-slate-950/95 p-3 ring-1 ring-slate-800/80">
                    <div className="mb-2 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Previsione conversioni (modello AI)</span>
                      <span className="text-emerald-300">+19% vs baseline</span>
                    </div>
                    <div className="relative h-24 overflow-hidden rounded-xl bg-slate-950">
                      {/* Griglia */}
                      <div className="absolute inset-0 opacity-50 bg-[linear-gradient(to_right,rgba(51,65,85,0.9)_1px,transparent_1px),linear-gradient(to_top,rgba(30,41,59,0.9)_1px,transparent_1px)] bg-[size:14px_14px]" />
                      {/* Linea AI */}
                      <svg
                        viewBox="0 0 100 40"
                        className="relative h-full w-full"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient
                            id="ai-line"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#22c55e" />
                            <stop offset="50%" stopColor="#22d3ee" />
                            <stop offset="100%" stopColor="#a855f7" />
                          </linearGradient>
                        </defs>
                        <polyline
                          fill="none"
                          stroke="url(#ai-line)"
                          strokeWidth={1.8}
                          strokeLinecap="round"
                          points="0,30 10,29 18,28 26,27 34,25 42,22 50,20 58,17 66,13 74,11 82,9 90,8 100,7"
                        />
                      </svg>
                      {/* Glow centrale */}
                      <div className="pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/15 blur-2xl" />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[9px] text-slate-400">
                      <span>
                        La curva rappresenta la probabilità di conversione stimata nel tempo.
                      </span>
                      <span className="text-slate-300">Aggiornato ora</span>
                    </div>
                  </div>

                  {/* Colonna destra: segmenti + stato rete neurale */}
                  <div className="space-y-3">
                    <div className="rounded-2xl bg-slate-950/95 p-3 ring-1 ring-slate-800/80">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1.5">
                        <span>Segmento attivo</span>
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[8px] text-emerald-300">
                          Intento di acquisto alto
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-200">
                        “Acquirenti che hanno cercato il tuo prodotto nelle
                        ultime 72h e hanno aggiunto al carrello negli ultimi 7
                        giorni.”
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-950/95 p-3 ring-1 ring-slate-800/80">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2">
                        <span>Neural Engine status</span>
                        <span className="text-emerald-300">Stabile</span>
                      </div>
                      <div className="space-y-1.5 text-[9px]">
                        <div className="flex items-center justify-between">
                          <span>Scenario testati</span>
                          <span className="text-slate-300">12.480</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Creatività attive</span>
                          <span className="text-slate-300">38</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Aggiornamenti bid</span>
                          <span className="text-slate-300">ogni 5 min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-[9px] text-slate-500">
                  Interfaccia simulata a scopo illustrativo. I risultati reali
                  dipendono da settore, budget, dati disponibili e contesto
                  competitivo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STEPS DEL FLUSSO */}
        <section className="border-b border-slate-900 bg-slate-950">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 space-y-6">
            <div className="space-y-1">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                Dal segnale all&apos;asta: le 4 fasi del sistema
              </h2>
              <p className="text-[13px] text-slate-300 max-w-3xl">
                Non devi capire ogni dettaglio di machine learning. Ti basta
                sapere cosa succede dietro le quinte quando lanci una campagna.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-4 text-[12px]">
              {steps.map((s) => (
                <div
                  key={s.step}
                  className="relative rounded-2xl bg-slate-950/90 p-4 ring-1 ring-slate-800 overflow-hidden"
                >
                  <div className="pointer-events-none absolute -top-10 right-0 h-20 w-20 rounded-full bg-emerald-500/10 blur-2xl" />
                  <div className="text-[10px] font-semibold text-emerald-300">
                    {s.step}
                  </div>
                  <div className="mt-1 text-[11px] font-semibold text-slate-50">
                    {s.title}
                  </div>
                  <p className="mt-2 text-[11px] text-slate-400">
                    {s.description}
                  </p>
                  <div className="pointer-events-none absolute inset-0 rounded-2xl border border-slate-800/40" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GRAFICO PRIMA / DOPO AI */}
        <section className="border-b border-slate-900 bg-slate-950/98">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 grid gap-8 text-[12px] md:grid-cols-[1.3fr,1fr]">
            <div className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                Prima e dopo la rete neurale
              </h2>
              <p className="text-[13px] text-slate-300">
                Qui vedi un esempio semplificato di come cambiano le metriche
                chiave passando da una gestione manuale a una gestione
                guidata dall&apos;AI di AI Ads Revolution.
              </p>
              <p className="text-[11px] text-slate-400">
                Non è una promessa di risultato: ogni business è diverso. Ma è
                il tipo di salto qualitativo che puoi aspettarti quando le
                decisioni vengono prese da un motore predittivo invece che da
                tentativi manuali.
              </p>

              <div className="mt-3 rounded-2xl bg-slate-950/95 p-4 ring-1 ring-slate-800">
                <div className="mb-3 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Scenario comparativo</span>
                  <span className="text-slate-300">Gestione manuale vs AI</span>
                </div>

                <div className="space-y-3">
                  {beforeAfter.map((m) => (
                    <div key={m.label} className="space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-300">{m.label}</span>
                        <span className="text-slate-500">
                          Manuale {m.before}
                          {m.unit} →{" "}
                          <span className="text-emerald-300">
                            AI {m.after}
                            {m.unit}
                          </span>
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-900 flex overflow-hidden">
                        <div
                          className="h-full rounded-full bg-slate-700"
                          style={{ width: `${m.beforeBar}%` }}
                        />
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-purple-500"
                          style={{ width: `${m.afterBar}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-3 text-[9px] text-slate-500">
                  Valori illustrativi, non garantiti. Servono a mostrare il
                  potenziale di ottimizzazione quando un motore AI gestisce le
                  decisioni di bidding e targeting.
                </p>
              </div>
            </div>

            {/* Box perché diverso */}
            <div className="space-y-3">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Perché è diverso da una normale piattaforma di ads
              </h3>
              <div className="rounded-2xl bg-slate-950/95 p-4 ring-1 ring-slate-800 space-y-2">
                <p className="text-[11px] text-slate-300">
                  AI Ads Revolution è pensato come un livello di intelligenza in
                  più rispetto ai tool classici: guarda i tuoi dati con la
                  prospettiva di un algoritmo, non solo di un pannello.
                </p>
                <ul className="mt-2 space-y-1 text-[11px] text-slate-400">
                  <li>• Modelli che apprendono dai tuoi risultati nel tempo.</li>
                  <li>• Segmenti dinamici creati e aggiornati dall&apos;AI.</li>
                  <li>• Suggerimenti su creatività, parole chiave e budget.</li>
                  <li>• Vista unica del percorso cliente su più touchpoint.</li>
                </ul>
              </div>

              <div className="rounded-2xl bg-slate-950/95 p-4 ring-1 ring-slate-800 space-y-2">
                <div className="text-[11px] font-semibold text-slate-100">
                  Pronto a vedere la piattaforma all&apos;opera?
                </div>
                <p className="text-[11px] text-slate-400">
                  Crea un account, configura la prima campagna guidata e
                  osserva come i grafici iniziano a muoversi quando la rete
                  neurale prende il controllo.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <Link
                    href="/auth/register"
                    className="rounded-full bg-slate-50 px-4 py-1.5 text-[11px] font-semibold text-slate-950 hover:bg-white"
                  >
                    Crea un account
                  </Link>
                  <Link
                    href="/auth/login"
                    className="rounded-full border border-slate-700 px-4 py-1.5 text-[11px] text-slate-200 hover:bg-slate-900"
                  >
                    Accedi se sei già cliente
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER COMPATTO */}
      <footer className="border-t border-slate-900 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-5 text-[10px] text-slate-500 flex flex-wrap items-center justify-between gap-3">
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
      </footer>
    </div>
  );
}
