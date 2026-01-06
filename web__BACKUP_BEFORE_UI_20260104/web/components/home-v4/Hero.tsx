import Link from "next/link";
import Nav from "./Nav";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="ui-card p-4">
      <div className="text-xs ui-muted">{label}</div>
      <div className="mt-1 text-xl font-semibold">{value}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <header className="relative overflow-hidden border-b border-white/5">
      <div className="ui-hero-glow" />
      <div className="absolute inset-0 ui-grid opacity-[0.55]" />
      <Nav />

      <div className="ui-container pt-14 md:pt-20 pb-16 md:pb-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="ui-chip"><span className="h-2 w-2 rounded-full" style={{background:"var(--ok)"}} /> Live</span>
              <span className="ui-chip"><span className="h-2 w-2 rounded-full" style={{background:"var(--glow)"}} /> Realtime</span>
              <span className="ui-chip"><span className="h-2 w-2 rounded-full" style={{background:"var(--ai)"}} /> AI ON</span>
            </div>

            <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight">
              Ads intelligenti che ottimizzano budget e creatività in tempo reale.
            </h1>

            <p className="mt-6 text-lg text-slate-300 max-w-xl">
              AI Ads Revolution sposta automaticamente il budget dove vede più probabilità di conversione.
              Trasparente, misurabile, scalabile.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link href="/register" className="ui-btn ui-btn-primary">Inizia ora</Link>
              <Link href="/come-funziona" className="ui-btn ui-btn-ghost">Guarda come funziona</Link>
            </div>

            <div className="mt-6 text-sm ui-muted">
              Prova gratuita • Nessun lock-in • Setup veloce
            </div>
          </div>

          {/* Visual panel (stile Meta/Amazon) */}
          <div className="ui-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs ui-muted">AI Neural Campaign Engine</div>
                <div className="mt-1 text-lg font-semibold">Performance preview</div>
              </div>
              <span className="ui-chip">Ultimi 28 giorni</span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Stat label="CTR medio" value="0.0%" />
              <Stat label="CPC medio" value="€ 0.00" />
              <Stat label="ROAS medio" value="0.0x" />
              <Stat label="AI Actions" value="0" />
            </div>

            <div className="mt-5 text-sm ui-muted leading-relaxed">
              Collega campagne reali per vedere KPI live. La dashboard è l’area dedicata ai dati dettagliati.
            </div>

            <div className="mt-6 flex gap-2">
              <span className="ui-chip">Decision log</span>
              <span className="ui-chip">Budget shift</span>
              <span className="ui-chip">Creative AI</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
