'use client';

import { motion } from 'framer-motion';
import { FiCheck, FiMessageCircle } from 'react-icons/fi';

export const HeroGraphic = () => {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      {/* Base card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-xl sm:p-6"
      >
        <div className="mb-4 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="space-y-3">
          {['Design landing page', 'Review Q3 roadmap', 'Ship onboarding flow'].map(
            (task, i) => (
              <div
                key={task}
                className="flex items-center gap-3 rounded-lg bg-neutral-50 px-3 py-2.5"
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full ${
                    i === 0 ? 'bg-indigo-600' : 'border border-neutral-300'
                  }`}
                >
                  {i === 0 && <FiCheck className="h-3 w-3 text-white" />}
                </span>
                <span className="text-sm text-neutral-700">{task}</span>
              </div>
            ),
          )}
        </div>
      </motion.div>

      {/* Floating "completed" toast */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -10 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: [0, -6, 0] }}
        transition={{
          opacity: { duration: 0.5, delay: 1 },
          scale: { duration: 0.5, delay: 1 },
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
        }}
        className="absolute top-6 -left-6 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-lg sm:-left-10"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <FiCheck className="h-3.5 w-3.5" />
        </span>
        <span className="text-xs font-medium text-neutral-700">Task completed</span>
      </motion.div>

      {/* Floating avatar/comment chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 10 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: [0, 6, 0] }}
        transition={{
          opacity: { duration: 0.5, delay: 1.2 },
          scale: { duration: 0.5, delay: 1.2 },
          y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.7 },
        }}
        className="absolute -right-4 bottom-10 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-lg sm:-right-8"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
          <FiMessageCircle className="h-3.5 w-3.5" />
        </span>
        <span className="text-xs font-medium text-neutral-700">2 new replies</span>
      </motion.div>

      {/* Background blob */}
      <div className="absolute -inset-8 -z-10 rounded-full bg-indigo-100/50 blur-3xl" />
    </div>
  );
};
