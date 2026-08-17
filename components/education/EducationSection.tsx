'use client';

import { motion } from 'framer-motion';
import { education } from './education.data';
import JackScene from '@/components/jack/JackScene';
import { EASE_ENTRANCE, STAGGER } from '@/lib/animation/easings';

/**
 * Credentials, set as a spec sheet inside a bordered module.
 *
 * The neo-tech reference treats every block as a labelled component with
 * an index, a rule and a value column — so this reads as a datasheet
 * rather than as a list, which is also closer to what the content is.
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
          <p className="eyebrow">Education</p>
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
              {/* Desktop: label — rule — value. Phones: stacked. */}
              <div className="hidden spec-row sm:grid">
                <h3 className="text-[length:var(--t-h3)] font-normal tracking-tight text-silver-bright">
                  {entry.institution}
                </h3>
                <span className="rule" aria-hidden="true" />
                <div className="flex items-baseline gap-6">
                  <p className="text-[length:var(--t-body-s)] text-silver-dim">
                    {entry.credential}
                  </p>
                  <p className="meta w-[11.5rem] shrink-0 text-right">
                    {entry.dates}
                  </p>
                </div>
              </div>

              <div className="sm:hidden">
                <h3 className="text-[length:var(--t-h3)] font-normal tracking-tight text-silver-bright">
                  {entry.institution}
                </h3>
                <p className="mt-1 text-[length:var(--t-body-s)] text-silver-dim">
                  {entry.credential}
                </p>
                <p className="meta mt-2">{entry.dates}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <div className="mt-6">
        <JackScene
          stopAt={0.3}
          lines={[
            'Computer Science at NUST SEECS — graduating 2027.',
            'McKinsey Forward, and Founders Institute under NIC Pakistan.',
            'Cohort 3. He finished it.',
          ]}
        />
      </div>
    </section>
  );
}
