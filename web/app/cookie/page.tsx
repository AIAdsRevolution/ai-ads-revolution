"use client";

import Link from "next/link";

export default function CookiePage() {
  return (
    <main className="min-h-screen bg-black text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
        <header className="mb-8 border-b border-slate-800 pb-6">
          <p className="text-xs uppercase tracking-[0.26em] text-emerald-400/80">
            AI Ads Revolution
          </p>
          <h1 className="mt-2 text-2xl font-semibold md:text-3xl">
            Informativa Cookie
          </h1>
          <p className="mt-2 text-xs text-slate-400">
            Ultimo aggiornamento: 28 Novembre 2025
          </p>
        </header>

        <div className="space-y-8 text-sm leading-relaxed text-slate-200">
          <section>
            <h2 className="text-lg font-semibold text-emerald-300">
              1. Cosa sono i cookie
            </h2>
            <p className="mt-3 text-slate-300">
              I cookie sono piccoli file di testo che i siti web inviano al dispositivo
              dell&apos;utente, dove vengono memorizzati per essere poi ritrasmessi agli stessi
              siti alla visita successiva. Sono utilizzati per migliorare l&apos;esperienza di
              navigazione, ricordare preferenze e raccogliere informazioni anonime sull&apos;uso
              del sito.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-emerald-300">
              2. Tipologie di cookie utilizzati
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
              <li>
                <span className="font-semibold text-slate-100">
                  Cookie tecnici essenziali
                </span>
                : necessari per il corretto funzionamento della piattaforma, ad esempio per
                mantenere la sessione di login attiva.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Cookie di preferenza
                </span>
                : permettono di ricordare alcune scelte dell&apos;utente (es. lingua, tema).
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Cookie analitici e di performance
                </span>
                : aiutano a capire come la piattaforma viene utilizzata, in forma anonima
                o aggregata, per migliorarne le funzionalità.
              </li>
              <li>
                <span className="font-semibold text-slate-100">
                  Cookie di marketing (se abilitati)
                </span>
                : utilizzati per misurare l&apos;efficacia delle campagne e, in futuro, per
                eventuali funzionalità di remarketing.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-emerald-300">
              3. Gestione dei cookie
            </h2>
            <p className="mt-3 text-slate-300">
              L&apos;utente può gestire o cancellare i cookie direttamente dalle impostazioni
              del proprio browser. È possibile:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-300">
              <li>visualizzare quali cookie sono presenti sul dispositivo;</li>
              <li>cancellare tutti o parte dei cookie;</li>
              <li>bloccare l&apos;installazione di cookie da parte di siti specifici;</li>
              <li>bloccare l&apos;installazione di tutti i cookie.</li>
            </ul>
            <p className="mt-3 text-xs text-slate-400">
              Se i cookie tecnici vengono disabilitati, alcune funzionalità della piattaforma
              potrebbero non funzionare correttamente (ad esempio l&apos;accesso all&apos;account).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-emerald-300">
              4. Cookie di terze parti
            </h2>
            <p className="mt-3 text-slate-300">
              Alcuni servizi integrati nella piattaforma (es. strumenti di analisi o di
              pagamento) possono utilizzare propri cookie. In questo caso le informative
              dettagliate sono fornite direttamente dai rispettivi fornitori (es. Stripe,
              servizi di analytics).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-emerald-300">
              5. Aggiornamenti alla presente informativa
            </h2>
            <p className="mt-3 text-slate-300">
              La presente informativa cookie può essere aggiornata per adeguarsi a modifiche
              legislative o a cambiamenti nei servizi offerti. Si consiglia di consultarla
              periodicamente.
            </p>
          </section>

          <section className="mt-8 border-t border-slate-800 pt-6 text-xs text-slate-500">
            <p>
              Per ulteriori informazioni sul trattamento dei dati personali, consulta anche la{" "}
              <Link href="/privacy" className="text-emerald-300 hover:text-emerald-200">
                Informativa sulla Privacy
              </Link>
              .
            </p>
            <p className="mt-4">
              <Link href="/" className="text-emerald-300 hover:text-emerald-200">
                ← Torna alla home
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
