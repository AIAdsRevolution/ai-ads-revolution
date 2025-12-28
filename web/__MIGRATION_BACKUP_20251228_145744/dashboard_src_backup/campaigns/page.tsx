'use client'

import { useEffect, useState } from 'react'

type Campaign = {
  id: number
  name: string
  channel: string
  objective: string
  daily_budget_eur: number
  status: string
  created_at: string
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    name: '',
    channel: 'Meta',
    objective: 'vendite',
    daily_budget_eur: '10',
  })
  const [creating, setCreating] = useState(false)

  async function loadCampaigns() {
    try {
      const res = await fetch('/api/campaigns')
      const json = await res.json()
      if (!res.ok) {
        console.error('Errore API campaigns:', json)
        return
      }
      setCampaigns(json.campaigns ?? [])
    } catch (err) {
      console.error('Errore fetch campaigns:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCampaigns()
  }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setCreating(true)
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) {
        console.error('Errore creazione campagna:', json)
        return
      }
      setForm({
        name: '',
        channel: 'Meta',
        objective: 'vendite',
        daily_budget_eur: '10',
      })
      await loadCampaigns()
    } catch (err) {
      console.error('Errore POST campaigns:', err)
    } finally {
      setCreating(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8 pb-24">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">
              Campagne AI
            </h1>
            <p className="text-sm text-slate-400">
              Gestisci le tue campagne AI Ads Revolution.
            </p>
          </div>
        </div>

        {/* Form nuova campagna */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 mb-8">
          <h2 className="text-sm font-semibold mb-4">
            Crea nuova campagna AI
          </h2>
          <form
            onSubmit={handleCreate}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
          >
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Nome campagna
              </label>
              <input
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Canale
              </label>
              <select
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
                value={form.channel}
                onChange={(e) =>
                  setForm({ ...form, channel: e.target.value })
                }
              >
                <option>Meta</option>
                <option>Google</option>
                <option>TikTok</option>
                <option>Native</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Obiettivo
              </label>
              <select
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
                value={form.objective}
                onChange={(e) =>
                  setForm({ ...form, objective: e.target.value })
                }
              >
                <option value="vendite">Vendite</option>
                <option value="lead">Lead</option>
                <option value="traffico">Traffico</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Budget giornaliero (€)
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
                value={form.daily_budget_eur}
                onChange={(e) =>
                  setForm({
                    ...form,
                    daily_budget_eur: e.target.value,
                  })
                }
              />
            </div>
            <div className="md:col-span-4 flex justify-end">
              <button
                type="submit"
                disabled={creating}
                className="inline-flex items-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400 disabled:opacity-60"
              >
                {creating ? 'Creazione…' : 'Crea campagna'}
              </button>
            </div>
          </form>
        </section>

        {/* Lista campagne */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <h2 className="text-sm font-semibold mb-4">
            Campagne attive
          </h2>
          {loading ? (
            <p className="text-sm text-slate-500">
              Caricamento campagne…
            </p>
          ) : campaigns.length === 0 ? (
            <p className="text-sm text-slate-500">
              Nessuna campagna ancora creata.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-xs uppercase text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-2 pr-4 text-left">Nome</th>
                    <th className="py-2 px-4 text-left">Canale</th>
                    <th className="py-2 px-4 text-left">Obiettivo</th>
                    <th className="py-2 px-4 text-right">
                      Budget giornaliero
                    </th>
                    <th className="py-2 px-4 text-left">Stato</th>
                    <th className="py-2 pl-4 text-right">Creata il</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c) => (
                    <tr
                      key={c.id}
                      className="border-b border-slate-900/60"
                    >
                      <td className="py-2 pr-4">{c.name}</td>
                      <td className="py-2 px-4">{c.channel}</td>
                      <td className="py-2 px-4">
                        {c.objective}
                      </td>
                      <td className="py-2 px-4 text-right">
                        € {Number(c.daily_budget_eur).toFixed(2)}
                      </td>
                      <td className="py-2 px-4">{c.status}</td>
                      <td className="py-2 pl-4 text-right text-slate-400">
                        {new Date(
                          c.created_at
                        ).toLocaleString('it-IT')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
