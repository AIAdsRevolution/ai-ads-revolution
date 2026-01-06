#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "== Backup Sidebar/Topbar =="
cp -f components/dashboard-meta/Sidebar.tsx "components/dashboard-meta/Sidebar.tsx.bak.$(date +%Y%m%d-%H%M%S)" || true
cp -f components/dashboard-meta/Topbar.tsx "components/dashboard-meta/Topbar.tsx.bak.$(date +%Y%m%d-%H%M%S)" || true
cp -f src/app/globals.css "src/app/globals.css.bak.$(date +%Y%m%d-%H%M%S)" || true

echo "== 1) Replace Sidebar.tsx to use CSS variables (no hardcoded rgba) =="
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
      className="sidebar-shell"
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        width: 268,
        padding: 16,
        background: "var(--bg-main)",
        borderRight: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 12px",
          borderRadius: 14,
          border: "1px solid var(--border)",
          background: "var(--panel-solid)",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 12,
            background: "rgba(255,255,255,.03)",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: 5, background: "var(--primary)" }} />
        </div>
        <div>
          <div style={{ fontWeight: 750, lineHeight: 1.1 }}>AI Ads Revolution</div>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>Ads Manager</div>
        </div>
      </div>

      <div style={{ marginTop: 14, display: "grid", gap: 6 }}>
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid transparent",
              color: "rgba(255,255,255,.86)",
              textDecoration: "none",
              background: "transparent",
            }}
            className="sidebar-link"
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "rgba(255,255,255,.14)",
                display: "inline-block",
              }}
            />
            <span>{it.label}</span>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: "auto" }} />

      <div
        style={{
          marginTop: 16,
          padding: 12,
          borderRadius: 14,
          border: "1px solid var(--border)",
          background: "var(--panel-solid)",
          color: "var(--muted)",
          fontSize: 12,
          lineHeight: 1.5,
        }}
      >
        <div style={{ color: "rgba(255,255,255,.92)", fontWeight: 650 }}>AI Status</div>
        <div style={{ marginTop: 4 }}>ON • realtime signals • decision log</div>
      </div>
    </aside>
  );
}
EOF

echo "== 2) Replace Topbar.tsx to use variables (visible change) =="
cat > components/dashboard-meta/Topbar.tsx <<'EOF'
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
EOF

echo "== 3) Add hover/active styling for sidebar links (only once) =="
if ! grep -q "META_SIDEBAR_LINKS_V1" src/app/globals.css; then
cat >> src/app/globals.css <<'EOF'

/* ===== META_SIDEBAR_LINKS_V1 ===== */
.sidebar-shell .sidebar-link:hover{
  background: rgba(255,255,255,.04);
  border-color: rgba(255,255,255,.08);
}
.sidebar-shell .sidebar-link:active{
  transform: translateY(1px);
}
EOF
fi

echo "== 4) Clean & restart =="
rm -rf .next
PIDS="$(lsof -ti :3000 2>/dev/null || true)"; [ -n "$PIDS" ] && kill -9 $PIDS || true
PIDS="$(lsof -ti :3001 2>/dev/null || true)"; [ -n "$PIDS" ] && kill -9 $PIDS || true
npm run dev
