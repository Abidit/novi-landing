'use client';

import { useId, useState, type ChangeEvent, type SubmitEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCheck, FiLoader } from 'react-icons/fi';
import { ctaContent } from '@/lib/content';

type Status = 'idle' | 'invalid' | 'submitting' | 'success';

// The pragmatic email pattern the WHATWG HTML spec requires browsers to use
// for `<input type="email">` validation — the full RFC 5322 grammar is
// impractically permissive (it accepts strings no real mail provider does),
// so this is the de facto standard for "RFC 5322 compliant" validation.
const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const SUBMIT_DELAY_MS = 700;
const SUCCESS_DURATION_MS = 2200;

const isValidEmail = (value: string) => EMAIL_PATTERN.test(value.trim());

export const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const inputId = useId();
  const feedbackId = useId();

  const isBusy = status === 'submitting' || status === 'success';

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (status === 'invalid' && isValidEmail(e.target.value)) setStatus('idle');
  };

  const handleBlur = () => {
    if (isBusy) return;
    setStatus(email && !isValidEmail(email) ? 'invalid' : 'idle');
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus('invalid');
      return;
    }
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setEmail('');
      }, SUCCESS_DURATION_MS);
    }, SUBMIT_DELAY_MS);
  };

  const feedback =
    status === 'invalid'
      ? 'Enter a valid email address.'
      : status === 'submitting'
        ? 'Sending your subscription…'
        : status === 'success'
          ? "You're in — check your inbox to confirm."
          : '';

  const feedbackTone =
    status === 'invalid'
      ? 'text-red-700'
      : status === 'success'
        ? 'text-emerald-700'
        : 'text-neutral-600';

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex w-full max-w-md flex-col gap-2"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          type="email"
          required
          value={email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="you@company.com"
          disabled={isBusy}
          aria-invalid={status === 'invalid'}
          aria-describedby={feedback ? feedbackId : undefined}
          className={`h-11 w-full rounded-lg border bg-white px-4 text-sm text-neutral-900 placeholder-neutral-500 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 ${
            status === 'invalid'
              ? 'border-red-500 focus-visible:ring-red-500'
              : 'border-neutral-300 focus:border-indigo-500 focus-visible:ring-indigo-500'
          }`}
        />
        <button
          type="submit"
          disabled={isBusy}
          className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 text-sm font-medium text-white transition-colors outline-none hover:bg-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-90"
        >
          <AnimatePresence mode="wait" initial={false}>
            {status === 'submitting' ? (
              <motion.span
                key="submitting"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <FiLoader
                  className="h-4 w-4 animate-spin motion-reduce:animate-none"
                  aria-hidden="true"
                />
                Sending
              </motion.span>
            ) : status === 'success' ? (
              <motion.span
                key="success"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <FiCheck className="h-4 w-4" aria-hidden="true" />
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
                <FiArrowRight className="h-4 w-4" aria-hidden="true" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <div id={feedbackId} role="status" aria-live="polite" aria-atomic="true">
        {feedback && <span className={feedbackTone}>{feedback}</span>}
      </div>
    </form>
  );
};
