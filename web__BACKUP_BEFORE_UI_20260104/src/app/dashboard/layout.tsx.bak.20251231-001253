"use client";

import "../globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/campaigns", label: "Campagne" },
  { href: "/dashboard/ai", label: "AI Assistant" },
  { href: "/dashboard/budget", label: "Budget" },
  { href: "/dashboard/creatives", label: "Creatività" },
  { href: "/dashboard/settings", label: "Impostazioni" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 flex-col border-r border-slate-800 bg-slate-950/90">
        <div className="px-4 pt-4 pb-3 border-b border-slate-800">
          <div className="text-xs font-semibold text-slate-400">
            AI Ads Revolution
          </div>
          <div className="text-[11px] text-slate-500">
            Dashboard inserzionista
          </div>
        </div>

        <nav className="flex-1 px-2 py-3 space-y-1 text-xs">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const baseClasses =
              "flex items-center gap-2 rounded-lg px-3 py-2 transition-colors";
            const activeClasses =
              " bg-emerald-500/15 text-emerald-300 border border-emerald-500/50";
            const inactiveClasses =
              " text-slate-300 hover:bg-slate-900 hover:text-slate-50";

            return (
              <Link
                key={item.href}
                href={item.href}
                className={baseClasses + (active ? activeClasses : inactiveClasses)}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Contenuto */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl px-4 py-3 flex items-center justify-between">
          <div className="text-xs font-semibold text-slate-200">
            Pannello inserzionista
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400"><Link
              href="/auth/login"
              className="rounded-lg border border-slate-700 px-2.5 py-1 hover:bg-slate-900 text-xs"
            >
              Esci
            </Link>
          </div>
        </header>

        <main className="flex-1 bg-slate-950/95">{children}</main>
      </div>
    </div>
  );
}
