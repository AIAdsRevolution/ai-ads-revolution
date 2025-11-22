import Link from "next/link";

const steps = [
  {
    step: "01",
    title: "Definisci gli obiettivi",
    description:
      "Brand awareness, traffico, vendite, remarketing. Selezioni la priorità e il sistema adatta la strategia.",
  },
  {
    step: "02",
    title: "Collega prodotti e pubblico",
    description:
      "Connetti feed prodotti, categorie e mercati. L'intelligenza artificiale costruisce i primi segmenti.",
  },
  {
    step: "03",
    title: "Il motore AI entra in azione",
    description:
      "La rete neurale testa combinazioni di creatività, posizionamenti e offerte per trovare ciò che funziona meglio.",
  },
  {
    step: "04",
    title: "Ottimizzazione continua",
    description:
      "In base ai risultati, il sistema ribilancia budget, audience e messaggi per aumentare performance e stabilità.",
  },
];

const beforeAfter = [
  { label: "CTR", before: 1.2, after: 3.1 },
  { label: "CPC", before: 0.42, after: 0.21 },
  { label: "ROAS", before: 1.8, after: 4.7 },
];

export default function ComeFunzionaPage() {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      {/* NAVBAR MINIMALE */}
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
        {/* HERO COME FUNZIONA */}
        <section className="border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950/95">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 space-y-6">
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
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  Come funziona AI Ads Revolution
                </p>
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                  Dal segnale al risultato:
                  <br />
                  come la nostra AI trasforma i dati in vendite.
                </h1>
                <p className="text-[13px] leading-relaxed text-slate-300">
                  Dietro ogni impression e clic ci sono milioni di segnali che
                  la rete neurale analizza in tempo reale: intenzione di
                  acquisto, contesto, dispositivo, storico delle campagne e
                  probabilità di conversione.
                </p>
                <p className="text-[12px] text-slate-400">
                  L&apos;obiettivo non è mostrare più annunci, ma mostrare
                  quelli giusti, alla persona giusta, nel momento giusto e al
                  costo più efficiente possibile.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href="/auth/register"
                    className="rounded-full bg-slate-50 px-5 py-2 text-[12px] font-semibold text-slate-950 hover:bg-white"
                  >
                    Inizia ora
                  </Link>
                  <Link
                    href="/dashboard/ai"
                    className="rounded-full border border-slate-700 px-4 py-2 text-[12px] text-slate-200 hover:bg-slate-900"
                  >
                    Vai al pannello AI
                  </Link>
                </div>
              </div>

              {/* Mock UI futuristica */}
              <div className="relative overflow-hidden rounded-3xl bg-slate-950/90 p-4 ring-1 ring-slate-800 shadow-[0_0_50px_rgba(15,23,42,0.9)]">
                <div className="absolute inset-px rounded-[1.4rem] border border-slate-700/60 pointer-events-none" />
                <div className="mb-3 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Motore AI &amp; rete neurale</span>
                  <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[9px] text-emerald-300">
                    Ottimizzazione attiva • Live
                  </span>
                </div>

                {/* parte “schermata” */}
                <div className="relative h-40 overflow-hidden rounded-2xl bg-slate-950">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(148,163,184,0.35),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(16,185,129,0.28),transparent_55%)]" />
                  <div className="absolute inset-0 flex flex-col justify-between p-3">
                    <div className="flex gap-2">
                      <div className="flex-1 rounded-xl bg-slate-950/90 p-2 ring-1 ring-slate-800 text-[9px] text-slate-300">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] text-slate-400">
                            Segmento corrente
                          </span>
                          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[8px] text-emerald-300">
                            Intento alto
                          </span>
                        </div>
                        <div className="mt-1 text-[10px] text-slate-100">
                          “Acquirenti attivi · ricerca prodotto · carrello in 7
                          giorni”
                        </div>
                      </div>
                      <div className="w-12 rounded-xl bg-slate-950/90 p-2 ring-1 ring-slate-800 flex flex-col items-center justify-center text-[8px] text-slate-300">
                        <span>AI CORE</span>
                        <span className="mt-1 h-1.5 w-7 rounded-full bg-slate-900">
                          <span className="block h-1.5 w-4 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
                        </span>
                      </div>
                    </div>

                    {/* “grafico linea” stilizzato */}
                    <div className="mt-3">
                      <div className="mb-1 flex items-center justify-between text-[9px] text-slate-400">
                        <span>Andamento previsione conversioni</span>
                        <span className="text-emerald-300">+19% vs baseline</span>
                      </div>
                      <div className="relative h-14 overflow-hidden rounded-lg bg-slate-950/90 ring-1 ring-slate-800">
                        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,rgba(51,65,85,0.8)_1px,transparent_1px),linear-gradient(to_top,rgba(51,65,85,0.8)_1px,transparent_1px)] bg-[size:14px_14px]" />
                        <svg
                          viewBox="0 0 100 40"
                          className="relative h-full w-full"
                          preserveAspectRatio="none"
                        >
                          <polyline
                            fill="none"
                            stroke="url(#grad-line)"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            points="0,30 15,28 25,26 35,24 45,22 55,20 65,18 75,14 85,10 95,8"
                          />
                          <defs>
                            <linearGradient
                              id="grad-line"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop offset="0%" stopColor="#22c55e" />
                              <stop offset="100%" stopColor="#22d3ee" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[9px] text-slate-400">
                      <span>La rete neurale adatta l&apos;offerta ogni pochi minuti.</span>
                      <span className="text-slate-300">Aggiornato ora</span>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-[9px] text-slate-500">
                  Visualizzazione a scopo illustrativo. I risultati effettivi
                  dipendono da settore, creatività, stagionalità e altri
                  fattori.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STEPS */}
        <section className="border-b border-slate-900 bg-slate-950">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 space-y-6">
            <div className="space-y-1">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                Le 4 fasi del percorso
              </h2>
              <p className="text-[13px] text-slate-300 max-w-3xl">
                Non devi conoscere tutti i dettagli tecnici del machine learning.
                Ti basta seguire queste fasi: il resto lo gestisce la piattaforma.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-4 text-[12px]">
              {steps.map((s) => (
                <div
                  key={s.step}
                  className="relative rounded-2xl bg-slate-950/90 p-4 ring-1 ring-slate-800"
                >
                  <div className="text-[10px] font-semibold text-slate-500">
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

        {/* GRAFICO PRIMA / DOPO */}
        <section className="border-b border-slate-900 bg-slate-950/98">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 grid gap-8 text-[12px] md:grid-cols-[1.3fr,1fr]">
            <div className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                Simulazione performance
              </h2>
              <p className="text-[13px] text-slate-300">
                Ecco un esempio semplificato di come le metriche chiave possono
                cambiare passando da una gestione manuale a una gestione
                assistita dalla nostra AI.
              </p>
              <p className="text-[11px] text-slate-400">
                Non sono promesse di rendimento, ma un modo per visualizzare il
                tipo di salto qualitativo che puoi ottenere quando le decisioni
                vengono prese basandosi su dati e previsioni continue.
              </p>

              <div className="mt-3 rounded-2xl bg-slate-950/90 p-4 ring-1 ring-slate-800">
                <div className="mb-3 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Prima vs dopo AI Ads Revolution</span>
                  <span className="text-slate-300">Scenario di esempio</span>
                </div>

                <div className="space-y-3">
                  {beforeAfter.map((m) => (
                    <div key={m.label} className="space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-300">{m.label}</span>
                        <span className="text-slate-500">
                          Manuale {m.before} →{" "}
                          <span className="text-emerald-300">
                            AI {m.after}
                          </span>
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-900 flex overflow-hidden">
                        <div
                          className="h-full rounded-full bg-slate-700"
                          style={{ width: "40%" }}
                        />
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400"
                          style={{ width: "45%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-3 text-[9px] text-slate-500">
                  I valori sono puramente indicativi e non rappresentano
                  garanzie. Ogni business ha dinamiche specifiche.
                </p>
              </div>
            </div>

            {/* Box “perché è diverso” */}
            <div className="space-y-3">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Perché è diverso da un normale sistema di ads
              </h3>
              <div className="rounded-2xl bg-slate-950/90 p-4 ring-1 ring-slate-800 space-y-2">
                <p className="text-[11px] text-slate-300">
                  AI Ads Revolution non si limita a distribuire budget: ragiona
                  come un consulente che conosce i tuoi dati e quelli del
                  mercato.
                </p>
                <ul className="mt-2 space-y-1 text-[11px] text-slate-400">
                  <li>• Modelli che apprendono dai risultati delle tue campagne.</li>
                  <li>• Aggiornamento continuo dei segmenti di pubblico.</li>
                  <li>• Suggerimenti su creatività, audience e allocazione budget.</li>
                  <li>• Visione unica del percorso cliente su più canali.</li>
                </ul>
              </div>

              <div className="rounded-2xl bg-slate-950/90 p-4 ring-1 ring-slate-800 space-y-2">
                <div className="text-[11px] font-semibold text-slate-100">
                  Pronto a vedere la piattaforma dal vivo?
                </div>
                <p className="text-[11px] text-slate-400">
                  Crea il tuo account, configura la prima campagna guidata e
                  monitora in tempo reale come l&apos;AI inizia a ottimizzare.
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
