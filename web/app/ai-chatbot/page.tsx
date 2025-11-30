"use client";

import { useState } from "react";

type ChatMessage = {
  role: "user" | "bot";
  text: string;
};

export default function AiChatbotPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Errore nella risposta dell'AI.");
      }

      const reply: string =
        data.reply || "Nessuna risposta generata, riprova tra poco.";

      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Errore inatteso dal chatbot.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* TOP BAR */}
      <div className="border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-sky-400/80">
              AI Ads Revolution
            </div>
            <h1 className="text-lg md:text-xl font-semibold">
              Chatbot AI · Domande su piani, billing e campagne
            </h1>
          </div>
          <a
            href="/pricing"
            className="inline-flex items-center rounded-full border border-sky-500/70 px-3 py-1 text-xs font-medium text-sky-100 hover:bg-sky-500/10 transition"
          >
            ← Torna a piani & prezzi
          </a>
        </div>
      </div>

      {/* LAYOUT PRINCIPALE */}
      <div className="flex-1 mx-auto w-full max-w-5xl px-4 py-6 md:py-10 grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* CHAT */}
        <section className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 shadow-[0_0_0_1px_rgba(15,23,42,0.8)]">
          <div className="border-b border-slate-800 px-4 py-3 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-100">
              Chat live con l’AI di AI Ads Revolution
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online 24/7
            </span>
          </div>

          <div className="flex-1 flex flex-col px-4 py-3 gap-3 overflow-hidden">
            <div className="flex-1 overflow-y-auto rounded-xl bg-slate-950/60 border border-slate-800 px-3 py-3 space-y-3 text-sm">
              {messages.length === 0 && (
                <div className="text-slate-400 text-sm leading-relaxed">
                  Fai una domanda su:
                  <ul className="mt-1 list-disc list-inside space-y-0.5">
                    <li>Quale piano è più adatto alla tua attività</li>
                    <li>Come funziona il pagamento con Stripe</li>
                    <li>Cosa fa l’AI sulle campagne ogni giorno</li>
                    <li>Problemi di login o accesso alla dashboard</li>
                  </ul>
                </div>
              )}

              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-sky-600 text-sky-50 rounded-br-none"
                        : "bg-slate-800 text-slate-50 rounded-bl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {error && (
              <div className="text-xs text-rose-400 bg-rose-900/20 border border-rose-800/60 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <form onSubmit={handleSend} className="mt-1 flex items-end gap-2">
              <textarea
                className="flex-1 min-h-[50px] max-h-28 rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500/70 focus:border-sky-500/70 resize-none"
                placeholder="Scrivi la tua domanda su piani, prezzi o campagne..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="inline-flex h-[42px] items-center justify-center rounded-xl bg-sky-500 px-4 text-sm font-medium text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-sky-400 transition"
              >
                {loading ? "Sto rispondendo..." : "Invia"}
              </button>
            </form>
          </div>
        </section>

        {/* SIDEBAR INFO */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-sky-800/60 bg-sky-950/40 px-4 py-4 text-sm">
            <h2 className="text-sm font-semibold text-sky-100">
              Chatbot AI per AI Ads Revolution
            </h2>
            <p className="mt-2 text-slate-200 text-sm">
              Questo assistente è addestrato sui piani Basic, Pro ed Enterprise,
              sul funzionamento della piattaforma e sui pagamenti Stripe.
            </p>
            <ul className="mt-3 space-y-1 text-slate-300 text-sm">
              <li>• Non è un supporto telefonico, ma risponde in tempo reale.</li>
              <li>• Disponibile 24/7 per chiarire dubbi su prezzi e funzionalità.</li>
              <li>• Nessun dato della carta viene mai letto dal chatbot.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-4 text-sm">
            <h3 className="text-sm font-semibold text-slate-100">
              Suggerimenti veloci da chiedere
            </h3>
            <ul className="mt-2 space-y-1 text-slate-300">
              <li>• “Che differenza c’è tra Basic e Pro?”</li>
              <li>• “Come faccio a cancellare l’abbonamento?”</li>
              <li>• “Come funziona il pagamento con Stripe?”</li>
              <li>• “Il piano Basic è adatto per una piccola attività locale?”</li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
