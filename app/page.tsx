import GlassNav from '@/components/nav/GlassNav';
import HeroResting from '@/components/hero/HeroResting';
import ExperienceSection from '@/components/experience/ExperienceSection';
import PivotTransition from '@/components/pivot/PivotTransition';
import ProjectsSection from '@/components/projects/ProjectsSection';
import ContactSection from '@/components/contact/ContactSection';

/**
 * HERO → EXPERIENCE → (pivot) → PROJECTS → CONTACT.
 * One continuous scroll.
 */
export default function Page() {
  return (
    <>
      <GlassNav />
      <main>
        <HeroResting />
        <ExperienceSection />
        <PivotTransition>
          <ProjectsSection />
        </PivotTransition>
        <ContactSection />
      </main>
    </>
  );
}
