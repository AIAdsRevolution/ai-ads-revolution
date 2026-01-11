import Link from "next/link";

export default function CTA() {
  return (
    <div className="meta-cta">
      <div>
        <div style={{ fontWeight: 650, fontSize: 20 }}>Inizia oggi con AI Ads Revolution</div>
        <div className="meta-sub" style={{ marginTop: 6, maxWidth: 560 }}>
          Setup rapido, prova gratuita e controllo totale sulle ottimizzazioni AI.
        </div>
      </div>
      <div style={{ display:"flex", gap: 10, flexWrap:"wrap" }}>
        <Link className="meta-btn meta-btn-primary" href="/register">Crea un account</Link>
        <Link className="meta-btn meta-btn-secondary" href="/dashboard">Accedi alla dashboard</Link>
      </div>
    </div>
  );
}
