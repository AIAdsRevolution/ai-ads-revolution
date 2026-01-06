import Link from "next/link";
import UiCard from "./UiCard";

export default function Hero() {
  return (
    <header className="bg-neural py-20 border-b border-white/5">
      <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold">AI Neural Campaign Engine</h1>
          <p className="mt-4 text-zinc-300">Motore neurale di advertising stile Meta e Amazon.</p>
          <div className="mt-6 flex gap-3">
            <Link href="/register" className="px-5 py-3 bg-white text-black rounded-xl font-semibold">Registrati</Link>
            <Link href="/login" className="px-5 py-3 border border-white/20 rounded-xl">Accedi</Link>
          </div>
        </div>
        <UiCard>
          <div className="text-sm text-zinc-400">AI Status</div>
          <div className="text-2xl font-semibold mt-2">ON</div>
        </UiCard>
      </div>
    </header>
  );
}
