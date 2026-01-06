"use client";

import { useEffect, useState } from "react";

export function AIMetrics() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/ai/metrics", { cache: "no-store" });
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  if (!data) {
    return (
      <div className="text-slate-400 text-sm">
        Caricamento motore AI…
      </div>
    );
  }

  const ctr = (data.ctr * 100).toFixed(1);
  const cpc = data.cpc.toFixed(2);
  const roas = data.roas.toFixed(1);

  return (
    <div className="flex flex-col gap-2 text-sm text-slate-100">
      <div className="flex gap-6 flex-wrap">
        <div>
          <div className="text-xs uppercase text-slate-400 tracking-wide">
            CTR medio
          </div>
          <div className="text-lg font-semibold">+{ctr}%</div>
        </div>
        <div>
          <div className="text-xs uppercase text-slate-400 tracking-wide">
            CPC medio
          </div>
          <div className="text-lg font-semibold">€{cpc}</div>
        </div>
        <div>
          <div className="text-xs uppercase text-slate-400 tracking-wide">
            ROAS medio
          </div>
          <div className="text-lg font-semibold">{roas}x</div>
        </div>
      </div>

      <div className="text-xs text-slate-400">
        Intento di acquisto{" "}
        <span className="font-semibold text-emerald-300">
          {data.intent}
        </span>{" "}
        · AI {data.ai_on ? "ON" : "OFF"}
      </div>
    </div>
  );
}

