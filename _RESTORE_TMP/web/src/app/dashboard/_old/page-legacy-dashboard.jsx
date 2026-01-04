"use client";

import React, { useEffect, useState } from "react";

const fallbackKpis = {
  impressions: 0,
  clicks: 0,
  ctr: 0,
  conversions: 0,
  spend: 0,
  trend: 0,
};

export default function Dashboard() {
  const [kpis, setKpis] = useState(fallbackKpis);
  const [daily, setDaily] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/dashboard");
        if (!res.ok) {
          console.error("Errore risposta /api/dashboard", await 
res.text());
          setLoading(false);
          return;
        }
        const json = await res.json();
        setKpis(json.kpis || fallbackKpis);
        setDaily(json.charts?.daily || []);
        setCampaigns(json.campaigns || []);
      } catch (err) {
        console.error("Errore fetch /api/dashboard", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const trendUp = (kpis.trend || 0) >= 0;

  const sampleTrendImpr = daily.length
    ? daily.map((d) => d.impressions || 0)
    : [20, 40, 30, 60, 55, 80, 70, 95];
  const sampleTrendClick = daily.length
    ? daily.map((d) => d.clicks || 0)
    : [5, 10, 8, 15, 14, 20, 18, 25];

  const sampleCtr = daily.length ? daily.map((d) => d.ctr || 0) : [3.2, 
3.8, 4.1, 5.0, 5.8, 6.0, 6.2, 6.4];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1e293b 0, #020617 45%, #000 
100%)",
        color: "#e5e7eb",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, 
sans-serif",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* TOP BAR */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
            padding: "16px 20px",
            borderRadius: "16px",
            border: "1px solid rgba(148,163,184,0.4)",
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.9), 
rgba(15,23,42,0.5))",
            boxShadow: "0 18px 45px rgba(15,23,42,0.7)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "#64748b",
                marginBottom: "4px",
              }}
            >
              Dashboard inserzionista
            </div>
            <h1
              style={{
                fontSize: "26px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              AI Ads Revolution
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.09em",
                  padding: "4px 8px",
                  borderRadius: "999px",
                  border: "1px solid rgba(96,165,250,0.6)",
                  background:
                    "radial-gradient(circle at 0 0, rgba(59,130,246,0.2), 
transparent 60%)",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "999px",
                    background:
                      "radial-gradient(circle at 30% 30%, #22c55e, 
#16a34a)",
                    boxShadow: "0 0 16px rgba(34,197,94,0.85)",
                  }}
                />
                Motore neurale attivo
              </span>
            </h1>
            <p
              style={{
                fontSize: "13px",
                color: "#94a3b8",
                marginTop: "4px",
              }}
            >
              Overview delle tue campagne in tempo reale. La rete neurale
              ottimizza budget, creatività e pubblico mentre tu guardi i
              risultati.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "6px",
            }}
          >
            <button
              style={{
                fontSize: "13px",
                padding: "8px 14px",
                borderRadius: "999px",
                border: "1px solid rgba(148,163,184,0.6)",
                background:
                  "radial-gradient(circle at top, rgba(15,23,42,0.9), 
rgba(15,23,42,0.5))",
                color: "#e5e7eb",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "6px",
                  height: "6px",
                  borderRadius: "999px",
                  background:
                    "radial-gradient(circle at 30% 30%, #f97316, 
#ea580c)",
                  boxShadow: "0 0 10px rgba(249,115,22,0.9)",
                }}
              />
              Nuova campagna
            </button>
            <span
              style={{
                fontSize: "11px",
                color: "#64748b",
              }}
            >
              Ultimo aggiornamento AI: pochi secondi fa
            </span>
          </div>
        </header>

        {/* KPI CARDS */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {loading ? (
            <>
              <KpiSkeleton />
              <KpiSkeleton />
              <KpiSkeleton />
              <KpiSkeleton />
              <KpiSkeleton />
            </>
          ) : (
            <>
              <KpiCard
                label="Impression"
                value={kpis.impressions.toLocaleString("it-IT")}
                diff={`${kpis.trend.toFixed(1)}%`}
                trend={trendUp ? "up" : "down"}
              />
              <KpiCard
                label="Click"
                value={kpis.clicks.toLocaleString("it-IT")}
                diff={kpis.ctr.toFixed(1) + " % CTR"}
                trend={trendUp ? "up" : "down"}
              />
              <KpiCard
                label="CTR medio"
                value={kpis.ctr.toFixed(2) + " %"}
                diff={trendUp ? "+trend" : "trend"}
                trend={trendUp ? "up" : "down"}
              />
              <KpiCard
                label="Conversioni"
                value={kpis.conversions.toLocaleString("it-IT")}
                diff=""
                trend="up"
              />
              <KpiCard
                label="Spesa mese"
                value={`€ ${kpis.spend.toFixed(2)}`}
                diff=""
                trend="up"
              />
            </>
          )}
        </section>

        {/* GRAFICI & AI INSIGHTS */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2.1fr) minmax(0, 1.3fr)",
            gap: "18px",
            marginBottom: "22px",
          }}
        >
          <div
            style={{
              borderRadius: "18px",
              border: "1px solid rgba(148,163,184,0.4)",
              background:
                "radial-gradient(circle at top left, rgba(15,23,42,0.9), 
rgba(15,23,42,0.75))",
              padding: "16px 18px",
              boxShadow: "0 20px 45px rgba(15,23,42,0.85)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                alignItems: "center",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "15px",
                    fontWeight: 500,
                  }}
                >
                  Andamento campagne
                </h2>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    marginTop: "2px",
                  }}
                >
                  Impression e click aggregati negli ultimi 7 giorni.
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "11px",
                }}
              >
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "999px",
                    background:
                      "linear-gradient(135deg, #38bdf8, #0ea5e9)",
                  }}
                />{" "}
                Impression
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "999px",
                    background:
                      "linear-gradient(135deg, #a855f7, #6366f1)",
                    marginLeft: "8px",
                  }}
                />{" "}
                Click
              </div>
            </div>

            {loading ? (
              <ChartSkeleton />
            ) : (
              <TrendChart
                data={sampleTrendImpr}
                secondData={sampleTrendClick}
              />
            )}
          </div>

          <div
            style={{
              borderRadius: "18px",
              border: "1px solid rgba(148,163,184,0.4)",
              background:
                "radial-gradient(circle at top right, rgba(15,23,42,0.9), 
rgba(15,23,42,0.75))",
              padding: "16px 18px",
              boxShadow: "0 18px 40px rgba(15,23,42,0.85)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  marginBottom: "2px",
                }}
              >
                Insights AI in tempo reale
              </h2>
              <p
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                }}
              >
                Suggerimenti generati dall’intelligenza artificiale sulla 
