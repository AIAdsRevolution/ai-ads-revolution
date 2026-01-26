import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#070A12] text-white">
      {/* background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-[-220px] right-[-120px] h-[520px] w-[520px] rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_55%)]" />
      </div>

      {/* top bar */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10">
            <span className="text-lg font-black">AI</span>
          </span>
          <span className="text-sm font-semibold tracking-wide text-white/90">
            AI Ads Revolution
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          <Link className="hover:text-white" href="/come-funziona">Come funziona</Link>
          <Link className="hover:text-white" href="/ai-engine">AI Engine</Link>
          <Link className="hover:text-white" href="/dashboard">Dashboard</Link>
          <Link className="hover:text-white" href="/pricing">Pricing</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/auth/login"
            className="rounded-xl px-3 py-2 text-sm font-semibold text-white/80 hover:bg-white/10"
          >
            Accedi
          </Link>
          <Link
            href="/register"
            className="rounded-xl bg-white px-3 py-2 text-sm font-black text-black hover:bg-white/90"
          >
            Inizia
          </Link>
        </div>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-10">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/10">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              KPI live + AI + Google Ads
            </div>

            <h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
              Porta le tue campagne a un livello superiore con{" "}
              <span className="bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
                KPI & AI
              </span>
              .
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
              AI Ads Revolution unisce dashboard KPI, integrazione Google Ads e un assistente AI
              per capire cosa funziona e cosa fare dopo. Chiaro, veloce, operativo.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/ai-chatbot"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-black text-black hover:bg-white/90"
              >
                Richiedi una demo
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-2xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/15"
              >
                Vedi la dashboard
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Stat label="Setup" value="5 min" />
              <Stat label="KPI" value="Live" />
              <Stat label="AI" value="Operativa" />
            </div>
          </div>

          {/* right card */}
          <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
            <div className="rounded-2xl bg-[#0B1022] p-5 ring-1 ring-white/10">
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold text-white/90">KPI Overview</div>
                <div className="text-xs text-white/60">Ultimi 28 giorni</div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <KpiCard title="Spesa" value="€ 1.240" note="↗ +12%" />
                <KpiCard title="ROAS" value="3,4x" note="↗ +8%" />
                <KpiCard title="CTR" value="2,1%" note="↗ +5%" />
                <KpiCard title="Conversioni" value="126" note="↗ +18%" />
              </div>

              <div className="mt-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <div className="text-xs font-semibold text-white/70">AI Insight</div>
                <div className="mt-2 text-sm text-white/80">
                  Aumenta il budget sugli ad group con ROAS più alto e sposta le keyword
                  low-performing verso match più specifici.
                </div>
                <div className="mt-3 text-xs text-white/50">
                  (Esempio demo — dati reali dopo collegamento Google Ads)
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Collegamento Google Ads per metriche reali
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                AI Assistant per azioni consigliate
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-400" />
                Dashboard pulita e mobile-friendly
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* sections */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          <Feature
            title="Dashboard KPI Live"
            desc="Panoramica, trend, confronto periodi e focus su ROI e spesa."
          />
          <Feature
            title="Google Ads Integration"
            desc="Collega il tuo account e vedi metriche reali e riepiloghi."
          />
          <Feature
            title="AI Assistant"
            desc="Spiega i dati e suggerisce azioni pratiche per migliorare."
          />
        </div>

        <div className="mt-10 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-black">Vuoi una demo guidata?</h2>
              <p className="mt-2 text-sm text-white/70">
                Scrivi email + obiettivo (lead, vendite, traffico). Ti contattiamo per una demo.
              </p>
            </div>
            <Link
              href="/ai-chatbot"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-black text-black hover:bg-white/90"
            >
              Vai al chatbot demo
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} AI Ads Revolution</div>
          <div className="flex gap-4">
            <Link className="hover:text-white" href="/privacy">Privacy</Link>
            <Link className="hover:text-white" href="/termini">Termini</Link>
            <Link className="hover:text-white" href="/cookie">Cookie</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
      <div className="text-xs text-white/60">{label}</div>
      <div className="mt-1 text-sm font-black text-white/90">{value}</div>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
      <div className="text-base font-black">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-white/70">{desc}</div>
    </div>
  );
}

function KpiCard({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
      <div className="text-xs font-semibold text-white/70">{title}</div>
      <div className="mt-2 text-lg font-black">{value}</div>
      <div className="mt-1 text-xs text-emerald-300">{note}</div>
    </div>
  );
}
