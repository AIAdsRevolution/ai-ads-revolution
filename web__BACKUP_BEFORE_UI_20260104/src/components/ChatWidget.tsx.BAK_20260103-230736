"use client";
import React, { useEffect, useRef, useState } from "react";

type Msg = { role: "assistant" | "user"; text: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text:
        "Ciao 👋 sono l’assistente AI Ads Revolution, disponibile 24/7.\n\nDimmi cosa vuoi fare:\n• Campagne\n• Budget\n• Creatività\n• Collegamento Google Ads",
    },
  ]);

  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    setTimeout(() => {
      boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
    }, 50);
  }, [open, messages]);

  function replyFor(t: string) {
    const x = t.toLowerCase();
    if (x.includes("google") || x.includes("ads"))
      return "✅ Per collegare Google Ads: Developer Token + OAuth + Refresh Token. Quando vuoi lo rendiamo LIVE e leggiamo KPI reali.";
    if (x.includes("budget"))
      return "💰 Budget: dimmi obiettivo (lead/vendite) e budget giornaliero. Ti preparo regole (ROAS/CPA) per spostamento automatico.";
    if (x.includes("creativ"))
      return "🎨 Creatività: dimmi settore + offerta + target. Ti preparo 5 annunci pronti e varianti A/B.";
    return "Perfetto 👍 dimmi obiettivo e canale (Search/Display/PMAX) e ti guido passo-passo.";
  }

  function send() {
    const t = input.trim();
    if (!t) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: t }]);
    const r = replyFor(t);
    setTimeout(() => setMessages((m) => [...m, { role: "assistant", text: r }]), 350);
  }

  const z = 2147483647;

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            right: 22,
            bottom: 22,
            width: 64,
            height: 64,
            borderRadius: 999,
            background: "linear-gradient(135deg,#2d6cff,#7b61ff)",
            border: "1px solid rgba(255,255,255,.18)",
            color: "#fff",
            fontWeight: 900,
            cursor: "pointer",
            zIndex: z,
            pointerEvents: "auto",
            boxShadow: "0 18px 50px rgba(0,0,0,.55)",
          }}
        >
          AI
        </button>
      )}

      {open && (
        <div
          style={{
            position: "fixed",
            right: 18,
            bottom: 18,
            width: 390,
            maxWidth: "calc(100vw - 36px)",
            height: 540,
            maxHeight: "calc(100vh - 36px)",
            background: "rgba(18,22,30,.95)",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,.15)",
            zIndex: z,
            pointerEvents: "auto",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 22px 70px rgba(0,0,0,.6)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              padding: 12,
              borderBottom: "1px solid rgba(255,255,255,.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#fff",
            }}
          >
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  background: "linear-gradient(135deg,#2d6cff,#ff4fd8)",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 900,
                }}
              >
                AI
              </div>
              <div>
                <div style={{ fontWeight: 900 }}>AI Ads Assistant</div>
                <div style={{ opacity: 0.7, fontSize: 12 }}>Disponibile 24/7 🚀</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.15)",
                color: "#fff",
                borderRadius: 10,
                padding: "6px 10px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>

          <div
            ref={boxRef}
            style={{
              flex: 1,
              padding: 12,
              overflowY: "auto",
              color: "#fff",
              fontSize: 14,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "86%",
                  background:
                    m.role === "user"
                      ? "linear-gradient(135deg,#2d6cff,#7b61ff)"
                      : "rgba(255,255,255,.08)",
                  border: "1px solid rgba(255,255,255,.15)",
                  borderRadius: 14,
                  padding: "10px 12px",
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.25,
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,.15)" }}>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Scrivi qui la tua richiesta…"
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,.08)",
                  border: "1px solid rgba(255,255,255,.15)",
                  borderRadius: 12,
                  padding: "10px 12px",
                  outline: "none",
                  color: "#fff",
                }}
              />
              <button
                type="button"
                onClick={send}
                style={{
                  background: "linear-gradient(135deg,#2d6cff,#7b61ff)",
                  border: 0,
                  borderRadius: 12,
                  padding: "10px 14px",
                  color: "#fff",
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                Invia
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
