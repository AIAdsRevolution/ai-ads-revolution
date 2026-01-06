'use client'

import { useEffect, useMemo, useState } from 'react'

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

export default function BudgetPage() {
  const [metrics, setMetrics] = useState<CampaignMetric[]>([])
  const [loading, setLoading] = useState(true)

  async function loadMetrics() {
    try {
      const res = await fetch('/api/campaign-metrics')
      const json = await res.json()
      if (!res.ok) {
        console.error('Errore API metrics budget:', json)
        return
      }
      setMetrics(json.metrics ?? [])
    } catch (err) {
      console.error('Errore fetch metrics budget:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    
    AAR_EVENTS.budget_view();
loadMetrics()
  }, [])

  const totals = useMemo(
    () =>
      metrics.reduce(
        (acc, m) => {
          acc.cost += Number(m.cost_eur || 0)
          acc.revenue += Number(m.revenue_eur || 0)
          return acc
        },
        { cost: 0, revenue: 0 }
      ),
    [metrics]
  )

  const byCampaign = useMemo(() => {
    const map = new Map<
      string,
      { cost: number; revenue: number; impressions: number; clicks: number }
    >()
    metrics.forEach((m) => {
      const key = m.campaign_id
      if (!map.has(key)) {
        map.set(key, {
          cost: 0,
          revenue: 0,
          impressions: 0,
          clicks: 0,
        })
      }
      const item = map.get(key)!
      item.cost += Number(m.cost_eur || 0)
      item.revenue += Number(m.revenue_eur || 0)
      item.impressions += m.impressions || 0
      item.clicks += m.clicks || 0
    })
    return Array.from(map.entries()).map(([campaign_id, v]) => ({
      campaign_id,
      ...v,
      roas: v.cost > 0 ? v.revenue / v.cost : 0,
      ctr:
        v.impressions > 0
          ? (v.clicks / v.impressions) * 100
          : 0,
    }))
  }, [metrics])

  const profit = totals.revenue - totals.cost

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8 pb-24">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
            AI Ads Revolution · Dashboard inserzionista
          </p>
          <h1 className="text-2xl font-semibold">Budget & spesa</h1>
          <p className="text-sm text-slate-400">
            Controlla quanto stai spendendo e quanto stai generando
            con il motore AI.
          </p>
        </div>

        {/* Riepilogo finanziario */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs text-slate-400 mb-1">
              Spesa totale
            </p>
            <p className="text-2xl font-semibold">
              € {totals.cost.toFixed(2)}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Somma dei costi registrati in campaign_metrics
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs text-slate-400 mb-1">
              Entrate totali
            </p>
            <p className="text-2xl font-semibold">
              € {totals.revenue.toFixed(2)}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Valore attribuito dal motore AI
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs text-slate-400 mb-1">Margine</p>
            <p className="text-2xl font-semibold">
              € {profit.toFixed(2)}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Entrate - Spesa
            </p>
          </div>
        </section>

        {/* Per campagna */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold">
              Spesa e ROAS per campagna
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-xs uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-2 pr-4 text-left">Campaign ID</th>
                  <th className="py-2 px-4 text-right">Impr.</th>
                  <th className="py-2 px-4 text-right">Click</th>
                  <th className="py-2 px-4 text-right">CTR</th>
                  <th className="py-2 px-4 text-right">Spesa</th>
                  <th className="py-2 px-4 text-right">Entrate</th>
                  <th className="py-2 px-4 text-right">ROAS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-6 text-center text-slate-500"
                    >
                      Caricamento dati budget…
                    </td>
                  </tr>
                ) : byCampaign.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-6 text-center text-slate-500"
                    >
                      Nessun dato budget ancora registrato.
                    </td>
                  </tr>
                ) : (
                  byCampaign.map((c) => (
                    <tr
                      key={c.campaign_id}
                      className="border-b border-slate-900/60"
                    >
                      <td className="py-2 pr-4">
                        {c.campaign_id}
                      </td>
                      <td className="py-2 px-4 text-right">
                        {c.impressions}
                      </td>
                      <td className="py-2 px-4 text-right">
                        {c.clicks}
                      </td>
                      <td className="py-2 px-4 text-right">
                        {c.ctr.toFixed(2)}%
                      </td>
                      <td className="py-2 px-4 text-right">
                        € {c.cost.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 text-right">
                        € {c.revenue.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 text-right">
                        {c.roas.toFixed(2)}x
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}
