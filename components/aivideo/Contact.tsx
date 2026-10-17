import { site } from '@/lib/site';
import { MONO, focusRing } from './ui';

const mailto = `mailto:${site.email}?subject=${encodeURIComponent('Content project')}`;

/**
 * One ask, one action. The address is also printed in full so it still
 * works for anyone without a mail client set up.
 */
export default function Contact() {
  return (
    <section id="contact" className="mx-auto w-full max-w-6xl px-5 pb-8 pt-24 sm:px-10 sm:pt-32">
      <div className="rounded-[28px] bg-ink px-6 py-14 text-center text-white sm:px-14 sm:py-20">
        <h2 className="mx-auto max-w-3xl text-balance font-script text-[clamp(2.25rem,5.5vw,4.25rem)] font-bold leading-[1] tracking-[-0.05em] text-white">
          Let’s make your next video.
        </h2>
        <p className="mx-auto mt-6 max-w-lg font-serif text-[1.1875rem] leading-relaxed text-white/70">
          Send me the product and where it will run. I’ll reply with how I
          would make it.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <a
            href={mailto}
            className={`press inline-flex min-h-[52px] items-center rounded-full bg-white px-7 text-[0.9375rem] font-medium text-ink hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${MONO}`}
          >
            Email me
          </a>
          <a href={mailto} className={`text-[0.875rem] text-white/70 underline decoration-white/30 underline-offset-4 hover:text-white ${MONO}`}>
            {site.email}
          </a>
        </div>
      </div>

      <footer className={`mt-8 flex flex-col gap-2 text-[0.75rem] text-neutral-600 sm:flex-row sm:justify-between ${MONO}`}>
        <span>{site.name}</span>
        <a href={site.url} className={`rounded hover:text-ink ${focusRing}`}>
          Engineering portfolio ↗
        </a>
      </footer>
    </section>
  );
}
