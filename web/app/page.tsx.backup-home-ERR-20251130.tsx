import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* NAVBAR */}
      <header className="h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur flex items-center justify-between px-4 md:px-10">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center">
            <span className="text-cyan-300 font-semibold text-base">AI</span>
          </div>
          <div>
            <p className="text-sm md:text-base font-semibold tracking-wide">
              AI Ads Revolution
            </p>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              AI-Powered Advertising Platform
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <a href="#features" className="hover:text-cyan-300 transition">
            Funzionalità
          </a>
          <a href="#how" className="hover:text-cyan-300 transition">
            Come funziona
          </a>
          <a href="#pricing" className="hover:text-cyan-300 transition">
            Prezzi
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="text-xs md:text-sm px-3 py-1.5 rounded-xl border border-slate-700 hover:border-cyan-400 hover:text-cyan-200 transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-xs md:text-sm px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 transition"
          >
            Inizia ora
          </Link>
        </div>
      </header>

      {/* HERO */}
      <main className="flex-1 px-4 md:px-10 py-10 md:py-14 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
        <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300 mb-3">
              LA TUA PIATTAFORMA ADV NEXT-GEN
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
              Trasforma il tuo budget pubblicitario
              <span className="block text-cyan-300">
                in risultati misurabili con l&apos;AI.
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-300 mb-6 max-w-xl">
              AI Ads Revolution analizza in tempo reale campagne, creatività e
              pubblico per ottimizzare automaticamente CTR, CPC e conversioni.
              Meno sprechi, più risultati. In un&apos;unica dashboard.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <Link
                href="/register"
                className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 text-sm font-semibold hover:bg-cyan-400 transition"
              >
                Prova la dashboard
              </Link>
              <Link
                href="/login"
                className="text-sm text-cyan-300 hover:text-cyan-200 underline-offset-4 hover:underline"
              >
                Ho già un account
              </Link>
            </div>

            <p className="text-[12px] text-slate-400">
              Nessuna carta richiesta per la fase iniziale. Pensata per
              inserzionisti, agenzie e business che vogliono controllo vero
              sulle performance ADV.
            </p>
          </div>

          {/* CARD PREVIEW DASHBOARD */}
          <div className="relative">
            <div className="absolute -inset-8 bg-cyan-500/5 blur-3xl rounded-full" />
            <div className="relative rounded-3xl border border-slate-800 bg-slate-950/80 shadow-[0_0_80px_rgba(15,23,42,0.9)] p-4 md:p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-slate-400">Overview campagne</p>
                  <p className="text-sm font-medium">
                    AI Ads Revolution · Live
                  </p>
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 px-3 py-2">
                  <p className="text-[11px] text-slate-400">CTR medio</p>
                  <p className="text-lg font-semibold">3,4%</p>
                  <p className="text-[11px] text-emerald-400 mt-0.5">
                    +0,8% vs ieri
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 px-3 py-2">
                  <p className="text-[11px] text-slate-400">CPC medio</p>
                  <p className="text-lg font-semibold">0,42 €</p>
                  <p className="text-[11px] text-emerald-400 mt-0.5">
                    -0,05 € vs ieri
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 px-3 py-2">
                  <p className="text-[11px] text-slate-400">Spesa oggi</p>
                  <p className="text-lg font-semibold">124,30 €</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    su 500 € budget
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 px-3 py-2">
                  <p className="text-[11px] text-slate-400">Campagne attive</p>
                  <p className="text-lg font-semibold">7</p>
                  <p className="text-[11px] text-emerald-400 mt-0.5">
                    3 in learning
                  </p>
                </div>
              </div>

              <div className="border border-slate-800 rounded-2xl p-3">
                <p className="text-[11px] text-slate-400 mb-2">
                  Esempio campagne
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>Launch AI Ads Revolution</span>
                    <span className="text-emerald-400 text-[11px]">
                      Attiva · CTR 3,8%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Retargeting visitatori sito</span>
                    <span className="text-cyan-300 text-[11px]">
                      In learning
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Brand awareness Italia</span>
                    <span className="text-amber-300 text-[11px]">
                      Pausa · CPM 7,90 €
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section
          id="features"
          className="max-w-6xl mx-auto mt-14 border-t border-slate-800/80 pt-10"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Perché AI Ads Revolution?
          </h2>
          <p className="text-sm text-slate-300 mb-6 max-w-2xl">
            Non è solo un pannello di controllo, ma un sistema che ti aiuta a
            prendere decisioni migliori, più velocemente. Niente fogli Excel,
            niente numeri sparsi ovunque.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
              <p className="text-sm font-medium mb-1">
                🧠 Ottimizzazione automatica
              </p>
              <p className="text-xs text-slate-400">
                L&apos;AI analizza campagne e creatività e ti suggerisce dove
                spingere o tagliare il budget, prima che tu perda soldi.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
              <p className="text-sm font-medium mb-1">
                📊 Dashboard unica
              </p>
              <p className="text-xs text-slate-400">
                CTR, CPC, CPM, conversioni: tutto in un solo posto, con dati
                aggregati e chiari anche per non tecnici.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
              <p className="text-sm font-medium mb-1">
                🚀 Pensato per la crescita
              </p>
              <p className="text-xs text-slate-400">
                Dai piccoli business alle agenzie: la struttura è fatta per
                scalare con te, non contro di te.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="how"
          className="max-w-6xl mx-auto mt-14 border-t border-slate-800/80 pt-10"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Come funziona, in pratica?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
              <p className="text-xs text-slate-400 mb-1">1 · Crea account</p>
              <p className="text-sm text-slate-200">
                Registri il tuo account inserzionista, completi il profilo e
                imposti i dati del tuo business.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
              <p className="text-xs text-slate-400 mb-1">
                2 · Crea la prima campagna
              </p>
              <p className="text-sm text-slate-200">
                Definisci obiettivo, budget, creatività e target. Il sistema ti
                aiuta a non dimenticare nulla.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
              <p className="text-xs text-slate-400 mb-1">
                3 · Osserva e ottimizza
              </p>
              <p className="text-sm text-slate-200">
                Monitori i numeri in tempo reale e ricevi suggerimenti AI su
                cosa migliorare ogni giorno.
              </p>
            </div>
          </div>
        </section>

        {/* PRICING PREVIEW */}
        <section
          id="pricing"
          className="max-w-6xl mx-auto mt-14 border-t border-slate-800/80 pt-10 pb-6"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Pricing semplice, pensato per iniziare.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 flex flex-col">
              <p className="text-xs text-slate-400 mb-1">Starter</p>
              <p className="text-2xl font-semibold mb-1">Gratis</p>
              <p className="text-xs text-slate-400 mb-3">
                Per test e piccole campagne.
              </p>
              <ul className="text-xs text-slate-300 space-y-1 mb-4">
                <li>• Fino a 2 campagne attive</li>
                <li>• Dashboard base</li>
                <li>• Supporto via email</li>
              </ul>
              <Link
                href="/register"
                className="mt-auto inline-flex justify-center px-3 py-2 rounded-xl border border-slate-700 text-xs hover:border-cyan-400 hover:text-cyan-200 transition"
              >
                Inizia gratis
              </Link>
            </div>

            <div className="rounded-2xl border border-cyan-500 bg-slate-950/90 p-4 flex flex-col">
              <p className="text-xs text-cyan-300 mb-1">Pro (Consigliato)</p>
              <p className="text-2xl font-semibold mb-1">€ XX/mese</p>
              <p className="text-xs text-slate-400 mb-3">
                Per business e agenzie che investono seriamente.
              </p>
              <ul className="text-xs text-slate-300 space-y-1 mb-4">
                <li>• Campagne illimitate</li>
                <li>• AI suggestions avanzate</li>
                <li>• Report esportabili</li>
                <li>• Priorità supporto</li>
              </ul>
              <Link
                href="/register"
                className="mt-auto inline-flex justify-center px-3 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-semibold hover:bg-cyan-400 transition"
              >
                Richiedi accesso Pro
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 flex flex-col">
              <p className="text-xs text-slate-400 mb-1">Enterprise</p>
              <p className="text-2xl font-semibold mb-1">Su richiesta</p>
              <p className="text-xs text-slate-400 mb-3">
                Per grandi volumi e integrazioni custom.
              </p>
              <ul className="text-xs text-slate-300 space-y-1 mb-4">
                <li>• Setup dedicato</li>
                <li>• Integrazioni API</li>
                <li>• SLA & supporto dedicato</li>
              </ul>
              <a
                href="mailto:info@aiadsrevolution.com"
                className="mt-auto inline-flex justify-center px-3 py-2 rounded-xl border border-slate-700 text-xs hover:border-cyan-400 hover:text-cyan-200 transition"
              >
                Contattaci
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 py-4 text-[11px] text-slate-500 text-center">
        <p>© {new Date().getFullYear()} AI Ads Revolution. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}
