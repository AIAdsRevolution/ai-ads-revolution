import { NextResponse } from "next/server";
import kb from "../../../data/kb/aiads_kb.json";
import { SYSTEM_PROMPT } from "../../../lib/chatbot/systemPrompt";

function detectLangFromRequest(req: Request) {
  const al = (req.headers.get("accept-language") || "").toLowerCase();
  if (al.startsWith("it")) return "it";
  if (al.includes("it")) return "it";
  return "en";
}

function compactKB() {
  return JSON.stringify({
    brand: (kb as any).brand,
    value_prop: (kb as any).value_prop,
    features: (kb as any).features,
    demo: (kb as any).demo,
    faq: (kb as any).faq,
    handoff: (kb as any).handoff,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));
    const message = String(body?.message || "").trim();

    if (!message) {
      return NextResponse.json(
        { ok: false, error: "missing_message" },
        { status: 400 }
      );
    }

    const lang = detectLangFromRequest(req);

    // Prompt finale (server decide lingua, non l’utente)
    const systemPromptFinal =
      SYSTEM_PROMPT +
      "\n\nRispondi in lingua: " +
      (lang === "it" ? "italiano" : "inglese") +
      ".";

    // ✅ Per ora rispondiamo “safe” senza OpenAI (così la build passa sicura).
    // Poi rimettiamo la chiamata AI quando tutto è stabile.
    return NextResponse.json({
      ok: true,
      version: "chatbot_stable_reset",
      reply:
        lang === "it"
          ? "Ciao! Sono l’assistente AI Ads Revolution. Come posso aiutarti?"
          : "Hi! I’m the AI Ads Revolution assistant. How can I help you?",
      debug: {
        lang,
        kb: compactKB(),
        prompt: systemPromptFinal.slice(0, 120) + "...",
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: "exception", details: String(e?.message || e) },
      { status: 500 }
    );
  }
}
