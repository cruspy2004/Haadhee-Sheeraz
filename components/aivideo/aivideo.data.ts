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
const video = (file: string) => `${VIDEO_BASE}/${file}`;

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
 * Page order. Within a category the layout alternates on its own: the
 * first example has the video on the right, the second on the left.
 */
export const categories: Category[] = [
  {
    id: 'ads',
    name: 'Ads',
    intro: 'Ads that look like the feed they run in, from creator-style UGC to product spots.',
    examples: [
      {
        id: 'ugc-ad',
        title: 'Beauty UGC ad',
        summary:
          'Several AI creators, one lip product, cut together the way real creator ads are: a fast hook, the product in hand, a face close to camera. No one to cast, ship product to or reshoot.',
        src: video('ugc-ad.mp4'),
        ratio: '9:16',
        length: '12 seconds',
        madeFor: 'TikTok, Reels, Meta ads',
      },
      {
        id: 'sriracha-ad',
        title: 'Sriracha product ad',
        summary:
          'It opens on the bottle in a city street at night. One drop flies into a food truck, past the cooks and into a bowl of pho, and the bottle closes the shot. A product story told in a single move, with no set, no crew and no real sauce.',
        src: video('sriracha-ad.mp4'),
        ratio: '4:3',
        length: '17 seconds',
        madeFor: 'Pre-roll, brand channels, launches',
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
        src: video('storytime-cartoon.mp4'),
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
        src: video('motion-graphics.mp4'),
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
        src: video('cinematic.mp4'),
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
        src: video('explainer.mp4'),
        ratio: '9:16',
        length: '86 seconds',
        madeFor: 'Reels, Shorts, edtech pages',
      },
      {
        id: 'dialogue-explainer',
        title: 'Two-character AWS explainer',
        summary:
          'Two cartoon characters talk through EC2, S3, RDS and Lambda as interview prep, over runner-game footage. The back-and-forth keeps a dry topic moving.',
        src: video('dialogue-explainer.mp4'),
        ratio: '9:16',
        length: '41 seconds',
        madeFor: 'TikTok, Reels, Shorts',
      },
    ],
  },
];
