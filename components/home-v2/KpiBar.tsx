"use client";
import { useEffect, useState } from "react";
import UiCard from "./UiCard";

export default function KpiBar() {
  const [metrics, setMetrics] = useState<any[]>([]);
  useEffect(() => { fetch("/api/metrics").then(r => r.json()).then(d => setMetrics(d.metrics || [])); }, []);
  return (
    <div className="mx-auto max-w-6xl px-5 -mt-6">
      <UiCard>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <div key={i}>
              <div className="text-xs text-zinc-400">{m.label}</div>
              <div className="text-xl font-semibold">{m.value}</div>
            </div>
          ))}
        </div>
      </UiCard>
    </div>
  );
}
