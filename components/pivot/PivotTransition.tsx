'use client';

import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';

/** How many shards spawn along the retreating edge. */
const PARTICLES = 72;
/** Total transition length. The reference is fast — this is not a set-piece. */
const RETREAT = 0.45;

type Shard = {
  /** Horizontal seed position across the edge, 0-1. */
  u: number;
  size: number;
  round: boolean;
  stroke: string;
  dx: number;
  dy: number;
  rot: number;
  delay: number;
};

/**
 * The transition into Projects, matched to the reference recording.
 *
 * The outgoing panel does not turn or slide — its bottom edge rises,
 * retreating up and to the left, and the trailing edge disintegrates into
 * scattered shards (rounded squares and circles at mixed sizes, with
 * chromatic outlines) that scatter down-right and fade. The incoming
 * section is already in place behind it and is simply uncovered.
 *
 * Note this supersedes PRD §4.4, which specified a page-turn around a
 * top-right pivot with Projects sliding in from the bottom-right. The
 * recording shows neither of those.
 */
export default function PivotTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const shardsRef = useRef<HTMLDivElement | null>(null);
  const played = useRef(false);

  /**
   * Deterministic pseudo-random shards. A seeded generator rather than
   * Math.random() so the server and client render identical markup — plain
   * randomness here would be a hydration mismatch.
   */
  const shards = useMemo<Shard[]>(() => {
    let seed = 20260804;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    const strokes = ['#37e6f0', '#f048b8', '#6ef05a', '#ffd23f'];

    return Array.from({ length: PARTICLES }, () => {
      const r = rnd();
      return {
        u: rnd(),
        size: 5 + rnd() * 20,
        round: rnd() > 0.55,
        stroke: strokes[Math.floor(rnd() * strokes.length)],
        // Scatter down and to the right, matching the reference.
        dx: 30 + rnd() * 190,
        dy: 20 + rnd() * 150,
        rot: -140 + rnd() * 280,
        delay: r * 0.16,
      };
    });
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const panel = panelRef.current;
    const shardLayer = shardsRef.current;
    if (!wrap || !panel || !shardLayer) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /** Guarantees the section ends up visible no matter what stalls. */
    const forceFinal = () => {
      gsap.set(panel, { display: 'none' });
      gsap.set(shardLayer, { display: 'none' });
      gsap.set(wrap, { opacity: 1 });
    };

    if (reduced) {
      // Design-doc §7 — a plain crossfade stands in for the disintegration.
      forceFinal();
      return;
    }

    gsap.set(panel, { '--edge': '0%' });
    gsap.set(shardLayer.children, { opacity: 0 });

    let failsafe = 0;

    const play = () => {
      if (played.current) return;
      played.current = true;

      const nav = document.getElementById('glass-nav');
      const tl = gsap.timeline({
        onComplete: () => {
          window.clearTimeout(failsafe);
          forceFinal();
        },
      });

      failsafe = window.setTimeout(forceFinal, RETREAT * 1000 + 2500);

      tl
        // The bottom edge climbs, shrinking the panel toward the top-left.
        .to(panel, {
          '--edge': '100%',
          xPercent: -6,
          duration: RETREAT,
          ease: 'power2.in',
          onStart: () => {
            // Principle 8 — chromatic ripple across the nav glass.
            if (nav) {
              nav.classList.add('nav-ripple');
              window.setTimeout(() => nav.classList.remove('nav-ripple'), 420);
            }
          },
        })
        // Shards break off the trailing edge and scatter down-right.
        .to(
          shardLayer.children,
          {
            opacity: 1,
            duration: 0.06,
            stagger: { each: 0.0022, from: 'random' },
          },
          0.04
        )
        .to(
          shardLayer.children,
          {
            x: (i) => shards[i].dx,
            y: (i) => shards[i].dy,
            rotate: (i) => shards[i].rot,
            opacity: 0,
            scale: 0.4,
            duration: 0.34,
            ease: 'power2.out',
            stagger: { each: 0.0022, from: 'random' },
          },
          0.1
        );
    };

    /*
     * Plain passive scroll check: this only needs to fire once at a
     * threshold, and a scroll listener evaluates immediately on mount, so a
     * load that restores straight into Projects still resolves correctly.
     */
    const check = () => {
      if (played.current) return;
      const r = wrap.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.86) play();
    };

    check();
    window.addEventListener('scroll', check, { passive: true });

    return () => {
      window.clearTimeout(failsafe);
      window.removeEventListener('scroll', check);
    };
  }, [shards]);

  return (
    /*
     * Clipped locally so the panel's horizontal drift cannot widen the
     * document. Clipping here rather than on html/body keeps the Experience
     * section's `sticky` working — an overflow value on a scroll ancestor
     * would disable it.
     */
    <div className="relative overflow-hidden">
      {/* Outgoing cover, carrying the preceding section's surface colour. */}
      <div
        ref={panelRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-40 bg-ink"
        style={
          {
            '--edge': '0%',
            clipPath: 'inset(0 0 var(--edge) 0)',
          } as React.CSSProperties
        }
      />

      {/* Shards, seeded along the edge the panel retreats past. */}
      <div
        ref={shardsRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-40 h-full"
      >
        {shards.map((s, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${s.u * 100}%`,
              top: `${18 + (i % 7) * 9}%`,
              width: s.size,
              height: s.size,
              borderRadius: s.round ? '50%' : '4px',
              border: `1.5px solid ${s.stroke}`,
              background:
                i % 3 === 0 ? 'transparent' : 'rgba(255,255,255,0.06)',
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>

      <div ref={wrapRef}>{children}</div>
    </div>
  );
}
