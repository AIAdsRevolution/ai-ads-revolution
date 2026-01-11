function Card({ label, value, helper }:{label:string; value:string; helper?:string}) {
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        background: "rgba(255,255,255,.02)",
        borderRadius: 12,
        padding: 14,
      }}
    >
      <div style={{ fontSize: 12, color: "var(--muted)" }}>{label}</div>
      <div style={{ marginTop: 6, fontSize: 20, fontWeight: 750 }}>{value}</div>
      {helper && <div style={{ marginTop: 6, fontSize: 12, color:"var(--muted)" }}>{helper}</div>}
    </div>
  );
}

export default function KpiCards() {
  return (
    <div style={{ display:"grid", gap: 12, gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))" }}>
      <Card label="CTR medio" value="0.0%" helper="Click / impression" />
      <Card label="CPC medio" value="€ 0.00" helper="Costo per clic" />
      <Card label="ROAS medio" value="0.0x" helper="Ritorno spesa adv" />
      <Card label="AI Actions" value="0" helper="Ottimizzazioni applicate" />
    </div>
  );
}
