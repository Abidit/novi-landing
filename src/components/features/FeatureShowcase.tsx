'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { featureSectionContent, features } from '@/lib/content';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';
import { ImportDemo } from './Demos/ImportDemo';
import { TimelineDemo } from './Demos/TimelineDemo';
import { ThreadsDemo } from './Demos/ThreadsDemo';
import { BoardsDemo } from './Demos/BoardsDemo';

const demos = [BoardsDemo, ThreadsDemo, TimelineDemo, ImportDemo];
const CYCLE_MS = 5000;

export const FeatureShowcase = () => {
  const [active, setActive] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    timeoutRef.current = setTimeout(() => {
      setActive((a) => (a + 1) % features.length);
      setProgressKey((k) => k + 1);
    }, CYCLE_MS);

    return () => clearTimeout(timeoutRef.current);
  }, [active, prefersReducedMotion]);

  function handleSelect(i: number) {
    if (i === active) return;
    clearTimeout(timeoutRef.current);
    setActive(i);
    setProgressKey((k) => k + 1);
  }

  const ActiveDemo = demos[active];

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

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <div role="tablist" aria-label="Novi features" className="flex flex-col gap-2">
          {features.map((feature, i) => {
            const isActive = i === active;
            return (
              <button
                key={feature.title}
                role="tab"
                aria-selected={isActive}
                aria-controls="feature-panel"
                onClick={() => handleSelect(i)}
                className={`relative overflow-hidden rounded-xl border p-4 text-left shadow-sm transition-colors sm:p-5 ${
                  isActive
                    ? 'border-indigo-200 bg-indigo-50/60'
                    : 'border-neutral-200 bg-white hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'bg-indigo-50 text-indigo-600'
                    }`}
                  >
                    <feature.icon className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900 sm:text-base">
                      {feature.title}
                    </p>
                    <p className="mt-1 text-sm text-neutral-500">{feature.description}</p>
                  </div>
                </div>

                {isActive && (
                  <motion.div
                    key={progressKey}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: CYCLE_MS / 1000, ease: 'linear' }}
                    className="absolute bottom-0 left-0 h-0.5 bg-indigo-500"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div
          id="feature-panel"
          role="tabpanel"
          className="flex min-h-[220px] items-center justify-center rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <ActiveDemo />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
