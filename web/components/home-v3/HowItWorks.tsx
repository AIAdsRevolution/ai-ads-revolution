export default function HowItWorks() {
  const steps = [
    { n: "01", t: "Collega", d: "Crea l’account e definisci obiettivi e prodotti." },
    { n: "02", t: "Lascia lavorare l’AI", d: "Il motore neurale ottimizza offerte e creatività." },
    { n: "03", t: "Scala ciò che funziona", d: "Aumenti il budget solo dove i dati lo confermano." },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {steps.map(s => (
        <div key={s.n}>
          <div className="text-sm text-zinc-400">{s.n}</div>
          <h3 className="mt-2 text-xl font-semibold">{s.t}</h3>
          <p className="mt-2 text-zinc-300">{s.d}</p>
        </div>
      ))}
    </div>
  );
}
