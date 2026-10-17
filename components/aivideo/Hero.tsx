'use client';

import { useEffect, useState } from 'react';
import { MotionConfig, motion } from 'framer-motion';
import FlowLines from './FlowLines';
import WordRotator from './WordRotator';
import { MONO, focusRing } from './ui';
import { EASE_ENTRANCE } from '@/lib/animation/easings';
import { site } from '@/lib/site';

const mailto = `mailto:${site.email}?subject=${encodeURIComponent('Content project')}`;

/**
 * One line and nothing else: "Create content faster." with the last word
 * cycling, over lines that drift and part around the cursor. The pill nav
 * floats above it and stays with the page.
 *
 * The headline is held to a single line from sm up (sized off the viewport
 * width so the longest word, "simpler.", still fits). Phones may wrap it.
 */
export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <header id="top" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
        <FlowLines />
        <Nav />

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9, ease: EASE_ENTRANCE }}
          className="relative z-[1] px-5 text-center font-script text-[clamp(2.75rem,7.2vw,7.5rem)] font-bold leading-[1.02] tracking-[-0.05em] text-ink sm:whitespace-nowrap"
        >
          Create content <WordRotator words={['faster.', 'better.', 'simpler.']} />
        </motion.h1>
      </header>
    </MotionConfig>
  );
}

/**
 * Hidden while the hero fills the screen, so the headline stands alone;
 * it slides down once the visitor has scrolled a little (a third of the
 * viewport). `inert` keeps the hidden links out of the tab order.
 */
function useScrolledPastTop() {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const check = () => setPast(window.scrollY > window.innerHeight * 0.33);
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);
  return past;
}

function Nav() {
  const shown = useScrolledPastTop();
  const link = `whitespace-nowrap rounded-full px-3 py-2 text-[0.8125rem] text-neutral-600 hover:text-ink ${MONO} ${focusRing}`;
  return (
    <nav
      aria-label="Primary"
      {...(shown ? {} : ({ inert: '' } as Record<string, string>))}
      style={{
        transform: `translate(-50%, ${shown ? '0' : 'calc(-100% - 16px)'})`,
        opacity: shown ? 1 : 0,
        transition: 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease',
      }}
      className="fixed left-1/2 top-3 z-50 flex w-[min(1000px,calc(100%-24px))] items-center justify-between gap-3 rounded-full border border-neutral-200 bg-white/85 py-2 pl-3 pr-2 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.25)] backdrop-blur-md"
    >
      <a href="#top" className={`flex items-center gap-2.5 rounded-full ${focusRing}`}>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink font-script text-[0.9375rem] font-bold text-white">
          H
        </span>
        <span className="whitespace-nowrap font-script text-[1rem] font-semibold tracking-[-0.02em] text-ink">
          {site.name}
        </span>
        <span className={`hidden whitespace-nowrap rounded-full border border-neutral-300 px-2 py-0.5 text-[0.6875rem] text-neutral-600 lg:inline ${MONO}`}>
          AI video
        </span>
      </a>

      {/* lg, not md: at tablet widths the links squeezed every label in
          the bar onto two lines. */}
      <div className="hidden items-center lg:flex">
        <a href="#about" className={link}>About</a>
        <a href="#work" className={link}>Work</a>
        <a href="#ads" className={link}>Ads</a>
        <a href="#explainers" className={link}>Explainers</a>
      </div>

      <div className="flex items-center gap-2">
        <a
          href={site.url}
          className={`hidden min-h-[38px] items-center whitespace-nowrap rounded-full border border-neutral-300 bg-white px-4 text-[0.8125rem] text-ink hover:border-ink lg:inline-flex ${MONO} ${focusRing}`}
        >
          Portfolio ↗
        </a>
        <a
          href={mailto}
          className={`press inline-flex min-h-[38px] items-center whitespace-nowrap rounded-full bg-ink px-4 text-[0.8125rem] font-medium text-white hover:bg-neutral-800 ${MONO} ${focusRing}`}
        >
          Email me
        </a>
      </div>
    </nav>
  );
}
