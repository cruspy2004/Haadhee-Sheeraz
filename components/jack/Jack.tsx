'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CELL,
  CLIPS,
  COLS,
  DISPLAY,
  GRAVITY,
  GREET_DELAY,
  HEAD,
  HEAD_RUN_SPEED,
  JUMP_CLEARANCE,
  LAND_MS,
  LAND_SQUASH,
  ROWS,
  RUN_SPEED,
  SHEET_SRC,
  type ClipName,
} from './jack.config';

type Phase =
  | 'waiting'
  | 'entering'
  | 'greeting'
  | 'runToJump'
  | 'jumpToHead'
  | 'crossHead'
  | 'dropOff'
  | 'gone';

type Runtime = {
  phase: Phase;
  x: number;
  y: number; // top of the sprite, viewport px
  vy: number;
  facing: 1 | -1;
  clip: ClipName;
  clipStart: number;
  landedAt: number;
  ground: number;
  headTop: number;
  headLeft: number;
  headRight: number;
  jumpX: number;
  enterX: number;
};

/**
 * Jack — a pixel dog with platformer physics.
 *
 * He waits, trots in from the left, sits and says hello. Clicking him
 * sends him off: he runs at the portrait, jumps the arc up its left side,
 * lands on the head, crosses it, drops down the right and exits.
 *
 * Motion is integrated per frame (impulse + constant gravity) rather than
 * tweened, and sprite frames advance on their own fixed clock with no
 * interpolation — both are what make it read as a platformer rather than
 * as a moving image.
 */
