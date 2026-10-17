import Hero from '@/components/aivideo/Hero';
import About from '@/components/aivideo/About';
import WorkSection from '@/components/aivideo/WorkSection';
import Contact from '@/components/aivideo/Contact';

/**
 * aivideo.haadheesheeraz.online: HERO → ABOUT → WORK → CONTACT.
 * Off-white ground with a soft glow; the drifting lines live in the hero
 * only. Shares the app, fonts and motion curves with the main site,
 * nothing of its dark surface.
 */
export default function AiVideoPage() {
  return (
    <div className="aivideo min-h-screen text-ink">
      {/* Soft light on the off-white ground: a white bloom up top and a
          faint peach glow in the top-left corner. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 30%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%), radial-gradient(28% 30% at 0% 0%, rgba(255,190,175,0.35) 0%, rgba(255,190,175,0) 70%)',
        }}
      />

      <div className="relative z-[1]">
        <Hero />
        <main>
          <About />
          {/* Off-white up top, the original white for the work: a long
              fade so the ground changes gradually, landing on white by the
              time the Ads section starts. */}
          <div style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0px, #ffffff 560px)' }}>
            <WorkSection />
          </div>
        </main>
        <div className="bg-white">
          <Contact />
        </div>
      </div>
    </div>
  );
}
