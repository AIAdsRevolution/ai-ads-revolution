export default function Section({ id, title, subtitle, children }: { id?: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-2xl md:text-4xl font-semibold">{title}</h2>
        {subtitle && <p className="mt-3 text-zinc-300">{subtitle}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
