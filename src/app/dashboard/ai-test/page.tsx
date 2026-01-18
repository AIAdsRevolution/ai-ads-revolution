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
    tags?: string[];
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

  // ✅ nuovi campi per LOCALE / TICKET ALTO / B2B
  const [leads, setLeads] = useState<number>(0);
  const [qualifiedLeads, setQualifiedLeads] = useState<number>(0);
  const [unqualifiedLeads, setUnqualifiedLeads] = useState<number>(0);

  // ✅ flags avanzati
  const [marginGood, setMarginGood] = useState<"unknown" | "true" | "false">("unknown");
  const [randomSingleSaleAfterDry, setRandomSingleSaleAfterDry] = useState<boolean>(false);

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
        add_to_cart: Number(addToCart || 0),
        sales: Number(sales || 0),

        leads: Number(leads || 0),
        qualified_leads: Number(qualifiedLeads || 0),
        unqualified_leads: Number(unqualifiedLeads || 0),

        random_single_sale_after_dry: !!randomSingleSaleAfterDry,
      };

      if (marginGood !== "unknown") {
        payload.margin_good = marginGood === "true";
      }

      const r = await fetch(`${baseUrl.replace(/\/$/, "")}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!r.ok) {
        const t = await r.text();
        throw new Error(`HTTP ${r.status}: ${t}`);
      }

      const data = (await r.json()) as PredictResponse;

      setRes(data);

      // ✅ salva su Supabase (decision log) — tags + anti_illusion
      await fetch("/api/ai/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "ai-test",
          vertical,
          spend_eur: Number(spend || 0),
          clicks: Number(clicks || 0),
          days_active: Number(days || 1),
          add_to_cart: Number(addToCart || 0),
          sales: Number(sales || 0),

          leads: Number(leads || 0),
          qualified_leads: Number(qualifiedLeads || 0),
          unqualified_leads: Number(unqualifiedLeads || 0),

          decision: data?.final?.decision ?? null,
          confidence: data?.final?.confidence_rule ?? null,
          reason: data?.final?.reason ?? null,
          action: data?.final?.action ?? null,
          safety_limit: data?.final?.safety_limit ?? null,
          tags: (data as any)?.final?.tags ?? null,
          anti_illusion: data?.final?.anti_illusion ?? null,
        }),
      });
    } catch (e: any) {
      setErr(e?.message || "Errore sconosciuto");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold text-white">Test AI (Cervello)</h1>
      <p className="mt-1 text-sm text-white/70">
        Inserisci pochi numeri e premi Analizza. La pagina chiama il cervello su{" "}
        <span className="font-mono text-white/80">{baseUrl || "(manca env var)"}</span>.
      </p>

      {err && (
        <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200">
          {err}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Vertical">
            <select
              value={vertical}
              onChange={(e) => setVertical(e.target.value as Vertical)}
              className="h-10 w-full rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white/90 outline-none"
            >
              <option value="LOCALE">LOCALE</option>
              <option value="ECOMMERCE">ECOMMERCE</option>
              <option value="TICKET_ALTO">TICKET_ALTO</option>
              <option value="B2B">B2B</option>
            </select>
          </Field>

          <Field label="Spesa (€)">
            <input
              type="number"
              value={spend}
              onChange={(e) => setSpend(Number(e.target.value))}
              className="h-10 w-full rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white/90 outline-none"
            />
          </Field>

          <Field label="Click">
            <input
              type="number"
              value={clicks}
              onChange={(e) => setClicks(Number(e.target.value))}
              className="h-10 w-full rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white/90 outline-none"
            />
          </Field>

          <Field label="Giorni attivi">
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="h-10 w-full rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white/90 outline-none"
            />
          </Field>

          <Field label="Add to cart (se ecommerce)">
            <input
              type="number"
              value={addToCart}
              onChange={(e) => setAddToCart(Number(e.target.value))}
              className="h-10 w-full rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white/90 outline-none"
            />
          </Field>

          <Field label="Vendite (se ecommerce)">
            <input
              type="number"
              value={sales}
              onChange={(e) => setSales(Number(e.target.value))}
              className="h-10 w-full rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white/90 outline-none"
            />
          </Field>

          <Field label="Leads (LOCALE/B2B/TICKET ALTO)">
            <input
              type="number"
              value={leads}
              onChange={(e) => setLeads(Number(e.target.value))}
              className="h-10 w-full rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white/90 outline-none"
            />
          </Field>

          <Field label="Leads qualificati">
            <input
              type="number"
              value={qualifiedLeads}
              onChange={(e) => setQualifiedLeads(Number(e.target.value))}
              className="h-10 w-full rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white/90 outline-none"
            />
          </Field>

          <Field label="Leads non qualificati">
            <input
              type="number"
              value={unqualifiedLeads}
              onChange={(e) => setUnqualifiedLeads(Number(e.target.value))}
              className="h-10 w-full rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white/90 outline-none"
            />
          </Field>

          <Field label="Margine buono? (ecommerce)">
            <select
              value={marginGood}
              onChange={(e) => setMarginGood(e.target.value as any)}
              className="h-10 w-full rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white/90 outline-none"
            >
              <option value="unknown">Non so</option>
              <option value="true">Sì</option>
              <option value="false">No</option>
            </select>
          </Field>
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <label className="flex items-center gap-2 text-sm text-white/80">
            <input
              type="checkbox"
              checked={randomSingleSaleAfterDry}
              onChange={(e) => setRandomSingleSaleAfterDry(e.target.checked)}
            />
            Flag “vendita singola dopo giorni di nulla” (anti-illusione)
          </label>

          <button
            onClick={run}
            disabled={loading}
            className="h-10 rounded-xl border border-white/10 bg-white/10 px-4 text-sm font-semibold text-white hover:bg-white/15 disabled:opacity-60"
          >
            {loading ? "Analizzo..." : "Analizza"}
          </button>
        </div>
      </div>

      {res?.final && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm text-white/60">Decisione</div>
            {decision && (
              <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${decisionBadge}`}>
                {decision}
              </span>
            )}
          </div>

          <div className="mt-2 text-sm text-white/70">
            Confidence: <span className="text-white/90 font-semibold">{res.final.confidence_rule ?? "-"}</span>
          </div>

          {res.final.tags?.length ? (
            <div className="mt-2 text-xs text-white/70">
              TAG: <span className="text-white/90">{res.final.tags.join(", ")}</span>
            </div>
          ) : null}

          <div className="mt-4">
            <div className="text-sm text-white/60">Perché</div>
            <div className="mt-1 text-white/90">{res.final.reason || "-"}</div>
          </div>

          <div className="mt-4">
            <div className="text-sm text-white/60">Cosa fare</div>
            <div className="mt-1 text-white/90">{res.final.action || "-"}</div>
          </div>

          <div className="mt-4">
            <div className="text-sm text-white/60">Limite sicurezza</div>
            <div className="mt-1 text-white/90">{res.final.safety_limit || "-"}</div>
          </div>

          {res.final.anti_illusion?.triggered ? (
            <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-500/10 p-3">
              <div className="text-sm font-semibold text-amber-200">
                {res.final.anti_illusion.title || "Avviso Anti-Illusione"}
              </div>
              <div className="mt-1 text-sm text-amber-100/90">
                {res.final.anti_illusion.message || "Possibile rumore statistico."}
              </div>
            </div>
          ) : null}

          <div className="mt-4 text-xs text-white/50">
            Percorso pagina: <span className="font-mono text-white/70">/dashboard/ai-test</span>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: any }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-white/60">{label}</label>
      {children}
    </div>
  );
}
