'use client';

import { motion } from 'framer-motion';
import { allExamples, featuredId } from './aivideo.data';
import { useAutoplayInView, withFirstFrame } from './autoplay';
import WordRotator from './WordRotator';
import { MONO, focusRing } from './ui';
import { EASE_ENTRANCE, STAGGER } from '@/lib/animation/easings';
import { site } from '@/lib/site';

const mailto = `mailto:${site.email}?subject=${encodeURIComponent('Content project')}`;

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * STAGGER * 1.5, duration: 0.7, ease: EASE_ENTRANCE },
  }),
};

/**
 * Floating pill nav, the rotating headline, two actions and a featured cut
 * in a bordered card, over the drifting lines. Where these videos run
 * floats at the edges, the way the reference floats its platforms.
 */
export default function Hero({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <header id="top" className="relative overflow-x-clip">
      <Nav />
      <PlatformPills />

      <motion.div
        initial="hidden"
        animate="show"
        className="relative mx-auto flex max-w-5xl flex-col items-center px-5 pb-16 pt-36 text-center sm:pt-44"
      >
        <motion.h1
          custom={0}
          variants={rise}
          className="font-script text-[clamp(2.75rem,8.4vw,6.75rem)] font-bold leading-[1.02] tracking-[-0.05em] text-ink"
        >
          {/* Always two lines. On one line, "simpler." re-wrapped the heading
              at some widths and shoved everything below it 100px per swap. */}
          Create content
          <br />
          <WordRotator words={['faster.', 'better.', 'simpler.']} />
        </motion.h1>

        <motion.p
          custom={1}
          variants={rise}
          className="mt-7 max-w-2xl font-serif text-[clamp(1.125rem,1.9vw,1.375rem)] leading-[1.55] text-neutral-600"
        >
          AI ads, storytime cartoons, motion graphics, cinematics and
          explainers. Researched before they are scripted, so they perform.
        </motion.p>

        <motion.div custom={2} variants={rise} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#ads"
            className={`press inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-ink px-7 text-[0.9375rem] font-medium text-white shadow-[0_10px_24px_-12px_rgba(0,0,0,0.6)] hover:bg-neutral-800 ${MONO} ${focusRing}`}
          >
            <ArrowDown />
            Jump to video ads
          </a>
          <a
            href={mailto}
            className={`press inline-flex min-h-[52px] items-center gap-2.5 rounded-full border border-neutral-300 bg-white px-7 text-[0.9375rem] font-medium text-ink hover:border-ink ${MONO} ${focusRing}`}
          >
            <MailIcon />
            Email me
          </a>
        </motion.div>

        <motion.p
          custom={3}
          variants={rise}
          className={`mt-5 flex flex-wrap items-center justify-center gap-2 text-[0.8125rem] text-neutral-600 ${MONO}`}
        >
          Tap any video
          <span className="rounded-md border border-neutral-300 bg-white px-1.5 py-0.5 text-[0.75rem] text-ink">
            Expand
          </span>
          to watch with sound
        </motion.p>

        <motion.div
          className="mt-14 w-full max-w-[600px]"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.9, ease: EASE_ENTRANCE }}
        >
          <FeaturedCard onOpen={onOpen} />
        </motion.div>
      </motion.div>
    </header>
  );
}

