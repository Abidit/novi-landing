'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { navContent } from '@/lib/content';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';
import { Button } from '@/components/ui/Button';
import { NavLogo } from './NavLogo';
import { SignInLink } from './SignInLink';

const slideVariants = {
  hidden: { x: '-100%' },
  visible: { x: '0%' },
};

const reducedMotionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

interface MobileMenuOverlayProps {
  onClose: () => void;
}

export const MobileMenuOverlay = ({ onClose }: MobileMenuOverlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const container = overlayRef.current;
    if (!container) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;

      const focusables = container!.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusables.length === 0) return;

      const list = Array.from(focusables);
      const first = list[0];
      const last = list[list.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, []);

  function handleLinkClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    onClose();
    // deferred a frame so the overlay's own body-scroll-lock cleanup (in
    // Navbar's effect) has run before we ask the page to scroll
    requestAnimationFrame(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  return (
    <motion.div
      ref={overlayRef}
      id="mobile-nav-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Main menu"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={prefersReducedMotion ? reducedMotionVariants : slideVariants}
      transition={
        prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeInOut' }
      }
      className="fixed inset-0 z-[100] flex h-dvh w-screen flex-col overflow-y-auto bg-white px-6 py-4 md:hidden"
    >
      <div className="flex items-center justify-between rounded-2xl border border-neutral-200 px-4 py-3">
        <NavLogo />
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-neutral-700"
        >
          <FiX className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <nav className="mt-8 flex flex-col gap-2">
        {navContent.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleLinkClick(e, link.href)}
            className="rounded-lg px-2 py-3 text-lg font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-3 pt-8 pb-4">
        <SignInLink onClick={onClose} className="w-full" />
        <Button href={navContent.cta.href} onClick={onClose} className="w-full">
          {navContent.cta.label}
        </Button>
      </div>
    </motion.div>
  );
};
