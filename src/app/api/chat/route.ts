import { NextResponse } from "next/server";
import OpenAI from "openai";


function getOpenAIClient() {
  const apiKey = (process.env.OPENAI_API_KEY || "").trim();
  if (!apiKey) return null;
  // Istanzia SOLO a runtime (non a build)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const OpenAI = require("openai").default;
  return new OpenAI({ apiKey });
}
export const runtime = "nodejs";

export async function POST(req: Request) {
  
  const client = getOpenAIClient();
  if (!client) {
    return NextResponse.json(
      { ok: false, error: "missing_openai_key" },
      { status: 500 }
    );
  }

try {
    const body = await req.json().catch(() => ({}));
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json({ reply: "Messaggio vuoto." }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { reply: "OPENAI_API_KEY mancante sul server." },
        { status: 500 }
      );
    }

    const model = process.env.OPENAI_MODEL || "gpt-5.2";

    const response = await client.responses.create({
      model,
      input: message, // ✅ stringa: compatibile con Responses API
    });

    return NextResponse.json({
      reply: response.output_text || "Nessuna risposta.",
    });
  } catch (err: any) {
    console.error("API /api/chat error:", err?.message || err);
    return NextResponse.json(
      { reply: "Errore server chat." },
      { status: 500 }
    );
  }
}
