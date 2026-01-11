export default function AiEngine() {
  const items = [
    "AI-first in ogni decisione",
    "Decision log trasparente",
    "Realtime signals",
    "Scalabilità enterprise",
  ];

  return (
    <ul className="grid md:grid-cols-2 gap-6">
      {items.map(i => (
        <li key={i} className="text-zinc-300">• {i}</li>
      ))}
    </ul>
  );
}
