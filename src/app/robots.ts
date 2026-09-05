import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
    disallow: '/style-guide',
  },
  sitemap: `${SITE_URL}/sitemap.xml`,
});

export default robots;
