#!/usr/bin/env bash
set -euo pipefail

echo "== AI Ads Revolution · PRO SYSTEM V1 =="

# 0) sanity
[ -f package.json ] || { echo "❌ Sei nella cartella sbagliata (manca package.json)."; exit 1; }

STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="_backup_pro_$STAMP"
mkdir -p "$BACKUP_DIR"

backup() {
  local f="$1"
  if [ -f "$f" ]; then
    mkdir -p "$BACKUP_DIR/$(dirname "$f")"
    cp -f "$f" "$BACKUP_DIR/$f"
  fi
}

# 1) backup file critici
backup "src/app/globals.css"
backup "src/app/layout.tsx"
backup "src/app/page.tsx"
backup "src/app/dashboard/layout.tsx"

mkdir -p components/pro
mkdir -p components/dashboard-meta

# 2) GLOBALS: niente @apply su classi Tailwind (causa errori turbopack/tailwind)
#    Usiamo SOLO CSS variables + base styling.
cat > src/app/globals.css <<'CSS'
@tailwind base;
@tailwind components;
@tailwind utilities;

/* =========================================================
   AI ADS REVOLUTION · PRO DESIGN SYSTEM (META-LIKE)
   No @apply with responsive utilities to avoid Tailwind errors.
   ========================================================= */

:root{
  --bg-0:#070A12;         /* app background */
  --bg-1:#0B1020;         /* deep */
  --panel:#0E162B;        /* cards */
  --panel-2:#0B1326;      /* darker cards */
  --border: rgba(255,255,255,.08);
  --border-2: rgba(255,255,255,.12);
  --text: rgba(255,255,255,.92);
  --muted: rgba(255,255,255,.68);

  /* META palette */
  --primary:#2563EB;      /* Meta blue modern */
  --primary-2:#1D4ED8;
  --ai:#22D3EE;           /* AI glow accent */
  --success:#22C55E;
  --warn:#F59E0B;

  --shadow: 0 20px 80px rgba(0,0,0,.55);
  --radius: 18px;
}

html,body{
  height:100%;
  background: radial-gradient(1200px 600px at 20% 0%, rgba(37,99,235,.18), transparent 60%),
              radial-gradient(900px 500px at 85% 10%, rgba(34,211,238,.10), transparent 55%),
              linear-gradient(180deg, var(--bg-0), var(--bg-1));
  color:var(--text);
}

*{ box-sizing:border-box; }
a{ color:inherit; text-decoration:none; }

.pro-container{
  width:100%;
  max-width:1180px;
  margin:0 auto;
  padding:0 20px;
}

.pro-card{
  border:1px solid var(--border);
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.pro-card-flat{
  border:1px solid var(--border);
  background: rgba(10,16,30,.55);
  border-radius: var(--radius);
}

.pro-btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  padding:10px 14px;
  border-radius: 14px;
  border:1px solid var(--border);
  color:var(--text);
  background: rgba(255,255,255,.04);
  transition: transform .12s ease, background .12s ease, border-color .12s ease;
}
.pro-btn:hover{ transform: translateY(-1px); background: rgba(255,255,255,.06); border-color: var(--border-2); }
.pro-btn-primary{
  background: linear-gradient(180deg, var(--primary), var(--primary-2));
  border-color: rgba(37,99,235,.55);
}
.pro-btn-primary:hover{ border-color: rgba(37,99,235,.75); }

.pro-pill{
  display:inline-flex; align-items:center; gap:8px;
  padding:6px 10px;
  border-radius: 999px;
  border:1px solid var(--border);
  background: rgba(255,255,255,.03);
  color: var(--muted);
  font-size:12px;
}

.pro-grid-2{ display:grid; grid-template-columns: 1.15fr .85fr; gap:24px; }
@media (max-width: 980px){ .pro-grid-2{ grid-template-columns: 1fr; } }

.pro-h1{
  font-size: clamp(34px, 4.3vw, 60px);
  line-height: 1.02;
  letter-spacing: -0.04em;
  font-weight: 800;
}
.pro-sub{
  margin-top:14px;
  font-size: 16px;
  line-height: 1.6;
  color: var(--muted);
  max-width: 54ch;
}

.pro-kpi{
  display:grid;
  grid-template-columns: repeat(4, minmax(0,1fr));
  gap:12px;
}
@media (max-width: 980px){ .pro-kpi{ grid-template-columns: repeat(2, minmax(0,1fr)); } }

