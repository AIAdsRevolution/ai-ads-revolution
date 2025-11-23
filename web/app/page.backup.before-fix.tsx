import Link from "next/link";

const kpis = [
  {
    label: "Advertiser attivi",
    value: "32.000+",
    note: "in onboarding globale",
  },
  {
    label: "Spesa gestita",
    value: "12,8M€",
    note: "budget pubblicitario tracciato",
  },
  {
    label: "Impression processate",
    value: "1,2B",
    note: "segnali analizzati dal motore AI",
  },
];

const products = [
  {
    title: "Sponsored Products AI",
    desc: "Metti in evidenza i singoli prodotti nei momenti di massima 
intenzione di acquisto.",
    tag: "CPC • Intent based",
  },
  {
    title: "Sponsored Brands AI",
    desc: "Fai scoprire il tuo brand con formati creativi ottimizzati dall 
AI.",
    tag: "Brand awareness",
  },
  {
    title: "Video & Display Intelligence",
    desc: "Annunci video e banner adattati automaticamente ai diversi 
canali e dispositivi.",
    tag: "Full funnel",
  },
  {
    title: "AI Analytics & Attribution",
    desc: "Report chiari su CTR, ROAS e conversioni con insights generati 
dall AI.",
    tag: "Decisioni guidate dai dati",
  },
];

const steps = [
  {
    step: "01",
    title: "Crea il tuo account inserzionista",
    desc: "Registrati con email oppure accedi con Google, Apple o Telegram 
e completa il profilo business.",
  },
  {
    step: "02",
    title: "Collega prodotti e obiettivi",
    desc: "Importa cataloghi o servizi, definisci budget e obiettivi di 
campagna con la guida dell AI integrata.",
  },
  {
    step: "03",
    title: "Lascia lavorare il motore neurale",
    desc: "L AI distribuisce il budget sulle combinazioni di pubblico, 
creatività e parole chiave che funzionano meglio.",
  },
];

const socials = [
  "X",
  "Telegram",
  "Discord",
  "LinkedIn",
  "Reddit",
  "Facebook",
  "Instagram",
  "YouTube",
  "TikTok",
  "More",
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 
text-slate-50">
      {/* SFONDO ANIMATO STILE BITGET */}
      <div className="pointer-events-none absolute inset-0 
overflow-hidden">
        {/* Gradient principale che respira */}
        <div
          className="aiads-bg-gradient absolute -top-32 left-[-10%] 
h-[480px] w-[480px] rounded-[999px] 
bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.35),_rgba(15,23,42,0.1)_60%,_transparent_75%)] 
blur-3xl"
          aria-hidden="true"
        />
        <div
          className="aiads-bg-gradient absolute top-[40%] right-[-15%] 
h-[520px] w-[520px] rounded-[999px] 
bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.45),_rgba(15,23,42,0.1)_60%,_transparent_75%)] 
blur-3xl"
          aria-hidden="true"
        />
        {/* Linee diagonali */}
        <div
          className="aiads-bg-lines pointer-events-none absolute inset-0 
opacity-[0.18]"
          aria-hidden="true"
        >
          <div className="absolute -left-1/2 top-0 h-[140%] w-[200%] 
rotate-[-18deg] 
bg-[linear-gradient(to_right,_rgba(148,163,184,0.06)_1px,_transparent_1px)] 
bg-[length:80px_1px]" />
        </div>
        {/* Orbite luminose */}
        <div
          className="aiads-bg-orbit absolute left-[10%] top-[62%] h-40 
w-40 rounded-full border border-cyan-400/35 bg-cyan-400/5 
shadow-[0_0_40px_rgba(34,211,238,0.6)]"
          aria-hidden="true"
        />
        <div
          className="aiads-bg-orbit-slow absolute right-[14%] top-[18%] 
