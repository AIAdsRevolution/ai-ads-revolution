import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const product = String(body?.product ?? "Prodotto/Servizio");
    const target = String(body?.target ?? "Pubblico generale");
    const offer = String(body?.offer ?? "Offerta");
    const platform = String(body?.platform ?? "YouTube Shorts");

    const script = {
      platform,
      duration_seconds: 20,
      hook_0_3s: [
        `Se sei ${target}, questa cosa ti cambia la giornata.`,
        `Stop. Prima di scorrere: guarda questo.`,
        `Errore comune che ti costa tempo/denaro:`
      ],
      scenes: [
        { t: "0-3s",  visual: "Cut rapidissimo, close-up, testo grande.", on_screen_text: "STOP: 1 cosa che devi sapere", voiceover: `Se sei ${target}, ascolta:` },
        { t: "3-8s",  visual: "Problema con esempio concreto.",              on_screen_text: "Il problema (in 5 sec)",        voiceover: "Ecco cosa succede di solito e perché ti blocca." },
        { t: "8-14s", visual: "Soluzione: mostra il prodotto in azione.",     on_screen_text: `${product} → soluzione`,         voiceover: `La soluzione è ${product}: semplice, veloce, concreto.` },
        { t: "14-18s",visual: "Prima/dopo, mini-demo, risultato.",           on_screen_text: "Risultato reale",                voiceover: "Risultato: meno stress, più controllo, più velocità." },
        { t: "18-20s",visual: "CTA + offerta",                               on_screen_text: offer,                             voiceover: `Se vuoi provarlo: ${offer}.` }
      ],
      captions_style: { font: "Bold", max_words_per_line: 4, pacing: "fast", safe_zone: "platform safe margins" }
    };

    return NextResponse.json({ ok: true, script });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}
