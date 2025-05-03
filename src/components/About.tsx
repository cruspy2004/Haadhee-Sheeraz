
import { useState, useEffect } from 'react';

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
          <h2 className="section-heading text-center">About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="bg-portfolio-darkgray rounded-lg p-6 border border-portfolio-gold/10">
                <h3 className="font-serif text-xl text-portfolio-gold mb-3">Who I Am</h3>
                <p className="text-portfolio-lightgray/90 mb-4">
                  I'm a MERN Stack Developer and Copywriter with a focus on creating effective digital solutions.
                  Currently pursuing my BSCS at NUST, Pakistan's #1 university according to QS World Rankings.
                </p>
                <p className="text-portfolio-lightgray/90">
                  With experience in both technical development and persuasive marketing content,
                  I combine logical problem-solving with creative communication to deliver unique value.
                </p>
              </div>
            </div>
            
            <div>
              <div className="bg-portfolio-darkgray rounded-lg p-6 border border-portfolio-gold/10">
                <h3 className="font-serif text-xl text-portfolio-gold mb-3">Educational Background</h3>
                <div className="mb-4">
                  <h4 className="font-medium text-portfolio-beige">NUST, H12 Islamabad</h4>
                  <p className="text-sm text-portfolio-lightgray/70">BSCS (August 2023 - August 2027)</p>
                  <p className="text-portfolio-lightgray/90 mt-1">No. 1 in Pakistan (QS World Rankings)</p>
                </div>
                <div>
                  <h4 className="font-medium text-portfolio-beige">PCS, Faisalabad</h4>
                  <p className="text-sm text-portfolio-lightgray/70">FSc. (March 2020 - March 2022)</p>
                  <p className="text-portfolio-lightgray/90 mt-1">Score: 90.5% (With an O-levels background)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
