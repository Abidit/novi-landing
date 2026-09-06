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
- 44×44px minimum tap targets on all mobile interactive elements

---

## Known trade-offs

- No real authentication — "Sign in" is a placeholder link, as the brief didn't call for a working account system
- No CMS or backend — content lives in a single typed `content.ts` file, appropriate for a single static page
-

---

## Notes on process

This was built iteratively — background/design direction, footer, hero, features, and copy were each explored with a few visual options before committing, rather than implementing a first idea straight through. A few things I'd do differently with more time:
