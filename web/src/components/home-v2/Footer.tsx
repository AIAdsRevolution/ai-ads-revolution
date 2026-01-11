import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      {/* Legal */}
      <div className="mt-6 flex flex-wrap gap-4 text-sm opacity-80">
        <a href="https://www.iubenda.com/privacy-policy/34512888" target="_blank" rel="noreferrer">
          Privacy Policy
        </a>
        <a href="https://www.iubenda.com/privacy-policy/34512888/cookie-policy" target="_blank" rel="noreferrer">
          Cookie Policy
        </a>
        <a href="https://www.iubenda.com/termini-e-condizioni/34512888" target="_blank" rel="noreferrer">
          Termini e Condizioni
        </a>
      </div>

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
