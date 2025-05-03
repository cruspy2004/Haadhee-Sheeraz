
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
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
        </motion.div>
        
        {/* Profile Image */}
        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: loaded ? 1 : 0, x: loaded ? 0 : 100 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="relative max-w-md w-full aspect-square">
            <div className="w-full h-full overflow-hidden rounded-full">
              <img 
                src="/lovable-uploads/0361b692-6f36-4260-9278-b022843c2ab7.png" 
                alt="Haadhee Sheeraz" 
                className="w-full h-full object-cover animate-subtle-move"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-portfolio-black via-transparent to-transparent rounded-full"></div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <span className="text-portfolio-lightgray/60 text-sm mb-2">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-portfolio-gold/30 rounded-full flex justify-center">
          <div className="w-2 h-2 bg-portfolio-gold rounded-full animate-bounce mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
