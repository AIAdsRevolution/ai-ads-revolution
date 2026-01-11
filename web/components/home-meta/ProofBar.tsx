export default function ProofBar() {
  const items = [
    { k: "+30%", v: "Vendite medie attribuite" },
    { k: "4.7x", v: "ROAS medio (beta)" },
    { k: "−25%", v: "Riduzione CPC media" },
    { k: "< 5 min", v: "Setup iniziale" },
  ];

  return (
    <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="meta-container" style={{ padding: "18px 24px" }}>
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
          {items.map(i => (
            <div key={i.k} style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
              <div style={{ fontWeight: 750, fontSize: 18 }}>{i.k}</div>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>{i.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