export default function Jack() {
  const [ready, setReady] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const rt = useRef<Runtime | null>(null);
  const rafRef = useRef(0);

  /* Only mount once the sheet actually loads, so a missing asset degrades
     to nothing at all rather than to an invisible clickable box. */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const img = new Image();
    img.onload = () => setReady(true);
    img.onerror = () =>
      console.info(
        `[Jack] sprite sheet not found at ${SHEET_SRC} — Jack is disabled until it is added.`
      );
    img.src = SHEET_SRC;
  }, []);

  /** Recomputes the ground line and the head platform from live layout. */
  const measure = useCallback((): Pick<
    Runtime,
    'ground' | 'headTop' | 'headLeft' | 'headRight' | 'jumpX' | 'enterX'
  > => {
    const media = document.getElementById('hero-media');
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const r = media?.getBoundingClientRect();

    const ground = (r ? r.bottom : vh * 0.86) - DISPLAY;
    const headTop = (r ? r.top + r.height * HEAD.topFrac : vh * 0.3) - DISPLAY;
    const headLeft = r ? r.left + r.width * HEAD.leftFrac : vw * 0.4;
    const headRight = r ? r.left + r.width * HEAD.rightFrac : vw * 0.6;

    return {
      ground,
      headTop,
      headLeft,
      headRight,
      // Start the jump early enough that the parabola's rise covers the gap.
      jumpX: headLeft - 150,
      enterX: Math.max(24, vw * 0.08),
    };
  }, []);

  const start = useCallback(() => {
    if (!rt.current || rt.current.phase !== 'greeting') return;
    setShowBubble(false);
    rt.current.phase = 'runToJump';
    rt.current.clip = 'run';
    rt.current.clipStart = performance.now();
  }, []);

  useEffect(() => {
    if (!ready) return;
    const node = nodeRef.current;
    if (!node) return;

    const m = measure();
    rt.current = {
      phase: 'waiting',
      x: -DISPLAY * 1.5,
      y: m.ground,
      vy: 0,
      facing: 1,
      clip: 'idle',
      clipStart: performance.now(),
      landedAt: 0,
      ...m,
    };

    const enterTimer = window.setTimeout(() => {
      if (!rt.current) return;
      rt.current.phase = 'entering';
      rt.current.clip = 'run';
      rt.current.clipStart = performance.now();
    }, GREET_DELAY);

    const onResize = () => {
      if (!rt.current) return;
      Object.assign(rt.current, measure());
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onResize, { passive: true });

    let last = performance.now();

    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop);
      const s = rt.current;
      if (!s) return;

      // Clamp dt so a backgrounded tab does not teleport him on return.
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;

      switch (s.phase) {
        case 'entering': {
          s.x += RUN_SPEED * dt;
          if (s.x >= s.enterX) {
            s.x = s.enterX;
            s.phase = 'greeting';
            s.clip = 'bark';
            s.clipStart = now;
            setShowBubble(true);
            setInteractive(true);
          }
          break;
        }

        case 'runToJump': {
          s.x += RUN_SPEED * dt;
          if (s.x >= s.jumpX) {
            // Impulse sized to just clear the platform: v = sqrt(2*g*h).
            const rise = s.ground - s.headTop + JUMP_CLEARANCE;
            s.vy = -Math.sqrt(2 * GRAVITY * Math.max(rise, 1));
            s.phase = 'jumpToHead';
            s.clip = 'jump';
            s.clipStart = now;
          }
          break;
        }

        case 'jumpToHead': {
          s.vy += GRAVITY * dt;
          s.y += s.vy * dt;
          s.x += RUN_SPEED * dt;

          s.clip = s.vy < -60 ? 'jump' : s.vy > 60 ? 'fall' : 'apex';

          // Land only while descending and actually over the platform.
          if (s.vy > 0 && s.y >= s.headTop && s.x + DISPLAY * 0.5 >= s.headLeft) {
            s.y = s.headTop;
            s.vy = 0;
            s.phase = 'crossHead';
            s.clip = 'land';
            s.clipStart = now;
            s.landedAt = now;
          }
          // Missed the platform entirely — keep falling and exit below.
          if (s.y > window.innerHeight + DISPLAY) {
            s.phase = 'gone';
            setInteractive(false);
          }
          break;
        }

        case 'crossHead': {
          if (now - s.landedAt > LAND_MS) {
            if (s.clip === 'land') {
              s.clip = 'run';
              s.clipStart = now;
            }
            s.x += HEAD_RUN_SPEED * dt;
            if (s.x >= s.headRight) {
              s.phase = 'dropOff';
              s.vy = -260; // small hop off the edge
              s.clip = 'jump';
              s.clipStart = now;
            }
          }
          break;
        }

        /*
         * Off the head and straight down, out through the bottom of the
         * screen. There is deliberately no ground collision and no run-off
         * here: the jump simply never lands, which is what sells him
         * leaving the scene rather than wandering to the corner.
         */
        case 'dropOff': {
          s.vy += GRAVITY * dt;
          s.y += s.vy * dt;
          // A small forward carry so it reads as a hop off the edge, not
          // a trapdoor — but nothing like a run.
          s.x += HEAD_RUN_SPEED * 0.35 * dt;
          s.clip = s.vy > 60 ? 'fall' : 'apex';

          if (s.y > window.innerHeight + DISPLAY) {
            s.phase = 'gone';
            setInteractive(false);
          }
          break;
        }
      }

      /* ---- render ---- */
      const clip = CLIPS[s.clip];
      const elapsed = (now - s.clipStart) / 1000;
      const total = clip.frames.length;
      const i = clip.loop
        ? Math.floor(elapsed * clip.fps) % total
        : Math.min(Math.floor(elapsed * clip.fps), total - 1);
      const [row, col] = clip.frames[i];

      // Squash release on touchdown — the only non-physics flourish.
      const sinceLand = now - s.landedAt;
      const squash =
        sinceLand < LAND_MS
          ? LAND_SQUASH + (1 - LAND_SQUASH) * (sinceLand / LAND_MS)
          : 1;

      node.style.transform = `translate3d(${Math.round(s.x)}px, ${Math.round(
        s.y
      )}px, 0) scaleX(${s.facing}) scaleY(${squash})`;
      node.style.backgroundPosition = `${-col * DISPLAY}px ${-row * DISPLAY}px`;
      node.style.visibility = s.phase === 'waiting' || s.phase === 'gone' ? 'hidden' : 'visible';
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.clearTimeout(enterTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onResize);
    };
  }, [ready, measure]);

  if (!ready) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[45]">
      <div
        ref={nodeRef}
        onClick={start}
        role={interactive ? 'button' : undefined}
        aria-label={interactive ? 'Jack the dog — click to send him running' : undefined}
        tabIndex={interactive ? 0 : -1}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            start();
          }
        }}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: DISPLAY,
          height: DISPLAY,
          backgroundImage: `url(${SHEET_SRC})`,
          backgroundSize: `${COLS * DISPLAY}px ${ROWS * DISPLAY}px`,
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
          transformOrigin: '50% 100%',
          visibility: 'hidden',
          cursor: interactive ? 'pointer' : 'default',
          pointerEvents: interactive ? 'auto' : 'none',
          willChange: 'transform',
        }}
      />

      {showBubble && <Bubble onClick={start} />}
    </div>
  );
}

/** Speech bubble anchored to Jack's greeting position. */
function Bubble({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="jack-bubble pointer-events-auto absolute"
      style={{
        left: `max(24px, 8vw)`,
        bottom: `calc(14vh + ${DISPLAY}px)`,
      }}
    >
      <span className="font-mono text-[length:var(--t-meta)] tracking-[0.04em]">
        Hi, I&rsquo;m Jack
      </span>
      <style jsx>{`
        .jack-bubble {
          background: var(--silver-bright);
          color: var(--ink);
          padding: 8px 14px;
          border-radius: 12px;
          white-space: nowrap;
          animation: jack-pop 320ms cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.7);
        }
        .jack-bubble::after {
          content: '';
          position: absolute;
          left: 22px;
          bottom: -6px;
          width: 12px;
          height: 12px;
          background: var(--silver-bright);
          transform: rotate(45deg);
          border-radius: 2px;
        }
        @keyframes jack-pop {
          from {
            opacity: 0;
            transform: translateY(6px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </button>
  );
}
