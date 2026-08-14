'use client';

import { useEffect, useRef, useState } from 'react';
import {
  CLIPS,
  COLS,
  DISPLAY,
  ROWS,
  SHEET_SRC,
  type ClipName,
} from './jack.config';

/**
 * Jack, sitting beside the contact form.
 *
 * This is the second half of his run: he drops off the portrait in the
 * hero, falls out through the bottom of the screen, and turns up again
 * down here to nudge the visitor into writing.
 *
 * He sits facing the viewer (row 3 of the sheet is the front-on set) and
 * barks once when the section scrolls into view, then settles.
 */
export default function JackContact() {
  const [ready, setReady] = useState(false);
  const [shown, setShown] = useState(false);
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef(0);
  const shownAt = useRef(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReady(true);
      setShown(true);
      return;
    }
    const img = new Image();
    img.onload = () => setReady(true);
    img.src = SHEET_SRC;
  }, []);

  /* Reveal when the contact panel is actually on screen. */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !ready) return;

    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.85 && !shown) {
        setShown(true);
        shownAt.current = performance.now();
      }
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, [ready, shown]);

  /* Bark on arrival, then settle into the sit. */
  useEffect(() => {
    if (!ready || !shown) return;
    const node = nodeRef.current;
    if (!node) return;
    if (!shownAt.current) shownAt.current = performance.now();

    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop);
      const since = now - shownAt.current;
      const clip: ClipName = since < 1600 ? 'bark' : 'sit';
      const c = CLIPS[clip];
      const i = Math.floor((since / 1000) * c.fps) % c.frames.length;
      const [row, col] = c.frames[i];
      node.style.backgroundPosition = `${-col * DISPLAY}px ${-row * DISPLAY}px`;
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [ready, shown]);

  if (!ready) return null;

  return (
    <div
      ref={wrapRef}
      className="flex items-end gap-3"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 500ms var(--ease-entrance), transform 500ms var(--ease-entrance)',
      }}
    >
      <div
        ref={nodeRef}
        aria-hidden="true"
        style={{
          width: DISPLAY,
          height: DISPLAY,
          flexShrink: 0,
          backgroundImage: `url(${SHEET_SRC})`,
          backgroundSize: `${COLS * DISPLAY}px ${ROWS * DISPLAY}px`,
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
        }}
      />
      <p className="jack-say meta mb-3">Go on — say something.</p>

      <style jsx>{`
        .jack-say {
          position: relative;
          background: var(--silver-bright);
          color: var(--ink);
          padding: 7px 12px;
          border-radius: 10px;
          white-space: nowrap;
        }
        .jack-say::after {
          content: '';
          position: absolute;
          left: -4px;
          bottom: 9px;
          width: 10px;
          height: 10px;
          background: var(--silver-bright);
          transform: rotate(45deg);
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
