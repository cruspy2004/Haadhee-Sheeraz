/**
 * The pitch in Haadhee's own words: research is the difference, AI is the
 * method, five years of copywriting is the edge. The one number sits under
 * the heading on the left; the recent project closes the section on a
 * single line.
 */
export default function About() {
  return (
    <section id="about" className="mx-auto w-full max-w-7xl scroll-mt-24 px-5 py-24 sm:px-10 sm:py-32">
      <div className="grid gap-10 border-t border-ink pt-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
        <div>
          <h2 className="font-script text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.045em] text-ink">
            About me.
          </h2>

          {/* dt before dd, as a <dl> requires; column-reverse puts the
              number on top visually. */}
          <dl className="mt-10 max-w-[14rem] sm:mt-12">
            <div className="flex flex-col-reverse border-t border-neutral-200 pt-4">
              <dt className="mt-2 text-[0.9375rem] text-neutral-600">years of experience</dt>
              <dd className="m-0 font-script text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-none tracking-[-0.05em] text-ink">
                4+
              </dd>
            </div>
          </dl>
        </div>

        <div className="max-w-[38ch] space-y-6 text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.35] tracking-[-0.01em] text-ink">
          <p>
            5&nbsp;years of scripting, creating and directing content taught me
            one thing: what separates content that works from content that
            doesn’t is research.
          </p>
          <p>
            For the past 3&nbsp;years I’ve made it with AI. I think this is how
            content gets made now.
          </p>
          <p className="text-neutral-600">
            What sets me apart is 5&nbsp;years as a copywriter. It’s why my
            pages grow, and it shows in the work.
          </p>
        </div>
      </div>

      {/* Full width so it stays on one line from lg up; inside the right
          column it wrapped at every desktop width. */}
      <p className="mt-12 text-[1rem] leading-relaxed text-neutral-600 sm:mt-16 lg:whitespace-nowrap">
        Recent project:{' '}
        <a
          href="https://www.instagram.com/javascriptpeter/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-ink underline decoration-neutral-400 underline-offset-4 hover:decoration-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          JavascriptPeter
        </a>
        , an edtech Instagram page I grew to 7.5k followers and 3M views in 40 posts.
      </p>
    </section>
  );
}
