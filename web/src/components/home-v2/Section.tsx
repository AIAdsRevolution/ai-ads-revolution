export default function Section({
  title,
  subtitle,
  children,
  id
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-14 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-5">
        <div className="mb-8 md:mb-10">
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">{title}</h2>
          {subtitle && <p className="mt-3 text-zinc-300 max-w-2xl">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
