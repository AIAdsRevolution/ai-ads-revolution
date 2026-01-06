export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 text-sm text-zinc-400">
      <div className="mx-auto max-w-6xl px-5 flex flex-wrap gap-4 justify-between">
        <div>© 2025 AI Ads Revolution</div>
        <div className="flex gap-4">
          <a href="/chi-siamo">Chi siamo</a>
          <a href="/privacy">Privacy</a>
          <a href="/termini">Termini</a>
          <a href="/cookie">Cookie</a>
        </div>
      </div>
    </footer>
  );
}
