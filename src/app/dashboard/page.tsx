import Panel from "@/components/dashboard-meta/Panel";
import KpiCards from "@/components/dashboard-meta/KpiCards";

export default function DashboardHome() {
  return (
    <main style={{ display: "grid", gap: 14 }}>
      <Panel
        title="Panoramica"
        subtitle="KPI principali e stato del motore neurale (demo finché non colleghi dati reali)."
      >
        <KpiCards />
      </Panel>

      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))" }}>
        <Panel
          title="Decision log"
          subtitle="Tracciamento sintetico di cosa fa l’AI e perché."
        >
          <div style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.6 }}>
            • Nessuna azione applicata (collega campagne reali)<br/>
            • In arrivo: budget shift automatico, suggerimenti creativi, alert KPI
          </div>
        </Panel>

        <Panel
          title="Connessioni"
          subtitle="Stato integrazioni (Google Ads / Tracking / Supabase)."
        >
          <div style={{ display:"grid", gap: 10 }}>
            <div style={{ display:"flex", justifyContent:"space-between", border:"1px solid var(--border)", borderRadius: 12, padding: 12, background:"rgba(255,255,255,.02)" }}>
              <span style={{ color:"rgba(255,255,255,.92)" }}>Google Ads</span>
              <span style={{ color:"var(--muted)" }}>Da collegare</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", border:"1px solid var(--border)", borderRadius: 12, padding: 12, background:"rgba(255,255,255,.02)" }}>
              <span style={{ color:"rgba(255,255,255,.92)" }}>Tracking</span>
              <span style={{ color:"var(--muted)" }}>Da configurare</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", border:"1px solid var(--border)", borderRadius: 12, padding: 12, background:"rgba(255,255,255,.02)" }}>
              <span style={{ color:"rgba(255,255,255,.92)" }}>Supabase</span>
              <span style={{ color:"var(--muted)" }}>OK</span>
            </div>
          </div>
        </Panel>
      </div>
    </main>
  );
}
