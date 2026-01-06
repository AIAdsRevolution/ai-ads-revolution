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
