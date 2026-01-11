import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="ui-container flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="text-sm ui-muted">© 2025 AI Ads Revolution. Tutti i diritti riservati.</div>
        <div className="flex gap-4 text-sm ui-muted flex-wrap">
          <Link href="/chi-siamo">Chi siamo</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/termini">Termini</Link>
          <Link href="/cookie">Cookie</Link>
          <Link href="/status">Status</Link>
        </div>
      </div>
    </footer>
  );
}
