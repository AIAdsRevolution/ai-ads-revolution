import { NextResponse } from "next/server";
import OpenAI from "openai";
import kb from "../../../data/kb/aiads_kb.json";
import { SYSTEM_PROMPT } from "../../../lib/chatbot/systemPrompt";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

function detectLang(req: Request) {
  const al = (req.headers.get("accept-language") || "").toLowerCase();
  return al.startsWith("it") || al.includes("it") ? "it" : "en";
}

function compactKB() {
  return JSON.stringify({
    brand: kb.brand,
    value_prop: kb.value_prop,
    features: kb.features,
    demo: kb.demo,
    faq: kb.faq,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = String(body?.message || "").trim();
    if (!message) {
      return NextResponse.json({ ok: false, error: "missing_message" }, { 
status: 400 });
    }

    const lang = detectLang(req);

    const systemPrompt =
      SYSTEM_PROMPT +
      "\n\nKnowledge base:\n" +
      compactKB() +
      "\n\nRispondi in lingua: " +
      (lang === "it" ? "italiano" : "inglese");

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.4,
    });

    return NextResponse.json({
      ok: true,
      version: "chatbot_ai_final",
      reply: completion.choices[0].message.content,
    });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      {
        ok: false,
        reply:
          "Errore temporaneo del servizio. Riprova tra poco.",
      },
      { status: 500 }
    );
  }
}

