"use client";

import { useEffect, useState } from "react";
import UiCard from "./UiCard";

type Metric = { label: string; value: string; delta?: string; note?: string };

export default function KpiBar() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [source, setSource] = useState<string>("");

  useEffect(() => {
    fetch("/api/metrics")
      .then((r) => r.json())
      .then((j) => {
        setMetrics(j.metrics ?? []);
        setSource(j.source ?? "");
      })
      .catch(() => {});
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-5 -mt-6 md:-mt-8">
      <UiCard className="p-4 md:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-zinc-300">KPI principali (Live)</div>
          <div className="text-xs text-zinc-400">source: {source || "loading"}</div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {metrics.map((m, i) => (
            <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-4">
              <div className="text-xs text-zinc-400">{m.label}</div>
              <div className="mt-2 text-2xl font-semibold">{m.value}</div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-zinc-400">{m.note || "—"}</span>
                {m.delta && <span className="text-emerald-300">{m.delta}</span>}
              </div>
            </div>
          ))}
        </div>
      </UiCard>
    </div>
  );
}
