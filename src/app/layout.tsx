import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { MotionConfig } from 'framer-motion';
import { heroContent } from '@/lib/content';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const title = `${SITE_NAME} — ${heroContent.headline}`;
const description = heroContent.subheading;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s — ${SITE_NAME}`,
  },
  description,
  keywords: [
    'project management software',
    'task management',
    'team collaboration tool',
    'small team tools',
    'work management platform',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    // No `images` here on purpose: `opengraph-image.tsx` already generates the
    // og:image (and its width/height/alt) tags via Next's file-convention API,
    // and Twitter's crawler falls back to og:image when twitter:image is absent.
    // Declaring both would just produce duplicate <meta> tags for the same image.
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const RootLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
};

export default RootLayout;
