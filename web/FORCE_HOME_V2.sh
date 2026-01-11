#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "== Backup home attuale =="
cp -f src/app/page.tsx "src/app/page.tsx.bak.$(date +%Y%m%d-%H%M%S)"

echo "== Ricreo cartelle =="
rm -rf src/components/home-v2 src/lib/home-v2
mkdir -p src/components/home-v2 src/lib/home-v2 src/app/api/metrics

echo "== LIB =="
cat > src/lib/home-v2/format.ts <<'EOF'
export function clsx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
EOF

cat > src/lib/home-v2/brand.ts <<'EOF'
export const BRAND = {
  name: "AI Ads Revolution",
  tagline: "Motore neurale di advertising"
};
EOF

echo "== COMPONENTS =="
cat > src/components/home-v2/UiCard.tsx <<'EOF'
import { clsx } from "@/lib/home-v2/format";

export default function UiCard({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={clsx("glass rounded-2xl shadow-soft", className)}>{children}</div>;
}
EOF

cat > src/components/home-v2/Section.tsx <<'EOF'
export default function Section({
  title,
  subtitle,
  children,
  id
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-14 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-5">
        <div className="mb-8 md:mb-10">
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">{title}</h2>
          {subtitle && <p className="mt-3 text-zinc-300 max-w-2xl">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
EOF

cat > src/components/home-v2/CTA.tsx <<'EOF'
import Link from "next/link";

export default function CTA() {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Link
        href="/register"
        className="inline-flex items-center justify-center rounded-xl px-5 py-3 bg-white text-zinc-950 font-semibold hover:opacity-90 transition"
      >
        Registrati
      </Link>
      <Link
        href="/login"
        className="inline-flex items-center justify-center rounded-xl px-5 py-3 glass hover:bg-white/10 transition"
      >
        Accedi
      </Link>
    </div>
  );
}
EOF

cat > src/components/home-v2/KpiBar.tsx <<'EOF'
"use client";

import { useEffect, useState } from "react";
import UiCard from "./UiCard";

type Metric = { label: string; value: string; delta?: string; note?: string };

export default function KpiBar() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [source, setSource] = useState<string>("");

  useEffect(() => {
    fetch("/api/metrics")
      .then((r) => r.json())
      .then((j) => {
        setMetrics(j.metrics ?? []);
        setSource(j.source ?? "");
      })
      .catch(() => {});
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-5 -mt-6 md:-mt-8">
      <UiCard className="p-4 md:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-zinc-300">KPI principali (Live)</div>
          <div className="text-xs text-zinc-400">source: {source || "loading"}</div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {metrics.map((m, i) => (
            <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-4">
              <div className="text-xs text-zinc-400">{m.label}</div>
              <div className="mt-2 text-2xl font-semibold">{m.value}</div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-zinc-400">{m.note || "—"}</span>
                {m.delta && <span className="text-emerald-300">{m.delta}</span>}
              </div>
            </div>
          ))}
        </div>
      </UiCard>
    </div>
  );
}
EOF

cat > src/components/home-v2/Hero.tsx <<'EOF'
import Link from "next/link";
import UiCard from "./UiCard";
import CTA from "./CTA";

export default function Hero() {
  return (
    <header className="bg-neural border-b border-white/5">
      <div className="mx-auto max-w-6xl px-5 pt-10 md:pt-16 pb-10 md:pb-16">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/10 border border-white/10 shadow-glow" />
            <div>
              <div className="font-semibold leading-tight">AI Ads Revolution</div>
              <div className="text-xs text-zinc-400">Motore neurale di advertising</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
            <a href="#come-funziona" className="hover:text-white">Come funziona</a>
            <a href="#features" className="hover:text-white">Funzionalità AI</a>
            <Link href="/pricing" className="hover:text-white">Prezzi</Link>
            <Link href="/status" className="hover:text-white">Status</Link>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/login" className="rounded-xl px-4 py-2 glass hover:bg-white/10 transition">Accedi</Link>
            <Link href="/register" className="rounded-xl px-4 py-2 bg-white text-zinc-950 font-semibold hover:opacity-90 transition">
              Registrati
            </Link>
          </div>
        </nav>

        <div className="mt-10 md:mt-16 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
              AI Neural Campaign Engine
              <span className="block text-zinc-300 mt-3">UI stile Meta/Amazon, controllo enterprise.</span>
            </h1>
            <p className="mt-5 text-zinc-300 max-w-xl">
              Ottimizza offerte, creatività e targeting in tempo reale. Sposta budget dove l’AI vede più probabilità di conversione,
              con KPI e decision log sempre visibili.
            </p>
            <div className="mt-7"><CTA /></div>
            <div className="mt-6 text-xs text-zinc-400">
              Live · Realtime signals · Finestra ultimi 28 giorni
            </div>
          </div>

          <UiCard className="p-5 md:p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-zinc-300">Live Control Room (Preview)</div>
              <div className="text-xs text-emerald-300">● Live</div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="text-xs text-zinc-400">AI</div>
                <div className="mt-2 text-xl font-semibold">ON</div>
                <div className="mt-1 text-xs text-zinc-400">Raccolta dati</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="text-xs text-zinc-400">Trend AI</div>
                <div className="mt-2 text-xl font-semibold">ROAS 0.0x</div>
                <div className="mt-1 text-xs text-zinc-400">Preview</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="text-xs text-zinc-400">Budget</div>
                <div className="mt-2 text-xl font-semibold">Auto</div>
                <div className="mt-1 text-xs text-zinc-400">Realtime</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="text-xs text-zinc-400">Log</div>
                <div className="mt-2 text-xl font-semibold">Attivo</div>
                <div className="mt-1 text-xs text-zinc-400">Trasparente</div>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-4">
              <div className="text-xs text-zinc-400">AI Notes</div>
              <p className="mt-2 text-sm text-zinc-200">
                L’AI ottimizza offerte, creatività e sorgenti di traffico, spostando il budget dove vede più probabilità di conversione.
              </p>
            </div>
          </UiCard>
        </div>
      </div>
    </header>
  );
}
EOF

# QUESTO è il file che ti mancava:
cat > src/components/home-v2/FeatureGrid.tsx <<'EOF'
import UiCard from "./UiCard";

const features = [
  { title: "AI-first in ogni decisione", desc: "Ogni asta, offerta e creatività viene valutata da un motore AI in tempo reale." },
  { title: "Dalla scoperta alla conversione", desc: "Gestisci visibilità, traffico e vendite dalla stessa dashboard." },
  { title: "Pensato per tutte le aziende", desc: "Dalla piccola impresa al brand globale: inizi e scali quando i risultati lo confermano." },
  { title: "Setup guidato", desc: "La guida AI integrata ti mostra passo dopo passo come creare e ottimizzare campagne." },
  { title: "Decision Log", desc: "Tracciamento chiaro di cosa fa l’AI e perché, con impatto stimato sui KPI." },
  { title: "Scalabilità enterprise", desc: "Struttura pronta per crescita, integrazioni e moduli avanzati." }
];

export default function FeatureGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {features.map((f) => (
        <UiCard key={f.title} className="p-5">
          <div className="text-lg font-semibold">{f.title}</div>
          <p className="mt-2 text-zinc-300 text-sm leading-relaxed">{f.desc}</p>
        </UiCard>
      ))}
    </div>
  );
}
EOF

cat > src/components/home-v2/Footer.tsx <<'EOF'
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto max-w-6xl px-5 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <div className="font-semibold">AI Ads Revolution</div>
          <div className="text-sm text-zinc-400">Piattaforma di advertising AI-first.</div>
        </div>
        <div className="flex gap-4 text-sm text-zinc-400 flex-wrap">
          <Link href="/chi-siamo">Chi siamo</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/termini">Termini</Link>
          <Link href="/cookie">Cookie</Link>
        </div>
      </div>
    </footer>
  );
}
EOF

