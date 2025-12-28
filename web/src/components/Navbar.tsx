"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800/60 bg-black/40 backdrop-blur-xl">
      {/* LOGO */}
      <Link href="/" className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/60 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.7)]">
          <span className="text-xs font-semibold tracking-[0.18em] text-emerald-300">
            AI
          </span>
        </div>

        <div className="flex flex-col leading-tight">
          <span className="text-xs uppercase tracking-[0.26em] text-emerald-400/80">
            AI Ads Revolution
          </span>
          <span className="text-[11px] text-slate-400">Motore neurale di advertising</span>
        </div>
      </Link>

      {/* NAV LINKS */}
      <nav className="hidden md:flex items-center gap-8 text-sm text-slate-200">
        <Link href="/#perche" className="hover:text-emerald-300 transition-colors">
          Come funziona
        </Link>

        <Link href="/pricing" className="hover:text-emerald-300 transition-colors">
          Prezzi
        </Link>

        <Link href="/ai-chatbot" className="hover:text-emerald-300 transition-colors">
          Chatbot AI
        </Link>

        <Link href="/login" className="hover:text-emerald-300 transition-colors">
          Accedi
        </Link>

        <Link
          href="/register"
          className="px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 hover:bg-emerald-500/30 transition"
        >
          Registrati
        </Link>
      </nav>
    </header>
  );
}
