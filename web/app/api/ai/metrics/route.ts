import { NextResponse } from "next/server";

const AI_CORE_URL = process.env.AI_CORE_URL || "http://localhost:8001";

export async function GET() {
  try {
    const res = await fetch(`${AI_CORE_URL}/metrics/demo`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`AI core error: ${res.status}`);
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Error calling AI core:", err.message);
    return NextResponse.json(
      {
        ai_on: false,
        intent: "indisponibile",
        ctr: 0.0,
        cpc: 0.0,
        roas: 0.0,
        window_days: 28,
        error: "AI core non disponibile",
      },
      { status: 200 }
    );
  }
}
