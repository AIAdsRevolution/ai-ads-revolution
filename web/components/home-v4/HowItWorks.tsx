export default function HowItWorks() {
  const steps = [
    { n: "01", t: "Collega il tuo business", d: "Crea l’account, collega prodotti/servizi e definisci obiettivi." },
    { n: "02", t: "Lascia lavorare l’AI", d: "Il motore neurale ottimizza bid, budget e creatività in tempo reale." },
    { n: "03", t: "Scala ciò che funziona", d: "Aumenti budget solo dove CTR/ROAS e conversioni lo confermano." },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {steps.map(s => (
        <div key={s.n} className="ui-card p-6">
          <div className="text-xs ui-muted">Step {s.n}</div>
          <div className="mt-2 text-xl font-semibold">{s.t}</div>
          <div className="mt-2 text-sm ui-muted leading-relaxed">{s.d}</div>
        </div>
      ))}
    </div>
  );
}
