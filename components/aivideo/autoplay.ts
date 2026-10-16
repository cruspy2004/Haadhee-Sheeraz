'use client';

import { useEffect, useRef } from 'react';

/**
 * Plays a muted loop only while it is on screen. Seven videos all decoding
 * at once is what makes a page like this stutter on a phone, so anything
 * scrolled away is paused. Reduced motion never autoplays.
 */
export function useAutoplayInView<T extends HTMLVideoElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Rejected when the browser blocks autoplay; the first frame stays.
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}

/**
 * iOS Safari paints nothing for a paused video with no poster. Asking for
 * a time just past zero makes it decode and show the first frame.
 */
export const withFirstFrame = (src: string) =>
  src.includes('#') ? src : `${src}#t=0.05`;
