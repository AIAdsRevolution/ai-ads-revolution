import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "AI Ads Revolution",
  description: "Piattaforma di advertising AI-first con motore neurale.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="bg-slate-950 text-slate-100">
        {/* Navbar globale */}
        <Navbar />

        {/* Contenuto pagina */}
        <main>{children}</main>

        {/* Pulsante flottante AI Assistant */}
        <a
          href="/ai-chatbot"
          className="fixed bottom-6 right-6 z-50 flex w-[210px] flex-col items-start rounded-2xl border border-emerald-500/40 bg-slate-900/90 px-4 py-3 shadow-[0_0_25px_rgba(16,185,129,0.45)] hover:bg-slate-900 transition-all cursor-pointer group"
        >
          <span className="flex items-center gap-1 text-[10px] text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,1)] animate-pulse" />
            Online · Live
          </span>
          <span className="mt-1 text-sm font-semibold text-slate-100">
            AI Assistant
          </span>
          <span className="text-[11px] text-slate-400 group-hover:text-emerald-200">
            AI Ads Revolution
          </span>
        </a>
      </body>
    </html>
  );
}
