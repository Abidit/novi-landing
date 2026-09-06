'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCheck, FiMessageCircle } from 'react-icons/fi';
import { LuSparkles } from 'react-icons/lu';
import { heroPreviewTabs } from '@/lib/content';

const panelVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export const HeroGraphic = () => {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tab = heroPreviewTabs[active];

  const focusTab = (index: number) => {
    const next = (index + heroPreviewTabs.length) % heroPreviewTabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        focusTab(active + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        focusTab(active - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusTab(0);
        break;
      case 'End':
        event.preventDefault();
        focusTab(heroPreviewTabs.length - 1);
        break;
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-lg">
      {/* Entrance, then a slow ambient float (suppressed under reduced motion
          by the app-level MotionConfig). */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <motion.div
          animate={{ y: [-6, 6, -6] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-xl sm:p-6"
        >
          <div
            role="tablist"
            aria-label="Workspace preview"
            aria-orientation="horizontal"
            className="mb-4 flex gap-1 rounded-lg bg-neutral-100 p-1"
          >
            {heroPreviewTabs.map((t, i) => {
              const selected = i === active;
              return (
                <button
                  key={t.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`hero-tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls={`hero-panel-${t.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={handleTabKeyDown}
                  className={`flex min-w-0 flex-1 items-center justify-center gap-1 rounded-md px-1.5 py-2 text-[11px] font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none ${
                    selected
                      ? 'bg-white text-neutral-900 shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <t.icon aria-hidden className="size-3.5 shrink-0" />
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id}
              role="tabpanel"
              id={`hero-panel-${tab.id}`}
              aria-labelledby={`hero-tab-${tab.id}`}
              tabIndex={0}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="space-y-3 rounded-md focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
            >
              {tab.items.map((row) => (
                <div
                  key={row.text}
                  className="flex items-center gap-3 rounded-lg bg-neutral-50 px-3 py-2.5"
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      row.done ? 'bg-indigo-600' : 'border border-neutral-300'
                    }`}
                  >
                    {row.done && <FiCheck className="h-3 w-3 text-white" aria-hidden />}
                  </span>
                  <span className="text-sm text-neutral-700">{row.text}</span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Floating live-sync micro-badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -10 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: [0, -6, 0] }}
        transition={{
          opacity: { duration: 0.5, delay: 1 },
          scale: { duration: 0.5, delay: 1 },
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
        }}
        className="absolute -top-4 left-3 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-lg sm:-left-10"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <LuSparkles className="h-3.5 w-3.5" aria-hidden />
        </span>
        <span className="text-xs font-medium text-neutral-700">Task updated live</span>
      </motion.div>

      {/* Floating replies chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 10 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: [0, 6, 0] }}
        transition={{
          opacity: { duration: 0.5, delay: 1.2 },
          scale: { duration: 0.5, delay: 1.2 },
          y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.7 },
        }}
        className="absolute right-3 -bottom-4 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-lg sm:-right-8 sm:bottom-10"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
          <FiMessageCircle className="h-3.5 w-3.5" aria-hidden />
        </span>
        <span className="text-xs font-medium text-neutral-700">2 new replies</span>
      </motion.div>

      {/* Ambient backdrop glow */}
      <div className="absolute -inset-8 -z-10 rounded-full bg-gradient-to-tr from-indigo-200/50 to-indigo-100/40 blur-3xl" />
    </div>
  );
};
