export type EditPlan = {
  cuts: number[];
  speedUps: { at: number; rate: number }[];
  dropPoints: number[];
  highlights: { start: number; end: number }[];
  ctaTime: number;
  notes: string[];
};

export function decideEdits(attention: number[]): EditPlan {
  const dropPoints: number[] = [];
  const cuts: number[] = [];
  const speedUps: { at: number; rate: number }[] = [];

  attention.forEach((v, i) => {
    if (v < 45) dropPoints.push(i);
    if (v < 38) cuts.push(i);
    if (v >= 38 && v < 45) speedUps.push({ at: i, rate: 1.25 });
  });

  const highlights: { start: number; end: number }[] = [];
  let start: number | null = null;
  for (let i = 0; i < attention.length; i++) {
    if (attention[i] >= 70 && start === null) start = i;
    if ((attention[i] < 70 || i === attention.length - 1) && start !== null) {
      const end = i === attention.length - 1 ? i : i - 1;
      if (end - start >= 2) highlights.push({ start, end });
      start = null;
    }
  }

  const slice = attention.slice(5);
  let bestIdx = 0;
  slice.forEach((v, i) => { if (v > slice[bestIdx]) bestIdx = i; });
  const ctaTime = 5 + bestIdx;

  const notes: string[] = [];
  if (cuts.length > 6) notes.push("Molti tagli: video probabilmente lento/dispersivo.");
  if (ctaTime < 7) notes.push("CTA presto: ok per low-ticket/impulsivo.");

  return { cuts, speedUps, dropPoints, highlights, ctaTime, notes };
}
