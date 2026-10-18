'use client';

import { useEffect, useRef } from 'react';
import { ratioValue, type Category, type Example } from './aivideo.data';
import WatermarkPatch from './WatermarkPatch';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

type Item = { example: Example; category: Category };

/**
 * Full-screen viewer, with sound. Dark on purpose, even on a light page:
 * the video is the only thing that should be lit.
 *
 * A native <dialog> opened modally, so focus trapping, Escape and the inert
 * page behind come from the browser rather than from code that can drift.
 * `data-lenis-prevent` plus `overscroll-contain` keep the wheel here;
 * without them Lenis would keep scrolling the page behind the video.
 *
 * Close and the arrows live in a sticky bar of their own: when they floated
 * over the content, a scrolled phone view put Close on top of the video and
 * pushed the arrows below the fold.
 */
export default function VideoLightbox({
  items,
  index,
  onIndex,
  onClose,
}: {
  items: Item[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { example, category } = items[index];
  const r = ratioValue(example.ratio);
  const many = items.length > 1;

  const step = (d: number) => onIndex((index + d + items.length) % items.length);

  // No close() on cleanup: unmounting removes the dialog from the top
  // layer anyway, and under StrictMode's mount-unmount-mount the queued
  // `close` event would fire onClose and shut the viewer it just opened.
  useEffect(() => {
    const el = dialogRef.current;
    if (el && !el.open) el.showModal();
  }, []);

  // Stepping swaps the <video> out. If it held focus, focus would fall to
  // <body>, outside the dialog; keep it on the dialog instead.
  useEffect(() => {
    const el = dialogRef.current;
    if (el && !el.contains(document.activeElement)) el.focus();
  }, [index]);

  useEffect(() => {
    if (!many) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const arrow = `press inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white hover:bg-white/10 ${focusRing}`;

  return (
    <dialog
      ref={dialogRef}
      tabIndex={-1}
      data-lenis-prevent
      aria-label={example.title}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget || (e.target as HTMLElement).dataset.backdrop) onClose();
      }}
      className="m-0 h-[100dvh] max-h-none w-screen max-w-none overflow-y-auto overscroll-contain bg-[#0a0a0a]/[0.97] p-0 text-white outline-none backdrop:bg-black/70"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gap-3 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent px-5 pb-6 pt-5 sm:px-8 sm:pt-7">
        <div className="flex items-center gap-2">
          {many && (
            <>
              <button type="button" onClick={() => step(-1)} aria-label="Previous video" className={arrow}>
                ←
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next video" className={arrow}>
                →
              </button>
              <span className="ml-1 text-[0.875rem] text-white/60">
                {index + 1} of {items.length}
              </span>
            </>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className={`press inline-flex min-h-[44px] items-center rounded-full bg-white px-5 text-[0.9375rem] font-medium text-[#0a0a0a] hover:bg-white/90 ${focusRing}`}
        >
          Close
        </button>
      </div>

      <div
        data-backdrop="true"
        className="mx-auto flex min-h-[calc(100%-6rem)] w-full max-w-7xl flex-col gap-6 px-5 pb-12 sm:px-10 md:flex-row md:items-center md:gap-12"
      >
        <div data-backdrop="true" className="flex flex-1 items-center justify-center">
          <div
            // Capped lower on phones so the write-up starts on screen too.
            className="relative overflow-hidden rounded-2xl bg-black [--cap:60svh] md:[--cap:78svh]"
            style={{ aspectRatio: r, width: `min(100%, calc(var(--cap) * ${r}))` }}
          >
            <video
              key={example.id}
              src={example.src}
              poster={example.poster}
              controls
              autoPlay
              playsInline
              className="absolute inset-0 h-full w-full object-contain"
            />
            <WatermarkPatch example={example} />
          </div>
        </div>

        <aside className="w-full shrink-0 md:w-72">
          <p className="text-[0.875rem] text-white/60">{category.name}</p>
          <h2 className="mt-1 font-script text-[1.5rem] font-semibold leading-tight tracking-[-0.03em] text-white">
            {example.title}
          </h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/75">{example.summary}</p>
          <p className="mt-4 text-[0.875rem] text-white/60">{example.technique}</p>
          <p className="mt-1 text-[0.875rem] text-white/60">
            {example.length}, {example.ratio}
          </p>
        </aside>
      </div>
    </dialog>
  );
}
