/**
 * Everything on aivideo.haadheesheeraz.online that is content rather than
 * layout. Adding an example, rewording one or adding a category is an edit
 * to this file and nothing else.
 */

/** Frame shape of the cut, as exported. */
export type Ratio = '9:16' | '4:5' | '1:1' | '4:3' | '16:9';

export const ratioValue = (r: Ratio) => {
  const [w, h] = r.split(':').map(Number);
  return w / h;
};

/*
 * Where the mp4s live: public/ai-videos, committed and served by Vercel's
 * CDN with the rest of the site. If they ever outgrow that, upload the same
 * files to a video host and set NEXT_PUBLIC_VIDEO_BASE_URL to the folder
 * URL; nothing else changes.
 */
const VIDEO_BASE = (process.env.NEXT_PUBLIC_VIDEO_BASE_URL ?? '/ai-videos').replace(/\/$/, '');

/**
 * A clip and its poster: `name.mp4` and `posters/name.jpg` (the frame it
 * opens on, ~40KB, so a card shows a picture instantly instead of a grey
 * box while the video loads).
 */
const clip = (name: string) => ({
  src: `${VIDEO_BASE}/${name}.mp4`,
  poster: `${VIDEO_BASE}/posters/${name}.jpg`,
});

export type Example = {
  id: string;
  title: string;
  /** Two or three sentences, in film terms: how it is shot and cut. */
  summary: string;
  /** The craft in a few words: shot types, camera moves, edit techniques. */
  technique: string;
  src: string;
  ratio: Ratio;
  /** Optional still shown before playback; the first frame is used otherwise. */
  poster?: string;
  length: string;
  madeFor: string;
  /**
   * A generator's visible mark baked into the file, softened on the page
   * with a small blur patch until the file itself is cleaned. Centre (x, y)
   * and diameter, as fractions of the frame's width / height / width.
   */
  watermark?: { x: number; y: number; size: number };
};

export type Category = {
  id: string;
  name: string;
  intro: string;
  examples: Example[];
};

/*
 * Page order. The layout alternates down the whole page, not per category:
 * the first example has its video on the right, the next on the left, and
 * so on, so two rows in a row never put the video on the same side.
 */
