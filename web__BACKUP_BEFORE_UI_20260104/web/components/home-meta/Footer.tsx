import Link from "next/link";

export default function Footer() {
  return (
    <footer className="meta-footer">
      <div className="meta-container" style={{ display:"grid", gap: 18, gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))" }}>
        <div>
          <div style={{ fontWeight: 650, color: "white" }}>AI Ads Revolution</div>
          <div style={{ marginTop: 6, lineHeight: 1.6 }}>
            Piattaforma di advertising AI-first con decision log e ottimizzazioni realtime.
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 650, color: "white" }}>Prodotto</div>
          <div style={{ marginTop: 10, display:"grid", gap: 8 }}>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/ai-engine">AI Engine</Link>
            <Link href="/pricing">Prezzi</Link>
            <Link href="/status">Status</Link>
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 650, color: "white" }}>Azienda</div>
          <div style={{ marginTop: 10, display:"grid", gap: 8 }}>
            <Link href="/chi-siamo">Chi siamo</Link>
            <Link href="/posizioni-aperte">Lavora con noi</Link>
            <Link href="/come-funziona">Come funziona</Link>
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 650, color: "white" }}>Legale</div>
          <div style={{ marginTop: 10, display:"grid", gap: 8 }}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/termini">Termini</Link>
            <Link href="/cookie">Cookie</Link>
          </div>
        </div>
      </div>

      <div className="meta-container" style={{ marginTop: 18, paddingTop: 14, borderTop:"1px solid var(--border)", display:"flex", justifyContent:"space-between", gap: 12, flexWrap:"wrap" }}>
        <div>© 2025 AI Ads Revolution. Tutti i diritti riservati.</div>
        <div style={{ color: "var(--muted)" }}>Built for performance.</div>
      </div>
    </footer>
  );
}
