import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const question = body.question;

    if (!process.env.OPENAI_API_KEY) {
      console.error("❌ OPENAI_API_KEY mancante");
      return NextResponse.json({ error: "AI_NOT_CONFIGURED" }, { status: 500 });
    }

    if (!question) {
      return NextResponse.json({ error: "Missing question" }, { status: 400 });
    }

    const prompt = `
Sei il chatbot ufficiale di AI Ads Revolution.
Rispondi sempre in modo semplice, professionale e chiaro.
Informazioni principali:

Piano Basic (19 €/mese):
- Dashboard inserzionista
- Copia annunci AI
- Report impression/click/conversioni
- Pubblicazione rete AI
- Crediti mensili inclusi
- Supporto email
- Chatbot AI 24/7

Piano Pro (49 €):
- Targeting avanzato
- Ottimizzazione automatica
- A/B test
- Libreria creativa AI
- Budget intelligente

Piano Enterprise (99 €):
- KPI realtime
- Anti-fake click AI
- Modello AI personalizzato
- Export PDF/CSV
- Predizione vendite

Ora rispondi alla domanda dell'utente in massimo 8 righe.
Domanda: ${question}
`;

    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await completion.json();

    if (!data.choices) {
      console.error(data);
      return NextResponse.json({ error: "AI_ERROR" }, { status: 500 });
    }

    return NextResponse.json({ reply: data.choices[0].message.content });

  } catch (err) {
    console.error("❌ Chatbot error:", err);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}
