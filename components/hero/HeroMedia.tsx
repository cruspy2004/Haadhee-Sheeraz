'use client';

import Image from 'next/image';

/**
 * Drop-in slot for the AI-generated hero video (PRD §4.1, design-doc §8).
 * Point this at a file in /public and the container, sizing, masking and
 * breathing glow all stay exactly as they are — zero layout change.
 */
const HERO_VIDEO_SRC: string | null = null;

/**
 * The photo already sits on crushed black. The radial mask feathers its
 * rectangular crop into the page so no hard edge is ever visible.
 */
const EDGE_MASK =
  'radial-gradient(72% 62% at 50% 44%, #000 42%, rgba(0,0,0,0.85) 62%, rgba(0,0,0,0.25) 84%, transparent 100%)';

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
          sizes="(max-width: 768px) 90vw, 46vw"
          className="object-cover object-center"
        />
      )}
    </div>
  );
}
