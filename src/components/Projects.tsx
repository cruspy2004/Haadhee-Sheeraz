
import { useState, useEffect } from 'react';

const projectData = [
  {
    title: "KAROBAR BOX",
    category: "Fintech & IoT",
    description: "Incubated in NIC and Founder institute. 1 of the 30 selected from 570 (the only fintech project selected). Validates your transaction instantly with audiovisual messages.",
    badges: ["Fintech", "IoT", "Incubated"],
    highlight: true,
  },

    {
    title: "Watify",
    category: "Business automation solution",
    description: "All in one B2B communication solution. Used by wateen to manage over 5 thousand employees",
    badges: ["React", "Node.js", "PostgreSql"],
    highlight: true,
  },
  {
    title: "Medium Influence & Sentiment Analysis AI",
    category: "Web Scraping & NLP",
    description: "Helps with effective outreach through sentiment and influence analysis for both creators and topics. Built with Web scraping, NLP, Python, Flask.",
    badges: ["Python", "NLP", "Flask", "Web Scraping"],
  },
  {
    title: "Stack Overflow Trend Analysis",
    category: "Data Analysis",
    description: "Identifies trends and saturation in the developer market, while clearly stating your competition and ranking them. Built with Web scraping, Python, Flask.",
    badges: ["Python", "Flask", "Web Scraping", "Data Analysis"],
  },
  {
    title: "Project Memetent",
    category: "Java Game",
    description: "A compilation game made in Java, Swing, FX. Achieved 60% boost in interaction and a 14% higher click-through rate, because of the responsive memes added to the classic games we love.",
    badges: ["Java", "Swing", "JavaFX", "Game Development"],
  },
  {
    title: "Project 2048",
    category: "C Game",
    description: "Game made with C and Raylib. A modern implementation of the classic 2048 puzzle game.",
    badges: ["C", "Raylib", "Game Development"],
  },
];

const ProjectCard = ({ project, index }: { project: typeof projectData[0]; index: number }) => {
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
    
    const element = document.getElementById(`project-${index}`);
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [index]);

  return (
    <div 
      id={`project-${index}`}
      className={`project-card ${
        project.highlight 
          ? 'md:col-span-2 bg-gradient-to-br from-portfolio-darkgray to-portfolio-darkgray/80 border border-portfolio-gold/20' 
          : ''
      } transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.badges.map((badge, i) => (
            <span key={i} className="bg-portfolio-black/50 text-portfolio-gold/90 text-xs px-2 py-1 rounded">
              {badge}
            </span>
          ))}
        </div>
        <h3 className="font-serif text-xl text-portfolio-gold mb-1">{project.title}</h3>
        <p className="text-sm text-portfolio-lightgray/70 mb-3">{project.category}</p>
        <p className="text-portfolio-lightgray/90">{project.description}</p>
      </div>
    </div>
  );
};

const Projects = () => {
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
    
    const section = document.getElementById('projects-heading');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);
  
  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-portfolio-black to-portfolio-darkgray/20">
      <div className="container mx-auto px-4">
        <div 
          id="projects-heading"
          className={`mb-12 max-w-lg mx-auto text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="section-heading">My Projects</h2>
          <p className="text-portfolio-lightgray/80">
            A showcase of my technical and creative work spanning various technologies and domains
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {projectData.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
