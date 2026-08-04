# Haadhee Sheeraz — Portfolio

Single-scroll cinematic portfolio built to `PRD.txt` and `design-doc.txt`
(both inside `portfollio.zip`).

**HERO → EDUCATION → EXPERIENCE → (pivot) → PROJECTS → CONTACT**

Next.js 14 (App Router) · TypeScript · Tailwind · GSAP + ScrollTrigger ·
Framer Motion · Lenis.

```bash
npm run dev
```

> Do **not** run `npm run build` while `npm run dev` is running — the build
> overwrites `.next` and leaves the dev server serving 404s for its CSS and
> chunks. If that happens: stop dev, delete `.next`, restart.

---

## Swap-in points

Everything below is a one-line change. Nothing else needs touching.

### Project screenshots

Three projects still use the designed typographic cover instead of a real
screenshot: **TopicPulse**, **Project Memetent**, **Karobar Box**.

1. Drop the image into `public/project-images/`.
2. In `components/projects/projects.data.ts`, set that project's
   `imagePath` from `null` to `'/project-images/<file>'`.

Landscape, roughly 16:10, ≥1280px wide reads best.

### Hero video

`components/hero/HeroMedia.tsx` → set `HERO_VIDEO_SRC` to a file in
`public/`. The container, sizing, edge mask and breathing glow are
unchanged, so the layout does not move.

### Fonts

Self-hosted in `public/fonts` and wired up in `app/layout.tsx` via
`next/font/local`.

This is deliberate. `next/font/google` downloads the binaries from
`fonts.gstatic.com` at build time and, if that request fails, falls back to
Arial with **only a warning** — the build still succeeds and the entire site
ships in the wrong typeface. Self-hosting makes the build deterministic.

To change a face: download the woff2 from Google Fonts into `public/fonts`
and update the path in `app/layout.tsx`.

### Contact form

Composes a pre-filled `mailto:` in the visitor's mail client — no backend,
no third-party service, no secrets. The address is also shown in plain text
above the form so it stays usable without a configured mail client.

To move to a hosted form later, replace the `onSubmit` handler in
`components/contact/ContactSection.tsx`.

---

## How the motion is wired

- `lib/animation/easings.ts` — the four shared curves and the duration
  scale. Import from here; never redefine a curve in a component.
- `lib/animation/path.ts` — the Experience path is generated in the sticky
  stage's own pixel space, so one SVG unit is one CSS pixel and
  `getPointAtLength()` positions the entries directly. Retuning the path
  shape moves the entries automatically; there are no hardcoded offsets.
- Experience uses CSS `position: sticky` rather than a ScrollTrigger pin.
  ScrollTrigger still supplies the 0–1 progress value, but sticky avoids the
  pin-spacer jank the design doc flags for low-end mobile.
- One scroll-progress value drives the coin morph (0 → 0.18) and the comet
  (0.18 → 1), so there is no seam between them.

### Failsafes

Animation-gated content can strand a visitor if the animation never runs —
rAF is paused in a background tab, so a page opened in one would otherwise
sit blank behind a locked scroll. Both gates have escape hatches:

- `HeroIntro` skips outright if the tab starts hidden, and hands the page
  over after 7s regardless of what stalled.
- `PivotTransition` snaps Projects to its finished state if the timeline
  does not complete.

`prefers-reduced-motion` substitutes crossfades for the curtain, coin morph
and pivot, and shows the full Experience path with all entries visible.

---

## Known issues

- `npm audit` reports two high-severity advisories that cannot be resolved
  on Next 14: a Next Image Optimizer DoS (only affects self-hosted
  deployments configured with `remotePatterns` — this site serves local
  images only) and a transitive `postcss` advisory. Both are fixed only in
  Next 16, which is a breaking change away from the pinned stack. Revisit if
  you upgrade.
