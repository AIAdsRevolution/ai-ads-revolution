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

export default function DashboardInserzionistaPage() {
  const [metrics, setMetrics] = useState<CampaignMetric[]>([])
  const [loading, setLoading] = useState(true)

  async function loadMetrics() {
    try {
      const res = await fetch('/api/campaign-metrics')
      const json = await res.json()
      if (!res.ok) {
        console.error('Errore API metrics dashboard:', json)
        return
      }
      setMetrics(json.metrics ?? [])
    } catch (err) {
      console.error('Errore fetch metrics dashboard:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMetrics()
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

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8 pb-24">
        {/* TITOLO / HEADER – stesso significato */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
              AI Ads Revolution · Dashboard inserzionista
            </p>
            <h1 className="text-2xl font-semibold">
              Dashboard inserzionista · Motore neurale di advertising
            </h1>
            <p className="text-sm text-slate-400">
              Live · Realtime signals · Finestra ultimi 28 giorni
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs uppercase tracking-wide text-emerald-400">
                AI ON
              </span>
            </div>
          </div>
        </div>

        {/* Trend AI + KPI principali AI */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Trend AI */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 md:col-span-1">
            <p className="text-xs text-slate-400 mb-1">Trend AI</p>
            <p className="text-2xl font-semibold">
              ROAS {roasTotale.toFixed(1)}x
            </p>
            <p className="text-xs text-slate-500 mt-2">
              L&apos;AI ottimizza offerte, creatività e sorgenti di
              traffico in tempo reale, spostando il budget dove vede
              più probabilità di conversione.
            </p>
          </div>

          {/* KPI principali AI */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 md:col-span-2">
            <p className="text-xs text-slate-400 mb-3">
              KPI principali AI
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
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
              <div>
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
              <div>
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
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Dati generati dal motore AI-Core. Quando collegherai
              campagne reali, questi valori rifletteranno le
              performance effettive.
            </p>
          </div>
        </section>

        {/* RIEPILOGO ACCOUNT */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 mb-8">
          <p className="text-xs text-slate-400 mb-2">
            Riepilogo account
          </p>
          <p className="text-xs text-slate-500 mb-4">
            Panoramica sintetica delle performance delle tue
            campagne AI. Modalità demo attiva.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
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
            <div>
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
            <div>
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
            <div>
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
          </div>
          <p className="text-xs text-slate-500 mt-3">
            I dati in tempo reale vengono letti dalla tabella
            <span className="font-mono"> campaign_metrics </span>
            su Supabase. Quando collegherai campagne reali, questa
            sezione mostrerà le performance effettive.
          </p>
        </section>

        {/* ULTIME METRICHE CAMPAGNA */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold">
                Ultime metriche campagna
              </p>
              <p className="text-xs text-slate-500">
                Ultime righe registrate in campaign_metrics. Quando
                lancerai campagne reali, vedrai qui le performance
                aggiornate.
              </p>
            </div>
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
                  metrics.slice(0, 10).map((m) => (
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
                        {new Date(
                          m.ts
                        ).toLocaleString('it-IT')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* STATO MOTORE AI – testo come il tuo */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-sm font-semibold mb-2">
            Stato motore AI
          </p>
          <p className="text-xs text-slate-500 mb-3">
            L&apos;AI sta analizzando segnali di intento, contesto e
            storico delle campagne per decidere dove allocare il
            budget nel modo più efficiente.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <p className="text-slate-400 mb-1">Segnali/min</p>
              <p className="text-sm font-semibold">∞</p>
              <p className="text-slate-500 mt-1">
                Simulazione neurale
              </p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">Modalità</p>
              <p className="text-sm font-semibold">Beta live</p>
              <p className="text-slate-500 mt-1">
                Ottimizzazione continua
              </p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">Stato</p>
              <p className="text-sm font-semibold text-emerald-400">
                Stabile
              </p>
              <p className="text-slate-500 mt-1">
                Monitoraggio attivo
              </p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">
                Prossimi grafici realtime
              </p>
              <p className="text-slate-500 mt-1">
                • Andamento giornaliero di impression, click e
                conversioni
                <br />
                • Distribuzione del budget per sorgente di traffico
                <br />
                • ROAS per canale e per campagna
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* PULSANTE CHATBOT FISSO */}
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
