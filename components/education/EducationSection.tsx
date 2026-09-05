'use client';

import { motion } from 'framer-motion';
import { education } from './education.data';
import JackScene from '@/components/jack/JackScene';
import { EASE_ENTRANCE, STAGGER } from '@/lib/animation/easings';

/**
 * Credentials, set as a spec sheet inside a bordered module.
 *
 * ONE layout that reflows, not a desktop copy plus a mobile copy. The
 * previous version rendered both and hid one with Tailwind's `hidden`,
 * which silently failed: `hidden` lives in @layer utilities, the old
 * .spec-row rule was unlayered, and unlayered CSS outranks layered CSS in
 * the cascade. Every entry appeared twice on phones. Two copies of the
 * same content is the bug waiting to happen; one that reflows cannot
 * desynchronise.
 */
export default function EducationSection() {
  return (
    <section
      id="education"
      className="relative mx-auto w-full max-w-5xl px-5 py-24 sm:px-8 sm:py-32"
    >
      <motion.div
        className="panel panel-ticks p-6 sm:p-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.65, ease: EASE_ENTRANCE }}
      >
        <div className="mb-10 flex items-baseline justify-between">
          <h2 className="eyebrow m-0 font-normal">Education</h2>
          <p className="tech-index">SEC 01</p>
        </div>

        <ul>
          {education.map((entry, i) => (
            <motion.li
              key={entry.institution}
              className="border-t border-[var(--hair)] py-6 first:border-t-0 first:pt-0"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.55,
                delay: i * STAGGER,
                ease: EASE_ENTRANCE,
              }}
            >
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-4">
                <h3 className="whitespace-nowrap text-[length:var(--t-h3)] font-normal tracking-tight text-silver-bright">
                  {entry.institution}
                </h3>

                {/* Connecting rule, desktop only. */}
                <span
                  aria-hidden="true"
                  className="hidden h-px flex-1 bg-[var(--hair)] sm:block"
                />

                <p className="text-[length:var(--t-body-s)] text-silver-dim">
                  {entry.credential}
                </p>

                <p className="meta shrink-0 whitespace-nowrap sm:ml-6">
                  {entry.dates}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <div className="mt-6">
        <JackScene
          stopAt={0.3}
          lines={[
            'NUST, class of 2027.',
            'McKinsey Forward. Founders Institute, cohort 3.',
          ]}
        />
      </div>
    </section>
  );
}
