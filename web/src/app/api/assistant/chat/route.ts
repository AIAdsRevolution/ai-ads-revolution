import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body?.messages;

    if (!Array.isArray(messages)) {
      return new NextResponse("Bad Request: messages missing", { status: 400 });
    }

    const AI_CORE_URL = process.env.AI_CORE_URL;
    const AI_CORE_KEY = process.env.AI_CORE_API_KEY;

    if (!AI_CORE_URL || !AI_CORE_KEY) {
      return new NextResponse("Missing AI_CORE_URL or AI_CORE_API_KEY", { status: 500 });
    }

    const r = await fetch(AI_CORE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AI_CORE_KEY}`,
      },
      body: JSON.stringify({ messages }),
    });

    const text = await r.text();

    if (!r.ok) {
      return new NextResponse(text || "AI core error", { status: r.status });
    }

    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      data = { answer: text };
    }

    const answer = data?.answer ?? data?.content ?? data?.message ?? text;
    return NextResponse.json({ answer });
  } catch (e: any) {
    return new NextResponse(e?.message ?? "Server error", { status: 500 });
  }
}