function Nav() {
  const link = `whitespace-nowrap rounded-full px-3 py-2 text-[0.8125rem] text-neutral-600 hover:text-ink ${MONO} ${focusRing}`;
  return (
    <nav
      aria-label="Primary"
      className="fixed left-1/2 top-3 z-50 flex w-[min(1000px,calc(100%-24px))] -translate-x-1/2 items-center justify-between gap-3 rounded-full border border-neutral-200 bg-white/85 py-2 pl-3 pr-2 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.25)] backdrop-blur-md"
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

/** Where the work runs, drifting at the edges. Decorative, desktop only. */
function PlatformPills() {
  // The pair by the headline needs xl: narrower, the heading reaches the
  // edges. The pair by the card fits from lg, where the card leaves room.
  const pills = [
    { label: 'TikTok', className: 'hidden xl:inline-flex -left-3 top-[130px]', delay: '0s' },
    { label: 'Reels', className: 'hidden xl:inline-flex -right-3 top-[170px]', delay: '-2.4s' },
    { label: 'YouTube', className: 'hidden lg:inline-flex -right-4 top-[760px]', delay: '-4.1s' },
    { label: 'Meta ads', className: 'hidden lg:inline-flex -left-4 top-[960px]', delay: '-1.2s' },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {pills.map((p) => (
        <span
          key={p.label}
          className={`platform-pill absolute items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-[0.8125rem] text-neutral-600 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)] ${MONO} ${p.className}`}
          style={{ animationDelay: p.delay }}
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-ink">
            <svg width="6" height="7" viewBox="0 0 6 7" fill="white">
              <path d="M0 0.5v6l6-3z" />
            </svg>
          </span>
          {p.label}
        </span>
      ))}
      <style jsx>{`
        .platform-pill {
          animation: drift 7s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
        @keyframes drift {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}

/**
 * The reference's demo card, carrying a video instead of a transcript:
 * status row, the cut, and a footer that says where it runs.
 */
function FeaturedCard({ onOpen }: { onOpen: (id: string) => void }) {
  const ref = useAutoplayInView<HTMLVideoElement>();
  const { example, category } = allExamples.find((a) => a.example.id === featuredId) ?? allExamples[0];
  const [w, h] = example.ratio.split(':').map(Number);

  return (
    <figure className="m-0 rounded-[20px] border-[1.5px] border-ink bg-white p-4 text-left shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] sm:p-5">
      <div className="flex items-center justify-between gap-3 pb-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink">
            <svg width="10" height="12" viewBox="0 0 10 12" fill="white" aria-hidden>
              <path d="M0 0.8v10.4L10 6z" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className={`text-[0.8125rem] font-medium uppercase tracking-[0.06em] text-ink ${MONO}`}>Now playing</p>
            <p className={`truncate text-[0.75rem] text-neutral-600 ${MONO}`}>
              {example.title}, {category.name.toLowerCase()}
            </p>
          </div>
        </div>
        <span className={`shrink-0 rounded-full border border-neutral-300 px-2.5 py-1 text-[0.6875rem] tracking-[0.04em] text-ink ${MONO}`}>
          {example.ratio}, {example.length.replace(' seconds', 's')}
        </span>
      </div>

      <button
        type="button"
        onClick={() => onOpen(example.id)}
        aria-label={`Expand ${example.title}`}
        className={`group relative block w-full overflow-hidden rounded-[14px] border border-neutral-200 bg-neutral-100 ${focusRing}`}
        style={{ aspectRatio: w / h }}
      >
        <video
          ref={ref}
          src={example.poster ? example.src : withFirstFrame(example.src)}
          poster={example.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <ExpandChip />
      </button>

      <figcaption className={`flex justify-between gap-4 pt-4 text-[0.75rem] text-neutral-600 ${MONO}`}>
        <span>Made for: {example.madeFor}</span>
        <span className="shrink-0">100% AI-generated</span>
      </figcaption>
    </figure>
  );
}

export function ExpandChip() {
  return (
    <span
      aria-hidden
      className={`absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[0.75rem] text-ink shadow-[0_6px_18px_-8px_rgba(0,0,0,0.4)] transition-transform duration-200 group-hover:scale-105 ${MONO}`}
    >
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path
          d="M8.5 1.5h4v4M5.5 12.5h-4v-4M12.5 1.5 8 6M1.5 12.5 6 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Expand
    </span>
  );
}

function ArrowDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M7 1.5v10M2.5 7.5 7 12l4.5-4.5M2 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="15" height="12" viewBox="0 0 15 12" fill="none" aria-hidden>
      <rect x="0.75" y="0.75" width="13.5" height="10.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="m1.5 2 6 4.5 6-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
