
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EducationalBackground = () => {
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
    
    const section = document.getElementById('education');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);
  
  return (
    <section id="education" className="py-20 bg-portfolio-black">
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="section-heading text-center mb-12">Educational Background</h2>
          
          <motion.div 
            className="bg-portfolio-darkgray rounded-lg p-8 border border-portfolio-gold/20 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-6">
              <h4 className="font-medium text-xl text-portfolio-beige">NUST, H12 Islamabad</h4>
              <p className="text-sm text-portfolio-lightgray/70">BSCS (August 2023 - August 2027)</p>
              <p className="text-portfolio-lightgray/90 mt-1">No. 1 in Pakistan (QS World Rankings)</p>
            </div>
            <div className='mb-6'>
              <h4 className="font-medium text-xl text-portfolio-beige">PCS, Faisalabad</h4>
              <p className="text-sm text-portfolio-lightgray/70">FSc. (March 2020 - March 2022)</p>
              <p className="text-portfolio-lightgray/90 mt-1">Score: 90.5% (With an O-levels background)</p>
            </div>
            <div>
              <h4 className="font-medium text-xl text-portfolio-beige">Founders Institute</h4>
              <p className="text-sm text-portfolio-lightgray/70">FSc. (Jan 2025 - Nov 2025)</p>
              <p className="text-portfolio-lightgray/90 mt-1">Succesfully graduated from founders university</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationalBackground;
