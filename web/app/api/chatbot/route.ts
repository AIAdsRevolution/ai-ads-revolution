import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
Sei il chatbot ufficiale di AI Ads Revolution.

Rispondi in modo chiaro e concreto alle domande su:
- piani Basic, Pro, Enterprise e relativi prezzi;
- cosa include ogni piano (dashboard, AI copywriter, report, ottimizzazione AI, anti-fake click, ecc.);
- come funziona il pagamento con Stripe e la sicurezza (nessun salvataggio dei dati carta sui server di AI Ads Revolution);
- come funziona l'AI sulle campagne: riduzione sprechi, ottimizzazione budget, suggerimenti creativi;
- differenze tra abbonamento e ricarica singola;
- libertà di cancellazione dall'account.

Regole:
- Rispondi in italiano.
- Non inventare funzioni che non sono state menzionate.
- Se non sai qualcosa, dì che è in fase di sviluppo o "in arrivo".
`;

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(req: Request) {
  if (!openai) {
    console.error("❌ OPENAI_API_KEY mancante");
    return NextResponse.json(
      { error: "AI non configurata lato server." },
      { status: 500 }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "JSON non valido." },
      { status: 400 }
    );
  }

  const message = (body?.message ?? "").toString().trim();
  if (!message) {
    return NextResponse.json(
      { error: "Messaggio mancante." },
      { status: 400 }
    );
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.4,
      max_tokens: 600,
    });

    const reply =
      completion.choices[0]?.message?.content ??
      "Al momento non riesco a generare una risposta, riprova tra poco.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("❌ Errore chatbot AI:", error);
    return NextResponse.json(
      { error: "Errore interno del chatbot AI." },
      { status: 500 }
    );
  }
}
