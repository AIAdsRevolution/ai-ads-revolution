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
BK="$FILE.BAK_$TS"
cp "$FILE" "$BK"
echo "✅ Backup creato: $BK"

python3 - <<'PY'
import pathlib, re, sys
p = pathlib.Path("src/app/api/chatbot/route.ts")
s = p.read_text(encoding="utf-8")

# Inseriamo una funzione helper per leggere GoogleAds summary, senza rompere il resto.
helper = r'''
async function fetchGoogleAdsSummary(baseUrl: string) {
  try {
    const r = await fetch(`${baseUrl}/api/googleads/summary`, { cache: "no-store" });
    const j = await r.json().catch(() => null);
    return { ok: r.ok, status: r.status, json: j };
  } catch (e: any) {
    return { ok: false, status: 0, json: { error: e?.message || String(e) } };
  }
}
'''.strip() + "\n\n"

# Se già presente non reinserire
if "fetchGoogleAdsSummary" not in s:
  # mettiamo l'helper subito dopo gli import
  m = re.search(r"^(import[^\n]*\n)+", s, flags=re.M)
  if not m:
    print("❌ Non trovo gli import in cima al file, patch interrotta.", file=sys.stderr)
    sys.exit(2)
  insert_at = m.end()
  s = s[:insert_at] + "\n" + helper + s[insert_at:]

# Ora patchiamo la logica: se l'utente chiede campagne/metriche/google ads, rispondiamo con summary reale.
# Cerchiamo un punto dove viene letto il messaggio utente (tipicamente message o text) e dove si costruisce reply.
# Patch conservativa: aggiungiamo un early-return dentro POST prima della risposta finale, se troviamo "message" nel body.
if "GOOGLE ADS SUMMARY (AUTO)" not in s:
  # Trova la funzione POST
  m = re.search(r"export\s+async\s+function\s+POST\s*\(\s*req:\s*Request\s*\)\s*{", s)
  if not m:
    print("❌ Non trovo export async function POST(req: Request) {", file=sys.stderr)
    sys.exit(3)

  # Inseriamo un blocco dopo il parsing del body (cerchiamo "await req.json()")
  j = re.search(r"const\s+\w+\s*=\s*await\s+req\.json\(\)\s*;?", s)
  if not j:
    # fallback: cerca "await req.json()"
    j = re.search(r"await\s+req\.json\(\)", s)
  if not j:
    print("❌ Non trovo parsing JSON (req.json()) nel chatbot route.", file=sys.stderr)
    sys.exit(4)

  # Inseriamo dopo la riga che contiene req.json()
  line_end = s.find("\n", j.end())
  if line_end == -1:
    line_end = j.end()

  block = r'''
  // GOOGLE ADS SUMMARY (AUTO): risposta reale se l'utente chiede metriche/campagne
  try {
    const url = new URL(req.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    // prova a leggere la property message dal body in modo tollerante
    // (manteniamo compatibilità con formati diversi)
    // @ts-ignore
    const userMsg = (typeof body?.message === "string" ? body.message : (typeof data?.message === "string" ? data.message : "")) || "";
    const q = userMsg.toLowerCase();

    const wantsAds = ["google ads", "googleads", "campagne", "campaign", "metriche", "performance", "riepilogo", "summary"].some(k => q.includes(k));
    if (wantsAds) {
      const res = await fetchGoogleAdsSummary(baseUrl);
      if (res.ok && res.json?.ok) {
        const sum = res.json;
        const camp = (sum.campaigns || []).slice(0, 5).map((c: any) =>
          `• ${c.name} (${c.status}) — imp ${c.impressions}, click ${c.clicks}, costo €${(c.costEUR ?? 0).toFixed?.(2) ?? c.costEUR}`
        ).join("\n");

        const issues = (sum.diagnostics?.issues || []).map((x: string) => `• ${x}`).join("\n");
        const reply =
`📊 Google Ads (ultimi ${sum.range?.days ?? 28} giorni)
Totali: impression ${sum.totals?.impressions ?? 0}, click ${sum.totals?.clicks ?? 0}, costo €${(sum.totals?.costEUR ?? 0).toFixed?.(2) ?? sum.totals?.costEUR}

Campagne (${sum.campaignsCount ?? 0}):
${camp || "• Nessuna campagna trovata"}

${issues ? "⚠️ Note:\n" + issues : ""}`;

        // Risposta coerente con il tuo API: { reply: "..." }
        return new Response(JSON.stringify({ reply }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return new Response(JSON.stringify({
          reply: `⚠️ Non riesco ancora a leggere Google Ads (status ${res.status}). Verifica env e permessi.`,
          debug: res.json
        }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
    }
  } catch {}
'''.strip("\n") + "\n"

  s = s[:line_end+1] + "\n" + block + s[line_end+1:]

p.write_text(s, encoding="utf-8")
print("✅ Patch chatbot applicata (con backup già creato).")
PY

echo "✅ Patch completata. Riavvia dev server se necessario."
