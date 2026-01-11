#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "== Creo KpiDashboard =="

cat > components/home-v2/KpiDashboard.tsx <<'EOF'
"use client";

import { useEffect, useState } from "react";
import UiCard from "./UiCard";

export default function KpiDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/metrics?days=28")
      .then(r => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data || !data.metrics) return null;

  return (
    <div className="mx-auto max-w-6xl px-5 -mt-10 relative z-10">
      <UiCard className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-300">LIVE</span>
            <span className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-300">AI ON</span>
          </div>
          <div className="text-xs text-zinc-400">
            Last updated: {data.lastUpdated ?? "—"}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.metrics.map((m: any) => (
            <div key={m.label}>
              <div className="text-xs text-zinc-400">{m.label}</div>
              <div className="text-2xl font-semibold mt-1">{m.value}</div>
            </div>
          ))}
        </div>
      </UiCard>
    </div>
  );
}
EOF

echo "== Patch page.tsx =="

sed -i.bak '/<Hero \/>/a\
      <KpiDashboard />' src/app/page.tsx

sed -i.bak '1s|^|import KpiDashboard from "@/components/home-v2/KpiDashboard";\n|' src/app/page.tsx

echo "== Clean & run =="
rm -rf .next
npm run dev
