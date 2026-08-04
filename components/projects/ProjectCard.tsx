'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Project } from './projects.data';
import { EASE_ENTRANCE, STAGGER } from '@/lib/animation/easings';

type Props = {
  project: Project;
  index: number;
  total: number;
  active: boolean;
};

/**
 * One full-screen project. Content follows 100-150ms behind the background
 * colour crossfade (principle 5) — handled by the delay offsets below.
 */
export default function ProjectCard({ project, index, total, active }: Props) {
  const { ink } = project;

  const rise = (i: number) => ({
    initial: { opacity: 0, y: 26 },
    animate: active
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 26 },
    transition: {
      // 0.14s lag behind the colour, then a normal stagger.
      delay: active ? 0.14 + i * STAGGER : 0,
      duration: 0.55,
      ease: EASE_ENTRANCE,
    },
  });

  return (
    <div
      className="absolute inset-0 flex items-center justify-center px-5 pb-20 pt-24 sm:px-10 sm:pb-24 sm:pt-28"
      style={{ color: ink, pointerEvents: active ? 'auto' : 'none' }}
      aria-hidden={!active}
    >
      {/*
        Two columns from md up, not lg: the panel is locked to one viewport
        height, so a single stacked column at tablet widths overflows it and
        clips the description and the visit link straight off the bottom.
      */}
      <div className="grid max-h-full w-full max-w-6xl items-center gap-5 md:grid-cols-[1fr_1.05fr] md:gap-9 lg:gap-14">
        {/* Copy */}
        <div className="order-2 md:order-1">
          <motion.p
            {...rise(0)}
            className="font-mono text-[0.7rem] uppercase tracking-[0.24em]"
            style={{ color: ink, opacity: 0.55 }}
          >
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </motion.p>

          <motion.h2
            {...rise(1)}
            className="mt-3 text-[clamp(1.75rem,5vw,4.25rem)] font-light leading-[0.94] tracking-[-0.045em]"
            style={{ color: ink }}
          >
            {project.name}
          </motion.h2>

          <motion.ul {...rise(2)} className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border px-3 py-1 font-mono text-[0.68rem] tracking-[0.06em]"
                style={{
                  borderColor: `color-mix(in srgb, ${ink} 26%, transparent)`,
                  color: ink,
                }}
              >
                {tag}
              </li>
            ))}
          </motion.ul>

          <motion.p
            {...rise(3)}
            className="mt-4 max-w-lg text-[0.875rem] leading-relaxed sm:text-[0.95rem]"
            style={{ color: ink, opacity: 0.82 }}
          >
            {project.description}
          </motion.p>

          <motion.div {...rise(4)} className="mt-5 sm:mt-7">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="press group inline-flex items-center gap-3 rounded-full border px-5 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.16em] transition-colors"
              style={{
                borderColor: `color-mix(in srgb, ${ink} 34%, transparent)`,
                color: ink,
              }}
            >
              <span>Visit live</span>
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
                ↗
              </span>
            </a>
            <p
              className="mt-3 font-mono text-[0.68rem] tracking-[0.04em]"
              style={{ color: ink, opacity: 0.5 }}
            >
              {project.linkLabel}
            </p>
          </motion.div>
        </div>

        {/* Visual */}
        <motion.a
          {...rise(2)}
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.name}`}
          className="order-1 block overflow-hidden rounded-glass md:order-2"
          style={{
            boxShadow: '0 40px 80px -32px rgba(0,0,0,0.55)',
            border: `1px solid color-mix(in srgb, ${ink} 16%, transparent)`,
          }}
        >
          {project.imagePath ? (
            // Height-capped so the stacked layout still fits one viewport.
            <div className="relative aspect-[16/10] max-h-[26svh] w-full sm:max-h-[30svh] md:max-h-[50svh]">
              <Image
                src={project.imagePath}
                alt={`${project.name} interface`}
                fill
                sizes="(max-width: 768px) 90vw, 46vw"
                className="object-cover"
              />
            </div>
          ) : (
            <TypographicCover project={project} />
          )}
        </motion.a>
      </div>
    </div>
  );
}

/**
 * Designed cover for projects with no screenshot yet — an oversized initial
 * struck into the panel colour, with the tag list set as a specimen. Built
 * so a real image can replace it by setting `imagePath`, nothing else.
 */
function TypographicCover({ project }: { project: Project }) {
  const { ink, colorDeep } = project;
  return (
    <div
      className="relative aspect-[16/10] max-h-[26svh] w-full overflow-hidden sm:max-h-[30svh] md:max-h-[50svh]"
      style={{
        background: `radial-gradient(120% 130% at 18% 8%, ${colorDeep} 0%, transparent 62%)`,
      }}
    >
      {/* Engraved initial */}
      <span
        aria-hidden
        className="absolute -bottom-[14%] -left-[3%] select-none font-light leading-none tracking-[-0.06em]"
        style={{
          fontSize: 'clamp(9rem, 30vw, 22rem)',
          color: ink,
          opacity: 0.13,
        }}
      >
        {project.name.charAt(0)}
      </span>

      {/* Hairline grid */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, color-mix(in srgb, ${ink} 9%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, ${ink} 9%, transparent) 1px, transparent 1px)`,
          backgroundSize: '58px 58px',
          maskImage:
            'radial-gradient(90% 90% at 70% 30%, #000 20%, transparent 78%)',
        }}
      />

      <div className="relative flex h-full flex-col justify-between p-7 sm:p-9">
        <p
          className="font-mono text-[0.68rem] uppercase tracking-[0.24em]"
          style={{ color: ink, opacity: 0.6 }}
        >
          {project.linkLabel}
        </p>
        <div>
          <p
            className="font-mono text-[0.7rem] uppercase tracking-[0.2em]"
            style={{ color: ink, opacity: 0.55 }}
          >
            {project.tags.join('  ·  ')}
          </p>
          <p
            className="mt-2 text-2xl font-light tracking-tight sm:text-3xl"
            style={{ color: ink }}
          >
            {project.name}
          </p>
        </div>
      </div>
    </div>
  );
}
