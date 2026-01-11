"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Msg = { role: "assistant" | "user"; text: string };

function FaceIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="28" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" />
      <circle cx="24" cy="28" r="3.2" fill="rgba(255,255,255,0.88)" />
      <circle cx="40" cy="28" r="3.2" fill="rgba(255,255,255,0.88)" />
      <path d="M22 40c3 4 7 6 10 6s7-2 10-6" stroke="rgba(255,255,255,0.82)" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="32" cy="32" r="29" stroke="url(#g)" strokeWidth="3" opacity="0.9"/>
      <defs>
        <linearGradient id="g" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF3B30"/>
          <stop offset="0.33" stopColor="#FF2D95"/>
          <stop offset="0.66" stopColor="#7B61FF"/>
          <stop offset="1" stopColor="#2D6CFF"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text:
        "Ciao 👋 sono AI Ads Assistant, disponibile 24/7 🚀\n\n" +
        "Scrivimi qualsiasi cosa su campagne, budget, creatività, ROAS/CPA e collegamento Google Ads.",
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

  const s = useMemo(() => {
    return {
      panelBg: "rgba(13, 16, 22, 0.92)",
      border: "rgba(255,255,255,0.12)",
      soft: "rgba(255,255,255,0.06)",
      text: "rgba(255,255,255,0.92)",
      sub: "rgba(255,255,255,0.68)",
      blue: "#2D6CFF",
      violet: "#7B61FF",
      shadow: "0 26px 80px rgba(0,0,0,0.65)",
    };
  }, []);

  async function askAI(userText: string) {
    // Prova /api/chat (se c’è e risponde). Se non c’è, fallback demo.
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, context: { source: "widget" } }),
      });
      if (!res.ok) throw new Error("api chat not ok");
      const data = await res.json();
      const text = data?.text || data?.reply || data?.message || "";
      if (text) return text;
      throw new Error("empty");
    } catch {
      const t = userText.toLowerCase();
      if (t.includes("google") || t.includes("ads") || t.includes("token")) {
        return "✅ Collegamento Google Ads: Developer Token + OAuth + Refresh Token. Quando vuoi lo rendiamo LIVE e leggiamo KPI reali (campagne, ROAS, CPA) direttamente in dashboard.";
      }
      if (t.includes("budget") || t.includes("spesa") || t.includes("cpc")) {
        return "💰 Budget: dimmi obiettivo (lead/vendite), budget giornaliero e target (CPA/ROAS). Ti preparo regole automatiche di budget shift e alert KPI.";
      }
      if (t.includes("creativ") || t.includes("annunci") || t.includes("copy")) {
        return "🎨 Creatività: dimmi settore + offerta + target. Ti preparo 5 varianti copy + headline + CTA e una matrice A/B test.";
      }
      return "Perfetto. Dimmi cosa vuoi ottimizzare: ROAS, CPA, creatività o collegamento Google Ads?";
    }
  }

  async function send(text?: string) {
    const t = (text ?? input).trim();
    if (!t || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: t }]);
    setLoading(true);
    const reply = await askAI(t);
    setMessages((m) => [...m, { role: "assistant", text: reply }]);
    setLoading(false);
  }

  function Quick({ label, value }: { label: string; value: string }) {
    return (
      <button
        onClick={() => send(value)}
        style={{
          padding: "10px 12px",
          borderRadius: 12,
          border: `1px solid ${s.border}`,
          background: "rgba(255,255,255,0.05)",
          color: s.text,
          fontWeight: 650,
          cursor: "pointer",
        }}
      >
        {label}
      </button>
    );
  }

  return (
    <>
      {/* Floating Avatar Button (UNO SOLO) */}
      {!open && (
        <button
          aria-label="Apri chat"
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            right: 22,
            bottom: 22,
            width: 64,
            height: 64,
            borderRadius: 999,
            border: `1px solid ${s.border}`,
            background: `linear-gradient(135deg, ${s.blue}, ${s.violet})`,
            boxShadow: s.shadow,
            zIndex: 99999,
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
          }}
        >
          <FaceIcon size={34} />
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            right: 16,
            bottom: 16,
            width: 420,
            maxWidth: "calc(100vw - 32px)",
            height: 560,
            maxHeight: "calc(100vh - 32px)",
            background: s.panelBg,
            border: `1px solid ${s.border}`,
            borderRadius: 18,
            zIndex: 99999,
            overflow: "hidden",
            boxShadow: s.shadow,
            backdropFilter: "blur(14px)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 12px",
              borderBottom: `1px solid ${s.border}`,
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 999,
                  display: "grid",
                  placeItems: "center",
                  background: `linear-gradient(135deg, ${s.blue}, ${s.violet})`,
                  border: `1px solid ${s.border}`,
                }}
              >
                <FaceIcon size={22} />
              </div>
              <div style={{ lineHeight: 1.1 }}>
                <div style={{ color: s.text, fontWeight: 800 }}>AI Ads Assistant</div>
                <div style={{ color: s.sub, fontSize: 12 }}>Disponibile 24 ore su 24 🚀</div>
              </div>
            </div>

            <button
              aria-label="Chiudi chat"
              onClick={() => setOpen(false)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                border: `1px solid ${s.border}`,
                background: "rgba(255,255,255,0.04)",
                color: s.text,
                cursor: "pointer",
                fontSize: 18,
              }}
            >
              ×
            </button>
          </div>

          {/* Privacy line */}
          <div style={{ padding: "10px 12px", color: s.sub, fontSize: 12, borderBottom: `1px solid ${s.border}` }}>
            Ricorda che i tuoi dati saranno trattati secondo l’informativa privacy.
          </div>

          {/* Messages */}
          <div
            ref={boxRef}
            style={{
              height: "calc(100% - 58px - 44px - 120px)",
              overflowY: "auto",
              padding: 12,
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    maxWidth: "88%",
                    padding: "10px 12px",
                    borderRadius: 14,
                    border: `1px solid ${s.border}`,
                    background: m.role === "user" ? "rgba(45,108,255,0.18)" : "rgba(255,255,255,0.05)",
                    color: s.text,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ color: s.sub, fontSize: 12, paddingLeft: 4 }}>Sto scrivendo…</div>
            )}
          </div>

          {/* Quick actions (stile Sky) */}
          <div style={{ padding: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Quick label="Collegare Google Ads" value="Voglio collegare Google Ads e vedere KPI reali in dashboard." />
            <Quick label="Ottimizzare Budget" value="Aiutami a ottimizzare budget e CPA/ROAS." />
            <Quick label="Creare Creatività" value="Genera annunci e creatività per la mia campagna." />
            <Quick label="Vedere KPI / ROAS" value="Fammi vedere KPI e spiegami dove sto perdendo soldi." />
          </div>

          {/* Input */}
          <div
            style={{
              padding: 12,
              borderTop: `1px solid ${s.border}`,
              display: "flex",
              gap: 10,
              background: "rgba(0,0,0,0.18)",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              placeholder="Scrivi qui il tuo messaggio…"
              style={{
                flex: 1,
                height: 44,
                borderRadius: 12,
                border: `1px solid ${s.border}`,
                background: "rgba(255,255,255,0.04)",
                color: s.text,
                padding: "0 12px",
                outline: "none",
              }}
            />
            <button
              onClick={() => send()}
              style={{
                height: 44,
                padding: "0 16px",
                borderRadius: 12,
                border: `1px solid ${s.border}`,
                background: `linear-gradient(135deg, ${s.blue}, ${s.violet})`,
                color: "white",
                fontWeight: 800,
                cursor: "pointer",
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
