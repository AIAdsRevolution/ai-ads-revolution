import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

/**
 * API /api/dashboard
 * Ritorna una panoramica base per la dashboard inserzionista.
 * Puoi estenderla in futuro con KPI più complessi.
 */
export async function GET() {
  try {
    const supabase = supabaseServer();

    // 🔧 Tabella base: ad_events (cambia se hai un altro nome)
    const { data, error } = await supabase
      .from("ad_events")
      .select("*")
      .limit(50);

    if (error) {
      console.error("[/api/dashboard] Supabase error:", error);
      return NextResponse.json(
        {
          ok: false,
          message:
            "Errore nel recupero dei dati dal database. Controlla la configurazione di Supabase.",
        },
        { status: 500 }
      );
    }

    // In futuro puoi calcolare CTR, ROAS ecc qui.
    return NextResponse.json(
      {
        ok: true,
        events: data ?? [],
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[/api/dashboard] Unexpected error:", err);
    return NextResponse.json(
      {
        ok: false,
        message:
          "Errore interno della API dashboard. Riprova più tardi o contatta il supporto.",
      },
      { status: 500 }
    );
  }
}
