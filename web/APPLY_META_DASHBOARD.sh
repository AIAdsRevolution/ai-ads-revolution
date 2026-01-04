#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "== Backup dashboard layout files =="
cp -f src/app/dashboard/layout.tsx "src/app/dashboard/layout.tsx.bak.$(date +%Y%m%d-%H%M%S)" || true
cp -f src/app/dashboard/page.tsx "src/app/dashboard/page.tsx.bak.$(date +%Y%m%d-%H%M%S)" || true

mkdir -p components/dashboard-meta

echo "== 1) Dashboard UI components (Meta-like) =="

cat > components/dashboard-meta/Sidebar.tsx <<'EOF'
import Link from "next/link";

const items = [
  { href: "/dashboard", label: "Panoramica" },
  { href: "/dashboard/campaigns", label: "Campagne" },
  { href: "/dashboard/creatives", label: "Creatività" },
  { href: "/dashboard/budget", label: "Budget" },
  { href: "/dashboard/google-ads", label: "Google Ads" },
  { href: "/dashboard/ai", label: "AI Engine" },
  { href: "/dashboard/ai-assistant", label: "AI Assistant" },
  { href: "/dashboard/settings", label: "Impostazioni" },
];

export default function Sidebar() {
  return (
    <aside
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        width: 260,
        borderRight: "1px solid var(--border)",
        background: "rgba(15,20,25,.98)",
        padding: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px" }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "var(--bg-panel)",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: 4, background: "var(--primary)" }} />
        </div>
        <div>
          <div style={{ fontWeight: 750, lineHeight: 1.1 }}>AI Ads Revolution</div>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>Ads Manager</div>
        </div>
      </div>

      <div style={{ marginTop: 14 }}>
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid transparent",
              color: "white",
              textDecoration: "none",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "rgba(255,255,255,.12)",
                display: "inline-block",
              }}
            />
            <span style={{ color: "rgba(255,255,255,.92)" }}>{it.label}</span>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: "auto" }} />

      <div
        style={{
          marginTop: 16,
          padding: 12,
          borderRadius: 12,
          border: "1px solid var(--border)",
          background: "rgba(255,255,255,.03)",
          color: "var(--muted)",
          fontSize: 12,
          lineHeight: 1.5,
        }}
      >
        <div style={{ color: "white", fontWeight: 650 }}>AI Status</div>
        <div style={{ marginTop: 4 }}>ON • realtime signals • decision log</div>
      </div>
    </aside>
  );
}
EOF

cat > components/dashboard-meta/Topbar.tsx <<'EOF'
export default function Topbar() {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        borderBottom: "1px solid var(--border)",
        background: "rgba(15,20,25,.88)",
        backdropFilter: "blur(10px)",
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
          <div style={{ fontWeight: 750 }}>Dashboard</div>
          <span style={{ color: "var(--muted)", fontSize: 12 }}>
            Panoramica e controlli in stile Ads Manager
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input
            placeholder="Cerca…"
            style={{
              width: 240,
              maxWidth: "45vw",
              borderRadius: 10,
              padding: "10px 12px",
              border: "1px solid var(--border)",
              background: "rgba(255,255,255,.03)",
              color: "white",
              outline: "none",
            }}
          />
          <button
            className="meta-btn meta-btn-secondary"
            style={{ padding: "10px 12px", borderRadius: 10 }}
          >
            Esporta
          </button>
          <button
            className="meta-btn meta-btn-primary"
            style={{ padding: "10px 12px", borderRadius: 10 }}
          >
            Crea campagna
          </button>
        </div>
      </div>
    </div>
  );
}
EOF

cat > components/dashboard-meta/Panel.tsx <<'EOF'
export default function Panel({
  title,
  subtitle,
  children,
}:{
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        background: "var(--bg-panel)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: 18,
      }}
    >
      <div style={{ display:"flex", justifyContent:"space-between", gap: 12, flexWrap:"wrap" }}>
        <div>
          <div style={{ fontWeight: 750 }}>{title}</div>
          {subtitle && <div style={{ marginTop: 6, color:"var(--muted)", fontSize: 13 }}>{subtitle}</div>}
        </div>
      </div>
      <div style={{ marginTop: 14 }}>{children}</div>
    </section>
  );
}
EOF

cat > components/dashboard-meta/KpiCards.tsx <<'EOF'
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
EOF

echo "== 2) Dashboard layout.tsx (wrap all pages) =="

cat > src/app/dashboard/layout.tsx <<'EOF'
import Sidebar from "@/components/dashboard-meta/Sidebar";
import Topbar from "@/components/dashboard-meta/Topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-main)" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <Topbar />
        <div style={{ padding: 16 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
EOF

echo "== 3) Improve dashboard home page with panels + KPI grid =="

cat > src/app/dashboard/page.tsx <<'EOF'
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
EOF

echo "== Clean & run =="
rm -rf .next
npm run dev
