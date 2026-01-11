"use client";

import { useState } from "react";
import Link from "next/link";

const tiers = [
  {
    id: "basic",
    name: "Basic",
    price: "€ 19",
    subtitle: "Ideale per iniziare",
    description: "Per freelance, piccole attività e chi vuole testare le campagne AI in sicurezza.",
    features: [
      "Accesso completo alla dashboard inserzionista",
      "AI copywriter base per annunci sponsorizzati",
      "Report su impression, click e conversioni",
      "Integrazione con AI Ads Revolution Neural Engine",
      "Supporto email durante la fase beta",
    ],
    highlight: "Piano attivabile online",
    cta: "Attiva Basic",
    isPrimary: true,
  },
  {
    id: "advanced",
    name: "Advanced",
    price: "€ 49",
    subtitle: "Per chi scala le campagne",
    description: "Per e-commerce e aziende che vogliono far crescere il budget in modo controllato.",
    features: [
      "Tutto del piano Basic",
      "Segmentazione avanzata per funnel (TOFU/MOFU/BOFU)",
      "Report ROAS per canale e per campagna",
      "Consigli AI per creatività e landing page",
      "Priorità nella roadmap funzionalità",
    ],
    highlight: "Perfetto per e-commerce",
    cta: "Contattaci per Advanced",
    isPrimary: false,
  },
  {
    id: "ultra",
    name: "Ultra",
    price: "Su misura",
    subtitle: "Per brand e grandi budget",
    description: "Per aziende strutturate, marketplace e realtà con volumi importanti di spesa adv.",
    features: [
      "Tutto del piano Advanced",
      "Setup e onboarding dedicato",
      "Consulenza strategica su misurazione e tracciamenti",
      "Accesso prioritario a nuove feature AI",
      "Supporto dedicato via canali premium",
    ],
    highlight: "Soluzione personalizzata",
    cta: "Parla con noi",
    isPrimary: false,
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handleBasicCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/billing/create-checkout-session", {
        method: "POST",
      });

      if (!res.ok) {
        console.error("Errore checkout Basic:", await res.text());
        alert(
          "Si è verificato un errore nell'attivazione del piano Basic. Riprova tra poco."
        );
        return;
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Non è stato possibile aprire la pagina di pagamento Stripe.");
      }
    } catch (err) {
      console.error("Errore checkout Basic:", err);
      alert(
        "Si è verificato un errore nell'attivazione del piano Basic. Riprova tra poco."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black text-slate-100">
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-10 pt-6 md:px-6 md:pt-8">
        {/* HEADER */}
        <header className="flex items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-emerald-400/80">
              AI Ads Revolution
            </p>
            <h1 className="mt-2 text-2xl font-semibold md:text-3xl">
              Piani e prezzi
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-300">
              Scegli il piano che meglio si adatta al tuo business. Inizi con
              il Basic e puoi sempre scalare verso Advanced o soluzioni Ultra
              su misura.
            </p>
          </div>
          <Link
            href="/"
            className="hidden rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-200 hover:border-emerald-400 hover:text-emerald-200 
transition-colors md:inline-flex"
          >
            ← Torna alla home
          </Link>
        </header>

        {/* CARD PIANI */}
        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex h-full flex-col rounded-2xl border bg-slate-950/80 p-5 shadow-[0_0_35px_rgba(15,23,42,0.9)] ${
                tier.isPrimary
                  ? "border-emerald-500/60 shadow-[0_0_45px_rgba(16,185,129,0.4)]"
                  : "border-slate-800/90"
              }`}
            >
              {tier.isPrimary && (
                <div className="absolute right-4 top-4 rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                  Più scelto
                </div>
              )}

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                {tier.subtitle}
              </p>
              <h2 className="mt-1 text-xl font-semibold">{tier.name}</h2>
              <p className="mt-1 text-sm text-slate-300">{tier.description}</p>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-emerald-300">
                  {tier.price}
                </span>
                {tier.id !== "ultra" && (
                  <span className="text-xs text-slate-400">
                    / mese, cancellabile in qualsiasi momento
                  </span>
                )}
              </div>

              <p className="mt-1 text-[11px] text-emerald-300/90">
                {tier.highlight}
              </p>

              <ul className="mt-4 flex-1 space-y-1.5 text-sm text-slate-200">
                {tier.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>

              <div className="mt-5">
                {tier.id === "basic" ? (
                  <button
                    onClick={handleBasicCheckout}
                    disabled={loading}
                    className="btn-primary-3d inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 
shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:bg-emerald-300 transition-colors disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? "Attivazione in corso..." : "Attiva piano Basic"}
                  </button>
                ) : tier.id === "advanced" ? (
                  <Link
                    href="mailto:admin@aiadsrevolution.com?subject=Informazioni%20piano%20Advanced"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-sm font-semibold 
text-slate-100 hover:border-emerald-400 hover:text-emerald-200 transition-colors"
                  >
                    {tier.cta}
                  </Link>
                ) : (
                  <Link
                    href="mailto:admin@aiadsrevolution.com?subject=Soluzione%20Ultra%20su%20misura"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-sm font-semibold 
text-slate-100 hover:border-emerald-400 hover:text-emerald-200 transition-colors"
                  >
                    {tier.cta}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* FAQ */}
        <section className="mt-10 border-t border-slate-800/80 pt-8 grid gap-6 md:grid-cols-2 text-sm text-slate-300">
          <div>
            <h3 className="text-base font-semibold text-slate-100">
              Come funziona la fatturazione?
            </h3>
            <p className="mt-2">
              I pagamenti vengono elaborati in sicurezza tramite Stripe. AI Ads
              Revolution non memorizza i dati della tua carta. Puoi annullare il
              rinnovo in qualsiasi momento dal tuo account Stripe o contattando
              il supporto.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100">
              Posso cambiare piano in seguito?
            </h3>
            <p className="mt-2">
              Sì. Puoi partire dal Basic e in seguito passare ad Advanced o a
              una soluzione Ultra su misura, in base alla crescita delle tue
              campagne e del tuo budget pubblicitario.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

