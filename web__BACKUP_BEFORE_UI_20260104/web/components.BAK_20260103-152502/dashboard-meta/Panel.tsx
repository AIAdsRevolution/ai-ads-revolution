export default function Panel({
  title,
  subtitle,
  children,
}:{
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        background: "var(--bg-panel)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: 18,
      }}
    >
      <div style={{ display:"flex", justifyContent:"space-between", gap: 12, flexWrap:"wrap" }}>
        <div>
          <div style={{ fontWeight: 750 }}>{title}</div>
          {subtitle && <div style={{ marginTop: 6, color:"var(--muted)", fontSize: 13 }}>{subtitle}</div>}
        </div>
      </div>
      <div style={{ marginTop: 14 }}>{children}</div>
    </section>
  );
}
