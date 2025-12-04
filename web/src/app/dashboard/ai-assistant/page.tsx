'use client'

import { useEffect, useState } from 'react'

type Message = {
  id: number
  from: 'user' | 'ai'
  text: string
  ts: string
}

type CampaignMetric = {
  id: number
  campaign_id: string
  impressions: number
  clicks: number
  ctr: number
  cost_eur: number | string
  revenue_eur: number | string
  roas: number
  ts: string
}

export default function AiAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: 'ai',
      text:
        'Ciao, sono il tuo AI Assistant. Posso analizzare le tue campagne, spiegarti perché il ROAS sale o scende e suggerirti dove spostare il budget.',
      ts: new Date().toLocaleString('it-IT'),
    },
  ])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [latestSnapshot, setLatestSnapshot] = useState<{
    roas: number
    ctr: number
    cpc: number
    cost: number
    revenue: number
  } | null>(null)

  async function loadSnapshot() {
    try {
      const res = await fetch('/api/campaign-metrics')
      const json = await res.json()
      if (!res.ok) {
        console.error('Errore API metrics assistant:', json)
        return
      }
      const data: CampaignMetric[] = json.metrics ?? []
      if (!data.length) {
        setLatestSnapshot(null)
        return
      }

      const totals = data.reduce(
        (acc, m) => {
          acc.impressions += m.impressions || 0
          acc.clicks += m.clicks || 0
          acc.cost += Number(m.cost_eur || 0)
          acc.revenue += Number(m.revenue_eur || 0)
          return acc
        },
        { impressions: 0, clicks: 0, cost: 0, revenue: 0 }
      )

      const ctr =
        totals.impressions > 0
          ? (totals.clicks / totals.impressions) * 100
          : 0
      const roas =
        totals.cost > 0 ? totals.revenue / totals.cost : 0
      const cpc =
        totals.clicks > 0 ? totals.cost / totals.clicks : 0

      setLatestSnapshot({
        roas,
        ctr,
        cpc,
        cost: totals.cost,
        revenue: totals.revenue,
      })
    } catch (err) {
      console.error('Errore snapshot assistant:', err)
    }
  }

  useEffect(() => {
    loadSnapshot()
  }, [])

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return

    const userText = input.trim()
    const userMessage: Message = {
      id: Date.now(),
      from: 'user',
      text: userText,
      ts: new Date().toLocaleString('it-IT'),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setSending(true)

    // Aggiorniamo lo snapshot prima della risposta
    await loadSnapshot()

    const snap = latestSnapshot

    let replyText: string

    if (!snap) {
      replyText =
        'Al momento non vedo ancora dati in campaign_metrics. Puoi lasciare il simulatore AI attivo qualche minuto o inserire metriche demo, poi ricalcolerò CTR, CPC e ROAS per consigliarti meglio.'
    } else {
      const { roas, ctr, cpc, cost, revenue } = snap
      replyText =
        `Ecco un riassunto basato sui tuoi dati attuali:\n\n` +
        `• ROAS medio: ~${roas.toFixed(2)}x\n` +
        `• CTR medio: ~${ctr.toFixed(2)}%\n` +
        `• CPC medio: ~€ ${cpc.toFixed(2)}\n` +
        `• Spesa totale: ~€ ${cost.toFixed(2)}\n` +
        `• Entrate totali attribuite: ~€ ${revenue.toFixed(2)}\n\n` +
        `Interpretazione rapida:\n` +
        (roas >= 3
          ? '- Il ROAS è buono: puoi valutare di aumentare gradualmente il budget sulle campagne più forti.\n'
          : roas >= 1.5
          ? '- Il ROAS è discreto: prova ad ottimizzare creatività e targeting prima di scalare la spesa.\n'
          : '- Il ROAS è basso: concentra il budget solo sulle campagne con performance migliori e rivedi il funnel.\n') +
        (ctr >= 5
          ? '- Il CTR è sano: gli annunci sono attraenti per il pubblico.\n'
          : '- Il CTR è un po’ basso: valuta headline più forti, creatività più chiare e test A/B.\n') +
        (cpc <= 0.5
          ? '- Il CPC è competitivo rispetto alla maggior parte dei verticali.\n'
          : '- Il CPC è alto: restringi il pubblico più qualificato e riduci posizionamenti poco performanti.\n') +
        `\nIn una versione successiva potrò analizzare ogni campagna singola (Meta, Google, ecc.) e dirti esattamente dove spostare il budget.`
    }

    const aiMessage: Message = {
      id: Date.now() + 1,
      from: 'ai',
      text: replyText,
      ts: new Date().toLocaleString('it-IT'),
    }

    setMessages((prev) => [...prev, aiMessage])
    setSending(false)
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-8 pb-24">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
            AI Ads Revolution · Dashboard inserzionista
          </p>
          <h1 className="text-2xl font-semibold">AI Assistant</h1>
          <p className="text-sm text-slate-400">
            Confrontati con l&apos;AI sulle performance delle tue
            campagne. Le risposte si basano sui dati di
            <span className="font-mono"> campaign_metrics</span>.
          </p>
        </div>

        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col h-[70vh]">
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.from === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm whitespace-pre-line ${
                    m.from === 'user'
                      ? 'bg-emerald-500 text-slate-950 rounded-br-sm'
                      : 'bg-slate-800 text-slate-100 rounded-bl-sm'
                  }`}
                >
                  <p>{m.text}</p>
                  <p className="mt-1 text-[10px] opacity-70">
                    {m.from === 'user' ? 'Tu · ' : 'AI Assistant · '}
                    {m.ts}
                  </p>
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="max-w-[70%] rounded-2xl bg-slate-800 px-3 py-2 text-xs text-slate-400">
                  L&apos;AI sta elaborando i dati delle tue campagne…
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSend}
            className="mt-4 flex items-center gap-2"
          >
            <input
              className="flex-1 rounded-full bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
              placeholder="Chiedi qualcosa (es. Perché il mio ROAS è 3.7x? Dove posso aumentare il budget?)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={sending}
              className="rounded-full bg-emerald-500 text-slate-950 text-sm font-medium px-4 py-2 hover:bg-emerald-400 disabled:opacity-60"
            >
              Invia
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}
