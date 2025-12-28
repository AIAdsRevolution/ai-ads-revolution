import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    ok: true,
    campaigns: [],
    meta: {
      message: "Nessuna campagna disponibile. Collega un account Ads per iniziare.",
      ts: new Date().toISOString(),
    },
  });
}
