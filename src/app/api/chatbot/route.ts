import { NextResponse } from "next/server";

async function fetchGoogleAdsSummary(baseUrl: string) {
  const r = await fetch(`${baseUrl}/api/googleads/summary`, { cache: "no-store" });
  const j = await r.json().catch(() => null);
  return { ok: r.ok, status: r.status, json: j };
}


export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

  // GOOGLE ADS SUMMARY (AUTO_V2): risposta reale se l'utente chiede metriche/campagne
  try {
    const url = new URL(req.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    const userMsg =
      (typeof (body as any)?.message === "string" ? (body as any).message :
      typeof (body as any)?.text === "string" ? (body as any).text :
      typeof (body as any)?.prompt === "string" ? (body as any).prompt :
      "") || "";

    const q = userMsg.toLowerCase();
    const wantsAds = ["google ads","googleads","campagne","campaign","metriche","performance","riepilogo","summary"].some(k => q.includes(k));

    if (wantsAds) {
      const res = await fetchGoogleAdsSummary(baseUrl);

      if (res.ok && res.json?.ok) {
        const sum = res.json;

        const top = (sum.campaigns || []).slice(0, 5).map((c: any) =>
          `• ${c.name} (${c.status}) — imp ${c.impressions}, click ${c.clicks}, costo €${Number(c.costEUR ?? 0).toFixed(2)}`
        ).join("\n");

        const issues = (sum.diagnostics?.issues || []).map((x: string) => `• ${x}`).join("\n");

        const reply =
`📊 Google Ads (ultimi ${sum.range?.days ?? 28} giorni)
Totali: impression ${sum.totals?.impressions ?? 0}, click ${sum.totals?.clicks ?? 0}, costo €${Number(sum.totals?.costEUR ?? 0).toFixed(2)}

Campagne (${sum.campaignsCount ?? 0}):
${top || "• Nessuna campagna trovata"}

${issues ? "⚠️ Note:\n" + issues : ""}`;

        return new Response(JSON.stringify({ reply }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({
        reply: `⚠️ Non riesco ancora a leggere Google Ads (status ${res.status}).`,
        debug: res.json
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch {}
  const {message} = body;

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { reply: "Configurazione AI non disponibile." },
        { status: 500 }
      );
    }

    const model = process.env.OPENAI_MODEL || "gpt-4o";

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content:
              "Sei il chatbot ufficiale di AI Ads Revolution. Rispondi in modo chiaro, professionale e orientato al business su piani, prezzi, campagne advertising e funzionamento della piattaforma.",
          },
          {
            role: "user",
            content: String(message || ""),
          },
        ],
        temperature: 0.4,
        max_tokens: 500,
      }),
    });

    if (!openaiRes.ok) {
      console.error("[CHATBOT] OpenAI error:", openaiRes.status);
      return NextResponse.json(
        { reply: "Errore temporaneo del servizio AI. Riprova tra poco." },
        { status: 500 }
      );
    }

    const data = await openaiRes.json();
    const reply =
      data?.choices?.[0]?.message?.content ||
      "Al momento non riesco a rispondere. Riprova tra poco.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[CHATBOT] Errore generale:", err);
    return NextResponse.json(
      { reply: "Errore interno del chatbot. Riprova tra poco." },
      { status: 500 }
    );
  }
}
