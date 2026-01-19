import type { EditPlan } from "../core/decision_engine";

export function buildFfmpegGuide(input: string, output: string, plan: EditPlan) {
  return {
    input,
    output,
    suggestedCutsSeconds: plan.cuts,
    suggestedSpeedUps: plan.speedUps,
    note:
      "V1: guida. Prossimo step: generazione automatica filter_complex (tagli+speed reali)."
  };
}
