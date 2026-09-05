'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const milestones = [
  { label: 'Design', pos: 10 },
  { label: 'Build', pos: 45 },
  { label: 'Launch', pos: 85 },
];

export const TimelineDemo = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => setProgress(100), 200);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="rounded-lg bg-neutral-50 p-6">
      <div className="relative h-1.5 rounded-full bg-neutral-200">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 2.4, ease: 'easeInOut' }}
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
    </div>
  );
};
