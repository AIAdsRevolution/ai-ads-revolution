"use client";

import Link from "next/link";

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
      <div className="flex items-center gap-2">
        <span className="rounded-full border border-slate-800 bg-slate-900/40 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
          {n}
        </span>
        <div className="text-sm font-semibold text-slate-200">{title}</div>
      </div>
      <div className="mt-2 text-sm text-slate-500">{desc}</div>
    </div>
  );
}

export default function NewCampaignWizard() {
  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xl font-semibold text-slate-100">Crea campagna</div>
          <div className="mt-1 text-sm text-slate-500">Wizard guidato stile Google Ads (versione UI).</div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/campaigns" className="rounded-xl border border-slate-800 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-900/40">
            Torna a Campagne
          </Link>
          <Link href="/dashboard/settings" className="rounded-xl border border-slate-700 bg-slate-900/40 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-900">
            Collega account Ads
          </Link>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Step n="1" title="Obiettivo" desc="Scegli: Vendite, Lead, Traffico. L’AI adegua bidding e creatività." />
          <Step n="2" title="Budget & pacing" desc="Imposta budget giornaliero. Il sistema gestisce distribuzione e limiti." />
          <Step n="3" title="Creatività" desc="Carica asset o genera con AI. Controllo qualità e varianti." />
          <Step n="4" title="Tracking" desc="Collega eventi/conversioni. Senza tracking, l’AI resta in learning." />
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-sm font-semibold text-slate-200">Stato</div>
          <div className="mt-2 text-sm text-slate-500">
            UI pronta. Attiveremo questo wizard con salvataggio su Supabase e sync Ads quando colleghi l’account.
          </div>
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <div className="text-xs font-semibold text-slate-300">Next</div>
            <div className="mt-1 text-sm text-slate-500">Hook API: POST /api/campaigns (creazione) + scheduler sync.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
