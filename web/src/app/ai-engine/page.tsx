"use client";

import { useState } from "react";

export default function AIEnginePage() {
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [budget, setBudget] = useState("500");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/generate-ad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product,
          audience,
          budget: Number(budget),
        }),
      });

      const data = await res.json();

      if (!data.ok) {
        setError(data.error || "Errore AI");
      } else {
        setResult(data.result);
      }
    } catch (e: any) {
      setError(e?.message || "Errore di rete");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center py-12">
      <div className="w-full max-w-3xl bg-slate-900/60 border border-slate-700/70 rounded-2xl p-6 shadow-xl">
        <h1 className="text-2xl font-semibold mb-4">
          Motore neurale · AI Ads Revolution
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          Inserisci i dati della campagna e lascia che l&apos;AI generi una
          proposta completa (titolo, testo, CTA, immagine, strategia).
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Prodotto / Servizio</label>
            <input
              className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="Es. Piattaforma AI Ads Revolution"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Target</label>
            <input
              className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="Es. e-commerce in Italia, agenzie marketing..."
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Budget mensile (€)</label>
            <input
              className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              type="number"
              min={0}
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center rounded-lg bg-sky-500 hover:bg-sky-400 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {loading ? "Generazione in corso..." : "Genera campagna con AI"}
          </button>

          {error && (
            <div className="mt-4 text-sm text-red-400">
              Errore: {error}
            </div>
          )}

          {result && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">
                Risultato AI (JSON)
              </h2>
              <pre className="w-full whitespace-pre-wrap break-words text-xs bg-black/60 border border-slate-700 rounded-lg p-3">
                {result}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
