"use client";

import { useMemo, useState } from "react";

type Row = {
  name: string;
  status: "ENABLED" | "PAUSED";
  channel: "Search" | "Display" | "Performance Max";
  impressions: number;
  clicks: number;
  ctr: number;      // %
  cpc: number;      // €
  spend: number;    // €
  conv: number;
  roas: number;     // x
};

function fmtInt(n:number){ return n.toLocaleString("it-IT"); }
function fmtEur(n:number){ return n.toLocaleString("it-IT",{minimumFractionDigits:2, maximumFractionDigits:2})+" €"; }
function fmtPct(n:number){ return n.toLocaleString("it-IT",{minimumFractionDigits:2, maximumFractionDigits:2})+"%"; }
function fmtX(n:number){ return n.toLocaleString("it-IT",{minimumFractionDigits:2, maximumFractionDigits:2})+"x"; }

function Badge({ status }:{status: Row["status"]}) {
  const on = status === "ENABLED";
  return (
    <span
      style={{
        display:"inline-flex",
        alignItems:"center",
        gap:8,
        padding:"6px 10px",
        borderRadius:999,
        fontSize:12,
        border:"1px solid var(--border)",
        background: on ? "rgba(40,200,120,.10)" : "rgba(255,255,255,.04)",
        color: on ? "rgba(180,255,220,.95)" : "rgba(255,255,255,.75)",
        whiteSpace:"nowrap",
      }}
    >
      <span style={{ width:8, height:8, borderRadius:999, background: on ? "rgba(40,200,120,.9)" : "rgba(255,255,255,.25)" }} />
      {on ? "Attiva" : "In pausa"}
    </span>
  );
}

export default function CampaignsTable() {
  const [tab, setTab] = useState<"Campagne"|"Gruppi"|"Annunci">("Campagne");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"Tutti"|"Attive"|"In pausa">("Tutti");
  const [range, setRange] = useState("Ultimi 28 giorni");

  // DEMO rows (poi le colleghiamo ai dati reali)
  const rows: Row[] = [
    { name:"Website traffic-Search-1", status:"ENABLED", channel:"Search", impressions:0, clicks:0, ctr:0, cpc:0, spend:0, conv:0, roas:0 },
    { name:"Brand awareness-Display", status:"PAUSED", channel:"Display", impressions:0, clicks:0, ctr:0, cpc:0, spend:0, conv:0, roas:0 },
    { name:"Lead gen-Performance Max", status:"ENABLED", channel:"Performance Max", impressions:0, clicks:0, ctr:0, cpc:0, spend:0, conv:0, roas:0 },
  ];

  const filtered = useMemo(() => {
    return rows.filter(r => {
      if (status === "Attive" && r.status !== "ENABLED") return false;
      if (status === "In pausa" && r.status !== "PAUSED") return false;
      if (q && !r.name.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [rows, q, status]);

  return (
    <div style={{ display:"grid", gap:12 }}>
      {/* Toolbar */}
      <div
        style={{
          display:"flex",
          gap:10,
          flexWrap:"wrap",
          alignItems:"center",
          justifyContent:"space-between",
          padding:"12px 12px",
          borderRadius:14,
          border:"1px solid var(--border)",
          background:"rgba(255,255,255,.02)"
        }}
      >
        <div style={{ display:"flex", gap:10, flexWrap:"wrap", alignItems:"center" }}>
          {/* Tabs */}
          <div style={{ display:"inline-flex", border:"1px solid var(--border)", borderRadius:12, overflow:"hidden" }}>
            {(["Campagne","Gruppi","Annunci"] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding:"10px 12px",
                  border:0,
                  cursor:"pointer",
                  background: tab===t ? "rgba(79,110,247,.18)" : "transparent",
                  color: tab===t ? "white" : "rgba(255,255,255,.75)",
                  fontWeight: tab===t ? 700 : 600
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Range */}
          <select value={range} onChange={(e)=>setRange(e.target.value)} style={{ width: 190 }}>
            <option>Oggi</option>
            <option>Ieri</option>
            <option>Ultimi 7 giorni</option>
            <option>Ultimi 28 giorni</option>
            <option>Questo mese</option>
          </select>

          {/* Status filter */}
          <select value={status} onChange={(e)=>setStatus(e.target.value as any)} style={{ width: 160 }}>
            <option>Tutti</option>
            <option>Attive</option>
            <option>In pausa</option>
          </select>

          {/* Search */}
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Cerca campagna…" style={{ width: 260 }} />
        </div>

        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          <button className="meta-btn meta-btn-secondary">Colonne</button>
          <button className="meta-btn meta-btn-secondary">Esporta</button>
          <button className="meta-btn meta-btn-primary">Crea campagna</button>
        </div>
      </div>

      {/* Action bar */}
      <div style={{ display:"flex", gap:10, flexWrap:"wrap", alignItems:"center" }}>
        <button className="meta-btn meta-btn-secondary">Pausa</button>
        <button className="meta-btn meta-btn-secondary">Abilita</button>
        <button className="meta-btn meta-btn-secondary">Duplica</button>
        <span style={{ color:"var(--muted)", fontSize: 12 }}>
          {filtered.length} elementi • {range}
        </span>
      </div>

      {/* Table */}
      <div style={{ overflow:"auto", borderRadius: 12 }}>
        <table>
          <thead>
            <tr>
              <th style={{ minWidth: 260 }}>Nome</th>
              <th style={{ minWidth: 130 }}>Stato</th>
              <th style={{ minWidth: 160 }}>Canale</th>
              <th>Imp</th>
              <th>Click</th>
              <th>CTR</th>
              <th>CPC</th>
              <th>Spesa</th>
              <th>Conv</th>
              <th>ROAS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.name}>
                <td style={{ fontWeight: 650 }}>{r.name}</td>
                <td><Badge status={r.status} /></td>
                <td style={{ color:"rgba(255,255,255,.78)" }}>{r.channel}</td>
                <td>{fmtInt(r.impressions)}</td>
                <td>{fmtInt(r.clicks)}</td>
                <td>{fmtPct(r.ctr)}</td>
                <td>{fmtEur(r.cpc)}</td>
                <td>{fmtEur(r.spend)}</td>
                <td>{fmtInt(r.conv)}</td>
                <td>{fmtX(r.roas)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hint */}
      <div style={{ color:"var(--muted)", fontSize: 12, lineHeight: 1.6 }}>
        Nota: questa è la UI “Meta style”. Nel prossimo step colleghiamo i dati reali (Google Ads API / Supabase).
      </div>
    </div>
  );
}
