#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "== Backup =="
cp -f src/app/globals.css "src/app/globals.css.bak.$(date +%Y%m%d-%H%M%S)" || true
cp -f src/app/page.tsx "src/app/page.tsx.bak.$(date +%Y%m%d-%H%M%S)" || true

mkdir -p components/home-meta

echo "== 1) globals.css (Meta-like, NO @apply) =="
cat > src/app/globals.css <<'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

/* AI Ads Revolution — Meta-like UI (stable, no @apply) */
:root{
  --bg-main:#0f1419;
  --bg-panel:#161b22;
  --border:#232a31;

  --text:#ffffff;
  --muted:#9aa4af;

  --primary:#4f6ef7; /* Meta-like blue */
  --ok:#34D399;
}

html,body{
  margin:0;
  padding:0;
  background: var(--bg-main);
  color: var(--text);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
}

a{ color: inherit; text-decoration: none; }
a:hover{ opacity: .95; }

.meta-container{
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
}

.meta-section{
  padding: 72px 0;
}

.meta-topbar{
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(15,20,25,.88);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(10px);
}

.meta-nav{
  display:flex;
  align-items:center;
  justify-content:space-between;
  height:64px;
}

.meta-logo{
  display:flex;
  align-items:center;
  gap:12px;
}
.meta-mark{
  width:36px; height:36px;
  border-radius: 10px;
  background: var(--bg-panel);
  border: 1px solid var(--border);
  display:flex; align-items:center; justify-content:center;
}
.meta-dot{
  width:14px; height:14px;
  border-radius: 4px;
  background: var(--primary);
}
.meta-brand-title{
  font-weight: 600;
  line-height: 1.1;
}
.meta-brand-sub{
  font-size: 12px;
  color: var(--muted);
}

.meta-links{
  display:none;
  gap:18px;
  color: var(--muted);
  font-size: 14px;
}
@media (min-width: 900px){
  .meta-links{ display:flex; }
}

.meta-actions{
  display:flex;
  gap:10px;
}

.meta-btn{
  border-radius: 10px;
  padding: 10px 14px;
  font-weight: 600;
  font-size: 14px;
  transition: all 160ms ease;
  display:inline-flex;
  align-items:center;
  justify-content:center;
}

.meta-btn-primary{
  background: var(--primary);
  color: white;
  border: 1px solid rgba(255,255,255,.06);
}
.meta-btn-primary:hover{ filter: brightness(1.06); transform: translateY(-1px); }

.meta-btn-secondary{
  background: transparent;
  border: 1px solid var(--border);
  color: white;
}
.meta-btn-secondary:hover{ background: rgba(255,255,255,.04); transform: translateY(-1px); }

.meta-hero{
  padding: 64px 0 56px 0;
  border-bottom: 1px solid var(--border);
  background:
    radial-gradient(900px 500px at 20% 0%, rgba(79,110,247,.20), transparent 55%),
    radial-gradient(700px 450px at 80% 10%, rgba(79,110,247,.10), transparent 60%),
    var(--bg-main);
}

.meta-grid-hero{
  display:grid;
  gap: 32px;
}
@media (min-width: 980px){
  .meta-grid-hero{
    grid-template-columns: 1.1fr .9fr;
    align-items: start;
  }
}

.meta-h1{
  font-size: 42px;
  line-height: 1.05;
  font-weight: 650;
  letter-spacing: -0.02em;
  margin: 0;
}
@media (min-width: 900px){
  .meta-h1{ font-size: 56px; }
}

.meta-p{
  margin-top: 16px;
  font-size: 18px;
  color: var(--muted);
  max-width: 560px;
  line-height: 1.55;
}

.meta-cta-row{
  margin-top: 28px;
  display:flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items:center;
}

.meta-trust{
  margin-top: 14px;
  font-size: 13px;
  color: var(--muted);
}

.meta-panel{
  background: var(--bg-panel);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 18px;
}

.meta-panel-head{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 12px;
}
.meta-tag{
  font-size: 12px;
  color: var(--muted);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 6px 10px;
}

.meta-panel-title{
  font-weight: 650;
  margin-top: 2px;
}

