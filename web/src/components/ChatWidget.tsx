"use client";
import React, { useEffect, useRef, useState } from "react";

type Msg = { role: "assistant" | "user"; text: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text:
        "Ciao, sono **AI Ads Assistant**.\nDisponibile 24 ore su 24 🚀\n\nScrivimi qualsiasi cosa: campagne, budget, creatività, Google Ads, ROAS, problemi account.",
    },
  ]);

  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
    }, 50);
    return () => clearTimeout(t);
  }, [open, messages]);

  async function send(text?: string) {
    const t = (text ?? input).trim();
    if (!t || loading) return;

    setInput("");
    setLoading(true);

    const next = [...messages, { role: "user", text: t }];
    setMessages(next);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Chat API error");

      setMessages((m) => [...m, { role: "assistant", text: data.text || "Ok." }]);
    } catch (e: any) {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "⚠️ Non riesco a collegarmi all’AI ora. Controlla OPENAI_API_KEY (local + Render)." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // STILE “Sky-like” dark, pulito, enterprise
  const panelBg = "rgba(14, 18, 24, 0.92)";
  const border = "rgba(255,255,255,0.12)";
  const soft = "rgba(255,255,255,0.06)";
  const text = "rgba(255,255,255,0.92)";
  const sub = "rgba(255,255,255,0.65)";
  const blue = "#2D6CFF";
  const cyan = "#3EF3FF";

  return (
    <>
      {/* BUBBLE */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Apri AI Ads Assistant"
          style={{
            position: "fixed",
            right: 22,
            bottom: 22,
            width: 64,
            height: 64,
            borderRadius: 999,
            border: `1px solid ${border}`,
            background: `radial-gradient(circle at 30% 30%, ${cyan}, ${blue} 55%, #1b2a55 100%)`,
            boxShadow: "0 18px 50px rgba(0,0,0,0.55)",
            zIndex: 99999,
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 999,
              background: "rgba(255,255,255,0.10)",
              border: `1px solid ${border}`,
              display: "grid",
              placeItems: "center",
              color: "white",
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            
<svg width="40" height="40" viewBox="0 0 64 64" className="mx-auto" aria-hidden="true">
  <circle cx="32" cy="32" r="30" fill="rgba(120,170,255,0.18)" />
  <circle cx="32" cy="34" r="18" fill="url(#faceGradient)" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
  <path d="M14 30c0-12 36-12 36 0" fill="none" stroke="rgba(180,200,255,0.9)" strokeWidth="4" strokeLinecap="round" />
  <rect x="8" y="30" width="6" height="14" rx="3" fill="rgba(120,150,255,0.95)" />
  <rect x="50" y="30" width="6" height="14" rx="3" fill="rgba(120,150,255,0.95)" />
  <path d="M50 44c6 2 6 6 2 8" fill="none" stroke="rgba(160,190,255,0.9)" strokeWidth="2" strokeLinecap="round" />
  <circle cx="26" cy="34" r="2.6" fill="rgba(30,40,90,0.85)" />
  <circle cx="38" cy="34" r="2.6" fill="rgba(30,40,90,0.85)" />
  <path d="M26 42c3 2.5 9 2.5 12 0" stroke="rgba(30,40,90,0.75)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  <defs>
    <radialGradient id="faceGradient" cx="30%" cy="25%" r="75%">
      <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
      <stop offset="45%" stopColor="rgba(170,200,255,0.85)" />
      <stop offset="100%" stopColor="rgba(80,110,255,0.55)" />
    </radialGradient>
  </defs>
</svg>
  
          </div>
        </button>
      )}

      {/* PANEL */}
      {open && (
        <div
          style={{
            position: "fixed",
            right: 18,
            bottom: 18,
            width: 420,
            maxWidth: "calc(100vw - 36px)",
            height: 560,
            maxHeight: "calc(100vh - 36px)",
            background: panelBg,
            border: `1px solid ${border}`,
            borderRadius: 18,
            zIndex: 99999,
            overflow: "hidden",
            boxShadow: "0 22px 70px rgba(0,0,0,0.65)",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px",
              borderBottom: `1px solid ${border}`,
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 999,
                background: `radial-gradient(circle at 30% 30%, ${cyan}, ${blue} 65%, #1b2a55 100%)`,
                border: `1px solid ${border}`,
                display: "grid",
                placeItems: "center",
                color: "white",
                fontWeight: 900,
              }}
              title="AI Ads Assistant"
            >
              
<svg width="40" height="40" viewBox="0 0 64 64" className="mx-auto" aria-hidden="true">
  <circle cx="32" cy="32" r="30" fill="rgba(120,170,255,0.18)" />
  <circle cx="32" cy="34" r="18" fill="url(#faceGradient)" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
  <path d="M14 30c0-12 36-12 36 0" fill="none" stroke="rgba(180,200,255,0.9)" strokeWidth="4" strokeLinecap="round" />
  <rect x="8" y="30" width="6" height="14" rx="3" fill="rgba(120,150,255,0.95)" />
  <rect x="50" y="30" width="6" height="14" rx="3" fill="rgba(120,150,255,0.95)" />
  <path d="M50 44c6 2 6 6 2 8" fill="none" stroke="rgba(160,190,255,0.9)" strokeWidth="2" strokeLinecap="round" />
  <circle cx="26" cy="34" r="2.6" fill="rgba(30,40,90,0.85)" />
  <circle cx="38" cy="34" r="2.6" fill="rgba(30,40,90,0.85)" />
  <path d="M26 42c3 2.5 9 2.5 12 0" stroke="rgba(30,40,90,0.75)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  <defs>
    <radialGradient id="faceGradient" cx="30%" cy="25%" r="75%">
      <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
      <stop offset="45%" stopColor="rgba(170,200,255,0.85)" />
      <stop offset="100%" stopColor="rgba(80,110,255,0.55)" />
    </radialGradient>
  </defs>
</svg>
  
            </div>

            <div style={{ lineHeight: 1.15 }}>
              <div style={{ color: text, fontWeight: 800 }}>AI Ads Assistant</div>
              <div style={{ color: sub, fontSize: 12 }}>Disponibile 24 ore su 24 🚀</div>
            </div>

            <button
              onClick={() => setOpen(false)}
              aria-label="Chiudi"
              style={{
                marginLeft: "auto",
                width: 36,
                height: 36,
                borderRadius: 12,
                border: `1px solid ${border}`,
                background: "rgba(255,255,255,0.03)",
                color: text,
                cursor: "pointer",
                fontSize: 18,
              }}
            >
              ×
            </button>
          </div>

          {/* Privacy line */}
          <div style={{ padding: "10px 14px", color: sub, fontSize: 12, borderBottom: `1px solid ${border}` }}>
            Ricorda che i tuoi dati saranno trattati secondo l’informativa privacy.
          </div>

          {/* Messages */}
          <div
            ref={boxRef}
            style={{
              padding: 14,
              height: 360,
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.map((m, i) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={i}
                  style={{
                    alignSelf: isUser ? "flex-end" : "flex-start",
                    maxWidth: "90%",
                    background: isUser ? `rgba(45,108,255,0.18)` : soft,
                    border: `1px solid ${border}`,
                    borderRadius: 14,
                    padding: "10px 12px",
                    color: text,
                    whiteSpace: "pre-wrap",
                    fontSize: 14,
                  }}
                >
                  {m.text}
                </div>
              );
            })}
            {loading && (
              <div
                style={{
                  alignSelf: "flex-start",
                  maxWidth: "90%",
                  background: soft,
                  border: `1px solid ${border}`,
                  borderRadius: 14,
                  padding: "10px 12px",
                  color: sub,
                  fontSize: 14,
                }}
              >
                Sto pensando…
              </div>
            )}

            {/* Quick actions */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 }}>
              {[
                ["Collegare Google Ads", "Voglio collegare Google Ads e vedere KPI reali (ROAS, CPC, conversioni)."],
                ["Ottimizzare Budget", "Aiutami a impostare regole di budget automatiche (target ROAS/CPA)."],
                ["Creare Creatività", "Genera 5 varianti annunci per il mio settore (dimmi cosa ti serve)."],
                ["Vedere KPI / ROAS", "Mostrami i KPI principali degli ultimi 28 giorni e spiegami cosa migliorare."],
              ].map(([label, payload]) => (
                <button
                  key={label}
                  onClick={() => send(payload)}
                  style={{
                    borderRadius: 999,
                    border: `1px solid ${border}`,
                    background: "rgba(255,255,255,0.03)",
                    color: text,
                    padding: "10px 12px",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div style={{ padding: 12, borderTop: `1px solid ${border}`, display: "flex", gap: 10 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              placeholder="Scrivi qui il tuo messaggio…"
              style={{
                flex: 1,
                borderRadius: 12,
                border: `1px solid ${border}`,
                background: "rgba(255,255,255,0.03)",
                padding: "12px 12px",
                color: text,
                outline: "none",
              }}
            />
            <button
              onClick={() => send()}
              disabled={loading}
              style={{
                borderRadius: 12,
                border: `1px solid ${border}`,
                background: `linear-gradient(135deg, ${blue}, #7B61FF)`,
                padding: "12px 16px",
                color: "white",
                fontWeight: 800,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              Invia
            </button>
          </div>
        </div>
      )}
    </>
  );
}
