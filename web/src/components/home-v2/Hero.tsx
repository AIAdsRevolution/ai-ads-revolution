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
