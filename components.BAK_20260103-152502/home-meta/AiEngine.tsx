export default function AiEngine() {
  const items = [
    { t:"AI-first in ogni decisione", d:"Ogni asta, offerta e creatività viene valutata da segnali realtime." },
    { t:"Decision log trasparente", d:"Sai cosa fa l’AI, perché lo fa e con quale impatto stimato." },
    { t:"Realtime signals", d:"Reagisce ai cambiamenti del mercato mentre accadono." },
    { t:"Scalabilità enterprise", d:"Inizi piccolo e cresci solo quando i dati lo confermano." },
  ];

  return (
    <div className="meta-cards-2">
      {items.map(i => (
        <div key={i.t} className="meta-card">
          <div className="meta-card-title">{i.t}</div>
          <div className="meta-card-desc">{i.d}</div>
        </div>
      ))}
    </div>
  );
}