.pro-kpi-card{
  border:1px solid var(--border);
  background: rgba(10,16,30,.55);
  border-radius: 16px;
  padding:14px 14px;
}
.pro-kpi-label{ color: var(--muted); font-size:12px; }
.pro-kpi-val{ font-size:22px; font-weight:750; margin-top:6px; }
.pro-kpi-val-blue{ color: #9CC0FF; }
.pro-kpi-val-ai{ color: #7FE9FF; }

.pro-divider{ height:1px; background: rgba(255,255,255,.08); margin:28px 0; }

/* chatbot floating */
.pro-bot-fab{
  position: fixed;
  right: 20px;
  bottom: 18px;
  width: 52px;
  height: 52px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 30%, rgba(34,211,238,.55), rgba(37,99,235,.55));
  box-shadow: 0 18px 55px rgba(37,99,235,.35);
  border:1px solid rgba(255,255,255,.14);
  display:flex; align-items:center; justify-content:center;
  cursor:pointer;
  z-index: 9999;
}
.pro-bot-panel{
  position: fixed;
  right: 20px;
  bottom: 80px;
  width: min(390px, calc(100vw - 40px));
  height: 520px;
  border-radius: 18px;
  border:1px solid rgba(255,255,255,.12);
  background: rgba(10,16,30,.92);
  backdrop-filter: blur(10px);
  box-shadow: 0 26px 90px rgba(0,0,0,.55);
  overflow:hidden;
  z-index: 9999;
}
CSS

# 3) Layout root: aggiunge Chatbot globale
cat > components/pro/ProChatbot.tsx <<'TSX'
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Msg = { role: "bot" | "user"; text: string };

export default function ProChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "bot",
      text: "Ciao Roby 👋 Sono l’AI Assistant di AI Ads Revolution. Vuoi ottimizzare una campagna o capire i KPI?",
    },
  ]);

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => listRef.current?.scrollTo({ top: 999999, behavior: "smooth" }), 60);
    return () => clearTimeout(t);
  }, [open, msgs.length]);

  const quick = useMemo(
    () => [
      "Perché vedo 0 impression/click?",
      "Come collego Google Ads e Supabase?",
      "Suggeriscimi una campagna Search per traffico sito",
      "Spiegami il Decision Log",
    ],
    []
  );

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMsgs((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");

    // risposta locale (mock pro). Poi lo colleghiamo all'endpoint AI reale.
    const reply =
      trimmed.toLowerCase().includes("0 impression") || trimmed.toLowerCase().includes("0 click")
        ? "Se Google Ads LIVE mostra 0, di solito è perché la campagna è nuova, non sta erogando o mancano permessi GAQL. Step: verifica stato campagna, budget>0, targeting ok, e permessi API. Vuoi che ti guidi in 60 secondi?"
        : trimmed.toLowerCase().includes("supabase")
        ? "Perfetto. Colleghiamo Supabase per salvare eventi e KPI. I dati reali possono vedersi sia in locale che online: basta mettere le env (.env.local) e chiamare le API. Dimmi se vuoi usare finestra 7/14/28 giorni."
        : trimmed.toLowerCase().includes("decision")
        ? "Decision Log = tracciamento trasparente: cosa ha fatto l’AI (budget shift, bid, creative), perché, e impatto stimato su CTR/CPC/ROAS. È una feature premium (fiducia + audit)."
        : "Ok. Dimmi obiettivo (traffico, lead, vendite), budget giornaliero e paese: ti preparo struttura campagna + copy + asset.";

    setTimeout(() => setMsgs((m) => [...m, { role: "bot", text: reply }]), 420);
  }

  return (
    <>
      {open && (
        <div className="pro-bot-panel">
          <div style={{ padding: 14, borderBottom: "1px solid rgba(255,255,255,.08)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 800 }}>AI Assistant</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)", marginTop: 2 }}>
                  Meta-like • decision log • realtime
                </div>
              </div>
              <button className="pro-btn" onClick={() => setOpen(false)}>Chiudi</button>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
              {quick.map((q) => (
                <button key={q} className="pro-pill" onClick={() => send(q)}>
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div ref={listRef} style={{ padding: 14, height: 360, overflow: "auto" }}>
            {msgs.map((m, i) => (
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
                    maxWidth: "86%",
                    padding: "10px 12px",
                    borderRadius: 14,
                    border: "1px solid rgba(255,255,255,.10)",
                    background: m.role === "user" ? "rgba(37,99,235,.25)" : "rgba(255,255,255,.05)",
                    color: "rgba(255,255,255,.92)",
                    lineHeight: 1.45,
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: 14, borderTop: "1px solid rgba(255,255,255,.08)" }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              style={{ display: "flex", gap: 10 }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Scrivi qui…"
                style={{
                  flex: 1,
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,.12)",
                  background: "rgba(255,255,255,.04)",
                  padding: "10px 12px",
                  color: "white",
                  outline: "none",
                }}
              />
              <button className="pro-btn pro-btn-primary" type="submit">Invia</button>
            </form>
          </div>
        </div>
      )}

      <div className="pro-bot-fab" onClick={() => setOpen((v) => !v)} title="AI Assistant">
        <div style={{ width: 18, height: 18, borderRadius: 99, background: "rgba(255,255,255,.92)" }} />
      </div>
    </>
  );
}
TSX

# patch layout root to include ProChatbot
if ! grep -q "ProChatbot" src/app/layout.tsx; then
  # Inject import and component near end
  perl -0777 -i -pe 's/(import .*?;\n)/$1import ProChatbot from \"@\/components\/pro\/ProChatbot\";\n/s' src/app/layout.tsx || true
  perl -0777 -i -pe 's/(<\/body>)/<ProChatbot \/>\n$1/s' src/app/layout.tsx || true
fi

# 4) HOME PRO (Meta/Stripe/Linear-level)
cat > src/app/page.tsx <<'TSX'
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <div className="pro-container" style={{ paddingTop: 22, paddingBottom: 54 }}>
        {/* Top nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              className="pro-card-flat"
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 14,
              }}
            >
              <div style={{ width: 14, height: 14, borderRadius: 6, background: "rgba(37,99,235,.9)" }} />
            </div>
            <div>
              <div style={{ fontWeight: 900, letterSpacing: "-0.02em" }}>AI Ads Revolution</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)", marginTop: 2 }}>
                Motore neurale di advertising • decision log • realtime
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <Link className="pro-pill" href="/come-funziona">Come funziona</Link>
            <Link className="pro-pill" href="/ai-engine">AI Engine</Link>
            <Link className="pro-pill" href="/pricing">Prezzi</Link>
            <Link className="pro-pill" href="/status">Status</Link>
            <Link className="pro-btn" href="/login">Accedi</Link>
            <Link className="pro-btn pro-btn-primary" href="/register">Registrati</Link>
          </div>
        </div>

        <div className="pro-divider" />

        {/* HERO */}
        <div className="pro-grid-2" style={{ alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
              <span className="pro-pill">AI Neural Campaign Engine</span>
              <span className="pro-pill">Realtime signals</span>
              <span className="pro-pill">Meta-like UI</span>
              <span className="pro-pill">Audit-ready</span>
            </div>

            <h1 className="pro-h1">
              Crea campagne che <span style={{ color: "rgba(156,192,255,.95)" }}>migliorano</span> da sole.
            </h1>

            <p className="pro-sub">
              Un motore neurale che rialloca budget, ottimizza creatività e bid in tempo reale.
              Decision log trasparente e KPI misurabili. Progettato per crescere da startup a enterprise.
            </p>

            <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
              <Link className="pro-btn pro-btn-primary" href="/register">Inizia ora</Link>
              <Link className="pro-btn" href="/come-funziona">Guarda come funziona</Link>
            </div>

            <div style={{ marginTop: 12, color: "rgba(255,255,255,.65)", fontSize: 13 }}>
              Prova gratuita • Nessun lock-in • Setup veloce • Pensato anche per piccole imprese
            </div>

            <div style={{ marginTop: 22 }} className="pro-kpi">
              <div className="pro-kpi-card">
                <div className="pro-kpi-label">Vendite medie attribuite (beta)</div>
                <div className="pro-kpi-val pro-kpi-val-blue">+30%</div>
              </div>
              <div className="pro-kpi-card">
                <div className="pro-kpi-label">ROAS medio (beta)</div>
                <div className="pro-kpi-val pro-kpi-val-ai">4.7x</div>
              </div>
              <div className="pro-kpi-card">
                <div className="pro-kpi-label">Riduzione CPC media</div>
                <div className="pro-kpi-val">−25%</div>
              </div>
              <div className="pro-kpi-card">
                <div className="pro-kpi-label">Setup iniziale</div>
                <div className="pro-kpi-val">&lt; 5 min</div>
              </div>
            </div>

            <div style={{ marginTop: 12, color: "rgba(255,255,255,.55)", fontSize: 12 }}>
              *Valori indicativi su inserzionisti beta. I risultati medi non garantiscono performance future.
            </div>
          </div>

          {/* Right: mock dashboard card */}
          <div className="pro-card" style={{ padding: 18, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <div>
                <div style={{ fontWeight: 800 }}>Performance preview</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)", marginTop: 2 }}>
                  AI Neural Campaign Engine • ultimi 28 giorni
                </div>
              </div>
              <div className="pro-pill">
                <span style={{ width: 8, height: 8, borderRadius: 99, background: "rgba(34,197,94,.9)" }} />
                AI ON
              </div>
            </div>

            <div style={{ marginTop: 14 }} className="pro-card-flat">
              <div style={{ padding: 14 }}>
                <div style={{ color: "rgba(255,255,255,.65)", fontSize: 12 }}>Trend AI</div>
                <div style={{ height: 140, marginTop: 10, borderRadius: 14, border: "1px solid rgba(255,255,255,.08)", overflow: "hidden", background: "rgba(255,255,255,.03)" }}>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background:
                        "radial-gradient(600px 200px at 20% 40%, rgba(37,99,235,.30), transparent 60%), radial-gradient(500px 220px at 80% 60%, rgba(34,211,238,.15), transparent 60%)",
                      position: "relative",
                    }}
                  >
                    <div style={{ position: "absolute", left: 16, bottom: 18, color: "rgba(255,255,255,.65)", fontSize: 12 }}>
                      ROAS
                    </div>
                    <div style={{ position: "absolute", right: 16, top: 14, color: "rgba(255,255,255,.85)", fontWeight: 800 }}>
                      0.0x
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 10, marginTop: 10 }}>
                  <div className="pro-kpi-card" style={{ padding: 12 }}>
                    <div className="pro-kpi-label">CTR medio</div>
                    <div className="pro-kpi-val">0.0%</div>
                  </div>
                  <div className="pro-kpi-card" style={{ padding: 12 }}>
                    <div className="pro-kpi-label">CPC medio</div>
                    <div className="pro-kpi-val">€ 0.00</div>
                  </div>
                  <div className="pro-kpi-card" style={{ padding: 12 }}>
                    <div className="pro-kpi-label">ROAS medio</div>
                    <div className="pro-kpi-val">0.0x</div>
                  </div>
                  <div className="pro-kpi-card" style={{ padding: 12 }}>
                    <div className="pro-kpi-label">AI Actions</div>
                    <div className="pro-kpi-val">0</div>
                  </div>
                </div>

                <div style={{ marginTop: 10, color: "rgba(255,255,255,.58)", fontSize: 12 }}>
                  Collega campagne reali per vedere KPI live. La dashboard è l’area dei dati dettagliati.
                </div>

                <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                  <span className="pro-pill">Decision log</span>
                  <span className="pro-pill">Budget shift</span>
                  <span className="pro-pill">Creative AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pro-divider" />

        {/* Features */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 14 }}>
          {[
            ["AI-first in ogni decisione", "Ogni asta, offerta e creatività viene valutata da segnali realtime."],
            ["Decision log trasparente", "Sai cosa fa l’AI, perché lo fa e con quale impatto stimato."],
            ["Realtime signals", "Reagisce ai cambiamenti del mercato mentre accadono."],
            ["Scalabilità enterprise", "Inizi piccolo e cresci solo quando i dati lo confermano."],
            ["Setup guidato", "La guida AI integrata ti mostra step-by-step come ottimizzare."],
            ["Integrazioni", "Supabase + Google Ads: KPI reali, report, automazioni."],
          ].map(([t, d]) => (
            <div key={t} className="pro-card-flat" style={{ padding: 16 }}>
              <div style={{ fontWeight: 850 }}>{t}</div>
              <div style={{ marginTop: 8, color: "rgba(255,255,255,.65)", lineHeight: 1.55 }}>{d}</div>
            </div>
          ))}
        </div>

        <div className="pro-divider" />

        {/* CTA */}
        <div className="pro-card" style={{ padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontWeight: 900, fontSize: 20 }}>Inizia oggi con AI Ads Revolution</div>
              <div style={{ marginTop: 6, color: "rgba(255,255,255,.65)" }}>
                Setup rapido, prova gratuita e controllo totale sulle ottimizzazioni AI.
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Link className="pro-btn pro-btn-primary" href="/register">Crea un account</Link>
              <Link className="pro-btn" href="/dashboard">Accedi alla dashboard</Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 30, display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", color: "rgba(255,255,255,.55)", fontSize: 13 }}>
          <div>© 2025 AI Ads Revolution. Tutti i diritti riservati.</div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/chi-siamo">Chi siamo</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/termini">Termini</Link>
            <Link href="/cookie">Cookie</Link>
            <Link href="/status">Status</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
TSX

# 5) Dashboard: applichiamo “scope” e sistemiamo padding/contrasto in modo evidente
#   (senza toccare i tuoi componenti interni già esistenti)
if [ -f src/app/dashboard/layout.tsx ]; then
  # aggiungi wrapper class per lo scope se manca
  if ! grep -q 'className="dash-scope"' src/app/dashboard/layout.tsx; then
    perl -0777 -i -pe 's/<div style=\{\{ flex: 1, minWidth: 0 \}\}>/<div className="dash-scope" style={{ flex: 1, minWidth: 0 }}>/' src/app/dashboard/layout.tsx || true
  fi
fi

# 6) Stop server + clean + run
echo "== Clean & restart =="
rm -rf .next

PIDS="$(lsof -ti :3000 2>/dev/null || true)"; [ -n "$PIDS" ] && kill -9 $PIDS || true
PIDS="$(lsof -ti :3001 2>/dev/null || true)"; [ -n "$PIDS" ] && kill -9 $PIDS || true

npm run dev
