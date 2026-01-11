#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FILE="$ROOT/src/app/api/chatbot/route.ts"

echo "📍 Project: $ROOT"
echo "🧩 Target:  $FILE"

if [[ ! -f "$FILE" ]]; then
  echo "❌ File non trovato: $FILE"
  exit 1
fi

TS="$(date +%Y%m%d-%H%M%S)"
BK="$FILE.BAK_V2_$TS"
cp "$FILE" "$BK"
echo "✅ Backup creato: $BK"

python3 - <<'PY'
import pathlib, re, sys
p = pathlib.Path("src/app/api/chatbot/route.ts")
s = p.read_text(encoding="utf-8")

# 1) Inserisci helper dopo gli import (se non esiste già)
helper = r'''
async function fetchGoogleAdsSummary(baseUrl: string) {
  const r = await fetch(`${baseUrl}/api/googleads/summary`, { cache: "no-store" });
  const j = await r.json().catch(() => null);
  return { ok: r.ok, status: r.status, json: j };
}
'''.strip() + "\n\n"

if "fetchGoogleAdsSummary" not in s:
  m = re.search(r"^(import[^\n]*\n)+", s, flags=re.M)
  if not m:
    print("❌ Non trovo gli import in cima al file.", file=sys.stderr)
    sys.exit(2)
  s = s[:m.end()] + "\n" + helper + s[m.end():]

# 2) Trova la prima occorrenza di req.json() e assicurati di avere un oggetto "body"
# Gestiamo due forme:
# A) const body = await req.json()
# B) const { message } = await req.json()
#
# Se è B, la trasformiamo in:
# const body = await req.json();
# const { message } = body;
#
# Così abbiamo sempre "body" e possiamo leggere body.message in modo certo.

# Caso B: destructuring diretto da req.json()
pat_destruct = r"const\s+\{([^}]+)\}\s*=\s*await\s+req\.json\(\)\s*;?"
m = re.search(pat_destruct, s)
if m:
  inside = m.group(1).strip()
  repl = f"const body = await req.json();\n  const {{{inside}}} = body;"
  s = re.sub(pat_destruct, repl, s, count=1)
else:
  # Caso A: const X = await req.json()
  pat_obj = r"const\s+(\w+)\s*=\s*await\s+req\.json\(\)\s*;?"
  m2 = re.search(pat_obj, s)
  if m2:
    varname = m2.group(1)
    if varname != "body":
      s = re.sub(pat_obj, "const body = await req.json()", s, count=1)
  else:
    print("❌ Non trovo req.json() nel file chatbot route.", file=sys.stderr)
    sys.exit(3)

# 3) Inserisci early-return dopo la riga di parsing body (subito dopo "const body = await req.json()")
if "GOOGLE ADS SUMMARY (AUTO_V2)" in s:
  print("ℹ️ Patch V2 già presente, salto inserimento blocco.")
else:
  idx = s.find("const body = await req.json()")
  if idx == -1:
    print("❌ Non trovo 'const body = await req.json()' dopo normalizzazione.", file=sys.stderr)
    sys.exit(4)
  # inserisci subito dopo la riga
  line_end = s.find("\n", idx)
  if line_end == -1:
    line_end = idx

  block = r'''
  // GOOGLE ADS SUMMARY (AUTO_V2): risposta reale se l'utente chiede metriche/campagne
  try {
    const url = new URL(req.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    const userMsg =
      (typeof (body as any)?.message === "string" ? (body as any).message :
      typeof (body as any)?.text === "string" ? (body as any).text :
      typeof (body as any)?.prompt === "string" ? (body as any).prompt :
      "") || "";

    const q = userMsg.toLowerCase();
    const wantsAds = ["google ads","googleads","campagne","campaign","metriche","performance","riepilogo","summary"].some(k => q.includes(k));

    if (wantsAds) {
      const res = await fetchGoogleAdsSummary(baseUrl);

      if (res.ok && res.json?.ok) {
        const sum = res.json;

        const top = (sum.campaigns || []).slice(0, 5).map((c: any) =>
          `• ${c.name} (${c.status}) — imp ${c.impressions}, click ${c.clicks}, costo €${Number(c.costEUR ?? 0).toFixed(2)}`
        ).join("\n");

        const issues = (sum.diagnostics?.issues || []).map((x: string) => `• ${x}`).join("\n");

        const reply =
`📊 Google Ads (ultimi ${sum.range?.days ?? 28} giorni)
Totali: impression ${sum.totals?.impressions ?? 0}, click ${sum.totals?.clicks ?? 0}, costo €${Number(sum.totals?.costEUR ?? 0).toFixed(2)}

Campagne (${sum.campaignsCount ?? 0}):
${top || "• Nessuna campagna trovata"}

${issues ? "⚠️ Note:\n" + issues : ""}`;

        return new Response(JSON.stringify({ reply }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({
        reply: `⚠️ Non riesco ancora a leggere Google Ads (status ${res.status}).`,
        debug: res.json
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch {}
'''.strip("\n") + "\n"

  s = s[:line_end+1] + "\n" + block + s[line_end+1:]

p.write_text(s, encoding="utf-8")
print("✅ Patch V2 applicata.")
PY

echo "✅ Patch V2 completata."
