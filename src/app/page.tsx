import KpiLivePreview from "@/components/KpiLivePreview";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <div className="pro-container" style={{ paddingTop: 22, paddingBottom: 54 }}>
        {/* Top nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              className="pro-card-flat"
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 14,
              }}
            >
              <div style={{ width: 14, height: 14, borderRadius: 6, background: "rgba(37,99,235,.9)" }} />
            </div>
            <div>
              <div style={{ fontWeight: 900, letterSpacing: "-0.02em" }}>AI Ads Revolution</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)", marginTop: 2 }}>
                Motore neurale di advertising • decision log • realtime
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <Link className="pro-pill" href="/come-funziona">Come funziona</Link>
            <Link className="pro-pill" href="/ai-engine">AI Engine</Link>
            <Link className="pro-pill" href="/pricing">Prezzi</Link>
            <Link className="pro-pill" href="/status">Status</Link>
            <Link className="pro-btn" href="/login">Accedi</Link>
            <Link className="pro-btn pro-btn-primary" href="/register">Registrati</Link>
          </div>
        </div>

        <div className="pro-divider" />

        {/* HERO */}
        <div className="pro-grid-2" style={{ alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
              <span className="pro-pill">AI Neural Campaign Engine</span>
              <span className="pro-pill">Realtime signals</span>
              <span className="pro-pill">Meta-like UI</span>
              <span className="pro-pill">Audit-ready</span>
            </div>

            <h1 className="pro-h1">
              Crea campagne che <span style={{ color: "rgba(156,192,255,.95)" }}>migliorano</span> da sole.
            </h1>

            <p className="pro-sub">
              Un motore neurale che rialloca budget, ottimizza creatività e bid in tempo reale.
              Decision log trasparente e KPI misurabili. Progettato per crescere da startup a enterprise.
            </p>

            <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
              <Link className="pro-btn pro-btn-primary" href="/register">Inizia ora</Link>
              <Link className="pro-btn" href="/come-funziona">Guarda come funziona</Link>
            </div>

            <div style={{ marginTop: 12, color: "rgba(255,255,255,.65)", fontSize: 13 }}>
              Prova gratuita • Nessun lock-in • Setup veloce • Pensato anche per piccole imprese
            </div>

            <div style={{ marginTop: 22 }} className="pro-kpi">
              <div className="pro-kpi-card">
                <div className="pro-kpi-label">Vendite medie attribuite (beta)</div>
                <div className="pro-kpi-val pro-kpi-val-blue">+30%</div>
              </div>
              <div className="pro-kpi-card">
                <div className="pro-kpi-label">ROAS medio (beta)</div>
                <div className="pro-kpi-val pro-kpi-val-ai">4.7x</div>
              </div>
              <div className="pro-kpi-card">
                <div className="pro-kpi-label">Riduzione CPC media</div>
                <div className="pro-kpi-val">−25%</div>
              </div>
              <div className="pro-kpi-card">
                <div className="pro-kpi-label">Setup iniziale</div>
                <div className="pro-kpi-val">&lt; 5 min</div>
              </div>
            </div>

            <div style={{ marginTop: 12, color: "rgba(255,255,255,.55)", fontSize: 12 }}>
              *Valori indicativi su inserzionisti beta. I risultati medi non garantiscono performance future.
            </div>
          </div>

          {/* Right: mock dashboard card */}
          <div className="pro-card" style={{ padding: 18, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <div>
                <div style={{ fontWeight: 800 }}><KpiLivePreview days={28} /></div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)", marginTop: 2 }}>
                  AI Neural Campaign Engine • ultimi 28 giorni
                </div>
              </div>
              <div className="pro-pill">
                <span style={{ width: 8, height: 8, borderRadius: 99, background: "rgba(34,197,94,.9)" }} />
                AI ON
              </div>
            </div>

            <div style={{ marginTop: 14 }} className="pro-card-flat">
              <div style={{ padding: 14 }}>
                <div style={{ color: "rgba(255,255,255,.65)", fontSize: 12 }}>Trend AI</div>
                <div style={{ height: 140, marginTop: 10, borderRadius: 14, border: "1px solid rgba(255,255,255,.08)", overflow: "hidden", background: "rgba(255,255,255,.03)" }}>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background:
                        "radial-gradient(600px 200px at 20% 40%, rgba(37,99,235,.30), transparent 60%), radial-gradient(500px 220px at 80% 60%, rgba(34,211,238,.15), transparent 60%)",
                      position: "relative",
                    }}
                  >
                    <div style={{ position: "absolute", left: 16, bottom: 18, color: "rgba(255,255,255,.65)", fontSize: 12 }}>
                      ROAS
                    </div>
                    <div style={{ position: "absolute", right: 16, top: 14, color: "rgba(255,255,255,.85)", fontWeight: 800 }}>
                      0.0x
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 10, marginTop: 10 }}>
                  <div className="pro-kpi-card" style={{ padding: 12 }}>
                    <div className="pro-kpi-label">CTR medio</div>
                    <div className="pro-kpi-val">0.0%</div>
                  </div>
                  <div className="pro-kpi-card" style={{ padding: 12 }}>
                    <div className="pro-kpi-label">CPC medio</div>
                    <div className="pro-kpi-val">€ 0.00</div>
                  </div>
                  <div className="pro-kpi-card" style={{ padding: 12 }}>
                    <div className="pro-kpi-label">ROAS medio</div>
                    <div className="pro-kpi-val">0.0x</div>
                  </div>
                  <div className="pro-kpi-card" style={{ padding: 12 }}>
                    <div className="pro-kpi-label">AI Actions</div>
                    <div className="pro-kpi-val">0</div>
                  </div>
                </div>

                <div style={{ marginTop: 10, color: "rgba(255,255,255,.58)", fontSize: 12 }}>
                  Collega campagne reali per vedere KPI live. La dashboard è l’area dei dati dettagliati.
                </div>

                <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                  <span className="pro-pill">Decision log</span>
                  <span className="pro-pill">Budget shift</span>
                  <span className="pro-pill">Creative AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pro-divider" />

        {/* Features */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 14 }}>
          {[
            ["AI-first in ogni decisione", "Ogni asta, offerta e creatività viene valutata da segnali realtime."],
            ["Decision log trasparente", "Sai cosa fa l’AI, perché lo fa e con quale impatto stimato."],
            ["Realtime signals", "Reagisce ai cambiamenti del mercato mentre accadono."],
            ["Scalabilità enterprise", "Inizi piccolo e cresci solo quando i dati lo confermano."],
            ["Setup guidato", "La guida AI integrata ti mostra step-by-step come ottimizzare."],
            ["Integrazioni", "Supabase + Google Ads: KPI reali, report, automazioni."],
          ].map(([t, d]) => (
            <div key={t} className="pro-card-flat" style={{ padding: 16 }}>
              <div style={{ fontWeight: 850 }}>{t}</div>
              <div style={{ marginTop: 8, color: "rgba(255,255,255,.65)", lineHeight: 1.55 }}>{d}</div>
            </div>
          ))}
        </div>

        <div className="pro-divider" />

        {/* CTA */}
        <div className="pro-card" style={{ padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontWeight: 900, fontSize: 20 }}>Inizia oggi con AI Ads Revolution</div>
              <div style={{ marginTop: 6, color: "rgba(255,255,255,.65)" }}>
                Setup rapido, prova gratuita e controllo totale sulle ottimizzazioni AI.
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Link className="pro-btn pro-btn-primary" href="/register">Crea un account</Link>
              <Link className="pro-btn" href="/dashboard">Accedi alla dashboard</Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 30, display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", color: "rgba(255,255,255,.55)", fontSize: 13 }}>
          <div>© 2025 AI Ads Revolution. Tutti i diritti riservati.</div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/chi-siamo">Chi siamo</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/termini">Termini</Link>
            <Link href="/cookie">Cookie</Link>
            <Link href="/status">Status</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
