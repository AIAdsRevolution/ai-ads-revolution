export function hookScore(attention: number[]): number {
  const first = attention.slice(0, 3);
  const avg = first.reduce((a, b) => a + b, 0) / Math.max(1, first.length);
  return Math.max(0, Math.min(100, Math.round(avg)));
}
