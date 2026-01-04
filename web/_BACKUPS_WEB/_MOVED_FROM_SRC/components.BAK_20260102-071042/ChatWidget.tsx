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
        "Ciao 👋 sono l’assistente AI Ads Revolution, disponibile 24/7.\n\nPosso aiutarti su:\n• Campagne\n• Budget\n• Creatività\n• Collegamento Google Ads",
    },
  ]);

  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
      }, 50);
    }
  }, [open, messages]);

  function send() {
    const t = input.trim();
    if (!t) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: t }]);

    const lower = t.toLowerCase();
    const reply =
      lower.includes("google") || lower.includes("ads")
        ? "✅ Collegamento Google Ads: Developer Token + OAuth + Refresh Token. Quando vuoi lo rendiamo LIVE."
        : lower.includes("budget")
        ? "💰 Posso impostare regole automatiche di budget shift (ROAS/CPA/scaling). Dimmi obiettivo e budget."
        : lower.includes("creativ")
        ? "🎨 Posso generare varianti creative e A/B test. Dimmi settore e offerta."
        : "Perfetto 👍 dimmi cosa vuoi ottenere e ti guido passo-passo.";

    setTimeout(() => setMessages((m) => [...m, { role: "assistant", text: reply }]), 450);
  }

  return (
    <>
      {/* BTN FLOAT (cliccabile SEMPRE) */}
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
            zIndex: 2147483647,
            pointerEvents: "auto",
            boxShadow: "0 18px 50px rgba(0,0,0,.55)",
          }}
        >
          AI
        </button>
      )}

      {/* PANEL */}
      {open && (
        <div
          style={{
            position: "fixed",
            right: 18,
            bottom: 18,
            width: 380,
            maxWidth: "calc(100vw - 36px)",
            height: 520,
            maxHeight: "calc(100vh - 36px)",
            background: "rgba(18,22,30,.95)",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,.15)",
            zIndex: 2147483647,
            pointerEvents: "auto",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 22px 70px rgba(0,0,0,.6)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Header */}
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
            <div>
              <div style={{ fontWeight: 900 }}>Assistente Virtuale</div>
              <div style={{ opacity: 0.7, fontSize: 12 }}>Disponibile 24/7 🚀</div>
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

          {/* Messages */}
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

          {/* Input */}
          <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,.15)" }}>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Scrivi qui…"
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
