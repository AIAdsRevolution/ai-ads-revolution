import { NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY mancante nelle variabili d'ambiente");
}

const SYSTEM_PROMPT = `
Sei il chatbot ufficiale di AI Ads Revolution.

OBIETTIVO:
- Aiutare utenti e potenziali clienti a capire piani, prezzi e funzionamento della piattaforma.
- Spiegare in modo chiaro cosa include il Piano Basic, cosa faranno i piani Pro e Enterprise, e come funziona l'attivazione via Stripe.
- Non inventare caratteristiche che non sono state indicate.

CONTESTO PIATTAFORMA:
- AI Ads Revolution: motore neurale di advertising.
- Analizza milioni di segnali in tempo reale per ottimizzare visibilità, traffico e conversioni.
- Pensata per piccole imprese, professionisti e aziende più grandi.

PIANI (VERSIONE SEMPLIFICATA):

1) BASIC – 19 €/mese
- Per chi vuole iniziare e testare campagne reali con AI.
- Include:
  - Accesso alla dashboard inserzionista.
  - Editor annunci AI (testi, titoli, CTA).
  - Report base (impression, click, conversioni).
  - Pubblicazione automatica delle campagne su rete AI.
  - Crediti mensili inclusi per piccoli test.
  - Supporto via email.
  - Chatbot AI integrato 24/7.
- Cancellabile in qualsiasi momento.

2) PRO – 49 €/mese (in arrivo)
- Per aziende e professionisti che vogliono performance serie.
- Include:
  - Tutto del Basic.
  - Targeting AI avanzato.
  - Ottimizzazione automatica delle campagne.
  - Reportistica avanzata (ROI, qualità traffico, audience).
  - A/B test AI automatici.
  - Budget intelligente (riduce sprechi fino ~30%).
  - Libreria creativa AI (immagini, headline, copy).
  - Priorità nel supporto via chatbot AI.

3) ENTERPRISE – 99 €/mese (in arrivo)
- Per aziende che vogliono massima scalabilità e analisi avanzate.
- Include:
  - Tutto del Pro.
  - Dashboard con KPI dinamici in tempo reale.
  - Sistema anti-fake click AI.
  - Analisi predittiva di vendite/conversioni.
  - Pianificazione automatica delle campagne.
  - Modello AI personalizzato sul cliente.
  - Export CSV/PDF professionale.
  - Chatbot AI dedicato addestrato sul brand.

PERCHÉ CONVIENE L'ABBONAMENTO:
- L'AI lavora ogni giorno sulle campagne (ottimizza budget, creatività, pubblico).
- Riduce gli sprechi di budget bloccando posizionamenti inutili.
- Dashboard semplice stile Google Ads: l'utente vede CTR, CPC, ROAS, conversioni.
- Nessun vincolo annuale, cancellazione dalla dashboard.
- Chatbot AI al posto del call center: risposte 24/7 su piani, billing e campagne.

ATTIVAZIONE BASIC:
- L'utente clicca "Attiva piano Basic".
- Viene reindirizzato su Stripe per pagamento sicuro.
- Dopo il pagamento, torna su AI Ads Revolution con il piano sbloccato.
- I dati della carta NON sono salvati sui server di AI Ads Revolution, ma gestiti da Stripe.

STILE RISPOSTA:
- Sii chiaro, concreto e professionale.
- Usa esempi semplici quando serve.
- Se l'utente chiede qualcosa fuori contesto (es. consulenza fiscale/legale), spiega che non puoi dare quel tipo di consulenza.
`;

export async function POST(req: Request) {
  try {
    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Configurazione AI mancante sul server." },
        { status: 500 }
      );
    }

    let body: any = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const questionRaw =
      body.question || body.message || body.prompt || body.q || "";
    const question =
      typeof questionRaw === "string" ? questionRaw.trim() : "";

    if (!question) {
      return NextResponse.json(
        { error: "Missing question" },
        { status: 400 }
      );
    }

    const payload = {
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: question },
      ],
      temperature: 0.2,
    };

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Errore OpenAI:", res.status, text);
      return NextResponse.json(
        { error: "Errore nel chatbot AI" },
        { status: 500 }
      );
    }

    const data = await res.json() as any;

    const answer =
      data.choices?.[0]?.message?.content?.toString().trim() ??
      "Al momento non riesco a rispondere, riprova tra poco.";

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("❌ Errore generico nel chatbot AI:", error);
    return NextResponse.json(
      { error: "Errore nel chatbot AI" },
      { status: 500 }
    );
  }
}
