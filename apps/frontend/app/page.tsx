import { LandingNav } from '@/components/landing/landing-nav';
import { Hero } from '@/components/landing/hero';
import { HowItWorks } from '@/components/landing/how-it-works';
import { FeatureSections } from '@/components/landing/feature-sections';
import { FeatureGrid } from '@/components/landing/feature-grid';
import { Comparison } from '@/components/landing/comparison';
import { Testimonials } from '@/components/landing/testimonials';
import { Pricing } from '@/components/landing/pricing';
import { FAQ } from '@/components/landing/faq';
import { CtaBand } from '@/components/landing/cta';
import { LandingFooter } from '@/components/landing/footer';

export default function Landing() {
  return (
    <>
      <LandingNav />
      <main>
        <Hero />
        <HowItWorks />
        <FeatureSections />
        <FeatureGrid />
        <Comparison />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CtaBand />
      </main>
      <LandingFooter />
    </>
  );
}
