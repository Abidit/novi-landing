import Link from 'next/link';
import { type ReactNode } from 'react';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
  children: ReactNode;
  className?: string;
}

const variants = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm hover:shadow-md',
  secondary:
    'bg-white text-neutral-900 border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base',
};

export const Button = ({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
}: ButtonProps) => {
  const classes = `inline-flex min-h-11 items-center justify-center rounded-lg font-medium transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};
