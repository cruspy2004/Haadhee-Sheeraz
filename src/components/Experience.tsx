
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const experienceData = [
  {
    title: "Freelance landing page dev",
    company: "",
    period: "Current",
    description: "Creating landing pages, opt-in pages, email sequences and long form content for clients."
  },
  {
    title: "SWE ",
    company: "Wateen",
    period: "Current",
    description: "Creating business solutions that boost sales and employee productivity."
  },
  {
    title: "Content Engineer",
    company: "It Empire (REM)",
    period: "Nov 2024 - Dec 2024",
    description: "Helped redesign the landing page, privacy policy, and store fronts for REM - an SAAS B2B AI real estate matchmaker app in Dubai."
  },
  {
    title: "Sponsorships Executive",
    company: "Hack Club",
    period: "1 year",
    description: "Secured sponsorships through professional outreach and managed partner relationships."
  },
  {
    title: "Marketing Executive",
    company: "ACM",
    period: "1 year",
    description: "Boosted ticket sales and community engagement on crucial events."
  },
  {
    title: "Publications Team Member",
    company: "NDC",
    period: "1 year",
    description: "Created and managed publication materials for the organization."
  }
];

const Experience = () => {
  const [visibleItems, setVisibleItems] = useState<{ [key: number]: boolean }>({});
  
  useEffect(() => {
    const observers = experienceData.map((_, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => ({ ...prev, [index]: true }));
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
      );
      
      const element = document.getElementById(`exp-${index}`);
      if (element) observer.observe(element);
      
      return { observer, element };
    });
    
    return () => {
      observers.forEach(({ observer, element }) => {
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  return (
    <section id="experience" className="py-20 bg-portfolio-black">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center mb-16">Experience</h2>
        
        <div className="max-w-3xl mx-auto">
          {experienceData.map((exp, index) => (
            <motion.div 
              key={index} 
              id={`exp-${index}`}
              className="timeline-item"
              initial={{ opacity: 0, x: -20 }}
              animate={visibleItems[index] ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="timeline-dot"></div>
              <div>
                <h3 className="font-serif text-xl text-portfolio-gold">
                  {exp.title}
                  {exp.company && <span className="text-portfolio-beige"> at {exp.company}</span>}
                </h3>
                <p className="text-sm text-portfolio-lightgray/70 mb-2">{exp.period}</p>
                <p className="text-portfolio-lightgray/90">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
