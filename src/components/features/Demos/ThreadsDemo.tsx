'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ThreadsDemo = () => {
  const [phase, setPhase] = useState<'typing' | 'sent'>('typing');

  useEffect(() => {
    const id = setTimeout(
      () => setPhase((p) => (p === 'typing' ? 'sent' : 'typing')),
      phase === 'typing' ? 1200 : 2200,
    );
    return () => clearTimeout(id);
  }, [phase]);

  return (
    <div className="flex flex-col gap-2 rounded-lg bg-neutral-50 p-4">
      <div className="max-w-[75%] rounded-lg rounded-bl-none border border-neutral-100 bg-white px-3 py-2 text-xs text-neutral-600 shadow-sm">
        Can we push the launch banner live today?
      </div>
      <div className="flex justify-end">
        <AnimatePresence mode="wait">
          {phase === 'typing' ? (
            <motion.div
              key="typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1 rounded-lg rounded-br-none bg-indigo-100 px-3 py-2.5"
            >
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }}
                  className="h-1.5 w-1.5 rounded-full bg-indigo-400"
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-[75%] rounded-lg rounded-br-none bg-indigo-600 px-3 py-2 text-xs text-white shadow-sm"
            >
              Yep, shipping now.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
