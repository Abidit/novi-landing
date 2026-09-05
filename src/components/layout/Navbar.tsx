'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import { navContent } from '@/lib/content';
import { Button } from '@/components/ui/Button';
import { MobileMenuOverlay } from './MobileMenuOverlay';
import { NavLogo } from './NavLogo';
import { SignInLink } from './SignInLink';

const SCROLL_THRESHOLD = 80;

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    // `overflow: hidden` alone doesn't stop touch-drag rubber-band scrolling
    // on mobile Safari/Chrome, so pin the body in place and restore the
    // scroll position on close.
    const scrollY = window.scrollY;
    const { body } = document;
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.overflow = 'hidden';

    return () => {
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    // The overlay is portaled to <body>, so it sits visually on top of the
    // header/main/footer but doesn't remove them from the DOM — without
    // this, their links and buttons (e.g. this same hamburger, still
    // labeled "Close menu" underneath the overlay) stay reachable by
    // screen-reader browse-mode navigation, which doesn't go through the
    // Tab-key focus trap below. `inert` removes them from the
    // accessibility tree and tab order natively, with no per-AT reliance
    // on `aria-modal` support.
    const overlay = document.getElementById('mobile-nav-overlay');
    const siblings = Array.from(document.body.children).filter((el) => el !== overlay);
    siblings.forEach((el) => el.setAttribute('inert', ''));
    return () => siblings.forEach((el) => el.removeAttribute('inert'));
  }, [open]);

  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      triggerRef.current?.focus();
    }
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? 'border-neutral-200 bg-white/90 shadow-sm backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 py-4 lg:px-8">
        {/* Desktop bar: logo left, nav + auth actions right */}
        <div className="hidden items-center justify-between md:flex">
          <NavLogo />

          <div className="flex items-center gap-6">
            <nav aria-label="Primary" className="flex items-center gap-7">
              {navContent.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative rounded-sm pb-0.5 text-sm font-medium text-neutral-600 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-indigo-600 after:transition-transform after:duration-300 after:content-[''] hover:text-neutral-900 hover:after:scale-x-100 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none focus-visible:after:scale-x-100"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <span aria-hidden="true" className="h-5 w-px bg-neutral-200" />

            <div className="flex items-center gap-3">
              <SignInLink />
              <Button href={navContent.cta.href} size="sm">
                {navContent.cta.label}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile collapsed bar */}
        <div className="flex items-center justify-between rounded-2xl border border-neutral-200 px-4 py-3 md:hidden">
          <NavLogo />
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav-overlay"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-neutral-700 transition-colors hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
          >
            <FiMenu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/*
        Portaled to document.body: once scrolled, the header gains
        `backdrop-blur-md` (backdrop-filter), which establishes a containing
        block for `position: fixed` descendants. Left in place, the overlay
        would be positioned relative to the header's box in the document
        flow instead of the viewport, so it'd scroll out of view with the
        page.
      */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {open && <MobileMenuOverlay onClose={() => setOpen(false)} />}
          </AnimatePresence>,
          document.body,
        )}
    </header>
  );
};
