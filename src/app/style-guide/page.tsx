import type { Metadata } from 'next';
import { TokenSection } from '@/components/style-guide/TokenSection';
import {
  colorTokens,
  radiusTokens,
  shadowTokens,
  spacingTokens,
  typographyTokens,
} from '@/lib/design-tokens';
import FontComparison from './FontComparison';

export const metadata: Metadata = {
  title: 'Design system',
  robots: {
    index: false,
    follow: false,
  },
};

const StyleGuidePage = () => {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-2 text-3xl font-bold">Novi Design System</h1>
      <p className="mb-12 text-neutral-500">
        Colors, type, spacing, and primitives used across the landing page.
      </p>

      <TokenSection title="Colors">
        {Object.entries(colorTokens).map(([group, shades]) => (
          <div key={group} className="mb-6">
            <p className="mb-2 text-sm font-medium text-neutral-500 capitalize">
              {group}
            </p>
            <div className="flex flex-wrap gap-3">
              {shades.map((s) => (
                <div key={s.name} className="flex flex-col items-center gap-1">
                  <div className={`h-14 w-14 rounded-lg ${s.value}`} />
                  <span className="text-xs text-neutral-500">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </TokenSection>

      <TokenSection title="Typography">
        <div className="flex flex-col gap-4">
          {typographyTokens.map((t) => (
            <div key={t.label} className="border-b border-neutral-100 pb-4">
              <p className={t.className}>Run your team without the tab switching</p>
              <span className="text-xs text-neutral-400">{t.label}</span>
            </div>
          ))}
        </div>
      </TokenSection>

      <TokenSection title="Spacing">
        <div className="flex flex-col gap-3">
          {spacingTokens.map((s) => (
            <div key={s.name} className="flex items-center gap-4">
              <span className="w-20 text-xs text-neutral-500">{s.name}</span>
              <div className="h-4 bg-indigo-500" style={{ width: s.px }} />
              <span className="text-xs text-neutral-400">{s.px}px</span>
            </div>
          ))}
        </div>
      </TokenSection>

      <TokenSection title="Radius">
        <div className="flex gap-4">
          {radiusTokens.map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-1">
              <div className={`h-14 w-14 bg-indigo-500 ${r.className}`} />
              <span className="text-xs text-neutral-500">{r.name}</span>
            </div>
          ))}
        </div>
      </TokenSection>

      <TokenSection title="Shadows">
        <div className="flex gap-6">
          {shadowTokens.map((s) => (
            <div key={s.name} className="flex flex-col items-center gap-2">
              <div className={`h-14 w-14 rounded-lg bg-white ${s.className}`} />
              <span className="text-xs text-neutral-500">{s.name}</span>
            </div>
          ))}
        </div>
      </TokenSection>

      <TokenSection title="Font comparison">
        <FontComparison />
      </TokenSection>
    </main>
  );
};

export default StyleGuidePage;
