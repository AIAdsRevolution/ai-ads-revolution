import React from "react";

const items = [
  {
    category: "Annunci sponsorizzati",
    title: "Sponsored Products AI",
    desc: "Metti in evidenza i singoli prodotti nei momenti di massima intenzione d’acquisto, con annunci ottimizzati dall’AI.",
    badge: "CPC",
  },
  {
    category: "Annunci sponsorizzati",
    title: "Sponsored Brands AI",
    desc: "Fai scoprire il tuo brand con formati pensati per presidiare le ricerche più importanti del tuo mercato.",
    badge: "Brand awareness",
  },
  {
    category: "Esperienze di brand",
    title: "Brand Experience Pages",
    desc: "Mini-siti del brand con prodotti, storytelling e creatività generate dall’AI.",
    badge: "Full funnel",
  },
  {
    category: "Video & Live",
    title: "Annunci Video AI",
    desc: "Video adattati automaticamente a diversi canali, con report chiari su cosa genera più vendite.",
    badge: "Video",
  },
  {
    category: "Audio",
    title: "Annunci Audio AI",
    desc: "Messaggi audio brevi nelle routine quotidiane dei tuoi clienti.",
    badge: "Audio",
  },
  {
    category: "Display & device",
    title: "Smart Display & Devices",
    desc: "Banner e formati dinamici mostrati su siti, app e dispositivi partner.",
    badge: "Display",
  },
];

export default function ProductsFormatsSection() {
  return (
    <section className="relative py-20 border-t border-slate-800/60">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.08),_transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-400/80">
            Prodotti e formati
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-slate-50">
            Ovunque vuoi far arrivare il tuo brand,
            <span className="text-emerald-400"> l’AI ti accompagna.</span>
          </h2>
          <p className="mt-4 text-slate-300/90 text-sm md:text-base">
            Scegli tra formati sponsorizzati, esperienze di brand, video, audio
            e display. La nostra rete neurale ti aiuta a capire quali formati
            funzionano meglio per ogni fase del percorso di acquisto.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="group rounded-2xl border border-slate-800/80 bg-slate-950/60 p-5 shadow-[0_0_40px_rgba(15,23,42,0.9)] hover:border-emerald-400/80 hover:shadow-[0_0_60px_rgba(16,185,129,0.35)] transition-all duration-300"
            >
              <p className="text-xs font-medium text-emerald-300/90 mb-1">
                {item.category}
              </p>
              <h3 className="text-lg font-semibold text-slate-50">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-300/90 leading-relaxed">
                {item.desc}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/5 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-emerald-300/90">
                <span>{item.badge}</span>
                <span className="h-[1px] w-6 bg-emerald-400/60" />
                <span>AI Optimized</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
