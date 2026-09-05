'use client';

import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const sources = ['Trello', 'Asana', 'Sheets'];

export const ImportDemo = () => {
  return (
    <div className="flex items-center justify-center gap-4 rounded-lg bg-neutral-50 p-6">
      <div className="flex flex-col gap-2">
        {sources.map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            className="rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-500 shadow-sm"
          >
            {s}
          </motion.div>
        ))}
      </div>
      <FiArrowRight className="h-4 w-4 shrink-0 text-neutral-300" />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white"
      >
        N
      </motion.div>
    </div>
  );
};
