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
 * specifically at this handoff, sticky avoids the pin-spacer layout shift
 * entirely while ScrollTrigger still supplies the progress value.
 */
/** Breathing room between stacked blocks, and from the stage edges. */
const GAP_PREF = 28;
const GAP_MIN = 16;
const STAGE_PAD = 12;

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [morphRaw, setMorph] = useState(0);
  const [size, setSize] = useState({ w: 0, h: 0 });
  /*
   * Measured, not assumed. A block is 159px with two-line descriptions
   * and 181px with three, and which one you get depends on the copy, the
   * viewport and the font that actually loaded. Whether five of them fit
   * in a one-viewport stage turns on that number, so it has to be real.
   */
  const [blockH, setBlockH] = useState(170);
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

  /*
   * Read back the tallest block once it has rendered. Guarded on a 2px
   * delta so this settles after one correction instead of oscillating.
   */
  useIsomorphicLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const arts = el.querySelectorAll('article');
    if (!arts.length) return;
    let max = 0;
    arts.forEach((a) => {
      max = Math.max(max, a.getBoundingClientRect().height);
    });
    if (max > 0 && Math.abs(max - blockH) > 2) setBlockH(max);
  });

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
   * COIN MORPH, DISABLED, PENDING REVISIT.
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

  /*
   * Stacked layout needs room for every block at once, because an
   * arrived block never leaves. Five two-line blocks want ~900px of
   * stage; a 1280x720 laptop has 720 and the last two used to render
   * below the stage's overflow:hidden, i.e. invisible. When they do not
   * fit we use the one-at-a-time layout instead of cropping entries
   * away. With four entries this was already at the edge (720px needed,
   * 720px available); the fifth is what pushed it over.
   */
  const stackNeeds =
    experience.length * blockH +
    (experience.length - 1) * GAP_MIN +
    STAGE_PAD * 2;
  const narrow = size.w > 0 && (size.w < 860 || size.h < stackNeeds);

  const { d, length, pointAt } = useMemo(() => {
    const path = buildSnakePath(size.w, size.h, narrow);
    const m = measurePath(path);
    return { d: path, length: m.length, pointAt: m.pointAt };
  }, [size.w, size.h, narrow]);

  // Reduced motion: the route is simply present and every entry is shown.
  const head = reduced ? 1 : progress;

  const headPoint = useMemo(() => pointAt(head), [pointAt, head]);

  /*
   * Block placement on wide screens.
   *
   * x comes from the path, so each block still sits beside the curve.
   * y starts at the path's own y and is then pushed apart, because the
   * path's y is not evenly distributed: the snake flattens out where it
   * turns, which bunches consecutive anchors within a few dozen pixels
   * of each other. With four entries that was survivable. With five it
   * put entry 04's date line inside entry 03's description.
   *
   * So: take the path's y as the preference, then enforce a minimum
   * centre-to-centre gap, then pull the whole run back inside the stage
   * and re-check from the bottom up. Content-independent, which matters
   * because the block height is set by how many lines the description
   * wraps to and that changes with both the copy and the viewport.
   */
  const anchors = useMemo(() => {
    const n = experience.length;
    const pad = STAGE_PAD + blockH / 2; // y is the block's centre
    // Centre-to-centre. Squeezes toward GAP_MIN before the layout gives
    // up and hands over to the one-at-a-time branch.
    const available = (size.h - pad * 2) / Math.max(n - 1, 1);
    const step = Math.max(
      blockH + GAP_MIN,
      Math.min(blockH + GAP_PREF, available)
    );

    const ys = experience.map((e) => pointAt(e.anchor).y);

    // Top down: nothing may sit closer than `step` below its predecessor.
    for (let i = 1; i < n; i += 1) {
      ys[i] = Math.max(ys[i], ys[i - 1] + step);
    }
    // The run may now hang off the bottom. Shift it back up as a unit.
    const overflow = ys[n - 1] - (size.h - pad);
    if (overflow > 0) {
      for (let i = 0; i < n; i += 1) ys[i] -= overflow;
    }
    // Bottom up: that shift can push the head of the run off the top.
    for (let i = n - 2; i >= 0; i -= 1) {
      ys[i] = Math.min(ys[i], ys[i + 1] - step);
    }
    ys[0] = Math.max(ys[0], pad);

    return experience.map((e, i) => ({ ...e, x: pointAt(e.anchor).x, y: ys[i] }));
  }, [pointAt, size.h, blockH]);

  /*
   * Narrow screens show one entry at a time in a fixed slot, so we need to
   * know which one the head is currently on: the last entry whose anchor
   * it has passed. Before the first anchor, nothing is shown.
   */
  const currentIdx = useMemo(() => {
    // Starts at 0, not -1: the head reaches the first anchor a little way
    // into the section, and leaving the slot empty until then means the
    // visitor lands on a blank screen with nothing but the path.
    let idx = 0;
    experience.forEach((e, i) => {
      if (head >= e.anchor - 0.06) idx = i;
    });
    return idx;
  }, [head]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      /*
       * 250svh. Was 520, then 320, then 220 when four internships were
       * still getting 3.2x the scroll of five shipped projects. There are
       * five entries now, so this keeps each one at roughly 50svh of
       * scroll rather than squeezing them into 44svh, without going back
       * to dwarfing the Projects section.
       */
      className="relative h-[250svh]"
      aria-label="Experience"
    >
      {/* COIN MORPH, DISABLED, PENDING REVISIT. See the note above.
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
        {/* Module header, matched to the other sections' spec labelling. */}
        <div className="pointer-events-none absolute inset-x-5 top-8 z-10 flex items-baseline justify-between sm:inset-x-10 sm:top-[5.5rem]">
          <h2 className="eyebrow m-0 font-normal">Experience</h2>
          <p className="tech-index">SEC 02</p>
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

            {anchors.map((entry, i) => (
              <ExperienceEntry
                key={entry.id}
                entry={entry}
                x={entry.x}
                y={entry.y}
                stageW={size.w}
                stageH={size.h}
                narrow={narrow}
                arrived={reduced || head >= entry.anchor}
                current={reduced ? i === 0 : i === currentIdx}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
