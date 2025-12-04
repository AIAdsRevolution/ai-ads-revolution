"use client";

import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
        <header className="mb-8 border-b border-slate-800 pb-6">
          <p className="text-xs uppercase tracking-[0.26em] text-emerald-400/80">
            AI Ads Revolution
          </p>
          <h1 className="mt-2 text-2xl font-semibold md:text-3xl">
            Informativa sulla Privacy
          </h1>
          <p className="mt-2 text-xs text-slate-400">
            Ultimo aggiornamento: 28 Novembre 2025
          </p>
          <p className="mt-3 text-sm text-slate-300 max-w-2xl">
            Questa informativa descrive come AI Ads Revolution raccoglie, utilizza e protegge
            i dati personali degli utenti della piattaforma.
          </p>
        </header>

        <div className="space-y-8 text-sm leading-relaxed text-slate-200">
          {/* 1. Titolare */}
          <section>
            <h2 className="text-lg font-semibold text-emerald-300">
              1. Titolare del Trattamento
            </h2>
            <p className="mt-3 text-slate-300">
              Il titolare del trattamento dei dati personali sarà indicato quando la società
              che gestisce AI Ads Revolution sarà formalmente costituita. I riferimenti
              (ragione sociale, indirizzo, contatti) verranno riportati in questa pagina.
            </p>
          </section>

          {/* 2. Tipologie di Dati Raccolti */}
          <section>
            <h2 className="text-lg font-semibold text-emerald-300">
              2. Dati che raccogliamo
            </h2>
            <p className="mt-3 text-slate-300">
              Utilizzando AI Ads Revolution, possono essere raccolte le seguenti categorie di dati:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-300">
              <li>
                <span className="font-semibold text-slate-100">Dati di registrazione</span>:
                email, nome (se fornito), credenziali di accesso.
              </li>
              <li>
                <span className="font-semibold text-slate-100">Dati di utilizzo</span>: log di
                accesso, azioni svolte in dashboard, impostazioni account.
              </li>
              <li>
                <span className="font-semibold text-slate-100">Dati delle campagne</span>:
                informazioni su impression, click, conversioni, budget e performance.
              </li>
              <li>
                <span className="font-semibold text-slate-100">Dati di pagamento</span>:
                gestiti tramite Stripe (la piattaforma non memorizza i numeri completi delle carte).
              </li>
              <li>
                <span className="font-semibold text-slate-100">Dati tecnici</span>: indirizzo IP,
                tipo di dispositivo, browser e informazioni di log.
              </li>
            </ul>
          </section>

          {/* 3. Finalità del trattamento */}
          <section>
            <h2 className="text-lg font-semibold text-emerald-300">
              3. Finalità del Trattamento
            </h2>
            <p className="mt-3 text-slate-300">
              I dati vengono trattati per le seguenti finalità:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-300">
              <li>creazione e gestione dell&apos;account utente;</li>
              <li>fornitura dei servizi di gestione e ottimizzazione delle campagne;</li>
              <li>analisi statistica e miglioramento delle funzionalità;</li>
              <li>gestione pagamenti, abbonamenti e fatturazione tramite Stripe;</li>
              <li>sicurezza della piattaforma e prevenzione di accessi fraudolenti;</li>
              <li>
                invio di comunicazioni legate al servizio (es. avvisi tecnici, aggiornamenti importanti).
              </li>
            </ul>
          </section>

          {/* 4. Base giuridica */}
          <section>
            <h2 className="text-lg font-semibold text-emerald-300">
              4. Base giuridica del trattamento
            </h2>
            <p className="mt-3 text-slate-300">
              La base giuridica principale è l&apos;esecuzione del contratto tra l&apos;utente e
              la piattaforma, nonché l&apos;adempimento di obblighi legali e il legittimo
              interesse a migliorare i servizi e garantire sicurezza.
            </p>
          </section>

          {/* 5. Terze parti */}
          <section>
            <h2 className="text-lg font-semibold text-emerald-300">
              5. Servizi di terze parti
            </h2>
            <p className="mt-3 text-slate-300">
              Per il funzionamento della piattaforma vengono utilizzati fornitori terzi, tra cui:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-300">
              <li>
                <span className="font-semibold">Stripe</span> – gestione pagamenti e abbonamenti.
              </li>
              <li>
                <span className="font-semibold">Supabase</span> – database, autenticazione
                e gestione dei dati applicativi.
              </li>
              <li>
                <span className="font-semibold">Render</span> – hosting dell&apos;applicazione web.
              </li>
              <li>
                <span className="font-semibold">AWS S3</span> – backup dei dati applicativi.
              </li>
              <li>
                <span className="font-semibold">OpenAI</span> – funzionalità di intelligenza
                artificiale generativa.
              </li>
            </ul>
            <p className="mt-3 text-xs text-slate-400">
              Tali fornitori possono trattare dati anche al di fuori dello Spazio Economico
              Europeo. Saranno adottate, ove necessario, misure di protezione adeguate secondo
              la normativa applicabile.
            </p>
          </section>

          {/* 6. Conservazione */}
          <section>
            <h2 className="text-lg font-semibold text-emerald-300">
              6. Conservazione dei dati
            </h2>
            <p className="mt-3 text-slate-300">
              I dati personali vengono conservati per il tempo necessario a:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-300">
              <li>fornire i servizi previsti dal contratto;</li>
              <li>gestire l&apos;account utente e gli abbonamenti attivi;</li>
              <li>adempiere ad obblighi legali e fiscali.</li>
            </ul>
            <p className="mt-3 text-slate-300">
              Quando l&apos;account viene chiuso, alcuni dati possono essere conservati per un
              periodo limitato per motivi legali o di sicurezza, dopodiché vengono cancellati
              o anonimizzati.
            </p>
          </section>

          {/* 7. Sicurezza */}
          <section>
            <h2 className="text-lg font-semibold text-emerald-300">
              7. Sicurezza dei dati
            </h2>
            <p className="mt-3 text-slate-300">
              La piattaforma adotta misure tecniche e organizzative adeguate per proteggere i
              dati personali, tra cui:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-300">
              <li>connessioni cifrate (HTTPS);</li>
              <li>accessi controllati al database;</li>
              <li>backup periodici su infrastrutture sicure;</li>
              <li>protezione delle password tramite tecniche di hashing.</li>
            </ul>
          </section>

          {/* 8. Diritti utente */}
          <section>
            <h2 className="text-lg font-semibold text-emerald-300">
              8. Diritti dell&apos;utente
            </h2>
            <p className="mt-3 text-slate-300">
              In base alla normativa applicabile (es. GDPR per utenti UE), l&apos;utente può
              avere diritto a:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-300">
              <li>accedere ai propri dati personali;</li>
              <li>richiederne la rettifica o l&apos;aggiornamento;</li>
              <li>chiederne la cancellazione, ove possibile;</li>
              <li>limitare o opporsi a determinati trattamenti;</li>
              <li>richiedere la portabilità dei dati.</li>
            </ul>
            <p className="mt-3 text-xs text-slate-400">
              I dettagli operativi per l&apos;esercizio di tali diritti verranno indicati
              quando la società sarà registrata e saranno attivati i canali ufficiali.
            </p>
          </section>

          {/* 9. Cookie */}
          <section>
            <h2 className="text-lg font-semibold text-emerald-300">
              9. Cookie e strumenti di tracciamento
            </h2>
            <p className="mt-3 text-slate-300">
              La piattaforma utilizza cookie tecnici e, se abilitati, cookie analitici e
              di performance. Maggiori dettagli sono disponibili nella{" "}
              <Link href="/cookie" className="text-emerald-300 hover:text-emerald-200">
                Informativa Cookie
              </Link>
              .
            </p>
          </section>

          {/* 10. Contatti */}
          <section>
            <h2 className="text-lg font-semibold text-emerald-300">10. Contatti</h2>
            <p className="mt-3 text-slate-300">
              Per domande relative alla privacy o alle modalità di trattamento dei dati,
              verrà messo a disposizione un indirizzo email dedicato (es.{" "}
              <span className="text-emerald-300">privacy@aiadsrevolution.com</span>) quando
              l&apos;azienda sarà formalmente costituita.
            </p>
          </section>

          <section className="mt-8 border-t border-slate-800 pt-6 text-xs text-slate-500">
            <p>
              La presente informativa potrà essere aggiornata in caso di cambiamenti normativi
              o evoluzione dei servizi offerti.
            </p>
            <p className="mt-4">
              <Link href="/" className="text-emerald-300 hover:text-emerald-200">
                ← Torna alla home
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
