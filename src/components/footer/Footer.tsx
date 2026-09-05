import { footerContent } from '@/lib/content';
import { CtaBand } from './CtaBand';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <CtaBand />
      <footer className="bg-neutral-900 text-neutral-300">
        <div className="mx-auto max-w-6xl px-6 pt-16 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-y-12 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-6">
            {/* Brand */}
            <div className="sm:col-span-2 md:col-span-4 lg:col-span-1">
              <span className="text-xl font-bold text-white">{footerContent.name}</span>
              <p className="mt-3 max-w-xs text-sm text-neutral-400">
                {footerContent.tagline}
              </p>
              <div className="mt-6 flex gap-4">
                {footerContent.socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-700 text-neutral-400 transition-colors hover:border-indigo-500 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link groups */}
            {footerContent.linkGroups.map((group) => (
              <div key={group.heading}>
                <h4 className="text-sm font-semibold text-white">{group.heading}</h4>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-neutral-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Oversized wordmark */}
          <div
            className="mt-14 overflow-hidden border-t border-neutral-800 pt-8"
            aria-hidden="true"
          >
            <p className="text-center text-[clamp(3rem,22vw,10rem)] leading-[0.85] font-extrabold tracking-tight text-neutral-800 select-none">
              Novi
            </p>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 pb-10 sm:flex-row">
            <p className="text-sm text-neutral-500">
              &copy; {year} {footerContent.name}. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-neutral-500">
              <a
                href="#privacy"
                className="-my-3 inline-block py-3 transition-colors hover:text-white"
              >
                Privacy
              </a>
              <a
                href="#terms"
                className="-my-3 inline-block py-3 transition-colors hover:text-white"
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
