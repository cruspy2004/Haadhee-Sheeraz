/**
 * Geometry for the Experience path (PRD §4.3, design-doc §5).
 *
 * The path is generated in the sticky viewport's own pixel space, so one
 * SVG user unit === one CSS pixel. That means getPointAtLength() hands back
 * coordinates the entries can be positioned with directly — no hardcoded
 * pixel offsets, and the layout survives any later retune of the shape.
 */

export type Pt = { x: number; y: number };

/**
 * A vertical snake with enough run for three entries to breathe. Desktop
 * weaves around the centre so entries can alternate sides; narrow screens
 * hug the left edge with every entry stacked to its right.
 */
export function buildSnakePath(w: number, h: number, narrow: boolean): string {
  if (w <= 0 || h <= 0) return '';

  const pts: Pt[] = narrow
    ? [
        { x: w * 0.16, y: h * 0.02 },
        { x: w * 0.3, y: h * 0.2 },
        { x: w * 0.12, y: h * 0.42 },
        { x: w * 0.3, y: h * 0.64 },
        { x: w * 0.14, y: h * 0.85 },
        { x: w * 0.22, y: h * 1.0 },
      ]
    : [
        { x: w * 0.5, y: h * 0.02 },
        { x: w * 0.63, y: h * 0.19 },
        { x: w * 0.37, y: h * 0.4 },
        { x: w * 0.63, y: h * 0.62 },
        { x: w * 0.42, y: h * 0.84 },
        { x: w * 0.5, y: h * 1.0 },
      ];

  return catmullRom(pts);
}

/** Catmull-Rom through the points, emitted as cubic beziers. */
export function catmullRom(points: Pt[], tension = 1): string {
  if (points.length < 2) return '';
  let d = `M ${round(points[0].x)} ${round(points[0].y)}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;

    const c1x = p1.x + ((p2.x - p0.x) / 6) * tension;
    const c1y = p1.y + ((p2.y - p0.y) / 6) * tension;
    const c2x = p2.x - ((p3.x - p1.x) / 6) * tension;
    const c2y = p2.y - ((p3.y - p1.y) / 6) * tension;

    d += ` C ${round(c1x)} ${round(c1y)}, ${round(c2x)} ${round(c2y)}, ${round(
      p2.x
    )} ${round(p2.y)}`;
  }
  return d;
}

const round = (n: number) => Math.round(n * 100) / 100;

/**
 * Measures a path string without needing it mounted in the document, so
 * anchor positions can be derived during render rather than after paint.
 */
export function measurePath(d: string) {
  if (typeof document === 'undefined' || !d) {
    return { length: 0, pointAt: () => ({ x: 0, y: 0 }) };
  }

  const el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  el.setAttribute('d', d);
  const length = el.getTotalLength();

  return {
    length,
    /** t is normalised 0-1 along the path. */
    pointAt: (t: number): Pt => {
      const p = el.getPointAtLength(Math.max(0, Math.min(1, t)) * length);
      return { x: p.x, y: p.y };
    },
  };
}

/**
 * Maps a global 0-1 scroll progress onto a sub-range, returning 0-1 within
 * that window. Used to sequence the coin morph, the flip and the path
 * travel off a single progress value (design-doc §5: no seam).
 */
export function slice(progress: number, from: number, to: number): number {
  if (to <= from) return 0;
  return Math.max(0, Math.min(1, (progress - from) / (to - from)));
}
