'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
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
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
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

  // `activeIndex` is plain scroll-derived state, not an animation — reduced
  // motion shouldn't override which feature it points to (that previously
  // pinned the panel to demos[0] regardless of scroll position, and made
  // every tab render aria-selected="true" at once). Reduced motion should
  // only skip the AnimatePresence cross-fade below, which it already does.
  const ActiveDemo = demos[activeIndex];

  // Activation stays scroll-driven (the effect above is the only place
  // `activeIndex` is set) — clicking or arrowing to a tab scrolls it to the
  // same viewport-center reference point the scroll-link measures against,
  // and that listener updates `activeIndex` from there. One source of truth
  // instead of a click-state and a scroll-state fighting each other.
  const goTo = (i: number) => {
    const clamped = Math.min(features.length - 1, Math.max(0, i));
    const el = tabRefs.current[clamped];
    el?.focus();
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(i + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(i - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      goTo(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goTo(features.length - 1);
    }
  };

  return (
    <div ref={containerRef} className="grid grid-cols-2 gap-16">
      <div
        role="tablist"
        aria-label="Features"
        aria-orientation="vertical"
        className="flex flex-col"
      >
        {features.map((feature, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={feature.title}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`feature-tab-${i}`}
              aria-selected={isActive}
              aria-controls="feature-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => goTo(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={`flex min-h-[85vh] w-full flex-col justify-center gap-3 border-l-2 pl-6 text-left transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none ${
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
                  isActive ? 'text-neutral-900' : 'text-neutral-600'
                }`}
              >
                {feature.title}
              </p>
              <p
                className={`text-base transition-colors duration-300 ${
                  isActive ? 'text-neutral-500' : 'text-neutral-600'
                }`}
              >
                {feature.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="sticky top-24 h-fit">
        <div
          id="feature-panel"
          role="tabpanel"
          aria-labelledby={`feature-tab-${activeIndex}`}
          className="flex min-h-[220px] items-center justify-center rounded-2xl border border-neutral-100 bg-white p-8 shadow-sm"
        >
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
