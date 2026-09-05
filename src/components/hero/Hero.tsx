'use client';

import { motion, type Variants } from 'framer-motion';
import { FiArrowRight, FiPlayCircle } from 'react-icons/fi';
import { heroContent } from '@/lib/content';
import { Button } from '@/components/ui/Button';
import { heroBackgroundTokens } from '@/lib/design-tokens';
import { HeroGraphic } from './HeroGraphic';

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const Hero = () => {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative mx-auto max-w-6xl overflow-x-clip px-6 pt-14 pb-16 sm:pt-20 sm:pb-24 lg:px-8 lg:pt-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: heroBackgroundTokens.dotGrid.backgroundImage,
            backgroundSize: heroBackgroundTokens.dotGrid.backgroundSize,
            maskImage: heroBackgroundTokens.dotGrid.maskImage,
            WebkitMaskImage: heroBackgroundTokens.dotGrid.maskImage,
          }}
        />
        <div
          className={`absolute top-0 right-0 h-44 w-44 rounded-full blur-3xl sm:top-6 sm:right-12 ${heroBackgroundTokens.glow}`}
        />
      </div>

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-center lg:col-span-7 lg:text-left"
        >
          <motion.h1
            id="hero-heading"
            variants={item}
            className="text-4xl leading-tight font-bold tracking-tight text-balance text-neutral-900 sm:text-5xl lg:text-6xl"
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
              <FiArrowRight aria-hidden className="size-4 shrink-0" />
            </Button>
            <Button href="#how-it-works" variant="secondary" size="md">
              <FiPlayCircle aria-hidden className="size-4 shrink-0" />
              {heroContent.secondaryCta}
            </Button>
          </motion.div>
        </motion.div>

        <div className="lg:col-span-5">
          <HeroGraphic />
        </div>
      </div>
    </section>
  );
};
