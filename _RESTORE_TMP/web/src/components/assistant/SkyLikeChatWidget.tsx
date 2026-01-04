"use client";

import React, { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const QUICK_ACTIONS = [
  { label: "Collegare Google Ads", text: "Aiutami a collegare Google Ads alla piattaforma." },
  { label: "Ottimizzare Budget", text: "Ottimizza il budget delle mie campagne: dammi una strategia pratica." },
  { label: "Creare Creatività", text: "Genera 3 idee creative (titoli + descrizioni) per una campagna." },
  { label: "Vedere KPI / ROAS", text: "Mostrami come leggere KPI e ROAS e cosa migliorare." },
];

export default function SkyLikeChatWidget() {
  const [open, setOpen] = useState(false);
  const [min, setMin] = useState(false);
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Ciao! Sono l’AI Assistant di AI Ads Revolution.\nDimmi cosa vuoi fare oggi (campagne, budget, creatività, KPI/ROAS).",
    },
  ]);

  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open || min) return;
    setTimeout(() => listRef.current?.scrollTo({ top: 999999, behavior: "smooth" }), 50);
  }, [messages, open, min]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const r = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!r.ok) {
        const err = await r.text();
        throw new Error(err || "Errore API");
      }

      const data = await r.json();
      const answer = (data?.answer ?? "").toString().trim() || "Non ho ricevuto risposta dal motore AI.";
      setMessages([...next, { role: "assistant", content: answer }]);
    } catch (e: any) {
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            "⚠️ Errore collegamento AI.\nControllo: API KEY, endpoint ai-core, e route /api/assistant/chat.\nDettaglio: " +
            (e?.message ?? "unknown"),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-2xl border border-white/10 bg-[#0B0F1A]/85 backdrop-blur-xl flex items-center justify-center"
        aria-label="Apri assistente"
        title="Apri Assistente AI"
      >
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#0A84FF] via-[#3EF3FF] to-fuchsia-500 flex items-center justify-center">
          <span className="text-black font-bold">AI</span>
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[92vw]">
      <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0B0F1A]/90 backdrop-blur-xl">
        <div className="px-4 py-3 flex items-center justify-between bg-gradient-to-r from-[#0A84FF] via-fuchsia-500 to-[#3EF3FF]">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-black/20 flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <div className="text-white">
              <div className="font-semibold leading-5">Assistente Virtuale</div>
              <div className="text-xs opacity-90">AI Ads Revolution</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMin((v) => !v)}
              className="h-8 w-8 rounded-lg bg-black/20 hover:bg-black/30 text-white"
              title={min ? "Ripristina" : "Minimizza"}
            >
              {min ? "▢" : "—"}
            </button>
            <button
              onClick={() => setOpen(false)}
              className="h-8 w-8 rounded-lg bg-black/20 hover:bg-black/30 text-white"
              title="Chiudi"
            >
              ✕
            </button>
          </div>
        </div>

        {!min && (
          <>
            <div ref={listRef} className="h-[420px] overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((m, idx) => (
                <div key={idx} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={[
                      "max-w-[85%] rounded-2xl px-3 py-2 text-[14px] leading-6 whitespace-pre-wrap",
                      m.role === "user"
                        ? "bg-[#0A84FF]/20 border border-[#0A84FF]/30 text-white"
                        : "bg-white/5 border border-white/10 text-white/90",
                    ].join(" ")}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl px-3 py-2 text-[14px] bg-white/5 border border-white/10 text-white/70">
                    Sto pensando…
                  </div>
                </div>
              )}
            </div>

            <div className="px-4 pb-3 grid grid-cols-1 gap-2">
              {QUICK_ACTIONS.map((a) => (
                <button
                  key={a.label}
                  onClick={() => send(a.text)}
                  className="rounded-xl px-3 py-2 bg-[#0A84FF]/15 border border-[#0A84FF]/25 hover:bg-[#0A84FF]/25 text-white text-sm text-left"
                >
                  {a.label}
                </button>
              ))}
            </div>

            <div className="border-t border-white/10 p-3 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send(input);
                }}
                className="h-11 flex-1 rounded-xl bg-white/5 border border-white/10 px-3 text-[14px] text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-[#3EF3FF]/40"
                placeholder="Scrivi qui il tuo messaggio..."
              />
              <button
                onClick={() => send(input)}
                className="h-11 px-4 rounded-xl bg-[#0A84FF] hover:brightness-110 text-white font-semibold"
              >
                Invia
              </button>
            </div>
          </>
        )}

        {min && <div className="px-4 py-3 text-white/80 text-sm">Chat minimizzata. Clicca ▢ per riaprire.</div>}
      </div>
    </div>
  );
}
