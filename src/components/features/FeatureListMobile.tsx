'use client';

import { motion } from 'framer-motion';
import { features } from '@/lib/content';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';
import { BoardsDemo } from './Demos/BoardsDemo';
import { ThreadsDemo } from './Demos/ThreadsDemo';
import { TimelineDemo } from './Demos/TimelineDemo';
import { ImportDemo } from './Demos/ImportDemo';

const demos = [BoardsDemo, ThreadsDemo, TimelineDemo, ImportDemo];

export const FeatureListMobile = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="flex flex-col gap-12">
      {features.map((feature, i) => {
        const Demo = demos[i];
        const content = (
          <>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <feature.icon className="h-4 w-4" strokeWidth={2} />
              </span>
              <div>
                <p className="text-base font-semibold text-neutral-900 sm:text-lg">
                  {feature.title}
                </p>
                <p className="mt-1 text-sm text-neutral-500">{feature.description}</p>
              </div>
            </div>

            <div className="flex min-h-[140px] items-center justify-center rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
              <div className="w-full">
                <Demo />
              </div>
            </div>
          </>
        );

        if (prefersReducedMotion) {
          return (
            <div key={feature.title} className="flex flex-col gap-5">
              {content}
            </div>
          );
        }

        return (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col gap-5"
          >
            {content}
          </motion.div>
        );
      })}
    </div>
  );
};
