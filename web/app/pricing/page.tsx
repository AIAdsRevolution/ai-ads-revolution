import Link from "next/link";

const plans = [
  {
    name: "Basic",
    price: "€ 19 / mese",
    badge: "Perfetto per iniziare",
    description:
      "Ideale per testare le prime campagne AI in modo sicuro, senza vincoli.",
    features: [
      "Accesso completo alla dashboard inserzionista",
      "AI copywriter per annunci sponsorizzati (Google, Meta, ecc.)",
      "Report base su impression, click e conversioni",
      "Storico campagne sempre disponibile",
      "Supporto tramite chatbot AI dedicato (niente call center)",
      "Disattivabile in qualsiasi momento"
    ],
    cta: "Attiva piano Basic",
    highlight: false,
  },
  {
    name: "Pro",
    price: "€ 49 / mese",
    badge: "Più scelto",
    description:
      "Per piccole aziende e professionisti che vogliono ottimizzare seriamente il budget pubblicitario.",
    features: [
      "Tutto del piano Basic",
      "Ottimizzazione AI avanzata del budget (giorno / settimana / mese)",
      "Suggerimenti automatici su cosa spegnere e cosa potenziare",
      "Segmenti di pubblico consigliati dall’AI",
      "Report dettagliati con confronto tra campagne",
      "Esportazione report in PDF per il tuo commercialista o soci",
      "Chatbot AI potenziato con analisi delle tue campagne"
    ],
    cta: "Passa al Pro",
    highlight: true,
  },
  {
    name: "Ultra",
    price: "€ 99 / mese",
    badge: "Per chi vuole il massimo",
    description:
      "Per chi gestisce tanti annunci o più brand e vuole un copilota AI sempre attivo.",
    features: [
      "Tutto del piano Pro",
      "Analisi AI continua delle performance 24/7",
      "Alert intelligenti quando una campagna spreca budget",
      "Simulazioni “what if”: prova budget diversi prima di spenderli",
      "Raccomandazioni automatiche su creatività, testi e CTA",
      "Accesso prioritario alle nuove funzionalità beta",
      "Integrazione estesa con più piattaforme (progressivo rollout)"
    ],
    cta: "Sblocca piano Ultra",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-12 text-center">
          <p className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
            Piani e prezzi
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Inizia con il piano Basic
            <span className="text-indigo-400"> e scala quando sei pronto.</span>
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Nessun costo di setup, nessun vincolo annuale. Paghi solo per quello che usi
            e puoi cancellare quando vuoi. AI Ads Revolution è il tuo copilota AI per
            fare pubblicità senza buttare via budget.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-2xl border bg-slate-900/60 p-6 shadow-[0_0_40px_rgba(15,23,42,0.7)] ${
                plan.highlight
                  ? "border-indigo-500 shadow-indigo-500/25 scale-[1.02]"
                  : "border-slate-700/80"
              }`}
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{plan.name}</h2>
                  <p className="mt-1 text-sm text-slate-400">{plan.description}</p>
                </div>
                {plan.badge && (
                  <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
                    {plan.badge}
                  </span>
                )}
              </div>

              <div className="mt-4 mb-6">
                <p className="text-2xl font-semibold text-slate-50">{plan.price}</p>
                <p className="text-xs text-slate-500 mt-1">
                  Cancellabile in qualsiasi momento. Nessun costo nascosto.
                </p>
              </div>

              <ul className="flex-1 space-y-2 text-sm text-slate-200">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-[3px] inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] text-emerald-300">
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <form action="/api/stripe/checkout" method="post">
                  <input type="hidden" name="plan" value={plan.name.toLowerCase()} />
                  <button
                    type="submit"
                    className={`w-full rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                      plan.highlight
                        ? "bg-indigo-500 text-white hover:bg-indigo-400"
                        : "bg-slate-800 text-slate-50 hover:bg-slate-700"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </form>
                <p className="mt-2 text-[11px] text-slate-500 text-center">
                  Pagamento elaborato in modo sicuro tramite Stripe.
                  <br />
                  I dati della carta non vengono memorizzati sui server di AI Ads Revolution.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Perché abbonarsi */}
        <div className="mt-16 grid gap-10 md:grid-cols-2 items-start">
          <div>
            <h2 className="text-xl font-semibold text-slate-50">
              Perché scegliere un abbonamento invece di fare tutto da solo?
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Molte aziende bruciano budget in campagne improvvisate: annunci duplicati,
              pubblico sbagliato, offerte non testate. AI Ads Revolution ti aiuta a
              evitare questi errori, usando la potenza dell&apos;AI per suggerirti
              cosa funziona davvero.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>• Riduci gli sprechi di budget grazie alle raccomandazioni AI.</li>
              <li>• Vedi subito quali campagne stanno lavorando per te e quali no.</li>
              <li>• Ottieni testi ottimizzati senza dover diventare copywriter.</li>
              <li>• Hai sempre uno storico chiaro delle performance delle tue campagne.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="text-sm font-semibold text-slate-50">
              Chatbot AI al posto del classico call center ☎️ ➜ 🤖
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Non abbiamo un supporto telefonico tradizionale. Al suo posto ti diamo
              un <span className="text-indigo-300 font-medium">chatbot AI</span> che
              conosce la tua dashboard, le tue campagne e il tuo storico.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li>• Risposte immediate 24/7 alle domande più comuni.</li>
              <li>• Suggerimenti contestuali mentre guardi i tuoi dati.</li>
              <li>• Spiegazioni chiare su termini tecnici e metriche.</li>
              <li>• Niente attese infinite, niente ticket persi.</li>
            </ul>
            <p className="mt-3 text-xs text-slate-500">
              Se in futuro attiveremo un supporto umano dedicato, sarà incluso solo
              nei piani superiori, ma il cuore del sistema resterà sempre l&apos;AI.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
