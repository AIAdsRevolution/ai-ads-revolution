import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body?.messages;

    const AI_CORE_URL = process.env.AI_CORE_URL;
    const AI_CORE_KEY = process.env.AI_CORE_KEY;

    if (!AI_CORE_URL) {
      return NextResponse.json({ reply: "AI_CORE_URL non configurato. Mettilo in .env.local" }, { status: 500 });
    }

    const upstream = await fetch(`${AI_CORE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(AI_CORE_KEY ? { Authorization: `Bearer ${AI_CORE_KEY}` } : {}),
      },
      body: JSON.stringify({ messages }),
    });

    if (!upstream.ok) {
      const txt = await upstream.text();
      return NextResponse.json({ reply: `Errore AI-Core: ${txt}` }, { status: 500 });
    }

    const data = await upstream.json();
    const reply =
      data.reply ||
      data.message ||
      data.output ||
      (typeof data === "string" ? data : "Nessuna risposta dal motore AI.");

    return NextResponse.json({ reply });
  } catch (e) {
    return NextResponse.json({ reply: "Errore interno API AI Assistant." }, { status: 500 });
  }
}
