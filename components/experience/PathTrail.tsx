'use client';

import { useMemo } from 'react';
import type { Pt } from '@/lib/animation/path';

/** More segments = smoother falloff behind the head. Seven is plenty. */
const SEGMENTS = 7;
/** Tail length in px (design-doc §5 calls for 150-250px behind the head). */
const TAIL = 210;

type Props = {
  d: string;
  width: number;
  height: number;
  /** 0-1 along the path. */
  head: number;
  totalLength: number;
  headPoint: Pt;
  /** Hides the comet while the coin is still morphing into it. */
  active: boolean;
};

/**
 * The comet (design-doc §5). A faint base stroke shows the whole route;
 * on top, a stack of short segments with decreasing opacity trails the
 * head, which is what produces a genuine comet rather than a line that
 * fills in. Segments are used instead of a single gradient stroke because
 * an SVG gradient is spatial — it would not stay oriented to the path as
 * the route changes direction.
 */
export default function PathTrail({
  d,
  width,
  height,
  head,
  totalLength,
  headPoint,
  active,
}: Props) {
  const headLen = head * totalLength;
  const segLen = TAIL / SEGMENTS;

  const segments = useMemo(() => {
    return Array.from({ length: SEGMENTS }, (_, k) => {
      const end = headLen - k * segLen;
      const start = Math.max(0, end - segLen);
      const visible = end > 0 && start < totalLength;
      const fade = 1 - k / SEGMENTS;
      return {
        k,
        start,
        len: Math.max(0, Math.min(end, totalLength) - start),
        visible,
        opacity: Math.pow(fade, 1.5),
        strokeWidth: 1.2 + fade * 2.4,
      };
    });
  }, [headLen, segLen, totalLength]);

  // Principle 8 — the head's glow grows as it travels.
  const glowR = 13 + head * 9;

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="head-glow">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="35%" stopColor="#e6e7ea" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#c8c9cc" stopOpacity="0" />
        </radialGradient>
        <filter id="head-blur" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* The complete route, always visible once the section is reached. */}
      <path
        d={d}
        stroke="#c8c9cc"
        strokeOpacity={0.08}
        strokeWidth={1.25}
        strokeLinecap="round"
      />

      {active && (
        <g>
          {segments.map(
            (s) =>
              s.visible &&
              s.len > 0 && (
                <path
                  key={s.k}
                  d={d}
                  stroke="#f2f3f5"
                  strokeOpacity={s.opacity}
                  strokeWidth={s.strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={`${s.len} ${totalLength + TAIL}`}
                  strokeDashoffset={-s.start}
                />
              )
          )}

          {/* Soft radial glow riding with the head. */}
          <circle
            cx={headPoint.x}
            cy={headPoint.y}
            r={glowR}
            fill="url(#head-glow)"
            filter="url(#head-blur)"
          />
          <circle cx={headPoint.x} cy={headPoint.y} r={2.6} fill="#ffffff" />
        </g>
      )}
    </svg>
  );
}
