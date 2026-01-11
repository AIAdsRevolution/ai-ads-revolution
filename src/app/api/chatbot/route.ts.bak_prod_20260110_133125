import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { reply: "Configurazione AI non disponibile." },
        { status: 500 }
      );
    }

    const model = process.env.OPENAI_MODEL || "gpt-4o";

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content:
              "Sei il chatbot ufficiale di AI Ads Revolution. Rispondi in modo chiaro, professionale e orientato al business su piani, prezzi, campagne advertising e funzionamento della piattaforma.",
          },
          {
            role: "user",
            content: String(message || ""),
          },
        ],
        temperature: 0.4,
        max_tokens: 500,
      }),
    });

    if (!openaiRes.ok) {
      console.error("[CHATBOT] OpenAI error:", openaiRes.status);
      return NextResponse.json(
        { reply: "Errore temporaneo del servizio AI. Riprova tra poco." },
        { status: 500 }
      );
    }

    const data = await openaiRes.json();
    const reply =
      data?.choices?.[0]?.message?.content ||
      "Al momento non riesco a rispondere. Riprova tra poco.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[CHATBOT] Errore generale:", err);
    return NextResponse.json(
      { reply: "Errore interno del chatbot. Riprova tra poco." },
      { status: 500 }
    );
  }
}
