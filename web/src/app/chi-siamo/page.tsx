"use client";

import Link from "next/link";

export default function ChiSiamoPage() {
  return (
    <main className="min-h-screen bg-black text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
        <header className="mb-8 border-b border-slate-800 pb-6">
          <p className="text-xs uppercase tracking-[0.26em] text-emerald-400/80">
            AI Ads Revolution
          </p>
          <h1 className="mt-2 text-2xl font-semibold md:text-3xl">Chi siamo</h1>
          <p className="mt-3 text-sm text-slate-300 max-w-2xl">
            AI Ads Revolution nasce con un obiettivo chiaro: mettere il potere
            dell&apos;intelligenza artificiale al servizio delle aziende di ogni
            dimensione, dalle realtà locali ai brand globali.
          </p>
        </header>

        <div className="space-y-8 text-sm leading-relaxed text-slate-200">
          <section>
            <h2 className="text-lg font-semibold text-emerald-300">
              Una piattaforma per chi vuole crescere davvero
            </h2>
            <p className="mt-3 text-slate-300">
              Il mondo dell&apos;advertising digitale è complesso, tecnico e spesso
              sbilanciato a favore dei grandi player. AI Ads Revolution vuole
              semplificare questo scenario, offrendo uno strumento che aiuti anche le
              realtà più piccole a competere in modo intelligente.
            </p>
            <p className="mt-3 text-slate-300">
              Il motore neurale della piattaforma analizza segnali in tempo reale e
              ti aiuta a capire cosa funziona davvero, così puoi concentrarti sul tuo
              business mentre l&apos;AI lavora in background.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-emerald-300">
              Cosa fa AI Ads Revolution in concreto
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
              <li>
                semplifica la creazione e la gestione delle campagne pubblicitarie;
              </li>
              <li>
                ottimizza automaticamente budget, offerte e creatività grazie
                all&apos;intelligenza artificiale;
              </li>
              <li>
                fornisce una dashboard chiara, con metriche chiave come CTR, CPC e ROAS;
              </li>
              <li>
                ti aiuta a capire quali campagne stanno realmente portando risultati;
              </li>
              <li>
                è progettata per essere estesa con app mobile, multilingua e
                integrazioni avanzate.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-emerald-300">
              Visione e valori
            </h2>
            <p className="mt-3 text-slate-300">
              AI Ads Revolution non è solo una piattaforma tecnica, ma un progetto che
              vuole:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
              <li>
                rendere l&apos;advertising più trasparente e basato sui dati, non su promesse
                vuote;
              </li>
              <li>ridurre sprechi di budget e campagne inefficaci;</li>
              <li>offrire strumenti avanzati anche a chi parte con risorse limitate;</li>
              <li>mettere al centro la serietà verso i clienti e la protezione dei dati.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-emerald-300">
              Enterprise Preview e prossimi passi
            </h2>
            <p className="mt-3 text-slate-300">
              Attualmente AI Ads Revolution è in fase{" "}
              <span className="font-semibold text-emerald-300"></span>: la piattaforma
              è già utilizzabile, ma continuerà a migliorare con aggiornamenti frequenti,
              nuove funzionalità e ottimizzazioni del motore AI.
            </p>
            <p className="mt-3 text-slate-300">
              I feedback degli utenti in questa fase sono fondamentali per costruire uno
              strumento solido, affidabile e utile nel quotidiano.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-emerald-300">
              Contatti e canali ufficiali
            </h2>
            <p className="mt-3 text-slate-300">
              Man mano che il progetto crescerà, verranno attivati canali ufficiali
              (es. email dedicate, pagina LinkedIn, community Telegram/Discord) per seguire
              aggiornamenti, roadmap e casi studio.
            </p>
            <p className="mt-3 text-slate-300">
              Nella fase iniziale, i contatti principali saranno indicati direttamente
              nella dashboard e nel sito ufficiale.
            </p>
          </section>

          <section className="mt-8 border-t border-slate-800 pt-6 text-xs text-slate-500">
            <p>
              Questa pagina è una presentazione sintetica del progetto AI Ads Revolution.
              Non sostituisce i{" "}
              <Link href="/condizioni-uso" className="text-emerald-300 hover:text-emerald-200">
                Termini di Uso
              </Link>{" "}
              e l&apos;{" "}
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
