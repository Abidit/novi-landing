'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { ctaContent } from '@/lib/content';

export const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 2200);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        disabled={submitted}
        className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors outline-none focus:border-indigo-500 disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={submitted}
        className="flex h-[42px] shrink-0 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 disabled:opacity-90"
      >
        <AnimatePresence mode="wait" initial={false}>
          {submitted ? (
            <motion.span
              key="check"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <FiCheck className="h-4 w-4" />
              You&apos;re in
            </motion.span>
          ) : (
            <motion.span
              key="cta"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              {ctaContent.cta}
              <FiArrowRight className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </form>
  );
};
