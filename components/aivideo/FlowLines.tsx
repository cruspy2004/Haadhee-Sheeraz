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
 * load: gentle crossings through the middle of the hero, one line with a
 * tight ripple out on the right, the way the reference has it.
 */
const LINES: Line[] = [
  { y0: 0.37, y1: 0.31, amp: 10, freq: 0.9, speed: 0.22, phase: 0.0, alpha: 0.2, width: 1.2, ripple: { at: 0.8, spread: 0.07, amp: 26, freq: 9 } },
  { y0: 0.42, y1: 0.57, amp: 14, freq: 0.7, speed: 0.16, phase: 1.3, alpha: 0.16, width: 1 },
  { y0: 0.53, y1: 0.46, amp: 18, freq: 0.6, speed: 0.12, phase: 2.1, alpha: 0.22, width: 1.3 },
  { y0: 0.58, y1: 0.72, amp: 12, freq: 1.1, speed: 0.19, phase: 0.6, alpha: 0.13, width: 1 },
  { y0: 0.74, y1: 0.4, amp: 16, freq: 0.5, speed: 0.1, phase: 3.0, alpha: 0.14, width: 1 },
  { y0: 0.82, y1: 0.74, amp: 9, freq: 1.4, speed: 0.24, phase: 4.2, alpha: 0.12, width: 1 },
  { y0: 0.47, y1: 0.49, amp: 22, freq: 0.45, speed: 0.08, phase: 5.1, alpha: 0.1, width: 1 },
  { y0: 0.65, y1: 0.6, amp: 8, freq: 1.8, speed: 0.28, phase: 2.7, alpha: 0.09, width: 1 },
];

const STEP = 8; // px between samples along each line
const RADIUS = 150; // how far the cursor's influence reaches
const PUSH = 42; // how far a line moves out of the cursor's way

/**
 * Thin lines drifting behind the whole page. They move on their own all
 * the time and part around the cursor as it passes, like a finger drawn
 * through water.
 *
 * Fixed to the viewport so the motion stays behind whatever is on screen.
 * The loop pauses with the tab, and reduced motion gets one still frame.
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
      w = window.innerWidth;
      h = window.innerHeight;
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

    if (reduced) {
      draw(0);
      const still = () => {
        resize();
        draw(0);
      };
      window.addEventListener('resize', still);
      return () => window.removeEventListener('resize', still);
    }

    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
      mouse.ts = 1;
      // First contact: start from the pointer instead of sweeping in.
      if (mouse.x < -1e3) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
    };
    const onLeave = () => {
      mouse.ts = 0;
    };

    let raf = 0;
    const loop = (ms: number) => {
      if (!document.hidden) draw(ms / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0" />;
}
