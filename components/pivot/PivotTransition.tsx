'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  ANTICIPATION_DUR,
  DUR,
  GSAP_EASE_ENTRANCE,
  GSAP_EASE_EXIT,
} from '@/lib/animation/easings';

/**
 * PRD §4.4 — the page-turn into Projects. Plays once.
 *
 * The outgoing panel's transform origin is the top-right corner, so its
 * centre genuinely travels a quarter-circle around that anchor rather than
 * spinning in place; a supplementary x/y tween bows the route outward so it
 * turns rather than slides (principle 7). The incoming section overlaps the
 * outgoing motion instead of waiting for it (principle 5).
 */
export default function PivotTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const played = useRef(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const panel = panelRef.current;
    if (!wrap || !panel) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /** Guarantees the section ends up visible no matter what stalls. */
    const forceFinal = () => {
      gsap.set(wrap, { xPercent: 0, yPercent: 0, scale: 1, opacity: 1 });
      gsap.set(panel, { display: 'none' });
    };

    if (reduced) {
      // Design-doc §7 — a plain crossfade stands in for the turn.
      forceFinal();
      return;
    }

    gsap.set(wrap, { xPercent: 16, yPercent: 14, scale: 0.94, opacity: 0 });

    let failsafe = 0;

    const play = () => {
      if (played.current) return;
      played.current = true;

      const nav = document.getElementById('glass-nav');
      const tl = gsap.timeline({
        onComplete: () => window.clearTimeout(failsafe),
      });

      // If the timeline stalls (throttled rAF, backgrounded tab), snap to
      // the finished state rather than leaving Projects invisible.
      failsafe = window.setTimeout(forceFinal, DUR.pivot * 1000 + 2500);

      tl
        // Principle 2 — 2° counter-rotation wind-up before the turn.
        .to(panel, {
          rotate: 2,
          duration: ANTICIPATION_DUR,
          ease: 'power2.in',
        })
        // The turn itself, swinging around the top-right corner.
        .to(panel, {
          rotate: -96,
          x: '12%',
          y: '-6%',
          duration: DUR.pivot,
          ease: GSAP_EASE_EXIT,
          onStart: () => {
            // Principle 8 — chromatic ripple across the nav glass at the
            // exact pivot moment, decaying over 400ms.
            if (nav) {
              nav.classList.add('nav-ripple');
              window.setTimeout(() => nav.classList.remove('nav-ripple'), 420);
            }
          },
        })
        .set(panel, { display: 'none' })
        // Overlaps the outgoing motion by starting partway into it.
        .to(
          wrap,
          {
            xPercent: 0,
            yPercent: 0,
            scale: 1,
            opacity: 1,
            duration: DUR.pivot * 0.92,
            ease: GSAP_EASE_ENTRANCE,
          },
          `-=${DUR.pivot * 0.75}`
        );
    };

    /*
     * Plain passive scroll check rather than a ScrollTrigger: this only
     * needs to fire once at a threshold, and a scroll listener evaluates
     * immediately on mount — so a load that restores straight into Projects
     * still plays (or skips to) the finished state.
     */
    const check = () => {
      if (played.current) return;
      const r = wrap.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.82) play();
    };

    check();
    window.addEventListener('scroll', check, { passive: true });

    return () => {
      window.clearTimeout(failsafe);
      window.removeEventListener('scroll', check);
    };
  }, []);

  return (
    /*
     * Clipped locally: the incoming section is parked at xPercent 16 until
     * the turn plays, which would otherwise push the document wider than the
     * viewport and produce a horizontal scrollbar. Clipping here rather than
     * on html/body keeps the Experience section's `sticky` working — an
     * overflow value on a scroll ancestor would disable it.
     */
    <div className="relative overflow-hidden">
      {/* Outgoing panel — carries the preceding section's surface colour
          across the turn so the background shift happens mid-transition. */}
      <div
        ref={panelRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-40 bg-ink"
        style={{
          transformOrigin: '100% 0%',
          boxShadow: '-40px 0 120px -20px rgba(0,0,0,0.85)',
        }}
      />
      <div ref={wrapRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
