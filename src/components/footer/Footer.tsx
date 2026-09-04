import { footerContent } from '@/lib/content';
import { NewsletterForm } from './NewsletterForm';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand + signup */}
          <div className="sm:col-span-2 lg:col-span-2">
            <span className="text-xl font-bold text-white">{footerContent.name}</span>
            <p className="mt-3 max-w-xs text-sm text-neutral-400">
              {footerContent.tagline}
            </p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
            <div className="mt-6 flex gap-4">
              {footerContent.socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 text-neutral-400 transition-colors hover:border-indigo-500 hover:text-white"
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

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 sm:flex-row">
          <p className="text-xs text-neutral-500">
            &copy; {year} {footerContent.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-neutral-500">
            <a href="#privacy" className="transition-colors hover:text-white">
              Privacy
            </a>
            <a href="#terms" className="transition-colors hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
