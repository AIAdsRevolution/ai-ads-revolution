"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; text: string };

export default function AARChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Ciao! Sono l’assistente AI di AI Ads Revolution. Come posso aiutarti?" },
  ]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [open, messages.length, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setLoading(true);

    try {
      // endpoint consigliato: src/app/api/chat/route.ts
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Errore server");
      }

      const data = (await res.json()) as { reply?: string };
      const reply = data?.reply || "Ok. (Risposta vuota dal server)";

      setMessages((m) => [...m, { role: "assistant", text: reply }]);
    } catch (e: any) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text:
            "⚠️ Chat non disponibile in questo momento. " +
            "Se vuoi, dimmi cosa ti serve e ti aiuto lo stesso dalla piattaforma.",
        },
      ]);
      // opzionale: console
      console.error("ChatWidget error:", e?.message || e);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") send();
  }

  return (
    <>
      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Apri chat"
        style={{
          position: "fixed",
          right: 18,
          bottom: 18,
          zIndex: 9999,
          borderRadius: 999,
          padding: "12px 14px",
          border: "1px solid rgba(255,255,255,0.18)",
          background: "rgba(11,15,26,0.92)",
          color: "white",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          cursor: "pointer",
          fontWeight: 700,
        }}
      >
        {open ? "✕" : "💬 Chat"}
      </button>

      {/* Panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            right: 18,
            bottom: 74,
            width: 360,
            maxWidth: "calc(100vw - 36px)",
            height: 520,
            maxHeight: "calc(100vh - 120px)",
            zIndex: 9999,
            borderRadius: 18,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(11,15,26,0.96)",
            color: "white",
            boxShadow: "0 18px 48px rgba(0,0,0,0.45)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "12px 14px",
              borderBottom: "1px solid rgba(255,255,255,0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
              <div style={{ fontWeight: 800 }}>AI Ads Revolution</div>
              <div style={{ opacity: 0.75, fontSize: 12 }}>
                Assistente AI {loading ? "• sta scrivendo…" : ""}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "transparent",
                color: "white",
                padding: "6px 10px",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Chiudi
            </button>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            style={{
              padding: 12,
              overflowY: "auto",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.map((m, idx) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: isUser ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "85%",
                      padding: "10px 12px",
                      borderRadius: 14,
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: isUser ? "rgba(10,132,255,0.22)" : "rgba(255,255,255,0.06)",
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.35,
                      fontSize: 14,
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div
            style={{
              padding: 12,
              borderTop: "1px solid rgba(255,255,255,0.10)",
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Scrivi un messaggio…"
              style={{
                flex: 1,
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.06)",
                color: "white",
                padding: "10px 12px",
                outline: "none",
              }}
            />
            <button
              type="button"
              onClick={send}
              disabled={!canSend}
              style={{
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.14)",
                background: canSend ? "rgba(10,132,255,0.85)" : "rgba(255,255,255,0.10)",
                color: "white",
                padding: "10px 12px",
                cursor: canSend ? "pointer" : "not-allowed",
                fontWeight: 800,
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

