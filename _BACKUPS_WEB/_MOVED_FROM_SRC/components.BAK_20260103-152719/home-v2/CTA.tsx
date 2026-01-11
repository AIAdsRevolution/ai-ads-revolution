import Link from "next/link";

export default function CTA() {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Link
        href="/register"
        className="inline-flex items-center justify-center rounded-xl px-5 py-3 bg-white text-zinc-950 font-semibold hover:opacity-90 transition"
      >
        Registrati
      </Link>
      <Link
        href="/login"
        className="inline-flex items-center justify-center rounded-xl px-5 py-3 glass hover:bg-white/10 transition"
      >
        Accedi
      </Link>
    </div>
  );
}
