'use client';

import Image from 'next/image';

/**
 * Drop-in slot for the AI-generated hero video (PRD §4.1, design-doc §8).
 * Point this at a file in /public and the container, sizing, masking and
 * breathing glow all stay exactly as they are — zero layout change.
 */
const HERO_VIDEO_SRC: string | null = null;

/**
 * Edge treatment.
 *
 * The previous mask was radial-gradient(72% 62% at 50% 44%) — an ellipse
 * narrower than the frame, which cut the shoulders off and faded the
 * bottom of the portrait out well before the container ended. That, not
 * the object-fit crop, was what made it look like most of the photo was
 * missing.
 *
 * This one is deliberately generous: it reaches past the frame on every
 * side (120% x 110%) and is centred low, so only the far corners feather
 * and the bottom edge stays fully opaque — the portrait can run all the
 * way down to the bottom of the screen. The source image is already on
 * pure black, so the sides blend into the page on their own.
 */
const EDGE_MASK =
  'radial-gradient(120% 110% at 50% 55%, #000 70%, rgba(0,0,0,0.6) 88%, transparent 100%)';

export default function HeroMedia() {
  return (
    <div
      className="relative h-full w-full"
      style={{
        maskImage: EDGE_MASK,
        WebkitMaskImage: EDGE_MASK,
      }}
    >
      {HERO_VIDEO_SRC ? (
        <video
          className="h-full w-full object-cover object-center"
          src={HERO_VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <Image
          src="/hero-photo.png"
          alt="Haadhee Sheeraz"
          fill
          priority
          sizes="(max-width: 768px) 94vw, 74vh"
          className="object-cover object-center"
        />
      )}
    </div>
  );
}
