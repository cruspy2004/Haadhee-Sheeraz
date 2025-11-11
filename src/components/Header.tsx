
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
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
    <div className="relative flex items-center">
      <Link to="/" className="flex items-center font-serif text-2xl font-bold text-portfolio-gold">
        <img src="/favicon.ico" alt="Logo" className="h-8" />
        <span
          className={`absolute left-12 -top-1 text-2xl font-serif font-bold text-portfolio-gold transition-all duration-300 ${
            scrolled ? "translate-x-[-17px] opacity-0" : "translate-x-0"
          }`}
        >
          HS/DEV
        </span>
      </Link>
    </div>
        
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
        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/" className="text-portfolio-lightgray hover:text-portfolio-gold transition-colors">Home</Link>
          <HashLink href="#about">About</HashLink>
          <Link to="/portfolio" className="text-portfolio-lightgray hover:text-portfolio-gold transition-colors">Portfolio</Link>
          <HashLink href="#experience">Experience</HashLink>
          <HashLink href="#education">Education</HashLink>
          <HashLink href="#skills">Skills</HashLink>
          <HashLink href="#contact">Contact</HashLink>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-portfolio-darkgray border-t border-portfolio-gold/20">
          <div className="container mx-auto py-4 px-4 flex flex-col gap-4">
            <Link to="/" className="text-portfolio-lightgray hover:text-portfolio-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <HashLink href="#about" onClick={() => setMobileMenuOpen(false)}>About</HashLink>
            <Link to="/portfolio" className="text-portfolio-lightgray hover:text-portfolio-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>Portfolio</Link>
            <HashLink href="#experience" onClick={() => setMobileMenuOpen(false)}>Experience</HashLink>
            <HashLink href="#education" onClick={() => setMobileMenuOpen(false)}>Education</HashLink>
            <HashLink href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</HashLink>
            <HashLink href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</HashLink>
          </div>
        </div>
      )}
    </header>
  );
};

// Helper component for hash navigation
const HashLink = ({ 
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
