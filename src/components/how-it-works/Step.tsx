'use client';

import { useState } from 'react';
import { type MotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
import type { HowItWorksStep } from '@/lib/content';

interface StepProps {
  step: HowItWorksStep;
  threshold: number;
  scrollYProgress: MotionValue<number>;
  forceActive: boolean;
}

export const Step = ({ step, threshold, scrollYProgress, forceActive }: StepProps) => {
  const stepProgress = useTransform(
    scrollYProgress,
    [threshold, threshold + 0.001],
    [0, 1],
  );
  const [isPastThreshold, setIsPastThreshold] = useState(false);

  useMotionValueEvent(stepProgress, 'change', (latest) => {
    setIsPastThreshold(latest > 0.5);
  });

  const isActive = forceActive || isPastThreshold;

  return (
    <div className="relative flex gap-5 pb-10 last:pb-0">
      <span
        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
          isActive ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600'
        }`}
      >
        <step.icon className="h-4 w-4" strokeWidth={2} />
      </span>
      <div className="pt-1.5">
        <p
          className={`text-base font-semibold transition-colors duration-300 sm:text-lg ${
            isActive ? 'text-neutral-900' : 'text-neutral-400'
          }`}
        >
          {step.title}
        </p>
        <p
          className={`mt-1 text-sm transition-colors duration-300 sm:text-base ${
            isActive ? 'text-neutral-900' : 'text-neutral-400'
          }`}
        >
          {step.description}
        </p>
      </div>
    </div>
  );
};
