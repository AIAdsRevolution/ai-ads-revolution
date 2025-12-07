import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = process.env.AI_MODEL_NAME || "gpt-4.1-mini";

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY non configurata");
    return NextResponse.json(
      { error: "AI non configurata. Contatta l'amministratore." },
      { status: 500 }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const userMessage = body?.message as string | undefined;

    if (!userMessage || typeof userMessage !== "string") {
      return NextResponse.json(
        { error: "Messaggio non valido" },
        { status: 400 }
      );
    }

    const systemPrompt = `
Sei il chatbot ufficiale di "AI Ads Revolution", una piattaforma di 
advertising AI-first.
Compiti principali:
- Spiegare cosa fa la piattaforma AI Ads Revolution.
- Aiutare gli utenti a capire piani e prezzi (Basic / Advanced / Ultra).
- Spiegare come funziona il motore neurale di advertising (AI-Core) in 
modo semplice.
- Dare consigli di base su come impostare le campagne (ma senza promesse 
irrealistiche).
- Se un utente chiede supporto tecnico, suggerisci di contattare il 
supporto tramite email admin@aiadsrevolution.com.

Linee guida:
- Rispondi in italiano, tono professionale ma amichevole.
- Non inventare funzioni che non esistono sul sito.
- Puoi menzionare che il Piano Basic è attivabile online via Stripe.
- Ricorda che la piattaforma è in fase Beta.
`;

    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.4,
      max_tokens: 600,
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "Al momento non riesco a rispondere, riprova tra poco.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Errore API chatbot:", err);
    return NextResponse.json(
      { error: "Errore interno del chatbot." },
      { status: 500 }
    );
  }
}

