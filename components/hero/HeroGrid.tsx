'use client';

import { useEffect, useRef } from 'react';

/**
 * The hero's measurement grid, lit under the cursor.
 *
 * Pointer position is written straight to CSS custom properties on the
 * element rather than held in React state: this updates on every mouse
 * move, and a state write per move would re-render the hero on each one.
 * The two properties feed a mask on .grid-field::after, so the browser
 * only recomposites — no layout, no paint of the grid itself.
 */
export default function HeroGrid() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const section = el.parentElement;
    if (!section) return;

    let frame = 0;
    let px = 0;
    let py = 0;

    const apply = () => {
      frame = 0;
      el.style.setProperty('--grid-x', `${px}px`);
      el.style.setProperty('--grid-y', `${py}px`);
    };

    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      px = e.clientX - r.left;
      py = e.clientY - r.top;
      // Coalesce to one write per frame; pointermove can fire far faster.
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onEnter = () => el.style.setProperty('--grid-glow', '0.55');
    const onLeave = () => el.style.setProperty('--grid-glow', '0');

    section.addEventListener('pointermove', onMove);
    section.addEventListener('pointerenter', onEnter);
    section.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerenter', onEnter);
      section.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <div ref={ref} className="grid-field" aria-hidden="true" />;
}
