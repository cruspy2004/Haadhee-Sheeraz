
import { useState, useEffect } from 'react';

const experienceData = [
  {
    title: "Freelance Copywriter",
    company: "",
    period: "Current",
    description: "Creating landing pages, opt-in pages, email sequences and long form content for clients."
  },
  {
    title: "Content Engineer",
    company: "Software Company",
    period: "Nov 2024 - Dec 2024",
    description: "Helped redesign the landing page, privacy policy, store fronts (app store, play store) and more."
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
            <div 
              key={index} 
              id={`exp-${index}`}
              className={`timeline-item transition-all duration-700 ${
                visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
