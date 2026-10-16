/**
 * The pitch in Haadhee's own words: research is the difference, AI is the
 * method, five years of copywriting is the edge. The numbers under it are
 * the proof, so they are set the largest.
 */
const proof = [
  { value: '7.5k', label: 'followers' },
  { value: '3M', label: 'views' },
  { value: '40', label: 'posts' },
];

export default function About() {
  return (
    <section id="about" className="mx-auto w-full max-w-7xl scroll-mt-6 px-5 py-24 sm:px-10 sm:py-32">
      <div className="grid gap-10 border-t border-ink pt-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
        <h2 className="font-script text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.045em] text-ink">
          About me.
        </h2>

        <div>
          <div className="max-w-[38ch] space-y-6 text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.35] tracking-[-0.01em] text-ink">
            <p>
              Five years of scripting, creating and directing content taught me
              one thing: the difference between content that works and content
              that doesn&apos;t is research.
            </p>
            <p>
              For the past three years I&apos;ve made it with AI, and I think
              this is how content gets made now.
            </p>
            <p className="text-neutral-600">
              What sets me apart is that I&apos;ve been a copywriter for five
              years. That is why my pages grow, and it shows in the work.
            </p>
          </div>

          <div className="mt-14 sm:mt-20">
            <dl className="grid grid-cols-3 gap-4 sm:gap-8">
              {proof.map((p) => (
                // dt before dd, as a <dl> requires; column-reverse puts the
                // number on top visually.
                <div key={p.label} className="flex flex-col-reverse border-t border-neutral-200 pt-4">
                  <dt className="mt-2 text-[0.9375rem] text-neutral-600">{p.label}</dt>
                  <dd className="m-0 font-script text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-none tracking-[-0.05em] text-ink">
                    {p.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 max-w-xl text-[1rem] leading-relaxed text-neutral-600">
              That&apos;s an edtech Instagram page I grew from zero.{' '}
              <a
                href="https://www.instagram.com/javascriptpeter/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline decoration-neutral-300 underline-offset-4 hover:decoration-ink"
              >
                See JavascriptPeter
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
