"use client";
import { useEffect, useMemo, useState } from "react";

type Campaign = {
  id?: string;
  name?: string;
  status?: string;
  impressions: number;
  clicks: number;
  costEUR: number;
  ctr: number;
  cpc: number;
  conversions: number;
  convValue: number;
  roas: number;
};

type Summary = {
  ok: boolean;
  apiVersion?: string;
  customerId: string;
  loginCustomerId: string | null;
  range: { days: number; start: string; end: string };
  totals: {
    impressions: number;
    clicks: number;
    costEUR: number;
    conversions: number;
    convValue: number;
    ctr: number;
    cpc: number;
    roas: number;
  };
  campaignsCount: number;
  campaigns: Campaign[];
  diagnostics?: { adsCount: number | null; adGroupsCount: number | null; issues: string[] };
};

const fmtEUR = (n: number) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(n || 0);
const fmtNum = (n: number) => new Intl.NumberFormat("it-IT").format(n || 0);
const fmtPct = (n: number) => (n || 0).toFixed(2) + "%";

export default function GoogleAdsLive() {
  const [days, setDays] = useState<7 | 14 | 28 | 90>(28);
  const [data, setData] = useState<Summary | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const query = useMemo(() => `/api/googleads/summary?days=${days}`, [days]);

  async function load() {
    try {
      setLoading(true);
      setErr(null);
      const r = await fetch(query, { cache: "no-store" });
      const j = await r.json();
      if (!r.ok || !j?.ok) {
        setData(null);
        setErr(j?.error || j?.step || "Errore Google Ads");
      } else {
        setData(j);
      }
    } catch (e: any) {
      setData(null);
      setErr(e?.message || "Errore rete");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 30000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const issues = data?.diagnostics?.issues || [];
  const hasIssues = issues.length > 0;

  return (
    <section className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Google Ads LIVE</h2>

            {data && (
              <span
                className={`rounded-full border px-2 py-0.5 text-xs ${
                  hasIssues
                    ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-200"
                    : "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                }`}
              >
                {hasIssues ? "Attenzione" : "OK"}
              </span>
            )}
          </div>

          <p className="text-sm opacity-70">
            {data
              ? `Customer ${data.customerId} · MCC ${data.loginCustomerId || "—"} · ${data.range.start} → ${data.range.end} (${data.range.days}g)`
              : "Recupero dati..."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value) as any)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
            aria-label="Intervallo"
          >
            <option value={7}>Ultimi 7 giorni</option>
            <option value={14}>Ultimi 14 giorni</option>
            <option value={28}>Ultimi 28 giorni</option>
            <option value={90}>Ultimi 90 giorni</option>
          </select>

          <button
            onClick={load}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
          >
            {loading ? "Aggiorno..." : "Aggiorna"}
          </button>
        </div>
      </div>

      {err && (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm">
          <div className="font-semibold">Errore Google Ads</div>
          <div className="opacity-80">{err}</div>
        </div>
      )}

      {data && hasIssues && (
        <div className="mt-4 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-3 text-sm">
          <div className="font-semibold">Diagnostica</div>
          <ul className="mt-1 list-disc pl-5 opacity-90">
            {issues.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
          <div className="mt-2 text-xs opacity-70">
            Ads: {data.diagnostics?.adsCount ?? "—"} · AdGroups: {data.diagnostics?.adGroupsCount ?? "—"}
          </div>
        </div>
      )}

      {data && (
        <>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs opacity-70">Impression</div>
              <div className="mt-1 text-2xl font-semibold">{fmtNum(data.totals.impressions)}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs opacity-70">Click</div>
              <div className="mt-1 text-2xl font-semibold">{fmtNum(data.totals.clicks)}</div>
              <div className="mt-1 text-xs opacity-70">CTR {fmtPct(data.totals.ctr)}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs opacity-70">Spesa</div>
              <div className="mt-1 text-2xl font-semibold">{fmtEUR(data.totals.costEUR)}</div>
              <div className="mt-1 text-xs opacity-70">CPC {fmtEUR(data.totals.cpc)}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs opacity-70">ROAS</div>
              <div className="mt-1 text-2xl font-semibold">{(data.totals.roas || 0).toFixed(2)}x</div>
              <div className="mt-1 text-xs opacity-70">
                Conv {fmtNum(data.totals.conversions)} · Val {fmtEUR(data.totals.convValue)}
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-white/5 text-xs opacity-80">
                  <tr>
                    <th className="px-3 py-2">Nome</th>
                    <th className="px-3 py-2">Stato</th>
                    <th className="px-3 py-2">Imp</th>
                    <th className="px-3 py-2">Click</th>
                    <th className="px-3 py-2">CTR</th>
                    <th className="px-3 py-2">CPC</th>
                    <th className="px-3 py-2">Spesa</th>
                    <th className="px-3 py-2">Conv</th>
                    <th className="px-3 py-2">ROAS</th>
                  </tr>
                </thead>
                <tbody>
                  {data.campaigns.map((c) => (
                    <tr key={c.id || c.name} className="border-t border-white/10">
                      <td className="px-3 py-2 font-medium">{c.name || c.id}</td>
                      <td className="px-3 py-2">{c.status || "—"}</td>
                      <td className="px-3 py-2">{fmtNum(c.impressions)}</td>
                      <td className="px-3 py-2">{fmtNum(c.clicks)}</td>
                      <td className="px-3 py-2">{fmtPct(c.ctr)}</td>
                      <td className="px-3 py-2">{fmtEUR(c.cpc)}</td>
                      <td className="px-3 py-2">{fmtEUR(c.costEUR)}</td>
                      <td className="px-3 py-2">{fmtNum(c.conversions)}</td>
                      <td className="px-3 py-2">{(c.roas || 0).toFixed(2)}x</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
