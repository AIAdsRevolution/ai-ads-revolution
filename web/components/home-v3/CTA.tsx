import Link from "next/link";

export default function CTA() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Link href="/register" className="px-6 py-3 bg-white text-black rounded-xl font-semibold">
        Crea un account
      </Link>
      <Link href="/dashboard" className="px-6 py-3 border border-white/20 rounded-xl">
        Accedi alla dashboard
      </Link>
    </div>
  );
}
