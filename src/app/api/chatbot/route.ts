import { NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/chatbot/systemPrompt";
import kb from "@/data/kb/aiads_kb.json";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

function compactKB() {
  return JSON.stringify({
    brand: (kb as any).brand,
    value_prop: (kb as any).value_prop,
    features: (kb as any).features,
    demo: (kb as any).demo,
    faq: (kb as any).faq,
    handoff: (kb as any).handoff
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));
    const message = String((body as any)?.message || "").trim();

    if (!message) {
      return NextResponse.json({ ok: false, error: "missing_message" }, { status: 400 });
    }
    if (!OPENAI_API_KEY) {
      return NextResponse.json({ ok: false, error: "missing_openai_key" }, { status: 500 });
    }

    const kbText = compactKB();

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        temperature: 0.4,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "system", content: `KNOWLEDGE_BASE:${kbText}` },
          { role: "user", content: message }
        ]
      })
    });

    if (!r.ok) {
      const errText = await r.text().catch(() => "");
      return NextResponse.json(
        { ok: false, error: "openai_error", details: errText.slice(0, 300) },
        { status: 502 }
      );
    }

    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || "Non sono riuscito a generare la risposta.";

    return NextResponse.json({ ok: true, version: "chatbot_v2_app_router", reply });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: "exception", details: String(e?.message || e) }, { status: 500 });
  }
}
