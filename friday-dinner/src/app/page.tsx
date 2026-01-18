import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import HeroSection from '@/components/landing/HeroSection';
import HowItWorks from '@/components/landing/HowItWorks';
import Benefits from '@/components/landing/Benefits';
import Pricing from '@/components/landing/Pricing';
import FAQ from '@/components/landing/FAQ';
import CTA from '@/components/landing/CTA';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <HowItWorks />
        <Benefits />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
