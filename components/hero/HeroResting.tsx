'use client';

import { motion } from 'framer-motion';
import HeroMedia from './HeroMedia';
import { EASE_ENTRANCE, STAGGER } from '@/lib/animation/easings';
import { site } from '@/lib/site';

/**
 * Hero.
 *
 * The portrait is anchored to the BOTTOM of the viewport rather than
 * centred in the flow. Because the frame is taller than the source image
 * is wide-to-tall, object-cover scales the image to fill the frame's
 * height and crops horizontally only — so the full height of the photo is
 * always shown, and bottom-aligning the frame puts the bottom of the image
 * exactly on the bottom of the screen.
 *
 * The copy then overlays the lower portion (which is the dark jacket) with
 * a scrim behind it, instead of sitting below the photo and pushing it up.
 */
export default function HeroResting() {
  const rise = {
    hidden: { opacity: 0, y: 18 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * STAGGER, duration: 0.7, ease: EASE_ENTRANCE },
    }),
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden"
    >
      {/* Ambient breathing light behind the subject — straight-ahead motion
          (principle 4), so it never reads as a visible loop. */}
      <div
        aria-hidden="true"
        className="hero-breath pointer-events-none absolute bottom-[18svh] left-1/2 h-[78svh] w-[78svh] -translate-x-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(216,205,190,0.10) 0%, rgba(200,201,204,0.045) 38%, transparent 68%)',
        }}
      />

      {/* POSITION: size/offset come from --hero-photo-* in globals.css */}
      <div
        id="hero-media"
        className="absolute left-1/2 h-[var(--hero-photo-height)] w-[min(94vw,var(--hero-photo-max-width))]"
        style={{
          bottom: 'var(--hero-photo-bottom)',
          transform:
            'translateX(calc(-50% + var(--hero-photo-shift-x)))',
        }}
      >
        <HeroMedia />
      </div>

      {/* Wordmark overlaps the top of the hair. Centred with inset rather
          than a translate class — Framer owns `transform` on anything it
          animates and would overwrite it. */}
      {/* POSITION: --hero-name-* in globals.css */}
      <motion.h1
        className="pointer-events-none absolute inset-x-0 px-4 text-center font-script font-semibold uppercase leading-none text-silver-bright"
        style={{
          top: 'var(--hero-name-top)',
          fontSize: 'var(--hero-name-size)',
          letterSpacing: 'var(--hero-name-tracking)',
        }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE_ENTRANCE }}
      >
        {site.name}
      </motion.h1>

      {/* Scrim so the copy stays legible over the portrait's lower half. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[34svh]"
        style={{
          background:
            'linear-gradient(to top, rgba(5,5,6,0.92) 0%, rgba(5,5,6,0.72) 38%, transparent 100%)',
        }}
      />

      {/* POSITION: --hero-copy-bottom in globals.css */}
      <motion.div
        className="absolute inset-x-0 flex flex-col items-center gap-3 px-6 text-center"
        style={{ bottom: 'var(--hero-copy-bottom)' }}
        initial="hidden"
        animate="show"
      >
        <motion.p custom={0} variants={rise} className="eyebrow">
          {site.role} · Islamabad
        </motion.p>
        {/*
          The tagline stays as written. The line under it is what a hiring
          manager can actually act on — "simple, reliable builder" is a
          good line but it names nothing you have done.
        */}
        <motion.p
          custom={1}
          variants={rise}
          className="max-w-md text-[length:var(--t-body)] leading-relaxed text-silver"
        >
          A simple, reliable builder.
        </motion.p>
        <motion.p
          custom={2}
          variants={rise}
          className="max-w-lg text-[length:var(--t-body-s)] leading-relaxed text-silver-dim"
        >
          I ship products end to end — and I teach 7.5k developers how they
          work.
        </motion.p>
        <motion.div
          custom={3}
          variants={rise}
          className="mt-1 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="eyebrow tracking-[0.3em]">SCROLL</span>
          <span className="scroll-line block h-9 w-px bg-gradient-to-b from-silver-faint to-transparent" />
        </motion.div>
      </motion.div>

      <style jsx>{`
        .hero-breath {
          animation: breathe 9s ease-in-out infinite;
        }
        @keyframes breathe {
          0%,
          100% {
            opacity: 0.75;
            transform: translateX(-50%) scale(1);
          }
          43% {
            opacity: 1;
            transform: translateX(-50%) scale(1.045);
          }
          71% {
            opacity: 0.86;
            transform: translateX(-50%) scale(1.015);
          }
        }
        .scroll-line {
          animation: scroll-cue 2.4s cubic-bezier(0.65, 0, 0.35, 1) infinite;
          transform-origin: top;
        }
        @keyframes scroll-cue {
          0% {
            transform: scaleY(0);
            opacity: 0;
          }
          40% {
            transform: scaleY(1);
            opacity: 1;
          }
          100% {
            transform: scaleY(1);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
