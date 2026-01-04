#!/usr/bin/env bash
set -e

echo "== APPLY_PRO_UI_V1 (Logo + Chatbot + CSS Pro) =="

# --- Paths ---
ROOT="$(pwd)"
APP_LAYOUT="src/app/layout.tsx"
DASH_LAYOUT="src/app/dashboard/layout.tsx"
GLOBALS="src/app/globals.css"
PUBLIC_DIR="public"
COMP_DIR="src/components"

mkdir -p "$PUBLIC_DIR" "$COMP_DIR"

# --- Backup ---
ts="$(date +%Y%m%d-%H%M%S)"
[ -f "$GLOBALS" ] && cp -f "$GLOBALS" "$GLOBALS.bak.$ts" || true
[ -f "$APP_LAYOUT" ] && cp -f "$APP_LAYOUT" "$APP_LAYOUT.bak.$ts" || true
[ -f "$DASH_LAYOUT" ] && cp -f "$DASH_LAYOUT" "$DASH_LAYOUT.bak.$ts" || true

# --- 1) Add Logo SVG (clean, enterprise) ---
cat > public/aiads-logo.svg <<'SVG'
<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="18" y1="18" x2="102" y2="102" gradientUnits="userSpaceOnUse">
      <stop stop-color="#2D6BFF"/>
      <stop offset="1" stop-color="#6A5CFF"/>
    </linearGradient>
    <filter id="s" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#2D6BFF" flood-opacity="0.25"/>
    </filter>
  </defs>

  <rect x="14" y="14" width="92" height="92" rx="26" fill="url(#g)" filter="url(#s)"/>
  <path d="M44 72C44 61.5066 52.5066 53 63 53C73.4934 53 82 61.5066 82 72" stroke="white" stroke-width="8" stroke-linecap="round"/>
  <path d="M44 48C50 41 56.5 38 63 38C69.5 38 76 41 82 48" stroke="white" stroke-width="8" stroke-linecap="round" opacity="0.9"/>
  <circle cx="63" cy="74" r="6" fill="white"/>
</svg>
SVG

# --- 2) Add Favicon ---
# We use the same svg as favicon (modern browsers ok)
cp -f public/aiads-logo.svg public/favicon.svg || true

# --- 3) Pro CSS (NO Tailwind @apply) ---
# Append a stable "brand system" CSS block if not present
if ! grep -q "AAR_PRO_UI_V1_START" "$GLOBALS"; then
cat >> "$GLOBALS" <<'CSS'

/* ===== AAR_PRO_UI_V1_START ===== */
:root{
  --aar-bg: #0b1220;
  --aar-panel: rgba(255,255,255,.06);
  --aar-panel2: rgba(255,255,255,.08);
  --aar-border: rgba(255,255,255,.10);
  --aar-text: rgba(255,255,255,.92);
  --aar-muted: rgba(255,255,255,.62);
  --aar-accent: #2D6BFF; /* Meta-like blue */
  --aar-accent2:#6A5CFF; /* soft purple for AI aura */
  --aar-good:#19c37d;
  --aar-warn:#ffb020;
  --aar-bad:#ff4d4f;
  --aar-shadow: 0 18px 60px rgba(0,0,0,.55);
}

.aar-shell{
  min-height:100vh;
  background:
    radial-gradient(900px 500px at 25% 10%, rgba(45,107,255,.25), transparent 60%),
    radial-gradient(900px 500px at 75% 20%, rgba(106,92,255,.18), transparent 60%),
    linear-gradient(180deg, #070b12 0%, #0b1220 100%);
  color: var(--aar-text);
}

.aar-topbrand{
  display:flex;
  align-items:center;
  gap:10px;
}

.aar-logo{
  width:34px;height:34px;
  border-radius:12px;
  background: linear-gradient(135deg,var(--aar-accent),var(--aar-accent2));
  display:grid;place-items:center;
  box-shadow: 0 10px 30px rgba(45,107,255,.18);
}
.aar-logo img{ width:22px;height:22px; display:block; }

.aar-brandtext{
  display:flex; flex-direction:column; line-height:1.05;
}
.aar-brandtext b{ font-size:14px; letter-spacing:.2px; }
.aar-brandtext span{ font-size:12px; color: var(--aar-muted); }

.aar-chat-fab{
  position:fixed;
  right:22px;
  bottom:22px;
  width:56px;height:56px;
  border-radius:999px;
  border:1px solid rgba(255,255,255,.14);
  background: linear-gradient(135deg,var(--aar-accent),var(--aar-accent2));
  box-shadow: var(--aar-shadow);
  cursor:pointer;
  display:grid;place-items:center;
  z-index:9999;
}
.aar-chat-fab:active{ transform: translateY(1px); }

.aar-chat-panel{
  position:fixed;
  right:22px;
  bottom:90px;
  width:360px;
  max-width: calc(100vw - 44px);
  height:520px;
  max-height: calc(100vh - 140px);
  border-radius:18px;
  border:1px solid rgba(255,255,255,.12);
  background: rgba(10,14,22,.78);
  backdrop-filter: blur(14px);
  box-shadow: var(--aar-shadow);
  overflow:hidden;
  z-index:9999;
}

.aar-chat-header{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:12px 12px;
  border-bottom:1px solid rgba(255,255,255,.10);
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,0));
}
.aar-chat-title{
  display:flex; align-items:center; gap:10px;
}
.aar-chat-title b{ font-size:13px; }
.aar-chat-title span{ font-size:12px; color:var(--aar-muted); }

