export type SkillGroup = {
  label: string;
  items: string[];
};

/**
 * Source: resume.pdf. Trimmed to what a reader will actually scan — the
 * full coursework list belongs on the résumé, not on a one-line band.
 */
export const skills: SkillGroup[] = [
  {
    label: 'Languages',
    items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C/C++', 'SQL'],
  },
  {
    label: 'Backend',
    items: [
      'Node.js',
      'Express',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'REST',
      'GraphQL',
      'WebSockets',
    ],
  },
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'Tailwind', 'Framer Motion'],
  },
  {
    label: 'Data & AI',
    items: ['Pandas', 'NumPy', 'NLP', 'TensorFlow', 'PyTorch', 'Flask'],
  },
  {
    label: 'Tools',
    items: ['Git', 'Docker', 'Nginx', 'Vercel', 'Linux', 'Agile'],
  },
];

/** The one credential worth stating inline; the rest live on the résumé. */
export const credential = {
  institution: 'NUST SEECS',
  detail: 'BS Computer Science',
  dates: 'Aug 2023 — Aug 2027',
};
