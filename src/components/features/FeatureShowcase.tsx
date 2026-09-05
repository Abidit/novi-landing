import { featureSectionContent } from '@/lib/content';
import { FeatureListMobile } from './FeatureListMobile';
import { FeatureScrollDesktop } from './FeatureScrollDesktop';

export const FeatureShowcase = () => {
  return (
    <section
      id="features"
      className="mx-auto max-w-6xl scroll-mt-28 px-6 py-20 sm:py-24 md:scroll-mt-20 lg:px-8"
    >
      <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
        <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl lg:text-4xl">
          {featureSectionContent.heading}
        </h2>
        <p className="mt-4 text-base text-neutral-500 sm:text-lg">
          {featureSectionContent.subheading}
        </p>
      </div>

      <div className="md:hidden">
        <FeatureListMobile />
      </div>
      <div className="hidden md:block">
        <FeatureScrollDesktop />
      </div>
    </section>
  );
};