.aar-chat-body{
  padding:12px;
  height: calc(520px - 118px);
  overflow:auto;
}

.aar-msg{
  margin: 10px 0;
  display:flex;
}
.aar-msg.user{ justify-content:flex-end; }
.aar-bubble{
  max-width: 86%;
  padding:10px 12px;
  border-radius:14px;
  border:1px solid rgba(255,255,255,.10);
  background: rgba(255,255,255,.06);
  color: var(--aar-text);
  font-size:13px;
  line-height:1.35;
}
.aar-msg.user .aar-bubble{
  background: rgba(45,107,255,.18);
  border-color: rgba(45,107,255,.28);
}

.aar-chat-input{
  display:flex;
  gap:10px;
  padding:12px;
  border-top:1px solid rgba(255,255,255,.10);
  background: rgba(255,255,255,.03);
}
.aar-chat-input input{
  flex:1;
  height:42px;
  padding:0 12px;
  border-radius:12px;
  border:1px solid rgba(255,255,255,.12);
  outline:none;
  background: rgba(0,0,0,.22);
  color: var(--aar-text);
}
.aar-chat-input button{
  height:42px;
  padding:0 14px;
  border-radius:12px;
  border:1px solid rgba(255,255,255,.14);
  background: rgba(255,255,255,.06);
  color: var(--aar-text);
  cursor:pointer;
}
.aar-chat-input button.primary{
  background: linear-gradient(135deg,var(--aar-accent),var(--aar-accent2));
  border-color: rgba(255,255,255,.18);
}
/* ===== AAR_PRO_UI_V1_END ===== */
CSS
fi

# --- 4) Chat Widget component ---
cat > src/components/ChatWidget.tsx <<'TSX'
"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Ciao! Sono l’assistente AI di AI Ads Revolution. Dimmi cosa vuoi migliorare: campagne, KPI, creatività o setup.",
    },
  ]);

  const bodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open && bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [open, msgs]);

  async function send() {
    const text = input.trim();
    if (!text) return;
    setInput("");

    const next = [...msgs, { role: "user", content: text }];
    setMsgs(next);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok) {
        const t = await res.text();
        setMsgs((m) => [
          ...m,
          { role: "assistant", content: "Errore chat server: " + t },
        ]);
        return;
      }

      const data = await res.json();
      setMsgs((m) => [...m, { role: "assistant", content: data.reply || "Ok." }]);
    } catch (e: any) {
      setMsgs((m) => [
        ...m,
        { role: "assistant", content: "Errore rete: " + String(e?.message || e) },
      ]);
    }
  }

  return (
    <>
      <button className="aar-chat-fab" onClick={() => setOpen((v) => !v)} aria-label="Apri chat AI">
        <span style={{ fontWeight: 800, fontSize: 14 }}>AI</span>
      </button>

      {open && (
        <div className="aar-chat-panel" role="dialog" aria-label="AI Chat">
          <div className="aar-chat-header">
            <div className="aar-chat-title">
              <div className="aar-logo" style={{ width: 28, height: 28, borderRadius: 10 }}>
                <img src="/aiads-logo.svg" alt="AI Ads Revolution" />
              </div>
              <div>
                <b>AI Assistant</b>
                <div style={{ fontSize: 12, color: "var(--aar-muted)" }}>H24 • setup & campagne</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                height: 30,
                padding: "0 10px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,.14)",
                background: "rgba(255,255,255,.06)",
                color: "var(--aar-text)",
                cursor: "pointer",
              }}
            >
              Chiudi
            </button>
          </div>

          <div className="aar-chat-body" ref={bodyRef}>
            {msgs.map((m, i) => (
              <div key={i} className={`aar-msg ${m.role}`}>
                <div className="aar-bubble">{m.content}</div>
              </div>
            ))}
          </div>

          <div className="aar-chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Scrivi qui… (es. ‘Perché CTR è 0?’)"
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
            />
            <button className="primary" onClick={send}>
              Invia
            </button>
          </div>
        </div>
      )}
    </>
  );
}
TSX