base
                delle performance delle tue campagne.
              </p>
            </div>

            <AiInsightBubble
              title="Ottimizzazione CTR"
              severity={trendUp ? "success" : "warning"}
              text={
                trendUp
                  ? "Il CTR delle tue campagne è in crescita rispetto 
all'inizio del periodo. La rete neurale ha identificato creatività e 
segmenti di pubblico con performance sopra la media. Consigliato: aumenta 
il budget sulle campagne ad alto rendimento."
                  : "Il CTR mostra un calo rispetto all'inizio del 
periodo. Consigliato: riduci la spesa sulle campagne meno performanti e 
testa nuove creatività generate dall’AI."
              }
            />
            <AiInsightBubble
              title="Distribuzione budget"
              severity="info"
              text="Una parte del budget viene spesa su campagne con 
conversioni inferiori alla media. La AI può proporre una ridistribuzione 
automatica per migliorare il costo per acquisizione."
            />
            <AiInsightBubble
              title="Nuove varianti annuncio"
              severity="info"
              text="In base al comportamento degli utenti potresti testare 
creatività orientate a 'urgenza + prova sociale' (es. recensioni, casi 
studio). Presto potrai generare le varianti automaticamente con un click."
            />
          </div>
        </section>

        {/* CTR FOCUS + LISTA CAMPAGNE */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1.8fr)",
            gap: "18px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              borderRadius: "18px",
              border: "1px solid rgba(148,163,184,0.4)",
              background:
                "radial-gradient(circle at bottom left, 
