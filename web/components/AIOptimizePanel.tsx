"use client";

import { useState } from "react";

type Result = {
  recommended_bid: number;
  prospecting_budget: number;
  retargeting_budget: number;
  score: number;
  notes?: string[];
  error?: string;
};

export function AIOptimizePanel() {
  const [dailyBudget, setDailyBudget] = useState<string>("20");
  const [riskLevel, setRiskLevel] = useState<"low" | "normal" | "aggressive">(
    "normal"
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function handleOptimize(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const body = {
        daily_budget: parseFloat(dailyBudget || "0"),
        risk_level: riskLevel,
      };

      const res = await fetch("/api/ai/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      setResult(json);
    } catch (err) {
      console.error(err);
      setResult({
        recommended_bid: 0,
        prospecting_budget: 0,
        retargeting_budget: 0,
        score: 0,
        error: "Errore nel chiamare l'AI",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg">
      <h2 className="text-lg font-semibold text-slate-50 mb-2">
        AI Optimization – Suggerimenti campagna
      </h2>
      <p className="text-xs text-slate-400 mb-4">
        Inserisci il budget giornaliero e il profilo di rischio. Il motore AI
        suggerirà bid consigliato e divisione prospecting/retargeting.
      </p>

      <form
        onSubmit={handleOptimize}
        className="flex flex-wrap gap-4 items-end"
      >
        <div>
          <label className="block text-xs text-slate-300 mb-1">
            Budget giornaliero (€)
          </label>
          <input
            type="number"
            min="1"
            step="1"
            value={dailyBudget}
            onChange={(e) => setDailyBudget(e.target.value)}
            className="rounded-md bg-slate-950 border border-slate-700 px-3 py-1.5 text-sm text-slate-50"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-300 mb-1">
            Profilo di rischio
          </label>
          <select
            value={riskLevel}
            onChange={(e) =>
              setRiskLevel(e.target.value as "low" | "normal" | "aggressive")
            }
            className="rounded-md bg-slate-950 border border-slate-700 px-3 py-1.5 text-sm text-slate-50"
          >
            <option value="low">Basso (prudente)</option>
            <option value="normal">Normale (bilanciato)</option>
            <option value="aggressive">Aggressivo (massima crescita)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-md bg-emerald-500 text-slate-950 text-sm font-semibold disabled:opacity-60"
        >
          {loading ? "Calcolo AI in corso…" : "Ottimizza con l'AI"}
        </button>
      </form>

      {result && (
        <div className="mt-4 text-sm text-slate-100 space-y-1">
          {result.error && (
            <div className="text-red-400 text-xs mb-1">{result.error}</div>
          )}
          <div>
            <span className="text-slate-400">Bid consigliato: </span>
            <span className="font-semibold">
              €{result.recommended_bid.toFixed(3)}
            </span>
          </div>
          <div>
            <span className="text-slate-400">Budget prospecting: </span>
            <span className="font-semibold">
              €{result.prospecting_budget.toFixed(2)} / giorno
            </span>
          </div>
          <div>
            <span className="text-slate-400">Budget retargeting: </span>
            <span className="font-semibold">
              €{result.retargeting_budget.toFixed(2)} / giorno
            </span>
          </div>
          <div>
            <span className="text-slate-400">Punteggio modello: </span>
            <span className="font-semibold">{result.score.toFixed(2)}</span>
          </div>
          {result.notes && (
            <ul className="mt-2 text-xs text-slate-400 list-disc ml-4">
              {result.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
