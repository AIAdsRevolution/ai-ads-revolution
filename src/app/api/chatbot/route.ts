import { NextResponse } from "next/server";
import OpenAI from "openai";
import kb from "../../../data/kb/aiads_kb.json";
import { SYSTEM_PROMPT } from "../../../lib/chatbot/systemPrompt";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

function detectLangFromRequest(req: Request): "it" | "en" {
  const al = (req.headers.get("accept-language") || "").toLowerCase();
  if (al.startsWith("it") || al.includes("it")) return "it";
  return "en";
}

function compactKB() {
  return {
    brand: (kb as any).brand,
    value_prop: (kb as any).value_prop,
    features: (kb as any).features,
    demo: (kb as any).demo,
    faq: (kb as any).faq,
    handoff: (kb as any).handoff,
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));
    const message = String(body?.message || "").trim();

    if (!message) {
      return NextResponse.json({ ok: false, error: "missing_message" }, { status: 400 });
    }

    const lang = detectLangFromRequest(req);

    const systemPromptFinal =
      SYSTEM_PROMPT +
      "\n\nRispondi esclusivamente in lingua: " +
      (lang === "it" ? "italiano." : "inglese.");

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPromptFinal },
        { role: "user", content: message + "\n\nContesto:\n" + JSON.stringify(compactKB()) },
      ],
      temperature: 0.3,
    });

    const reply =
      completion.choices[0]?.message?.content ||
      (lang === "it"
        ? "Al momento non riesco a rispondere, riprova tra poco."
        : "I can’t answer right now, please try again shortly.");

    return NextResponse.json({
      ok: true,
      version: "chatbot_ai_v1",
      reply,
    });
  } catch (e: any) {
    console.error("[CHATBOT ERROR]", e);
    return NextResponse.json(
      {
        ok: false,
        error: "exception",
        fallback: "Temporary service error.",
      },
      { status: 500 }
    );
  }
}
