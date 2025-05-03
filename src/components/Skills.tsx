
import { useState, useEffect } from 'react';

const skillsData = {
  "Technical": [
    "MERN Stack", "HTML", "CSS", "JavaScript", "SQL", "C", 
    "C++", "Java (Swing, FX)", "Python", "React", "Node.js",
    "MongoDB", "Express.js"
  ],
  "Content": [
    "Copywriting", "Landing Pages", "Opt-ins", "Email Sequences",
    "CRMs", "GUI Design", "Content Strategy"
  ],
  "Soft Skills": [
    "Problem Solving", "Communication", "Team Collaboration",
    "Project Management", "Time Management"
  ]
};

const SkillCategory = ({ 
  title, 
  skills, 
  isVisible 
}: { 
  title: string; 
  skills: string[]; 
  isVisible: boolean;
}) => (
  <div 
    className={`bg-portfolio-darkgray rounded-lg p-6 border border-portfolio-gold/10 transition-all duration-700 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}
  >
    <h3 className="font-serif text-xl text-portfolio-gold mb-4">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span 
          key={index} 
          className="bg-portfolio-black/70 text-portfolio-lightgray px-3 py-1 rounded-full text-sm"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const Skills = () => {
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
    
    const section = document.getElementById('skills');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="skills" className="py-20 bg-portfolio-darkgray/30">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center mb-12">Skills</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(skillsData).map(([category, skills], index) => (
            <SkillCategory 
              key={category}
              title={category}
              skills={skills}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
