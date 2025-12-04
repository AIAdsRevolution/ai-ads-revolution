"use client";

import { useState } from "react";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

function ChatbotIntro() {
  return (
    <div className="flex flex-col items-center text-center px-6 pt-8 pb-6 max-w-xl mx-auto animate-[fadeIn_0.7s_ease-out]">
      <div className="relative mb-6">
        <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-sky-400 via-purple-500 to-fuchsia-500 animate-pulse blur-[1px]" />
        <div className="absolute inset-2 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800 shadow-[0_0_25px_rgba(56,189,248,0.45)]">
          <span className="text-xs font-semibold tracking-wide text-slate-200">
            AI
          </span>
        </div>
      </div>

      <h1 className="text-3xl font-semibold text-slate-50">AI Ads Revolution</h1>
      <p className="text-slate-400 mt-1 text-[11px] uppercase tracking-[0.18em]">
        Neural Advertising Engine · AI Assistant
      </p>

      <h2 className="text-xl font-bold mt-6 text-slate-50">
        Chiedi qualsiasi cosa all’AI
      </h2>

      <p className="text-slate-300 leading-relaxed mt-4 text-sm">
        AI Ads Revolution utilizza un motore neurale avanzato per analizzare le
        tue campagne, budget e creatività, così da ottimizzare in tempo reale
        le performance pubblicitarie e migliorare il tuo ROAS.
      </p>

      <p className="text-slate-400 leading-relaxed mt-3 text-xs">
        I dati che condividi con la piattaforma sono protetti e usati solo per
        migliorare le tue campagne. Non condividere informazioni sensibili che
        non vuoi siano elaborate dall’AI. Le risposte potrebbero contenere
        errori o non essere aggiornate.
      </p>

      <p className="text-slate-500 mt-4 text-[11px]">
        Utilizzando AI Ads Revolution, accetti le nostre{" "}
        <a href="/termini" className="text-sky-400 underline underline-offset-2">
          Condizioni d’uso
        </a>{" "}
        e l’{" "}
        <a href="/privacy" className="text-sky-400 underline underline-offset-2">
          Informativa sulla privacy
        </a>
        .
      </p>
    </div>
  );
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Ciao! 👋 Sono il chatbot AI di AI Ads Revolution. Posso aiutarti con piani, prezzi, campagne e attivazione del piano Basic. Da cosa vuoi partire?",
    },
  ]);

  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const newUserMessage: ChatMessage = { role: "user", content: trimmed };
    const newHistory = [...messages, newUserMessage];
    setMessages(newHistory);
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: newHistory,
        }),
      });

      if (!res.ok) throw new Error("Errore AI-Core");

      const data = await res.json();
      const reply =
        data.reply ||
        "Per il momento non riesco a contattare il motore AI. Controlla la configurazione dell'AI-Core.";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Errore interno: impossibile contattare l'AI-Core. Riprova tra poco.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* HEADER */}
      <header className="w-full border-b border-slate-800 px-4 py-3 flex items-center justify-between bg-slate-950/80 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-400 via-purple-500 to-fuchsia-500 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">AI Assistant</span>
            <span className="text-[11px] text-emerald-400">Online · Live</span>
          </div>
        </div>
        <span className="text-[11px] text-slate-500">AI Ads Revolution</span>
      </header>

      {/* INTRO + CHAT */}
      <div className="flex-1 overflow-y-auto">
        <ChatbotIntro />

        {/* CHATBOX */}
        <section className="max-w-xl mx-auto mt-2 mb-24 px-4 py-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl animate-[fadeIn_0.6s_ease-out]">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Chatbot AI • Assistenza 24/7
          </h2>

          <div className="mt-4 mb-4 max-h-80 overflow-y-auto space-y-3 pr-1">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-2xl text-sm max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-sky-600 text-white rounded-br-sm"
                      : "bg-slate-800 text-slate-100 rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* INPUT */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-2 text-sm placeholder:text-slate-500"
              placeholder="Scrivi la tua domanda..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={isSending}
              className="w-full rounded-xl bg-sky-500 hover:bg-sky-400 disabled:bg-sky-800 text-sm font-semibold py-2 transition"
            >
              {isSending ? "Invio..." : "Invia"}
            </button>
          </form>

          <p className="text-slate-500 text-[11px] mt-3">
            Il chatbot non sostituisce consulenza legale o fiscale.
          </p>
        </section>
      </div>
    </main>
  );
}
