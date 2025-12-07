"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b 
border-slate-800/80 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between 
px-4 py-3 md:px-6">
        {/* LOGO + BRAND */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center 
rounded-xl border border-emerald-400/60 bg-emerald-500/10 
shadow-[0_0_30px_rgba(16,185,129,0.7)]">
            <span className="text-xs font-semibold tracking-[0.18em] 
text-emerald-300">
              AI
            </span>
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-xs uppercase tracking-[0.26em] 
text-emerald-400/80">
              AI Ads Revolution
            </span>
            <span className="text-[11px] text-slate-400">
              Motore neurale di advertising ·{" "}
              <span className="text-emerald-300">Beta</span>
            </span>
          </div>
        </div>

        {/* NAV DESKTOP */}
        <nav className="hidden items-center gap-6 text-sm text-slate-200 
md:flex">
          <Link href="/come-funziona" className="hover:text-emerald-300 
transition-colors">
            Come funziona
          </Link>

          <Link href="/pricing" className="hover:text-emerald-300 
transition-colors">
            Prezzi
          </Link>

          <Link href="/ai-chatbot" className="hover:text-emerald-300 
transition-colors">
            Chatbot AI
          </Link>

          <Link
            href="/auth/login"
            className="text-sm text-slate-200 hover:text-emerald-300 
transition-colors"
          >
            Accedi
          </Link>

          <Link
            href="/auth/register"
            className="btn-primary-3d rounded-xl border 
border-emerald-500/70 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium 
text-emerald-100 shadow-[0_0_25px_rgba(16,185,129,0.4)] 
hover:bg-emerald-500/20 transition-colors"
          >
            Registrati
          </Link>
        </nav>
      </div>
    </header>
  );
}

