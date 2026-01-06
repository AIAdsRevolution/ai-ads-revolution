#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "== Backup globals.css =="
cp -f src/app/globals.css "src/app/globals.css.bak.$(date +%Y%m%d-%H%M%S)" || true

META_BLOCK=$(cat <<'EOF'
/* ===== META_PALETTE_V1_START ===== */
/* Meta-like palette (dark graphite + neural blue) */
:root{
  --bg-main: #0B0F14;                 /* page background */
  --bg-panel: rgba(255,255,255,.03);  /* panels */
  --panel-solid: #151A22;             /* solid card */
  --border: rgba(255,255,255,.10);    /* hairlines */
  --muted: rgba(255,255,255,.65);     /* secondary text */
  --text: rgba(255,255,255,.92);      /* primary text */

  --primary: #4F6EF7;                 /* CTA / active */
  --primary-2: rgba(79,110,247,.18);  /* selection/active bg */
  --positive: #2ECC71;                /* KPI positive */
  --warning: #F5A524;
  --danger: #E5484D;
}

/* Global base */
html, body { background: var(--bg-main); color: var(--text); }
a { color: inherit; }
hr { border-color: var(--border); }

/* Buttons used across dashboard */
.meta-btn{
  border-radius: 10px;
  border: 1px solid var(--border);
  background: rgba(255,255,255,.03);
  color: var(--text);
  padding: 10px 12px;
  font-weight: 650;
  cursor: pointer;
}
.meta-btn:hover{ background: rgba(255,255,255,.05); }
.meta-btn:active{ transform: translateY(1px); }

.meta-btn-primary{
  background: var(--primary);
  border-color: rgba(79,110,247,.55);
  color: white;
}
.meta-btn-primary:hover{ filter: brightness(1.05); }

.meta-btn-secondary{
  background: rgba(255,255,255,.03);
  border-color: var(--border);
}

/* Panels/cards (helps legacy pages look nicer) */
.dash-scope .panel,
.dash-scope .card,
.dash-scope .box{
  background: var(--panel-solid);
  border: 1px solid var(--border);
}

/* Table polish (Meta-ish) */
.dash-scope table{
  background: rgba(255,255,255,.02);
  border: 1px solid var(--border);
}
.dash-scope th{ background: rgba(255,255,255,.03); color: rgba(255,255,255,.78); }

/* Inputs/select polish */
.dash-scope input,
.dash-scope select,
.dash-scope textarea{
  border: 1px solid var(--border);
  background: rgba(255,255,255,.03);
  color: var(--text);
}
.dash-scope input:focus,
.dash-scope select:focus,
.dash-scope textarea:focus{
  outline: none;
  border-color: rgba(79,110,247,.55);
  box-shadow: 0 0 0 3px rgba(79,110,247,.18);
}
/* ===== META_PALETTE_V1_END ===== */
EOF
)

CSS_FILE="src/app/globals.css"

# If block exists, replace it; otherwise append it.
if grep -q "META_PALETTE_V1_START" "$CSS_FILE"; then
  echo "== Replace existing META palette block =="
  perl -0777 -i -pe "s/\/\* ===== META_PALETTE_V1_START ===== \*\/.*?\/\* ===== META_PALETTE_V1_END ===== \*\//$META_BLOCK/s" "$CSS_FILE"
else
  echo "== Append META palette block =="
  printf "\n\n%s\n" "$META_BLOCK" >> "$CSS_FILE"
fi

echo "== Clean & run =="
rm -rf .next
npm run dev
