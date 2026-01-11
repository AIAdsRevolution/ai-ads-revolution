#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

echo "== Fix: chat widget unico + Sky style + AI Ads Assistant =="

# --- 1) Layout: assicurati che venga renderizzato SOLO ChatWidget (e non ProChatbot)
LAY="src/app/layout.tsx"
cp "$LAY" "$LAY.bak.$(date +%Y%m%d-%H%M%S)" || true

# rimuovi eventuali ProChatbot dal layout (se presente)
perl -0777 -i -pe 's/\s*<ProChatbot\s*\/>\s*//g' "$LAY" || true

# importa ChatWidget UNA volta
if ! grep -q 'import ChatWidget from' "$LAY"; then
  perl -0777 -i -pe 's/(import[^\n]*\n)/$1import ChatWidget from "@\/components\/ChatWidget";\n/s' "$LAY"
fi

# inserisci <ChatWidget /> prima di </body> se manca
if ! grep -q "<ChatWidget" "$LAY"; then
  perl -0777 -i -pe 's/(<\/body>)/  <ChatWidget \/>\n$1/s' "$LAY"
fi

# elimina doppioni di <ChatWidget />
python - <<'PY'
import re, pathlib
p=pathlib.Path("src/app/layout.tsx")
s=p.read_text()
# tieni solo il primo <ChatWidget />
parts=s.split("<ChatWidget />")
if len(parts)>2:
    s=parts[0]+"<ChatWidget />"+"".join(parts[2:])
p.write_text(s)
PY

# --- 2) ChatWidget: stile Sky + avatar headset + chiamata API reale
cp src/components/ChatWidget.tsx src/components/ChatWidget.tsx.bak.$(date +%Y%m%d-%H%M%S) 2>/dev/null || true

cat > src/components/ChatWidget.tsx <<'TSX'
"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Msg = { role: "assistant" | "user"; text: string };

