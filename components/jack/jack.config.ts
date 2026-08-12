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

/**
 * The head platform, expressed as fractions of the hero media frame rather
 * than pixels, so it survives any resize or re-crop of the portrait.
 */
export const HEAD = {
  topFrac: 0.17, // y of the top of the hair
  leftFrac: 0.3, // x where the skull becomes standable
  rightFrac: 0.72,
};
