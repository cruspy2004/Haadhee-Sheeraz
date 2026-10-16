import { site } from '@/lib/site';

const mailto = `mailto:${site.email}?subject=${encodeURIComponent('Content project')}`;

/**
 * One ask, one action. The address is also printed in full so it still
 * works for anyone without a mail client set up.
 */
export default function Contact() {
  return (
    <section id="contact" className="mx-auto w-full max-w-7xl px-5 pb-10 pt-24 sm:px-10 sm:pt-36">
      <div className="rounded-[28px] bg-ink px-6 py-14 text-white sm:px-14 sm:py-20">
        <h2 className="max-w-3xl text-balance font-script text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">
          Let&apos;s make your next video.
        </h2>
        <p className="mt-6 max-w-lg text-[1.125rem] leading-relaxed text-white/70">
          Send me the product and where it will run. I&apos;ll reply with how
          I would make it.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={mailto}
            className="press inline-flex min-h-[48px] items-center rounded-full bg-white px-6 text-[1rem] font-medium text-ink hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Email me
          </a>
          <a href={mailto} className="text-[1rem] text-white/70 underline decoration-white/30 underline-offset-4 hover:text-white">
            {site.email}
          </a>
        </div>
      </div>

      <footer className="mt-8 flex flex-col gap-2 text-[0.875rem] text-neutral-500 sm:flex-row sm:justify-between">
        <span>{site.name}</span>
        <a href={site.url} className="hover:text-ink">
          Engineering portfolio ↗
        </a>
      </footer>
    </section>
  );
}
