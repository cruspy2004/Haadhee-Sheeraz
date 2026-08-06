'use client';

import { motion } from 'framer-motion';
import { skills, credential } from './skills.data';
import { EASE_ENTRANCE, STAGGER } from '@/lib/animation/easings';

/**
 * A quiet band between Experience and Projects.
 *
 * Removing the Education section left the site with no credential and no
 * stack anywhere — a reader could only infer the toolset from project
 * tags. This states both in one screen without reintroducing a full
 * section that competes with the path animation above it.
 */
export default function SkillsBand() {
  return (
    <section
      id="skills"
      className="relative mx-auto w-full max-w-5xl px-6 py-28 sm:py-36"
      aria-label="Skills and education"
    >
      <motion.div
        className="flex flex-col gap-2 border-b border-white/[0.07] pb-8 sm:flex-row sm:items-baseline sm:justify-between"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-70px' }}
        transition={{ duration: 0.6, ease: EASE_ENTRANCE }}
      >
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
          <h2 className="text-[length:var(--t-h3)] font-normal tracking-tight text-silver-bright">
            {credential.institution}
          </h2>
          <p className="text-[length:var(--t-body-s)] text-silver-dim">
            {credential.detail}
          </p>
        </div>
        <p className="meta whitespace-nowrap">{credential.dates}</p>
      </motion.div>

      <dl className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2">
        {skills.map((group, i) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.55,
              delay: i * STAGGER,
              ease: EASE_ENTRANCE,
            }}
          >
            <dt className="eyebrow mb-3">{group.label}</dt>
            <dd className="flex flex-wrap gap-x-2 gap-y-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 px-3 py-1 text-[length:var(--t-meta)] text-silver"
                >
                  {item}
                </span>
              ))}
            </dd>
          </motion.div>
        ))}
      </dl>
    </section>
  );
}
