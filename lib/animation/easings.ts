/**
 * Shared motion language (design-doc §4).
 *
 * Every component imports curves and durations from here rather than
 * redefining them — principle 12 says consistency IS the polish.
 */

export const EASE_ENTRANCE = [0.16, 1, 0.3, 1] as const; // expo-out
export const EASE_EXIT = [0.7, 0, 0.84, 0] as const; // mirrored, accelerating out
export const EASE_AMBIENT = [0.65, 0, 0.35, 1] as const; // symmetric, no harsh start/stop
export const EASE_OVERSHOOT = [0.34, 1.56, 0.64, 1] as const; // hover/press feedback only

const css = (c: readonly number[]) => `cubic-bezier(${c.join(', ')})`;

export const CSS_EASE_ENTRANCE = css(EASE_ENTRANCE);
export const CSS_EASE_EXIT = css(EASE_EXIT);
export const CSS_EASE_AMBIENT = css(EASE_AMBIENT);
export const CSS_EASE_OVERSHOOT = css(EASE_OVERSHOOT);

/** GSAP's own string form of the same curves. */
export const GSAP_EASE_ENTRANCE = `cubic-bezier(${EASE_ENTRANCE.join(',')})`;
export const GSAP_EASE_EXIT = `cubic-bezier(${EASE_EXIT.join(',')})`;
export const GSAP_EASE_AMBIENT = `cubic-bezier(${EASE_AMBIENT.join(',')})`;

/** Principle 9 — duration scales with weight. Seconds, for GSAP/Framer. */
export const DUR = {
  micro: 0.2, // hover, button          150-250ms
  component: 0.45, // card, nav item    350-500ms
  section: 1.6, // path animation       1200-2000ms
  curtainClose: 0.55, //                500-600ms
  curtainOpen: 0.8, //                  700-900ms
  pivot: 1.0, //                        900-1100ms
  swipe: 0.6, // project crossfade      500-700ms
} as const;

/** Principle 5 — grouped elements stagger 50-70ms; secondaries lag 100-150ms. */
export const STAGGER = 0.06;
export const SECONDARY_LAG = 0.13;

/** Principle 2 — anticipation is 10-15% of the main move, 80-120ms, ease-in. */
export const ANTICIPATION_DUR = 0.1;

/** Principle 3 — the non-focal element recedes rather than disappearing. */
export const DEFOCUS = { opacity: 0.4, blur: 6 } as const;
