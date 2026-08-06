'use client';

import { motion } from 'framer-motion';
import type { ExperienceEntryData } from './experience.data';
import { EASE_ENTRANCE } from '@/lib/animation/easings';

type Props = {
  entry: ExperienceEntryData;
  /** Anchor position on the path, in sticky-container pixels. */
  x: number;
  y: number;
  /** Width of the sticky stage, used to keep blocks inside it. */
  stageW: number;
  /** True once the travelling head has passed this entry's anchor. */
  arrived: boolean;
  narrow: boolean;
};

/** Clearance between the path and the block, and from the stage edges. */
const GAP = 44;
const MARGIN = 24;
const MAX_W = 480; // matches the 30rem cap in the class below

/**
 * A single work-history block, anchored to its point on the path. It
 * arrives when the light reaches it — the arrival of the head IS the
 * trigger (design-doc §5), not generic section entry.
 */
export default function ExperienceEntry({
  entry,
  x,
  y,
  stageW,
  arrived,
  narrow,
}: Props) {
  const onRight = narrow ? true : entry.side === 'right';
  const width = Math.min(MAX_W, stageW * (narrow ? 0.78 : 0.42));

  /*
   * Clamp into the stage. The path's own x can sit close enough to an edge
   * that a full-width block would hang off it, so the anchor decides where
   * the block *wants* to be and this decides where it can actually go.
   */
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
      <div className={`flex items-center gap-3 ${onRight ? '' : 'justify-end'}`}>
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
    </motion.article>
  );
}
