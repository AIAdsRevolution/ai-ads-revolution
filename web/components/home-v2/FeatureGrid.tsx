import UiCard from "./UiCard";

const features = [
  { title: "AI-first in ogni decisione", desc: "Ogni asta, offerta e creatività viene valutata da un motore AI in tempo reale." },
  { title: "Dalla scoperta alla conversione", desc: "Gestisci visibilità, traffico e vendite dalla stessa dashboard." },
  { title: "Pensato per tutte le aziende", desc: "Dalla piccola impresa al brand globale: inizi e scali quando i risultati lo confermano." },
  { title: "Setup guidato", desc: "La guida AI integrata ti mostra passo dopo passo come creare e ottimizzare campagne." },
  { title: "Decision Log", desc: "Tracciamento chiaro di cosa fa l’AI e perché, con impatto stimato sui KPI." },
  { title: "Scalabilità enterprise", desc: "Struttura pronta per crescita, integrazioni e moduli avanzati." }
];

export default function FeatureGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {features.map((f) => (
        <UiCard key={f.title} className="p-5">
          <div className="text-lg font-semibold">{f.title}</div>
          <p className="mt-2 text-zinc-300 text-sm leading-relaxed">{f.desc}</p>
        </UiCard>
      ))}
    </div>
  );
}
