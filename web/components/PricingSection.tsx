"use client";

import { useState } from "react";

export default function PricingSection() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleActivateBasic = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);

      const res = await fetch(
        "/api/billing/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            plan: "basic",
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(
          data?.error ||
            "Impossibile avviare il pagamento in questo momento."
        );
        return;
      }

      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        setErrorMsg("Risposta non valida dal server di pagamento.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Errore imprevisto durante la creazione del pagamento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-8 border-t border-slate-800/70 pt-6">
      <div className="grid gap-6 md:grid-cols-[1.3fr,1fr]">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300/90">
            Piani & prezzi
          </h2>
          <p className="mt-2 text-lg font-semibold text-slate-50">
            Inizia con il piano Basic, scala quando sei pronto.
          </p>
          <p className="mt-2 text-sm text-slate-300/90">
            Nessun costo di setup, nessun vincolo annuale. Paghi solo per quello
            che usi, con fatturazione mensile chiara e report dettagliati sulle
            performance.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/40 bg-slate-950/90 p-4 shadow-[0_0_40px_rgba(16,185,129,0.5)]">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/90">
                Piano Basic
              </p>
              <p className="mt-1 text-xs text-slate-300/90">
                Ideale per iniziare a testare campagne AI in modo sicuro.
              </p>
            </div>
            <div className="text-right">
              <div className="text-xl font-semibold text-slate-50">
                € 29
                <span className="text-sm text-slate-400"> /mese</span>
              </div>
              <div className="text-[11px] text-slate-400">
                cancellabile in qualsiasi momento
              </div>
            </div>
          </div>

          <ul className="mt-3 space-y-1.5 text-[11px] text-slate-300/90">
            <li>• Accesso alla dashboard inserzionista</li>
            <li>• AI copywriter per annunci sponsorizzati</li>
            <li>• Report base su impression, click e conversioni</li>
            <li>• Supporto email per la fase beta</li>
          </ul>

          <button
            onClick={handleActivateBasic}
            disabled={loading}
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-[12px] font-semibold text-slate-950 shadow-[0_0_30px_rgba(16,185,129,0.8)] hover:bg-emerald-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Reindirizzamento in corso..." : "Attiva piano Basic"}
          </button>

          {errorMsg && (
            <p className="mt-2 text-[11px] text-amber-300">
              {errorMsg}
            </p>
          )}

          <p className="mt-2 text-[10px] text-slate-500">
            Il pagamento viene elaborato in modo sicuro tramite Stripe. I dati
            della carta non vengono mai memorizzati sui server di AI Ads
            Revolution.
          </p>
        </div>
      </div>
    </section>
  );
}
