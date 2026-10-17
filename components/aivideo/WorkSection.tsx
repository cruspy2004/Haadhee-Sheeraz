'use client';

import { allExamples, categories, ratioValue, type Category, type Example } from './aivideo.data';
import { useAutoplayInView, withFirstFrame } from './autoplay';
import { ExpandChip } from './Hero';
import { MONO, focusRing } from './ui';

/** Position of each example down the whole page, for the zig-zag. */
const order = new Map(allExamples.map((a, i) => [a.example.id, i]));

/**
 * One block per category, examples as cards that zig-zag down the whole
 * page: video right, then left, then right, regardless of where a
 * category starts or ends, so no two neighbouring rows match.
 *
 * Every card has the same stage, a fixed-height grey panel the video sits
 * in, whatever its ratio. A 9:16 ad and a 16:9 promo then occupy the same
 * footprint, which is what makes the alternation read as a rhythm.
 */
export default function WorkSection({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <section id="work" className="relative mx-auto w-full max-w-6xl scroll-mt-24 px-5 pb-10 pt-16 sm:px-10 sm:pt-24">
      <div className="mx-auto mb-16 max-w-2xl text-center sm:mb-24">
        <h2 className="font-script text-[clamp(2.5rem,5.5vw,4.25rem)] font-bold leading-none tracking-[-0.05em] text-ink">
          The work.
        </h2>
        <p className="mt-5 font-serif text-[clamp(1.0625rem,1.7vw,1.25rem)] leading-relaxed text-neutral-600">
          Five kinds of AI video. Tap any video to expand it and watch with sound.
        </p>
      </div>

      <div className="space-y-24 sm:space-y-32">
        {categories.map((category) => (
          <CategoryBlock key={category.id} category={category} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

function CategoryBlock({ category, onOpen }: { category: Category; onOpen: (id: string) => void }) {
  const n = category.examples.length;
  return (
    <div id={category.id} className="scroll-mt-24">
      <div className="mb-8 flex flex-col gap-3 sm:mb-10 md:flex-row md:items-end md:justify-between md:gap-10">
        <div>
          <p className={`mb-3 text-[0.75rem] uppercase tracking-[0.08em] text-neutral-600 ${MONO}`}>
            {n} {n === 1 ? 'example' : 'examples'}
          </p>
          <h3 className="font-script text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.02] tracking-[-0.045em] text-ink">
            {category.name}
          </h3>
        </div>
        <p className="max-w-sm font-serif text-[1.0625rem] leading-relaxed text-neutral-600 md:text-right">
          {category.intro}
        </p>
      </div>

      <div className="space-y-8 sm:space-y-10">
        {category.examples.map((example) => (
          <ExampleCard
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

function ExampleCard({
  example,
  videoRight,
  onOpen,
}: {
  example: Example;
  videoRight: boolean;
  onOpen: () => void;
}) {
  return (
    <article
      // Side by side from lg, not md: at tablet widths the text column
      // got so narrow the write-up outgrew the video stage.
      // Frosted rather than solid white, so the page is not a stack of
      // white panels and the lines still read faintly behind each card.
      className={`grid items-center gap-2 rounded-[28px] border border-neutral-200/80 bg-white/55 p-3 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.25)] sm:p-4 lg:gap-4 ${
        videoRight ? 'lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]' : 'lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]'
      }`}
    >
      {/* Stacked, the video always comes first, then its write-up. */}
      <div className={videoRight ? 'lg:order-2' : 'lg:order-1'}>
        <Stage example={example} onOpen={onOpen} />
      </div>

      <div className={`px-3 pb-4 pt-5 sm:px-5 lg:px-8 lg:py-6 ${videoRight ? 'lg:order-1' : 'lg:order-2'}`}>
        <h4 className="font-script text-[clamp(1.625rem,2.6vw,2.125rem)] font-bold leading-tight tracking-[-0.035em] text-ink">
          {example.title}
        </h4>
        <p className="mt-4 max-w-[44ch] font-serif text-[1.125rem] leading-relaxed text-neutral-600">
          {example.summary}
        </p>

        <dl className={`mt-7 divide-y divide-neutral-200 border-y border-neutral-200 text-[0.8125rem] ${MONO}`}>
          <Spec label="Length" value={example.length} />
          <Spec label="Frame" value={example.ratio} />
          <Spec label="Made for" value={example.madeFor} />
        </dl>

        <button
          type="button"
          onClick={onOpen}
          className={`press mt-7 inline-flex min-h-[46px] items-center gap-2 rounded-full bg-ink px-5 text-[0.875rem] font-medium text-white hover:bg-neutral-800 ${MONO} ${focusRing}`}
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M8.5 1.5h4v4M5.5 12.5h-4v-4M12.5 1.5 8 6M1.5 12.5 6 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Watch with sound
        </button>
      </div>
    </article>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6 py-2.5">
      <dt className="shrink-0 whitespace-nowrap uppercase tracking-[0.06em] text-neutral-600">{label}</dt>
      <dd className="m-0 text-right text-ink">{value}</dd>
    </div>
  );
}

/**
 * The grey panel a video sits in. `--fit` is the tallest the video may be:
 * a fixed stage height side by side (lg), a share of the viewport stacked. A
 * tall cut is limited by it; a wide one by the panel's width.
 */
function Stage({ example, onOpen }: { example: Example; onOpen: () => void }) {
  const ref = useAutoplayInView<HTMLVideoElement>();
  const r = ratioValue(example.ratio);

  return (
    <div className="flex items-center justify-center rounded-[20px] bg-[#ebebe8] p-4 [--fit:62svh] sm:p-6 lg:h-[min(70svh,580px)] lg:p-8 lg:[--fit:calc(min(70svh,580px)_-_4rem)]">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Expand ${example.title}`}
        className={`group relative block overflow-hidden rounded-[14px] bg-neutral-200 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.45)] ${focusRing}`}
        style={{ aspectRatio: r, width: `min(100%, calc(var(--fit) * ${r}))` }}
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
        <ExpandChip />
      </button>
    </div>
  );
}
