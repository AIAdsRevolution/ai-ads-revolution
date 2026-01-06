const items = [
  { t:"AI-first in ogni decisione", d:"Ogni asta, offerta e creatività viene valutata da segnali realtime." },
  { t:"Decision log trasparente", d:"Sai cosa fa l’AI, perché lo fa e con quale impatto stimato." },
  { t:"Realtime signals", d:"Reagisce ai cambiamenti del mercato mentre accadono." },
  { t:"Scalabilità enterprise", d:"Inizi piccolo e cresci solo quando i dati lo confermano." },
];

export default function AiEngine() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map(i => (
        <div key={i.t} className="ui-card p-6">
          <div className="text-lg font-semibold">{i.t}</div>
          <div className="mt-2 text-sm ui-muted leading-relaxed">{i.d}</div>
        </div>
      ))}
    </div>
  );
}
