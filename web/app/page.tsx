"use client";

import { AIMetrics } from "@/components/AIMetrics";
import Link from "next/link";
import NeuralBackground from "../components/NeuralBackground";

const stats = [
  { label: "CTR medio", value: "+32%", helper: "su campagne ottimizzate con AI" },
  { label: "CPC medio", value: "€0,21", helper: "costo per clic indicativo" },
  { label: "ROAS medio", value: "4,7x", helper: "ritorno su spesa pubblicitaria" },
];

const steps = [
  {
    step: "01",
    title: "Collega il tuo business",
    desc: "Crea il tuo account inserzionista, collega prodotti o servizi e definisci gli obiettivi principali.",
  },
  {
    step: "02",
    title: "Lascia lavorare l'AI",
    desc: "Il motore AI analizza segnali di intento, contesto e storico per distribuire il budget dove rende di più.",
  },
  {
    step: "03",
    title: "Scala ciò che funziona",
    desc: "Monitora CTR, ROAS e conversioni e aumenta il budget solo sulle campagne che performano meglio.",
  },
];

const socials = [
  { label: "X", tag: "News & update" },
  { label: "TG", tag: "Community Telegram" },
  { label: "DS", tag: "Server Discord" },
  { label: "in", tag: "LinkedIn" },
  { label: "R", tag: "Reddit" },
  { label: "f", tag: "Facebook" },
  { label: "IG", tag: "Instagram" },
  { label: "▶", tag: "YouTube" },
  { label: "TT", tag: "TikTok" },
];

