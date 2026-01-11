#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "== Backup =="
cp -f src/app/dashboard/layout.tsx "src/app/dashboard/layout.tsx.bak.$(date +%Y%m%d-%H%M%S)" || true
cp -f src/app/globals.css "src/app/globals.css.bak.$(date +%Y%m%d-%H%M%S)" || true

echo "== 1) Add dashboard scope wrapper in layout =="
cat > src/app/dashboard/layout.tsx <<'EOF'
import Sidebar from "@/components/dashboard-meta/Sidebar";
import Topbar from "@/components/dashboard-meta/Topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-main)" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <Topbar />
        <div className="dash-scope" style={{ padding: 16 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
EOF

echo "== 2) Dashboard UI Polish CSS (scoped) =="
# Append only once (idempotent-ish)
if ! grep -q "DASH_SCOPE_META_UI" src/app/globals.css; then
cat >> src/app/globals.css <<'EOF'

/* ===== DASH_SCOPE_META_UI (do not remove) ===== */
.dash-scope {
  color: rgba(255,255,255,.92);
}

.dash-scope h1, .dash-scope h2, .dash-scope h3 {
  letter-spacing: -0.02em;
}

.dash-scope input,
.dash-scope select,
.dash-scope textarea {
  width: 100%;
  max-width: 100%;
  border-radius: 10px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  background: rgba(255,255,255,.03);
  color: rgba(255,255,255,.92);
  outline: none;
}

.dash-scope input::placeholder,
.dash-scope textarea::placeholder {
  color: rgba(255,255,255,.35);
}

.dash-scope select {
  appearance: none;
  background-image:
    linear-gradient(45deg, transparent 50%, rgba(255,255,255,.55) 50%),
    linear-gradient(135deg, rgba(255,255,255,.55) 50%, transparent 50%);
  background-position:
    calc(100% - 18px) 55%,
    calc(100% - 12px) 55%;
  background-size: 6px 6px, 6px 6px;
  background-repeat: no-repeat;
  padding-right: 32px;
}

.dash-scope input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: var(--primary);
  border-radius: 6px;
}

.dash-scope button,
.dash-scope .btn {
  border-radius: 10px;
  border: 1px solid var(--border);
  background: rgba(255,255,255,.03);
  color: rgba(255,255,255,.92);
  padding: 10px 12px;
}

.dash-scope table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: rgba(255,255,255,.02);
}

.dash-scope th,
.dash-scope td {
  padding: 10px 12px;
  border-bottom: 1px solid var(--border);
  text-align: left;
  font-size: 13px;
}

.dash-scope th {
  color: rgba(255,255,255,.78);
  background: rgba(255,255,255,.03);
  font-weight: 650;
}

.dash-scope tr:hover td {
  background: rgba(79,110,247,.06);
}

.dash-scope .card,
.dash-scope .panel,
.dash-scope .box {
  border: 1px solid var(--border);
  background: rgba(255,255,255,.02);
  border-radius: 12px;
  padding: 14px;
}
/* ===== END DASH_SCOPE_META_UI ===== */
EOF
fi

echo "== Clean & run =="
rm -rf .next
npm run dev
