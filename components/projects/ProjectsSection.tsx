'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { projects } from './projects.data';
import { CSS_EASE_AMBIENT, DUR, EASE_ENTRANCE } from '@/lib/animation/easings';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';
import JackScene from '@/components/jack/JackScene';

const DRAG_THRESHOLD = 56;

/**
 * PRD §4.5 / design-doc §6. Horizontal is a distinct axis here: swipe,
 * drag and arrow keys move between projects, while vertical scroll passes
 * straight through so scrolling down still exits into Contact.
 *
 * Nothing is pinned — the section is a single viewport-tall panel, so the
 * page's normal scroll is never intercepted.
 */
export default function ProjectsSection() {
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [hintSeen, setHintSeen] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const drag = useRef<{ x: number; y: number; locked: null | 'x' | 'y' } | null>(
    null
  );
  const wheelLock = useRef(false);

  const go = useCallback((dir: number) => {
    setIndex((i) => Math.min(projects.length - 1, Math.max(0, i + dir)));
    setHintSeen(true);
  }, []);

  /*
   * Only claim the horizontal axis while the section is actually on screen.
   * Measured off scroll rather than an IntersectionObserver: IO callbacks
   * are delivered on the frame lifecycle, so the very first evaluation can
   * be deferred indefinitely if no frame has been produced yet.
   */
  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const check = () => {
      const r = el.getBoundingClientRect();
      const visible =
        Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
      setInView(visible / Math.min(r.height, window.innerHeight) > 0.55);
    };

    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);

  useEffect(() => {
    if (!inView) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [inView, go]);

  /* Trackpad horizontal swipes. deltaY is deliberately left alone. */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !inView) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY) * 1.4) return;
      if (Math.abs(e.deltaX) < 24 || wheelLock.current) return;
      e.preventDefault();
      wheelLock.current = true;
      go(e.deltaX > 0 ? 1 : -1);
      window.setTimeout(() => (wheelLock.current = false), 520);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [inView, go]);

  /* Pointer/touch drag, axis-locked so vertical drags still scroll. */
  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('a,button')) return;
    drag.current = { x: e.clientX, y: e.clientY, locked: null };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;

    if (!d.locked && (Math.abs(dx) > 10 || Math.abs(dy) > 10)) {
      d.locked = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    }
    if (d.locked !== 'x') return;

    if (Math.abs(dx) > DRAG_THRESHOLD) {
      go(dx < 0 ? 1 : -1);
      drag.current = null;
    }
  };

  const endDrag = () => {
    drag.current = null;
  };

  const project = projects[index];

  /* Let the page chrome follow the active panel. */
  useEffect(() => {
    if (!inView) {
      document.body.style.removeProperty('--page-bg');
      return;
    }
    document.body.style.setProperty('--page-bg', project.colorDeep);
  }, [inView, project.colorDeep]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      aria-label="Projects"
      className="relative h-[100svh] w-full overflow-hidden"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      style={{ touchAction: 'pan-y' }}
    >
      {/* Full-screen colour field. Crossfades 500-700ms, EASE_AMBIENT. */}
      {projects.map((p, i) => (
        <div
          key={p.id}
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 100% at 22% 12%, ${p.color} 0%, ${p.colorDeep} 68%, ${p.colorDeep} 100%)`,
            opacity: i === index ? 1 : 0,
            transition: `opacity ${DUR.swipe}s ${CSS_EASE_AMBIENT}`,
          }}
        />
      ))}

      {projects.map((p, i) => (
        <ProjectCard
          key={p.id}
          project={p}
          index={i}
          total={projects.length}
          active={i === index}
        />
      ))}

      {/* Module index, matched to the other sections. */}
      <div
        className="panel-label pointer-events-none absolute right-5 top-8 z-20 sm:right-10 sm:top-12"
        style={{ color: project.ink, opacity: 0.55 }}
      >
        SEC 03
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={() => go(-1)}
        disabled={index === 0}
        aria-label="Previous project"
        className="absolute left-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border transition disabled:opacity-25 sm:left-6"
        style={{ borderColor: `color-mix(in srgb, ${project.ink} 26%, transparent)`, color: project.ink }}
      >
        ←
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        disabled={index === projects.length - 1}
        aria-label="Next project"
        className="absolute right-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border transition disabled:opacity-25 sm:right-6"
        style={{ borderColor: `color-mix(in srgb, ${project.ink} 26%, transparent)`, color: project.ink }}
      >
        →
      </button>

      {/* Progress dots */}
      <div className="absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {projects.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => {
              setIndex(i);
              setHintSeen(true);
            }}
            aria-label={`Go to ${p.name}`}
            aria-current={i === index}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === index ? 30 : 10,
              background: project.ink,
              opacity: i === index ? 0.9 : 0.32,
            }}
          />
        ))}
      </div>

      {/* Discoverability cue — nothing else on the site is horizontal. */}
      <AnimatePresence>
        {inView && !hintSeen && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.7, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5, ease: EASE_ENTRANCE }}
            className="panel-label absolute bottom-7 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap"
            style={{ color: project.ink }}
          >
            Swipe, drag or use ← → · scroll down to continue
          </motion.p>
        )}
      </AnimatePresence>

      {/* Jack runs the bottom of the panel and summarises the work. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
        <JackScene
          stopAt={0.24}
          lineSeconds={2.9}
          lines={[
            'Five shipped projects down here.',
            'Backend for 5,000 users, and 3M views teaching JavaScript.',
            'Click any of them — they all go somewhere real.',
          ]}
        />
      </div>
    </section>
  );
}
