"use client";
import { useEffect, useState } from "react";

export default function GoogleAdsConnectPage() {
  const [status, setStatus] = useState("Controllo stato...");
  const [connected, setConnected] = useState(false);

  async function refreshStatus() {
    try {
      const r = await fetch("/api/google/status", { cache: "no-store" });
      const j = await r.json();
      setConnected(!!j.connected);
      setStatus(j.connected ? `✅ Connesso (customer_id: ${j.customer_id || "ok"})` : "❌ Non connesso");
    } catch {
      setStatus("⚠️ Errore nel controllo stato");
    }
  }

  useEffect(() => { refreshStatus(); }, []);

  async function startConnect() {
    const r = await fetch("/api/google/start", { method: "POST" });
    const j = await r.json();
    if (j?.url) window.location.href = j.url;
  }

  async function syncNow() {
    setStatus("⏳ Sync in corso...");
    const r = await fetch("/api/google/sync", { method: "POST" });
    const j = await r.json();
    setStatus(j?.ok ? `✅ Sync completato: ${j.inserted || 0}` : `❌ Sync fallito: ${j.error || "unknown"}`);
    refreshStatus();
  }

  return (
    <div style={{ padding: 24, maxWidth: 780 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Google Ads</h1>
      <p style={{ opacity: 0.8, marginBottom: 18 }}>
        Collega Google Ads per importare metriche reali e alimentare il cervello neurale.
      </p>

      <div style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: 18 }}>
        <div style={{ marginBottom: 12, fontWeight: 700 }}>
          Stato: <span style={{ fontWeight: 600 }}>{status}</span>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button onClick={startConnect} style={{ padding: "10px 14px", borderRadius: 12, cursor: "pointer", fontWeight: 700 }}>
            🔗 Connetti Google Ads
          </button>

          <button onClick={syncNow} disabled={!connected} style={{ padding: "10px 14px", borderRadius: 12, cursor: connected ? "pointer" : "not-allowed", fontWeight: 700, opacity: connected ? 1 : 0.5 }}>
            ⬇️ Importa dati (Sync)
          </button>

          <button onClick={refreshStatus} style={{ padding: "10px 14px", borderRadius: 12, cursor: "pointer", fontWeight: 700 }}>
            🔄 Aggiorna stato
          </button>
        </div>
      </div>
    </div>
  );
}
