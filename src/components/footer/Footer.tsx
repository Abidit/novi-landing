'use client';

import { motion, type Variants } from 'framer-motion';
import { footerContent } from '@/lib/content';
import { CtaBand } from './CtaBand';

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Footer links sit on the dark bg-neutral-900 section, so their focus ring
// needs a matching dark offset — the default white ring-offset would show
// as a stray pale halo against it.
const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <CtaBand />
      <footer className="bg-neutral-900 text-neutral-300">
        <div className="mx-auto max-w-6xl px-6 pt-16 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-y-12 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-6"
          >
            {/* Brand */}
            <motion.div
              variants={item}
              className="sm:col-span-2 md:col-span-4 lg:col-span-1"
            >
              <span className="text-xl font-bold text-white">{footerContent.name}</span>
              <p className="mt-3 max-w-xs text-sm text-neutral-400">
                {footerContent.tagline}
              </p>
              <div className="mt-6 flex gap-4">
                {footerContent.socials.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex h-11 w-11 items-center justify-center rounded-full border border-neutral-700 text-neutral-400 transition-colors hover:border-indigo-500 hover:bg-neutral-800 hover:text-white ${focusRing}`}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Link groups */}
            <nav aria-label="Footer" className="contents">
              {footerContent.linkGroups.map((group) => (
                <motion.div key={group.heading} variants={item}>
                  <h3 className="text-sm font-semibold text-white">{group.heading}</h3>
                  <ul className="mt-4 space-y-3">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className={`inline-block rounded-sm text-sm text-neutral-400 transition duration-200 hover:-translate-y-px hover:text-white ${focusRing}`}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Oversized wordmark */}
          <div
            className="mt-14 overflow-hidden border-t border-neutral-800 pt-8"
            aria-hidden="true"
          >
            <p className="pointer-events-none text-center text-[clamp(3rem,22vw,10rem)] leading-[0.85] font-extrabold tracking-tight text-neutral-800 select-none">
              Novi
            </p>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 pb-10 sm:flex-row">
            <p className="text-sm text-neutral-400">
              &copy; {year} {footerContent.name}. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-neutral-400">
              <a
                href="#privacy"
                className={`-my-3 inline-block rounded-sm py-3 transition-colors hover:text-white ${focusRing}`}
              >
                Privacy
              </a>
              <a
                href="#terms"
                className={`-my-3 inline-block rounded-sm py-3 transition-colors hover:text-white ${focusRing}`}
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
