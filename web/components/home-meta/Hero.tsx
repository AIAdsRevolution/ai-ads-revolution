import Link from "next/link";
import Nav from "./Nav";
import ProofBar from "./ProofBar";

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="meta-kpi">
      <div className="meta-kpi-label">{label}</div>
      <div className="meta-kpi-value">{value}</div>
    </div>
  );
}

function MiniChart() {
  return (
    <div
      style={{
        marginTop: 14,
        background: "rgba(255,255,255,.02)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: 12,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", color: "var(--muted)", fontSize: 12 }}>
        <span>Trend AI</span>
        <span>ROAS</span>
      </div>
      <svg viewBox="0 0 420 90" width="100%" height="90" style={{ marginTop: 6 }}>
        <path
          d="M10 70 C 60 55, 80 62, 120 50 C 160 38, 190 45, 220 35 C 255 23, 290 34, 320 26 C 350 19, 380 28, 410 16"
          fill="none"
          stroke="rgba(79,110,247,.9)"
          strokeWidth="2.5"
        />
        <path
          d="M10 70 C 60 55, 80 62, 120 50 C 160 38, 190 45, 220 35 C 255 23, 290 34, 320 26 C 350 19, 380 28, 410 16 L410 90 L10 90 Z"
          fill="rgba(79,110,247,.12)"
        />
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <>
      <Nav />
      <section className="meta-hero">
        <div className="meta-container">
          <div className="meta-grid-hero">
            <div>
              <h1 className="meta-h1">
                Crea campagne che migliorano da sole.
              </h1>

              <p className="meta-p">
                Un motore neurale che rialloca budget e ottimizza creatività in tempo reale.
                Decision log chiaro e KPI misurabili.
              </p>

              <div className="meta-cta-row">
                <Link className="meta-btn meta-btn-primary" href="/register">Inizia ora</Link>
                <Link className="meta-btn meta-btn-secondary" href="/come-funziona">Guarda come funziona</Link>
              </div>

              <div className="meta-trust">
                Prova gratuita • Nessun lock-in • Setup veloce • Pensato anche per piccole imprese
              </div>
            </div>

            <div className="meta-panel">
              <div className="meta-panel-head">
                <div>
                  <div className="meta-brand-sub">AI Neural Campaign Engine</div>
                  <div className="meta-panel-title">Performance preview</div>
                </div>
                <div className="meta-tag">Ultimi 28 giorni</div>
              </div>

              <MiniChart />

              <div className="meta-kpis">
                <Kpi label="CTR medio" value="0.0%" />
                <Kpi label="CPC medio" value="€ 0.00" />
                <Kpi label="ROAS medio" value="0.0x" />
                <Kpi label="AI Actions" value="0" />
              </div>

              <div className="meta-small">
                Collega campagne reali per vedere KPI live. La dashboard è l’area dedicata ai dati dettagliati.
              </div>

              <div className="meta-chip-row">
                <span className="meta-chip">Decision log</span>
                <span className="meta-chip">Budget shift</span>
                <span className="meta-chip">Creative AI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProofBar />
    </>
  );
}