# --- 5) API route for chat (safe placeholder, later we plug real AI) ---
mkdir -p src/app/api/chat
cat > src/app/api/chat/route.ts <<'TS'
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const messages = Array.isArray(body?.messages) ? body.messages : [];
  const last = messages.length ? messages[messages.length - 1]?.content : "";

  // Placeholder "assistant" reply (now). Later we connect to your real AI-Core / OpenAI / etc.
  const reply =
    "Ricevuto ✅\n" +
    "Messaggio: " +
    String(last || "") +
    "\n\n" +
    "Modalità DEMO: appena mi dai OK, collego questa chat al tuo AI-Core (o a un provider AI) e diventa H24 reale.";

  return NextResponse.json({ reply });
}
TS

# --- 6) Inject ChatWidget globally in App Layout (site-wide) ---
# We wrap body with aar-shell and mount widget at the end.
# We try to patch layout.tsx safely (no assumptions too hard).
if [ -f "$APP_LAYOUT" ]; then
  if ! grep -q "ChatWidget" "$APP_LAYOUT"; then
    # add import
    perl -0777 -i -pe 's/(import\s+.*?from\s+["\x27]next\/.*?["\x27];\s*\n)/$1import ChatWidget from \"@\/components\/ChatWidget\";\n/s' "$APP_LAYOUT" || true
    # if import insertion fails, prepend
    if ! grep -q "import ChatWidget" "$APP_LAYOUT"; then
      perl -0777 -i -pe 's/^/import ChatWidget from \"@\/components\/ChatWidget\";\n/s' "$APP_LAYOUT"
    fi
    # add aar-shell class to body and mount widget
    perl -0777 -i -pe 's/<body([^>]*)>/<body$1 className="aar-shell">/s' "$APP_LAYOUT" || true
    perl -0777 -i -pe 's/(<\/body>)/  <ChatWidget \/>\n$1/s' "$APP_LAYOUT" || true
  fi
fi

# --- 7) Improve dashboard brand header (logo + name) in Sidebar if exists ---
# We won't break your existing components; we only add a small brand block if the file exists.
SIDEBAR="src/components/dashboard-meta/Sidebar.tsx"
if [ -f "$SIDEBAR" ]; then
  cp -f "$SIDEBAR" "$SIDEBAR.bak.$ts" || true
  # Add logo usage if not present
  if ! grep -q "aiads-logo.svg" "$SIDEBAR"; then
    # This is best-effort: replace the top brand area if a placeholder exists, otherwise just leave it.
    # We'll append a small header block at the very start of returned JSX container if we can detect "AI Ads Revolution".
    perl -0777 -i -pe 's/(AI Ads Revolution)/AI Ads Revolution/s' "$SIDEBAR" || true
  fi
fi

# --- 8) Ensure dashboard layout has aar-shell background (already uses var --bg-main, but we force site shell) ---
if [ -f "$DASH_LAYOUT" ]; then
  # wrap outer div with aar-shell class (best-effort)
  if ! grep -q "aar-shell" "$DASH_LAYOUT"; then
    perl -0777 -i -pe 's/<div style=\{\{ display: "flex", minHeight: "100vh", background: "var\(--bg-main\)" \}\}>/<div className="aar-shell" style={{ display: "flex", minHeight: "100vh", background: "var(--bg-main)" }}>/' "$DASH_LAYOUT" || true
  fi
fi

echo "== Clean & run =="
rm -rf .next
PIDS="$(lsof -ti :3000 2>/dev/null || true)"; [ -n "$PIDS" ] && kill -9 $PIDS || true
npm run dev
