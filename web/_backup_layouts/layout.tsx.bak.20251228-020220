import type { Metadata } from "next";
import "./globals.css";

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
        {children}

        {/* 🔮 Pulsante Chatbot — Sfera luminosa futuristica */}
        <a
          href="/ai-chatbot"
          className="fixed bottom-6 right-6 z-50 flex items-center 
justify-center
                     h-14 w-14 rounded-full bg-gradient-to-br 
from-emerald-400
                     via-cyan-400 to-violet-500 
shadow-[0_0_25px_rgba(94,234,212,0.9)]
                     hover:scale-105 active:scale-95 transition-transform 
duration-200"
          aria-label="Apri AI Chatbot"
        >
          {/* cerchio interno scuro */}
          <span className="absolute inset-[4px] rounded-full bg-slate-950 
opacity-80 backdrop-blur-xl" />
          {/* punto luminoso centrale */}
          <span
            className="relative h-3 w-3 rounded-full bg-emerald-200
                       shadow-[0_0_15px_rgba(52,211,153,1)] animate-ping"
          />
        </a>
      </body>
    </html>
  );
}

