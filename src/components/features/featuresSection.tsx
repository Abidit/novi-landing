'use client';

import { motion } from 'framer-motion';
import { featureSectionContent, features } from '@/lib/content';
import { FeatureCard } from './FeatureCard';

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

export function FeatureSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:px-8">
      <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
        <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl lg:text-4xl">
          {featureSectionContent.heading}
        </h2>
        <p className="mt-4 text-base text-neutral-500 sm:text-lg">
          {featureSectionContent.subheading}
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
      >
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </motion.div>
    </section>
  );
}
