'use client';

import { motion } from 'framer-motion';
import { education } from './education.data';
import { EASE_ENTRANCE, STAGGER } from '@/lib/animation/easings';

/**
 * PRD §4.2 — deliberately quieter than Experience. This is a supporting
 * credential list, so it gets restraint: hairline rules, mono dates, no
 * cards, no accent colour. It must not compete with the path animation
 * that starts immediately below it.
 */
export default function EducationSection() {
  return (
    <section
      id="education"
      className="relative mx-auto w-full max-w-5xl px-6 py-32 sm:py-40"
    >
      <motion.p
        className="eyebrow mb-14"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: EASE_ENTRANCE }}
      >
        Education
      </motion.p>

      <ul className="border-t border-white/[0.07]">
        {education.map((entry, i) => (
          <motion.li
            key={entry.institution}
            className="group grid grid-cols-1 gap-1 border-b border-white/[0.07] py-7 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.6,
              delay: i * STAGGER,
              ease: EASE_ENTRANCE,
            }}
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
              <h3 className="text-lg font-normal tracking-tight text-silver-bright sm:text-xl">
                {entry.institution}
              </h3>
              <span
                aria-hidden="true"
                className="hidden h-px flex-1 bg-white/[0.08] sm:block"
              />
              <p className="text-sm text-silver-dim">{entry.credential}</p>
            </div>
            <p className="meta whitespace-nowrap text-silver-faint">
              {entry.dates}
            </p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
