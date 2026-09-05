'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const milestones = [
  { label: 'Design', pos: 10 },
  { label: 'Build', pos: 45 },
  { label: 'Launch', pos: 85 },
];

const FILL_DURATION_S = 2.4;

export const TimelineDemo = () => {
  const [progress, setProgress] = useState(0);
  const [shipped, setShipped] = useState(false);

  useEffect(() => {
    const fillId = setTimeout(() => setProgress(100), 200);
    const shipId = setTimeout(() => setShipped(true), 200 + FILL_DURATION_S * 1000);
    return () => {
      clearTimeout(fillId);
      clearTimeout(shipId);
    };
  }, []);

  return (
    <div className="rounded-lg bg-neutral-50 p-6">
      <div className="relative h-1.5 rounded-full bg-neutral-200">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: FILL_DURATION_S, ease: 'easeInOut' }}
          className="absolute top-0 left-0 h-full rounded-full bg-indigo-600"
        />
        {milestones.map((m) => (
          <div
            key={m.label}
            style={{ left: `${m.pos}%` }}
            className="absolute -top-1.5 flex -translate-x-1/2 flex-col items-center"
          >
            <span className="h-4 w-4 rounded-full border-2 border-white bg-indigo-500 shadow-sm" />
            <span className="mt-2 text-[11px] font-medium text-neutral-500">
              {m.label}
            </span>
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={shipped ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.3 }}
        className="mt-7 flex items-center justify-end gap-1.5 text-[11px] font-medium text-emerald-600"
      >
        <FiCheck className="h-3 w-3" aria-hidden />
        Shipped on time
      </motion.div>
    </div>
  );
};
