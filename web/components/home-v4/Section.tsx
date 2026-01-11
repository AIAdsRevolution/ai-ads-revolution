export default function Section({
  id, title, subtitle, children,
}:{
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-16 md:py-20">
      <div className="ui-container">
        <h2 className="ui-h2">{title}</h2>
        {subtitle && <p className="mt-3 ui-muted max-w-2xl">{subtitle}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
