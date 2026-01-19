export function analyzeAttention(seconds: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < seconds; i++) {
    const base = 95 - i * 1.2;
    const wobble = (i % 7) * 0.8;
    out.push(Math.max(18, Math.round(base - wobble)));
  }
  return out;
}
