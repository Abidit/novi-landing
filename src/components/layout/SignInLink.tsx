import Link from 'next/link';
import { navContent } from '@/lib/content';

interface SignInLinkProps {
  onClick?: () => void;
  className?: string;
}

export const SignInLink = ({ onClick, className = '' }: SignInLinkProps) => {
  const { signIn } = navContent;

  return (
    <Link
      href={signIn.href}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center justify-center rounded-full border border-neutral-200 px-5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50 hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none ${className}`}
    >
      {signIn.label}
    </Link>
  );
};
