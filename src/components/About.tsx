
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    const section = document.getElementById('about');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);
  
  return (
    <section id="about" className="py-20 bg-portfolio-black">
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="section-heading text-center mb-12">About Me</h2>
          
          <motion.div 
            className="bg-portfolio-darkgray rounded-lg p-8 border border-portfolio-gold/20 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif text-2xl text-portfolio-gold mb-6 border-b border-portfolio-gold/30 pb-3">Who I Am</h3>
            <p className="text-portfolio-lightgray/90 mb-6 text-lg">
              A 20 year old CS student at NUST with 1.5 years of copywriting experience, and multiple programming projects. 
              <span className="text-portfolio-gold font-medium"> I write code that actually converts.</span>
            </p>
            
            <p className="text-portfolio-lightgray/90 mb-6 text-lg">
              Right now involved in SAAS based solutions. Proficient with tools like GHL, Kajabi, ClickFunnels etc. 
              I build landing pages, funnels and workflow automations that help your business scale.
            </p>
            
            <p className="text-portfolio-lightgray/90 text-lg font-light italic">
              Remember: This is a DEV talking, not a marketer. A dev that understands how that CTA button is pressed.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
