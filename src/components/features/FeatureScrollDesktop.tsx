'use client';

import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import { features } from '@/lib/content';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';
import { BoardsDemo } from './Demos/BoardsDemo';
import { ThreadsDemo } from './Demos/ThreadsDemo';
import { TimelineDemo } from './Demos/TimelineDemo';
import { ImportDemo } from './Demos/ImportDemo';

const demos = [BoardsDemo, ThreadsDemo, TimelineDemo, ImportDemo];

export const FeatureScrollDesktop = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  // Each block occupies an equal slice of the container, so scroll progress
  // maps onto block index as (i + 0.5) / N at the moment block i's center
  // crosses the viewport center — inverting that gives index = p*N - 0.5.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });
  const rawIndex = useTransform(scrollYProgress, [0, 1], [-0.5, features.length - 0.5]);

  useMotionValueEvent(rawIndex, 'change', (latest) => {
    setActiveIndex(Math.min(features.length - 1, Math.max(0, Math.round(latest))));
  });

  const ActiveDemo = demos[prefersReducedMotion ? 0 : activeIndex];

  return (
    <div ref={containerRef} className="grid grid-cols-2 gap-16">
      <div className="flex flex-col">
        {features.map((feature, i) => {
          const isActive = prefersReducedMotion || i === activeIndex;
          return (
            <div
              key={feature.title}
              className={`flex min-h-[85vh] flex-col justify-center gap-3 border-l-2 pl-6 transition-colors duration-300 ${
                isActive ? 'border-indigo-600' : 'border-neutral-200'
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-300 ${
                  isActive ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600'
                }`}
              >
                <feature.icon className="h-4 w-4" strokeWidth={2} />
              </span>
              <p
                className={`text-xl font-semibold transition-colors duration-300 ${
                  isActive ? 'text-neutral-900' : 'text-neutral-400'
                }`}
              >
                {feature.title}
              </p>
              <p
                className={`text-base transition-colors duration-300 ${
                  isActive ? 'text-neutral-500' : 'text-neutral-400'
                }`}
              >
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="sticky top-24 h-fit">
        <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-neutral-100 bg-white p-8 shadow-sm">
          <div className="w-full">
            {prefersReducedMotion ? (
              <ActiveDemo />
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <ActiveDemo />
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
