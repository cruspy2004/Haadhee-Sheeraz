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
 * current SF Digital role.
 *
 * Descriptions are deliberately one or two sentences. They used to run
 * 240-330 characters each, which on a phone is a wall of text arriving
 * mid-scroll, and the extra words were carrying attitude rather than
 * evidence. Anything that survived the cut is a fact: a stack, a number,
 * or a named artefact.
 *
 * `anchor` values are spread across the path with room at each end so the
 * first entry is not already on screen when the section is reached and the
 * last is not still arriving as it leaves.
 */
export const experience: ExperienceEntryData[] = [
  {
    id: 'sfdigital',
    number: '01',
    role: 'Forward Deployed Product Engineer',
    company: 'SF Digital',
    dates: 'Sep 2026 - Present',
    description:
      'Embedded with clients, building automated content pipelines on Claude Code that generate the SEO and GEO pages their customers land on.',
    anchor: 0.12,
    side: 'right',
  },
  {
    id: 'flyrank',
    number: '02',
    role: 'Backend Engineering Intern',
    company: 'FlyRank AI',
    dates: 'Aug 2026',
    description:
      'Backend services for an AI product: API endpoints, the data models under them, and the integrations the product runs on.',
    anchor: 0.3,
    side: 'left',
  },
  {
    id: 'wateen',
    number: '03',
    role: 'Software Engineering Intern',
    company: 'Wateen Telecom',
    dates: 'May 2025 - Aug 2025',
    description:
      'Backend for Watify, an internal platform serving 5,000+ employees: REST and GraphQL over PostgreSQL, JWT auth, paginated queries. Selected from a field of 5,000 applicants.',
    anchor: 0.48,
    side: 'right',
  },
  {
    id: 'leetly',
    number: '04',
    role: 'Growth Engineer',
    company: 'Leetly',
    dates: 'Nov 2024 - Jan 2025',
    description:
      'Growth experiments for a mobile DSA learning app. Instrumented the funnel and shipped against what the numbers said, not what the roadmap assumed.',
    anchor: 0.66,
    side: 'left',
  },
  {
    id: 'rem',
    number: '05',
    role: 'Web & Growth',
    company: 'REM / IT Empire',
    dates: 'Sep 2024 - Nov 2024',
    description:
      'Landing pages and sales funnels for a pre-launch AI real-estate SaaS, when the product still had to explain itself to every visitor.',
    anchor: 0.84,
    side: 'right',
  },
];
