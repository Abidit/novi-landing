'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navContent } from '@/lib/content';
import { Button } from '@/components/ui/Button';
import { FiMenu, FiX } from 'react-icons/fi';

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <span className="text-lg font-bold text-neutral-900">{navContent.name}</span>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {navContent.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button href="#" size="sm">
            Start Free
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-neutral-700 md:hidden"
        >
          {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile slide-in panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-neutral-100 md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navContent.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-lg px-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                >
                  {link.label}
                </a>
              ))}
              <Button
                href="#"
                size="sm"
                onClick={() => setOpen(false)}
                className="mt-2 w-full"
              >
                Start Free
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
