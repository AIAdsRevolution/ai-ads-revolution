import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * API /api/ai/metrics
 *
 * Ritorna le metriche delle campagne leggendo direttamente
 * dalla tabella campaign_metrics su Supabase.
 *
 * Output: { metrics: [...] }
 */
export async function GET() {
  try {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error("[AI Metrics] Variabili Supabase mancanti");
      // Non esplodere: ritorna array vuoto
      return NextResponse.json({ metrics: [] }, { status: 200 });
    }

    const url = `${SUPABASE_URL}/rest/v1/campaign_metrics?select=*`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[AI Metrics] Errore Supabase:", res.status, text);
      // Non mandiamo errore al frontend, ma un array vuoto
      return NextResponse.json({ metrics: [] }, { status: 200 });
    }

    const rows = await res.json();

    return NextResponse.json(
      {
        metrics: rows ?? [],
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[AI Metrics] Errore inaspettato:", err);
    return NextResponse.json({ metrics: [] }, { status: 200 });
  }
}

