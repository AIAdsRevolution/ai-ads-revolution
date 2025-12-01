"use client";

import React, { useState } from "react";

type Message = {
  from: "user" | "bot";
  text: string;
};

export default function AIChatbotPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text:
        "Ciao! 👋 Sono il chatbot AI di AI Ads Revolution. Posso aiutarti con piani, prezzi, campagne e attivazione del piano Basic. Da cosa vuoi partire?",
    },
  ]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const question = input.trim();
    if (!question) return;

    setError(null);
    setLoading(true);
    setMessages((prev) => [...prev, { from: "user", text: question }]);
    setInput("");

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      if (!res.ok || !data || (!data.answer && data.error)) {
        setError(data?.error || "Errore nel chatbot AI. Riprova più tardi.");
        setMessages((prev) => [
          ...prev,
          {
            from: "bot",
            text:
              "❌ Errore nel chatbot AI. Riprova più tardi o verifica la configurazione.",
          },
        ]);
        setLoading(false);
        return;
      }

      const answer: string = data.answer;
      setMessages((prev) => [...prev, { from: "bot", text: answer }]);
    } catch (err) {
      console.error("Errore chiamata chatbot:", err);
      setError("Errore di connessione al chatbot. Riprova più tardi.");
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text:
            "❌ Errore di connessione al chatbot. Controlla la connessione o riprova più tardi.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          AI Ads Revolution
        </h1>
        <p className="text-slate-300 mb-1">
          <span className="font-semibold">Chatbot AI • Assistenza 24/7</span>
        </p>
        <p className="text-slate-400 mb-4">
          Fai domande su piani, prezzi, campagne, fatturazione e attivazione del
          piano Basic.
        </p>

        <div className="border border-slate-800 bg-slate-900/60 rounded-2xl p-4 mb-3 h-[420px] flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={
                  m.from === "user"
                    ? "text-right"
                    : "text-left"
                }
              >
                <div
                  className={
                    "inline-block px-3 py-2 rounded-xl text-sm " +
                    (m.from === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-100")
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-left">
                <div className="inline-block px-3 py-2 rounded-xl text-sm bg-slate-800 text-slate-300">
                  Sto pensando alla risposta...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
            <input
              type="text"
              className="flex-1 rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              placeholder='Scrivi la tua domanda (es: "Cosa include il piano Basic?")...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Invio..." : "Invia"}
            </button>
          </form>
        </div>

        {error && (
          <p className="text-sm text-red-400 mb-2">
            {error}
          </p>
        )}

        <p className="text-xs text-slate-500">
          Il chatbot non sostituisce consulenza legale o fiscale. Le risposte
          sono generate dall&apos;AI sulla base delle informazioni interne di AI
          Ads Revolution.
        </p>
      </div>
    </main>
  );
}
