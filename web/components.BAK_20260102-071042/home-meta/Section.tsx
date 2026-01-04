export default function Section({
  id, title, subtitle, children,
}:{
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="meta-section">
      <div className="meta-container">
        <h2 className="meta-h2">{title}</h2>
        {subtitle && <p className="meta-sub">{subtitle}</p>}
        <div style={{ marginTop: 22 }}>{children}</div>
      </div>
    </section>
  );
}
