#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "== 0) Check META block present in globals.css =="
grep -n "META_PALETTE_V1_START" -n src/app/globals.css || true
grep -n "--primary" -n src/app/globals.css | head -n 5 || true

echo "== Backup files =="
cp -f src/app/globals.css "src/app/globals.css.bak.$(date +%Y%m%d-%H%M%S)" || true

# 1) Hard-force Meta look on dashboard chrome (sidebar/topbar common classes)
echo "== 1) Append META chrome overrides (scoped) =="
if ! grep -q "META_CHROME_OVERRIDES_V1" src/app/globals.css; then
cat >> src/app/globals.css <<'EOF'

/* ===== META_CHROME_OVERRIDES_V1 ===== */
/* Force the visible chrome to look Meta-like */
.dash-scope{
  background: transparent;
}

.dashboard-shell,
.sidebar-shell,
.topbar-shell{
  background: #0B0F14 !important;
  color: rgba(255,255,255,.92) !important;
}

.sidebar-shell{
  border-right: 1px solid rgba(255,255,255,.10) !important;
}

.topbar-shell{
  border-bottom: 1px solid rgba(255,255,255,.10) !important;
  background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.00)) !important;
}

.sidebar-shell a,
.sidebar-shell button{
  color: rgba(255,255,255,.78) !important;
}

.sidebar-shell a:hover,
.sidebar-shell button:hover{
  color: rgba(255,255,255,.92) !important;
  background: rgba(255,255,255,.04) !important;
}

.meta-btn-primary{
  background: #4F6EF7 !important;
  border-color: rgba(79,110,247,.55) !important;
  color: #fff !important;
}

.dash-scope table thead th{
  background: rgba(255,255,255,.04) !important;
}

.dash-scope table tbody tr:hover td{
  background: rgba(79,110,247,.06) !important;
}
/* ===== END META_CHROME_OVERRIDES_V1 ===== */
EOF
fi

echo "== 2) Patch Sidebar/Topbar wrappers to expose stable classnames =="
# Sidebar
if [ -f components/dashboard-meta/Sidebar.tsx ]; then
  cp -f components/dashboard-meta/Sidebar.tsx "components/dashboard-meta/Sidebar.tsx.bak.$(date +%Y%m%d-%H%M%S)" || true
  perl -0777 -i -pe 's/<aside([^>]*?)>/<aside className="sidebar-shell"$1>/s if $ARGV =~ /Sidebar\.tsx$/;' components/dashboard-meta/Sidebar.tsx || true
fi

# Topbar
if [ -f components/dashboard-meta/Topbar.tsx ]; then
  cp -f components/dashboard-meta/Topbar.tsx "components/dashboard-meta/Topbar.tsx.bak.$(date +%Y%m%d-%H%M%S)" || true
  perl -0777 -i -pe 's/<header([^>]*?)>/<header className="topbar-shell"$1>/s if $ARGV =~ /Topbar\.tsx$/;' components/dashboard-meta/Topbar.tsx || true
fi

# Dashboard layout wrapper
if [ -f src/app/dashboard/layout.tsx ]; then
  cp -f src/app/dashboard/layout.tsx "src/app/dashboard/layout.tsx.bak.$(date +%Y%m%d-%H%M%S)" || true
  perl -0777 -i -pe 's/<div style=\{\{ display:"flex", minHeight:"100vh", background: var\(--bg-main\) \}\}>/<div className="dashboard-shell" style={{ display:"flex", minHeight:"100vh", background:"var(--bg-main)" }}>/' src/app/dashboard/layout.tsx || true
fi

echo "== 3) Clean & restart dev server =="
rm -rf .next

# stop current next dev if running on 3000/3001
PIDS="$(lsof -ti :3000 2>/dev/null || true)"; [ -n "$PIDS" ] && kill -9 $PIDS || true
PIDS="$(lsof -ti :3001 2>/dev/null || true)"; [ -n "$PIDS" ] && kill -9 $PIDS || true

npm run dev
