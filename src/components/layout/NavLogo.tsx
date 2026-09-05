import Link from 'next/link';
import { navContent } from '@/lib/content';

export const NavLogo = () => {
  const { name } = navContent;

  return (
    <Link href="/" className="text-lg font-extrabold tracking-tight">
      <span className="text-neutral-900">{name.slice(0, -1)}</span>
      <span className="text-indigo-600">{name.slice(-1)}</span>
    </Link>
  );
};
