"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AIChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Ciao! 👋 Sono il chatbot AI di AI Ads Revolution. Posso aiutarti con piani, prezzi, campagne e attivazione del piano Basic. Da cosa vuoi partire?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          history: newHistory,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMsg =
          (errorData && errorData.error) ||
          "Si è verificato un errore. Riprova tra poco.";
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `❌ ${errorMsg}`,
          },
        ]);
      } else {
        const data = await res.json();
        const reply: string =
          data.reply ||
          "Al momento non riesco a rispondere, riprova tra poco.";
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: reply,
          },
        ]);
      }
    } catch (err) {
      console.error("Errore chiamata /api/chatbot:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "❌ Errore di connessione al chatbot. Verifica la rete o riprova tra poco.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sky-400/80">
              AI Ads Revolution
            </p>
            <h1 className="text-lg sm:text-xl font-semibold">
              Chatbot AI • Assistenza 24/7
            </h1>
            <p className="text-sm text-slate-400">
              Fai domande su piani, prezzi, campagne, fatturazione e attivazione
              del piano Basic.
            </p>
          </div>
        </div>
      </header>

      <section className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:py-6 flex flex-col h-[calc(100vh-170px)]">
          <div className="flex-1 overflow-y-auto border border-slate-800/70 rounded-2xl bg-slate-900/50 p-4 space-y-3">
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
                      ? "bg-sky-500 text-white"
                      : "bg-slate-800 text-slate-50"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl px-3 py-2 text-sm bg-slate-800 text-slate-300">
                  Sto pensando alla risposta…
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSend}
            className="mt-4 flex flex-col sm:flex-row gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Scrivi la tua domanda (es: “Cosa include il piano Basic?”)..."
              className="flex-1 rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-2xl bg-sky-500 px-4 py-2 text-sm font-medium text-white disabled:opacity-60 disabled:cursor-not-allowed hover:bg-sky-400 transition-colors"
            >
              {loading ? "Invio..." : "Invia"}
            </button>
          </form>

          <p className="mt-2 text-[11px] text-slate-500">
            Il chatbot non sostituisce consulenza legale o fiscale. Le risposte
            sono generate dall&apos;AI sulla base delle informazioni interne di
            AI Ads Revolution.
          </p>
        </div>
      </section>
    </main>
  );
}
