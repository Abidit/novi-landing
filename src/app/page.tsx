import { FeatureShowcase } from '@/components/features/FeatureShowcase';
import { Footer } from '@/components/footer/Footer';
import { Hero } from '@/components/hero/Hero';
import { HowItWorks } from '@/components/how-it-works/HowItWorks';
import { Navbar } from '@/components/layout/Navbar';
import { heroContent } from '@/lib/content';
import { SITE_NAME, SITE_URL } from '@/lib/site';

// SoftwareApplication fits this page better than Organization: every string
// below describes the product itself (what it is, what it does), not the
// company running it, and there's no "about us" content to justify Organization.
// Only real, already-established facts — no invented pricing, ratings, or reviews.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE_NAME,
  description: heroContent.subheading,
  url: SITE_URL,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
};

const Home = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
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
