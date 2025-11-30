"use client";

import React, { useState } from "react";

export default function PricingPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleBasicCheckout = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Risposta non valida da Stripe");
      }

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("URL di checkout mancante nella risposta");
      }
    } catch (err: any) {
      console.error("Errore checkout Basic:", err);
      setErrorMsg(
        "Si è verificato un errore nell'attivazione del piano Basic. Riprova tra poco."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="max-w-6xl mx-auto px-4 py-16 space-y-12">
        {/* HERO */}
        <header className="space-y-4 text-center">
          <p className="text-sm font-semibold tracking-widest text-sky-400 uppercase">
            Piani e prezzi
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Piani e prezzi chiari. Paghi solo per quello che usi.
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300">
            Inizia con il piano Basic e lascia che l’AI ottimizzi le tue
            campagne al posto tuo.
            <br />
            Nessun costo di setup, nessun vincolo annuale. L’AI lavora sulle tue
            campagne ogni giorno per ridurre sprechi e aumentare le
            conversioni.
          </p>
        </header>

        {/* CARDS */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* BASIC */}
          <div className="rounded-2xl border border-sky-500/60 bg-slate-900/70 p-6 shadow-xl shadow-sky-500/20 flex flex-col">
            <div className="mb-4">
              <span className="inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-300">
                Basic · Ideale per iniziare
              </span>
            </div>
            <h2 className="text-2xl font-semibold mb-1">Basic</h2>
            <p className="text-sm text-slate-300 mb-4">
              Per chi vuole iniziare e testare campagne reali con AI.
            </p>

            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-3xl font-bold">€19</span>
              <span className="text-sm text-slate-400">/mese</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Cancellabile in qualsiasi momento · Pagamento sicuro con Stripe
            </p>

            <ul className="space-y-2 text-sm text-slate-200 mb-6 flex-1">
              <li>• Accesso alla dashboard inserzionista</li>
              <li>• Editor annunci AI (testi, titoli, CTA)</li>
              <li>• Report base (impression, click, conversioni)</li>
              <li>• Pubblicazione automatica delle campagne su rete AI</li>
              <li>• Crediti mensili inclusi per piccoli test</li>
              <li>• Supporto via email</li>
              <li>• Chatbot AI integrato 24/7</li>
            </ul>

            <p className="text-xs text-slate-300 mb-4">
              Perfetto per provare la piattaforma con costi bassi e controllo
              totale.
            </p>

            <button
              type="button"
              onClick={handleBasicCheckout}
              disabled={loading}
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-sky-400 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Attivazione in corso..." : "Attiva piano Basic"}
            </button>

            <p className="mt-3 text-[11px] text-slate-400 leading-relaxed">
              Il pagamento viene elaborato in modo sicuro tramite Stripe. I dati
              della carta non vengono memorizzati sui server di AI Ads
              Revolution.
            </p>

            {errorMsg && (
              <p className="mt-3 text-xs text-red-400">{errorMsg}</p>
            )}
          </div>

          {/* PRO */}
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                Pro · In arrivo
              </span>
            </div>
            <h2 className="text-2xl font-semibold mb-1">Pro</h2>
            <p className="text-sm text-slate-300 mb-4">
              Per aziende e professionisti che vogliono performance serie.
            </p>

            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-3xl font-bold">€49</span>
              <span className="text-sm text-slate-400">/mese</span>
            </div>

            <ul className="space-y-2 text-sm text-slate-200 mb-6 flex-1">
              <li>• Tutto del Basic</li>
              <li>• Targeting AI avanzato</li>
              <li>• Ottimizzazione automatica delle campagne</li>
              <li>• Reportistica avanzata (ROI, qualità traffico, audience)</li>
              <li>• A/B test AI automatici</li>
              <li>• Budget intelligente (risparmia fino al 30%)</li>
              <li>• Libreria creativa AI (immagini, headline, copy)</li>
              <li>• Priorità nel supporto via chatbot AI</li>
            </ul>

            <p className="text-xs text-slate-300 mb-4">
              Aumenta risultati riducendo sprechi. L’AI ottimizza tutto in
              automatico.
            </p>

            <button
              type="button"
              disabled
              className="inline-flex items-center justify-center rounded-full border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-300 bg-slate-900/70 cursor-not-allowed"
            >
              Presto disponibile
            </button>
          </div>

          {/* ENTERPRISE */}
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-flex items-center rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-300">
                Enterprise · In arrivo
              </span>
            </div>
            <h2 className="text-2xl font-semibold mb-1">Enterprise</h2>
            <p className="text-sm text-slate-300 mb-4">
              Per aziende che vogliono massima scalabilità e analisi avanzate.
            </p>

            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-3xl font-bold">€99</span>
              <span className="text-sm text-slate-400">/mese</span>
            </div>

            <ul className="space-y-2 text-sm text-slate-200 mb-6 flex-1">
              <li>• Tutto del Pro</li>
              <li>• Dashboard con KPI dinamici in tempo reale</li>
              <li>• Sistema anti-fake click AI</li>
              <li>• Analisi predittiva vendite/conversioni</li>
              <li>• Pianificazione automatica delle campagne</li>
              <li>• Modello AI personalizzato sul cliente</li>
              <li>• Export professionale CSV/PDF</li>
              <li>• Chatbot AI dedicato addestrato sul brand</li>
            </ul>

            <p className="text-xs text-slate-300 mb-4">
              Massima potenza AI, automazione completa e riduzione degli
              sprechi pubblicitari.
            </p>

            <button
              type="button"
              disabled
              className="inline-flex items-center justify-center rounded-full border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-300 bg-slate-900/70 cursor-not-allowed"
            >
              Presto disponibile
            </button>
          </div>
        </div>

        {/* PERCHÉ CONVIENE */}
        <section className="mt-10 grid gap-8 md:grid-cols-[2fr,1fr] items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Perché conviene un abbonamento
            </h2>
            <ol className="space-y-3 text-sm text-slate-200">
              <li>
                <span className="font-semibold">
                  1. L’AI lavora ogni giorno sulle tue campagne.
                </span>{" "}
                Ottimizza budget, creatività e pubblico mentre tu fai altro.
              </li>
              <li>
                <span className="font-semibold">
                  2. Riduci gli sprechi di budget.
                </span>{" "}
                Ogni euro è controllato dall’AI che blocca posizionamenti
                inutili e segnala le campagne che stanno bruciando soldi.
              </li>
              <li>
                <span className="font-semibold">3. Risultati misurabili.</span>{" "}
                Dashboard semplice stile Google Ads: capisci subito cosa
                funziona grazie a impression, click, conversioni e costo per
                risultato.
              </li>
              <li>
                <span className="font-semibold">4. Nessun vincolo.</span> Puoi
                disdire quando vuoi, direttamente dalla dashboard. Nessun
                contratto annuale nascosto.
              </li>
              <li>
                <span className="font-semibold">
                  5. Chatbot AI dedicato.
                </span>{" "}
                Niente call center: un assistente AI ti risponde 24/7 su piani,
                billing e campagne.
              </li>
            </ol>
          </div>

          {/* CHATBOT BOX */}
          <aside className="rounded-2xl border border-sky-500/40 bg-slate-900/70 p-5 space-y-3">
            <p className="text-xs font-semibold tracking-widest text-sky-400 uppercase">
              Chatbot AI · Coming soon
            </p>
            <h3 className="text-lg font-semibold">
              Chatbot AI dedicato al tuo advertising
            </h3>
            <p className="text-sm text-slate-200">
              Niente call center, nessuna attesa: nel piano Basic è incluso un
              chatbot AI che conosce le tue campagne e ti risponde direttamente
              dalla dashboard.
            </p>
            <ul className="text-sm text-slate-200 space-y-1">
              <li>• “Perché questa campagna sta spendendo tanto?”</li>
              <li>• “Qual è l’annuncio con il CTR migliore?”</li>
              <li>• “Suggeriscimi una nuova variante di testo per questo prodotto.”</li>
            </ul>
            <p className="text-xs text-sky-300/90 pt-1">
              Il widget sarà visibile in basso a destra su tutte le pagine del
              sito, con risposte in tempo reale 24/7.
            </p>
          </aside>
        </section>
      </section>
    </main>
  );
}
