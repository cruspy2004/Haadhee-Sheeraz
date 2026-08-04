import GlassNav from '@/components/nav/GlassNav';
import HeroResting from '@/components/hero/HeroResting';
import EducationSection from '@/components/education/EducationSection';
import ExperienceSection from '@/components/experience/ExperienceSection';
import PivotTransition from '@/components/pivot/PivotTransition';
import ProjectsSection from '@/components/projects/ProjectsSection';
import ContactSection from '@/components/contact/ContactSection';

/**
 * HERO → EXPERIENCE → EDUCATION → (pivot) → PROJECTS → CONTACT.
 * One continuous scroll.
 *
 * Education sits after Experience: the work history is the centrepiece and
 * should be the first thing reached, with the credential list reading as
 * support underneath it.
 */
export default function Page() {
  return (
    <>
      <GlassNav />
      <main>
        <HeroResting />
        <ExperienceSection />
        <EducationSection />
        <PivotTransition>
          <ProjectsSection />
        </PivotTransition>
        <ContactSection />
      </main>
    </>
  );
}
