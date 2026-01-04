export default function Topbar() {
  return (
    <header
      className="topbar-shell"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        borderBottom: "1px solid var(--border)",
        background: "rgba(11,15,20,.72)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontWeight: 780, letterSpacing: "-0.02em" }}>Dashboard</div>
          <span style={{ color: "var(--muted)", fontSize: 12 }}>
            Panoramica e controlli in stile Ads Manager
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input
            placeholder="Cerca…"
            style={{
              width: 260,
              maxWidth: "45vw",
              borderRadius: 12,
              padding: "10px 12px",
              border: "1px solid var(--border)",
              background: "rgba(255,255,255,.03)",
              color: "rgba(255,255,255,.92)",
              outline: "none",
            }}
          />
          <button className="meta-btn meta-btn-secondary">Esporta</button>
          <button className="meta-btn meta-btn-primary">Crea campagna</button>
        </div>
      </div>

      <div
        style={{
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(79,110,247,.55), transparent)",
          opacity: 0.6,
        }}
      />
    </header>
  );
}
