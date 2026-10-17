'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE_ENTRANCE } from '@/lib/animation/easings';

const HOLD_MS = 2200;

/**
 * One word that swaps in place: the current word lifts out and blurs, the
 * next rises in from below, and the slot's width eases to fit it. A grey
 * bar sits behind the word's baseline, the way the reference underlines
 * its key words, with descenders crossing it.
 *
 * Screen readers get the whole list once instead of a word that keeps
 * changing under them. Reduced motion shows the first word and stops.
 */
export default function WordRotator({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [widths, setWidths] = useState<number[]>([]);
  const measure = useRef<(HTMLSpanElement | null)[]>([]);

  // "faster., better., simpler." reads badly aloud; one sentence instead.
  const spoken = `${words.map((w) => w.replace(/[.!?]$/, '')).join(', ')}.`;

  useLayoutEffect(() => {
    const read = () => setWidths(measure.current.map((el) => el?.offsetWidth ?? 0));
    read();
    // Widths change once the real font lands, and when the type scales.
    document.fonts?.ready.then(read);
    window.addEventListener('resize', read);
    return () => window.removeEventListener('resize', read);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), HOLD_MS);
    return () => window.clearInterval(id);
  }, [words.length]);

  return (
    <>
      <span className="sr-only">{spoken}</span>
      <span aria-hidden className="relative inline-block align-baseline">
        {/* Invisible copies, measured for the slot width. */}
        <span className="pointer-events-none invisible absolute left-0 top-0 whitespace-nowrap">
          {words.map((w, k) => (
            <span
              key={w}
              ref={(el) => {
                measure.current[k] = el;
              }}
              className="absolute left-0 top-0"
            >
              {w}
            </span>
          ))}
        </span>

        <motion.span
          className="relative inline-block overflow-hidden whitespace-nowrap pb-[0.22em] align-bottom"
          style={{ marginBottom: '-0.22em' }}
          animate={widths[i] ? { width: widths[i] } : undefined}
          transition={{ duration: 0.5, ease: EASE_ENTRANCE }}
        >
          {/* First in the DOM so the (transformed) word paints over it. */}
          <span className="absolute bottom-[0.3em] left-0 right-[0.05em] h-[0.075em] rounded-full bg-neutral-300" />
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={words[i]}
              className="relative inline-block"
              initial={{ y: '85%', opacity: 0, filter: 'blur(6px)' }}
              animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: '-85%', opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.6, ease: EASE_ENTRANCE }}
            >
              {words[i]}
            </motion.span>
          </AnimatePresence>
        </motion.span>
      </span>
    </>
  );
}
