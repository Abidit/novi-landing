import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { MotionConfig } from 'framer-motion';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Novi — Run your team without the tab switching',
  description:
    'Novi brings tasks, docs, and conversations into one calm workspace built for small, fast moving teams.',
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
