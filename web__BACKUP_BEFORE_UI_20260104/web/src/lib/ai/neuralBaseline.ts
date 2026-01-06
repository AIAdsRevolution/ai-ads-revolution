export type AiReadiness = "COLLECTING" | "BASELINE" | "READY_SOFT" | "READY_FULL";
export type AiStatus = {
  readiness: AiReadiness;
  confidence: number;
  stable: boolean;
  reasons: string[];
  nextSteps: string[];
  guardrails: { minImpressions: number; minClicks: number; minDays: number; coolDownHours: number };
};
type Kpi = { impressions: number; clicks: number; ctr: number; cost: number; cpc: number; revenue: number; roas: number; conversions: number };

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
function scoreFromVolume(impressions: number, clicks: number, days: number) {
  const s1 = Math.log10(Math.max(10, impressions)) / 6;
  const s2 = Math.log10(Math.max(10, clicks)) / 5;
  const s3 = Math.log10(Math.max(2, days)) / 2;
  return clamp01(0.55 * s1 + 0.35 * s2 + 0.10 * s3);
}
export function buildAiStatus(args: { windowDays: number; rows: number; kpi: Kpi }): AiStatus {
  const { windowDays, rows, kpi } = args;
  const guardrails = { minImpressions: 5000, minClicks: 120, minDays: 2, coolDownHours: 12 };
  const reasons: string[] = [];
  const nextSteps: string[] = [];

  const hasMinDays = windowDays >= guardrails.minDays;
  const hasVolume = kpi.impressions >= guardrails.minImpressions && kpi.clicks >= guardrails.minClicks;

  const ctrOk = Number.isFinite(kpi.ctr) && kpi.ctr > 0.2 && kpi.ctr < 25;
  const stable = ctrOk && kpi.impressions > 0 && kpi.clicks > 0;

  let readiness: AiReadiness = "COLLECTING";
  if (!hasMinDays) { reasons.push("Finestra dati troppo breve: servono almeno 48h di raccolta segnali."); nextSteps.push("Lascia attiva la raccolta dati per almeno 2 giorni."); }
  if (!hasVolume) { reasons.push("Volume insufficiente per ottimizzazioni affidabili (serve baseline)."); nextSteps.push(`Punta a ≥ ${guardrails.minImpressions.toLocaleString()} impression e ≥ ${guardrails.minClicks} click in finestra.`); }

  if (hasMinDays && !hasVolume) readiness = "BASELINE";
  if (hasMinDays && hasVolume) readiness = "READY_SOFT";

  const hasConversions = (kpi.conversions ?? 0) >= 15;
  if (readiness === "READY_SOFT" && hasConversions) {
    readiness = "READY_FULL";
    reasons.push("Soglia conversioni raggiunta: il sistema può eseguire ottimizzazioni graduali.");
  } else if (readiness === "READY_SOFT") {
    reasons.push("Baseline KPI pronta: abilitate ottimizzazioni leggere (senza cambi aggressivi).");
    nextSteps.push("Collega conversion tracking/valore per passare a ottimizzazioni complete.");
  }

  if (!stable) { reasons.push("Dati non ancora stabili: l’AI resta in modalità osservazione per evitare azioni rischiose."); nextSteps.push("Controlla coerenza tracking e attendi più segnali."); }
  if (rows <= 0) { reasons.push("Nessuna riga disponibile in tabella: verifica che AI-Core scriva su Supabase."); nextSteps.push("Verifica inserimento su campaign_metrics e permessi/RLS."); }

  const volScore = scoreFromVolume(kpi.impressions, kpi.clicks, windowDays);
  const conf = clamp01(volScore * (stable ? 1 : 0.55));
  if (reasons.length === 0) reasons.push("Sistema operativo: raccolta segnali e calibrazione baseline.");
  if (nextSteps.length === 0) nextSteps.push("Continua raccolta dati e collega conversion tracking per ROAS reale.");

  return { readiness, confidence: conf, stable, reasons, nextSteps, guardrails };
}
