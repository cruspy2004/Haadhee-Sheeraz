'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EASE_ENTRANCE } from '@/lib/animation/easings';
import { site } from '@/lib/site';

const LINKS = [
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

/**
 * Fixed glass nav, persistent across every section (design-doc §2). Uses the
 * single shared --glass-blur so it matches the Contact panel exactly
 * (principle 12). The .nav-ripple class is toggled by PivotTransition.
 *
 * Centring lives on the static outer wrapper, never on the animated element:
 * Framer Motion writes the `transform` property itself and will silently
 * overwrite a Tailwind `-translate-x-1/2`, throwing the bar half its own
 * width off-centre.
 */
export default function GlassNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-3 sm:top-6">
      <motion.nav
        id="glass-nav"
        aria-label="Primary"
        className="pointer-events-auto max-w-full"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: EASE_ENTRANCE }}
      >
        <div
          className="glass flex items-center gap-1 py-2 pl-4 pr-2 sm:gap-2 sm:pl-5"
          style={{
            background: scrolled ? 'rgba(255,255,255,0.055)' : 'var(--glass-bg)',
            transition: 'background 400ms var(--ease-ambient)',
          }}
        >
          <a
            href="#hero"
            className="whitespace-nowrap font-script text-lg leading-none text-silver-bright transition-opacity hover:opacity-70 sm:text-xl"
          >
            {site.name}
          </a>

          <span aria-hidden className="mx-1 h-4 w-px bg-white/10 sm:mx-2" />

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="meta rounded-soft px-3 py-1.5 text-silver-dim transition-colors duration-200 hover:bg-white/[0.06] hover:text-silver-bright"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={site.resume}
            download
            className="press meta ml-auto whitespace-nowrap rounded-soft border border-white/10 px-3 py-1.5 text-silver-bright hover:bg-white/[0.06]"
          >
            Résumé
          </a>
        </div>
      </motion.nav>
    </div>
  );
}
