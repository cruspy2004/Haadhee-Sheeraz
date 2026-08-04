'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Options = {
  /** Pin the element for the duration of the scroll range. */
  pin?: boolean;
  /** Scroll distance the section occupies, e.g. '+=300%'. */
  end?: string;
  start?: string;
  /** Smooths the progress value's response to fast scrubbing. */
  scrub?: number | boolean;
};

/**
 * Wraps ScrollTrigger and hands back a single 0-1 progress value for a
 * section. Design-doc §5: the coin morph and the path trail are driven by
 * the *same* value so there is no seam between them.
 *
 * Returns a ref (attach to the section) and the live progress. The ref-held
 * copy is there for rAF-driven consumers that must not re-render per frame.
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>(
  options: Options = {}
) {
  const { pin = false, end = '+=200%', start = 'top top', scrub = true } = options;

  const ref = useRef<T | null>(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      end,
      pin,
      scrub,
      anticipatePin: pin ? 1 : 0,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        setProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [pin, end, start, scrub]);

  return { ref, progress, progressRef };
}

/** True when the visitor has asked for reduced motion (design-doc §7). */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
