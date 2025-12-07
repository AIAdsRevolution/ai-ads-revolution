"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [loading, setLoading] = useState(false);

  const handleBasicCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/billing/create-checkout-session", {
        method: "POST",
      });

      if (!res.ok) {
        console.error("Errore checkout Basic:", await res.text());
        alert(
          "Si è verificato un errore nell'attivazione del piano Basic. Riprova tra poco."
        );
        return;
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Non è stato possibile aprire la pagina di pagamento Stripe.");
      }
    } catch (err) {
      console.error("Errore checkout Basic:", err);
      alert(
        "Si è verificato un errore nell'attivazione del piano Basic. Riprova tra poco."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black text-slate-100">
      {/* GLOW OLOGRAFICO DI SFONDO */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-10 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="absolute right-[-6rem] top-1/3 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-14 pt-8 md:px-6">
        {/* HERO */}
        <section className="grid gap-6 md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
          {/* CARD MOTORE NEURALE */}
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/50 bg-gradient-to-br from-slate-950 via-slate-950/95 to-black p-5 shadow-[0_0_60px_rgba(16,185,129,0.55)] md:p-7">
            {/* bordo interno glow */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl border border-emerald-400/15 shadow-[0_0_120px_rgba(16,185,129,0.55)]" />

            <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.26em] text-emerald-300">
              <span>AI Neural Campaign Engine</span>
              <span className="flex items-center gap-2">
                <span className="hidden sm:inline">Live · Realtime signals ·</span>{" "}
                Finestra ultimi 28 giorni
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-emerald-300">
                  Raccolta dati in corso
                </p>
                <p className="mt-1 max-w-md text-sm text-slate-200/90">
                  L&apos;AI ottimizza offerte, creatività e sorgenti di traffico in
                  tempo reale, spostando il budget dove vede più probabilità di
                  conversione.
                </p>
              </div>

              {/* AI PILL + PULSANTE STATO */}
              <div className="flex flex-col items-end gap-3">
                <div className="relative flex items-center gap-2 rounded-full border border-emerald-500/40 bg-slate-950/80 px-3 py-1 text-[11px] text-slate-300 shadow-[0_0_25px_rgba(16,185,129,0.5)]">
                  <span className="uppercase tracking-[0.18em] text-slate-200">
                    AI Ads Revolution
                  </span>
                  <span className="relative flex h-5 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] font-semibold text-emerald-300">
                    <span className="absolute left-1 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)] animate-ping" />
                    <span className="relative z-10">ON</span>
                  </span>
                </div>
                <div className="rounded-2xl border border-slate-700/80 bg-slate-950/90 px-3 py-2 text-right">
                  <p className="text-[11px] text-slate-400">Trend AI</p>
                  <p className="text-sm font-semibold text-emerald-300">
                    ROAS 0.0x
                  </p>
                </div>
              </div>
            </div>

            {/* GRAFICO BARRE ANIMATE */}
            <div className="mt-5 rounded-2xl border border-slate-800/80 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/70 px-3 py-3">
              <div className="mb-2 flex items-center justify-between text-[11px] text-slate-400">
                <span>Simulazione neurale · segnali in tempo reale</span>
                <span>Ultimi 28 giorni · Demo</span>
              </div>
              <div className="flex h-28 items-end gap-[3px] overflow-hidden">
                {Array.from({ length: 36 }).map((_, i) => {
                  const base = (Math.sin(i * 0.55) + 1) / 2; // 0..1
                  const height = 20 + base * 65;
                  return (
                    <div
                      key={i}
                      className="w-[5px] rounded-full bg-gradient-to-t from-emerald-500/70 via-emerald-300 to-white/90 shadow-[0_0_18px_rgba(16,185,129,0.9)] animate-pulse"
                      style={{
                        height: `${height}%`,
                        animationDelay: `${i * 90}ms`,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* KPI + COPY HERO */}
          <div className="flex flex-col gap-4">
            {/* KPI */}
            <div className="rounded-3xl border border-slate-800/90 bg-slate-950/95 p-5 shadow-[0_0_40px_rgba(15,23,42,0.9)]">
              <p className="text-xs uppercase tracking-[0.26em] text-emerald-400/80">
                KPI principali AI
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                <div className="group rounded-2xl border border-slate-800 bg-slate-950/95 px-3 py-3 transition-transform duration-200 hover:-translate-y-1 hover:border-emerald-400/70 hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]">
                  <p className="text-[11px] text-slate-400">CTR medio</p>
                  <p className="mt-1 text-lg font-semibold text-emerald-300">
                    0.0%
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Click / impression
                  </p>
                </div>
                <div className="group rounded-2xl border border-slate-800 bg-slate-950/95 px-3 py-3 transition-transform duration-200 hover:-translate-y-1 hover:border-emerald-400/70 hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]">
                  <p className="text-[11px] text-slate-400">CPC medio</p>
                  <p className="mt-1 text-lg font-semibold text-emerald-300">
                    € 0.00
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Costo per clic
                  </p>
                </div>
                <div className="group rounded-2xl border border-slate-800 bg-slate-950/95 px-3 py-3 transition-transform duration-200 hover:-translate-y-1 hover:border-emerald-400/70 hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]">
                  <p className="text-[11px] text-slate-400">ROAS medio</p>
                  <p className="mt-1 text-lg font-semibold text-emerald-300">
                    0.0x
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Ritorno spesa adv
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[11px] text-slate-400">
                Dati demo forniti da AI-Core. Quando collegherai campagne reali,
                questi valori rifletteranno le performance effettive.
              </p>
            </div>

            {/* COPY HERO */}
            <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-slate-950 via-slate-950/95 to-black px-5 py-5 shadow-[0_0_45px_rgba(16,185,129,0.4)]">
              <p className="text-[11px] uppercase tracking-[0.26em] text-emerald-400/80">
                Motore neurale di advertising attivo
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.26em] text-emerald-400/80">
                Piattaforma di advertising AI-first
              </p>
              <h1 className="mt-3 text-2xl font-semibold md:text-3xl">
                Fai crescere la tua attività{" "}
                <span className="text-emerald-400">
                  con un motore neurale di advertising.
                </span>
              </h1>
              <p className="mt-3 text-sm text-slate-200/90">
                AI Ads Revolution analizza milioni di segnali in tempo reale per
                ottimizzare visibilità, traffico e conversioni. Raggiungi gli
                acquirenti nel momento esatto in cui stanno cercando prodotti
                come i tuoi.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleBasicCheckout}
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_32px_rgba(16,185,129,0.6)] hover:bg-emerald-300 transition-colors disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading
                    ? "Attivazione piano Basic…"
                    : "Inizia ora · Attiva Basic"}
                </button>
                <Link
                  href="/come-funziona"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-2.5 text-sm font-semibold text-slate-100 hover:border-emerald-400 hover:text-emerald-200 transition-colors"
                >
                  Guarda come funziona ↗
                </Link>
              </div>

              <p className="mt-3 text-[11px] text-slate-400">
                +30% vendite medie attribuite alle campagne AI*{" "}
                <span className="block text-[10px] text-slate-500">
                  *Dati interni AI Ads Revolution su inserzionisti beta. I
                  risultati medi non garantiscono performance future.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* SEZIONE PERCHÉ / SETUP */}
        <section
          id="perche"
          className="mt-10 grid gap-6 md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]"
        >
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.26em] text-emerald-400/80">
              Perché scegliere AI Ads Revolution
            </p>
            <p className="text-sm text-slate-300">
              Raggiungi i clienti in ogni fase del percorso di acquisto.
              L&apos;intelligenza artificiale ottimizza le campagne dalla
              scoperta alla conversione, adattando budget, creatività e
              targeting in tempo reale.
            </p>

            <div className="grid gap-4 md:grid-cols-2 text-sm">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  AI-first in ogni decisione
                </p>
                <p className="mt-2 text-sm text-slate-200">
                  Ogni asta, offerta e creatività viene valutata da un motore AI
                  che analizza migliaia di segnali in tempo reale.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Dalla scoperta alla conversione
                </p>
                <p className="mt-2 text-sm text-slate-200">
                  Gestisci visibilità, traffico e vendite dalla stessa
                  dashboard: la piattaforma segue tutto il percorso del cliente.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Pensato per tutte le aziende
                </p>
                <p className="mt-2 text-sm text-slate-200">
                  Dalla piccola impresa al brand globale: inizi con budget
                  ridotti e scali solo quando i risultati lo confermano.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Setup guidato
                </p>
                <p className="mt-2 text-sm text-slate-200">
                  La guida AI integrata ti mostra passo dopo passo come creare,
                  lanciare e ottimizzare le campagne. Nessuna esperienza
                  tecnica richiesta.
                </p>
              </div>
            </div>
          </div>

          {/* STEPS / SETUP */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5">
            <p className="text-[11px] uppercase tracking-[0.26em] text-emerald-400/80">
              Setup guidato
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Non sai da dove cominciare? La piattaforma ti guida dal primo
              accesso fino alle campagne attive.
            </p>

            <div className="mt-4 space-y-4 text-sm">
              <div className="flex gap-3">
                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-emerald-500/60 bg-emerald-500/15 text-[11px] font-semibold text-emerald-300">
                  01
                </div>
                <div>
                  <p className="font-semibold text-slate-100">
                    Collega il tuo business
                  </p>
                  <p className="text-slate-300">
                    Crea il tuo account inserzionista, collega prodotti o
                    servizi e definisci gli obiettivi principali.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-emerald-500/60 bg-emerald-500/15 text-[11px] font-semibold text-emerald-300">
                  02
                </div>
                <div>
                  <p className="font-semibold text-slate-100">
                    Lascia lavorare l&apos;AI
                  </p>
                  <p className="text-slate-300">
                    Il motore AI analizza segnali di intento, contesto e
                    storico per distribuire il budget dove rende di più.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-emerald-500/60 bg-emerald-500/15 text-[11px] font-semibold text-emerald-300">
                  03
                </div>
                <div>
                  <p className="font-semibold text-slate-100">
                    Scala ciò che funziona
                  </p>
                  <p className="text-slate-300">
                    Monitora CTR, ROAS e conversioni e aumenta il budget solo
                    sulle campagne che performano meglio.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3 text-[11px] text-slate-400">
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/5 px-3 py-1 text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)]" />
                Setup campagna guidato: 100%
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1">
                Ottimizzazione automatica: Attiva
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1">
                Suggerimenti creativi: Disponibili
              </span>
            </div>
          </div>
        </section>

        {/* PIANO BASIC + COMMUNITY */}
        <section className="mt-10 border-t border-slate-800/80 pt-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.26em] text-emerald-400/80">
                Piani e prezzi
              </p>
              <h2 className="mt-2 text-xl font-semibold md:text-2xl">
                Inizia con il piano Basic e scala quando sei pronto.
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Nessun costo di setup, nessun vincolo annuale. Paghi solo per
                quello che usi. Puoi sempre passare ad Advanced o soluzioni
                Ultra su misura.
              </p>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-slate-100 hover:border-emerald-400 hover:text-emerald-200 transition-colors"
            >
              Vedi tutti i piani →
            </Link>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="rounded-3xl border border-emerald-500/60 bg-slate-950/95 p-5 shadow-[0_0_40px_rgba(16,185,129,0.4)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Piano Basic
              </p>
              <p className="mt-1 text-sm text-slate-200">
                Ideale per iniziare a testare campagne AI in modo sicuro.
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-semibold text-emerald-300">
                  € 19
                </span>
                <span className="text-xs text-slate-400">
                  / mese, cancellabile in qualsiasi momento
                </span>
              </div>
              <ul className="mt-4 space-y-1.5 text-sm text-slate-100">
                <li>• Accesso alla dashboard inserzionista</li>
                <li>• AI copywriter per annunci sponsorizzati</li>
                <li>• Report base su impression, click e conversioni</li>
                <li>• Supporto email per la fase beta</li>
              </ul>
              <button
                onClick={handleBasicCheckout}
                disabled={loading}
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_32px_rgba(16,185,129,0.6)] hover:bg-emerald-300 transition-colors disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Attivazione piano Basic…" : "Attiva piano Basic"}
              </button>
              <p className="mt-2 text-[11px] text-slate-400">
                Pagamento elaborato in modo sicuro tramite Stripe. I dati della
                carta non vengono memorizzati sui server di AI Ads Revolution.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5 text-sm">
              <p className="text-[11px] uppercase tracking-[0.26em] text-emerald-400/80">
                Community e aggiornamenti
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Segui AI Ads Revolution sui canali ufficiali per aggiornamenti,
                roadmap e casi studio.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <span className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2">
                  X · News &amp; update
                </span>
                <span className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2">
                  TG · Community Telegram
                </span>
                <span className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2">
                  DS · Server Discord
                </span>
                <span className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2">
                  in · LinkedIn
                </span>
                <span className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2">
                  ▶ · YouTube
                </span>
                <span className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2">
                  TT · TikTok
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-10 border-t border-slate-800/80 pt-5 text-[11px] text-slate-500">
          <p>© 2025 AI Ads Revolution. Tutti i diritti riservati.</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link href="/chi-siamo" className="hover:text-emerald-300">
              Chi siamo
            </Link>
            <Link href="/condizioni-uso" className="hover:text-emerald-300">
              Condizioni Generali di Uso e Vendita
            </Link>
            <Link href="/privacy" className="hover:text-emerald-300">
              Informativa sulla Privacy
            </Link>
            <Link href="/cookie" className="hover:text-emerald-300">
              Informativa cookie
            </Link>
            <Link href="/status" className="hover:text-emerald-300">
              Status piattaforma
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
