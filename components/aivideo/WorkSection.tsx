'use client';

import { useState } from 'react';
import { allExamples, categories, ratioValue, type Category, type Example } from './aivideo.data';
import { useAutoplayInView, withFirstFrame } from './autoplay';
import VideoLightbox from './VideoLightbox';
import WatermarkPatch from './WatermarkPatch';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink';

/** Position of each example down the whole page, for the zig-zag. */
const order = new Map(allExamples.map((a, i) => [a.example.id, i]));

/**
 * One block per category. Examples zig-zag down the whole page: the first
 * has its video on the right and the write-up on the left, the next flips,
 * and so on across category breaks, so two neighbouring rows never put
 * the video on the same side. Every video expands to a full-screen viewer
 * with sound.
 */
export default function WorkSection() {
  const [open, setOpen] = useState<number | null>(null);
  const openExample = (id: string) => setOpen(allExamples.findIndex((a) => a.example.id === id));

  return (
    <section id="work" className="mx-auto w-full max-w-7xl scroll-mt-24 px-5 pb-10 pt-24 sm:px-10 sm:pt-32">
      <h2 className="mb-16 font-script text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.045em] text-ink sm:mb-24">
        Choose what you want.
      </h2>

      <div className="space-y-24 sm:space-y-36">
        {categories.map((category) => (
          <CategoryBlock key={category.id} category={category} onOpen={openExample} />
        ))}
      </div>

      {open !== null && (
        <VideoLightbox items={allExamples} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
      )}
    </section>
  );
}

function CategoryBlock({
  category,
  onOpen,
}: {
  category: Category;
  onOpen: (id: string) => void;
}) {
  return (
    <div id={category.id} className="scroll-mt-24">
      <div className="mb-12 flex flex-col gap-3 border-t border-ink pt-6 sm:mb-16 md:flex-row md:items-baseline md:justify-between md:gap-10">
        <h3 className="font-script text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink">
          {category.name}
        </h3>
        <p className="max-w-sm text-[1rem] leading-relaxed text-neutral-600 md:text-right">
          {category.intro}
        </p>
      </div>

      <div className="space-y-20 sm:space-y-28">
        {category.examples.map((example) => (
          <ExampleRow
            key={example.id}
            example={example}
            videoRight={(order.get(example.id) ?? 0) % 2 === 0}
            onOpen={() => onOpen(example.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ExampleRow({
  example,
  videoRight,
  onOpen,
}: {
  example: Example;
  videoRight: boolean;
  onOpen: () => void;
}) {
  const r = ratioValue(example.ratio);
  const landscape = r > 1;

  // Landscape cuts get the wider column so they are not dwarfed by a
  // vertical video further down the page.
  const cols = landscape
    ? videoRight
      ? 'md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]'
      : 'md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]'
    : 'md:grid-cols-2';

  return (
    <article className={`grid items-center gap-8 md:gap-14 lg:gap-20 ${cols}`}>
      {/* On phones the video always comes first, then its write-up. */}
      <div className={videoRight ? 'md:order-2' : 'md:order-1'}>
        <ExampleVideo example={example} onOpen={onOpen} />
      </div>

      <div className={videoRight ? 'md:order-1' : 'md:order-2'}>
        <h4 className="font-script text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
          {example.title}
        </h4>
        <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-relaxed text-neutral-600">
          {example.summary}
        </p>

        <dl className="mt-7 max-w-md divide-y divide-neutral-200 border-y border-neutral-200 text-[0.9375rem]">
          <Spec label="Technique" value={example.technique} />
          <Spec label="Length" value={example.length} />
          <Spec label="Frame" value={example.ratio} />
          <Spec label="Made for" value={example.madeFor} />
        </dl>

        <button
          type="button"
          onClick={onOpen}
          className={`press mt-7 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-ink px-5 text-[0.9375rem] font-medium text-ink hover:bg-ink hover:text-white ${focusRing}`}
        >
          Watch with sound
        </button>
      </div>
    </article>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6 py-2.5">
      {/* #666, not neutral-500: 5:1 on the off-white ground instead of 4.2:1. */}
      <dt className="shrink-0 whitespace-nowrap text-[#666]">{label}</dt>
      <dd className="m-0 text-right text-ink">{value}</dd>
    </div>
  );
}

function ExampleVideo({ example, onOpen }: { example: Example; onOpen: () => void }) {
  const ref = useAutoplayInView<HTMLVideoElement>();
  const r = ratioValue(example.ratio);

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Expand ${example.title}`}
      className={`group relative mx-auto block overflow-hidden rounded-[20px] bg-neutral-100 ${focusRing}`}
      // Tall cuts are capped by viewport height so a 9:16 video never
      // runs off the bottom of the screen; wide ones fill the column.
      style={{ aspectRatio: r, width: `min(100%, calc(76svh * ${r}))` }}
    >
      <video
        ref={ref}
        src={example.poster ? example.src : withFirstFrame(example.src)}
        poster={example.poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-entrance group-hover:scale-[1.02]"
      />
      <WatermarkPatch example={example} />
      <span
        aria-hidden
        className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-2 text-[0.8125rem] font-medium text-ink shadow-[0_6px_20px_-8px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-transform duration-200 group-hover:scale-105"
      >
        <ExpandIcon />
        Expand
      </span>
    </button>
  );
}

function ExpandIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M8.5 1.5h4v4M5.5 12.5h-4v-4M12.5 1.5 8 6M1.5 12.5 6 8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
