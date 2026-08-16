/**
 * Jack — sprite sheet contract and physics constants.
 *
 * The sheet is a 6 x 4 grid of 64 x 64 cells (384 x 256 total), every pose
 * facing RIGHT. Left-facing is produced with scaleX(-1) at render time, so
 * no mirrored frames are needed in the art.
 *
 * Row/column indices below are the single source of truth: if the sheet
 * changes, change these and nothing else.
 */

export const SHEET_SRC = '/jack/jack-sheet.png';
export const CELL = 64; // source pixels per frame
export const COLS = 6;
export const ROWS = 4;

/** On-screen size. Keep an integer multiple of CELL so pixels stay crisp. */
export const DISPLAY = 64;

export type Clip = {
  /** [row, col] of each frame, in play order. */
  frames: [number, number][];
  /** Frames per second for this clip. */
  fps: number;
  loop: boolean;
};

export const CLIPS = {
  /** Standing, weight shifting, occasional blink and tail wag. */
  idle: {
    frames: [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    fps: 6,
    loop: true,
  },
  /** Full run cycle: contact, down, pass, up, contact, down. */
  run: {
    frames: [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
    ],
    fps: 12,
    loop: true,
  },
  /** Held on the way up. */
  jump: { frames: [[2, 0]], fps: 1, loop: false },
  /** Held at the apex, legs tucked. */
  apex: { frames: [[2, 1]], fps: 1, loop: false },
  /** Held on the way down, legs reaching. */
  fall: { frames: [[2, 2]], fps: 1, loop: false },
  /** One-shot squash on touchdown. */
  land: { frames: [[2, 3]], fps: 1, loop: false },
  /** Sitting, used for the greeting and the resting pose. */
  sit: {
    frames: [
      [3, 0],
      [3, 1],
    ],
    fps: 3,
    loop: true,
  },
  /** Mouth closed / open, played while the speech bubble is up. */
  bark: {
    frames: [
      [3, 2],
      [3, 3],
    ],
    fps: 6,
    loop: true,
  },
} satisfies Record<string, Clip>;

export type ClipName = keyof typeof CLIPS;

/**
 * Picks the frame for a clip at a given elapsed time, in milliseconds.
 *
 * Guards two things that both produce `undefined` and crash the
 * destructure at the call site:
 *
 * 1. NEGATIVE ELAPSED. requestAnimationFrame's timestamp is the moment the
 *    frame *began*, so a performance.now() taken inside a scroll or resize
 *    handler during that same frame is LATER than it. Storing that as the
 *    clip's start makes `now - start` negative, and JavaScript's % returns
 *    a negative remainder for negative operands — so frames[-2].
 * 2. NaN, from a start time that was never set.
 *
 * The modulo is Euclidean, so the result is always a valid index.
 */
export function frameAt(clip: Clip, elapsedMs: number): [number, number] {
  const n = clip.frames.length;
  if (n === 0) return [0, 0];

  const raw = Math.floor((Math.max(0, elapsedMs) / 1000) * clip.fps);
  if (!Number.isFinite(raw)) return clip.frames[0] as [number, number];

  const i = clip.loop
    ? ((raw % n) + n) % n
    : Math.min(raw, n - 1);

  return (clip.frames[i] ?? clip.frames[0]) as [number, number];
}

/*
 * Physics. Units are CSS pixels and seconds.
 *
 * Mario's jump is not an eased tween — it is an instantaneous upward
 * impulse followed by constant downward acceleration, which is what
 * produces the parabola. The gravity here is deliberately high relative to
 * the jump height: a low-gravity jump floats and reads as weightless,
 * whereas a fast fall with a short hang time reads as responsive. That
 * asymmetry is the whole feel.
 */
export const GRAVITY = 2400; // px/s²
export const RUN_SPEED = 260; // px/s
export const HEAD_RUN_SPEED = 150; // slower while crossing the head
/** Extra clearance above a platform so the arc peaks over it, not into it. */
export const JUMP_CLEARANCE = 46;
/** Squash applied on touchdown, released over LAND_MS. */
export const LAND_SQUASH = 0.72;
export const LAND_MS = 130;

/** Delay before Jack first appears, in ms. */
export const GREET_DELAY = 1600;

/* ══════════════════════════════════════════════════════════════════
   ⬇⬇⬇  JACK'S LANDING SPOT — EDIT HERE  ⬇⬇⬇

   Where Jack lands when he jumps the portrait. The fractions are of the
   hero photo's frame, not the screen, so they hold at any window size.

   If he lands too LOW (sunk into the hair):  make nudgeY MORE negative
   If he lands too HIGH (floating above):     make nudgeY MORE positive
   If he lands too far left/right:            adjust leftFrac / rightFrac
   ══════════════════════════════════════════════════════════════════ */
export const HEAD = {
  /** Top of the hair, as a fraction down the photo frame. */
  topFrac: 0.17,
  /** Where the skull becomes wide enough to stand on. */
  leftFrac: 0.3,
  /** Where it stops being wide enough. */
  rightFrac: 0.72,
  /** Pixel nudge. Negative = he stands higher. */
  nudgeY: -10,
};
/* ══════════════════════════════════════════════════════════════════
   ⬆⬆⬆  END JACK'S LANDING SPOT  ⬆⬆⬆
   ══════════════════════════════════════════════════════════════════ */
