import Link from "next/link";

export default function Hero() {
  return (
    <header className="relative overflow-hidden border-b border-white/5">
      <div className="mx-auto max-w-6xl px-5 pt-24 pb-28">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight max-w-4xl">
          Fai crescere il tuo business con un motore di advertising basato sull’AI
        </h1>

        <p className="mt-6 text-zinc-300 max-w-2xl text-lg">
          AI Ads Revolution analizza milioni di segnali in tempo reale per ottimizzare
          budget, creatività e conversioni. Decisioni intelligenti, risultati misurabili.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href="/register" className="px-6 py-3 bg-white text-black rounded-xl font-semibold">
            Inizia ora
          </Link>
          <Link href="/come-funziona" className="px-6 py-3 border border-white/20 rounded-xl">
            Guarda come funziona
          </Link>
        </div>

        <div className="mt-6 text-sm text-zinc-400">
          ✔ Nessun lock-in &nbsp; ✔ Setup veloce &nbsp; ✔ Pensato anche per piccole imprese
        </div>
      </div>
    </header>
  );
}
