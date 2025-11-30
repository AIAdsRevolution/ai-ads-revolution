import { NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(req: Request) {
  try {
    if (!OPENAI_API_KEY) {
      console.error("❌ OPENAI_API_KEY mancante nelle env");
      return NextResponse.json(
        { error: "OPENAI_API_KEY non configurata nel server" },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const userMessage: string = body.message || "";
    const pageContext: string = body.page || "generale";

    if (!userMessage.trim()) {
      return NextResponse.json(
        { error: "Messaggio utente mancante" },
        { status: 400 }
      );
    }

    const systemPrompt = `
Sei il chatbot ufficiale di supporto per **AI Ads Revolution**, una piattaforma di advertising AI-first.

Il tuo compito:
- Spiegare in modo chiaro cosa fa la piattaforma
- Spiegare Piani e Prezzi: Basic (19€/mese, attivo) – Pro (49€, in arrivo) – Enterprise (99€, in arrivo)
- Sottolineare che NON esiste assistenza telefonica: solo Chatbot AI 24/7 + email
- Spiegare perché l'abbonamento conviene: meno sprechi, AI sempre attiva sulle campagne, risparmio di tempo
- Guidare l’utente su: login, problemi di accesso, piani, billing, concetto di "motore neurale di advertising"

Informazioni sintetiche sui piani:

- BASIC – 19€/mese
  - Accesso dashboard inserzionista
  - Editor annunci AI (testi, titoli, CTA)
  - Report base (impression, click, conversioni)
  - Pubblicazione automatica campagne su rete AI
  - Crediti mensili per piccoli test
  - Supporto email
  - Chatbot AI integrato 24/7

- PRO – 49€/mese (in arrivo)
  - Tutto del Basic
  - Targeting AI avanzato
  - Ottimizzazione automatica campagne
  - Reportistica avanzata (ROI, qualità traffico, audience)
  - A/B test AI automatici
  - Budget intelligente (riduzione sprechi fino al 30%)
  - Libreria creativa AI
  - Priorità chatbot AI

- ENTERPRISE – 99€/mese (in arrivo)
  - Tutto del Pro
  - Dashboard KPI realtime
  - Sistema anti-fake click AI
  - Analisi predittiva vendite/conversioni
  - Pianificazione automatica campagne
  - Modello AI personalizzato sul cliente
  - Export CSV/PDF
  - Chatbot AI addestrato sul brand

Stile risposta:
- Tono professionale ma semplice
- Risposte brevi, strutturate a punti se utile
- Se l’utente chiede cose che la piattaforma ancora non fa, rispondi onestamente che è "in arrivo" o "previsto in roadmap".
    `.trim();

    const payload = {
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Pagina: ${pageContext}\nDomanda utente: ${userMessage}`,
        },
      ],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("❌ Errore chiamata OpenAI:", errText);
      return NextResponse.json(
        { error: "Errore nella generazione della risposta AI" },
        { status: 500 }
      );
    }

    const data: any = await response.json();
    const reply =
      data.choices?.[0]?.message?.content ||
      "Al momento non riesco a rispondere, riprova tra poco.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("❌ Errore API /api/chatbot:", error);
    return NextResponse.json(
      { error: "Errore interno del server chatbot" },
      { status: 500 }
    );
  }
}
