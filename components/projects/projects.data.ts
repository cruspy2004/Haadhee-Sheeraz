export type Project = {
  id: string;
  name: string;
  tags: string[];
  description: string;
  /** Full-screen background for this panel (PRD §4.5). */
  color: string;
  /** A darker partner used for the panel's radial falloff. */
  colorDeep: string;
  /** Text colour that reads on `color` without dropping below AA. */
  ink: string;
  /**
   * Hero image. `null` means no real screenshot has been supplied yet and
   * the card falls back to its designed typographic cover. Drop a file into
   * /public/project-images and set the path here — nothing else changes.
   */
  imagePath: string | null;
  liveUrl: string;
  /** Shown next to the visit affordance, e.g. 'h1grow.store'. */
  linkLabel: string;
};

/**
 * PRD §4.5 — real copy, real destinations. Live URLs are the ones linked
 * from resume.pdf's own hyperlinks.
 */
/*
 * Ordered by what each one PROVES, not by date — the first panel is the
 * one a hiring manager should see first. Watify proves engineering,
 * JavascriptPeter proves audience, TopicPulse proves both and its code is
 * public. See vault/Site Copy.md.
 */
export const projects: Project[] = [
  {
    id: 'watify',
    name: 'WATIFY',
    tags: ['Internal Tools', 'PERN', 'WebSockets'],
    description:
      'An in-house communication platform for Wateen Telecom, serving 5,000+ employees. I engineered the full backend — REST + GraphQL APIs, PostgreSQL schema and migrations, JWT authentication, and lazy loading for scale.',
    color: '#1f6f4f',
    colorDeep: '#0c3327',
    ink: '#eefaf3',
    imagePath: '/project-images/watify.png',
    liveUrl: 'https://watify.vercel.app/',
    linkLabel: 'watify.vercel.app',
  },
  {
    id: 'javascriptpeter',
    name: 'JAVASCRIPTPETER',
    tags: ['Instagram', 'Content Automation', 'Python', 'OpenAI API'],
    description:
      'An automated content pipeline using Python and the OpenAI API that generates, produces, and schedules short-form technical videos from simple prompts. Grew to 7.5k+ followers and 3M+ views within 2 months, validating pipeline output quality at scale. Covers bite-sized JS content — DSA, JS syntax, new AI tools, and interviews.',
    // Darkened from #c2477f, which put the heading at 4.16:1 and the
    // description at ~3.4:1 — both under the AA floor.
    color: '#a12f68',
    colorDeep: '#4b1230',
    ink: '#fdeef5',
    imagePath: '/project-images/javascriptpeter.png',
    liveUrl: 'https://www.instagram.com/javascriptpeter/',
    linkLabel: 'instagram.com/javascriptpeter',
  },
  {
    id: 'topicpulse',
    name: 'TOPICPULSE',
    tags: ['Web Scraping', 'NLP', 'Python', 'Flask'],
    description:
      'A content-gap identifier for Medium writers. Scrapes Stack Overflow to surface high-demand questions with low answer coverage, runs sentiment analysis on existing Medium articles covering those topics, and recommends underserved writing opportunities ranked by demand and gap size.',
    color: '#2b5cc4',
    colorDeep: '#101f4d',
    ink: '#eaf0ff',
    imagePath: '/project-images/topicpulse.png',
    liveUrl: 'https://medium-scrapper-and-sentiment-analy.vercel.app/',
    linkLabel: 'medium-scrapper-and-sentiment-analy.vercel.app',
  },
  {
    id: 'h1grow',
    name: 'H1GROW',
    tags: ['Content Monetization', 'Web', 'AI'],
    description:
      'Helps creators 5x their revenue by monetizing their content through software products.',
    color: '#c8c9cc',
    colorDeep: '#84868c',
    ink: '#0a0a0b',
    imagePath: '/project-images/h1grow.png',
    liveUrl: 'https://www.h1grow.store/',
    linkLabel: 'h1grow.store',
  },
  {
    id: 'memetent',
    name: 'PROJECT MEMETENT',
    tags: ['Java', 'Swing', 'JavaFX', 'Game'],
    description:
      'A compilation game built in Java (Swing/JavaFX). Added responsive memes to classic games, driving a 60% boost in interaction and a 14% higher click-through rate.',
    // Darkened hard from #c8862a: amber with near-white ink measured
    // 2.84:1 on the heading and ~2.3:1 on the description — the worst
    // pairing on the site and effectively unreadable.
    color: '#7c4f0f',
    colorDeep: '#3a2405',
    ink: '#fff6e6',
    imagePath: '/project-images/memetent.png',
    liveUrl: 'https://github.com/cruspy2004/memetent-memes-and-games-',
    linkLabel: 'github.com/cruspy2004',
  },
];
