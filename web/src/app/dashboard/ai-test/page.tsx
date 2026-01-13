"use client";

import { useMemo, useState } from "react";

type Vertical = "LOCALE" | "ECOMMERCE" | "TICKET_ALTO" | "B2B";

type PredictResponse = {
  final?: {
    decision?: "CONTINUA" | "MIGLIORA" | "FERMA";
    reason?: string;
    action?: string;
    safety_limit?: string;
    vertical_used?: string;
    confidence_rule?: number;
    anti_illusion?: {
      triggered?: boolean;
      title?: string | null;
      message?: string | null;
      tags?: string[];
    };
  };
};

export default function AITestPage() {
  const baseUrl = process.env.NEXT_PUBLIC_AIADS_API_BASE_URL;

  const [vertical, setVertical] = useState<Vertical>("ECOMMERCE");
  const [spend, setSpend] = useState<number>(120);
  const [clicks, setClicks] = useState<number>(250);
  const [days, setDays] = useState<number>(3);
  const [addToCart, setAddToCart] = useState<number>(10);
  const [sales, setSales] = useState<number>(0);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [res, setRes] = useState<PredictResponse | null>(null);

  const decision = res?.final?.decision;

  const decisionBadge = useMemo(() => {
    if (!decision) return null;
    const map: Record<string, string> = {
      CONTINUA: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
      MIGLIORA: "border-amber-500/40 bg-amber-500/10 text-amber-200",
      FERMA: "border-rose-500/40 bg-rose-500/10 text-rose-200",
    };
    return map[decision] ?? "border-white/20 bg-white/5 text-white";
  }, [decision]);

  async function run() {
    setErr(null);
    setRes(null);

    if (!baseUrl) {
      setErr(
        "Manca NEXT_PUBLIC_AIADS_API_BASE_URL. Vai su Render (servizio web) → Environment e aggiungila, poi redeploy."
      );
      return;
    }

    setLoading(true);
    try {
      const payload: any = {
        vertical,
        spend_eur: Number(spend || 0),
        clicks: Number(clicks || 0),
        days_active: Number(days || 1),
      };

      // solo per ecommerce ha senso ATC/sales, ma non fa danni se li mandi sempre
      payload.add_to_cart = Number(addToCart || 0);
      payload.sales = Number(sales || 0);

      const r = await fetch(`${baseUrl.replace(/\/$/, "")}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!r.ok) {
        const t = await r.text().catch(() => "");
        throw new Error(`API error ${r.status}: ${t || "no body"}`);
      }

      const data = (await r.json()) as PredictResponse;
      setRes(data);
    } catch (e: any) {
      setErr(e?.message || "Errore sconosciuto");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Test AI (Cervello)</h1>
        <p className="mt-1 text-sm text-white/70">
          Inserisci 4–6 numeri e premi <span className="font-semibold">Analizza</span>.
          La pagina chiama il cervello su{" "}
          <span className="font-mono text-white/80">{baseUrl || "(non configurato)"}</span>.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <div className="mb-1 text-xs text-white/70">Vertical</div>
            <select
              className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none"
              value={vertical}
              onChange={(e) => setVertical(e.target.value as Vertical)}
            >
              <option value="ECOMMERCE">ECOMMERCE</option>
              <option value="LOCALE">LOCALE</option>
              <option value="B2B">B2B</option>
              <option value="TICKET_ALTO">TICKET ALTO</option>
            </select>
          </label>

          <label className="block">
            <div className="mb-1 text-xs text-white/70">Spesa (€)</div>
            <input
              type="number"
              className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none"
              value={spend}
              onChange={(e) => setSpend(Number(e.target.value))}
              min={0}
            />
          </label>

          <label className="block">
            <div className="mb-1 text-xs text-white/70">Click</div>
            <input
              type="number"
              className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none"
              value={clicks}
              onChange={(e) => setClicks(Number(e.target.value))}
              min={0}
            />
          </label>

          <label className="block">
            <div className="mb-1 text-xs text-white/70">Giorni attivi</div>
            <input
              type="number"
              className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              min={1}
            />
          </label>

          <label className="block">
            <div className="mb-1 text-xs text-white/70">Add to cart (se ecommerce)</div>
            <input
              type="number"
              className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none"
              value={addToCart}
              onChange={(e) => setAddToCart(Number(e.target.value))}
              min={0}
            />
          </label>

          <label className="block">
            <div className="mb-1 text-xs text-white/70">Vendite (se ecommerce)</div>
            <input
              type="number"
              className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none"
              value={sales}
              onChange={(e) => setSales(Number(e.target.value))}
              min={0}
            />
          </label>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={run}
            disabled={loading}
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black disabled:opacity-60"
          >
            {loading ? "Analizzo..." : "Analizza"}
          </button>

          {err && (
            <div className="text-sm text-rose-300">
              {err}
            </div>
          )}
        </div>
      </div>

      {res?.final && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="text-sm text-white/70">Decisione</div>
            <div className={`rounded-full border px-3 py-1 text-sm font-semibold ${decisionBadge || ""}`}>
              {res.final.decision}
            </div>
            <div className="ml-auto text-xs text-white/50">
              Confidence: {res.final.confidence_rule ?? "-"}
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div>
              <div className="text-xs text-white/60">Perché</div>
              <div className="text-sm text-white">{res.final.reason}</div>
            </div>
            <div>
              <div className="text-xs text-white/60">Cosa fare</div>
              <div className="text-sm text-white">{res.final.action}</div>
            </div>
            <div>
              <div className="text-xs text-white/60">Limite sicurezza</div>
              <div className="text-sm text-white">{res.final.safety_limit}</div>
            </div>
          </div>

          {res.final.anti_illusion?.triggered && (
            <div className="mt-5 rounded-2xl border border-fuchsia-500/30 bg-fuchsia-500/10 p-4">
              <div className="text-xs font-semibold text-fuchsia-200">
                {res.final.anti_illusion.title || "Avviso Anti-Illusione"}
              </div>
              <div className="mt-1 text-sm text-fuchsia-100">
                {res.final.anti_illusion.message}
              </div>
              {Array.isArray(res.final.anti_illusion.tags) && res.final.anti_illusion.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {res.final.anti_illusion.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-fuchsia-400/30 bg-black/30 px-2 py-0.5 text-xs text-fuchsia-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="mt-6 text-xs text-white/50">
        Percorso pagina: <span className="font-mono text-white/70">/dashboard/ai-test</span>
      </div>
    </div>
  );
}
