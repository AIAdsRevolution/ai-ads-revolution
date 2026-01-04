import Hero from "@/components/home-meta/Hero";
import Section from "@/components/home-meta/Section";
import HowItWorks from "@/components/home-meta/HowItWorks";
import AiEngine from "@/components/home-meta/AiEngine";
import CTA from "@/components/home-meta/CTA";
import Footer from "@/components/home-meta/Footer";

export default function Home() {
  return (
    <main>
      <Hero />

      <Section
        id="come-funziona"
        title="Come funziona"
        subtitle="Dall’idea alla conversione in tre passaggi. Semplice, misurabile, scalabile."
      >
        <HowItWorks />
      </Section>

      <Section
        id="ai-engine"
        title="AI Neural Engine"
        subtitle="Un motore neurale, non un semplice strumento. Trasparenza, segnali realtime e controllo."
      >
        <AiEngine />
      </Section>

      <Section
        title="Inizia subito"
        subtitle="Crea un account e attiva le ottimizzazioni AI. La dashboard resta il posto dei dati reali."
      >
        <CTA />
      </Section>

      <Footer />
    </main>
  );
}
