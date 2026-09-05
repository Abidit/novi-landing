import { ImageResponse } from 'next/og';
import { heroContent } from '@/lib/content';
import { SITE_NAME, BRAND_INDIGO_600 } from '@/lib/site';

// No `runtime = 'edge'` here: this Next.js version (16.3.4) has deprecated the
// Edge Runtime (build-time warning), and setting it also disables static
// optimization for this route — it would be regenerated on every request
// instead of built once at build time and cached. The default Node.js runtime
// (Fluid Compute on Vercel) has no cold-start penalty that would justify edge,
// so plain Node.js is both the modern-correct and the faster choice here.

export const alt = `${SITE_NAME} — ${heroContent.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const Image = async () => {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        background: BRAND_INDIGO_600,
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 40,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'white',
          marginBottom: 36,
        }}
      >
        {SITE_NAME}
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 64,
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          color: 'white',
          maxWidth: 920,
        }}
      >
        {heroContent.headline}
      </div>
    </div>,
    { ...size },
  );
};

export default Image;
