'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const columns = ['To do', 'In progress', 'Done'];

export const BoardsDemo = () => {
  const [col, setCol] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCol((c) => (c + 1) % columns.length), 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      {columns.map((label, i) => (
        <div key={label} className="min-h-[92px] rounded-lg bg-neutral-50 p-2">
          <p className="mb-2 text-[11px] font-medium text-neutral-400">{label}</p>
          {col === i && (
            <motion.div
              layoutId="board-card"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="rounded-md border border-neutral-100 bg-white p-2 text-xs font-medium text-neutral-700 shadow-sm"
            >
              Ship auth flow
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};
