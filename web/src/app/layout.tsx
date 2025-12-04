import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Ads Revolution',
  description: 'Piattaforma di advertising AI-first con motore neurale.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className="bg-slate-950 text-slate-100">
        {children}

        {/* Pulsante AI Chatbot globale, visibile in tutte le sezioni */}
        <a
          href="/ai-chatbot"
          className="fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 shadow-lg hover:bg-emerald-400 z-50"
        >
          <span className="h-2 w-2 rounded-full bg-slate-950" />
          AI Chatbot
        </a>
      </body>
    </html>
  )
}
