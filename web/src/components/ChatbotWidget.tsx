"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Msg = { from: "user" | "bot"; text: string };

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "Ciao 👋 Sono l’assistente AI Ads Revolution. Come posso aiutarti?" },
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => listRef.current?.scrollTo({ top: 999999, behavior: "smooth" }), 50);
  }, [open, messages.length]);

  const quickLinks = useMemo(
    () => [
      { title: "Piani e prezzi", subtitle: "Scopri i pacchetti", action: () => pushBot("Vuoi vedere i piani e prezzi?") },
      { title: "Come funziona", subtitle: "Guida rapida", action: () => pushBot("Ti spiego come funziona AI Ads Revolution.") },
      { title: "Supporto tecnico", subtitle: "Problemi e soluzioni", action: () => pushBot("Dimmi che problema hai e lo risolviamo.") },
    ],
    []
  );

  function pushBot(text: string) {
    setMessages((prev) => [...prev, { from: "bot", text }]);
    if (!open) setOpen(true);
  }

  function send() {
    const v = input.trim();
    if (!v) return;
    setMessages((prev) => [...prev, { from: "user", text: v }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text:
            "Ricevuto ✅. Collegami l’AI e ti rispondo in tempo reale (API). Intanto dimmi: vuoi piani, campagne o integrazione Google Ads?",
        },
      ]);
    }, 450);
  }

  return (
    <>
      <button
        aria-label="Apri chat assistenza"
        onClick={() => setOpen((v) => !v)}
        style={{
          position: "fixed",
          right: 22,
          bottom: 22,
          width: 64,
          height: 64,
          borderRadius: 999,
          border: "none",
          cursor: "pointer",
          zIndex: 999999,
          padding: 0,
          background: "transparent",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 999,
            padding: 4,
            background:
              "conic-gradient(from 180deg, #ff4d4d, #ff7a18, #ffdd00, #8fff6a, #2dd4ff, #6366f1, #a855f7, #ff4d4d)",
            boxShadow: "0 18px 45px rgba(0,0,0,.25)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 999,
              background: "#ffffff",
              display: "grid",
              placeItems: "center",
              border: "1px solid rgba(15,23,42,.08)",
            }}
          >
            <svg width="34" height="34" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <circle cx="32" cy="32" r="26" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
              <circle cx="24" cy="28" r="3.4" fill="#0F172A" />
              <circle cx="40" cy="28" r="3.4" fill="#0F172A" />
              <path
                d="M22 40c3.2 4 7 6 10 6s6.8-2 10-6"
                stroke="#0F172A"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            right: 22,
            bottom: 96,
            width: 380,
            height: 540,
            borderRadius: 18,
            background: "#ffffff",
            border: "1px solid rgba(15,23,42,.10)",
            boxShadow: "0 28px 80px rgba(2,6,23,.22)",
            overflow: "hidden",
            zIndex: 999999,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "14px 14px",
              borderBottom: "1px solid rgba(15,23,42,.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background:
                "linear-gradient(90deg, rgba(255,77,77,.12), rgba(99,102,241,.10), rgba(45,212,255,.10))",
            }}
          >
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  background: "linear-gradient(135deg, #ff4d4d, #ff7a18, #6366f1)",
                  display: "grid",
                  placeItems: "center",
                  color: "white",
                  fontWeight: 800,
                  fontFamily: "ui-sans-serif, system-ui",
                  letterSpacing: 0.3,
                }}
              >
                AI
              </div>
              <div style={{ lineHeight: 1.1 }}>
                <div style={{ fontWeight: 800, color: "#0F172A" }}>Assistenza</div>
                <div style={{ fontSize: 12, color: "#475569" }}>AI Ads Revolution</div>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              style={{
                border: "none",
                background: "rgba(15,23,42,.06)",
                borderRadius: 10,
                padding: "8px 10px",
                cursor: "pointer",
                color: "#0F172A",
                fontWeight: 700,
              }}
              aria-label="Chiudi"
              title="Chiudi"
            >
              ✕
            </button>
          </div>

          <div style={{ padding: 12, display: "grid", gap: 10 }}>
            {quickLinks.map((x) => (
              <button
                key={x.title}
                onClick={x.action}
                style={{
                  textAlign: "left",
                  border: "1px solid rgba(15,23,42,.10)",
                  background: "#fff",
                  borderRadius: 14,
                  padding: "12px 12px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 10px 25px rgba(2,6,23,.06)",
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, color: "#0F172A" }}>{x.title}</div>
                  <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>{x.subtitle}</div>
                </div>
                <div style={{ color: "#2563EB", fontWeight: 900, fontSize: 18 }}>›</div>
              </button>
            ))}
          </div>

          <div
            ref={listRef}
            style={{
              flex: 1,
              padding: 12,
              overflowY: "auto",
              background: "linear-gradient(#ffffff, #ffffff, #f8fafc)",
              borderTop: "1px solid rgba(15,23,42,.06)",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: m.from === "user" ? "flex-end" : "flex-start",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    maxWidth: "78%",
                    borderRadius: 16,
                    padding: "10px 12px",
                    fontSize: 14,
                    lineHeight: 1.35,
                    background: m.from === "user" ? "#2563EB" : "#ffffff",
                    color: m.from === "user" ? "#ffffff" : "#0F172A",
                    border:
                      m.from === "user"
                        ? "1px solid rgba(37,99,235,.35)"
                        : "1px solid rgba(15,23,42,.10)",
                    boxShadow: "0 10px 25px rgba(2,6,23,.06)",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: 12,
              borderTop: "1px solid rgba(15,23,42,.08)",
              display: "flex",
              gap: 8,
              background: "#ffffff",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Scrivi un messaggio…"
              style={{
                flex: 1,
                borderRadius: 12,
                border: "1px solid rgba(15,23,42,.14)",
                padding: "12px 12px",
                outline: "none",
                fontSize: 14,
              }}
            />
            <button
              onClick={send}
              style={{
                border: "none",
                borderRadius: 12,
                padding: "0 14px",
                cursor: "pointer",
                background: "linear-gradient(135deg, #2563EB, #6366F1)",
                color: "white",
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
