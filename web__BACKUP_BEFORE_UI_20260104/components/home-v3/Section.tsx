export default function Section({ title, subtitle, children }: any) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-3xl md:text-4xl font-semibold">{title}</h2>
        {subtitle && <p className="mt-4 text-zinc-300 max-w-2xl">{subtitle}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
