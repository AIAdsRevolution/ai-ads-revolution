import Link from "next/link";

export default function Nav() {
  return (
    <div className="meta-topbar">
      <div className="meta-container">
        <div className="meta-nav">
          <div className="meta-logo">
            <div className="meta-mark"><div className="meta-dot" /></div>
            <div>
              <div className="meta-brand-title">AI Ads Revolution</div>
              <div className="meta-brand-sub">Motore neurale di advertising</div>
            </div>
          </div>

          <div className="meta-links">
            <a href="#come-funziona">Come funziona</a>
            <a href="#ai-engine">AI Engine</a>
            <Link href="/pricing">Prezzi</Link>
            <Link href="/status">Status</Link>
          </div>

          <div className="meta-actions">
            <Link className="meta-btn meta-btn-secondary" href="/login">Accedi</Link>
            <Link className="meta-btn meta-btn-primary" href="/register">Registrati</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