.meta-kpis{
  margin-top: 16px;
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.meta-kpi{
  background: rgba(255,255,255,.02);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 14px;
}
.meta-kpi-label{
  font-size: 12px;
  color: var(--muted);
}
.meta-kpi-value{
  margin-top: 6px;
  font-size: 20px;
  font-weight: 650;
}

.meta-small{
  margin-top: 12px;
  font-size: 13px;
  color: var(--muted);
  line-height: 1.45;
}

.meta-chip-row{
  margin-top: 14px;
  display:flex;
  flex-wrap:wrap;
  gap: 8px;
}
.meta-chip{
  font-size: 12px;
  color: var(--muted);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 6px 10px;
}

.meta-h2{
  font-size: 28px;
  font-weight: 650;
  letter-spacing: -0.01em;
  margin: 0;
}
.meta-sub{
  margin-top: 10px;
  color: var(--muted);
  max-width: 720px;
  line-height: 1.6;
}

.meta-cards-3{
  margin-top: 22px;
  display:grid;
  gap: 12px;
}
@media (min-width: 980px){
  .meta-cards-3{ grid-template-columns: repeat(3, 1fr); }
}

.meta-card{
  background: var(--bg-panel);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 18px;
}
.meta-card-title{
  font-weight: 650;
}
.meta-card-desc{
  margin-top: 8px;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.55;
}

.meta-cards-2{
  margin-top: 22px;
  display:grid;
  gap: 12px;
}
@media (min-width: 980px){
  .meta-cards-2{ grid-template-columns: repeat(2, 1fr); }
}

.meta-cta{
  background:
    linear-gradient(180deg, rgba(79,110,247,.10), transparent 65%),
    var(--bg-panel);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 22px;
  display:flex;
  flex-direction:column;
  gap: 12px;
}
@media (min-width: 980px){
  .meta-cta{
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.meta-footer{
  border-top: 1px solid var(--border);
  padding: 28px 0;
  color: var(--muted);
  font-size: 13px;
}
.meta-footer a{ color: var(--muted); }
.meta-footer a:hover{ color: white; }
EOF

echo "== 2) Components =="
cat > components/home-meta/Nav.tsx <<'EOF'
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
EOF

cat > components/home-meta/Hero.tsx <<'EOF'
import Link from "next/link";
import Nav from "./Nav";

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="meta-kpi">
      <div className="meta-kpi-label">{label}</div>
      <div className="meta-kpi-value">{value}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <>
      <Nav />
      <section className="meta-hero">
        <div className="meta-container">
          <div className="meta-grid-hero">
            <div>
              <h1 className="meta-h1">
                Ads intelligenti che ottimizzano budget e creatività in tempo reale.
              </h1>

              <p className="meta-p">
                AI Ads Revolution sposta automaticamente il budget dove vede più probabilità di conversione.
                Decision log trasparente e ottimizzazioni misurabili.
              </p>

              <div className="meta-cta-row">
                <Link className="meta-btn meta-btn-primary" href="/register">Inizia ora</Link>
                <Link className="meta-btn meta-btn-secondary" href="/come-funziona">Guarda come funziona</Link>
              </div>

              <div className="meta-trust">
                Prova gratuita • Nessun lock-in • Setup veloce • Pensato anche per piccole imprese
              </div>
            </div>

            <div className="meta-panel">
              <div className="meta-panel-head">
                <div>
                  <div className="meta-brand-sub">AI Neural Campaign Engine</div>
                  <div className="meta-panel-title">Performance preview</div>
                </div>
                <div className="meta-tag">Ultimi 28 giorni</div>
              </div>

              <div className="meta-kpis">
                <Kpi label="CTR medio" value="0.0%" />
                <Kpi label="CPC medio" value="€ 0.00" />
                <Kpi label="ROAS medio" value="0.0x" />
                <Kpi label="AI Actions" value="0" />
              </div>

              <div className="meta-small">
                Collega campagne reali per vedere KPI live. La dashboard è l’area dedicata ai dati dettagliati.
              </div>

              <div className="meta-chip-row">
                <span className="meta-chip">Decision log</span>
                <span className="meta-chip">Budget shift</span>
                <span className="meta-chip">Creative AI</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
EOF

cat > components/home-meta/Section.tsx <<'EOF'
export default function Section({
  id, title, subtitle, children,
}:{
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="meta-section">
      <div className="meta-container">
        <h2 className="meta-h2">{title}</h2>
        {subtitle && <p className="meta-sub">{subtitle}</p>}
        <div style={{ marginTop: 22 }}>{children}</div>
      </div>
    </section>
  );
}
EOF

cat > components/home-meta/HowItWorks.tsx <<'EOF'
export default function HowItWorks() {
  const items = [
    { n:"01", t:"Collega il tuo business", d:"Crea l’account, collega prodotti/servizi e definisci obiettivi e tracking." },
    { n:"02", t:"Lascia lavorare l’AI", d:"Il motore neurale ottimizza bid, budget e creatività in tempo reale." },
    { n:"03", t:"Scala ciò che funziona", d:"Aumenti budget solo dove CTR/ROAS e conversioni lo confermano." },
  ];

  return (
    <div className="meta-cards-3">
      {items.map(i => (
        <div key={i.n} className="meta-card">
          <div className="meta-brand-sub">Step {i.n}</div>
          <div className="meta-card-title" style={{ marginTop: 6 }}>{i.t}</div>
          <div className="meta-card-desc">{i.d}</div>
        </div>
      ))}
    </div>
  );
}
EOF

cat > components/home-meta/AiEngine.tsx <<'EOF'
export default function AiEngine() {
  const items = [
    { t:"AI-first in ogni decisione", d:"Ogni asta, offerta e creatività viene valutata da segnali realtime." },
    { t:"Decision log trasparente", d:"Sai cosa fa l’AI, perché lo fa e con quale impatto stimato." },
    { t:"Realtime signals", d:"Reagisce ai cambiamenti del mercato mentre accadono." },
    { t:"Scalabilità enterprise", d:"Inizi piccolo e cresci solo quando i dati lo confermano." },
  ];

  return (
    <div className="meta-cards-2">
      {items.map(i => (
        <div key={i.t} className="meta-card">
          <div className="meta-card-title">{i.t}</div>
          <div className="meta-card-desc">{i.d}</div>
        </div>
      ))}
    </div>
  );
}
EOF

cat > components/home-meta/CTA.tsx <<'EOF'
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
EOF

cat > components/home-meta/Footer.tsx <<'EOF'
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="meta-footer">
      <div className="meta-container" style={{ display:"flex", justifyContent:"space-between", gap: 16, flexWrap:"wrap" }}>
        <div>© 2025 AI Ads Revolution. Tutti i diritti riservati.</div>
        <div style={{ display:"flex", gap: 14, flexWrap:"wrap" }}>
          <Link href="/chi-siamo">Chi siamo</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/termini">Termini</Link>
          <Link href="/cookie">Cookie</Link>
          <Link href="/status">Status</Link>
        </div>
      </div>
    </footer>
  );
}
EOF

echo "== 3) Update src/app/page.tsx =="
cat > src/app/page.tsx <<'EOF'
import Hero from "@/components/home-meta/Hero";
import Section from "@/components/home-meta/Section";
import HowItWorks from "@/components/home-meta/HowItWorks";
import AiEngine from "@/components/home-meta/AiEngine";
import CTA from "@/components/home-meta/CTA";
import Footer from "@/components/home-meta/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Section
        id="come-funziona"
        title="Come funziona"
        subtitle="Dall’idea alla conversione in tre passaggi. Semplice, misurabile, scalabile."
      >
        <HowItWorks />
      </Section>

      <Section
        id="ai-engine"
        title="AI Neural Engine"
        subtitle="Un motore neurale, non un semplice strumento. Trasparenza, segnali realtime e controllo."
      >
        <AiEngine />
      </Section>

      <Section
        title="Inizia subito"
        subtitle="Crea un account e attiva le ottimizzazioni AI. La dashboard resta il posto dei dati reali."
      >
        <CTA />
      </Section>

      <Footer />
    </main>
  );
}
EOF

echo "== Clean & run =="
rm -rf .next
npm run dev
