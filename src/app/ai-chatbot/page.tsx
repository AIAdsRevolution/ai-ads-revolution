"use client";

import { useState } from "react";
import Link from "next/link";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export default function AIChatbotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Ciao! 👋 Sono il chatbot AI di AI Ads Revolution. Posso aiutarti con piani, prezzi, campagne e attivazione del piano Basic. Da cosa vuoi partire?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(2);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = {
      id: counter,
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setCounter((c) => c + 1);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) {
        console.error("Errore chiamata chatbot:", await res.text());
        const errorMsg: ChatMessage = {
          id: counter + 1,
          role: "assistant",
          content:
            "Si è verificato un errore interno nel chatbot. Riprova tra poco o contatta il supporto.",
        };
        setMessages((prev) => [...prev, errorMsg]);
        setCounter((c) => c + 2);
        return;
      }

      const data = await res.json();
      const replyText: string =
        data.reply ??
        "Al momento non riesco a rispondere, riprova tra poco.";

      const botMsg: ChatMessage = {
        id: counter + 1,
        role: "assistant",
        content: replyText,
      };

      setMessages((prev) => [...prev, botMsg]);
      setCounter((c) => c + 2);
    } catch (err) {
      console.error("Errore fetch chatbot:", err);
      const errorMsg: ChatMessage = {
        id: counter + 1,
        role: "assistant",
        content:
          "Errore di connessione con il server AI. Controlla la rete e riprova.",
      };
      setMessages((prev) => [...prev, errorMsg]);
      setCounter((c) => c + 2);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col bg-gradient-to-b from-black via-slate-950 to-black text-slate-100">
      <div className="relative mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 pb-6 pt-6 md:px-6 md:pt-8">
        {/* HEADER */}
        <header className="mb-4 flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-emerald-400/80">
              AI Assistant · Online · Live
            </p>
            <h1 className="mt-1 text-xl font-semibold">
              AI Ads Revolution
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              Neural Advertising Engine · AI Assistant · Chatbot per piani,
              prezzi e setup campagne.
            </p>
          </div>
          <Link
            href="/"
            className="hidden rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-200 hover:border-emerald-400 hover:text-emerald-200 transition-colors md:inline-flex"
          >
            ← Torna alla home
          </Link>
        </header>

        {/* CARD CHAT */}
        <div className="flex flex-1 flex-col rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-xl p-4 shadow-[0_0_35px_rgba(15,23,42,0.9)]">
          {/* STATUS + BOTTONE SFERA FUTURISTICA */}
          <div className="mb-3 flex items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex flex-col">
              <span>
                Stato:{" "}
                <span className="inline-flex items-center gap-1 text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                  Online
                </span>
              </span>
              <span className="mt-0.5 text-[11px] text-slate-500">
                Motore: OpenAI · modello ottimizzato per assistenza inserzionisti.
              </span>
            </div>

            {/* 🔮 SFERA LUMINOSA - NUOVO BOTTONE CHATBOT */}
            <button
              type="button"
              aria-label="Chatbot AI Ads Revolution"
              className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-400 via-cyan-400 to-violet-500 shadow-[0_0_24px_rgba(94,234,212,0.9)] transition-transform hover:scale-105 active:scale-95"
            >
              <span className="absolute inset-[3px] rounded-full bg-slate-950" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-200 shadow-[0_0_14px_rgba(52,211,153,1)]" />
            </button>
          </div>

          <h2 className="mb-2 text-sm font-semibold text-slate-100">
            Chatbot AI · Assistenza 24/7
          </h2>
          <p className="mb-3 text-[11px] text-slate-500">
            Fai domande su piani, prezzi, strategie di base e funzionamento
            della piattaforma. Il chatbot non sostituisce consulenza legale
            o fiscale.
          </p>

          {/* MESSAGGI */}
          <div className="flex-1 space-y-3 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-sm">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-emerald-500 text-slate-950"
                      : "bg-slate-900 text-slate-100 border border-slate-700"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl bg-slate-900 text-slate-300 border border-slate-700 px-3 py-2 text-xs">
                  L&apos;AI sta scrivendo…
                </div>
              </div>
            )}
          </div>

          {/* INPUT */}
          <div className="mt-3 flex flex-col gap-2">
            <textarea
              className="min-h-[70px] w-full resize-none rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
              placeholder="Scrivi la tua domanda su piani, prezzi o campagne..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] text-slate-500">
                Le risposte sono generate dall&apos;AI e potrebbero contenere
                errori. Usa le indicazioni come supporto informativo.
              </p>
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.6)] hover:bg-emerald-300 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Invio..." : "Invia"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
