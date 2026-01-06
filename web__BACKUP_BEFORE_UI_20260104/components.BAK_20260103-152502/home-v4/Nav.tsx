import Link from "next/link";

export default function Nav() {
  return (
    <div className="ui-container pt-6 relative z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl ui-card flex items-center justify-center">
            <div className="h-5 w-5 rounded-md" style={{background:"linear-gradient(135deg,var(--ai),var(--glow))"}} />
          </div>
          <div>
            <div className="font-semibold leading-tight">AI Ads Revolution</div>
            <div className="text-xs ui-muted">Motore neurale di advertising</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm ui-muted">
          <a href="#come-funziona" className="hover:text-white transition">Come funziona</a>
          <a href="#ai-engine" className="hover:text-white transition">AI Engine</a>
          <Link href="/pricing" className="hover:text-white transition">Prezzi</Link>
          <Link href="/status" className="hover:text-white transition">Status</Link>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/login" className="ui-btn ui-btn-ghost">Accedi</Link>
          <Link href="/register" className="ui-btn ui-btn-primary">Registrati</Link>
        </div>
      </div>
    </div>
  );
}
