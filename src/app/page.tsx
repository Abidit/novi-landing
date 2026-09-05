import { FeatureShowcase } from '@/components/features/FeatureShowcase';
import { Footer } from '@/components/footer/Footer';
import { Hero } from '@/components/hero/Hero';
import { HowItWorks } from '@/components/how-it-works/HowItWorks';
import { Navbar } from '@/components/layout/Navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <FeatureShowcase />
      </main>
      <Footer />
    </>
  );
};

export default Home;
