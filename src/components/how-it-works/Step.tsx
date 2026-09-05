'use client';

import { useRef, useState } from 'react';
import { type MotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
import type { HowItWorksStep } from '@/lib/content';

interface StepProps {
  step: HowItWorksStep;
  threshold: number;
  scrollYProgress: MotionValue<number>;
  forceActive: boolean;
  isCurrent: boolean;
}

export const Step = ({
  step,
  threshold,
  scrollYProgress,
  forceActive,
  isCurrent,
}: StepProps) => {
  const stepProgress = useTransform(
    scrollYProgress,
    [threshold, threshold + 0.001],
    [0, 1],
  );
  const [isPastThreshold, setIsPastThreshold] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(stepProgress, 'change', (latest) => {
    setIsPastThreshold(latest > 0.5);
  });

  const isActive = forceActive || isPastThreshold;

  // The activation state is entirely scroll-driven (see HowItWorks' useScroll),
  // so a click/Enter doesn't set state directly — it scrolls this step to the
  // same viewport-center reference point the scroll-link measures against,
  // and the existing scroll listener takes it from there. That keeps scroll
  // position as the single source of truth instead of a second one to
  // desync, while still making the sequence keyboard- and click-operable.
  const handleActivate = () => {
    buttonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleActivate}
      aria-current={isCurrent ? 'step' : undefined}
      className="relative flex w-full gap-5 rounded-lg pb-10 text-left last:pb-0 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <span
        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
          isActive ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'
        }`}
      >
        <step.icon className="h-4 w-4" strokeWidth={2} />
      </span>
      <div className="pt-1.5">
        <p
          className={`text-base font-semibold transition-colors duration-300 sm:text-lg ${
            isActive ? 'text-neutral-900' : 'text-neutral-600'
          }`}
        >
          {step.title}
        </p>
        <p
          className={`mt-1 text-sm transition-colors duration-300 sm:text-base ${
            isActive ? 'text-neutral-900' : 'text-neutral-600'
          }`}
        >
          {step.description}
        </p>
      </div>
    </button>
  );
};
