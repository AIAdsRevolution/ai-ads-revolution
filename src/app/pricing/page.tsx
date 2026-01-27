"use client";

import { useState } from "react";
import Link from "next/link";

const tiers = [
  {
    id: "basic",
    name: "Basic",
    price: "€19",
    subtitle: "Ideale per iniziare",
    description:
      "Per freelance e piccole attività che vogliono testare le campagne in sicurezza.",
    features: [
      "Dashboard KPI Live",
      "AI copywriter base per annunci",
      "Report impression, click e conversioni",
      "Preview KPI + suggerimenti operativi",
      "Supporto email (beta)",
    ],
    highlight: "Attivabile online",
    cta: "Attiva Basic",
    isPrimary: true,
  },
  {
    id: "advanced",
    name: "Advanced",
    price: "€49",
    subtitle: "Per chi scala le campagne",
    description:
      "Per e-commerce e aziende che vogliono far crescere il budget in modo controllato.",
    features: [
      "Tutto del piano Basic",
      "Segmentazione funnel (TOFU/MOFU/BOFU)",
      "Report ROAS per canale e per campagna",
      "Consigli AI per creatività e landing",
      "Priorità nella roadmap funzionalità",
    ],
    highlight: "Perfetto per e-commerce",
    cta: "Contattaci",
    isPrimary: false,
  },
  {
    id: "ultra",
    name: "Ultra",
    price: "Su misura",
    subtitle: "Per brand e grandi budget",
    description:
      "Per aziende strutturate con volumi importanti di spesa ADV e richieste enterprise.",
    features: [
      "Tutto del piano Advanced",
      "Setup e onboarding dedicato",
      "Consulenza su misurazione e tracciamenti",
      "Accesso prioritario a nuove feature AI",
      "Supporto dedicato premium",
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "basic" }),
      });

      if (!res.ok) {
        const t = await res.text();
        console.error("Checkout error:", t);
        alert("Errore checkout. Riprova tra poco.");
        return;
      }

      const data = await res.json();
      if (data?.url) window.location.href = data.url;
      else alert("Impossibile aprire la pagina di pagamento.");
    } catch (err) {
      console.error(err);
      alert("Errore checkout. Riprova tra poco.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-slate-100">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 md:px-6 md:pb-28 md:pt-14">
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[0.26em] text-emerald-300/80">
              AI Ads Revolution
            </div>
            <h1 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              Piani e prezzi
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
              Scegli il piano più adatto. Puoi partire dal Basic e scalare quando vuoi.
            </p>
          </div>

          <Link
            href="/"
            className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 md:inline-flex"
          >
            ← Torna alla home
          </Link>
        </header>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 ${
                tier.isPrimary ? "ring-emerald-500/40" : ""
              }`}
            >
              {tier.isPrimary && (
                <div className="absolute right-5 top-5 rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-bold text-emerald-300">
                  Più scelto
                </div>
              )}

              <div className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-300/80">
                {tier.subtitle}
              </div>
              <div className="mt-2 text-2xl font-black">{tier.name}</div>
              <p className="mt-2 text-sm text-white/70">{tier.description}</p>

              <div className="mt-5 flex items-baseline gap-2">
                <div className="text-3xl font-black text-emerald-200">{tier.price}</div>
                {tier.id !== "ultra" && (
                  <div className="text-xs text-white/60">/ mese • cancellabile quando vuoi</div>
                )}
              </div>

              <div className="mt-3 text-xs font-semibold text-emerald-300/90">
                {tier.highlight}
              </div>

              <ul className="mt-5 flex-1 space-y-2 text-sm text-white/75">
                {tier.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>

              <div className="mt-6">
                {tier.id === "basic" ? (
                  <button
                    onClick={handleBasicCheckout}
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-extrabold text-black hover:bg-emerald-400 disabled:opacity-70"
                  >
                    {loading ? "Attivazione..." : tier.cta}
                  </button>
                ) : (
                  <Link
                    href={`mailto:admin@aiadsrevolution.com?subject=${encodeURIComponent(
                      `Informazioni piano ${tier.name}`
                    )}`}
                    className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white/80 hover:bg-white/10"
                  >
                    {tier.cta}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-14 grid gap-6 border-t border-white/10 pt-10 md:grid-cols-2">
          <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
            <h3 className="text-sm font-extrabold">Come funziona la fatturazione?</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              I pagamenti sono gestiti in sicurezza tramite Stripe. Puoi annullare il rinnovo in qualsiasi
              momento dal tuo account Stripe o contattando il supporto.
            </p>
          </div>
          <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
            <h3 className="text-sm font-extrabold">Posso cambiare piano in seguito?</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Sì. Puoi partire dal Basic e passare ad Advanced o a una soluzione Ultra su misura in base
              alla crescita delle tue campagne.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
