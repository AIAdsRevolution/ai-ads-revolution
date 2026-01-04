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
