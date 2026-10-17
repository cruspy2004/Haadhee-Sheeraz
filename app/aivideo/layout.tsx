import type { Metadata, Viewport } from 'next';
import { site } from '@/lib/site';

/*
 * Served at aivideo.haadheesheeraz.online through the host rewrite in
 * next.config.mjs. metadataBase is the subdomain so the canonical URL and
 * the share card point there, not at /aivideo on the main site.
 */
const title = `${site.name}, AI Video`;
const description =
  'Create content faster, better, simpler. AI ads, storytime cartoons, motion graphics, cinematic visuals and explainers by Haadhee Sheeraz.';

export const metadata: Metadata = {
  metadataBase: new URL(site.aivideo),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description,
    type: 'website',
    url: site.aivideo,
    images: [{ url: '/og-aivideo.png', width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    images: ['/og-aivideo.png'],
  },
};

/* Light browser chrome and form controls, matched to the off-white ground. */
export const viewport: Viewport = {
  themeColor: '#f2f2f0',
  colorScheme: 'light',
};

/*
 * The root layout is the main site's: a dark html/body, a film-grain
 * overlay on body::after and a near-white text selection. On this off-white
 * page the grain reads as dirt and the selection disappears, so this host
 * turns them off. Safe to do globally because nothing else is ever rendered on
 * aivideo.*, and links back to the main site are full-page navigations.
 */
const lightSurface = `
  :root { --page-bg: #f2f2f0; }
  html { background: #f2f2f0; }
  body { color: #050506; }
  body.grain::after { content: none; }
  ::selection { background: #050506; color: #ffffff; }
`;

export default function AiVideoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: lightSurface }} />
      {children}
    </>
  );
}
