'use client'

import { useState } from 'react'

type CreativeIdea = {
  id: number
  headline: string
  primaryText: string
  callToAction: string
}

export default function CreativesPage() {
  const [ideas, setIdeas] = useState<CreativeIdea[]>([])
  const [product, setProduct] = useState('')
  const [audience, setAudience] = useState('')
  const [tone, setTone] = useState('persuasivo')
  const [loading, setLoading] = useState(false)

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    if (!product.trim()) return
    setLoading(true)

    // preview: generiamo creatività finte in locale.
    const baseId = Date.now()
    const newIdeas: CreativeIdea[] = [
      {
        id: baseId,
        headline: `Sblocca il pieno potenziale di ${product}`,
        primaryText:
          'Campagne ottimizzate in tempo reale, targeting intelligente e budget sotto controllo. Pensato per ' +
          (audience || 'i tuoi clienti ideali') +
          '.',
        callToAction: 'Inizia ora',
      },
      {
        id: baseId + 1,
        headline: `${product}: più risultati, meno sprechi`,
        primaryText:
          'L’AI analizza i segnali utente e concentra la spesa dove il ROAS è più alto. Ideale per chi vuole scalare in modo ' +
          tone +
          '.',
        callToAction: 'Prova la strategia AI',
      },
      {
        id: baseId + 2,
        headline: `Porta le tue ads al livello successivo`,
        primaryText:
          'Copy testati, creatività dinamiche e ottimizzazione continua: trasforma ogni euro speso in un investimento.',
        callToAction: 'Scopri come',
      },
    ]

    setIdeas(newIdeas)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8 pb-24">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
            AI Ads Revolution · Dashboard inserzionista
          </p>
          <h1 className="text-2xl font-semibold">Creatività AI</h1>
          <p className="text-sm text-slate-400">
            Genera idee di annunci da testare nelle tue campagne AI.
          </p>
        </div>

        {/* Form generazione */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 mb-8">
          <h2 className="text-sm font-semibold mb-3">
            Genera varianti creative
          </h2>
          <form
            onSubmit={handleGenerate}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
          >
            <div className="md:col-span-2">
              <label className="block text-xs text-slate-400 mb-1">
                Prodotto / offerta
              </label>
              <input
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
                placeholder="Es. Corso online per e-commerce, software AI, servizio marketing..."
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Pubblico di riferimento (opzionale)
              </label>
              <input
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
                placeholder="Es. imprenditori, agency, freelancer..."
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Tono
              </label>
              <select
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                <option value="persuasivo">Persuasivo</option>
                <option value="diretto">Diretto</option>
                <option value="amichevole">Amichevole</option>
                <option value="professionale">Professionale</option>
              </select>
            </div>
            <div className="md:col-span-3 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400 disabled:opacity-60"
              >
                {loading ? 'Generazione…' : 'Genera creatività'}
              </button>
            </div>
          </form>
        </section>

        {/* Risultati */}
        <section className="space-y-4">
          {ideas.length === 0 ? (
            <p className="text-sm text-slate-500">
              Nessuna creatività generata ancora. Compila il form
              sopra per vedere le proposte dell&apos;AI.
            </p>
          ) : (
            ideas.map((idea) => (
              <div
                key={idea.id}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-4"
              >
                <p className="text-xs uppercase tracking-wide text-emerald-400 mb-1">
                  Variante creativa
                </p>
                <h3 className="text-base font-semibold mb-1">
                  {idea.headline}
                </h3>
                <p className="text-sm text-slate-200 mb-2">
                  {idea.primaryText}
                </p>
                <p className="text-xs text-slate-400">
                  Call to action suggerita:{' '}
                  <span className="font-medium">
                    {idea.callToAction}
                  </span>
                </p>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  )
}
