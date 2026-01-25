import Link from "next/link";
import KpiLivePreview from "../components/KpiLivePreview";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="pro-pill" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      {children}
    </span>
  );
}

function Card({
  title,
  desc,
  bullets,
  href,
  cta,
}: {
  title: string;
  desc: string;
  bullets: string[];
  href: string;
  cta: string;
}) {
  return (
    <div className="pro-card" style={{ padding: 18 }}>
      <div style={{ fontWeight: 900, letterSpacing: "-0.02em", fontSize: 16 }}>{title}</div>
      <div style={{ color: "rgba(255,255,255,.70)", fontSize: 13, marginTop: 8, lineHeight: 1.5 }}>{desc}</div>
      <ul style={{ marginTop: 12, paddingLeft: 18, color: "rgba(255,255,255,.78)", fontSize: 13, lineHeight: 1.6 }}>
        {bullets.map((b) => (
          <li key={b} style={{ marginBottom: 6 }}>{b}</li>
        ))}
      </ul>
      <div style={{ marginTop: 14 }}>
        <Link className="pro-btn" href={href}>{cta}</Link>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main>
      <div className="pro-container" style={{ paddingTop: 18, paddingBottom: 70 }}>
        {/* Top Bar (Amazon-like, futuristica) */}
        <div
          className="pro-card-flat"
          style={{
            padding: 14,
            borderRadius: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            position: "sticky",
            top: 10,
            zIndex: 10,
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 220 }}>
            <div
              className="pro-card-flat"
              style={{
                width: 42,
                height: 42,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 14,
              }}
              aria-label="AI Ads Revolution"
            >
              <div style={{ width: 16, height: 16, borderRadius: 6, background: "rgba(37,99,235,.95)" }} />
            </div>
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontWeight: 950, letterSpacing: "-0.03em" }}>AI Ads Revolution</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.60)", marginTop: 2 }}>
                KPI + AI • Google Ads • Decision log
              </div>
            </div>
          </div>

          {/* Search */}
          <div style={{ flex: 1, maxWidth: 560 }}>
            <div
              className="pro-card-flat"
              style={{
                padding: "10px 12px",
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                gap: 10,
                border: "1px solid rgba(255,255,255,.09)",
              }}
            >
              <span style={{ fontSize: 12, color: "rgba(255,255,255,.55)" }}>🔎</span>
              <input
                placeholder="Cerca: dashboard, Google Ads, report, demo…"
                style={{
                  width: "100%",
                  outline: "none",
                  border: "none",
                  background: "transparent",
                  color: "rgba(255,255,255,.90)",
                  fontSize: 13,
                }}
              />
              <Link className="pro-btn pro-btn-primary" href="/ai-chatbot" style={{ padding: "8px 10px" }}>
                Chiedi all’AI
              </Link>
            </div>
          </div>

          {/* Nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <Link className="pro-pill" href="/come-funziona">Come funziona</Link>
            <Link className="pro-pill" href="/pricing">Pricing</Link>
            <Link className="pro-pill" href="/status">Status</Link>
            <Link className="pro-btn" href="/login">Accedi</Link>
            <Link className="pro-btn pro-btn-primary" href="/register">Inizia</Link>
          </div>
        </div>

        {/* HERO */}
        <div style={{ marginTop: 18 }} className="pro-grid-2">
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
              <Pill>AI Neural Campaign Engine</Pill>
              <Pill>Realtime KPI</Pill>
              <Pill>Google Ads ready</Pill>
              <Pill>Assistente clienti</Pill>
            </div>

            <h1 className="pro-h1">
              La tua dashboard KPI{" "}
              <span style={{ color: "rgba(156,192,255,.95)" }}>in tempo reale</span>, con AI al tuo fianco.
            </h1>

            <p className="pro-sub">
              AI Ads Revolution unisce monitoraggio KPI e assistente AI per aiutarti a leggere i dati, capire cosa sta succedendo
              e scegliere i prossimi step. Per metriche reali serve collegare Google Ads.
            </p>

            <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
              <Link className="pro-btn pro-btn-primary" href="/ai-chatbot">Richiedi demo</Link>
              <Link className="pro-btn" href="/dashboard">Vedi dashboard</Link>
            </div>

            <div style={{ marginTop: 12, color: "rgba(255,255,255,.60)", fontSize: 12, lineHeight: 1.5 }}>
              Nota: non facciamo promesse “magiche”. I risultati dipendono da settore, budget, creatività e tracking.
            </div>

            {/* Trust strip */}
            <div style={{ marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <span className="pro-pill">Trasparenza: decision log</span>
              <span className="pro-pill">Misurazione: KPI & trend</span>
              <span className="pro-pill">Supporto: demo guidata</span>
            </div>
          </div>

          {/* Right: preview panel */}
          <div className="pro-card" style={{ padding: 18, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <div>
                <div style={{ fontWeight: 900, letterSpacing: "-0.02em" }}>
                  KPI Preview (demo)
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)", marginTop: 2 }}>
                  Esempio di riepilogo • ultimi 28 giorni
                </div>
              </div>
              <div className="pro-pill" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: 99, background: "rgba(34,197,94,.9)" }} />
                AI ON
              </div>
            </div>

            <div style={{ marginTop: 14 }} className="pro-card-flat">
              <div style={{ padding: 14 }}>
                <div style={{ color: "rgba(255,255,255,.65)", fontSize: 12 }}>Preview KPI (simulata)</div>
                <div style={{ marginTop: 10 }}>
                  <KpiLivePreview days={28} />
                </div>
                <div style={{ marginTop: 10, color: "rgba(255,255,255,.55)", fontSize: 12 }}>
                  Collegando Google Ads, i KPI diventano reali.
                </div>
              </div>
            </div>

            <div style={{ marginTop: 14 }} className="pro-card-flat">
              <div style={{ padding: 14 }}>
                <div style={{ color: "rgba(255,255,255,.65)", fontSize: 12 }}>Cosa puoi chiedere all’assistente</div>
                <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span className="pro-pill">“Riepilogo 28 giorni”</span>
                  <span className="pro-pill">“Come collegare Google Ads?”</span>
                  <span className="pro-pill">“Quali KPI guardare?”</span>
                  <span className="pro-pill">“Voglio una demo”</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="pro-divider" style={{ marginTop: 22 }} />

        <div style={{ marginTop: 18 }}>
          <div style={{ fontWeight: 950, letterSpacing: "-0.03em", fontSize: 18 }}>Scopri cosa fa (davvero)</div>
          <div style={{ color: "rgba(255,255,255,.65)", fontSize: 13, marginTop: 6 }}>
            Un approccio pratico: KPI chiari, integrazione Google Ads, assistente AI per spiegare e guidare.
          </div>

          <div className="pro-grid-3" style={{ marginTop: 14 }}>
            <Card
              title="Dashboard KPI Live"
              desc="Visualizza trend e metriche chiave in un’unica dashboard."
              bullets={[
                "Panoramica KPI e andamento",
                "Indicatori chiave per decisioni rapide",
                "Vista demo o dati reali (con Google Ads)",
              ]}
              href="/dashboard"
              cta="Apri dashboard"
            />

            <Card
              title="Google Ads Integration"
              desc="Collega l’account per ottenere metriche reali e riepiloghi periodici."
              bullets={[
                "Collegamento account Google",
                "Summary e metriche reali",
                "Base per report e insight AI",
              ]}
              href="/settings/google-ads"
              cta="Collega Google Ads"
            />

            <Card
              title="AI Assistant (Customer + Marketing)"
              desc="Chiedi spiegazioni, prossimi step e supporto per la demo."
              bullets={[
                "Risposte chiare e operative",
                "Raccoglie lead per la demo (email)",
                "Escalation quando serve supporto umano",
              ]}
              href="/ai-chatbot"
              cta="Parla con l’AI"
            />
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: 26 }} className="pro-card">
          <div className="pro-grid-2" style={{ alignItems: "center", padding: 18 }}>
            <div>
              <div style={{ fontWeight: 950, letterSpacing: "-0.03em", fontSize: 18 }}>Vuoi una demo guidata?</div>
              <div style={{ color: "rgba(255,255,255,.70)", fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>
                Scrivi in chat cosa vuoi ottenere (lead, vendite, traffico) e lascia la tua email: ti contattiamo per una demo.
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
              <Link className="pro-btn" href="/come-funziona">Come funziona</Link>
              <Link className="pro-btn pro-btn-primary" href="/ai-chatbot">Richiedi demo</Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 22, color: "rgba(255,255,255,.50)", fontSize: 12, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link href="/privacy" className="pro-pill">Privacy</Link>
          <Link href="/termini" className="pro-pill">Termini</Link>
          <Link href="/cookie" className="pro-pill">Cookie</Link>
          <span style={{ opacity: 0.8 }}>© {new Date().getFullYear()} AI Ads Revolution</span>
        </div>
      </div>
    </main>
  );
}
