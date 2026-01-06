#!/usr/bin/env bash
set -euo pipefail

LAYOUT="src/app/layout.tsx"
WIDGET="src/components/ChatWidget.tsx"

echo "== Backup layout =="
cp "$LAYOUT" "$LAYOUT.fixchat.bak.$(date +%Y%m%d-%H%M%S)"

echo "== Create ChatWidget component (Sky-like demo) =="
mkdir -p src/components
cat > "$WIDGET" <<'TSX'
"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Msg = { role: "assistant" | "user"; text: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text:
        "Ciao 👋 sono l’assistente AI Ads Revolution, disponibile 24/7.\n\nDimmi: vuoi aiuto su campagne, budget, creatività o collegamento Google Ads?",
    },
  ]);

  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
      }, 50);
    }
  }, [open, messages]);

  const styles = useMemo(() => {
    const panelBg = "rgba(18, 22, 30, 0.92)";
    const panelBorder = "rgba(255,255,255,0.12)";
    const soft = "rgba(255,255,255,0.06)";
    const text = "rgba(255,255,255,0.92)";
    const sub = "rgba(255,255,255,0.65)";
    const accent = "#2d6cff"; // “meta-like blue”
    const accent2 = "#7b61ff";
    return { panelBg, panelBorder, soft, text, sub, accent, accent2 };
  }, []);

  async function send() {
    const t = input.trim();
    if (!t) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: t }]);

    // DEMO AI: risposta locale (poi la colleghiamo a /api/ai/chat o ai-core)
    const reply =
      t.toLowerCase().includes("google") || t.toLowerCase().includes("ads")
        ? "Ok ✅ Per collegare Google Ads: servono Developer Token, OAuth e Refresh Token. Quando vuoi, facciamo il collegamento e iniziamo a leggere KPI reali."
        : t.toLowerCase().includes("budget")
        ? "Perfetto 💰 Posso aiutarti a impostare regole di budget shift (es. sposta budget solo su ROAS>target). Dimmi obiettivo (lead/vendite) e budget giornaliero."
        : t.toLowerCase().includes("creativ")
        ? "Ottimo 🎨 Posso generare varianti creative e test A/B. Dimmi settore, offerta e target, e preparo 5 annunci pronti."
        : "Ricevuto ✅ Vuoi che ti guidi su: 1) collegare dati reali 2) creare campagne 3) migliorare la dashboard 4) preparare la versione commerciale?";

    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
    }, 550);
  }

  return (
    <>
      {/* FLOAT BUTTON */}
      <button
        type="button"
        aria-label="Apri chat assistente"
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          right: 22,
          bottom: 22,
          width: 64,
          height: 64,
          borderRadius: 999,
          border: `1px solid ${styles.panelBorder}`,
          background: `linear-gradient(135deg, ${styles.accent}, ${styles.accent2})`,
          boxShadow: "0 18px 50px rgba(0,0,0,0.55)",
          zIndex: 99999,
          cursor: "pointer",
          display: open ? "none" : "grid",
          placeItems: "center",
          color: "white",
          fontWeight: 800,
          letterSpacing: 0.4,
        }}
      >
        AI
      </button>

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
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 999,
                background: `linear-gradient(135deg, ${styles.accent}, ${styles.accent2})`,
                display: "grid",
                placeItems: "center",
                fontWeight: 900,
                color: "white",
              }}
            >
              A
            </div>
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ color: styles.text, fontWeight: 800 }}>
                Assistente Virtuale — AI Ads
              </div>
              <div style={{ color: styles.sub, fontSize: 12 }}>Disponibile 24 ore su 24 🚀</div>
            </div>

            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{
                  background: styles.soft,
                  border: `1px solid ${styles.panelBorder}`,
                  color: styles.text,
                  borderRadius: 10,
                  padding: "8px 10px",
                  cursor: "pointer",
                }}
                aria-label="Chiudi chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Privacy note */}
          <div
            style={{
              padding: "10px 12px",
              color: styles.sub,
              fontSize: 12,
              borderBottom: `1px solid ${styles.panelBorder}`,
            }}
          >
            I messaggi possono essere usati per migliorare il servizio. Nessun dato sensibile.
          </div>

          {/* Messages */}
          <div
            ref={boxRef}
            style={{
              padding: 12,
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
                    maxWidth: "86%",
                    background: isUser ? "rgba(45,108,255,0.22)" : "rgba(255,255,255,0.07)",
                    border: `1px solid ${styles.panelBorder}`,
                    borderRadius: 14,
                    padding: "10px 12px",
                    color: styles.text,
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.25,
                  }}
                >
                  {m.text}
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div style={{ padding: 12, borderTop: `1px solid ${styles.panelBorder}` }}>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
                placeholder="Scrivi qui il tuo messaggio…"
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.06)",
                  border: `1px solid ${styles.panelBorder}`,
                  borderRadius: 12,
                  padding: "10px 12px",
                  outline: "none",
                  color: styles.text,
                }}
              />
              <button
                type="button"
                onClick={send}
                style={{
                  background: `linear-gradient(135deg, ${styles.accent}, ${styles.accent2})`,
                  border: "0",
                  borderRadius: 12,
                  padding: "10px 14px",
                  color: "white",
                  fontWeight: 800,
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
TSX

echo "== Fix imports + single <ChatWidget /> in layout.tsx =="

python3 - <<'PY'
import re, pathlib

p = pathlib.Path("src/app/layout.tsx")
s = p.read_text(encoding="utf-8")

# remove any ChatWidget imports
s = re.sub(r'^\s*import\s+ChatWidget\s+from\s+["\']@/components/ChatWidget["\']\s*;\s*\n', '', s, flags=re.M)

# ensure single import after last import line
lines = s.splitlines(True)
last_import = -1
for i,l in enumerate(lines):
    if re.match(r'^\s*import\b', l):
        last_import = i

ins = 'import ChatWidget from "@/components/ChatWidget";\n'
if last_import >= 0:
    lines.insert(last_import+1, ins)
else:
    lines.insert(0, ins)

s = ''.join(lines)

# remove all <ChatWidget .../> occurrences
s = re.sub(r'\s*<ChatWidget\s*/>\s*\n', '\n', s)

# insert one before </body>
if "</body>" in s:
    s = s.replace("</body>", "  <ChatWidget />\n</body>", 1)

p.write_text(s, encoding="utf-8")
PY

echo "== Verify occurrences =="
grep -n "ChatWidget" src/app/layout.tsx || true
echo "== OK =="
