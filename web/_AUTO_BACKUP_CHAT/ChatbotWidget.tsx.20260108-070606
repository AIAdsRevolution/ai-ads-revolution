"use client";

import React, { useState } from "react";

type Message = {
  from: "user" | "bot";
  text: string;
};

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "Ciao! Sono il chatbot AI di AI Ads Revolution. Posso aiutarti con piani, prezzi e come funzionano le campagne.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const newMessages: Message[] = [
      ...messages,
      { from: "user", text: trimmed },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();
      const reply: string =
        data.reply || "Al momento non riesco a rispondere, riprova tra poco.";

      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Si è verificato un errore nel chatbot. Riprova più tardi.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="mb-3 w-80 max-h-96 rounded-2xl border border-sky-500/40 bg-slate-950 shadow-xl flex flex-col overflow-hidden">
          <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between bg-slate-900">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-sky-300">
                AI Ads Revolution
              </span>
              <span className="text-[11px] text-slate-400">
                Chatbot AI 24/7 (no assistenza telefonica)
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-slate-200 text-xs"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 px-3 py-2 space-y-2 overflow-y-auto text-xs bg-slate-950">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${
                  m.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-3 py-2 ${
                    m.from === "user"
                      ? "bg-sky-500 text-slate-950"
                      : "bg-slate-800 text-slate-50"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-[11px] text-slate-400">Sto pensando…</div>
            )}
          </div>

          <form
            onSubmit={sendMessage}
            className="border-t border-slate-800 bg-slate-900 px-2 py-2 flex gap-2"
          >
            <input
              className="flex-1 rounded-lg bg-slate-950 px-2 py-1 text-xs text-slate-100 outline-none border border-slate-700 focus:border-sky-500"
              placeholder="Fai una domanda sui piani o sulle campagne…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="text-xs px-3 py-1 rounded-lg bg-sky-500 text-slate-950 font-semibold disabled:opacity-50"
            >
              Invia
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-full bg-sky-500 text-slate-950 px-4 py-2 text-sm font-semibold shadow-lg hover:bg-sky-400"
      >
        🤖 AI Chatbot
      </button>
    </div>
  );
}
