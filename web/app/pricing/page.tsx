"use client";

import { useState } from "react";

export default function PricingPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Il backend userà STRIPE_BASIC_PRICE_ID di default
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Errore durante il checkout.");
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Risposta Stripe non valida.");
      }
    } catch (err: any) {
      console.error("Errore checkout:", err);
      setError(err.message || "Impossibile avviare il pagamento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Piani e prezzi di <span className="text-cyan-400">AI Ads Revolution</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Inizia dal piano Basic per testare le campagne AI in modo sicuro.
            Nessun vincolo annuale, disdici quando vuoi.
          </p>
        </header>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Piano Basic */}
          <div className="border border-slate-800 rounded-2xl bg-slate-900/60 p-6 md:p-8 shadow-xl shadow-cyan-500/10">
            <h2 className="text-xl font-semibold mb-2">Piano Basic</h2>
            <p className="text-sm text-cyan-400 mb-4">
              Ideale per iniziare a testare campagne AI in modo sicuro.
            </p>

            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-bold">€ 19</span>
              <span className="text-slate-400">/ mese</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Cancellabile in qualsiasi momento. Paghi solo per quello che usi.
            </p>

            <ul className="space-y-2 text-sm mb-6">
              <li>• Accesso completo alla dashboard inserzionista</li>
              <li>• AI copywriter per annunci sponsorizzati</li>
              <li>• Report base su impression, click e conversioni</li>
              <li>• Supporto via email + chatbot AI dedicato (niente telefono)</li>
            </ul>

            {error && (
              <div className="mb-4 text-sm text-red-400 bg-red-950/40 border border-red-800 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full inline-flex items-center justify-center rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold py-3 text-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Reindirizzamento in corso..." : "Attiva piano Basic"}
            </button>

            <p className="mt-3 text-[11px] text-slate-500 text-center">
              Pagamento elaborato in modo sicuro tramite Stripe. I dati della carta
              non vengono memorizzati sui server di AI Ads Revolution.
            </p>
          </div>

          {/* Perché conviene abbonarsi */}
          <div className="border border-slate-800 rounded-2xl bg-slate-900/40 p-6 md:p-8">
            <h3 className="text-lg font-semibold mb-4">Perché scegliere un abbonamento?</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <span className="font-semibold text-cyan-300">1. Risparmi tempo</span><br />
                L&apos;AI scrive i testi al posto tuo e ti suggerisce le creatività migliori
                in base ai dati reali delle campagne.
              </li>
              <li>
                <span className="font-semibold text-cyan-300">2. Eviti sprechi di budget</span><br />
                Ottimizzazione continua delle campagne: capisci dove stai buttando soldi
                e dove invece conviene investire.
              </li>
              <li>
                <span className="font-semibold text-cyan-300">3. Vedi risultati in modo chiaro</span><br />
                Dashboard semplice con impression, click e conversioni,
                pensata anche per chi non è un esperto di marketing.
              </li>
              <li>
                <span className="font-semibold text-cyan-300">4. Nessun vincolo</span><br />
                Puoi iniziare, testare per qualche mese e cancellare quando vuoi,
                senza telefonate o contratti complicati.
              </li>
              <li>
                <span className="font-semibold text-cyan-300">5. Supporto smart</span><br />
                Chatbot AI integrato per rispondere alle domande più comuni 24/7,
                più supporto email nella fase beta.
              </li>
            </ul>
          </div>
        </div>

        {/* Sezione promemoria clienti */}
        <section className="border border-slate-800 rounded-2xl bg-slate-900/40 p-6 md:p-8">
          <h3 className="text-lg font-semibold mb-3">
            Come AI Ads Revolution ti aiuta ogni mese 📈
          </h3>
          <p className="text-sm text-slate-300 mb-3">
            Puoi usare questa pagina come promemoria per te o per i tuoi clienti:
          </p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>• Pianifichi il budget mensile in modo chiaro.</li>
            <li>• Vedi quali campagne stanno performando meglio.</li>
            <li>• Usi l&apos;AI per scrivere varianti di annunci più veloci dei competitor.</li>
            <li>• Tieni tutto sotto controllo da un&apos;unica dashboard.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
