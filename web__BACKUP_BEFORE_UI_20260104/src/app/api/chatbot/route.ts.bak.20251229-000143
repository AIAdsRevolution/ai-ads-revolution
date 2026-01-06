export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      console.error("[CHATBOT] OPENAI_API_KEY mancante!");
      return NextResponse.json(
        { reply: "Errore configurazione AI (manca la chiave API)." },
        { status: 500 }
      );
    }

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Sei il chatbot ufficiale di AI Ads Revolution. Rispondi su piani, prezzi, campagne advertising e funzionamento della piattaforma.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.4,
        max_tokens: 350,
      }),
    });

    if (!openaiRes.ok) {
      const errText = await openaiRes.text();
      console.error("[CHATBOT] Errore risposta OpenAI:", errText);
      return NextResponse.json(
        { reply: "Errore nel servizio AI esterno. Riprova tra poco." },
        { status: 500 }
      );
    }

    const data = await openaiRes.json();
    const reply =
      data.choices?.[0]?.message?.content ||
      "Al momento non riesco a rispondere, riprova tra poco.";

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("[CHATBOT] ERRORE GENERALE:", err?.message || err);
    return NextResponse.json(
      { reply: "Errore temporaneo del chatbot. Riprova tra poco." },
      { status: 500 }
    );
  }
}