rgba(15,23,42,0.95), rgba(15,23,42,0.8))",
              padding: "16px 18px",
              boxShadow: "0 16px 36px rgba(15,23,42,0.85)",
            }}
          >
            <div
              style={{
                marginBottom: "10px",
              }}
            >
              <h2
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  marginBottom: "2px",
                }}
              >
                CTR focus
              </h2>
              <p
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                }}
              >
                Andamento CTR medio delle ultime campagne.
              </p>
            </div>
            {loading ? <ChartSkeleton /> : <CtrChart data={sampleCtr} />}
          </div>

          <div
            style={{
              borderRadius: "18px",
              border: "1px solid rgba(148,163,184,0.4)",
              background:
                "radial-gradient(circle at bottom right, 
rgba(15,23,42,0.95), rgba(15,23,42,0.8))",
              padding: "16px 18px",
              boxShadow: "0 16px 36px rgba(15,23,42,0.85)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "15px",
                    fontWeight: 500,
                    marginBottom: "2px",
                  }}
                >
                  Campagne attive
                </h2>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                  }}
                >
                  Panoramica delle campagne gestite da AI Ads Revolution.
                </p>
              </div>
              <button
                style={{
                  fontSize: "11px",
                  borderRadius: "999px",
                  padding: "6px 10px",
                  border: "1px solid rgba(148,163,184,0.6)",
                  background: "rgba(15,23,42,0.85)",
                  color: "#e5e7eb",
                  cursor: "pointer",
                }}
              >
                Vedi tutte
              </button>
            </div>

            {loading ? <CampaignListSkeleton /> : <CampaignList 
campaigns={campaigns} />}
          </div>
        </section>

        <footer
          style={{
            fontSize: "11px",
            color: "#64748b",
            textAlign: "center",
            paddingTop: "8px",
            borderTop: "1px solid rgba(15,23,42,0.9)",
          }}
        >
          AI Ads Revolution – Motore neurale di advertising • Beta privata
        </footer>
      </div>
    </div>
  );
}

function KpiSkeleton() {
  return (
    <div
      style={{
        borderRadius: "16px",
        padding: "14px 14px 12px",
        border: "1px solid rgba(148,163,184,0.4)",
        background:
          "radial-gradient(circle at top, rgba(15,23,42,0.9), 
rgba(15,23,42,0.7))",
        boxShadow: "0 16px 36px rgba(15,23,42,0.85)",
      }}
    >
      <div
        style={{
          width: "40%",
          height: "10px",
          borderRadius: "999px",
          background: "rgba(148,163,184,0.4)",
          marginBottom: "10px",
        }}
      />
      <div
        style={{
          width: "60%",
          height: "18px",
          borderRadius: "999px",
          background: "rgba(148,163,184,0.5)",
        }}
      />
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div
      style={{
        marginTop: "8px",
        height: "180px",
        borderRadius: "14px",
        background:
          "linear-gradient(180deg, rgba(15,23,42,0.6), 
rgba(15,23,42,0.3))",
        border: "1px solid rgba(148,163,184,0.5)",
      }}
    />
  );
}

