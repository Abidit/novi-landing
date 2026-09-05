This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Responsive & accessibility audit notes

A mobile-first pass was run across the whole page at 375px, 640px, 768px, 1024px, and 1280px (Chromium via Playwright, plus manual keyboard/reduced-motion checks) before finalizing. Findings below.

**Fixed**

- **Horizontal scroll at 375px**: `HeroGraphic`'s decorative blurred blob (`-inset-8`) bled 8px past the viewport on both edges once the section's own `px-6` padding was accounted for — the earlier fix only addressed the floating chips, not the background blob. Added `overflow-x-clip` to the Hero section, plus `overflow-x: clip` on `html` as a project-wide backstop. Verified 0px overflow at all five widths afterward.
- **Tap targets under 44px on mobile**: navbar hamburger (36→44px), the shared `Button` component (added a `min-h-11` floor so both CTA sizes clear 44px without changing the type scale), footer social icons (36→44px), the newsletter email input and submit button (42→44px), and the footer bottom-bar Privacy/Terms links (given `py-3 -my-3` so the hit area grows without changing their visual position or the row's height). Footer's four link-group columns (Product/Company/Resources/Legal) were intentionally left at their current density — they weren't named in the audit scope and padding them to 44px would have roughly doubled the footer's height for a non-primary nav.
- **Sub-14px text on mobile**: `FeatureShowcase` card descriptions (12→14px), the footer bottom bar's copyright and Privacy/Terms text (12→14px), and the CTA band's disclaimer line (12→14px). Left the intentionally tiny (11–12px) labels inside the `Demos/*` mockups alone — those are chrome inside a miniature "screenshot of a product UI," not primary page copy, and bumping them to 14px broke the mockup's proportions and caused label wrapping inside the ~85px-wide board columns at 375px.
- **Font not actually applying**: `globals.css` hardcoded `font-family: Arial, Helvetica, sans-serif` on `body`, silently overriding the Manrope variable font wired up in `layout.tsx`. Fixed to reference `var(--font-manrope)` first.
- **Section rhythm drift**: the CTA band used `py-16 sm:py-20` while `HowItWorks` and `FeatureShowcase` both use `py-20 sm:py-24` for the same visual weight. Normalized the CTA band to match. Horizontal page padding (`px-6 lg:px-8`) was already consistent across every section.
- **Sticky navbar covering anchor targets**: `#how-it-works` and `#features` had no scroll offset, so anchor-jumping (from the Hero CTA or the navbar links) landed their headings partially behind the 69px sticky navbar. Added `scroll-mt-20` to both section roots; anchor scrolls now land ~11px clear of the navbar.
- **Reduced motion was only partially handled**: `HowItWorks`'s scroll-linked line fill and `FeatureShowcase`'s auto-cycle already had manual `prefers-reduced-motion` checks, but Hero's entrance stagger and `HeroGraphic`'s infinite floating-chip loops did not. Wrapped the app in Framer Motion's `<MotionConfig reducedMotion="user">` (in `layout.tsx`) so every `animate`/`whileInView`/`layoutId` transition project-wide degrades to its end state automatically, without scattering manual checks through every component. Also switched `FeatureShowcase`'s one-shot `matchMedia` check over to the same `usePrefersReducedMotion` hook `HowItWorks` already used, so there's one shared, reactive source of truth instead of two different detection strategies.
- **Navbar completeness**: added `aria-expanded`/`aria-controls` to the mobile menu toggle (was missing entirely), gave the mobile panel an `id` to match, and fixed the mobile "Try for FREE" button not closing the menu on click — plus a small `Button` component bug where `onClick` was silently dropped whenever `href` was also passed (the `Link` branch never forwarded it).
- **Dead code**: removed `featuresSection.tsx` and `FeatureCard.tsx` (superseded by `FeatureShowcase`, already commented out in `page.tsx`), the resulting unused import in `page.tsx`, and an unused `use` import in `FontComparison.tsx`. `yarn lint` and `yarn build` are both clean with zero warnings.

**Verified working, no change needed**

- `HowItWorks`'s `useScroll`/`useTransform` line-fill and per-step activation are purely scroll-_position_-driven (not time-based), so fast-flick mobile scrolling doesn't skip or mis-time the fill — confirmed this holds regardless of scroll speed.
- `FeatureShowcase` tabs are native `<button>` elements, so Tab focus + Enter/Space activation, and `aria-selected` updates, already worked correctly without changes; manual tab clicks cleanly reset the auto-cycle timer and progress bar with no visual glitch.
- Anchor IDs (`#how-it-works`, `#features`) were already on the actual `<section>` roots, not wrapper divs.
- The newsletter checkmark micro-interaction and its 2.2s reset work correctly.

**Known limitations / trade-offs**

- The navbar's "Pricing" link and several footer link-group items (`href="#"`) don't point at real sections — there's no pricing page in this build, so they're inert placeholders by design, not a bug.
- Footer link-group tap targets (as opposed to the social icons and bottom-bar links) remain under 44px tall on mobile; expanding them was out of this pass's named scope and would have visibly changed the footer's proportions.
- The floating "N" badge visible in some screenshots during this audit is Next.js's own dev-mode indicator (confirmed absent from a production `next build && next start`), not part of the page.
