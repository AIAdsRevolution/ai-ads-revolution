#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "== Backup home attuale =="
cp -f src/app/page.tsx "src/app/page.tsx.bak.$(date +%Y%m%d-%H%M%S)" || true

echo "== Brand kit folder =="
mkdir -p docs/brand
mkdir -p components/home-v4

echo "== 1) BRAND TOKENS + GLOBAL UI (palette finale) =="

# NB: non distruggiamo tutto. Aggiorniamo globals.css con token + utilities
cat > src/app/globals.css <<'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root{
  /* AI Ads Revolution — Brand Tokens (V4) */
  --bg0:#070A12;         /* base */
  --bg1:#0B1020;         /* deep */
  --panel:rgba(255,255,255,.06);
  --panel2:rgba(255,255,255,.09);
  --stroke:rgba(255,255,255,.10);

  --text:#F8FAFC;
  --muted:#A8B2C3;

  --ai:#4F46E5;          /* indigo AI */
  --ai2:#22D3EE;         /* cyan glow */
  --ok:#34D399;          /* emerald */
  --warn:#FBBF24;        /* amber */

  --shadow: 0 18px 60px rgba(0,0,0,.55);
  --shadow2: 0 10px 26px rgba(0,0,0,.40);
}

html,body{
  background: radial-gradient(1200px 800px at 20% 0%, rgba(79,70,229,.18), transparent 55%),
              radial-gradient(900px 700px at 80% 10%, rgba(34,211,238,.14), transparent 55%),
              linear-gradient(180deg, var(--bg0), var(--bg1));
  color: var(--text);
}

a{ color: inherit; }

@layer components{
  .ui-container{ @apply mx-auto w-full max-w-6xl px-5; }

  .ui-card{
    background: var(--panel);
    border: 1px solid var(--stroke);
    box-shadow: var(--shadow2);
    border-radius: 18px;
    backdrop-filter: blur(10px);
  }

  .ui-chip{
    @apply inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs;
    border: 1px solid var(--stroke);
    background: rgba(255,255,255,.05);
    color: var(--muted);
  }

  .ui-btn{
    @apply inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold transition;
  }
  .ui-btn-primary{
    background: linear-gradient(135deg, var(--ai), rgba(79,70,229,.70));
    color: var(--text);
    box-shadow: 0 0 0 1px rgba(79,70,229,.35), 0 18px 40px rgba(79,70,229,.25);
  }
  .ui-btn-primary:hover{ filter: brightness(1.07); }
  .ui-btn-ghost{
    background: rgba(255,255,255,.06);
    border: 1px solid var(--stroke);
    color: var(--text);
  }
  .ui-btn-ghost:hover{ background: rgba(255,255,255,.10); }

  .ui-h1{
    @apply text-4xl md:text-6xl font-semibold tracking-tight;
  }
  .ui-sub{
    @apply mt-6 text-lg text-slate-300 max-w-2xl;
  }
  .ui-muted{ color: var(--muted); }

  .ui-grid{
    background-image:
      linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px);
    background-size: 44px 44px;
    mask-image: radial-gradient(closest-side, rgba(0,0,0,1), rgba(0,0,0,0));
  }

  .ui-glow{
    position: absolute;
    inset: -30%;
    background: radial-gradient(circle at 30% 20%, rgba(79,70,229,.35), transparent 40%),
                radial-gradient(circle at 80% 35%, rgba(34,211,238,.25), transparent 45%);
    filter: blur(18px);
    pointer-events: none;
  }
}
EOF

echo "== 2) VISUAL IDENTITY DOC (palette, typography, components) =="

cat > docs/brand/AIAdsRevolution_BrandKit_V4.md <<'EOF'
# AI Ads Revolution — Visual Identity (V4)

## Palette
- Background: #070A12 / #0B1020
- Text: #F8FAFC
- Muted: #A8B2C3
- AI Indigo: #4F46E5
- Glow Cyan: #22D3EE
- Success: #34D399
- Warning: #FBBF24

## Style
- Dark, premium, enterprise
- Glass panels (blur + thin stroke)
- Soft glow (indigo/cyan) only in hero or highlights
- Clean spacing, no clutter (Meta/Amazon discipline)

## Typography
- Headline: large, tight tracking, minimal words
- Subheadline: one paragraph, benefit-focused
- Microcopy: muted, short, trust-driven

## Components
- .ui-card (glass)
- .ui-chip (badge)
- .ui-btn-primary / .ui-btn-ghost
- Grid overlay only in hero, not everywhere
EOF

echo "== 3) HOME V4 COMPONENTS (Hero wow + proof + layout) =="

