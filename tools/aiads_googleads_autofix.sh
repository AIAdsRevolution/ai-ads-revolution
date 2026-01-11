#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FILE="$ROOT/src/app/api/googleads/summary/route.ts"

echo "📍 Project: $ROOT"
echo "🧩 Target:  $FILE"

if [[ ! -f "$FILE" ]]; then
  echo "❌ File non trovato: $FILE"
  exit 1
fi

# 1) Backup
TS="$(date +%Y%m%d-%H%M%S)"
BK="$FILE.BAK_$TS"
cp "$FILE" "$BK"
echo "✅ Backup creato: $BK"

# 2) Patch diagnostica (sostituisce il blocco qCounts con due query robuste)
python3 - <<'PY'
import re, pathlib, sys
p = pathlib.Path("src/app/api/googleads/summary/route.ts")
s = p.read_text(encoding="utf-8")

# blocco vecchio da sostituire: da "const qCounts" fino a prima del "return NextResponse.json"
pattern = r"""
\s*//\s*Diagnostica:.*?\n
\s*const\s+qCounts\s*=\s*`.*?`;\n
\s*const\s+res2\s*=\s*await\s+gaql\(qCounts\);\n
\s*let\s+diagnostics:.*?\n
\s*if\s*\(res2\.ok.*?\n
\s*}\s*else\s*{\n
\s*diagnostics\.issues\.push\(.*?\);\n
\s*}\n
"""

replacement = r"""
  // Diagnostica: esistenza AdGroup/Ads (più compatibile di COUNT con searchStream)
  let diagnostics: any = { adsCount: 0, adGroupsCount: 0, issues: [] as string[] };

  // Query 1: esiste almeno un Ad Group?
  const qAdGroups = `
    SELECT ad_group.id
    FROM ad_group
    LIMIT 1
  `;
  const rAg = await gaql(qAdGroups);
  if (!rAg.ok) {
    diagnostics.issues.push("Diagnostica AdGroups non disponibile (permessi/GAQL).");
  } else {
    diagnostics.adGroupsCount = rAg.rows.length; // 0 oppure 1 (existence check)
  }

  // Query 2: esiste almeno un annuncio?
  const qAds = `
    SELECT ad_group_ad.ad.id
    FROM ad_group_ad
    LIMIT 1
  `;
  const rAds = await gaql(qAds);
  if (!rAds.ok) {
    diagnostics.issues.push("Diagnostica Ads non disponibile (permessi/GAQL).");
  } else {
    diagnostics.adsCount = rAds.rows.length; // 0 oppure 1
  }

  if (diagnostics.adGroupsCount === 0) diagnostics.issues.push("Nessun gruppo di annunci: crea almeno 1 Ad Group.");
  if (diagnostics.adsCount === 0) diagnostics.issues.push("Nessun annuncio: la campagna non può erogare finché non crei almeno 1 annuncio.");
"""

new_s, n = re.subn(pattern, replacement, s, flags=re.S | re.X)
if n != 1:
  print(f"❌ Patch non applicata: trovato {n} blocchi. Non tocco il file.", file=sys.stderr)
  sys.exit(2)

p.write_text(new_s, encoding="utf-8")
print("✅ Patch applicata con successo.")
PY

# 3) Check ENV (senza stampare segreti)
echo "🔐 Controllo env (mostro solo i nomi presenti, non i valori):"
if [[ -f "$ROOT/.env.local" ]]; then
  for k in GOOGLE_ADS_CLIENT_ID GOOGLE_ADS_CLIENT_SECRET GOOGLE_ADS_REFRESH_TOKEN GOOGLE_ADS_DEVELOPER_TOKEN GOOGLE_ADS_CUSTOMER_ID GOOGLE_ADS_LOGIN_CUSTOMER_ID; do
    if grep -q "^${k}=" "$ROOT/.env.local"; then
      echo "  ✅ $k"
    else
      echo "  ⚠️  $k (manca in .env.local)"
    fi
  done
else
  echo "  ⚠️  .env.local non trovato in $ROOT"
fi

# 4) Test endpoint (assume dev server su localhost:3000 già avviato)
echo "🧪 Test endpoint: /api/googleads/summary"
curl -s -i http://localhost:3000/api/googleads/summary | head -n 40 || true

echo "✅ Fine."
