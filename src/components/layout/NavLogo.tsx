import Link from 'next/link';
import { navContent } from '@/lib/content';
import { AiFillProject } from 'react-icons/ai';

export const NavLogo = () => {
  const { name } = navContent;

  return (
    <Link
      href="/"
      className="align-items-center flex justify-center rounded-sm text-2xl font-extrabold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
    >
      <div className="mr-2 flex items-center">
        <AiFillProject />
      </div>
      <span className="text-neutral-900">{name.slice(0, -1)}</span>
      <span className="text-indigo-600">{name.slice(-1)}</span>
    </Link>
  );
};
