/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
  },

  /*
   * aivideo.haadheesheeraz.online is this same app. Requests for `/` on
   * that host are served by app/aivideo; everything else (/_next, fonts,
   * /ai-videos/*.mp4) is shared and needs no rewrite. `beforeFiles` so it
   * wins over app/page.tsx, which would otherwise match `/` first.
   *
   * The host pattern is a regex Next anchors at both ends, matched
   * against the hostname with the port stripped, so it also catches
   * aivideo.localhost:3000 in dev.
   */
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          has: [{ type: 'host', value: 'aivideo\\..+' }],
          destination: '/aivideo',
        },
      ],
    };
  },

  /*
   * The aivideo.* clips are the heaviest thing either site serves. Let the
   * browser keep them for a week so a return visit does not re-download
   * them. Replacing a clip? Give the new file a new name, or visitors may
   * see the old one for up to a week.
   */
  async headers() {
    return [
      {
        source: '/ai-videos/:file*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' },
        ],
      },
    ];
  },

  /* One public URL per page: /aivideo on the main domain goes to the subdomain. */
  async redirects() {
    return [
      {
        source: '/aivideo',
        has: [{ type: 'host', value: '(www\\.)?haadheesheeraz\\.online' }],
        destination: 'https://aivideo.haadheesheeraz.online/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
