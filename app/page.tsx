import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { FounderSection } from '@/components/FounderSection';
import { InvestmentPillars } from '@/components/InvestmentPillars';
import { PerformanceAudit } from '@/components/PerformanceAudit';
import { LuxuryPropertyGrid } from '@/components/LuxuryPropertyGrid';
import { PressReleases } from '@/components/PressReleases';
import { Footer } from '@/components/Footer';
import { SectionWrapper } from '@/components/SectionWrapper';
import { ExitIntentPopup } from '@/components/ExitIntentPopup';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      <div id="home">
        <HeroSection />
      </div>

      <SectionWrapper id="founder" delay={0.1}>
        <FounderSection />
      </SectionWrapper>

      <SectionWrapper id="pillars" delay={0.1}>
        <InvestmentPillars />
      </SectionWrapper>

      <SectionWrapper delay={0.1}>
        <PerformanceAudit />
      </SectionWrapper>

      <SectionWrapper id="properties" delay={0.1}>
        <LuxuryPropertyGrid />
      </SectionWrapper>

      <SectionWrapper id="press" delay={0.1}>
        <PressReleases />
      </SectionWrapper>

      <SectionWrapper id="contact" delay={0.1}>
        <Footer />
      </SectionWrapper>

      {/* Engagement Features */}
      <ExitIntentPopup />
      <WhatsAppButton phoneNumber="+971501234567" />
    </main>
  );
}

