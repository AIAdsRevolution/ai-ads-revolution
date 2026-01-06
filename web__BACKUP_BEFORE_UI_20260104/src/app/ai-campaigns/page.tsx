'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts'

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

export default function AiCampaignsPage() {
  const [metrics, setMetrics] = useState<CampaignMetric[]>([])
  const [loading, setLoading] = useState(true)

  async function loadMetrics() {
    try {
      const res = await fetch('/api/campaign-metrics')
      const json = await res.json()
      if (!res.ok) {
        console.error('Errore API metrics:', json)
        return
      }
      setMetrics(json.metrics ?? [])
    } catch (err) {
      console.error('Errore fetch metrics:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMetrics()

    // ogni 10 secondi chiamiamo il simulatore e ricarichiamo le metriche
    const interval = setInterval(async () => {
      try {
        await fetch('/api/metrics-simulate', { method: 'POST' })
        await loadMetrics()
      } catch (err) {
        console.error('Errore simulatore metrics:', err)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const totals = useMemo(
    () =>
      metrics.reduce(
        (acc, m) => {
          acc.impressions += m.impressions || 0
          acc.clicks += m.clicks || 0
          acc.cost += Number(m.cost_eur || 0)
          acc.revenue += Number(m.revenue_eur || 0)
          return acc
        },
        { impressions: 0, clicks: 0, cost: 0, revenue: 0 }
      ),
    [metrics]
  )

  const ctrTotale =
    totals.impressions > 0
      ? (totals.clicks / totals.impressions) * 100
      : 0

  const roasTotale =
    totals.cost > 0 ? totals.revenue / totals.cost : 0

  const cpcMedio =
    totals.clicks > 0 ? totals.cost / totals.clicks : 0

  const chartData = useMemo(
    () =>
      metrics
        .slice()
        .reverse()
        .map((m, index) => ({
          index: metrics.length - index,
          time: new Date(m.ts).toLocaleTimeString('it-IT', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          impressions: m.impressions,
          clicks: m.clicks,
          roas: Number(m.roas),
        })),
    [metrics]
  )

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8 pb-24">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">
              AI Neural Campaign Engine
            </h1>
            <p className="text-sm text-slate-400">
              Live · Realtime signals · Finestra ultimi 28 giorni
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wide text-emerald-400">
              AI ON
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* KPI principali AI */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs text-slate-400 mb-1">
              CTR medio
            </p>
            <p className="text-2xl font-semibold">
              {ctrTotale.toFixed(2)}%
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Click / impression
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs text-slate-400 mb-1">
              CPC medio
            </p>
            <p className="text-2xl font-semibold">
              € {cpcMedio.toFixed(2)}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Costo per clic
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs text-slate-400 mb-1">
              ROAS medio
            </p>
            <p className="text-2xl font-semibold">
              {roasTotale.toFixed(2)}x
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Ritorno spesa adv
            </p>
          </div>
        </section>

        {/* Riepilogo account */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs text-slate-400 mb-1">
              Impression totali
            </p>
            <p className="text-xl font-semibold">
              {totals.impressions}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Ultimi 28 giorni
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs text-slate-400 mb-1">
              Click totali
            </p>
            <p className="text-xl font-semibold">
              {totals.clicks}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Click validi
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs text-slate-400 mb-1">
              Spesa totale
            </p>
            <p className="text-xl font-semibold">
              € {totals.cost.toFixed(2)}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Budget investito
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs text-slate-400 mb-1">
              Entrate totali
            </p>
            <p className="text-xl font-semibold">
              € {totals.revenue.toFixed(2)}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Valore attribuito
            </p>
          </div>
        </section>

        {/* Grafico realtime */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-100">
              Andamento realtime AI (impression, click, ROAS)
            </h2>
            <p className="text-xs text-slate-500">
              Simulazione neurale aggiornata ogni 10 secondi
            </p>
          </div>
          <div className="h-64">
            {chartData.length === 0 ? (
              <div className="flex items-center justify-center h-full text-sm text-slate-500">
                In attesa delle prime metriche AI-Core…
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="impressions"
                    name="Impression"
                    yAxisId="left"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    name="Click"
                    yAxisId="left"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="roas"
                    name="ROAS"
                    yAxisId="right"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        {/* Tabella ultime metriche */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-100">
              Ultime metriche campagna
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-xs uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-2 pr-4 text-left">Campaign ID</th>
                  <th className="py-2 px-4 text-right">Impression</th>
                  <th className="py-2 px-4 text-right">Click</th>
                  <th className="py-2 px-4 text-right">CTR</th>
                  <th className="py-2 px-4 text-right">Costo</th>
                  <th className="py-2 px-4 text-right">Entrate</th>
                  <th className="py-2 px-4 text-right">ROAS</th>
                  <th className="py-2 pl-4 text-right">Data</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-6 text-center text-slate-500"
                    >
                      Caricamento metriche AI…
                    </td>
                  </tr>
                ) : metrics.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-6 text-center text-slate-500"
                    >
                      Nessuna metrica ancora registrata. Appena
                      AI-Core aggiorna la tabella campaign_metrics,
                      vedrai qui le prime righe reali.
                    </td>
                  </tr>
                ) : (
                  metrics.map((m) => (
                    <tr
                      key={m.id}
                      className="border-b border-slate-900/60"
                    >
                      <td className="py-2 pr-4">
                        {m.campaign_id}
                      </td>
                      <td className="py-2 px-4 text-right">
                        {m.impressions}
                      </td>
                      <td className="py-2 px-4 text-right">
                        {m.clicks}
                      </td>
                      <td className="py-2 px-4 text-right">
                        {Number(m.ctr).toFixed(2)}%
                      </td>
                      <td className="py-2 px-4 text-right">
                        € {Number(m.cost_eur).toFixed(2)}
                      </td>
                      <td className="py-2 px-4 text-right">
                        € {Number(m.revenue_eur).toFixed(2)}
                      </td>
                      <td className="py-2 px-4 text-right">
                        {Number(m.roas).toFixed(2)}x
                      </td>
                      <td className="py-2 pl-4 text-right text-slate-400">
                        {new Date(m.ts).toLocaleString('it-IT')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Pulsante chatbot flottante */}
      <a
        href="/ai-chatbot"
        className="fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 shadow-lg hover:bg-emerald-400"
      >
        <span className="h-2 w-2 rounded-full bg-slate-950" />
        AI Chatbot
      </a>
    </main>
  )
}
