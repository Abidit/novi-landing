export const colorTokens = {
  primary: [
    { name: '50', value: 'bg-indigo-50' },
    { name: '100', value: 'bg-indigo-100' },
    { name: '300', value: 'bg-indigo-300' },
    { name: '500', value: 'bg-indigo-500' },
    { name: '600', value: 'bg-indigo-600' },
    { name: '700', value: 'bg-indigo-700' },
    { name: '900', value: 'bg-indigo-900' },
  ],
  accent: [
    { name: 'accent-400', value: 'bg-amber-400' },
    { name: 'accent-500', value: 'bg-amber-500' },
  ],
  neutral: [
    { name: 'white', value: 'bg-white border border-neutral-200' },
    { name: 'neutral-100', value: 'bg-neutral-100' },
    { name: 'neutral-400', value: 'bg-neutral-400' },
    { name: 'neutral-700', value: 'bg-neutral-700' },
    { name: 'neutral-900', value: 'bg-neutral-900' },
  ],
} as const;

export const typographyTokens = [
  { label: 'Display / 48px / Bold', className: 'text-5xl font-bold' },
  { label: 'H1 / 36px / Bold', className: 'text-4xl font-bold' },
  { label: 'H2 / 30px / Semibold', className: 'text-3xl font-semibold' },
  { label: 'H3 / 24px / Semibold', className: 'text-2xl font-semibold' },
  { label: 'Body Large / 18px / Regular', className: 'text-lg font-normal' },
  { label: 'Body / 16px / Regular', className: 'text-base font-normal' },
  { label: 'Caption / 14px / Medium', className: 'text-sm font-medium' },
] as const;

export const spacingTokens = [
  { name: 'space-1', px: 4 },
  { name: 'space-2', px: 8 },
  { name: 'space-3', px: 12 },
  { name: 'space-4', px: 16 },
  { name: 'space-6', px: 24 },
  { name: 'space-8', px: 32 },
  { name: 'space-12', px: 48 },
  { name: 'space-16', px: 64 },
] as const;

export const radiusTokens = [
  { name: 'sm', className: 'rounded-sm' },
  { name: 'md', className: 'rounded-md' },
  { name: 'lg', className: 'rounded-lg' },
  { name: 'xl', className: 'rounded-xl' },
  { name: 'full', className: 'rounded-full' },
] as const;

export const shadowTokens = [
  { name: 'sm', className: 'shadow-sm' },
  { name: 'md', className: 'shadow-md' },
  { name: 'lg', className: 'shadow-lg' },
  { name: 'xl', className: 'shadow-xl' },
] as const;
