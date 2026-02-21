import { Home, User, FolderGit2, Briefcase, GraduationCap, Wrench, Mail } from 'lucide-react';
import { GlassDock } from '@/components/ui/glass-dock';

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const navItems = [
  { title: 'Home', icon: Home, onClick: scrollToTop },
  { title: 'About', icon: User, href: '#about' },
  { title: 'Projects', icon: FolderGit2, href: '#projects' },
  { title: 'Experience', icon: Briefcase, href: '#experience' },
  { title: 'Education', icon: GraduationCap, href: '#education' },
  { title: 'Skills', icon: Wrench, href: '#skills' },
  { title: 'Contact', icon: Mail, href: '#contact' },
];

const NavDock = () => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <GlassDock items={navItems} />
    </div>
  );
};

export default NavDock;
