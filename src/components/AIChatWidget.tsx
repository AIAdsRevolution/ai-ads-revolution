"use client";

import React, { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Ciao, sono AI ADS Assistant ��\nScrivimi pure: campagne, budget, creatività, ROAS, problemi account.",
    },
  ]);

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 50);
  }, [open, messages]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch("/api/aiassistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Errore API");
      }

      const data = (await res.json()) as { reply: string };
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch (e) {
      console.error(e);
      setMessages([
        ...next,
        { role: "assistant", content: "⚠️ Non riesco a rispondere ora. Controlla connessione/API." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Bubble */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Apri AI Assistant"
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full shadow-lg bg-[#0A84FF] flex items-center justify-center"
      >
        <img
          src="/ai-face.png"
          alt="AI ADS Assistant"
          className="h-10 w-10 rounded-full"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/ai-face.svg";
          }}
        />
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[90vw] rounded-2xl border border-white/10 bg-[#0B0F1A] shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 p-4 border-b border-white/10">
            <img
              src="/ai-face.png"
              className="h-9 w-9 rounded-full"
              alt="AI"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/ai-face.svg";
              }}
            />
            <div className="flex-1">
              <div className="text-white font-semibold">AI ADS Assistant</div>
              <div className="text-xs text-white/60">Online • risposte reali via API</div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">
              ✕
            </button>
          </div>

          <div ref={listRef} className="p-4 h-[320px] overflow-auto space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <div
                  className={
                    "inline-block whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm " +
                    (m.role === "user" ? "bg-white/10 text-white" : "bg-white/5 text-white/90")
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-left">
                <div className="inline-block rounded-2xl px-3 py-2 text-sm bg-white/5 text-white/70">
                  Sto pensando…
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-white/10 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? send() : null)}
              placeholder="Scrivi qui…"
              className="flex-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white outline-none"
            />
            <button
              onClick={send}
              disabled={loading}
              className="rounded-xl px-4 py-2 bg-[#0A84FF] text-white font-semibold disabled:opacity-60"
            >
              Invia
            </button>
          </div>
        </div>
      )}
    </>
  );
}
