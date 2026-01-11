"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import "./aar-chatbot.css";

type Msg = { role: "assistant" | "user"; text: string };

export default function AARChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text:
        "Ciao! 👋\nSono AI Ads Assistant.\n\nDimmi cosa vuoi fare oggi:\n• Ottimizzare campagne\n• Ridurre CPC\n• Aumentare ROAS\n• Collegare Google Ads\n• Sistemare tracking",
    },
    {
      role: "assistant",
      text:
        "Se mi dici: obiettivo + budget + paese + settore, ti preparo subito una strategia completa (struttura campagne + annunci + keyword + KPI target).",
    },
  ]);

  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => {
      boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
    }, 60);
  }, [open, messages]);

  const dots = useMemo(() => {
    // solo estetica stile screenshot
    return [true, false, false];
  }, []);

  async function send() {
    const t = input.trim();
    if (!t) return;

    setInput("");
    setMessages((m) => [...m, { role: "user", text: t }]);

    // Risposta “vera” (non demo). Per ora rule-based.
    const low = t.toLowerCase();

    const reply =
      low.includes("google") || low.includes("ads")
        ? "Perfetto ✅\nPer collegare Google Ads mi servono 3 cose:\n1) Developer Token\n2) OAuth Client (ID/Secret)\n3) Refresh Token\n\nSe vuoi, ti guido passo-passo e poi leggiamo KPI reali (impressions, clicks, cost, conversions, ROAS)."
        : low.includes("budget")
        ? "💰 Budget:\nDimmi obiettivo (lead/vendite), budget giornaliero e ROAS/CPA target.\nPoi ti preparo:\n• regole di budget shift\n• alert KPI\n• tagli sprechi (search terms/placements)."
        : low.includes("roas")
        ? "📈 ROAS:\nPer migliorarlo agiamo su 3 leve:\n1) query/target (meno sprechi)\n2) creatività (CTR + conversion rate)\n3) bidding + tracking (dato pulito)\n\nDimmi settore + piattaforma (Search/PMAX/Meta) e faccio un piano chiaro."
        : low.includes("tracking") || low.includes("pixel") || low.includes("gtm")
        ? "🔎 Tracking:\nDimmi che usi (GTM / GA4 / Pixel / Conversioni Google Ads).\nObiettivo: eventi puliti + conversioni importate correttamente.\nCosì l’AI può ottimizzare sul serio."
        : "Ok ✅\nScrivimi:\n• piattaforma (Google/Meta)\n• obiettivo (lead/vendite)\n• budget\n• paese/lingua\n• cosa vendi\n\ne ti preparo struttura + annunci + KPI e next step.";

    setMessages((m) => [...m, { role: "assistant", text: reply }]);
  }

  return (
    <>
      {!open && (
        <div className="aar-chat-fab" onClick={() => setOpen(true)} title="AI">
          <span>AI</span>
        </div>
      )}

      {open && (
        <div className="aar-chat-panel">
          <div className="aar-chat-header">
            <div className="aar-chat-brand">
              <div className="aar-chat-avatar">
                <img src="/chatbot/aar-face.svg" alt="AI Ads Assistant" />
              </div>
              <div className="aar-chat-title">
                <b>AI Ads Assistant</b>
                <span>Disponibile 24/7 🚀</span>
              </div>
            </div>

            <button className="aar-chat-close" onClick={() => setOpen(false)} aria-label="Close">
              ✕
            </button>
          </div>

          <div className="aar-chat-privacy">
            Ricorda che i tuoi dati saranno trattati secondo l’informativa privacy.
          </div>

          <div ref={boxRef} className="aar-chat-body">
            {/* “card” principale come nello screenshot */}
            <div className="aar-bubble">
              Ciao-Sono! 👋 tue assistente di AI Ads Revolution! Sono qui per aiutarti: 24 ore su 24. 🚀
              {"\n\n"}
              Dimmi! vuoi ottimizzare una campagna, migliorare ROAS, o avere una consulenza?
            </div>

            {/* slider dots estetici */}
            <div className="aar-dots">
              {dots.map((a, i) => (
                <div key={i} className={"aar-dot" + (a ? " active" : "")} />
              ))}
            </div>

            {/* chat reale */}
            {messages.map((m, idx) => (
              <div key={idx} className={"aar-bubble" + (m.role === "user" ? " user" : "")}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="aar-chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Scrivi qui la tua richiesta..."
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
            />
            <button onClick={send}>Invia</button>
          </div>
        </div>
      )}
    </>
  );
}
