import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Top bar */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-white/10 ring-1 ring-white/10" />
          <div>
            <div className="text-sm font-extrabold tracking-tight">AI Ads Revolution</div>
            <div className="text-[11px] text-white/60">KPI + AI per campagne migliori</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/pricing"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/10"
          >
            Prezzi
          </Link>
          <Link
            href="/ai-chatbot"
            className="rounded-full bg-emerald-400 px-4 py-2 text-xs font-extrabold text-black hover:bg-emerald-300"
          >
            Prova l’AI
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-14 pt-8">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-7 md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-semibold text-white/70">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Dashboard KPI + Assistente AI + Google Ads
          </div>

          <h1 className="mt-5 text-3xl font-black tracking-tight md:text-5xl">
            Trasforma i dati delle campagne in decisioni chiare.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
            AI Ads Revolution ti aiuta a leggere KPI reali, capire cosa sta funzionando e ottimizzare Google Ads con metodo.
            Niente caos, solo numeri utili e azioni consigliate.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-extrabold text-black hover:bg-emerald-300"
            >
              Vedi i piani
            </Link>

            <Link
              href="/ai-chatbot"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-extrabold text-white/90 hover:bg-white/10"
            >
              Prova l’assistente AI
            </Link>
          </div>

          <div className="mt-5 text-xs text-white/55">
            Nessuna promessa finta: i dati sono reali dopo il collegamento a Google Ads.
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm font-extrabold">KPI chiari</div>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              ROAS, CPA, spesa, lead e trend. Vista pulita e comparazione periodi.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm font-extrabold">Insight AI</div>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Spiegazioni semplici e suggerimenti operativi su cosa fare dopo.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm font-extrabold">Google Ads integrato</div>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Collega l’account e visualizza metriche reali e riepiloghi (es. ultimi 28 giorni).
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-7 md:p-10">
          <h2 className="text-xl font-black md:text-2xl">Pronto a partire?</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
            Inizia con Basic. Quando crescono campagne e budget, passi ad Advanced o Ultra.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-extrabold text-black hover:bg-emerald-300"
            >
              Vai ai prezzi
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-extrabold text-white/90 hover:bg-white/10"
            >
              Crea account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} AI Ads Revolution</div>
          <div className="flex gap-3">
            <Link className="hover:text-white/80" href="/privacy">Privacy</Link>
            <Link className="hover:text-white/80" href="/termini">Termini</Link>
            <Link className="hover:text-white/80" href="/pricing">Prezzi</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
