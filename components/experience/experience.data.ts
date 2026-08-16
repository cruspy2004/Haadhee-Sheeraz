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
    description:
      'Building and shipping backend services and APIs for an AI product.',
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
      'Selected from 5,000 applicants. Engineered the backend for Watify, an internal platform serving 5,000+ employees — REST and GraphQL APIs, PostgreSQL schema and migrations, JWT authentication, and lazy loading for scale. Shipped in an agile team on the PERN stack.',
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
      'Drove user adoption for a mobile DSA learning product through data-driven growth experiments — instrumenting the funnel, testing against it, and acting on what the numbers said.',
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
