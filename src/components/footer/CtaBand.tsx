'use client';

import { motion, type Variants } from 'framer-motion';
import { ctaContent } from '@/lib/content';
import { NewsletterForm } from './NewsletterForm';

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const CtaBand = () => {
  return (
    <section className="bg-indigo-50">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto max-w-6xl px-6 py-20 text-center sm:py-24 lg:px-8"
      >
        <motion.h2
          variants={item}
          className="text-2xl font-bold text-neutral-900 sm:text-3xl lg:text-4xl"
        >
          {ctaContent.heading}
        </motion.h2>
        <motion.div variants={item} className="mx-auto mt-8 flex max-w-md justify-center">
          <NewsletterForm />
        </motion.div>
        <motion.p variants={item} className="mt-4 text-sm text-neutral-500">
          {ctaContent.disclaimer}
        </motion.p>
      </motion.div>
    </section>
  );
};
