import { NextResponse } from "next/server";

export async function GET() {
  // In questa fase: endpoint stabile per UI. Quando colleghiamo Supabase/Google Ads,
  // questo endpoint verrà alimentato con dati reali.
  return NextResponse.json({
    ok: true,
    campaigns: [],
    meta: {
      message: "Nessuna campagna disponibile. Collega un account Ads per iniziare.",
      ts: new Date().toISOString(),
    },
  });
}