function HeadsetFace() {
  return (
    <svg width="28" height="28" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="g" x1="8" y1="8" x2="56" y2="56">
          <stop stopColor="#2D6CFF" />
          <stop offset="1" stopColor="#7B61FF" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="34" r="18" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.18)" />
      <path d="M16 34c0-10 7-18 16-18s16 8 16 18" stroke="url(#g)" strokeWidth="4" strokeLinecap="round"/>
      <path d="M14 34v8c0 4 3 7 7 7h3" stroke="rgba(255,255,255,0.45)" strokeWidth="4" strokeLinecap="round"/>
      <path d="M50 34v8c0 4-3 7-7 7h-3" stroke="rgba(255,255,255,0.45)" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="27" cy="34" r="2" fill="rgba(255,255,255,0.85)"/>
      <circle cx="37" cy="34" r="2" fill="rgba(255,255,255,0.85)"/>
      <path d="M28 41c2.5 2 5.5 2 8 0" stroke="rgba(255,255,255,0.75)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M46 44c0 6-5 10-14 10" stroke="rgba(255,255,255,0.45)" strokeWidth="4" strokeLinecap="round"/>
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
        "Ciao, sono **AI Ads Assistant** 👋\nDisponibile 24 ore su 24 🚀\n\nPer aiutarti subito, dimmi cosa vuoi fare:\n• Campagne\n• Budget\n• Creatività\n• Collegare Google Ads\n• Problemi account",
    },
  ]);

  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => {
      boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
    }, 60);
  }, [open, messages]);

  const styles = useMemo(() => {
    return {
      panelBg: "rgba(12, 16, 26, 0.92)",
      panelBorder: "rgba(255,255,255,0.12)",
      soft: "rgba(255,255,255,0.06)",
      text: "rgba(255,255,255,0.92)",
      sub: "rgba(255,255,255,0.65)",
      accent: "#2D6CFF",
      accent2: "#7B61FF",
      aiGlow: "rgba(45,108,255,0.35)",
    };
  }, []);

  async function callRealAI(userText: string) {
    // Prova prima /api/chat (più “pulito”), se non esiste prova /api/aiassistant/chat, poi fallback.
    const payload = { message: userText, messages };
    const endpoints = ["/api/chat", "/api/aiassistant/chat", "/api/chatbot"];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) continue;
        const data = await res.json();

        // accetta vari formati {reply} o {text} o {message}
        const reply =
          data?.reply || data?.text || data?.message || data?.content || null;

        if (reply && typeof reply === "string") return reply;
      } catch {}
    }

    // fallback smart (non più “Ricevuto ✅”)
    const t = userText.toLowerCase();
    if (t.includes("google") || t.includes("ads")) {
      return "✅ Per Google Ads LIVE: Developer Token + OAuth + Refresh Token. Se vuoi, ti guido step-by-step e poi leggiamo KPI reali in dashboard.";
    }
    if (t.includes("budget")) {
      return "💰 Dimmi obiettivo (lead/vendite) e budget giornaliero. Ti preparo regole CPA/ROAS e riallocazione automatica.";
    }
    if (t.includes("creativ") || t.includes("annunci")) {
      return "�� Dammi settore + offerta + target. Ti genero 5 varianti annunci + A/B test pronto.";
    }
    return "Ok. Scrivimi il problema preciso (es. 'campagna non spende', 'ROAS basso', 'tracking') e lo risolviamo.";
  }

  async function send(text?: string) {
    const t = (text ?? input).trim();
    if (!t || loading) return;

    setInput("");
    setLoading(true);
    setMessages((m) => [...m, { role: "user", text: t }]);

    const reply = await callRealAI(t);

    setMessages((m) => [...m, { role: "assistant", text: reply }]);
    setLoading(false);
  }

  const quick = [
    { label: "Campagne", value: "Voglio creare/ottimizzare una campagna. Da dove partiamo?" },
    { label: "Budget", value: "Aiutami a impostare budget e regole ROAS/CPA." },
    { label: "Creatività", value: "Genera creatività e copy per il mio settore." },
    { label: "Google Ads", value: "Colleghiamo Google Ads LIVE e importiamo KPI reali." },
  ];

  return (
    <>
      {/* ORB BUTTON */}
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
          border: `1px solid ${styles.panelBorder}`,
          background: `radial-gradient(circle at 30% 30%, ${styles.accent}, ${styles.accent2})`,
          boxShadow: `0 18px 50px rgba(0,0,0,0.55), 0 0 0 6px ${styles.aiGlow}`,
          zIndex: 99999,
          cursor: "pointer",
          display: open ? "none" : "grid",
          placeItems: "center",
          color: "white",
          fontWeight: 800,
          letterSpacing: 0.4,
        }}
      >
        <span style={{ fontSize: 16 }}>AI</span>
      </button>

      {/* PANEL */}
      {open && (
        <div
          style={{
            position: "fixed",
            right: 18,
            bottom: 18,
            width: 392,
            maxWidth: "calc(100vw - 36px)",
            height: 560,
            maxHeight: "calc(100vh - 36px)",
            background: styles.panelBg,
            border: `1px solid ${styles.panelBorder}`,
            borderRadius: 16,
            zIndex: 99999,
            overflow: "hidden",
            boxShadow: "0 22px 70px rgba(0,0,0,0.6)",
            backdropFilter: "blur(14px)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 12px",
              borderBottom: `1px solid ${styles.panelBorder}`,
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              display: "grid", placeItems: "center",
              border: `1px solid ${styles.panelBorder}`,
              background: "rgba(255,255,255,0.06)"
            }}>
              <HeadsetFace />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: styles.text, fontWeight: 800, fontSize: 14, lineHeight: 1.1 }}>
                AI Ads Assistant
              </div>
              <div style={{ color: styles.sub, fontSize: 12, marginTop: 2 }}>
                Disponibile 24 ore su 24 🚀
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              aria-label="Chiudi"
              style={{
                width: 34, height: 34, borderRadius: 10,
                border: `1px solid ${styles.panelBorder}`,
                background: "rgba(255,255,255,0.04)",
                color: styles.text, cursor: "pointer"
              }}
            >
              ✕
            </button>
          </div>

          {/* Privacy note */}
          <div style={{
            padding: "10px 12px",
            borderBottom: `1px solid ${styles.panelBorder}`,
            color: styles.sub,
            fontSize: 12,
            background: "rgba(255,255,255,0.02)"
          }}>
            Ricorda che i tuoi dati saranno trattati secondo l’informativa privacy.
          </div>

          {/* Messages */}
          <div
            ref={boxRef}
            style={{
              height: 360,
              overflowY: "auto",
              padding: 12,
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
                    maxWidth: "86%",
                    padding: "10px 12px",
                    borderRadius: 14,
                    background: isUser
                      ? `linear-gradient(135deg, ${styles.accent}, ${styles.accent2})`
                      : "rgba(255,255,255,0.06)",
                    border: `1px solid ${styles.panelBorder}`,
                    color: "white",
                    whiteSpace: "pre-wrap",
                    fontSize: 13,
                    lineHeight: 1.35,
                  }}
                  dangerouslySetInnerHTML={
                    !isUser
                      ? { __html: m.text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br/>") }
                      : undefined
                  }
                >
                  {isUser ? m.text : null}
                </div>
              );
            })}

            {loading && (
              <div style={{
                alignSelf: "flex-start",
                padding: "10px 12px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.06)",
                border: `1px solid ${styles.panelBorder}`,
                color: styles.sub,
                fontSize: 13
              }}>
                Sto pensando…
              </div>
            )}
          </div>

          {/* Quick replies */}
          <div style={{
            padding: "10px 12px",
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            borderTop: `1px solid ${styles.panelBorder}`,
            background: "rgba(255,255,255,0.02)"
          }}>
            {quick.map((q) => (
              <button
                key={q.label}
                onClick={() => send(q.value)}
                style={{
                  padding: "8px 10px",
                  borderRadius: 999,
                  border: `1px solid ${styles.panelBorder}`,
                  background: "rgba(255,255,255,0.05)",
                  color: styles.text,
                  cursor: "pointer",
                  fontSize: 12,
                }}
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{
            padding: 12,
            display: "flex",
            gap: 10,
            borderTop: `1px solid ${styles.panelBorder}`,
            background: "rgba(0,0,0,0.18)"
          }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Scrivi qui il tuo messaggio…"
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              style={{
                flex: 1,
                height: 40,
                borderRadius: 12,
                border: `1px solid ${styles.panelBorder}`,
                background: "rgba(255,255,255,0.05)",
                color: styles.text,
                padding: "0 12px",
                outline: "none",
              }}
            />
            <button
              onClick={() => send()}
              disabled={loading}
              style={{
                height: 40,
                padding: "0 14px",
                borderRadius: 12,
                border: `1px solid ${styles.panelBorder}`,
                background: `linear-gradient(135deg, ${styles.accent}, ${styles.accent2})`,
                color: "white",
                fontWeight: 700,
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
TSX

echo "✅ ChatWidget aggiornato (Sky style + AI Ads Assistant + faccina headset)"
echo "✅ Layout: solo un widget attivo"