async function handleBasicCheckout() {
  try {
    const res = await fetch("/api/billing/create-checkout-session", {
      method: "POST",
    });

    if (!res.ok) {
      console.error("Errore Stripe:", await res.text());
      alert("Errore nell'attivazione del piano. Riprova tra poco.");
      return;
    }

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      console.error("Risposta Stripe senza URL:", data);
      alert("Non è stato possibile aprire la pagina di pagamento.");
    }
  } catch (err) {
    console.error("Errore di rete Stripe:", err);
    alert("Problema di connessione con Stripe. Riprova tra poco.");
  }
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-slate-100">
      <AIMetrics />
      <NeuralBackground />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-10 pt-6 md:px-6 md:pt-8">
        {/* TOP BAR */}
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/40 bg-emerald-500/10 shadow-[0_0_25px_rgba(16,185,129,0.5)]">
              <span className="text-xs font-semibold tracking-[0.18em] text-emerald-300">
                AI
              </span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xs uppercase tracking-[0.26em] text-emerald-400/80">
                AI Ads Revolution
              </span>
              <span className="text-[11px] text-slate-400">
                Motore neurale di advertising • <span className="text-emerald-300">Beta</span>
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-slate-200 md:flex">
            <Link href="#perche" className="hover:text-emerald-300 transition-colors">
              Piccola impresa
            </Link>
            <Link href="#perche" className="hover:text-emerald-300 transition-colors">
              Azienda di grandi dimensioni
            </Link>
            <Link href="/come-funziona" className="hover:text-emerald-300 transition-colors">
              Scopri
            </Link>
            <Link
              href="/auth/login"
              className="text-sm text-slate-200 hover:text-emerald-300 transition-colors"
            >
              Accedi
            </Link>
            <Link
              href="/auth/register"
              className="rounded-full border border-emerald-500/70 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-100 shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:bg-emerald-500/20 transition-colors"
            >
              Registrati
            </Link>
          </nav>
        </header>

        {/* HERO */}
        <section className="mt-10 flex flex-col gap-10 lg:mt-16 lg:flex-row lg:items-start">
          {/* Colonna sinistra */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-emerald-300">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
              Motore neurale di advertising attivo
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.26em] text-emerald-400/80">
                Piattaforma di advertising AI-first
              </p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl lg:text-[2.7rem]">
                Fai crescere la tua attività
                <span className="block text-emerald-300">
                  con un motore neurale di advertising.
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-sm text-slate-300 md:text-base">
                AI Ads Revolution analizza milioni di segnali in tempo reale per ottimizzare
                visibilità, traffico e conversioni. Raggiungi gli acquirenti nel momento esatto
                in cui stanno cercando prodotti come i tuoi.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_30px_rgba(16,185,129,0.75)] hover:bg-emerald-400 transition-colors"
              >
                Inizia ora
              </Link>
              <Link
                href="/come-funziona"
                className="inline-flex items-center gap-1 rounded-full border border-slate-600/70 bg-slate-900/70 px-4 py-2 text-sm text-slate-200 hover:border-emerald-400/70 hover:text-emerald-200 transition-colors"
              >
                <span>Guarda come funziona</span>
                <span className="text-xs">↗</span>
              </Link>
              <span className="ml-1 text-xs text-slate-400 md:text-[13px]">
                +30% vendite medie attribuite alle campagne AI*
              </span>
            </div>

            <p className="text-[11px] text-slate-500">
              *Dati interni AI Ads Revolution su inserzionisti beta. I risultati medi non garantiscono
              performance future.
            </p>

            {/* Social login style */}
            <div className="mt-4 space-y-3">
              <p className="text-xs text-slate-400">Oppure continua con</p>
              <div className="flex flex-wrap gap-2">
                <button className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-200 hover:border-emerald-400/80 hover:text-emerald-200 transition-colors">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[11px]">
                    G
                  </span>
                  <span>Google</span>
                </button>
                <button className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-200 hover:border-emerald-400/80 hover:text-emerald-200 transition-colors">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[11px]">
                    
                  </span>
                  <span>Apple</span>
                </button>
                <button className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-200 hover:border-emerald-400/80 hover:text-emerald-200 transition-colors">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[11px]">
                    TG
                  </span>
                  <span>Telegram</span>
                </button>
              </div>
            </div>
          </div>

          {/* Colonna destra: pannello AI + stats */}
          <div className="w-full max-w-md space-y-4 lg:w-96">
            <div className="rounded-2xl border border-emerald-500/50 bg-slate-950/80 p-4 shadow-[0_0_45px_rgba(16,185,129,0.7)]">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-300/90">
                    AI Neural Campaign Engine
                  </p>
                  <p className="text-[11px] text-emerald-200/90">
                    Live • Realtime signals
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">AI</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-100">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                    ON
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-slate-950 to-slate-950/80 p-3">
                <p className="text-xs text-slate-300">
                  Intento di acquisto alto
                </p>
                <p className="mt-1 text-[11px] text-emerald-200/90">
                  Ottimizzazione automatica di bid e creatività in tempo reale.
                </p>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-slate-700/80 bg-slate-950/80 p-2 text-center"
                  >
                    <p className="text-[10px] text-slate-400">{s.label}</p>
                    <p className="mt-1 text-sm font-semibold text-emerald-300">
                      {s.value}
                    </p>
                    <p className="mt-0.5 text-[10px] text-slate-500">
                      {s.helper}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-[11px] text-slate-500">
                Performance demo ultimi 28 giorni · In arrivo: integrazione Stripe · App iOS / Android · Multilingua globale
              </p>
            </div>
          </div>
        </section>

        {/* PERCHÉ */}
        <section id="perche" className="mt-14 space-y-6">
          <div className="max-w-3xl">
            <h2 className="text-xl font-semibold md:text-2xl">
              Perché scegliere{" "}
              <span className="text-emerald-300">AI Ads Revolution</span>
            </h2>
            <p className="mt-2 text-sm text-slate-300 md:text-[15px]">
              Raggiungi i clienti in ogni fase del percorso di acquisto. L'intelligenza artificiale
              ottimizza le campagne dalla scoperta alla conversione, adattando budget, creatività e
              targeting in tempo reale.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800/90 bg-slate-950/80 p-4">
              <p className="text-xs font-semibold text-emerald-300">
                AI-first in ogni decisione
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Ogni asta, offerta e creatività viene valutata da un motore AI che analizza migliaia
                di segnali in tempo reale.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800/90 bg-slate-950/80 p-4">
              <p className="text-xs font-semibold text-emerald-300">
                Dalla scoperta alla conversione
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Gestisci visibilità, traffico e vendite dalla stessa dashboard: la piattaforma segue
                tutto il percorso del cliente.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800/90 bg-slate-950/80 p-4">
              <p className="text-xs font-semibold text-emerald-300">
                Pensato per tutte le aziende
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Dalla piccola impresa al brand globale: inizi con budget ridotti e scali solo quando
                i risultati lo confermano.
              </p>
            </div>
          </div>
        </section>

        {/* SETUP GUIDATO + STEP */}
        <section className="mt-14 grid gap-10 border-t border-slate-800/80 pt-10 lg:grid-cols-[1.1fr,1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Setup guidato
            </p>
            <h3 className="mt-2 text-lg font-semibold">
              Non sai da dove cominciare?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              La guida AI integrata ti mostra passo dopo passo come creare, lanciare e ottimizzare le
              campagne. Nessuna esperienza tecnica richiesta.
            </p>

            <div className="mt-4 space-y-1 text-xs text-slate-300">
              <p>Setup campagna guidato: <span className="text-emerald-300">100%</span></p>
              <p>Ottimizzazione automatica: <span className="text-emerald-300">Attiva</span></p>
              <p>Suggerimenti creativi: <span className="text-emerald-300">Disponibili</span></p>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition-colors"
              >
                Inizia subito
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-slate-200 hover:border-emerald-400 hover:text-emerald-200 transition-colors"
              >
                Accedi alla dashboard
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {steps.map((s) => (
              <div
                key={s.step}
                className="flex gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-3"
              >
                <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-[11px] font-semibold text-emerald-300">
                  {s.step}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-100">{s.title}</p>
                  <p className="mt-1 text-xs text-slate-300">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PIANO BASIC */}
        <section className="mt-14 border-t border-slate-800/80 pt-10">
          <div className="max-w-3xl">
            <h3 className="text-lg font-semibold">Piani e prezzi</h3>
            <p className="mt-2 text-sm text-slate-300">
              Inizia con il piano Basic e scala quando sei pronto. Nessun costo di setup, nessun
              vincolo annuale. Paghi solo per quello che usi.
            </p>
          </div>

          <div className="mt-6 max-w-md rounded-2xl border border-emerald-500/40 bg-slate-950/80 p-5 shadow-[0_0_40px_rgba(16,185,129,0.35)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Piano Basic
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Ideale per iniziare a testare campagne AI in modo sicuro.
            </p>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-emerald-300">€ 29</span>
              <span className="text-xs text-slate-400">/ mese, cancellabile in qualsiasi momento</span>
            </div>

            <ul className="mt-4 space-y-1.5 text-sm text-slate-300">
              <li>• Accesso alla dashboard inserzionista</li>
              <li>• AI copywriter per annunci sponsorizzati</li>
              <li>• Report base su impression, click e conversioni</li>
              <li>• Supporto email per la fase beta</li>
            </ul>

            <button
              type="button"
              onClick={handleBasicCheckout}
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition-colors"
            >
              Attiva piano Basic
            </button>

            <p className="mt-2 text-[11px] text-slate-500">
              Pagamento elaborato in modo sicuro tramite Stripe. I dati della carta non vengono
              memorizzati sui server di AI Ads Revolution.
            </p>
          </div>
        </section>

        {/* FOOTER / COMMUNITY */}
        <footer className="mt-14 border-t border-slate-800/80 pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-100">
                Community e aggiornamenti
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Segui AI Ads Revolution sui canali ufficiali per aggiornamenti, roadmap e casi studio.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <button
                  key={s.label}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1.5 text-[11px] text-slate-200 hover:border-emerald-400/80 hover:text-emerald-200 transition-colors"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[11px]">
                    {s.label}
                  </span>
                  <span className="hidden text-[10px] text-slate-400 sm:inline">
                    {s.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-slate-800/80 pt-4 text-[11px] text-slate-500 md:flex-row md:items-center md:justify-between">
            <div>
              <p>© 2025 AI Ads Revolution. Tutti i diritti riservati.</p>
              <p className="mt-1 max-w-md">
                Piattaforma di advertising AI-first pensata per aiutare anche le realtà più piccole a
                competere con i grandi player.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/chi-siamo" className="hover:text-emerald-300 transition-colors">
                Chi siamo
              </Link>
              <Link href="/condizioni-uso" className="hover:text-emerald-300 transition-colors">
                Condizioni Generali di Uso e Vendita
              </Link>
              <Link href="/privacy" className="hover:text-emerald-300 transition-colors">
                Informativa sulla Privacy
              </Link>
              <Link href="/cookie" className="hover:text-emerald-300 transition-colors">
                Informativa cookie
              </Link>
              <Link href="/status" className="hover:text-emerald-300 transition-colors">
                Status piattaforma
              </Link>
              <Link href="/posizioni-aperte" className="hover:text-emerald-300 transition-colors">
                Posizioni aperte
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
