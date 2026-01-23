"use client";

import { useEffect, useState } from "react";

type Kpi = {
  ok: boolean;
  days: number;
  clicks: number;
  impressions: number;
  ctr: number;
  cpc: number;
  spend: number;
  error?: string;
  message?: string;
};

function fmtMoney(n: number) {
  if (!isFinite(n)) return "€ 0,00";
  return new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(n);
}
function fmtPct(n: number) {
  if (!isFinite(n)) return "0,0%";
  return `${n.toFixed(1)}%`;
}
function fmtNum(n: number) {
  if (!isFinite(n)) return "0";
  return new Intl.NumberFormat("it-IT").format(n);
}

export default function KpiLivePreview({ days = 28 }: { days?: number }) {
  const [data, setData] = useState<Kpi | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const r = await fetch(`/api/google/kpi?days=${days}`, { cache: "no-store" });
        const j = (await r.json()) as Kpi;
        if (alive) setData(j);
      } catch (e: any) {
        if (alive)
          setData({
            ok: false,
            days,
            clicks: 0,
            impressions: 0,
            ctr: 0,
            cpc: 0,
            spend: 0,
            error: "fetch_error",
            message: String(e?.message || e),
          });
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [days]);

  const ok = !!data?.ok;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold">Performance preview</div>
        <div className="text-xs opacity-70">
          AI Neural Campaign Engine • ultimi {days} giorni •{" "}
          <span className={ok ? "text-emerald-600" : "text-slate-500"}>
            {loading ? "..." : ok ? "LIVE" : "—"}
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div className="rounded-xl border border-slate-200 p-3">
          <div className="text-xs opacity-70">Clicks</div>
          <div className="text-lg font-semibold">{loading ? "…" : fmtNum(data?.clicks ?? 0)}</div>
        </div>
        <div className="rounded-xl border border-slate-200 p-3">
          <div className="text-xs opacity-70">Impressions</div>
          <div className="text-lg font-semibold">{loading ? "…" : fmtNum(data?.impressions ?? 0)}</div>
        </div>
        <div className="rounded-xl border border-slate-200 p-3">
          <div className="text-xs opacity-70">CTR medio</div>
          <div className="text-lg font-semibold">{loading ? "…" : fmtPct(data?.ctr ?? 0)}</div>
        </div>
        <div className="rounded-xl border border-slate-200 p-3">
          <div className="text-xs opacity-70">CPC medio</div>
          <div className="text-lg font-semibold">{loading ? "…" : fmtMoney(data?.cpc ?? 0)}</div>
        </div>
        <div className="rounded-xl border border-slate-200 p-3">
          <div className="text-xs opacity-70">Spesa</div>
          <div className="text-lg font-semibold">{loading ? "…" : fmtMoney(data?.spend ?? 0)}</div>
        </div>
      </div>

      {!loading && data && !data.ok ? (
        <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
          <div className="font-semibold">Google Ads non disponibile</div>
          <div className="opacity-80">
            {data.error || "error"} — {data.message || "unknown"}
          </div>
        </div>
      ) : null}
    </div>
  );
}
