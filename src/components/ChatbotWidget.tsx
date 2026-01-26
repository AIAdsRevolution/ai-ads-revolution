"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Msg = { role: "assistant" | "user"; content: string };

const QUICK_ACTIONS: { label: string; message: string }[] = [
  { label: "Richiedi demo", message: "Vorrei una demo. Come funziona?" },
  { label: "Collega Google Ads", message: "Come collego Google Ads passo-passo?" },
  { label: "Riepilogo 28 giorni", message: "Google Ads summary ultimi 28 giorni" },
];

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Ciao 👋 Sono l’assistente AI Ads Revolution.\nVuoi una demo, info su Google Ads o supporto tecnico?",
    },
  ]);

  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const scrollerRef = useRef<HTMLDivElement>(null);

  const emailOk = useMemo(() => (email.trim() ? isValidEmail(email) : true), [email]);
  const canSend = useMemo(() => input.trim().length > 0 && !busy, [input, busy]);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => {
      scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" });
    }, 50);
  }, [open, messages.length]);

  async function callApi(userMessage: string) {
    const payload = {
      message: email.trim()
        ? `${userMessage}\n\n[LEAD_EMAIL]: ${email.trim()}`
        : userMessage,
    };

    const res = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data) {
      return { ok: false, reply: "Errore di rete. Riprova tra poco." };
    }
    if (data.ok === false) {
      return {
        ok: false,
        reply:
          "Servizio AI momentaneamente non disponibile. Se vuoi, lascia la tua email e ti contattiamo per una demo.",
      };
    }
    return { ok: true, reply: String(data.reply || "").trim() || "Ok." };
  }

  async function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || busy) return;

    // Se l'utente ha scritto l'email nel campo, validiamola
    setEmailTouched(true);
    if (!emailOk) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "L’email sembra non valida. Puoi ricontrollarla?" },
      ]);
      return;
    }

    setInput("");
    setBusy(true);

    setMessages((m) => [...m, { role: "user", content: msg }]);

    // salva lead se email valida (opzionale)
    if (email.trim() && emailOk) {
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: typeof window !== "undefined" ? window.location.pathname : "",

          email: email.trim(),
          message: msg,
          source: typeof window !== "undefined" ? window.location.pathname : ""
        }),
      }).catch(() => {});
    }

// salva lead se email valida (opzionale)
    if (email.trim() && emailOk) {
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: typeof window !== "undefined" ? window.location.pathname : "",

          email: email.trim(),
          message: msg,
          source: typeof window !== "undefined" ? window.location.pathname : ""
        }),
      }).catch(() => {});
    }

const r = await callApi(msg);

    setMessages((m) => [...m, { role: "assistant", content: r.reply }]);
    setBusy(false);
  }

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Apri chat assistenza"
        style={{
          position: "fixed",
          right: 18,
          bottom: 18,
          width: 56,
          height: 56,
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,.14)",
          background:
            "radial-gradient(120px 120px at 30% 30%, rgba(120,170,255,.55), rgba(20,30,60,.95))",
          boxShadow: "0 20px 60px rgba(0,0,0,.45)",
          color: "white",
          fontWeight: 800,
          zIndex: 9999,
        }}
      >
        🙂
      </button>

      {/* Panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            right: 18,
            bottom: 86,
            width: 380,
            maxWidth: "calc(100vw - 36px)",
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,.12)",
            background: "rgba(10,14,26,.92)",
            backdropFilter: "blur(14px)",
            boxShadow: "0 24px 90px rgba(0,0,0,.55)",
            overflow: "hidden",
            zIndex: 9999,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "12px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
              borderBottom: "1px solid rgba(255,255,255,.10)",
              background: "rgba(255,255,255,.03)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  background: "rgba(255,140,60,.95)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                }}
              >
                AI
              </div>
              <div style={{ lineHeight: 1.1 }}>
                <div style={{ fontWeight: 900 }}>Assistenza</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>AI Ads Revolution</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Chiudi"
              style={{
                width: 34,
                height: 34,
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,.14)",
                background: "rgba(255,255,255,.04)",
                color: "white",
                fontWeight: 900,
              }}
            >
              ✕
            </button>
          </div>

          {/* Quick actions */}
          <div style={{ padding: 12, display: "grid", gap: 8 }}>
            {QUICK_ACTIONS.map((a) => (
              <button
                key={a.label}
                onClick={() => send(a.message)}
                style={{
                  textAlign: "left",
                  padding: "10px 12px",
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,.12)",
                  background: "rgba(255,255,255,.04)",
                  color: "rgba(255,255,255,.92)",
                  fontWeight: 800,
                }}
              >
                {a.label}
                <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 600, marginTop: 2 }}>
                  {a.message}
                </div>
              </button>
            ))}
          </div>

          {/* Email field */}
          <div style={{ padding: "0 12px 12px 12px" }}>
            <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 6 }}>
              Email (opzionale) per demo/contatto:
            </div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              placeholder="nome@azienda.com"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 14,
                border: `1px solid ${
                  !emailOk && emailTouched ? "rgba(255,80,80,.65)" : "rgba(255,255,255,.12)"
                }`,
                background: "rgba(0,0,0,.18)",
                color: "white",
                outline: "none",
              }}
            />
            {!emailOk && emailTouched && (
              <div style={{ color: "rgba(255,120,120,.95)", fontSize: 12, marginTop: 6 }}>
                Email non valida.
              </div>
            )}
          </div>

          {/* Messages */}
          <div
            ref={scrollerRef}
            style={{
              padding: "0 12px 12px 12px",
              maxHeight: 260,
              overflow: "auto",
              display: "grid",
              gap: 10,
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  justifySelf: m.role === "user" ? "end" : "start",
                  maxWidth: "92%",
                  padding: "10px 12px",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,.10)",
                  background: m.role === "user" ? "rgba(120,170,255,.18)" : "rgba(255,255,255,.05)",
                  color: "rgba(255,255,255,.92)",
                  whiteSpace: "pre-wrap",
                  fontSize: 13,
                  lineHeight: 1.45,
                }}
              >
                {m.content}
              </div>
            ))}
            {busy && (
              <div
                style={{
                  justifySelf: "start",
                  maxWidth: "92%",
                  padding: "10px 12px",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,.10)",
                  background: "rgba(255,255,255,.05)",
                  color: "rgba(255,255,255,.78)",
                  fontSize: 13,
                }}
              >
                Sto analizzando…
              </div>
            )}
          </div>

          {/* Input */}
          <div
            style={{
              padding: 12,
              borderTop: "1px solid rgba(255,255,255,.10)",
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Scrivi un messaggio…"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,.12)",
                background: "rgba(0,0,0,.18)",
                color: "white",
                outline: "none",
              }}
            />
            <button
              onClick={() => send()}
              disabled={!canSend || (!emailOk && emailTouched)}
              style={{
                padding: "10px 14px",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,.12)",
                background:
                  "linear-gradient(180deg, rgba(120,170,255,0.95) 0%, rgba(80,120,255,0.85) 100%)",
                color: "white",
                fontWeight: 900,
                opacity: !canSend || (!emailOk && emailTouched) ? 0.5 : 1,
                cursor: !canSend ? "not-allowed" : "pointer",
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
