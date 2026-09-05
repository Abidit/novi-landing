'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="how-it-works" className={`scroll-mt-28 md:scroll-mt-20 ${surfaceTint}`}>
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl lg:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-base text-neutral-500 sm:text-lg">{subheading}</p>
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
              style={{ height: lineHeight }}
              className="absolute top-1 left-5 w-px bg-indigo-600"
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
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
