#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "== 1) Where am I? =="
pwd
ls -la | head -n 20

echo "== 2) Find dashboard layout candidates =="
find src -type f -path "*dashboard*" -name "layout.tsx" -maxdepth 6 || true

echo "== 3) Print first 120 lines of the real dashboard layout =="
LAYOUT="$(find src -type f -path "*dashboard*" -name "layout.tsx" -maxdepth 6 | head -n 1)"
if [ -z "$LAYOUT" ]; then
  echo "❌ Non trovo alcun layout.tsx dentro src/**/dashboard/**"
  echo "Provo a cercare file con 'dashboard' nel path..."
  find src -type f -maxdepth 6 | grep -i dashboard | head -n 40 || true
  exit 1
fi

echo "✅ Layout trovato: $LAYOUT"
sed -n '1,120p' "$LAYOUT" || true

echo "== 4) Ensure a stable wrapper class for Meta palette (dashboard-shell + dash-scope) =="
cp -f "$LAYOUT" "$LAYOUT.bak.$(date +%Y%m%d-%H%M%S)" || true

# Add wrapper classes if not present
perl -0777 -i -pe '
  if ($_ !~ /dashboard-shell/){
    s/<main([^>]*)>/<main className="dash-scope" $1>/s;
  }
  if ($_ !~ /dash-scope/){
    s/<main([^>]*)>/<main className="dash-scope" $1>/s;
  }
' "$LAYOUT" || true

echo "== 5) Force Meta palette + chrome styles in globals.css (only once) =="
CSS="src/app/globals.css"
cp -f "$CSS" "$CSS.bak.$(date +%Y%m%d-%H%M%S)" || true

if ! grep -q "META_PALETTE_V2_START" "$CSS"; then
cat >> "$CSS" <<'EOF'

/* ===== META_PALETTE_V2_START ===== */
:root{
  --bg-main:#0B0F14;
  --panel-solid:#151A22;
  --border:rgba(255,255,255,.10);
  --muted:rgba(255,255,255,.65);
  --text:rgba(255,255,255,.92);
  --primary:#4F6EF7;
  --primary-2:rgba(79,110,247,.18);
  --positive:#2ECC71;
}

html,body{ background:var(--bg-main); color:var(--text); }

.dash-scope{
  background:var(--bg-main);
  color:var(--text);
}

/* Meta-like buttons */
.meta-btn{
  border-radius:10px;
  border:1px solid var(--border);
  background:rgba(255,255,255,.03);
  color:var(--text);
  padding:10px 12px;
  font-weight:650;
  cursor:pointer;
}
.meta-btn:hover{ background:rgba(255,255,255,.05); }
.meta-btn-primary{
  background:var(--primary);
  border-color:rgba(79,110,247,.55);
  color:#fff;
}
.meta-btn-primary:hover{ filter:brightness(1.05); }
.meta-btn-secondary{ background:rgba(255,255,255,.03); }

/* Table polish */
.dash-scope table{
  width:100%;
  border-collapse:separate;
  border-spacing:0;
  background:rgba(255,255,255,.02);
  border:1px solid var(--border);
  border-radius:12px;
  overflow:hidden;
}
.dash-scope th{
  background:rgba(255,255,255,.04);
  color:rgba(255,255,255,.78);
  text-align:left;
  font-size:12px;
  padding:12px 14px;
  border-bottom:1px solid var(--border);
}
.dash-scope td{
  padding:12px 14px;
  border-bottom:1px solid rgba(255,255,255,.06);
}
.dash-scope tbody tr:hover td{
  background:rgba(79,110,247,.06);
}

/* Inputs/select */
.dash-scope input,
.dash-scope select,
.dash-scope textarea{
  border:1px solid var(--border);
  background:rgba(255,255,255,.03);
  color:var(--text);
  border-radius:10px;
  padding:10px 12px;
}
.dash-scope input:focus,
.dash-scope select:focus,
.dash-scope textarea:focus{
  outline:none;
  border-color:rgba(79,110,247,.55);
  box-shadow:0 0 0 3px rgba(79,110,247,.18);
}
/* ===== META_PALETTE_V2_END ===== */
EOF
fi

echo "== 6) Restart dev clean =="
rm -rf .next
PIDS="$(lsof -ti :3000 2>/dev/null || true)"; [ -n "$PIDS" ] && kill -9 $PIDS || true
PIDS="$(lsof -ti :3001 2>/dev/null || true)"; [ -n "$PIDS" ] && kill -9 $PIDS || true
npm run dev
