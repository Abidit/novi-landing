# Novi — Landing Page

A responsive landing page for **Novi**, a project and task management tool for small, fast-moving teams. Built as a frontend/design assessment.

**Live preview:** [[LIVE](https://novi-landing-five.vercel.app/)]

**Repository:** [[GITHUB](https://github.com/Abidit/novi-landing/)]

---

## Running the project locally

```bash
git clone <your-repo-url>
cd novi-landing
yarn install
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
yarn build   # production build
yarn lint    # ESLint check
yarn start   # run the production build locally
```

The project uses Husky + lint-staged, so `eslint --fix` and `prettier --write` run automatically on every commit — no manual formatting step needed.

**Requirements:** Node 18+, Yarn.

---

## Tech stack

- **Next.js (App Router)** + **TypeScript**
- **Tailwind CSS** for styling
- **Framer Motion** for animation and scroll-linked interactions
- **Plus Jakarta Sans**, self-hosted via `next/font/local` (no external Google Fonts request at build or runtime)
- **ESLint + Prettier + Husky + lint-staged** for enforced code quality on commit

No backend, CMS, or state management library — the brief didn't call for one, and adding one would have been unnecessary weight for a single static page.

---

## Design decisions

**Visual direction.** The brief asked for something that "feels like a modern tool a small team would trust" — I aimed for calm and understated rather than loud, since the target users (startups, agencies, small product/design teams) are closer to Linear or Notion's audience than a consumer app's. That shaped most of what follows: a single indigo accent color, generous whitespace, and restraint over decoration.

**Typography.** I tested several candidates (Inter, Geist, Manrope, DM Sans, Plus Jakarta Sans) side-by-side in a small comparison tool before deciding, rather than picking from a font list. Plus Jakarta Sans won on balancing "business-credible" and "approachable" better than the alternatives — Inter felt too generic/default, Manrope slightly too soft at headline weight. It's self-hosted rather than loaded from Google Fonts so the build has no external font dependency.

**Section backgrounds.** Rather than a flat white page throughout, sections alternate between white and a soft indigo tint, which gives visual separation between sections without needing hard divider lines. The Hero additionally has a faint dot-grid texture with one soft off-center glow — deliberately restricted to the Hero only, so it reads as a considered accent rather than a repeated decoration.

**Footer wordmark.** The footer closes with an oversized "Novi" wordmark rendered in a shade barely lighter than the footer's own background — a quiet closing brand moment rather than a loud one, consistent with the calm direction. It's marked `aria-hidden`, since it's decorative and the brand name is already announced properly earlier in the footer.

---

## Interaction and animation decisions

**Hero.** Headline/subhead/CTAs stagger in on load. The supporting graphic is a small mock product UI (not a stock photo) with two floating status chips that gently loop — meant to actually suggest the product rather than illustrate it abstractly.

**"How it works" section** (not in the original brief — added as one of the ways I went beyond the core requirements). A three-step workflow (Capture → Discuss → Ship) with a connecting line that fills in sync with scroll position, using Framer Motion's `useScroll`/`useTransform`. This is scroll-_driven_, not time-based — the animation is a direct function of where the user actually is on the page.

**Features section.** This went through the most iteration. The final version:

- **Desktop:** a sticky demo panel pinned in the viewport while feature descriptions scroll past on the left; each feature becomes "active" as it crosses the vertical center of the screen, and the panel cross-fades between four small live demos (a kanban card sliding between columns, a chat thread resolving from typing to sent, a timeline sweeping through milestones, and external tools consolidating into Novi).
- **Mobile:** intentionally a _different_, simpler implementation — a serial stack of feature-text-then-its-demo, with no sticky positioning or scroll-linked state. Scroll-pinned layouts are meaningfully less reliable on mobile browsers (viewport height changes as address bars collapse, sticky positioning behaves inconsistently), so rather than forcing one mechanism to work everywhere, mobile gets its own straightforward version.

**Reduced motion.** Every scroll-linked or auto-advancing animation on the site (the How-it-works fill, the Features scroll-swap, autoplay progress indicators) checks `prefers-reduced-motion` and falls back to a fully visible static state — not just a slower animation, but genuinely no motion for users who've asked for that.

---

## Accessibility

Targeted WCAG 2.2 AA throughout, specifically:

- Text/background color pairs checked against 4.5:1 (normal text) / 3:1 (large text) contrast ratios
- Visible `focus-visible` rings on every interactive element, checked against both light and dark backgrounds (the footer's dark background needed a different ring treatment than the rest of the light page)
- Full keyboard navigation, including a real focus trap in the mobile menu (focus can't escape to the page behind it while open, and returns to the hamburger button on close)
- The newsletter signup's submission feedback is announced via `aria-live`, not just shown as a visual icon swap
- Tap targets meet WCAG 2.2 AA (SC 2.5.8 — 24×24 CSS px minimum, with adequate spacing); primary controls (nav, mobile menu, social links) are a full 44×44
- Focus indicators also survive Windows High Contrast / forced-colors mode, where `box-shadow`-based rings are dropped

A late dedicated pass re-verified all of the above and computed every text/background pair against the _compiled_ Tailwind v4 color values (the v4 palette differs materially from v3 — e.g. `indigo-500` is `#625fff`, not `#6366f1`). Contrast: all checked pairs pass. See **Known trade-offs** for what that pass could not verify.

---

## Known trade-offs

**Product scope**

- No real authentication — "Sign in" and the CTA buttons are placeholder links, as the brief didn't call for a working account system.
- No CMS or backend — content lives in a single typed `content.ts`, appropriate for one static page. The command-center feature section still has some demo copy hardcoded in the component; it should move into `content.ts` too.
- Every in-section demo is illustrative and claim-free — no real metrics, customer names, or ratings.

**Design system vs. the brief**

- The feature-section brief specified a `slate` / `purple` / dark-mode treatment. Novi's actual system is `neutral` / `indigo-600` (the same `#4F46E5` the brief quoted) and light-only, so I built to the real system and dropped the `dark:` variants — this Tailwind v4 setup defines no dark variant, so they would have been inert.
- "Glass / elevated" cards became plain white + border + a soft indigo-tinted shadow. A translucent blur over an all-white page produces no visible glass.

**Command-center feature section**

- The desktop stage panel uses a fixed height tuned to the current demo content; a demo that outgrew it would scroll rather than clip.
- Demos render on both breakpoints via CSS `hidden` (four mobile instances + one desktop instance mounted at once, a few with looping CSS animations running offscreen). Consistent with the rest of the site's mobile/desktop split, but a media-query-gated render would be leaner.
- The auto-advancing tabs pause on hover/focus and stop permanently once a tab is chosen (WCAG 2.2.2). Practical effect: a mouse user reading the page usually stops seeing rotation after roughly one cycle. There is no visible pause/play button — that would be an added control.
- A parked "Tier 2" bento grid remains in the component behind `display:none`: no accessibility impact (removed from the tree and tab order), but dead bundle weight. It should be finished or deleted.

**Accessibility pass**

- The final pass was verified by code review plus a hand-rolled WCAG contrast script against the compiled Tailwind values — **not** by a real browser tab-through, a screen reader (VoiceOver/NVDA), or a DevTools Performance capture; no browser tooling was available in that session. Automated `axe`/Lighthouse in CI and real AT testing are the clear next step.
- `yarn lint` reports two warnings, both in `Demos/BoardsDemo.tsx` — part of the earlier `FeatureShowcase` implementation that the command-center section replaced on the page. That tree is no longer rendered and should be removed rather than carried; it was left untouched to keep the pass scoped to live code.
- The newsletter input's **resting** border is below 3:1 non-text contrast. Its focus and error states are compliant and the field is identifiable by fill, placeholder, label, and form context, so this is left as a documented borderline rather than forcing a heavier border.
- Several of the quietest demo labels were darkened one step (`neutral-400` → `500`/`600`, `emerald-600` → `700`) to clear 4.5:1 — the lowest tier of the visual hierarchy is now marginally louder than originally drawn.

---

## Notes on process

This was built iteratively — background/design direction, footer, hero, features, and copy were each explored with a few visual options before committing, rather than implementing a first idea straight through. A few things I'd do differently with more time:

- **Semantic color tokens.** Secondary/muted text, focus-ring offsets, and feedback colors are still raw Tailwind classes (`text-neutral-500`, `ring-offset-indigo-50`, `text-red-700`) applied per component. Promoting them to named tokens in `design-tokens.ts` would make the next contrast check a config change instead of a file-by-file audit.
- **Automated accessibility in CI** — `@axe-core/playwright` or Lighthouse on every build, plus real screen-reader and physical-device touch passes, rather than static verification.
- **One reduced-motion mechanism.** It's currently spread across a global `MotionConfig`, a `usePrefersReducedMotion` hook, conditional Framer props, and Tailwind `motion-reduce:` — consolidating would make it easier to trust.
- **Remove the superseded Features implementation.** `FeatureShowcase` / `FeatureScrollDesktop` / `FeatureListMobile` / `Demos/*` are still in the repo after the command-center section replaced them on the page.
- **Finish or delete the parked bento grid** instead of leaving it behind `display:none`.
- **Move the command-center demo copy into `content.ts`** for consistency with every other section.
- **A visible pause/play control** for the auto-advancing tabs, rather than relying on hover/focus + stop-on-interaction.
- **Interaction tests** (Testing Library) for the three tablist keyboard models and the newsletter state machine.
- **Verify the 60fps target** with an actual DevTools / WebPageTest trace on a mid-tier device.

> Note: the **Interaction and animation decisions** section above still describes the earlier sticky-panel Features implementation. The live page now uses the command-center section (four-tab stage with a feature-beside-demo layout, an auto-advancing progress indicator, and a linear stack on mobile); that prose is due a refresh.
