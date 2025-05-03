
const Footer = () => {
  return (
    <footer className="py-8 bg-portfolio-black border-t border-portfolio-gold/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-portfolio-lightgray/70">&copy; {new Date().getFullYear()} Haadhee Sheeraz. All rights reserved.</p>
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="text-portfolio-lightgray/70 hover:text-portfolio-gold transition-colors">Home</a>
            <a href="#about" className="text-portfolio-lightgray/70 hover:text-portfolio-gold transition-colors">About</a>
            <a href="#projects" className="text-portfolio-lightgray/70 hover:text-portfolio-gold transition-colors">Projects</a>
            <a href="#contact" className="text-portfolio-lightgray/70 hover:text-portfolio-gold transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
