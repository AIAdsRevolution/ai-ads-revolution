import Link from "next/link";

export default function ComeFunzionaPage() {
  const steps = [
    {
      step: "01",
      title: "Collega il tuo business",
      desc: "Crei il tuo account inserzionista, colleghi il tuo e-commerce o i tuoi prodotti e definisci i principali obiettivi (vendite, lead, traffico, awareness).",
    },
    {
      step: "02",
      title: "Configura la prima campagna",
      desc: "Imposti budget, aree geografiche e obiettivi. L'AI ti suggerisce formati, parole chiave e creatività iniziali.",
    },
    {
      step: "03",
      title: "Lascia lavorare il motore neurale",
      desc: "Il motore AI analizza segnali di intento, contesto e storico per distribuire il budget sui segmenti piu efficaci.",
    },
    {
      step: "04",
      title: "Scala solo cio che funziona",
      desc: "Monitori CTR, CPC, ROAS e conversioni dalla dashboard e aumenti il budget solo sulle campagne profittevoli.",
    },
  ];

  const engineFeatures = [
    {
      title: "Analisi segnali in tempo reale",
      desc: "La piattaforma raccoglie segnali di intento (ricerche, comportamenti, contesto) e li trasforma in decisioni di bidding e targeting.",
    },
    {
      title: "Ottimizzazione continua",
      desc: "L'AI testa varianti di creativita, parole chiave e posizionamenti per capire cosa genera piu click e vendite.",
    },
    {
      title: "Budget intelligente",
      desc: "Il budget viene spostato automaticamente verso le campagne e i gruppi di annunci che performano meglio, riducendo gli sprechi.",
    },
    {
      title: "Report chiari",
      desc: "Grafici e KPI ti mostrano in modo semplice cosa sta funzionando, cosa no e dove stai generando il miglior ritorno sull'investimento.",
    },
  ];

  const roadmap = [
    {
      phase: "Oggi (Enterprise Preview)",
      items: [
        "Dashboard inserzionista attiva",
        "Autenticazione con email + conferma",
        "Creazione campagne demo",
        "AI copywriter integrato per annunci sponsorizzati",
      ],
    },
    {
      phase: "Prossimi rilasci",
      items: [
        "Integrazione Stripe per piani a pagamento",
        "Piano Basic mensile per inserzionisti",
        "Analytics avanzati con grafici reali",
        "Tracking eventi (impression, click, conversioni)",
      ],
    },
    {
      phase: "Fase globale",
      items: [
        "App iOS e Android per gestione campagne",
        "Interfaccia multilingua per mercati internazionali",
        "Motore neurale addestrato su dataset reali",
        "Strumenti dedicati anche a piccole realta e business locali",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-10 md:px-6 lg:px-8">
        <header className="border-b border-slate-800 pb-6">
          <p className="text-[11px] uppercase tracking-[0.3em] text-emerald-300/90">
            Come funziona
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-50 md:text-4xl">
            Come funziona AI Ads Revolution
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300">
            AI Ads Revolution e una piattaforma di advertising AI-first:
            il cuore del sistema e un motore neurale che analizza segnali in tempo reale
            per ottimizzare dove, quando e a chi mostrare i tuoi annunci.
          </p>
          <p className="mt-2 max-w-2xl text-xs text-slate-400">
            L&apos;obiettivo e semplice: permettere anche alle realta piu piccole di ottenere
            risultati simili ai grandi player, con strumenti chiari, misurabili e accessibili.
          </p>
        </header>

        {/* Sezione 1: Flusso di lavoro */}
        <section className="mt-8">
          <h2 className="text-sm font-semibold text-slate-50">
            Il flusso di una campagna AI Ads Revolution
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            Dalla prima configurazione alla scalabilita, questo e il percorso tipico di una campagna
            all&apos;interno della piattaforma.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {steps.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-300/80">
                  Step {item.step}
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-50">
                  {item.title}
                </p>
                <p className="mt-2 text-[11px] text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sezione 2: Motore neurale */}
        <section className="mt-10">
          <h2 className="text-sm font-semibold text-slate-50">
            Il motore neurale di advertising
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            Al centro di AI Ads Revolution c&apos;e un motore AI che combina segnali,
            dati storici e obiettivi di business per prendere decisioni in modo continuo.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {engineFeatures.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4"
              >
                <p className="text-xs font-semibold text-slate-100">
                  {item.title}
                </p>
                <p className="mt-2 text-[11px] text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sezione 3: Roadmap */}
        <section className="mt-10">
          <h2 className="text-sm font-semibold text-slate-50">
            Stato attuale e roadmap
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            La piattaforma e in fase beta, ma l&apos;architettura e gia pensata per crescere:
            dall&apos;inserzionista singolo alle aziende strutturate, fino a futuri partner globali.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {roadmap.map((block) => (
              <div
                key={block.phase}
                className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4"
              >
                <p className="text-[11px] font-semibold text-emerald-300">
                  {block.phase}
                </p>
                <ul className="mt-2 space-y-1.5 text-[11px] text-slate-400">
                  {block.items.map((i) => (
                    <li key={i}>• {i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTA finale */}
        <section className="mt-10 rounded-2xl border border-emerald-500/50 bg-emerald-500/5 p-5">
          <h2 className="text-sm font-semibold text-slate-50">
            Pronto a vedere l&apos;AI al lavoro sulle tue campagne?
          </h2>
          <p className="mt-2 text-xs text-slate-300">
            Puoi creare il tuo account, configurare una prima campagna e lasciare che il motore AI
            inizi a raccogliere dati e ottimizzare le performance. La dashboard ti mostrera
            in modo chiaro cosa sta funzionando e dove stai generando piu valore.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-950 hover:bg-emerald-400 transition-colors"
            >
              Crea un account
            </Link>
            <Link
              href="/"
              className="text-xs font-medium text-slate-200 hover:text-emerald-200"
            >
              Torna alla home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
