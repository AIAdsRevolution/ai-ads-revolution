"use client";

import React, { useState, FormEvent } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AIChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Ciao 👋 Sono il chatbot AI di AI Ads Revolution. Posso aiutarti con piani, prezzi, funzionamento della piattaforma e problemi di accesso.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          page: "/ai-chatbot",
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const errText =
          err?.error || "Errore nella risposta del chatbot AI.";
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `⚠️ ${errText}`,
          },
        ]);
      } else {
        const data = await res.json();
        const reply = (data.reply as string) || "Risposta non disponibile.";
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: reply,
          },
        ]);
      }
    } catch (error) {
      console.error("Errore chiamata /api/chatbot:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ C'è stato un problema tecnico nel contattare il chatbot. Riprova tra qualche secondo.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <div className="w-full border-b border-slate-800 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-sky-400">
              AI Chatbot • Beta
            </p>
            <h1 className="text-xl md:text-2xl font-semibold">
              Assistente AI Ads Revolution
            </h1>
            <p className="text-sm text-slate-400">
              Fai domande su piani, prezzi, campagne, login e billing. Nessuna
              assistenza telefonica, solo AI 24/7.
            </p>
          </div>
          <div className="hidden md:flex flex-col items-end gap-2">
            <a
              href="/pricing"
              className="text-xs px-3 py-1 rounded-full border border-sky-500/40 text-sky-300 hover:bg-sky-500/10 transition"
            >
              ← Torna ai piani
            </a>
            <a
              href="/dashboard"
              className="text-xs px-3 py-1 rounded-full border border-slate-700 text-slate-200 hover:bg-slate-800 transition"
            >
              Vai alla dashboard
            </a>
          </div>
        </div>
      </div>

      <div className="flex-1 mx-auto max-w-5xl w-full px-4 py-6 flex flex-col gap-4">
        <div className="flex-1 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 md:p-6 flex flex-col gap-4 overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-sky-600 text-white"
                      : "bg-slate-800 text-slate-100"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl px-3 py-2 text-sm bg-slate-800 text-slate-300">
                  Sto pensando alla soluzione migliore per le tue campagne...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
            <input
              type="text"
              placeholder="Chiedimi qualcosa su piani, prezzi o campagne..."
              className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium text-slate-950"
            >
              {loading ? "Invio..." : "Invia"}
            </button>
          </form>
          <p className="text-[11px] text-slate-500">
            Il chatbot non sostituisce un consulente legale o fiscale. Risponde
            solo su AI Ads Revolution, piani e funzionamento della piattaforma.
          </p>
        </div>
      </div>
    </main>
  );
}
