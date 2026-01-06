"use client";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-white/10 bg-black/20 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-white/70">
          © {year} <span className="text-white/90">AI Ads Revolution</span>. Tutti i diritti riservati.
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <a className="text-white/70 hover:text-white" href="/chi-siamo">Chi siamo</a>
          <a className="text-white/70 hover:text-white" href="/privacy">Privacy</a>
          <a className="text-white/70 hover:text-white" href="/termini">Termini</a>
          <a className="text-white/70 hover:text-white" href="/cookie">Cookie</a>
          <a className="text-white/70 hover:text-white" href="/status">Status</a>
        </nav>

        <div className="flex items-center gap-3">
          <a className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-white/80 hover:text-white hover:border-white/20"
             href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            in <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <a className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-white/80 hover:text-white hover:border-white/20"
             href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">
            𝕏 <span className="hidden sm:inline">X</span>
          </a>
          <a className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-white/80 hover:text-white hover:border-white/20"
             href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            ⌁ <span className="hidden sm:inline">Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
