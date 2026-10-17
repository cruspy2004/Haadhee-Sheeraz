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
  /** Two or three sentences: what it is and what makes it work. */
  summary: string;
  src: string;
  ratio: Ratio;
  /** Optional still shown before playback; the first frame is used otherwise. */
  poster?: string;
  length: string;
  madeFor: string;
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
    // Strongest first: the Sriracha spot opens the work.
    examples: [
      {
        id: 'sriracha-ad',
        title: 'Sriracha product ad',
        summary:
          'It opens on the bottle in a city street at night. One drop flies into a food truck, past the cooks and into a bowl of pho, and the bottle closes the shot. A product story told in a single move, with no set, no crew and no real sauce.',
        ...clip('sriracha-ad'),
        ratio: '4:3',
        length: '17 seconds',
        madeFor: 'Pre-roll, brand channels, launches',
      },
      {
        id: 'ugc-ad',
        title: 'Beauty UGC ad',
        summary:
          'Several AI creators, one lip product, cut together the way real creator ads are: a fast hook, the product in hand, a face close to camera. No one to cast, ship product to or reshoot.',
        ...clip('ugc-ad'),
        ratio: '9:16',
        length: '12 seconds',
        madeFor: 'TikTok, Reels, Meta ads',
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
          'A Pixar-style story in ninety seconds: a teenager, two parents who do not believe him, and a business run from a laptop that takes off. It opens on a shocked face and a price, so the viewer stays to find out why.',
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
          'Fifteen seconds for H1GROW, a product I built. It opens on the problem ("Products you own: 0"), reveals the brand, then animates the product UI in. Bold type and a tight edit do the selling.',
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
          'A phone-shot travel vlog at the pyramids of Giza: handheld framing, harsh desert light, a camel drinking from a water bottle. None of it was filmed.',
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
          'Artificial intelligence explained step by step in under ninety seconds. Numbered on-screen structure, AI b-roll and word-by-word captions hold attention with no presenter on camera.',
        ...clip('explainer'),
        ratio: '9:16',
        length: '86 seconds',
        madeFor: 'Reels, Shorts, edtech pages',
      },
      {
        id: 'dialogue-explainer',
        title: 'Two-character AWS explainer',
        summary:
          'Two cartoon characters talk through EC2, S3, RDS and Lambda as interview prep, over runner-game footage. The back-and-forth keeps a dry topic moving.',
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

/** Plays in the hero card. */
export const featuredId = 'cinematic';
