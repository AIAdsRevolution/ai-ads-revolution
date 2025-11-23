"use client";

import { useState } from "react";

type GeneratedItem = {
  id: string;
  prompt: string;
  channel: string;
  result: string;
  createdAt: string;
};

export default function AiAssistantPage() {
  const [prompt, setPrompt] = useState("");
  const [channel, setChannel] = useState("meta");
  const [goal, setGoal] = useState("vendite");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<GeneratedItem[]>([]);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!prompt.trim()) {
      setError("Scrivi almeno un minimo di brief per la campagna.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/ai/generate-copy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          channel,
          goal,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Errore dalla API AI.");
      }

      const data = await res.json();

      const resultText: string =
        typeof data.result === "string"
          ? data.result
          : JSON.stringify(data.result, null, 2);

      const item: GeneratedItem = {
        id: Date.now().toString(),
        prompt,
        channel,
        result: resultText,
        createdAt: new Date().toLocaleString("it-IT"),
      };

      setHistory((prev) => [item, ...prev]);
      setPrompt("");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Errore sconosciuto dalla AI.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-full w-full px-4 py-4 md:px-6 md:py-6">
      <div className="mx-auto max-w-5xl space-y-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-50">
              AI Campaign Assistant
            </h1>
            <p className="text-xs text-slate-400">
              ChatGPT + motore neurale di AI Ads Revolution per generare copy
              ottimizzati per le tue campagne.
            </p>
          </div>
          <div className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-300">
            AI attiva · Beta privata
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleGenerate}
          className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 sm:p-5 md:p-6"
        >
          <div className="grid gap-3 md:grid-cols-3">
            <div className="md:col-span-2">
              <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Brief campagna
              </label>
              <textarea
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs text-slate-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60 min-h-[90px]"
                placeholder="Descrivi il prodotto, il pubblico e il tono della campagna. Es: e-commerce abbigliamento, pubblico 25-45, obiettivo vendite, tono premium."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Canale
                </label>
                <select
                  className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60"
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                >
                  <option value="meta">Meta (Facebook/Instagram)</option>
                  <option value="google">Google Ads (Search/Display)</option>
                  <option value="tiktok">TikTok Ads</option>
                  <option value="linkedin">LinkedIn Ads</option>
                  <option value="email">Email marketing</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Obiettivo
                </label>
                <select
                  className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                >
                  <option value="vendite">Vendite / acquisti</option>
                  <option value="lead">Lead / contatti</option>
                  <option value="traffic">Traffico sito</option>
                  <option value="awareness">Brand awareness</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-1 w-full rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Generazione in corso..." : "Genera copy con AI"}
              </button>

              {error && (
                <p className="text-[11px] text-rose-400 bg-rose-950/40 border border-rose-900/60 rounded-lg px-2 py-1">
                  {error}
                </p>
              )}
            </div>
          </div>
        </form>

        {/* Storia delle generazioni */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Storico generazioni
            </h2>
            {history.length > 0 && (
              <button
                type="button"
                onClick={() => setHistory([])}
                className="text-[11px] text-slate-400 hover:text-slate-200"
              >
                Svuota storico
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <p className="text-[11px] text-slate-500">
              Qui vedrai lo storico dei copy generati dalla AI per le tue
              campagne.
            </p>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3.5 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300">
                      {item.channel.toUpperCase()} · {item.goal || "campagna"}
                    </span>
                    <span>{item.createdAt}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300">Brief:</span>{" "}
                    {item.prompt}
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-2.5 text-[11px] text-slate-100 whitespace-pre-wrap">
                    {item.result}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