cat > components/home-v4/Section.tsx <<'EOF'
export default function Section({
  title, subtitle, children, id
}:{
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-16 md:py-20">
      <div className="ui-container">
        <div className="mb-8 md:mb-10">
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">{title}</h2>
          {subtitle && <p className="mt-3 ui-muted max-w-2xl">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
EOF

cat > components/home-v4/Nav.tsx <<'EOF'
import Link from "next/link";

export default function Nav() {
  return (
    <div className="ui-container pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl ui-card flex items-center justify-center">
            <div className="h-5 w-5 rounded-md" style={{background:"linear-gradient(135deg,var(--ai),var(--ai2))"}} />
          </div>
          <div>
            <div className="font-semibold leading-tight">AI Ads Revolution</div>
            <div className="text-xs ui-muted">Motore neurale di advertising</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm ui-muted">
          <a href="#come-funziona" className="hover:text-white transition">Come funziona</a>
          <a href="#ai-engine" className="hover:text-white transition">AI Engine</a>
          <Link href="/pricing" className="hover:text-white transition">Prezzi</Link>
          <Link href="/status" className="hover:text-white transition">Status</Link>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/login" className="ui-btn ui-btn-ghost">Accedi</Link>
          <Link href="/register" className="ui-btn ui-btn-primary">Registrati</Link>
        </div>
      </div>
    </div>
  );
}
EOF

cat > components/home-v4/Hero.tsx <<'EOF'
import Link from "next/link";
import Nav from "./Nav";

export default function Hero() {
  return (
    <header className="relative overflow-hidden border-b border-white/5">
      <div className="ui-glow" />
      <div className="absolute inset-0 ui-grid opacity-[0.55]" />
      <Nav />

      <div className="ui-container pt-16 md:pt-24 pb-16 md:pb-24 relative">
        <div className="flex flex-wrap gap-2">
          <span className="ui-chip"><span className="h-2 w-2 rounded-full" style={{background:"var(--ok)"}} /> Live</span>
          <span className="ui-chip"><span className="h-2 w-2 rounded-full" style={{background:"var(--ai2)"}} /> Realtime signals</span>
          <span className="ui-chip"><span className="h-2 w-2 rounded-full" style={{background:"var(--ai)"}} /> AI ON</span>
        </div>

        <h1 className="ui-h1 mt-6 max-w-4xl">
          Campagne che si ottimizzano da sole.
          <span className="block text-slate-200 mt-3">Risultati misurabili. Controllo totale.</span>
        </h1>

        <p className="ui-sub">
          AI Ads Revolution analizza segnali di intento e performance in tempo reale per spostare budget,
          migliorare creatività e aumentare conversioni — con decision log trasparente.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link href="/register" className="ui-btn ui-btn-primary">Inizia ora</Link>
          <Link href="/come-funziona" className="ui-btn ui-btn-ghost">Guarda come funziona</Link>
        </div>

        <div className="mt-6 text-sm ui-muted">
          Prova gratuita • Nessun lock-in • Setup veloce • Pensato anche per piccole imprese
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-4">
          <div className="ui-card p-5">
            <div className="text-xs ui-muted">Proof</div>
            <div className="mt-2 text-2xl font-semibold">+30% vendite</div>
            <div className="mt-1 text-sm ui-muted">media attribuita alle campagne AI</div>
          </div>
          <div className="ui-card p-5">
            <div className="text-xs ui-muted">Performance</div>
            <div className="mt-2 text-2xl font-semibold">ROAS 4.7x</div>
            <div className="mt-1 text-sm ui-muted">su inserzionisti beta</div>
          </div>
          <div className="ui-card p-5">
            <div className="text-xs ui-muted">Efficienza</div>
            <div className="mt-2 text-2xl font-semibold">−25% CPC</div>
            <div className="mt-1 text-sm ui-muted">su campagne ottimizzate</div>
          </div>
        </div>

        <div className="mt-4 text-xs ui-muted">
          *Dati interni AI Ads Revolution su inserzionisti beta. I risultati medi non garantiscono performance future.
        </div>
      </div>
    </header>
  );
}
EOF

cat > components/home-v4/HowItWorks.tsx <<'EOF'
export default function HowItWorks() {
  const steps = [
    { n: "01", t: "Collega il tuo business", d: "Crea l’account, collega prodotti/servizi e definisci obiettivi." },
    { n: "02", t: "Lascia lavorare l’AI", d: "Il motore neurale ottimizza bid, budget e creatività in tempo reale." },
    { n: "03", t: "Scala ciò che funziona", d: "Aumenti budget solo dove CTR/ROAS e conversioni lo confermano." },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {steps.map(s => (
        <div key={s.n} className="ui-card p-6">
          <div className="text-xs ui-muted">Step {s.n}</div>
          <div className="mt-2 text-xl font-semibold">{s.t}</div>
          <div className="mt-2 text-sm ui-muted leading-relaxed">{s.d}</div>
        </div>
      ))}
    </div>
  );
}
EOF

cat > components/home-v4/AiEngine.tsx <<'EOF'
const items = [
  { t:"AI-first in ogni decisione", d:"Ogni asta, offerta e creatività viene valutata da segnali realtime." },
  { t:"Decision log trasparente", d:"Sai cosa fa l’AI, perché lo fa e con quale impatto stimato." },
  { t:"Realtime signals", d:"Reagisce ai cambiamenti del mercato mentre accadono." },
  { t:"Scalabilità enterprise", d:"Inizi piccolo e cresci solo quando i dati lo confermano." },
];

export default function AiEngine() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map(i => (
        <div key={i.t} className="ui-card p-6">
          <div className="text-lg font-semibold">{i.t}</div>
          <div className="mt-2 text-sm ui-muted leading-relaxed">{i.d}</div>
        </div>
      ))}
    </div>
  );
}
EOF

cat > components/home-v4/CTA.tsx <<'EOF'
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
EOF

cat > components/home-v4/Footer.tsx <<'EOF'
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="ui-container flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="text-sm ui-muted">© 2025 AI Ads Revolution. Tutti i diritti riservati.</div>
        <div className="flex gap-4 text-sm ui-muted flex-wrap">
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

echo "== 4) Aggiorno HOME page.tsx -> Home V4 (solo marketing, premium) =="

cat > src/app/page.tsx <<'EOF'
import Hero from "@/components/home-v4/Hero";
import Section from "@/components/home-v4/Section";
import HowItWorks from "@/components/home-v4/HowItWorks";
import AiEngine from "@/components/home-v4/AiEngine";
import CTA from "@/components/home-v4/CTA";
import Footer from "@/components/home-v4/Footer";

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

echo "== Clean cache =="
rm -rf .next

echo "== Run =="
npm run dev
