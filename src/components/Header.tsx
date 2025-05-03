
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-portfolio-black/90 backdrop-blur-md py-3 shadow-lg' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="font-serif text-2xl font-bold text-portfolio-gold">
          HS/DEV
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-portfolio-lightgray hover:text-portfolio-gold"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <span className="text-2xl">×</span>
          ) : (
            <span className="text-xl">≡</span>
          )}
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          <NavLink href="#about">About</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#experience">Experience</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-portfolio-darkgray border-t border-portfolio-gold/20">
          <div className="container mx-auto py-4 px-4 flex flex-col gap-4">
            <NavLink href="#about" onClick={() => setMobileMenuOpen(false)}>About</NavLink>
            <NavLink href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</NavLink>
            <NavLink href="#experience" onClick={() => setMobileMenuOpen(false)}>Experience</NavLink>
            <NavLink href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</NavLink>
            <NavLink href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ 
  href, 
  children, 
  onClick 
}: { 
  href: string; 
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <a 
    href={href} 
    className="text-portfolio-lightgray hover:text-portfolio-gold transition-colors"
    onClick={onClick}
  >
    {children}
  </a>
);

export default Header;
