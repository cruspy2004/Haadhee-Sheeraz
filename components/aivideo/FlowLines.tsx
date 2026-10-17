'use client';

import { useEffect, useRef } from 'react';

type Line = {
  /** Left and right ends, as a fraction of viewport height. */
  y0: number;
  y1: number;
  /** Slow swell across the whole width. */
  amp: number;
  freq: number;
  speed: number;
  phase: number;
  alpha: number;
  width: number;
  /** Optional tight ripple confined to one stretch of the line. */
  ripple?: { at: number; spread: number; amp: number; freq: number };
};

/*
 * Hand-placed rather than random so the composition is the same on every
 * load. Kept to a tight band around the headline (about 40 to 65 percent
 * of the hero's height), crossing gently, with one line carrying a tight
 * ripple out on the right.
 */
const LINES: Line[] = [
  { y0: 0.43, y1: 0.39, amp: 8, freq: 0.9, speed: 0.22, phase: 0.0, alpha: 0.2, width: 1.2, ripple: { at: 0.8, spread: 0.07, amp: 22, freq: 9 } },
  { y0: 0.47, y1: 0.55, amp: 10, freq: 0.7, speed: 0.16, phase: 1.3, alpha: 0.16, width: 1 },
  { y0: 0.52, y1: 0.47, amp: 12, freq: 0.6, speed: 0.12, phase: 2.1, alpha: 0.22, width: 1.3 },
  { y0: 0.56, y1: 0.62, amp: 9, freq: 1.1, speed: 0.19, phase: 0.6, alpha: 0.14, width: 1 },
  { y0: 0.62, y1: 0.45, amp: 11, freq: 0.5, speed: 0.1, phase: 3.0, alpha: 0.14, width: 1 },
  { y0: 0.65, y1: 0.6, amp: 7, freq: 1.4, speed: 0.24, phase: 4.2, alpha: 0.12, width: 1 },
  { y0: 0.5, y1: 0.51, amp: 14, freq: 0.45, speed: 0.08, phase: 5.1, alpha: 0.11, width: 1 },
  { y0: 0.59, y1: 0.56, amp: 6, freq: 1.8, speed: 0.28, phase: 2.7, alpha: 0.1, width: 1 },
];

const STEP = 8; // px between samples along each line
const RADIUS = 150; // how far the cursor's influence reaches
const PUSH = 42; // how far a line moves out of the cursor's way

/**
 * Thin lines drifting behind the hero. They move on their own all the
 * time and part around the cursor as it passes, like a finger drawn
 * through water.
 *
 * Hero only: the canvas fills its parent, and the loop stops while the
 * hero is scrolled out of view or the tab is hidden. Reduced motion gets
 * one still frame.
 */
export default function FlowLines() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;

    // The drawn cursor eases toward the real one, so the lines settle
    // rather than snapping. Strength fades out when the pointer leaves.
    const mouse = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4, s: 0, ts: 0 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const box = canvas.parentElement?.getBoundingClientRect();
      w = box?.width ?? window.innerWidth;
      h = box?.height ?? window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      mouse.s += (mouse.ts - mouse.s) * 0.06;

      ctx.clearRect(0, 0, w, h);
      const r2 = RADIUS * RADIUS * 2;

      for (const line of LINES) {
        ctx.beginPath();
        for (let x = -STEP; x <= w + STEP; x += STEP) {
          const u = x / w;
          let y =
            (line.y0 + (line.y1 - line.y0) * u) * h +
            line.amp * Math.sin(u * Math.PI * 2 * line.freq + t * line.speed + line.phase) +
            line.amp * 0.4 * Math.sin(u * Math.PI * 2 * line.freq * 2.3 - t * line.speed * 1.7);

          if (line.ripple) {
            const { at, spread, amp, freq } = line.ripple;
            const env = Math.exp(-((u - at) ** 2) / (2 * spread * spread));
            y += env * amp * Math.sin(u * Math.PI * 2 * freq - t * 1.2);
          }

          if (mouse.s > 0.001) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const fall = Math.exp(-(dx * dx + dy * dy) / r2);
            // tanh keeps the push smooth through the cursor's own height.
            y += Math.tanh(dy / 28) * PUSH * fall * mouse.s;
          }

          if (x === -STEP) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(20, 20, 22, ${line.alpha})`;
        ctx.lineWidth = line.width;
        ctx.stroke();
      }
    };

    resize();

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(0);
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    if (reduced) {
      draw(0);
      return () => ro.disconnect();
    }

    const onMove = (e: PointerEvent) => {
      // The canvas scrolls with the page, so map into its own space.
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
      mouse.ts = 1;
      // First contact: start from the pointer instead of sweeping in.
      if (mouse.x < -1e3) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
    };
    const onLeave = () => {
      mouse.ts = 0;
    };

    // Only animate while the hero is on screen.
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    let raf = 0;
    const loop = (ms: number) => {
      if (visible && !document.hidden) draw(ms / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-0" />;
}
