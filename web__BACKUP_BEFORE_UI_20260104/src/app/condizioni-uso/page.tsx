"use client";

import Link from "next/link";

export default function CondizioniUsoPage() {
  return (
    <main className="min-h-screen bg-black text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
        {/* Header */}
        <header className="mb-8 border-b border-slate-800 pb-6">
          <p className="text-xs uppercase tracking-[0.26em] text-emerald-400/80">
            AI Ads Revolution
          </p>
          <h1 className="mt-2 text-2xl font-semibold md:text-3xl">
            Condizioni Generali di Uso e Vendita
          </h1>
          <p className="mt-2 text-xs text-slate-400">
            Ultimo aggiornamento: 28 Novembre 2025
          </p>
          <p className="mt-3 text-sm text-slate-300 max-w-2xl">
            L&apos;utilizzo di AI Ads Revolution implica l&apos;accettazione integrale
            delle presenti condizioni. Si consiglia di leggerle con attenzione
            prima di utilizzare la piattaforma.
          </p>
        </header>

        <div className="space-y-8 text-sm leading-relaxed text-slate-200">
          {/* 1. Definizioni */}
          <section>
            <h2 className="text-lg font-semibold text-emerald-300">1. Definizioni</h2>
            <ul className="mt-3 space-y-1 text-slate-300">
              <li>
                <span className="font-semibold text-slate-100">Piattaforma</span>: il servizio
                AI Ads Revolution, accessibile tramite sito web e future applicazioni.
              </li>
              <li>
                <span className="font-semibold text-slate-100">Utente / Inserzionista</span>:
                chiunque crei un account o utilizzi la piattaforma per gestire campagne.
              </li>
              <li>
                <span className="font-semibold text-slate-100">Campagna Pubblicitaria</span>:
                insieme di annunci, creatività, targeting e budget gestiti tramite la piattaforma.
              </li>
              <li>
                <span className="font-semibold text-slate-100">AI Engine</span>: il motore di
                ottimizzazione basato su algoritmi di intelligenza artificiale.
              </li>
              <li>
                <span className="font-semibold text-slate-100">Abbonamento</span>: qualunque piano
                a pagamento (es. &quot;Piano Basic&quot;) attivato tramite Stripe.
              </li>
            </ul>
          </section>

          {/* 2. Oggetto del Servizio */}
          <section>
            <h2 className="text-lg font-semibold text-emerald-300">
              2. Oggetto del Servizio
            </h2>
            <p className="mt-3 text-slate-300">
              AI Ads Revolution offre una piattaforma di advertising AI-first che
              permette di creare, gestire e ottimizzare campagne pubblicitarie
              attraverso:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-300">
              <li>gestione delle campagne in un&apos;unica dashboard;</li>
              <li>ottimizzazione automatica tramite intelligenza artificiale;</li>
              <li>reportistica su impression, click, conversioni, CTR e ROAS;</li>
              <li>strumenti di generazione creatività basati su AI;</li>
              <li>supporto durante la fase beta tramite email.</li>
            </ul>
            <p className="mt-3 text-xs text-slate-400">
              La piattaforma non garantisce risultati specifici (es. livello di CTR,
              vendite o profitti). Le performance dipendono da settore, budget,
              mercato e contenuti degli annunci.
            </p>
          </section>

          {/* 3. Accesso alla piattaforma */}
          <section>
            <h2 className="text-lg font-semibold text-emerald-300">
              3. Accesso alla Piattaforma
            </h2>
            <p className="mt-3 text-slate-300">
              Per utilizzare AI Ads Revolution l&apos;utente dichiara e garantisce di:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-300">
              <li>avere almeno 18 anni;</li>
              <li>fornire dati reali, corretti e aggiornati al momento della registrazione;</li>
              <li>
                non utilizzare la piattaforma in violazione delle leggi del Paese di residenza
                o della propria attività.
              </li>
            </ul>
            <p className="mt-3 text-slate-300">
              La piattaforma può sospendere o chiudere gli account che risultino:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-300">
              <li>falsi o creati con identità non verificate;</li>
              <li>
                coinvolti in attività fraudolente, ingannevoli o potenzialmente dannose;
              </li>
              <li>utilizzati in violazione dei presenti Termini.</li>
            </ul>
          </section>

          {/* 4. Piani e Pagamenti */}
          <section>
            <h2 className="text-lg font-semibold text-emerald-300">4. Piani e Pagamenti</h2>
            <p className="mt-3 text-slate-300">
              I pagamenti degli abbonamenti sono gestiti da{" "}
              <span className="font-semibold">Stripe</span>. AI Ads Revolution non memorizza
              i dati completi delle carte di pagamento sui propri server.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-300">
              <li>
                gli abbonamenti hanno rinnovo automatico (es. mensile) fino a cancellazione;
              </li>
              <li>
                la cancellazione ha effetto sui rinnovi futuri e non dà diritto al rimborso
                del periodo già fatturato, salvo diversa indicazione;
              </li>
              <li>
                eventuali periodi di prova gratuita possono essere introdotti, modificati
                o rimossi in qualsiasi momento.
              </li>
            </ul>
          </section>

          {/* 5. Uso consentito */}
          <section>
            <h2 className="text-lg font-semibold text-emerald-300">5. Uso Consentito</h2>
            <p className="mt-3 text-slate-300">
              L&apos;utente si impegna a non utilizzare la piattaforma per:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-300">
              <li>attività illegali, ingannevoli o non autorizzate;</li>
              <li>
                promozione di contenuti violenti, discriminatori, d&apos;odio o contrari
                alle normative vigenti;
              </li>
              <li>
                tentativi di hacking, reverse engineering, accesso non autorizzato a sistemi
                o dati di terzi;
              </li>
              <li>diffusione di malware, spam o contenuti dannosi.</li>
            </ul>
            <p className="mt-3 text-xs text-slate-400">
              In caso di utilizzo improprio, AI Ads Revolution può sospendere o terminare
              l&apos;account a propria discrezione.
            </p>
          </section>

          {/* 6. Limitazione di responsabilità */}
          <section>
            <h2 className="text-lg font-semibold text-emerald-300">
              6. Limitazione di Responsabilità
            </h2>
            <p className="mt-3 text-slate-300">
              Nei limiti massimi consentiti dalla legge applicabile, AI Ads Revolution non è
              responsabile per:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-300">
              <li>danni indiretti, consequenziali o perdita di profitto;</li>
              <li>
                risultati insufficienti delle campagne o mancato raggiungimento di obiettivi
                commerciali;
              </li>
              <li>
                malfunzionamenti o interruzioni derivanti da servizi di terze parti
                (es. Stripe, provider cloud, database, rete).
              </li>
            </ul>
          </section>

          {/* 7. Proprietà Intellettuale */}
          <section>
            <h2 className="text-lg font-semibold text-emerald-300">
              7. Proprietà Intellettuale
            </h2>
            <p className="mt-3 text-slate-300">
              Tutti i contenuti della piattaforma (codice, design, loghi, testi, AI Engine,
              modelli e interfaccia) sono protetti dalle norme in materia di proprietà
              intellettuale.
            </p>
            <p className="mt-3 text-slate-300">
              È vietato copiare, modificare, distribuire, vendere o creare opere derivate
              basate sulla piattaforma senza autorizzazione scritta del titolare.
            </p>
          </section>

          {/* 8. Modifiche ai Termini */}
          <section>
            <h2 className="text-lg font-semibold text-emerald-300">
              8. Modifiche ai Servizi e ai Termini
            </h2>
            <p className="mt-3 text-slate-300">
              AI Ads Revolution può aggiornare o modificare i servizi e i presenti Termini
              in qualsiasi momento. In caso di modifiche sostanziali, gli utenti ne
              saranno informati tramite email o notifiche interne.
            </p>
          </section>

          {/* 9. Legge applicabile */}
          <section>
            <h2 className="text-lg font-semibold text-emerald-300">
              9. Legge Applicabile e Foro Competente
            </h2>
            <p className="mt-3 text-slate-300">
              La legge applicabile e il foro competente saranno aggiornati quando verrà
              definita la sede legale definitiva della società che gestisce AI Ads Revolution.
            </p>
          </section>

          <section className="mt-8 border-t border-slate-800 pt-6 text-xs text-slate-500">
            <p>
              Per domande sui presenti Termini puoi contattarci tramite email
              all&apos;indirizzo che verrà indicato nella dashboard (es.{" "}
              <span className="text-emerald-300">legal@aiadsrevolution.com</span>).
            </p>
            <p className="mt-2">
              Quando la società sarà costituita, si consiglia di far revisionare
              queste condizioni da un professionista legale.
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
