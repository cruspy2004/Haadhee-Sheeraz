import type { Config } from 'tailwindcss';

/**
 * Palette is black + silver only (PRD §1). Project accent colours live in
 * projects.data.ts, not here — they are per-panel backgrounds, not utilities.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050506',
        'ink-soft': '#0b0b0d',
        silver: {
          DEFAULT: '#c8c9cc',
          bright: '#f2f3f5',
          dim: '#8a8c91',
          faint: '#4a4c52',
        },
      },
      fontFamily: {
        script: ['var(--font-script)', 'cursive'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        // Principle 12: one radius language site-wide.
        glass: '16px',
        soft: '12px',
      },
      transitionTimingFunction: {
        entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
        exit: 'cubic-bezier(0.7, 0, 0.84, 0)',
        ambient: 'cubic-bezier(0.65, 0, 0.35, 1)',
        overshoot: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
