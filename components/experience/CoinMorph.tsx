'use client';

import Image from 'next/image';
import type { Pt } from '@/lib/animation/path';

type Props = {
  /** 0-1 across the morph window only, not the whole section. */
  t: number;
  from: Pt;
  to: Pt;
};

/**
 * PRD §4.3 — the hero photo condenses into a coin, drifts down a shallow
 * S-curve as it shrinks, flips in 3D, then collapses into the glowing head
 * that travels the path. Same scroll-progress value as PathTrail, so there
 * is no seam between the two.
 *
 * Principle 11 (solid drawing): one light source for the whole flip. The
 * specular sweep is fixed at 135° — matching the hero photo's top-left key
 * light — and lives on both faces, so the lit edge never contradicts the
 * photo as the coin turns.
 */
export default function CoinMorph({ t, from, to }: Props) {
  // Principle 7 — arcs: a shallow S rather than a straight translate.
  const drift = Math.sin(t * Math.PI * 2) * 36;

  const ease = 1 - Math.pow(1 - t, 3); // expo-ish out
  const x = from.x + (to.x - from.x) * ease + drift;
  const y = from.y + (to.y - from.y) * ease;

  const size = 260 - 226 * ease; // 260px → 34px
  const spin = ease * 540; // lands face-on after 1.5 turns

  // Collapses into the comet head over the final fifth of the window.
  const collapse = t > 0.8 ? (t - 0.8) / 0.2 : 0;
  const scale = 1 - collapse * 0.72;
  const opacity = 1 - collapse;

  const SHEEN =
    'linear-gradient(135deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.06) 34%, rgba(0,0,0,0.28) 62%, rgba(255,255,255,0.14) 100%)';

  return (
    /*
     * Fixed, not absolute: the morph begins while the hero is still on
     * screen, before the Experience stage has pinned, so the coin must be
     * positioned against the viewport rather than that stage. Once the
     * stage is stuck at top:0 its coordinates and the viewport's coincide,
     * so the landing point lines up with the path's start exactly.
     */
    <div
      className="pointer-events-none fixed z-30"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        perspective: 1000,
        opacity,
      }}
      aria-hidden="true"
    >
      <div
        className="relative h-full w-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${spin}deg) scale(${scale})`,
        }}
      >
        {/* Face A — the photo itself, circularly cropped. */}
        <div
          className="absolute inset-0 overflow-hidden rounded-full"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Image
            src="/hero-photo.png"
            alt=""
            fill
            sizes="260px"
            className="object-cover object-top"
          />
          <div className="absolute inset-0" style={{ background: SHEEN }} />
        </div>

        {/* Face B — struck silver. */}
        <div
          className="absolute inset-0 overflow-hidden rounded-full"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background:
              'conic-gradient(from 210deg, #6c6e73, #d6d7da, #8c8e93, #f2f3f5, #75777c, #c8c9cc, #6c6e73)',
          }}
        >
          <div className="absolute inset-0" style={{ background: SHEEN }} />
          <div className="absolute inset-[9%] rounded-full border border-black/25" />
          <div className="absolute inset-0 grid place-items-center">
            <span
              className="font-script leading-none text-black/55"
              style={{ fontSize: size * 0.34 }}
            >
              HS
            </span>
          </div>
        </div>
      </div>

      {/* Principle 8 — light flare trailing the coin at 30% intensity. */}
      <div
        className="absolute inset-0 -z-10 rounded-full blur-2xl"
        style={{
          background:
            'radial-gradient(circle, rgba(242,243,245,0.3) 0%, transparent 68%)',
          transform: `translateY(${18 * ease}px) scale(1.25)`,
        }}
      />
    </div>
  );
}