function CampaignListSkeleton() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        marginTop: "4px",
      }}
    >
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          style={{
            padding: "9px 10px",
            borderRadius: "12px",
            border: "1px solid rgba(148,163,184,0.35)",
            background:
              "linear-gradient(90deg, rgba(15,23,42,0.96), 
rgba(15,23,42,0.85))",
            display: "grid",
            gridTemplateColumns: "minmax(0, 2.2fr) 1fr 1fr 1fr",
            columnGap: "8px",
            alignItems: "center",
            fontSize: "12px",
          }}
        >
          <div
            style={{
              height: "10px",
              borderRadius: "999px",
              background: "rgba(148,163,184,0.45)",
            }}
          />
          <div
            style={{
              height: "10px",
              borderRadius: "999px",
              background: "rgba(148,163,184,0.35)",
            }}
          />
          <div
            style={{
              height: "10px",
              borderRadius: "999px",
              background: "rgba(148,163,184,0.35)",
            }}
          />
          <div
            style={{
              height: "10px",
              borderRadius: "999px",
              background: "rgba(148,163,184,0.35)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

function KpiCard({ label, value, diff, trend }) {
  const isUp = trend === "up";
  const color = isUp ? "#22c55e" : "#f97316";

  return (
    <div
      style={{
        borderRadius: "16px",
        padding: "14px 14px 12px",
        border: "1px solid rgba(148,163,184,0.4)",
        background:
          "radial-gradient(circle at top, rgba(15,23,42,0.9), 
rgba(15,23,42,0.7))",
        boxShadow: "0 16px 36px rgba(15,23,42,0.85)",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      <span
        style={{
          fontSize: "12px",
          color: "#94a3b8",
        }}
      >
        {label}
      </span>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontSize: "20px",
            fontWeight: 600,
          }}
        >
          {value}
        </span>
        {diff && (
          <span
            style={{
              fontSize: "11px",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: "3px 8px",
              borderRadius: "999px",
              border: `1px solid ${color}66`,
              background: `radial-gradient(circle at 0 0, ${color}26, 
transparent 60%)`,
              color,
            }}
          >
            <span
              style={{
                display: "inline-block",
                transform: `translateY(${isUp ? "-1px" : "1px"})`,
              }}
            >
              {isUp ? "▲" : "▼"}
            </span>
            {diff}
          </span>
        )}
      </div>
      <div
        style={{
          marginTop: "6px",
          height: "4px",
          borderRadius: "999px",
          background:
            "linear-gradient(90deg, rgba(148,163,184,0.35), 
rgba(15,23,42,0.9))",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: isUp ? "68%" : "42%",
            background: isUp
              ? "linear-gradient(90deg, #22c55e, #4ade80)"
              : "linear-gradient(90deg, #f97316, #facc15)",
            boxShadow: isUp
              ? "0 0 12px rgba(34,197,94,0.9)"
              : "0 0 12px rgba(249,115,22,0.9)",
          }}
        />
      </div>
    </div>
  );
}

