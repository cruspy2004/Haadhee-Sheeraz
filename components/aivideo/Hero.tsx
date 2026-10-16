'use client';

import { motion } from 'framer-motion';
import { categories } from './aivideo.data';
import { EASE_ENTRANCE } from '@/lib/animation/easings';
import { site } from '@/lib/site';

const LINES = ['Create content', 'faster, better,', 'simpler.'];

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink';

/**
 * The page's one orchestrated moment: the three lines of the headline rise
 * in sequence. Everything after it is still until the visitor acts.
 */
export default function Hero() {
  return (
    <header className="relative mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col px-5 pb-10 pt-6 sm:px-10 sm:pb-14 sm:pt-8">
      <nav aria-label="Primary" className="flex items-center justify-between gap-4">
        <a href="#top" className={`font-script text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink ${focusRing}`}>
          {site.name}
        </a>
        <div className="flex items-center gap-1 sm:gap-2">
          <a href="#about" className={`hidden rounded-full px-3 py-2 text-[0.9375rem] text-neutral-600 hover:text-ink sm:inline-flex ${focusRing}`}>
            About
          </a>
          <a href="#work" className={`hidden rounded-full px-3 py-2 text-[0.9375rem] text-neutral-600 hover:text-ink sm:inline-flex ${focusRing}`}>
            Work
          </a>
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent('Content project')}`}
            className={`press ml-1 inline-flex min-h-[40px] items-center rounded-full bg-ink px-4 text-[0.9375rem] font-medium text-white hover:bg-neutral-800 ${focusRing}`}
          >
            Email me
          </a>
        </div>
      </nav>

      <div id="top" className="flex flex-1 flex-col justify-center py-16">
        <h1 className="font-script text-[clamp(3.25rem,10.5vw,10rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-ink">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.9, ease: EASE_ENTRANCE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-[1.125rem] leading-relaxed text-neutral-600 sm:text-[1.25rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: EASE_ENTRANCE }}
        >
          I&apos;m Haadhee. I research, script and direct AI video for brands
          and creators.
        </motion.p>
      </div>

      {/* Jump links double as a table of contents for the work. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.8, ease: EASE_ENTRANCE }}
      >
        <p className="mb-3 text-[0.875rem] text-neutral-500">Jump to</p>
        <ul className="flex list-none flex-wrap gap-2 p-0">
          {categories.map((c) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                className={`press inline-flex min-h-[40px] items-center rounded-full border border-neutral-300 px-4 text-[0.9375rem] text-ink hover:border-ink ${focusRing}`}
              >
                {c.name}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </header>
  );
}
