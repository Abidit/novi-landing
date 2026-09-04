import { FeatureSection } from '@/components/features/featuresSection';
import { Footer } from '@/components/footer/Footer';
import { Hero } from '@/components/hero/Hero';
import { Navbar } from '@/components/layout/Navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeatureSection />
      </main>
      <Footer />
    </>
  );
};

export default Home;