export const categories: Category[] = [
  {
    id: 'ads',
    name: 'Ads',
    intro: 'Ads that look like the feed they run in, from creator-style UGC to product spots.',
    // The UGC ad opens the work, then the two product spots.
    examples: [
      {
        id: 'ugc-melatonin',
        title: 'Melatonin UGC ad',
        summary:
          'One AI creator and a bedtime routine, shot the way real creator ads are: a talking-head hook to camera in soft bedside-lamp light, the Nutrifactor melatonin bottle held up to the lens, a packshot cutaway on the nightstand, and a closing shot of her asleep. No one to cast, ship product to or reshoot.',
        technique: 'Talking-head hook, practical lamp light, product to lens, packshot cutaway, lip-sync',
        ...clip('ugc-melatonin'),
        ratio: '9:16',
        length: '16 seconds',
        madeFor: 'TikTok, Reels, Meta ads',
      },
      {
        id: 'sriracha-ad',
        title: 'Sriracha product ad',
        summary:
          'A single follow shot. It opens on a macro of the bottle cap against a night street, deep in shallow-focus bokeh, then the camera chases one drop through a food truck window, past the cooks at the griddle and across the tables into a bowl of pho, and lands on a packshot of the bottle. No set, no crew, no real sauce.',
        technique: 'Continuous follow shot, macro, shallow depth of field, night exteriors, packshot',
        ...clip('sriracha-ad'),
        ratio: '4:3',
        length: '17 seconds',
        madeFor: 'Pre-roll, brand channels, launches',
      },
      {
        id: 'lays-paprika',
        title: 'Lay’s Paprika ad',
        summary:
          'A night-time CGI product spot. The bag drops out of the dark onto a wet, lamp-lit road and hangs in rolling smoke as the camera pushes in, then it cuts to slow-motion chips tumbling through smoke and warm light, and closes on a clean “try Lay’s paprika” end card.',
        technique: 'CGI product hero, push-in, volumetric smoke, slow motion, end card',
        ...clip('lays-paprika'),
        ratio: '9:16',
        length: '20 seconds',
        madeFor: 'Reels, TikTok, Shorts',
        // The generator's sparkle mark, bottom right, measured off the end card.
        watermark: { x: 0.833, y: 0.906, size: 0.11 },
      },
    ],
  },
  {
    id: 'storytime',
    name: 'Storytime cartoons',
    intro: 'Animated stories with the same characters in every shot, captions on every line and a hook in the first second.',
    examples: [
      {
        id: 'storytime-cartoon',
        title: 'Animated storytime',
        summary:
          'A Pixar-style 3D story in ninety seconds: a teenager, two parents who don’t believe him, and a business run from a laptop that takes off. It cold-opens on an extreme close-up reaction and a price, then moves through two-shots of the argument, over-the-shoulder inserts of the laptop screen and a night exterior, with the same characters in every shot.',
        technique: '3D character animation, cold open, reaction close-ups, insert shots, burned-in captions',
        ...clip('storytime-cartoon'),
        ratio: '9:16',
        length: '89 seconds',
        madeFor: 'Reels, TikTok, Shorts',
      },
    ],
  },
  {
    id: 'motion-graphics',
    name: 'Motion graphics',
    intro: 'Animated type and product UI that make one point, fast.',
    examples: [
      {
        id: 'motion-graphics',
        title: 'H1GROW promo',
        summary:
          'Fifteen seconds of kinetic typography for H1GROW, a product I built. It opens on the problem (“Products you own: 0”) and a big number counter, bursts into a logo reveal, then animates the product UI onto a phone mockup. Hard cuts between orange, lime and black keep the pace up.',
        technique: 'Kinetic type, number counter, logo reveal, UI animation, hard cuts',
        ...clip('motion-graphics'),
        ratio: '16:9',
        length: '15 seconds',
        madeFor: 'Launch posts, landing pages, LinkedIn',
      },
    ],
  },
  {
    id: 'cinematics',
    name: 'Ultra-realistic cinematics',
    intro: 'Footage that looks filmed on location, without a crew or a flight.',
    examples: [
      {
        id: 'cinematic',
        title: 'Pyramids travel vlog',
        summary:
          'A phone-shot travel vlog at the pyramids of Giza: handheld selfie framing, a low angle into the sun with natural flare and wind in her scarf, then cutaways to a camel drinking from a water bottle. Lip-synced and captioned like a real creator post. None of it was filmed.',
        technique: 'Handheld vlog framing, low angle into the sun, lens flare, cutaways, lip-sync',
        ...clip('cinematic'),
        ratio: '4:3',
        length: '12 seconds',
        madeFor: 'Travel and lifestyle brands, b-roll',
      },
    ],
  },
  {
    id: 'explainers',
    name: 'Explainers',
    intro: 'Hard topics made simple, and short enough to finish.',
    examples: [
      {
        id: 'explainer',
        title: 'AI, explained',
        summary:
          'Artificial intelligence explained step by step in under ninety seconds. A numbered on-screen structure carries the argument, AI b-roll runs from macro robot close-ups to lab inserts, and single words on black punctuate the cuts. No presenter on camera.',
        technique: 'Numbered structure, mixed-media b-roll, macro inserts, word-by-word captions',
        ...clip('explainer'),
        ratio: '9:16',
        length: '86 seconds',
        madeFor: 'Reels, Shorts, edtech pages',
      },
      {
        id: 'dialogue-explainer',
        title: 'Two-character AWS explainer',
        summary:
          'Two cartoon characters talk through EC2, S3, RDS and Lambda as interview prep. Character cutouts over runner-game gameplay, each service’s logo popping in as it’s named, and bold captions with the key word highlighted in green. The back-and-forth keeps a dry topic moving.',
        technique: 'Two-character dialogue, gameplay background, logo pop-ins, highlighted captions',
        ...clip('dialogue-explainer'),
        ratio: '9:16',
        length: '41 seconds',
        madeFor: 'TikTok, Reels, Shorts',
      },
    ],
  },
];

/** Every example in page order, for the viewer's arrows and the zig-zag. */
export const allExamples = categories.flatMap((category) =>
  category.examples.map((example) => ({ example, category })),
);