function TrendChart({ data, secondData }) {
  const maxValue = Math.max(...data, ...(secondData || []), 1);

  return (
    <div
      style={{
        marginTop: "4px",
        height: "180px",
        borderRadius: "14px",
        background:
          "linear-gradient(180deg, rgba(15,23,42,0.6), 
rgba(15,23,42,0.2))",
        border: "1px solid rgba(30,64,175,0.5)",
        padding: "10px 10px 12px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        gap: "8px",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-end",
          gap: "6px",
        }}
      >
        {data.map((value, idx) => {
          const height = (value / maxValue) * 100;
          return (
            <div
              key={idx}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                gap: "2px",
              }}
            >
              <div
                style={{
                  width: "9px",
                  borderRadius: "999px",
                  height: `${height}%`,
                  background:
                    "linear-gradient(180deg, #38bdf8, #0ea5e9)",
                  boxShadow: "0 0 16px rgba(56,189,248,0.8)",
                }}
              />
              {secondData && secondData[idx] != null && (
                <div
                  style={{
                    width: "9px",
                    borderRadius: "999px",
                    height: `${(secondData[idx] / maxValue) * 100}%`,
                    background:
                      "linear-gradient(180deg, #a855f7, #6366f1)",
                    boxShadow: "0 0 16px rgba(129,140,248,0.8)",
                    opacity: 0.9,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
      <div
        style={{
          fontSize: "11px",
          color: "#64748b",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 2px",
        }}
      >
        <span>Inizio periodo</span>
        <span>Fine periodo</span>
      </div>
    </div>
  );
}

function CtrChart({ data }) {
  const maxValue = Math.max(...data, 1);

  return (
    <div
      style={{
        marginTop: "4px",
        height: "150px",
        borderRadius: "14px",
        background:
          "linear-gradient(180deg, rgba(15,23,42,0.6), 
rgba(15,23,42,0.2))",
        border: "1px solid rgba(147,51,234,0.5)",
        padding: "10px 10px 12px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        gap: "8px",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-end",
          gap: "6px",
        }}
      >
        {data.map((value, idx) => {
          const height = (value / maxValue) * 100;
          return (
            <div
              key={idx}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "10px",
                  borderRadius: "999px",
                  height: `${height}%`,
                  background:
                    "linear-gradient(180deg, #a855f7, #6366f1)",
                  boxShadow: "0 0 16px rgba(168,85,247,0.9)",
                }}
              />
            </div>
          );
        })}
      </div>
      <div
        style={{
          fontSize: "11px",
          color: "#64748b",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 2px",
        }}
      >
        <span>Inizio periodo</span>
        <span>Fine periodo</span>
      </div>
    </div>
  );
}

function AiInsightBubble({ title, text, severity }) {
  let borderColor = "rgba(148,163,184,0.8)";
  let accent = "#38bdf8";

  if (severity === "success") {
    borderColor = "rgba(34,197,94,0.7)";
    accent = "#22c55e";
  } else if (severity === "warning") {
    borderColor = "rgba(234,179,8,0.8)";
    accent = "#facc15";
  }

  return (
    <div
      style={{
        borderRadius: "14px",
        border: `1px solid ${borderColor}`,
        background:
          "radial-gradient(circle at top left, rgba(15,23,42,0.95), 
rgba(15,23,42,0.85))",
        padding: "10px 11px",
        display: "flex",
        gap: "10px",
      }}
    >
      <div
        style={{
          marginTop: "3px",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "18px",
            height: "18px",
            borderRadius: "999px",
            border: `1px solid ${accent}`,
            fontSize: "11px",
            color: accent,
          }}
        >
          AI
        </span>
      </div>
      <div>
        <div
          style={{
            fontSize: "12px",
            fontWeight: 500,
            marginBottom: "2px",
          }}
        >
          {title}
        </div>
        <p
          style={{
            fontSize: "12px",
            color: "#cbd5f5",
            lineHeight: 1.5,
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

function CampaignList({ campaigns }) {
  const items =
    campaigns && campaigns.length
      ? campaigns
      : [
          {
            name: "Launch prodotto AI – Italia",
            status: "Attiva",
            impressions: 32410,
            clicks: 1912,
            conversions: 112,
            spend: 189,
          },
          {
            name: "Retargeting visitatori sito",
            status: "In ottimizzazione",
            impressions: 12040,
            clicks: 868,
            conversions: 54,
            spend: 96,
          },
          {
            name: "Campagna brand awareness",
            status: "Attiva",
            impressions: 54782,
            clicks: 2103,
            conversions: 65,
            spend: 202,
          },
        ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        marginTop: "4px",
      }}
    >
      {items.map((c) => (
        <div
          key={c.name}
          style={{
            padding: "9px 10px",
            borderRadius: "12px",
            border: "1px solid rgba(148,163,184,0.35)",
            background:
              "linear-gradient(90deg, rgba(15,23,42,0.96), 
rgba(15,23,42,0.85))",
            display: "grid",
            gridTemplateColumns: "minmax(0, 2.2fr) 1fr 1fr 1fr",
            columnGap: "8px",
            alignItems: "center",
            fontSize: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <span
              style={{
                fontWeight: 500,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {c.name}
            </span>
            <span
              style={{
                fontSize: "11px",
                color: "#64748b",
              }}
            >
              Gestita tramite rete neurale AI
            </span>
          </div>
          <div>
            <BadgeStatus status={c.status} />
          </div>
          <div>
            <span
              style={{
                display: "block",
                color: "#cbd5f5",
              }}
            >
              {Number(c.impressions || 0).toLocaleString("it-IT")}
            </span>
            <span
              style={{
                fontSize: "11px",
                color: "#64748b",
              }}
            >
              Impression
            </span>
          </div>
          <div
            style={{
              textAlign: "right",
            }}
          >
            <span
              style={{
                display: "block",
                color: "#cbd5f5",
              }}
            >
              {c.clicks && c.impressions
                ? ((c.clicks / c.impressions) * 100).toFixed(1) + " %"
                : "—"}
            </span>
            <span
              style={{
                fontSize: "11px",
                color: "#64748b",
              }}
            >
              CTR • € {Number(c.spend || 0).toFixed(2)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function BadgeStatus({ status }) {
  let color = "#22c55e";
  let bg = "rgba(34,197,94,0.18)";

  if (status === "In ottimizzazione") {
    color = "#eab308";
    bg = "rgba(234,179,8,0.18)";
  } else if (status === "Pausa") {
    color = "#64748b";
    bg = "rgba(148,163,184,0.2)";
  }

  return (
    <span
      style={{
        fontSize: "11px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "6px",
        padding: "4px 9px",
        borderRadius: "999px",
        border: `1px solid ${color}70`,
        background: bg,
        color,
        maxWidth: "100%",
      }}
    >
      <span
        style={{
          width: "7px",
          height: "7px",
          borderRadius: "999px",
          background: color,
          boxShadow: `0 0 10px ${color}`,
        }}
      />
      {status}
    </span>
  );
}

