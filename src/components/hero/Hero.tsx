'use client';

import { motion, type Variants } from 'framer-motion';
import { heroContent } from '@/lib/content';
import { Button } from '@/components/ui/Button';
import { HeroGraphic } from './HeroGraphic';

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-14 pb-16 sm:pt-20 sm:pb-24 lg:px-8 lg:pt-24">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          <motion.h1
            variants={item}
            className="text-3xl leading-tight font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl"
          >
            {heroContent.headline}
          </motion.h1>
          <motion.p
            variants={item}
            className="mx-auto mt-5 max-w-md text-base text-neutral-500 sm:text-lg lg:mx-0"
          >
            {heroContent.subheading}
          </motion.p>
          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Button href="#" size="md">
              {heroContent.primaryCta}
            </Button>
            <Button href="#how-it-works" variant="secondary" size="md">
              {heroContent.secondaryCta}
            </Button>
          </motion.div>
        </motion.div>

        <div>
          <HeroGraphic />
        </div>
      </div>
    </section>
  );
}
