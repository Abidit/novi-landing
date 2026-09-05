'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const columns = ['To do', 'In progress', 'Done'];

const cardHover =
  'transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md';

export const BoardsDemo = () => {
  const [col, setCol] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCol((c) => (c + 1) % columns.length), 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      {columns.map((label, i) => (
        <div key={label} className="min-h-[92px] space-y-2 rounded-lg bg-neutral-50 p-2">
          <p className="text-[11px] font-medium text-neutral-400">{label}</p>

          {i === 0 && (
            <div
              className={`rounded-md border border-neutral-100 bg-white p-2 shadow-sm ${cardHover}`}
            >
              <span className="mb-1.5 inline-block rounded-full bg-amber-50 px-1.5 py-0.5 text-[9px] font-medium text-amber-700">
                Design
              </span>
              <p className="text-xs font-medium text-neutral-700">Empty states</p>
            </div>
          )}

          {i === 2 && (
            <div
              className={`rounded-md border border-neutral-100 bg-white p-2 opacity-80 shadow-sm ${cardHover}`}
            >
              <span className="mb-1.5 flex items-center gap-1 text-[9px] font-medium text-emerald-600">
                <FiCheck className="h-2.5 w-2.5" aria-hidden />
                Done
              </span>
              <p className="text-xs font-medium text-neutral-400 line-through decoration-neutral-300">
                Fix login bug
              </p>
            </div>
          )}

          {1 === i && (
            <div
              className={`rounded-md border border-neutral-100 bg-white p-2 shadow-sm ${cardHover}`}
            >
              <span className="mb-1.5 inline-block rounded-full bg-indigo-50 px-1.5 py-0.5 text-[9px] font-medium text-indigo-600">
                Auth
              </span>
              <p className="text-xs font-medium text-neutral-700">Ship auth flow</p>
              <div className="mt-1.5 flex justify-end">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-[9px] font-semibold text-indigo-700">
                  JD
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
