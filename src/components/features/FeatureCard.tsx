'use client';

import { motion } from 'framer-motion';
import type { Feature } from '@/lib/content';

export const FeatureCard = ({ icon: Icon, title, description }: Feature) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="group rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:p-7"
    >
      <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-transform duration-300 group-hover:-rotate-6 group-hover:bg-indigo-600 group-hover:text-white">
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>
      <h3 className="mb-2 text-base font-semibold text-neutral-900 sm:text-lg">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-neutral-500 sm:text-[15px]">
        {description}
      </p>
    </motion.div>
  );
};
