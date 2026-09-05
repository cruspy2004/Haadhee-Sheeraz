'use client';

import { site } from '@/lib/site';

/**
 * Three exits, always on screen.
 *
 * The glass nav bar was removed on request, and the consequence was a
 * 7.8-viewport page with zero anchor links and the résumé 5,800px down.
 * This is not that bar back. It is three mono labels in the top-right
 * corner, inside the frame, in the same register as the SEC 01 markers,
 * so a recruiter with forty seconds can get the résumé from anywhere.
 *
 * Hidden on phones: the frame inset there is 8px and the corner is Jack's
 * and the section marker's already. The hero CTA row covers mobile.
 */
export default function CornerLinks() {
  const link =
    'press eyebrow rounded-soft px-2.5 py-1.5 text-silver-dim transition-colors hover:bg-white/[0.06] hover:text-silver-bright';

  return (
    <nav
      aria-label="Quick links"
      className="fixed right-7 top-7 z-[56] hidden items-center gap-1 sm:flex"
    >
      <a href={site.resume} download className={link}>
        Résumé ↓
      </a>
      <span aria-hidden="true" className="mx-1 h-3 w-px bg-white/15" />
      <a href={site.github} target="_blank" rel="noopener noreferrer" className={link}>
        GitHub ↗
      </a>
      <span aria-hidden="true" className="mx-1 h-3 w-px bg-white/15" />
      <a href="#contact" className={link}>
        Contact
      </a>
    </nav>
  );
}
