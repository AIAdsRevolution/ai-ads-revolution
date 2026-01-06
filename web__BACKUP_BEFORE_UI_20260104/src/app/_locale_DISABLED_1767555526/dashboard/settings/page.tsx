"use client";

import GoogleAdsLive from "./GoogleAdsLive";

import { useState } from 'react'

export default function SettingsPage() {
  const [language, setLanguage] = useState('it')
  const [currency, setCurrency] = useState('EUR')

  const [notifyRoasAlert, setNotifyRoasAlert] = useState(true)
  const [notifyDailyReport, setNotifyDailyReport] = useState(true)
  const [notifyEmailInsights, setNotifyEmailInsights] =
    useState(false)

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-8 pb-24">
        {/* HEADER */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
            AI Ads Revolution · Dashboard inserzionista
          </p>
          <h1 className="text-2xl font-semibold">
            Impostazioni account
          </h1>
          <p className="text-sm text-slate-400">
            Gestisci le preferenze del tuo account, lingua,
            notifiche, sicurezza e API key.
          </p>
        </div>

        <GoogleAdsLive />


        <div className="space-y-6">
          {/* PROFILO INSERZIONISTA – più reale */}
          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-sm font-semibold mb-2">
              Profilo inserzionista
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Informazioni di base sul tuo account AI Ads Revolution.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400 text-xs mb-1">
                  Nome account
                </p>
                <p className="font-medium">
                  Account preview AI Ads Revolution
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-1">
                  Stato
                </p>
                <p className="font-medium text-emerald-400">
                  Attivo · AI Learning
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-1">
                  Email login
                </p>
                <p className="font-mono text-xs">
                  preview@aiadsrevolution.com
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-1">
                  ID inserzionista
                </p>
                <p className="font-mono text-xs">
                  AAR-ACC-001-preview
                </p>
              </div>
            </div>
          </section>

          {/* LINGUA & VALUTA – con stato reale */}
          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-sm font-semibold mb-2">
              Lingua & valuta
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Configura come vuoi vedere testi e importi nella
              dashboard. (Impostazioni salvate a livello locale
              nella sessione corrente.)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Lingua interfaccia
                </label>
                <select
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="it">Italiano (IT)</option>
                  <option value="en">English (EN)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Valuta principale
                </label>
                <select
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="EUR">Euro (€)</option>
                  <option value="USD">Dollaro USA ($)</option>
                </select>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-3">
              Lingua attuale:{' '}
              <span className="font-medium">
                {language === 'it' ? 'Italiano' : 'Inglese'}
              </span>
              {' · '}Valuta:{' '}
              <span className="font-medium">
                {currency === 'EUR' ? 'EUR (€)' : 'USD ($)'}
              </span>
            </p>
          </section>

          {/* NOTIFICHE – switch reali lato frontend */}
          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-sm font-semibold mb-2">
              Notifiche
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Scegli quali avvisi ricevere dal motore AI. In futuro
              queste impostazioni verranno sincronizzate con il tuo
              profilo server-side.
            </p>
            <div className="space-y-3 text-sm">
              <label className="flex items-center justify-between gap-2">
                <div>
                  <p>Alert ROAS critico</p>
                  <p className="text-xs text-slate-500">
                    Notifica quando il ROAS di una campagna scende
                    sotto la soglia definita.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifyRoasAlert}
                  onChange={(e) =>
                    setNotifyRoasAlert(e.target.checked)
                  }
                  className="h-4 w-4 rounded border-slate-600 bg-slate-950"
                />
              </label>
              <label className="flex items-center justify-between gap-2">
                <div>
                  <p>Report giornaliero performance AI</p>
                  <p className="text-xs text-slate-500">
                    Riepilogo via email delle metriche principali
                    delle tue campagne.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifyDailyReport}
                  onChange={(e) =>
                    setNotifyDailyReport(e.target.checked)
                  }
                  className="h-4 w-4 rounded border-slate-600 bg-slate-950"
                />
              </label>
              <label className="flex items-center justify-between gap-2">
                <div>
                  <p>Insight neurali avanzati</p>
                  <p className="text-xs text-slate-500">
                    Suggerimenti periodici generati
                    dall&apos;intelligenza artificiale basati sui
                    tuoi dati storici.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifyEmailInsights}
                  onChange={(e) =>
                    setNotifyEmailInsights(e.target.checked)
                  }
                  className="h-4 w-4 rounded border-slate-600 bg-slate-950"
                />
              </label>
            </div>
            <p className="text-[11px] text-slate-500 mt-3">
              Stato notifiche:{' '}
              <span className="font-mono">
                ROAS={notifyRoasAlert ? 'ON' : 'OFF'} · REPORT=
                {notifyDailyReport ? 'ON' : 'OFF'} · INSIGHTS=
                {notifyEmailInsights ? 'ON' : 'OFF'}
              </span>
            </p>
          </section>

          {/* SICUREZZA & LOGIN */}
          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-sm font-semibold mb-2">
              Sicurezza & login
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Proteggi l&apos;accesso al tuo pannello inserzionista.
            </p>
            <div className="space-y-3 text-sm">
              <label className="flex items-center justify-between gap-2">
                <div>
                  <p>Autenticazione a due fattori (2FA)</p>
                  <p className="text-xs text-slate-500">
                    Richiedi un secondo fattore di verifica oltre
                    alla password.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={twoFactorEnabled}
                  onChange={(e) =>
                    setTwoFactorEnabled(e.target.checked)
                  }
                  className="h-4 w-4 rounded border-slate-600 bg-slate-950"
                />
              </label>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p>Sessioni attive</p>
                  <p className="text-xs text-slate-500">
                    Al momento sei collegato da 1 dispositivo.
                  </p>
                </div>
                <button className="text-xs rounded-full border border-slate-700 px-3 py-1 hover:bg-slate-800">
                  Disconnetti tutte le sessioni 
                </button>
              </div>
            </div>
          </section>

          {/* API & INTEGRAZIONI – più completa */}
          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-sm font-semibold mb-2">
              API & integrazioni
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Questa sezione mostrerà in futuro le chiavi API per
              collegare piattaforme esterne al motore AI Ads
              Revolution.
            </p>
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-slate-400 text-xs mb-1">
                    AI-Core endpoint
                  </p>
                  <p className="font-mono text-xs text-slate-300">
                    https://aiadsrevolution-ai-core.onrender.com
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
                  Attivazione progressiva
                </span>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-1">
                  Chiave pubblica progetto 
                </p>
                <p className="font-mono text-[11px] text-slate-300 break-all">
                  AAR-PUB-KEY-preview-1234-5678-ABCD-EFGH
                </p>
              </div>
              <p className="text-[11px] text-slate-500">
                Le integrazioni API saranno disponibili in una fase
                successiva della piattaforma. In questa versione
                beta, i collegamenti vengono gestiti internamente
                tra AI-Core e Supabase.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
