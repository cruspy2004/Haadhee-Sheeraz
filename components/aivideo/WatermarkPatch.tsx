import { ratioValue, type Example } from './aivideo.data';

/**
 * A soft circular blur laid over a generator's visible mark baked into a
 * clip. Positioned in fractions of the frame, so it tracks the video at any
 * size, on the card and in the viewer alike. Clicks pass straight through.
 *
 * A page-level patch, not a fix to the file: fullscreen playback shows the
 * clip as exported. Cleaning the file itself needs a re-encode (ffmpeg).
 */
export default function WatermarkPatch({ example }: { example: Example }) {
  const mark = example.watermark;
  if (!mark) return null;
  const r = ratioValue(example.ratio);
  // Same diameter in pixels both ways: width is r times the height.
  const h = mark.size * r;

  return (
    <span
      aria-hidden
      className="pointer-events-none absolute rounded-full"
      style={{
        left: `${(mark.x - mark.size / 2) * 100}%`,
        top: `${(mark.y - h / 2) * 100}%`,
        width: `${mark.size * 100}%`,
        height: `${h * 100}%`,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        maskImage: 'radial-gradient(circle, #000 45%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(circle, #000 45%, transparent 70%)',
      }}
    />
  );
}
