"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type CampaignRow = {
  id: string;
  name: string;
  status: "ENABLED" | "PAUSED";
  channel: "Search" | "Performance Max" | "Display";
  budgetDaily: number;
  impressions: number;
  clicks: number;
  ctr: number;
  spend: number;
  roas: number;
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-slate-800 bg-slate-900/40 px-3 py-1 text-[11px] font-semibold text-slate-300">
      {children}
    </span>
  );
}

function Button({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
}) {
  const cls =
    variant === "primary"
      ? "rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-900"
      : "rounded-xl border border-slate-800 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-900/40";
  return href ? <Link className={cls} href={href}>{children}</Link> : <button className={cls}>{children}</button>;
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-3 py-2 text-left text-[11px] font-semibold text-slate-400">{children}</th>;
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-3 py-2 text-sm text-slate-200">{children}</td>;
}

export default function CampaignsPage() {
  const [q, setQ] = useState("");
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [status, setStatus] = useState<"ALL" | "ENABLED" | "PAUSED">("ALL");
  const [channel, setChannel] = useState<"ALL" | CampaignRow["channel"]>("ALL");

  const rows: CampaignRow[] = useMemo(() => [], []);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (status !== "ALL" && r.status !== status) return false;
      if (channel !== "ALL" && r.channel !== channel) return false;
      if (qq && !(r.name.toLowerCase().includes(qq) || r.id.toLowerCase().includes(qq))) return false;
      return true;
    });
  }, [rows, q, status, channel]);

  const totals = useMemo(() => {
    const imp = filtered.reduce((a, r) => a + r.impressions, 0);
    const clk = filtered.reduce((a, r) => a + r.clicks, 0);
    const spend = filtered.reduce((a, r) => a + r.spend, 0);
    const ctr = imp > 0 ? (clk / imp) * 100 : 0;
    const roas = filtered.length ? filtered.reduce((a, r) => a + r.roas, 0) / filtered.length : 0;
    return { imp, clk, spend, ctr, roas };
  }, [filtered]);

  return (
    <div className="p-6">
      {errorBanner && (
        <div className="mb-4 rounded-2xl border border-amber-900/50 bg-amber-950/25 p-4">
          <div className="text-sm font-semibold text-amber-200">Avviso</div>
          <div className="mt-1 text-sm text-amber-300">{errorBanner}</div>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xl font-semibold text-slate-100">Campagne</div>
          <div className="mt-1 text-sm text-slate-500">Gestisci campagne, filtri e performance in stile Google Ads.</div>
        </div>
        <div className="flex items-center gap-2">
          <Button href="/dashboard">Overview</Button>
          <Button href="/dashboard/settings" variant="secondary">Impostazioni</Button>
          <Button href="/dashboard/campaigns/new">+ Crea campagna</Button>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cerca per nome o ID campagna"
            className="w-full sm:w-80 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-700"
          />
          <div className="flex items-center gap-2">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:outline-none"
            >
              <option value="ALL">Stato: Tutti</option>
              <option value="ENABLED">Stato: Attive</option>
              <option value="PAUSED">Stato: In pausa</option>
            </select>
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value as any)}
              className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:outline-none"
            >
              <option value="ALL">Canale: Tutti</option>
              <option value="Search">Search</option>
              <option value="Performance Max">Performance Max</option>
              <option value="Display">Display</option>
            </select>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-2">
            <Pill>Impr: {totals.imp.toLocaleString("it-IT")}</Pill>
            <Pill>Click: {totals.clk.toLocaleString("it-IT")}</Pill>
            <Pill>CTR: {totals.ctr.toFixed(2)}%</Pill>
            <Pill>Spesa: € {totals.spend.toFixed(2)}</Pill>
            <Pill>ROAS: {totals.roas.toFixed(2)}x</Pill>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden">
        <div className="border-b border-slate-800 px-4 py-3 flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-200">Elenco campagne</div>
          <div className="text-xs text-slate-500">Ultimi 28 giorni · Realtime (quando collegato)</div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
              <div className="text-base font-semibold text-slate-100">Nessuna campagna trovata</div>
              <div className="mt-2 text-sm text-slate-500">
                Collega un account Ads oppure crea una campagna per iniziare. Quando arrivano i primi dati,
                la tabella mostrerà performance e insight AI.
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button href="/dashboard/campaigns/new">+ Crea campagna</Button>
                <Button href="/dashboard/settings" variant="secondary">Collega account Ads</Button>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <div className="text-xs font-semibold text-slate-300">Suggerimento AI</div>
                  <div className="mt-1 text-sm text-slate-500">Imposta un obiettivo (vendite/lead) e lascia AI Learning calibrare la baseline.</div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <div className="text-xs font-semibold text-slate-300">Qualità dati</div>
                  <div className="mt-1 text-sm text-slate-500">Dopo 48–72h di dati, il sistema può iniziare ottimizzazioni graduali.</div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <div className="text-xs font-semibold text-slate-300">Trasparenza</div>
                  <div className="mt-1 text-sm text-slate-500">Ogni decisione AI sarà tracciata in “Registro decisioni”.</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full">
              <thead className="bg-slate-950">
                <tr className="border-b border-slate-800">
                  <Th>Nome</Th>
                  <Th>Stato</Th>
                  <Th>Canale</Th>
                  <Th>Budget/dì</Th>
                  <Th>Impr</Th>
                  <Th>Click</Th>
                  <Th>CTR</Th>
                  <Th>Spesa</Th>
                  <Th>ROAS</Th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-slate-900 hover:bg-slate-900/30">
                    <Td>
                      <div className="font-semibold text-slate-100">{r.name}</div>
                      <div className="text-xs text-slate-500">{r.id}</div>
                    </Td>
                    <Td>
                      <span className={`rounded-full px-2 py-1 text-[11px] font-semibold border ${
                        r.status === "ENABLED"
                          ? "border-emerald-900/60 bg-emerald-950/30 text-emerald-200"
                          : "border-slate-800 bg-slate-950 text-slate-300"
                      }`}>
                        {r.status === "ENABLED" ? "Attiva" : "In pausa"}
                      </span>
                    </Td>
                    <Td>{r.channel}</Td>
                    <Td className="tabular-nums">€ {r.budgetDaily.toFixed(2)}</Td>
                    <Td className="tabular-nums">{r.impressions.toLocaleString("it-IT")}</Td>
                    <Td className="tabular-nums">{r.clicks.toLocaleString("it-IT")}</Td>
                    <Td className="tabular-nums">{r.ctr.toFixed(2)}%</Td>
                    <Td className="tabular-nums">€ {r.spend.toFixed(2)}</Td>
                    <Td className="tabular-nums">{r.roas.toFixed(2)}x</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-slate-600">
        Nota: in questa fase, i dati sono mostrati quando colleghi un account Ads o quando AI-Core scrive su Supabase.
      </div>
    </div>
  );
}
