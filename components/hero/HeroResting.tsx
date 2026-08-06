'use client';

import { motion } from 'framer-motion';
import HeroMedia from './HeroMedia';
import { EASE_ENTRANCE, STAGGER } from '@/lib/animation/easings';
import { site } from '@/lib/site';

/**
 * PRD §4.1 resting state. The photo is the dominant element (~70% of the
 * viewport), edge-dissolved into the page, with the wordmark at logo scale
 * above it and a slow breathing light on the photo's edge.
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
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Ambient breathing light behind the subject — straight-ahead motion
          (principle 4), so it never reads as a visible loop. */}
      <div
        aria-hidden="true"
        className="hero-breath pointer-events-none absolute left-1/2 top-1/2 h-[78vh] w-[78vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(216,205,190,0.10) 0%, rgba(200,201,204,0.045) 38%, transparent 68%)',
        }}
      />

      {/*
        Widened from a 42svh cap. The photo was 72% of the viewport's
        height but only ~25% of its width, so the frame read as a large
        black field with small elements floating in it rather than a
        portrait carrying the composition. Aspect stays locked so a video
        still drops in with no layout change.
      */}
      <div className="relative h-[66svh] w-[min(90vw,52svh)] sm:h-[74svh] sm:w-[min(72vw,62svh)]">
        <HeroMedia />
      </div>

      {/* Wordmark sits over the upper third of the photo. Centred with
          inset rather than a translate class — Framer owns `transform` on
          anything it animates and would overwrite it. */}
      <motion.h1
        className="pointer-events-none absolute inset-x-0 top-[14%] text-center font-script text-[clamp(2.6rem,7.5vw,5.5rem)] font-normal leading-none tracking-normal text-silver-bright"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE_ENTRANCE }}
      >
        {site.name}
      </motion.h1>

      <motion.div
        className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-3 px-6 text-center"
        initial="hidden"
        animate="show"
      >
        <motion.p custom={0} variants={rise} className="eyebrow">
          {site.role} · Islamabad
        </motion.p>
        <motion.p
          custom={1}
          variants={rise}
          className="max-w-md text-[length:var(--t-body-s)] leading-relaxed text-silver-dim"
        >
          Backend systems at telecom scale, AI content pipelines, and products
          that ship.
        </motion.p>
        <motion.div
          custom={2}
          variants={rise}
          className="mt-2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="eyebrow tracking-[0.3em]">SCROLL</span>
          <span className="scroll-line block h-10 w-px bg-gradient-to-b from-silver-faint to-transparent" />
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
            transform: translate(-50%, -50%) scale(1);
          }
          43% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.045);
          }
          71% {
            opacity: 0.86;
            transform: translate(-50%, -50%) scale(1.015);
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
