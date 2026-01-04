"use client";
import { useEffect, useState } from "react";

type Overview = {
  dateRange: string;
  impressions: number;
  clicks: number;
  cost: number;
  avgCpc: number;
};

export default function GoogleAdsWidgets() {
  const [data, setData] = useState<Overview | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    setErr(null);
    const r = await fetch("/api/ads/overview", { cache: "no-store" });
    const j = await r.json();
    if (!r.ok) setErr(j?.error || j?.detail || "Errore");
    else setData(j);
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
      <Card title="Spesa oggi" value={data ? `€ ${data.cost.toFixed(2)}` : "—"} />
      <Card title="Click oggi" value={data ? `${data.clicks}` : "—"} />
      <Card title="Impression" value={data ? `${data.impressions}` : "—"} />
      <Card title="CPC medio" value={data ? `€ ${data.avgCpc.toFixed(2)}` : "—"} />
      {err && <div style={{ gridColumn: "1 / -1", color: "red" }}>{err}</div>}
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div style={{ border: "1px solid #222", borderRadius: 12, padding: 14 }}>
      <div style={{ opacity: 0.7, fontSize: 12 }}>{title}</div>
      <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>{value}</div>
    </div>
  );
}
