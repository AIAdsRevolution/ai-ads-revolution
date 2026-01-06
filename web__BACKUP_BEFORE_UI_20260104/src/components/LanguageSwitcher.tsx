"use client";

import {usePathname} from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname(); // es: /it/pricing
  const parts = pathname.split("/");
  const current = parts[1] || "it";
  const next = current === "it" ? "en" : "it";
  const rest = "/" + parts.slice(2).join("/");

  const href = `/${next}${rest === "/" ? "" : rest}`;

  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:opacity-90"
      aria-label="Switch language"
    >
      🌐 {current.toUpperCase()} → {next.toUpperCase()}
    </a>
  );
}
