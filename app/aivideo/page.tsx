import Hero from '@/components/aivideo/Hero';
import About from '@/components/aivideo/About';
import WorkSection from '@/components/aivideo/WorkSection';
import Contact from '@/components/aivideo/Contact';

/**
 * aivideo.haadheesheeraz.online: HERO → ABOUT → WORK → CONTACT.
 * White page, black type. Shares the app, fonts and motion curves with the
 * main site, nothing of its dark surface.
 */
export default function AiVideoPage() {
  return (
    <div className="aivideo min-h-screen bg-white text-ink">
      <Hero />
      <main>
        <About />
        <WorkSection />
      </main>
      <Contact />
    </div>
  );
}
