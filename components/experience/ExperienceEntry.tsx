'use client';

import { motion } from 'framer-motion';
import type { ExperienceEntryData } from './experience.data';
import { EASE_ENTRANCE } from '@/lib/animation/easings';

type Props = {
  entry: ExperienceEntryData;
  /** Anchor position on the path, in sticky-container pixels. */
  x: number;
  y: number;
  /** Width and height of the sticky stage. */
  stageW: number;
  stageH: number;
  /** True once the travelling head has passed this entry's anchor. */
  arrived: boolean;
  narrow: boolean;
  /** Narrow mode only: this is the entry the head is currently on. */
  current: boolean;
};

/** Clearance between the path and the block, and from the stage edges. */
const GAP = 44;
const MARGIN = 24;
const MAX_W = 480;
/** Width of the path rail on narrow screens. */
const RAIL = 76;

/**
 * A single work-history block, anchored to its point on the path.
 *
 * Wide screens: absolutely positioned beside its anchor, alternating
 * sides, all four on screen at once.
 *
 * Narrow screens: that layout does not fit. Four blocks of running prose
 * need roughly 1000px of column and the sticky stage is one viewport tall,
 * so they overlapped into an unreadable pile. Here each entry instead
 * occupies the same centred slot and only the one the travelling head has
 * reached is shown — the comet still drives the reveal, it just swaps
 * entries in place rather than laying them out in space.
 */
export default function ExperienceEntry({
  entry,
  x,
  y,
  stageW,
  stageH,
  arrived,
  narrow,
  current,
}: Props) {
  if (narrow) {
    return (
      <motion.article
        className="absolute"
        style={{
          left: RAIL,
          right: MARGIN,
          top: stageH * 0.5,
          translateY: '-50%',
        }}
        initial={false}
        animate={{
          opacity: current ? 1 : 0,
          y: current ? 0 : 14,
          /*
           * Explicitly cleared, not omitted. `size` starts at 0 so the
           * first render is always the wide branch, which applies
           * blur(4px) while unarrived. Framer does not reset a property
           * you stop passing it, so dropping `filter` here left every
           * entry permanently blurred once the layout switched to narrow.
           */
          filter: 'blur(0px)',
        }}
        transition={{ duration: 0.42, ease: EASE_ENTRANCE }}
        aria-hidden={!current}
      >
        <Body entry={entry} align="left" />
      </motion.article>
    );
  }

  const onRight = entry.side === 'right';
  const width = Math.min(MAX_W, stageW * 0.42);
  const rawLeft = onRight ? x + GAP : x - GAP - width;
  const left = Math.max(MARGIN, Math.min(rawLeft, stageW - width - MARGIN));

  return (
    <motion.article
      className="absolute"
      style={{
        left,
        width,
        top: y,
        textAlign: onRight ? 'left' : 'right',
      }}
      initial={false}
      animate={{
        opacity: arrived ? 1 : 0,
        y: arrived ? '-50%' : 'calc(-50% + 26px)',
        filter: arrived ? 'blur(0px)' : 'blur(4px)',
      }}
      transition={{ duration: 0.5, ease: EASE_ENTRANCE }}
    >
      <Body entry={entry} align={onRight ? 'left' : 'right'} />
    </motion.article>
  );
}

function Body({
  entry,
  align,
}: {
  entry: ExperienceEntryData;
  align: 'left' | 'right';
}) {
  return (
    <>
      <div
        className={`flex items-center gap-3 ${align === 'right' ? 'justify-end' : ''}`}
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.04] font-mono text-[length:var(--t-meta)] text-silver-bright">
          {entry.number}
        </span>
        <span className="meta">{entry.dates}</span>
      </div>

      <h3 className="mt-3 text-[length:var(--t-h3)] font-normal leading-tight text-silver-bright">
        {entry.role}
      </h3>
      <p className="mt-1 text-[length:var(--t-body)] text-silver">
        {entry.company}
      </p>
      <p className="mt-3 text-[length:var(--t-body-s)] leading-relaxed text-silver-dim">
        {entry.description}
      </p>
    </>
  );
}
