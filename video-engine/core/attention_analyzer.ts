export function analyzeAttention(seconds: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < seconds; i++) {
    // più aggressivo: scende più rapidamente per generare drop/cuts
    const base = 92 - i * 2.1;
    const wobble = (i % 9) * 1.1;
    out.push(Math.max(10, Math.round(base - wobble)));
  }
  return out;
}
