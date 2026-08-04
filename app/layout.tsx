import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import SmoothScroll from '@/components/providers/SmoothScroll';

/*
 * Fonts are self-hosted from /public/fonts rather than pulled through
 * next/font/google. next/font/google fetches the binaries from
 * fonts.gstatic.com at build time and falls back to Arial *silently* (only
 * a warning) if that request fails — which would ship the whole site in the
 * wrong typeface without failing the build. Self-hosting makes the build
 * deterministic and removes the network dependency entirely.
 *
 * To update a face: re-download the woff2 from Google Fonts into
 * /public/fonts and keep the filename.
 */
const script = localFont({
  src: [
    { path: '../public/fonts/pinyon-script-400-latin.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-script',
  display: 'swap',
  // Pinyon Script is very wide and light; this keeps the fallback swap
  // from shifting layout noticeably.
  adjustFontFallback: 'Times New Roman',
  fallback: ['cursive'],
});

const sans = localFont({
  src: [
    {
      path: '../public/fonts/instrument-sans-400-700-latin.woff2',
      weight: '400 700',
      style: 'normal',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

const mono = localFont({
  src: [
    { path: '../public/fonts/dm-mono-300-latin.woff2', weight: '300', style: 'normal' },
    { path: '../public/fonts/dm-mono-400-latin.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/dm-mono-500-latin.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'monospace'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.haadheesheeraz.online'),
  title: 'Haadhee Sheeraz',
  description:
    'Software engineer building backend systems at scale, AI content pipelines, and products people actually use. NUST SEECS.',
  openGraph: {
    title: 'Haadhee Sheeraz',
    description:
      'Software engineer building backend systems at scale, AI content pipelines, and products people actually use.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#050506',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${script.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="grain antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
