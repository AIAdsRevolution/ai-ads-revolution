#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

FILE="src/app/api/campaign-metrics/route.ts"
if [ ! -f "$FILE" ]; then
  echo "❌ Non trovo $FILE"
  exit 1
fi

# Backup
cp "$FILE" "$FILE.bak.$(date +%Y%m%d-%H%M%S)"

# Se non esiste GET, aggiungila in fondo (manteniamo POST com'è)
if ! grep -q "export async function GET" "$FILE"; then
cat >> "$FILE" <<'TS'

export async function GET() {
  try {
    // Ultimi 28 giorni (default)
    const from = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString().slice(0,10);

    const { data, error } = await supabase
      .from("campaign_metrics")
      .select("date,campaign_id,campaign_name,impressions,clicks,conversions,cost_eur,revenue_eur,roas,ts")
      .gte("date", from)
      .order("ts", { ascending: false })
      .limit(300);

    if (error) {
      console.error("❌ Supabase read error:", error);
      return NextResponse.json({ ok: false, error }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data });
  } catch (e) {
    console.error("❌ GET API error:", e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
TS
fi

echo "✅ campaign-metrics: aggiunta GET"
