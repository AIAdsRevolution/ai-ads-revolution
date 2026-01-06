"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function ProChatbot() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Ciao! Sono il tuo assistente di AI Ads Revolution. Sono qui per aiutarti 24 ore su 24.\n\nDimmi se vuoi ottimizzare una campagna, migliorare ROAS o serve una consulenza rapida.",
    },
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const canSend = useMemo(() => input.trim().length > 0 && !busy, [input, busy]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;

    setInput("");
    setBusy(true);
    setMessages((m) => [...m, { role: "user", content: text }]);

    try {
      // usa il tuo endpoint esistente
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) throw new Error("Errore server /api/chat");
      const data = await res.json().catch(() => null);

      const reply =
        data?.reply ||
        data?.message ||
        data?.output ||
        "Ok. Dimmi anche: piattaforma (Meta/Google), budget, paese e KPI target (CPA/ROAS).";

      setMessages((m) => [...m, { role: "assistant", content: String(reply) }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "⚠️ Ora non riesco a rispondere (API non pronta). Intanto dimmi: obiettivo, budget, settore e piattaforma.",
        },
      ]);
    } finally {
      setBusy(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  return (
    <>
      {/* BOTTONE FLOATING (come screenshot) */}
      <button
        type="button"
        aria-label="Apri AI Ads Assistant"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[9999] flex h-[62px] w-[62px] items-center justify-center rounded-full text-white shadow-2xl backdrop-blur-xl transition hover:scale-[1.02] active:scale-[0.98]"
        style={{
          background:
            "radial-gradient(120% 120% at 30% 20%, rgba(130,180,255,0.95) 0%, rgba(84,120,255,0.85) 45%, rgba(40,60,140,0.80) 100%)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.12), 0 22px 70px rgba(0,0,0,0.60), 0 0 45px rgba(120,170,255,0.18)",
        }}
        title="AI"
      >
        
      <svg width="36" height="36" viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <radialGradient id="g1" cx="30%" cy="25%" r="75%">
            <stop offset="0%" stop-color="rgba(255,255,255,0.95)"/>
            <stop offset="40%" stop-color="rgba(170,200,255,0.85)"/>
            <stop offset="100%" stop-color="rgba(80,110,255,0.55)"/>
          </radialGradient>
          <radialGradient id="g2" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stop-color="rgba(120,170,255,0.35)"/>
            <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
          </radialGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="url(#g2)"/>
        <circle cx="32" cy="32" r="22" fill="url(#g1)" stroke="rgba(255,255,255,0.22)" stroke-width="2"/>
        <circle cx="24" cy="30" r="3.2" fill="rgba(20,30,70,0.85)"/>
        <circle cx="40" cy="30" r="3.2" fill="rgba(20,30,70,0.85)"/>
        <path d="M24 41c3.5 3 12.5 3 16 0" stroke="rgba(20,30,70,0.78)" stroke-width="3" stroke-linecap="round" fill="none"/>
      </svg>
    
      </button>

      {/* POPUP CHAT (come screenshot) */}
      {open && (
        <div className="fixed inset-0 z-[9998]">
          {/* overlay trasparente (non troppo invasivo) */}
          <div className="absolute inset-0 bg-black/20" onClick={() => setOpen(false)} />

          <div
            className="absolute bottom-24 right-6 w-[360px] max-w-[calc(100vw-3rem)] overflow-hidden rounded-2xl border border-white/10 text-white shadow-2xl backdrop-blur-xl"
            style={{
              background:
                "linear-gradient(180deg, rgba(20,30,70,0.92) 0%, rgba(10,14,30,0.88) 100%)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.10), 0 30px 95px rgba(0,0,0,0.70), 0 0 60px rgba(120,170,255,0.12)",
            }}
          >
            {/* header */}
            <div className="relative flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                {/* avatar tondo */}
                <div
                  className="h-10 w-10 rounded-full"
                  style={{
                    background:
                      "radial-gradient(120% 120% at 30% 20%, rgba(255,255,255,0.95) 0%, rgba(170,200,255,0.85) 35%, rgba(80,110,255,0.55) 100%)",
                    boxShadow:
                      "inset 0 0 0 2px rgba(255,255,255,0.22), 0 0 26px rgba(120,170,255,0.22)",
                  }}
                />
                <div className="leading-tight">
                  <div className="text-sm font-semibold">AI Ads Assistant</div>
                  <div className="text-xs opacity-75">
                    Motore neurale • supporto h24
                  </div>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-lg bg-white/5 px-2 py-1 text-sm opacity-90 hover:bg-white/10"
                aria-label="Chiudi"
                title="Chiudi"
              >
                ✕
              </button>

              {/* glow linea alta */}
              <div
                className="pointer-events-none absolute left-0 top-0 h-[2px] w-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(120,170,255,0) 0%, rgba(120,170,255,0.6) 50%, rgba(120,170,255,0) 100%)",
                }}
              />
            </div>

            {/* messaggi */}
            <div className="max-h-[320px] overflow-auto px-4 pb-3">
              <div className="space-y-3">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={[
                      "max-w-[92%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed",
                      m.role === "user"
                        ? "ml-auto bg-sky-400/15 ring-1 ring-sky-300/20"
                        : "mr-auto bg-white/5 ring-1 ring-white/10",
                    ].join(" ")}
                  >
                    {m.content}
                  </div>
                ))}
                {busy && (
                  <div className="mr-auto max-w-[92%] rounded-2xl bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10">
                    Sto analizzando…
                  </div>
                )}
              </div>
            </div>

            {/* input */}
            <div className="border-t border-white/10 p-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Scrivi qui la tua richiesta..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-white/40 focus:border-white/20"
                />
                <button
                  onClick={send}
                  disabled={!canSend}
                  className="rounded-xl px-4 py-2 text-sm font-semibold text-white transition disabled:opacity-40"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(120,170,255,0.95) 0%, rgba(80,120,255,0.85) 100%)",
                    boxShadow: "0 0 26px rgba(120,170,255,0.18)",
                  }}
                >
                  Invia
                </button>
              </div>
              <div className="mt-2 text-[11px] opacity-70">ESC per chiudere</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
