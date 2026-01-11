"use client";

import { useMemo } from "react";

export function SkeletonBar() {
  return (
    <div className="h-2 w-full rounded-full bg-slate-900/70 overflow-hidden relative">
      <div className="absolute inset-0 animate-pulse bg-slate-800/60" />
    </div>
  );
}

export function SparklineCard({
  title,
  subtitle,
  pill = "Realtime",
  data,
}: {
  title: string;
  subtitle: string;
  pill?: string;
  data: number[];
}) {
  const { d, hasData } = useMemo(() => {
    if (!data || data.length < 2) return { d: "", hasData: false };
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = Math.max(1e-9, max - min);

    const w = 260;
    const h = 56;
    const pad = 6;

    const pts = data.map((v, i) => {
      const x = pad + (i * (w - pad * 2)) / (data.length - 1);
      const y = pad + (h - pad * 2) * (1 - (v - min) / range);
      return [x, y];
    });

    const path = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
    return { d: path, hasData: data.some((x) => x !== 0) };
  }, [data]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-slate-200">{title}</div>
          <div className="mt-1 text-sm text-slate-500">{hasData ? subtitle : "In attesa dei primi dati reali"}</div>
        </div>
        <span className="rounded-full border border-slate-800 bg-slate-900/40 px-3 py-1 text-[11px] font-semibold text-slate-300">
          {pill}
        </span>
      </div>

      <div className="mt-4">
        {d ? (
          <svg width="100%" viewBox="0 0 260 56" className="block">
            <path d={d} fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-200" />
          </svg>
        ) : (
          <div className="space-y-2">
            <SkeletonBar />
            <SkeletonBar />
            <SkeletonBar />
          </div>
        )}
      </div>
    </div>
  );
}
