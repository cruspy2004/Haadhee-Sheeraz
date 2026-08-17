import GlassNav from '@/components/nav/GlassNav';
import HeroResting from '@/components/hero/HeroResting';
import EducationSection from '@/components/education/EducationSection';
import ExperienceSection from '@/components/experience/ExperienceSection';
import PivotTransition from '@/components/pivot/PivotTransition';
import ProjectsSection from '@/components/projects/ProjectsSection';
import ContactSection from '@/components/contact/ContactSection';
import Jack from '@/components/jack/Jack';

/**
 * HERO → EDUCATION → EXPERIENCE → (pivot) → PROJECTS → CONTACT.
 * One continuous scroll.
 *
 * The frame and grid are fixed overlays rather than wrappers: a wrapping
 * element would introduce an overflow/transform ancestor around the
 * Experience section and disable its position: sticky.
 */
export default function Page() {
  return (
    <>
      <div className="grid-field" aria-hidden="true" />
      <div className="tech-frame" aria-hidden="true" />

      <GlassNav />
      <Jack />

      <main className="relative z-[1]">
        <HeroResting />
        <EducationSection />
        <ExperienceSection />
        <PivotTransition>
          <ProjectsSection />
        </PivotTransition>
        <ContactSection />
      </main>
    </>
  );
}
