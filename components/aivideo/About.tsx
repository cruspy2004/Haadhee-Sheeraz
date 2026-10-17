import { MONO, focusRing } from './ui';

/**
 * The pitch in Haadhee's own words: research is the difference, AI is the
 * method, copywriting is the edge. One number, then the recent project on
 * a single line.
 */
export default function About() {
  return (
    <section id="about" className="relative mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-24 sm:px-10 sm:py-32">
      <div className="rounded-[28px] border border-neutral-200/80 bg-white/55 p-6 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.2)] sm:p-12">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-14">
          <div>
            <h2 className="font-script text-[clamp(2.5rem,5.5vw,4.25rem)] font-bold leading-none tracking-[-0.05em] text-ink">
              About me.
            </h2>

            <div className="mt-10 hidden md:block">
              <Stat />
            </div>
          </div>

          <div className="max-w-[36ch] space-y-6 font-serif text-[clamp(1.25rem,2.1vw,1.625rem)] leading-[1.45] text-ink">
            <p>
              5&nbsp;years of scripting, creating and directing content taught
              me one thing: the difference between content that works and
              content that doesn’t is research.
            </p>
            <p>
              For the past 3&nbsp;years I’ve made it with AI, and I think this
              is how content gets made now.
            </p>
            <p className="text-neutral-600">
              What sets me apart: I’ve been a copywriter for 5&nbsp;years.
              That’s why my pages grow, and it shows in the work.
            </p>
          </div>
        </div>

        <div className="mt-10 md:hidden">
          <Stat />
        </div>

        <a
          href="https://www.instagram.com/javascriptpeter/"
          target="_blank"
          rel="noopener noreferrer"
          className={`group mt-12 flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-white/70 px-5 py-4 transition-colors hover:border-ink sm:flex-row sm:items-center sm:gap-5 ${focusRing}`}
        >
          <span className={`shrink-0 self-start rounded-full bg-ink px-3 py-1 text-[0.6875rem] uppercase tracking-[0.08em] text-white sm:self-auto ${MONO}`}>
            Recent project
          </span>
          <span className="font-serif text-[1.0625rem] leading-snug text-ink">
            <strong className="font-semibold">JavascriptPeter</strong>: edtech Instagram page, 7.5k
            followers and 3M views in 40 posts.
          </span>
          <span aria-hidden className="ml-auto hidden shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-ink sm:inline">
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}

function Stat() {
  return (
    <div>
      <p className="font-script text-[clamp(3.5rem,8vw,6rem)] font-bold leading-none tracking-[-0.06em] text-ink">
        4+
      </p>
      <p className={`mt-2 text-[0.8125rem] uppercase tracking-[0.08em] text-neutral-600 ${MONO}`}>
        Years of experience
      </p>
    </div>
  );
}
