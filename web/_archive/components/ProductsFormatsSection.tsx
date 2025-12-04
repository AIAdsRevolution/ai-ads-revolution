import React from "react";

export default function ProductsFormatsSection() {
  return (
    <section
      style={{
        padding: "2rem",
        borderRadius: "1rem",
        border: "1px solid rgba(148,163,184,0.35)",
        background:
          "radial-gradient(circle at top, #020617 0, #020617 40%, #000 100%)",
        color: "#e5e7eb",
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      }}
    >
      <h2
        style={{
          fontSize: "1.1rem",
          fontWeight: 600,
          marginBottom: "0.5rem",
        }}
      >
        Products Formats (Backup)
      </h2>
      <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
        Questo è un componente placeholder per una vecchia versione della
        homepage di AI Ads Revolution. Non viene usato nella nuova app, ma è
        mantenuto per compatibilità dell&apos;archivio e per permettere alla build
        di completarsi correttamente.
      </p>
    </section>
  );
}
