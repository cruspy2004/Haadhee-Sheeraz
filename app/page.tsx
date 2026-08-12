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
 */
export default function Page() {
  return (
    <>
      <GlassNav />
      <Jack />
      <main>
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
