import { NextResponse } from "next/server";

const AI_CORE_URL = process.env.AI_CORE_URL || "http://localhost:8001";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(`${AI_CORE_URL}/optimize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`AI core error: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Error calling AI core /optimize:", err.message);

    return NextResponse.json(
      {
        error: "AI core non disponibile",
        recommended_bid: 0,
        prospecting_budget: 0,
        retargeting_budget: 0,
        score: 0,
      },
      { status: 200 }
    );
  }
}
