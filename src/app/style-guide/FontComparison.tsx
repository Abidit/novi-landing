'use client';

import { useState } from 'react';
import { fontOptions } from '@/lib/design-tokens';

const FontComparison = () => {
  const [active, setActive] = useState(fontOptions[0].variable);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {fontOptions.map((f) => (
          <button
            key={f.name}
            onClick={() => setActive(f.variable)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              active === f.variable
                ? 'border-indigo-600 bg-indigo-600 text-white'
                : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>

      <div
        style={{ fontFamily: active }}
        className="rounded-2xl border border-neutral-100 p-8"
      >
        <p className="mb-2 text-4xl font-bold text-neutral-900">
          Run your team without the tab switching.
        </p>
        <p className="mb-6 text-lg text-neutral-500">
          Novi brings tasks, docs, and conversations into one calm workspace built for
          small, fast moving teams.
        </p>
        <p className="text-sm text-neutral-400">
          {fontOptions.find((f) => f.variable === active)?.vibe}
        </p>
      </div>
    </div>
  );
};

export default FontComparison;
