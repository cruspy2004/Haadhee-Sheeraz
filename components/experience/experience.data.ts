export type ExperienceEntryData = {
  id: string;
  number: string;
  role: string;
  company: string;
  dates: string;
  description: string;
  /** Normalised position along the SVG path, 0-1 (design-doc §5). */
  anchor: number;
  side: 'left' | 'right';
};

/**
 * PRD §4.3 — real work history, most recent first. Source: resume.pdf,
 * plus the current FlyRank AI role.
 *
 * `anchor` values are spread across the path with room at each end so the
 * first entry is not already on screen when the section is reached and the
 * last is not still arriving as it leaves.
 */
export const experience: ExperienceEntryData[] = [
  {
    id: 'flyrank',
    number: '01',
    role: 'Backend Engineering Intern',
    company: 'FlyRank AI',
    dates: 'Aug 2026 — Present',
    description: 'A simple, reliable builder.',
    anchor: 0.15,
    side: 'right',
  },
  {
    id: 'wateen',
    number: '02',
    role: 'Software Engineering Intern',
    company: 'Wateen Telecom',
    dates: 'May 2025 — Aug 2025',
    description:
      'Worked as a coder in an agile development team, working with the PERN stack at scale — auth, DB schema, migrations, API creation and testing. Optimized code through lazy loading and stronger system design principles. Selected out of 5,000 applicants for one of Pakistan’s largest B2B telecom brands.',
    anchor: 0.38,
    side: 'left',
  },
  {
    id: 'leetly',
    number: '03',
    role: 'Growth Engineer',
    company: 'Leetly',
    dates: 'Nov 2024 — Jan 2025',
    description:
      'Drove user adoption for a mobile-based DSA learning product through data-driven growth experiments. Built a working understanding of how sales funnels and pipelines are structured and optimized.',
    anchor: 0.62,
    side: 'right',
  },
  {
    id: 'rem',
    number: '04',
    role: 'Content Engineer',
    company: 'REM / IT Empire',
    dates: 'Sep 2024 — Nov 2024',
    description:
      'Built content strategy and brand voice for an AI B2B SaaS helping realtors matchmake properties, at startup stage.',
    anchor: 0.86,
    side: 'left',
  },
];
