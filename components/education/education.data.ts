export type EducationEntry = {
  institution: string;
  credential: string;
  dates: string;
};

/** Source: resume.pdf. Most recent first. */
export const education: EducationEntry[] = [
  {
    institution: 'NUST SEECS',
    credential: 'BS Computer Science',
    dates: 'Aug 2023 — Aug 2027',
  },
  {
    institution: 'McKinsey & Company',
    credential: 'McKinsey Forward',
    dates: 'Apr 2026 — Jun 2026',
  },
  {
    institution: 'Founders Institute',
    credential: 'Graduated under NIC Pakistan, Cohort 3',
    dates: 'Jan 2025 — Sep 2025',
  },
];
