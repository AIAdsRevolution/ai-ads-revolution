import Link from "next/link";

export default function CTA() {
  return (
    <div className="ui-card p-8 md:p-10">
      <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        <div>
          <div className="text-2xl md:text-3xl font-semibold">Inizia oggi con AI Ads Revolution</div>
          <div className="mt-2 ui-muted">Setup rapido, prova gratuita e controllo totale sulle ottimizzazioni AI.</div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/register" className="ui-btn ui-btn-primary">Crea un account</Link>
          <Link href="/dashboard" className="ui-btn ui-btn-ghost">Accedi alla dashboard</Link>
        </div>
      </div>
      <div className="mt-4 text-xs ui-muted">Pagamento sicuro • Dati protetti • Nessun vincolo</div>
    </div>
  );
}