echo "== API /api/metrics =="
cat > src/app/api/metrics/route.ts <<'EOF'
import { NextResponse } from "next/server";

const metrics = [
  { label: "CTR medio", value: "0.0%", note: "Demo" },
  { label: "CPC medio", value: "€ 0.00", note: "Demo" },
  { label: "ROAS medio", value: "0.0x", note: "Demo" },
  { label: "AI Actions", value: "0", note: "Demo" }
];

export async function GET() {
  return NextResponse.json({ ok: true, source: "demo", metrics });
}
EOF

echo "== Sostituisco HOME =="
cat > src/app/page.tsx <<'EOF'
import Hero from "@/components/home-v2/Hero";
import KpiBar from "@/components/home-v2/KpiBar";
import Section from "@/components/home-v2/Section";
import FeatureGrid from "@/components/home-v2/FeatureGrid";
import Footer from "@/components/home-v2/Footer";
import UiCard from "@/components/home-v2/UiCard";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <KpiBar />

      <Section id="come-funziona" title="Come funziona" subtitle="3 step chiari, stile enterprise.">
        <div className="grid md:grid-cols-3 gap-4">
          <UiCard className="p-6">
            <div className="text-xs text-zinc-400">Step 01</div>
            <div className="mt-2 text-xl font-semibold">Collega</div>
            <p className="mt-2 text-zinc-300 text-sm">
              Crea account, collega obiettivi e tracking. Importa segnali e campagne.
            </p>
          </UiCard>
          <UiCard className="p-6">
            <div className="text-xs text-zinc-400">Step 02</div>
            <div className="mt-2 text-xl font-semibold">Ottimizza</div>
            <p className="mt-2 text-zinc-300 text-sm">
              L’AI rialloca budget sulle opportunità migliori in base ai segnali realtime.
            </p>
          </UiCard>
          <UiCard className="p-6">
            <div className="text-xs text-zinc-400">Step 03</div>
            <div className="mt-2 text-xl font-semibold">Scala</div>
            <p className="mt-2 text-zinc-300 text-sm">
              Aumenta budget solo dove i KPI confermano performance.
            </p>
          </UiCard>
        </div>
      </Section>

      <Section id="features" title="Perché scegliere AI Ads Revolution" subtitle="UI stile Meta/Amazon + motore neurale AI-first.">
        <FeatureGrid />
      </Section>

      <Section id="cta" title="Inizia subito" subtitle="Accedi alla dashboard o crea un account in 30 secondi.">
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/register" className="inline-flex items-center justify-center rounded-xl px-5 py-3 bg-white text-zinc-950 font-semibold hover:opacity-90 transition">
            Registrati
          </Link>
          <Link href="/dashboard" className="inline-flex items-center justify-center rounded-xl px-5 py-3 glass hover:bg-white/10 transition">
            Accedi alla dashboard
          </Link>
        </div>
        <div className="text-xs text-zinc-400 mt-3">
          KPI reali: prossimo step (Supabase/Google Ads)
        </div>
      </Section>

      <Footer />
    </main>
  );
}
EOF

echo "== Pulizia cache =="
rm -rf .next

echo "OK: home-v2 ricreata."
