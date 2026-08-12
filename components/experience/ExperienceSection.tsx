'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PathTrail from './PathTrail';
import CoinMorph from './CoinMorph';
import ExperienceEntry from './ExperienceEntry';
import { experience } from './experience.data';
import { buildSnakePath, measurePath } from '@/lib/animation/path';
import { usePrefersReducedMotion } from '@/lib/animation/useScrollProgress';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

/**
 * PRD §4.3. The coin morph runs across the hero's scroll-out; the comet and
 * every entry's arrival run across this section's own range. The two ranges
 * meet exactly where the hero ends and this section pins.
 *
 * The viewport is held with CSS `position: sticky` rather than a
 * ScrollTrigger pin. Design-doc §7 flags pin jank on low-end mobile
 * specifically at this handoff — sticky avoids the pin-spacer layout shift
 * entirely while ScrollTrigger still supplies the progress value.
 */
export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [morphRaw, setMorph] = useState(0);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const reduced = usePrefersReducedMotion();

  /**
   * Measure the sticky stage so the path is authored in real pixels.
   *
   * Measured synchronously before paint rather than waiting on a
   * ResizeObserver callback: RO only delivers during the frame lifecycle,
   * so a first paint that happens before any frame is produced would leave
   * the section empty. RO then handles subsequent resizes.
   */
  useIsomorphicLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    let raf = 0;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      setSize((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
    };

    measure();

    const onResize = () => {
      measure();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(el);
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => st.kill();
  }, []);

  /*
   * COIN MORPH — DISABLED, PENDING REVISIT.
   *
   * The hero-photo-to-coin morph is switched off rather than deleted: the
   * component, its easing and its S-curve maths are all still in
   * CoinMorph.tsx, and re-enabling is a matter of restoring this trigger
   * and the render block below.
   *
   * It ran on its own range anchored to the hero (top top → bottom top) so
   * the morph began the instant the visitor scrolled away from the hero,
   * contiguous with this section's own range.
   */
  // useEffect(() => {
  //   const hero = document.getElementById('hero');
  //   if (!hero) return;
  //   gsap.registerPlugin(ScrollTrigger);
  //
  //   const st = ScrollTrigger.create({
  //     trigger: hero,
  //     start: 'top top',
  //     end: 'bottom top',
  //     scrub: true,
  //     invalidateOnRefresh: true,
  //     onUpdate: (self) => setMorph(self.progress),
  //   });
  //
  //   return () => st.kill();
  // }, []);

  const narrow = size.w > 0 && size.w < 860;

  const { d, length, pointAt } = useMemo(() => {
    const path = buildSnakePath(size.w, size.h, narrow);
    const m = measurePath(path);
    return { d: path, length: m.length, pointAt: m.pointAt };
  }, [size.w, size.h, narrow]);

  // Reduced motion: the route is simply present and every entry is shown.
  const head = reduced ? 1 : progress;

  const headPoint = useMemo(() => pointAt(head), [pointAt, head]);

  const anchors = useMemo(
    () =>
      experience.map((e) => {
        const p = pointAt(e.anchor);
        // Keep blocks from hanging off the top or bottom of the stage.
        const clampedY = Math.max(150, Math.min(size.h - 150, p.y));
        return { ...e, x: p.x, y: clampedY };
      }),
    [pointAt, size.h]
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      /*
       * 320svh, down from 520. At 520 this section was 62% of the whole
       * document while Projects — six shipped projects, the actual point
       * of the site — got 11%. The path still has room to read; it just
       * no longer outweighs the work.
       */
      className="relative h-[320svh]"
      aria-label="Experience"
    >
      {/* COIN MORPH — DISABLED, PENDING REVISIT. See the note above.
          Sat outside the sticky stage because the coin is viewport-
          positioned and began moving while the hero was still on screen.

      {!reduced && size.w > 0 && morph > 0.001 && morph < 1 && (
        <CoinMorph
          t={morph}
          from={{ x: size.w * 0.5, y: size.h * 0.42 }}
          to={pathStart}
        />
      )}
      */}

      <div
        ref={stageRef}
        className="sticky top-0 h-[100svh] overflow-hidden"
      >
        <div className="pointer-events-none absolute left-1/2 top-10 z-10 -translate-x-1/2 text-center sm:top-14">
          <p className="eyebrow">Experience</p>
        </div>

        {size.w > 0 && (
          <>
            <PathTrail
              d={d}
              width={size.w}
              height={size.h}
              head={head}
              totalLength={length}
              headPoint={headPoint}
              active={true}
            />

            {anchors.map((entry) => (
              <ExperienceEntry
                key={entry.id}
                entry={entry}
                x={entry.x}
                y={entry.y}
                stageW={size.w}
                narrow={narrow}
                arrived={reduced || head >= entry.anchor}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
