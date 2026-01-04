#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "== Backup home attuale =="
cp -f src/app/page.tsx "src/app/page.tsx.bak.$(date +%Y%m%d-%H%M%S)"

echo "== Creo struttura Home V3 =="
rm -rf components/home-v3
mkdir -p components/home-v3

# ---------- Section ----------
cat > components/home-v3/Section.tsx <<'EOF'
export default function Section({ title, subtitle, children }: any) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-3xl md:text-4xl font-semibold">{title}</h2>
        {subtitle && <p className="mt-4 text-zinc-300 max-w-2xl">{subtitle}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
EOF

# ---------- Hero ----------
cat > components/home-v3/Hero.tsx <<'EOF'
import Link from "next/link";

export default function Hero() {
  return (
    <header className="relative overflow-hidden border-b border-white/5">
      <div className="mx-auto max-w-6xl px-5 pt-24 pb-28">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight max-w-4xl">
          Fai crescere il tuo business con un motore di advertising basato sull’AI
        </h1>

        <p className="mt-6 text-zinc-300 max-w-2xl text-lg">
          AI Ads Revolution analizza milioni di segnali in tempo reale per ottimizzare
          budget, creatività e conversioni. Decisioni intelligenti, risultati misurabili.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href="/register" className="px-6 py-3 bg-white text-black rounded-xl font-semibold">
            Inizia ora
          </Link>
          <Link href="/come-funziona" className="px-6 py-3 border border-white/20 rounded-xl">
            Guarda come funziona
          </Link>
        </div>

        <div className="mt-6 text-sm text-zinc-400">
          ✔ Nessun lock-in &nbsp; ✔ Setup veloce &nbsp; ✔ Pensato anche per piccole imprese
        </div>
      </div>
    </header>
  );
}
EOF

# ---------- Proof ----------
cat > components/home-v3/Proof.tsx <<'EOF'
export default function Proof() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div>
        <div className="text-4xl font-semibold">+30%</div>
        <p className="mt-2 text-zinc-300">Vendite medie attribuite alle campagne AI</p>
      </div>
      <div>
        <div className="text-4xl font-semibold">4.7x</div>
        <p className="mt-2 text-zinc-300">ROAS medio su inserzionisti beta</p>
      </div>
      <div>
        <div className="text-4xl font-semibold">−25%</div>
        <p className="mt-2 text-zinc-300">Riduzione media del costo per clic</p>
      </div>
    </div>
  );
}
EOF

# ---------- HowItWorks ----------
cat > components/home-v3/HowItWorks.tsx <<'EOF'
export default function HowItWorks() {
  const steps = [
    { n: "01", t: "Collega", d: "Crea l’account e definisci obiettivi e prodotti." },
    { n: "02", t: "Lascia lavorare l’AI", d: "Il motore neurale ottimizza offerte e creatività." },
    { n: "03", t: "Scala ciò che funziona", d: "Aumenti il budget solo dove i dati lo confermano." },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {steps.map(s => (
        <div key={s.n}>
          <div className="text-sm text-zinc-400">{s.n}</div>
          <h3 className="mt-2 text-xl font-semibold">{s.t}</h3>
          <p className="mt-2 text-zinc-300">{s.d}</p>
        </div>
      ))}
    </div>
  );
}
EOF

# ---------- AI Engine ----------
cat > components/home-v3/AiEngine.tsx <<'EOF'
export default function AiEngine() {
  const items = [
    "AI-first in ogni decisione",
    "Decision log trasparente",
    "Realtime signals",
    "Scalabilità enterprise",
  ];

  return (
    <ul className="grid md:grid-cols-2 gap-6">
      {items.map(i => (
        <li key={i} className="text-zinc-300">• {i}</li>
      ))}
    </ul>
  );
}
EOF

# ---------- CTA ----------
cat > components/home-v3/CTA.tsx <<'EOF'
import Link from "next/link";

export default function CTA() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Link href="/register" className="px-6 py-3 bg-white text-black rounded-xl font-semibold">
        Crea un account
      </Link>
      <Link href="/dashboard" className="px-6 py-3 border border-white/20 rounded-xl">
        Accedi alla dashboard
      </Link>
    </div>
  );
}
EOF

# ---------- Footer ----------
cat > components/home-v3/Footer.tsx <<'EOF'
export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 text-sm text-zinc-400">
      <div className="mx-auto max-w-6xl px-5 flex flex-wrap gap-4 justify-between">
        <div>© 2025 AI Ads Revolution</div>
        <div className="flex gap-4">
          <a href="/chi-siamo">Chi siamo</a>
          <a href="/privacy">Privacy</a>
          <a href="/termini">Termini</a>
          <a href="/cookie">Cookie</a>
        </div>
      </div>
    </footer>
  );
}
EOF

# ---------- page.tsx ----------
cat > src/app/page.tsx <<'EOF'
import Hero from "@/components/home-v3/Hero";
import Section from "@/components/home-v3/Section";
import Proof from "@/components/home-v3/Proof";
import HowItWorks from "@/components/home-v3/HowItWorks";
import AiEngine from "@/components/home-v3/AiEngine";
import CTA from "@/components/home-v3/CTA";
import Footer from "@/components/home-v3/Footer";

export default function Home() {
  return (
    <main>
      <Hero />

      <Section title="Risultati reali, guidati dall’intelligenza artificiale">
        <Proof />
      </Section>

      <Section title="Come funziona" subtitle="Dall’idea alla conversione in tre passaggi.">
        <HowItWorks />
      </Section>

      <Section title="Un motore neurale, non un semplice strumento">
        <AiEngine />
      </Section>

      <Section title="Inizia oggi con AI Ads Revolution">
        <CTA />
      </Section>

      <Footer />
    </main>
  );
}
EOF

echo "== Pulizia cache =="
rm -rf .next

echo "== Avvio =="
npm run dev
