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
 * Real work history, most recent first. Source: resume.pdf, plus the
 * current FlyRank AI role.
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
    dates: 'Aug 2026 - Present',
    description:
      'Building and shipping backend services for an AI product. Designing API endpoints and the data models underneath them, wiring up the integrations the product runs on, and keeping all of it stable while the surface area grows week to week.',
    anchor: 0.15,
    side: 'right',
  },
  {
    id: 'wateen',
    number: '02',
    role: 'Software Engineering Intern',
    company: 'Wateen Telecom',
    dates: 'May 2025 - Aug 2025',
    description:
      'Engineered the backend for Watify, an internal platform serving 5,000+ employees: REST and GraphQL APIs, PostgreSQL schema and migrations, JWT authentication, and paginated queries so the first screen loads before the history does. Shipped in an agile team on the PERN stack. Selected for the role from 5,000 applicants.',
    anchor: 0.38,
    side: 'left',
  },
  {
    id: 'leetly',
    number: '03',
    role: 'Growth Engineer',
    company: 'Leetly',
    dates: 'Nov 2024 - Jan 2025',
    description:
      'Drove user adoption for a mobile DSA learning product through data-driven growth experiments. Instrumented the funnel, tested against it, and acted on what the numbers actually said rather than what the roadmap assumed.',
    anchor: 0.62,
    side: 'right',
  },
  {
    id: 'rem',
    number: '04',
    role: 'Web & Growth',
    company: 'REM / IT Empire',
    dates: 'Sep 2024 - Nov 2024',
    description:
      'Built the landing pages and sales funnels for a pre-launch AI real-estate SaaS: the pages prospects landed on and the sequence that moved them toward a demo. Shipped at startup stage, when the product still had to explain itself to every visitor.',
    anchor: 0.86,
    side: 'left',
  },
];
