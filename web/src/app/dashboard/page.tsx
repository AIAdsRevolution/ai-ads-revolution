"use client";

import Link from "next/link";
import { useMemo } from "react";
import { SparklineCard } from "../../components/dashboard/SparklineCard";

function StatCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 shadow-sm">
      <div className="text-[12px] font-medium text-slate-400">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-slate-100 tabular-nums">{value}</div>
      <div className="mt-1 text-[12px] text-slate-500">{note}</div>
    </div>
  );
}

function EmptyPanel({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
      <div className="text-sm font-semibold text-slate-200">{title}</div>
      <div className="mt-1 text-sm text-slate-500">{subtitle}</div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href="/dashboard/campaigns"
          className="rounded-xl border border-slate-700 bg-slate-900/40 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-900"
        >
          Vai a Campagne
        </Link>
        <Link
          href="/dashboard/settings"
          className="rounded-xl border border-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-900/40"
        >
          Impostazioni
        </Link>
      </div>
    </div>
  );
}

export default function DashboardOverview() {
  const trend = useMemo(() => Array.from({ length: 28 }, () => 0), []);

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xl font-semibold text-slate-100">AI Ads Revolution</div>
          <div className="mt-1 text-sm text-slate-500">Dashboard inserzionista · Motore neurale di advertising</div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/campaigns"
            className="rounded-xl border border-slate-800 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-900/40"
          >
            Campagne
          </Link>
          <Link
            href="/dashboard/settings"
            className="rounded-xl border border-slate-700 bg-slate-900/40 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-900"
          >
            Impostazioni
          </Link>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SparklineCard title="Trend 28 giorni" subtitle="Andamento impression/click (baseline)" pill="Realtime" data={trend} />
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-slate-200">Stato sistema AI</div>
              <div className="mt-1 text-sm text-slate-500">Sistema operativo · AI Learning</div>
            </div>
            <span className="rounded-full border border-emerald-900/50 bg-emerald-950/40 px-3 py-1 text-[11px] font-semibold text-emerald-200">
              Stabile
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3">
            <StatCard label="CTR medio" value="—" note="Baseline in definizione" />
            <StatCard label="CPC medio" value="—" note="Ottimizzazione in corso" />
            <StatCard label="ROAS medio" value="—" note="Modello in apprendimento" />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-sm font-semibold text-slate-200">Registro decisioni del sistema</div>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li>• Analisi iniziale completata</li>
            <li>• Nessuna riallocazione budget (fase di calibrazione)</li>
            <li>• Strategia bidding in osservazione</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-sm font-semibold text-slate-200">Perché il sistema ha deciso così</div>
          <div className="mt-3 text-sm text-slate-500 space-y-3">
            <div>
              <div className="text-xs font-semibold text-slate-300">Contesto account</div>
              <div className="mt-1">• Account in fase iniziale</div>
              <div>• Priorità: stabilità e raccolta segnali</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-300">Valutazione sistema</div>
              <div className="mt-1">• Dati insufficienti per ottimizzazioni aggressive</div>
              <div>• Calibrazione baseline KPI in corso</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-300">Decisione</div>
              <div className="mt-1">• Nessuna riallocazione budget</div>
              <div>• Monitoraggio attivo e aggiornamento progressivo</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <EmptyPanel
          title="Ultime metriche campagna"
          subtitle="Le performance appariranno qui non appena il sistema riceve dati dalle campagne collegate."
        />
        <EmptyPanel
          title="Prossimi grafici realtime"
          subtitle="Qui vedrai trend giornalieri, distribuzione budget e ROAS per canale, con animazioni stile exchange."
        />
      </div>
    </div>
  );
}
