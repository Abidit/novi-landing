'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { howItWorksContent } from '@/lib/content';
import { surfaceTint } from '@/lib/design-tokens';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';
import { Step } from './Step';

const { heading, subheading, steps } = howItWorksContent;

export const HowItWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  // Each Step's own `isActive` is cumulative (once reached, it stays
  // highlighted — that's the intended checklist feel of the fill line), so
  // multiple steps can be "active" at once. `aria-current="step"` must mark
  // exactly one, so track "current" separately here, the same way
  // FeatureScrollDesktop tracks a single activeIndex from scroll position.
  const [currentIndex, setCurrentIndex] = useState(0);
  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, steps.length - 1]);
  useMotionValueEvent(rawIndex, 'change', (latest) => {
    setCurrentIndex(Math.min(steps.length - 1, Math.max(0, Math.round(latest))));
  });

  return (
    <section id="how-it-works" className={`scroll-mt-28 md:scroll-mt-20 ${surfaceTint}`}>
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl lg:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-base text-neutral-600 sm:text-lg">{subheading}</p>
        </div>

        <div ref={containerRef} className="relative mx-auto max-w-xl">
          <div
            aria-hidden="true"
            className="absolute top-1 bottom-1 left-5 w-px bg-neutral-200"
          />
          {prefersReducedMotion ? (
            <div
              aria-hidden="true"
              className="absolute top-1 bottom-1 left-5 w-px bg-indigo-600"
            />
          ) : (
            <motion.div
              aria-hidden="true"
              style={{ scaleY: scrollYProgress }}
              className="absolute top-1 bottom-1 left-5 w-px origin-top bg-indigo-600"
            />
          )}

          <div className="flex flex-col">
            {steps.map((step, i) => (
              <Step
                key={step.title}
                step={step}
                threshold={i / steps.length}
                scrollYProgress={scrollYProgress}
                forceActive={prefersReducedMotion}
                isCurrent={
                  prefersReducedMotion ? i === steps.length - 1 : i === currentIndex
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
