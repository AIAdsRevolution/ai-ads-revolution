function Icon({ name }: { name: "link" | "brain" | "scale" }) {
  const common = { width: 18, height: 18, fill: "none", stroke: "currentColor", strokeWidth: 2 };
  if (name === "link") return (
    <svg {...common} viewBox="0 0 24 24">
      <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" />
      <path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1" />
    </svg>
  );
  if (name === "brain") return (
    <svg {...common} viewBox="0 0 24 24">
      <path d="M8 6a3 3 0 0 1 6 0a3 3 0 0 1 2 5a3 3 0 0 1-2 5a3 3 0 0 1-6 0a3 3 0 0 1-2-5a3 3 0 0 1 2-5Z" />
      <path d="M12 6v12" />
    </svg>
  );
  return (
    <svg {...common} viewBox="0 0 24 24">
      <path d="M4 20h16" />
      <path d="M7 16l3-3l3 3l5-5" />
      <path d="M7 10V4" />
    </svg>
  );
}

export default function HowItWorks() {
  const items = [
    { n:"01", icon:"link" as const, t:"Collega il tuo business", d:"Account, obiettivi, tracking e segnali. Importa dati e campagne." },
    { n:"02", icon:"brain" as const, t:"Lascia lavorare l’AI", d:"Ottimizza bid, budget e creatività in tempo reale con decision log." },
    { n:"03", icon:"scale" as const, t:"Scala ciò che funziona", d:"Aumenti budget solo dove CTR/ROAS e conversioni lo confermano." },
  ];

  return (
    <div className="meta-cards-3">
      {items.map(i => (
        <div key={i.n} className="meta-card">
          <div style={{ display:"flex", alignItems:"center", gap:10, color:"var(--muted)" }}>
            <span style={{ display:"inline-flex", width:28, height:28, alignItems:"center", justifyContent:"center", borderRadius:10, border:"1px solid var(--border)", background:"rgba(255,255,255,.02)" }}>
              <Icon name={i.icon} />
            </span>
            <span className="meta-brand-sub">Step {i.n}</span>
          </div>
          <div className="meta-card-title" style={{ marginTop: 10 }}>{i.t}</div>
          <div className="meta-card-desc">{i.d}</div>
        </div>
      ))}
    </div>
  );
}
