import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

type Msg = { role: "user" | "assistant"; text: string };

export async function POST(req: Request) {
  try {
    const { messages }: { messages: Msg[] } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "Missing OPENAI_API_KEY" },
        { status: 500 }
      );
    }

    const client = new OpenAI({ apiKey });

    // Prendiamo gli ultimi messaggi per contesto
    const last = (messages || []).slice(-12);

    const system = [
      "Sei AI Ads Assistant di AI Ads Revolution.",
      "Stile: professionale, chiaro, diretto, zero hype.",
      "Obiettivo: aiutare su campagne, budget, creatività, ROAS, Google Ads, problemi account.",
      "Se mancano dati reali, chiedi quali KPI/periodo e proponi passi concreti nella piattaforma.",
    ].join(" ");

    // Converte in input testuale (semplice e robusto)
    const input = [
      { role: "system", content: system },
      ...last.map((m) => ({
        role: m.role,
        content: m.text,
      })),
    ];

    const response = await client.responses.create({
      model: "gpt-5.2",
      input,
    });

    return NextResponse.json({ ok: true, text: response.output_text });
  } catch (e: any) {
    console.error("❌ /api/chat error:", e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
