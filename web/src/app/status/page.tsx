export default function Page() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-semibold mb-4">Status</h1>
        <div className="text-white/80 leading-relaxed space-y-4">
          <p>Pagina di stato servizi (web, API, AI core, billing). Se vuoi, la colleghiamo ai tuoi endpoint /api/ai/status e ai log Render.</p><p>✅ Stato attuale: Online (locale).</p>
        </div>
      </div>
    </main>
  );
}