h-32 w-32 rounded-full border border-emerald-400/30 bg-emerald-400/5 
shadow-[0_0_40px_rgba(52,211,153,0.6)]"
          aria-hidden="true"
        />
      </div>

      {/* NAVBAR */}
      <header className="relative z-10 border-b border-slate-800/70 
bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center 
justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center 
rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-400 
shadow-[0_0_30px_rgba(45,212,191,0.7)]">
              <span className="text-xs font-black tracking-[0.12em] 
text-slate-950">
                AI
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-semibold tracking-wide">
                AI Ads Revolution
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] 
text-cyan-300/80">
                Advertising Neural Engine
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm 
text-slate-300/90 md:flex">
            <Link href="#prodotti" className="hover:text-slate-50">
              Prodotti
            </Link>
            <Link href="#soluzioni" className="hover:text-slate-50">
              Soluzioni
            </Link>
            <Link href="#percorso" className="hover:text-slate-50">
              Come funziona
            </Link>
            <Link href="#community" className="hover:text-slate-50">
              Community
            </Link>
          </nav>

          <div className="flex items-center gap-3 text-sm">
            <Link
              href="/auth/login"
              className="hidden text-slate-300 hover:text-slate-50 
md:inline"
            >
              Accedi
            </Link>
            <Link
              href="/auth/register"
              className="rounded-full bg-gradient-to-r from-cyan-400 
to-emerald-400 px-4 py-1.5 text-xs font-semibold uppercase 
tracking-[0.18em] text-slate-950 shadow-[0_0_25px_rgba(34,211,238,0.8)] 
hover:brightness-110"
            >
              Registrati
            </Link>
          </div>
        </div>
      </header>

      {/* HERO PRINCIPALE */}
      <section className="relative z-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 
pt-10 lg:flex-row lg:items-center lg:pb-20 lg:pt-16">
          {/* Colonna testo */}
          <div className="max-w-xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full 
border border-cyan-400/40 bg-slate-950/80 px-3 py-1 text-[11px] uppercase 
tracking-[0.18em] text-cyan-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Beta globale</span>
              <span className="text-slate-400">• Piattaforma di 
advertising AI-first</span>
            </div>

            <h1 className="text-balance text-4xl font-semibold 
tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
              Fai crescere la tua attività{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-400 
to-emerald-400 bg-clip-text text-transparent">
                con un motore neurale di advertising.
              </span>
            </h1>

            <p className="text-sm text-slate-300/90 sm:text-base">
              AI Ads Revolution analizza milioni di segnali in tempo reale 
per ottimizzare visibilità, traffico e conversioni. Raggiungi gli 
acquirenti nel momento esatto in cui stanno cercando prodotti come i tuoi.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/auth/register"
                className="rounded-full bg-slate-50 px-5 py-2 text-xs 
font-semibold uppercase tracking-[0.18em] text-slate-950 
shadow-[0_0_35px_rgba(248,250,252,0.9)] hover:bg-slate-200"
              >
                Inizia ora
              </Link>
              <Link
                href="/come-funziona"
                className="inline-flex items-center gap-1 text-xs 
font-semibold uppercase tracking-[0.18em] text-cyan-300 
hover:text-cyan-100"
              >
                Guarda come funziona
                <span className="text-base">↗</span>
              </Link>
            </div>

            <p className="text-xs text-slate-400">
              +30% vendite medie attribuite alle campagne AI*{" "}
              <span className="block text-[10px] text-slate-500">
                *Dati interni AI Ads Revolution su inserzionisti beta. I 
risultati medi non garantiscono performance future.
              </span>
            </p>

            {/* Login social stile Bitget */}
            <div className="mt-4 space-y-2">
              <p className="text-[11px] uppercase tracking-[0.18em] 
text-slate-400">
                Oppure continua con
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 
rounded-full bg-slate-900/80 px-3 py-1.5 text-xs text-slate-100 ring-1 
ring-slate-700 hover:bg-slate-800">
                  <span className="flex h-5 w-5 items-center 
justify-center rounded-full bg-slate-50 text-[11px] font-bold 
text-slate-900">
                    G
                  </span>
                  <span>Google</span>
                </button>
                <button className="inline-flex items-center gap-2 
rounded-full bg-slate-900/80 px-3 py-1.5 text-xs text-slate-100 ring-1 
ring-slate-700 hover:bg-slate-800">
                  <span className="flex h-5 w-5 items-center 
justify-center rounded-full bg-slate-50 text-[11px] font-bold 
text-slate-900">
                    
                  </span>
                  <span>Apple</span>
                </button>
                <button className="inline-flex items-center gap-2 
rounded-full bg-slate-900/80 px-3 py-1.5 text-xs text-slate-100 ring-1 
ring-slate-700 hover:bg-slate-800">
                  <span className="flex h-5 w-5 items-center 
justify-center rounded-full bg-cyan-500 text-[11px] font-bold 
text-slate-950">
                    TG
                  </span>
                  <span>Telegram</span>
                </button>
              </div>
            </div>
          </div>

          {/* Colonna destra: pannello AI + KPI stile exchange */}
          <div className="relative flex-1">
            <div className="relative mx-auto max-w-md rounded-3xl border 
border-cyan-400/40 bg-slate-950/90 p-5 shadow-[0_0_60px_rgba(8,47,73,0.8)] 
backdrop-blur-xl">
              <div className="flex items-center justify-between 
text-[11px] uppercase tracking-[0.2em] text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full 
bg-emerald-400" />
                  AI Neural Engine
                </span>
                <span className="text-cyan-300">Realtime signals</span>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-800/80 
bg-gradient-to-br from-slate-900/80 via-slate-950 to-slate-950/90 p-4">
                <div className="flex items-center justify-between text-xs 
text-slate-300">
                  <span>Segmento attivo</span>
                  <span className="rounded-full bg-emerald-500/15 px-2 
py-0.5 text-[11px] text-emerald-300">
                    Intento di acquisto alto
                  </span>
                </div>

                {/* Mini grafico animato fake */}
                <div className="mt-4 h-24 w-full overflow-hidden 
rounded-xl bg-slate-900/80">
                  <div className="aiads-bg-wave relative h-full w-[200%] 
bg-[radial-gradient(circle_at_20%_40%,_rgba(56,189,248,0.5),_transparent_55%),radial-gradient(circle_at_60%_30%,_rgba(45,212,191,0.55),_transparent_55%),radial-gradient(circle_at_80%_70%,_rgba(59,130,246,0.55),_transparent_55%)] 
opacity-90" />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                  <div className="rounded-xl border border-slate-800/90 
bg-slate-950/80 p-2">
                    <p className="text-[10px] uppercase tracking-[0.16em] 
text-slate-400">
                      CTR medio
                    </p>
                    <p className="mt-1 text-sm font-semibold 
text-emerald-400">
                      +32%
                    </p>
                    <p className="text-[11px] text-slate-500">
                      campagne ottimizzate AI
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800/90 
bg-slate-950/80 p-2">
                    <p className="text-[10px] uppercase tracking-[0.16em] 
text-slate-400">
                      CPC medio
                    </p>
                    <p className="mt-1 text-sm font-semibold 
text-cyan-300">
                      €0,21
                    </p>
                    <p className="text-[11px] text-slate-500">
                      costo per clic indicativo
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800/90 
bg-slate-950/80 p-2">
                    <p className="text-[10px] uppercase tracking-[0.16em] 
text-slate-400">
                      ROAS
                    </p>
                    <p className="mt-1 text-sm font-semibold 
text-sky-300">
                      4,7x
                    </p>
                    <p className="text-[11px] text-slate-500">
                      ritorno medio simulato
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 text-[11px] 
text-slate-400">
                  <div>
                    <p className="text-slate-500">Impression (demo)</p>
                    <p className="text-sm text-slate-100">1,2M</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Click (demo)</p>
                    <p className="text-sm text-slate-100">84K</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Vendite (demo)</p>
                    <p className="text-sm text-slate-100">9,4K</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center 
justify-between gap-2 text-[11px] text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    In arrivo:
                    <span className="text-cyan-300">
                      Stripe • App iOS/Android • Multilingua globale
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* KPI cards sotto, stile pannelli exchange */}
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {kpis.map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-2xl border border-slate-800/80 
bg-slate-950/80 p-3 text-xs text-slate-300/90"
                >
                  <p className="text-[10px] uppercase tracking-[0.16em] 
text-slate-500">
                    {kpi.label}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-slate-50">
                    {kpi.value}
                  </p>
                  <p className="text-[11px] text-slate-500">{kpi.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE PRODOTTI */}
      <section
        id="prodotti"
        className="relative z-10 border-t border-slate-800/70 
bg-slate-950/90"
      >
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            <div className="max-w-md">
              <p className="text-[11px] uppercase tracking-[0.2em] 
text-cyan-300">
                Prodotti e formati pubblicitari
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-50 
sm:text-3xl">
                Ovunque vuoi far arrivare il tuo brand, l AI ti 
accompagna.
              </h2>
              <p className="mt-3 text-sm text-slate-300/90">
                Scegli tra formati sponsorizzati, video, display e 
analytics integrati. AI Ads Revolution ti aiuta a capire quali 
combinazioni funzionano meglio per ogni fase del percorso di acquisto.
              </p>
            </div>

            <div className="grid flex-1 gap-4 md:grid-cols-2">
              {products.map((p) => (
                <article
                  key={p.title}
                  className="group rounded-2xl border border-slate-800/80 
bg-slate-950/90 p-4 shadow-[0_0_30px_rgba(15,23,42,0.9)] transition-colors 
hover:border-cyan-400/70"
                >
                  <p className="text-[11px] uppercase tracking-[0.16em] 
text-cyan-300/90">
                    {p.tag}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold 
text-slate-50">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-xs 
text-slate-300/90">{p.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE PERCORSO */}
      <section
        id="percorso"
        className="relative z-10 border-t border-slate-800/70 
bg-slate-950/95"
      >
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="mb-6 flex flex-col justify-between gap-4 
md:flex-row md:items-end">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] 
text-cyan-300">
                Setup guidato
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-50 
sm:text-3xl">
                Inizia il tuo viaggio pubblicitario in tre step.
              </h2>
              <p className="mt-2 text-sm text-slate-300/90">
                Nessuna esperienza tecnica richiesta. La guida AI 
integrata ti accompagna dalla registrazione alle prime vendite.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-500/40 
bg-emerald-500/10 px-4 py-3 text-xs text-emerald-100">
              <p className="font-semibold uppercase tracking-[0.16em]">
                Setup campagna guidato
              </p>
              <p className="mt-1 text-[11px] text-emerald-200">
                Ottimizzazione automatica: Attiva • Suggerimenti creativi: 
Disponibili
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-slate-800/80 
bg-slate-950/90 p-4"
              >
                <p className="text-xs font-semibold text-cyan-300">
                  {s.step}
                </p>
                <h3 className="mt-1 text-sm font-semibold text-slate-50">
                  {s.title}
                </h3>
                <p className="mt-2 text-xs text-slate-300/90">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY & FOOTER */}
      <section
        id="community"
        className="relative z-10 border-t border-slate-800/70 
bg-slate-950"
      >
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center 
lg:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] 
text-cyan-300">
                Community e aggiornamenti
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-50">
                Segui AI Ads Revolution sui canali ufficiali.
              </h2>
              <p className="mt-2 text-sm text-slate-300/90">
                Roadmap, casi studio, nuove feature e iniziative pensate 
per aiutare anche le realtà più piccole a competere con i grandi.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {socials.map((name) => (
                <button
                  key={name}
                  className="inline-flex items-center gap-2 rounded-full 
border border-slate-800 bg-slate-950/80 px-3 py-1.5 text-[11px] 
text-slate-100 hover:border-cyan-400/80 hover:bg-slate-900"
                >
                  <span className="h-5 w-5 rounded-full bg-gradient-to-br 
from-cyan-400/80 to-emerald-400/80" />
                  <span>{name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-6 border-t border-slate-800/80 
pt-6 text-xs text-slate-400 md:grid-cols-[2fr,1fr,1fr,1fr]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] 
text-slate-500">
                Chi siamo
              </p>
              <p className="mt-2 text-slate-400">
                AI Ads Revolution nasce per portare la potenza dell 
advertising AI anche alle piccole e medie imprese, con strumenti tipici 
dei grandi player globali.
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] 
text-slate-500">
                Informazioni legali
              </p>
              <ul className="mt-2 space-y-1">
                <li>Condizioni generali di uso e vendita</li>
                <li>Informativa sulla privacy</li>
                <li>Informativa cookie</li>
                <li>Annunci basati sugli interessi</li>
              </ul>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] 
text-slate-500">
                Stato e supporto
              </p>
              <ul className="mt-2 space-y-1">
                <li>AI Ads Status</li>
                <li>Centro assistenza</li>
                <li>Anti-scam hub</li>
              </ul>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] 
text-slate-500">
                Opportunità
              </p>
              <ul className="mt-2 space-y-1">
                <li>Posizioni aperte</li>
                <li>Programma partner</li>
                <li>Affiliazioni</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-col justify-between gap-3 
border-t border-slate-800/80 pt-4 text-[11px] text-slate-500 sm:flex-row 
sm:items-center">
            <p>© 2025 AI Ads Revolution. Tutti i diritti riservati.</p>
            <p>Piattaforma di advertising AI-first pensata per aiutare 
anche le realtà più piccole a competere con i grandi player.</p>
          </div>
        </div>
      </section>

      {/* STYLE TAG CON LE ANIMAZIONI DELLO SFONDO */}
      <style>{`
        @keyframes aiadsGradientDrift {
          0% { transform: translate3d(0,0,0) scale(1); opacity: 0.9; }
          50% { transform: translate3d(-40px,20px,0) scale(1.08); opacity: 
1; }
          100% { transform: translate3d(0,0,0) scale(1); opacity: 0.9; }
        }
        @keyframes aiadsGradientDriftAlt {
          0% { transform: translate3d(0,0,0) scale(1); opacity: 0.8; }
          50% { transform: translate3d(30px,-30px,0) scale(1.05); opacity: 
1; }
          100% { transform: translate3d(0,0,0) scale(1); opacity: 0.8; }
        }
        @keyframes aiadsOrbit {
          0% { transform: translate3d(0,0,0); }
          50% { transform: translate3d(10px,-8px,0); }
          100% { transform: translate3d(0,0,0); }
        }
        @keyframes aiadsOrbitSlow {
          0% { transform: translate3d(0,0,0); }
          50% { transform: translate3d(-12px,10px,0); }
          100% { transform: translate3d(0,0,0); }
        }
        @keyframes aiadsWave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .aiads-bg-gradient:nth-of-type(1) {
          animation: aiadsGradientDrift 26s ease-in-out infinite 
alternate;
        }
        .aiads-bg-gradient:nth-of-type(2) {
          animation: aiadsGradientDriftAlt 34s ease-in-out infinite 
alternate;
        }
        .aiads-bg-orbit {
          animation: aiadsOrbit 18s ease-in-out infinite alternate;
        }
        .aiads-bg-orbit-slow {
          animation: aiadsOrbitSlow 26s ease-in-out infinite alternate;
        }
        .aiads-bg-wave {
          animation: aiadsWave 18s linear infinite;
        }
      `}</style>
    </main>
  );
}

