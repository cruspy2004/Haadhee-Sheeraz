
import { useEffect, useState } from 'react';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className={`space-y-6 ${loaded ? 'animate-slide delay-300' : 'opacity-0'}`}>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-portfolio-gold">
            Haadhee Sheeraz
          </h1>
          <h2 className="text-2xl md:text-3xl text-portfolio-lightgray font-light leading-relaxed">
            MERN Stack Developer
            <span className="block text-portfolio-beige opacity-80">& Copywriter</span>
          </h2>
          <p className="text-lg text-portfolio-lightgray/80 max-w-md">
            I write code that converts
          </p>
          <div className="pt-4 flex gap-4">
            <a 
              href="#projects" 
              className="px-6 py-3 bg-portfolio-gold text-portfolio-black font-medium rounded-md hover:bg-portfolio-gold/90 transition-all"
            >
              View Projects
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3 border border-portfolio-gold text-portfolio-gold font-medium rounded-md hover:bg-portfolio-gold/10 transition-all"
            >
              Get In Touch
            </a>
          </div>
        </div>
        
        {/* Profile Image */}
        <div className="hero-image">
          <div className={`relative max-w-md w-full aspect-square ${loaded ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="w-full h-full overflow-hidden rounded-full">
              <img 
                src="/lovable-uploads/b6ba6a92-92c9-4f31-9f67-43132b0b3426.png" 
                alt="Haadhee Sheeraz silhouette" 
                className="w-full h-full object-cover animate-subtle-move"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-portfolio-black via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center ${loaded ? 'animate-slide delay-500' : 'opacity-0'}`}>
        <span className="text-portfolio-lightgray/60 text-sm mb-2">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-portfolio-gold/30 rounded-full flex justify-center">
          <div className="w-2 h-2 bg-portfolio-gold rounded-full animate-bounce mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
