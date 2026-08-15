'use client';

import { useEffect, useRef, useState } from 'react';
import {
  CLIPS,
  COLS,
  DISPLAY,
  RUN_SPEED,
  ROWS,
  SHEET_SRC,
  frameAt,
  type ClipName,
} from './jack.config';

type Props = {
  /** Lines Jack delivers, in order. */
  lines: string[];
  /** Where he stops, as a fraction of the container width. */
  stopAt?: number;
  /** Run off to the right once he's finished talking. */
  exitAfter?: boolean;
  /** Seconds each line stays up. */
  lineSeconds?: number;
};

type Phase = 'idle' | 'running' | 'talking' | 'leaving' | 'gone';

/**
 * Jack, arriving somewhere and saying something.
 *
 * Shared by every section that isn't the hero: he runs in from the left
 * edge, stops, delivers his lines, then either settles or carries on out
 * to the right. The hero keeps its own component because only there does
 * he jump the portrait.
 *
 * Motion is the same as the hero's — constant velocity, frames on a fixed
 * clock — so he reads as the same animal in both places.
 */
export default function JackScene({
  lines,
  stopAt = 0.42,
  exitAfter = true,
  lineSeconds = 2.6,
}: Props) {
  const [ready, setReady] = useState(false);
  const [line, setLine] = useState(-1);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const dogRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef(0);
  const started = useRef(false);

  const st = useRef({
    phase: 'idle' as Phase,
    x: -DISPLAY,
    stopX: 0,
    width: 0,
    clip: 'run' as ClipName,
    clipStart: 0,
    talkStart: 0,
  });

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const img = new Image();
    img.onload = () => setReady(true);
    img.src = SHEET_SRC;
    if (reduced) setLine(0);
  }, []);

  /* Kick off when the section reaches the viewport. */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !ready) return;

    const check = () => {
      if (started.current) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.8 && r.bottom > 0) {
        started.current = true;
        st.current.width = r.width;
        st.current.stopX = r.width * stopAt;
        st.current.phase = 'running';
        // clipStart is deliberately left for the loop to set from its own
        // rAF timestamp — see frameAt() on why mixing the two clocks here
        // produces a negative elapsed time.
        st.current.clipStart = -1;
      }
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [ready, stopAt]);

  useEffect(() => {
    if (!ready) return;
    const dog = dogRef.current;
    if (!dog) return;

    let last = performance.now();

    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop);
      const s = st.current;
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;

      // Adopt this frame's clock the first time we run after a handler
      // asked for a clip change.
      if (s.clipStart < 0) s.clipStart = now;

      if (s.phase === 'running') {
        s.x += RUN_SPEED * dt;
        s.clip = 'run';
        if (s.x >= s.stopX) {
          s.x = s.stopX;
          s.phase = 'talking';
          s.talkStart = now;
          s.clip = 'bark';
          s.clipStart = now;
          setLine(0);
        }
      } else if (s.phase === 'talking') {
        const elapsed = (now - s.talkStart) / 1000;
        const idx = Math.floor(elapsed / lineSeconds);
        if (idx >= lines.length) {
          if (exitAfter) {
            s.phase = 'leaving';
            s.clip = 'run';
            s.clipStart = now;
            setLine(-1);
          } else {
            s.phase = 'gone';
            s.clip = 'sit';
            s.clipStart = now;
          }
        } else {
          setLine(idx);
          // Bark on the first second of each line, then sit and listen.
          const intoLine = elapsed - idx * lineSeconds;
          s.clip = intoLine < 0.9 ? 'bark' : 'sit';
        }
      } else if (s.phase === 'leaving') {
        s.x += RUN_SPEED * dt;
        s.clip = 'run';
        if (s.x > s.width + DISPLAY) s.phase = 'gone';
      }

      const [row, col] = frameAt(CLIPS[s.clip], now - s.clipStart);

      dog.style.transform = `translate3d(${Math.round(s.x)}px, 0, 0)`;
      dog.style.backgroundPosition = `${-col * DISPLAY}px ${-row * DISPLAY}px`;
      dog.style.opacity =
        s.phase === 'idle' || (s.phase === 'gone' && exitAfter) ? '0' : '1';
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [ready, lines.length, exitAfter, lineSeconds]);

  if (!ready) return null;

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none relative h-[86px] w-full overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={dogRef}
        className="absolute bottom-0 left-0"
        style={{
          width: DISPLAY,
          height: DISPLAY,
          backgroundImage: `url(${SHEET_SRC})`,
          backgroundSize: `${COLS * DISPLAY}px ${ROWS * DISPLAY}px`,
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
          opacity: 0,
          willChange: 'transform',
        }}
      />

      {line >= 0 && lines[line] && (
        <p
          className="jack-line meta absolute bottom-[46px]"
          style={{ left: `calc(${stopAt * 100}% + ${DISPLAY - 8}px)` }}
          key={line}
        >
          {lines[line]}
        </p>
      )}

      <style jsx>{`
        .jack-line {
          background: var(--silver-bright);
          color: var(--ink);
          padding: 7px 12px;
          border-radius: 10px;
          white-space: nowrap;
          max-width: 60vw;
          overflow: hidden;
          text-overflow: ellipsis;
          animation: jack-say-in 260ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .jack-line::after {
          content: '';
          position: absolute;
          left: -4px;
          bottom: 10px;
          width: 10px;
          height: 10px;
          background: var(--silver-bright);
          transform: rotate(45deg);
          border-radius: 2px;
        }
        @keyframes jack-say-in {
          from {
            opacity: 0;
            transform: translateY(5px) scale(0.94);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
