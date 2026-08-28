import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const projectData = [
  { title: 'H1Grow', category: 'Content Monetization SAAS', description: 'Recurring monetization for creators, using software products.', badges: ['Next.js', 'Tailwind CSS', 'PostgreSql'], link: 'https://h1grow.store', accentColor: '#0e2a20' },
  { title: 'JAVASCRIPT PETER', category: 'Instagram Content Page', description: 'Upload an instagram reel with just one click. Over a million views and 7k followers in 2 months (2 brand deals)', badges: ['Python'], link: 'https://www.instagram.com/javascriptpeter', accentColor: '#1e152a' },
  { title: 'Watify', category: 'Business Automation Solution', description: 'All in one B2B communication solution. Used by Wateen to manage over 5 thousand employees', badges: ['React', 'Node.js', 'PostgreSql'], link: 'https://watify.vercel.app/', accentColor: '#0a2233' },
  { title: 'Medium Influence & Sentiment Analysis AI', category: 'Web Scraping & NLP', description: 'Helps with effective outreach through sentiment and influence analysis for both creators and topics.', badges: ['Python', 'NLP', 'Flask', 'Web Scraping'], link: 'https://github.com/cruspy2004/Medium-scrapper-and-sentiment-analysis-', accentColor: '#1a1a2e' },
  { title: 'Project Memetent', category: 'Java Game', description: 'A compilation game made in Java, Swing, FX. Achieved 60% boost in interaction and a 14% higher click-through rate.', badges: ['Java', 'Swing', 'JavaFX'], link: 'https://github.com/cruspy2004/memetent-memes-and-games-', accentColor: '#2a1a0e' },
  { title: 'Project 2048', category: 'C Game', description: 'Game made with C and Raylib. A modern implementation of the classic 2048 puzzle game.', badges: ['C', 'Raylib'], accentColor: '#0e1a2a' },
  { title: 'KAROBAR BOX', category: 'Fintech & IoT', description: 'Incubated in NIC and Founder Institute. 1 of the 30 selected from 570 (the only fintech project selected).', badges: ['Fintech', 'IoT'], link: 'https://karobar-box.vercel.app/', accentColor: '#1a0e2a' },
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(index);
          }
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.6,
      }
    );

    const currentCards = cardRefs.current;
    currentCards.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      currentCards.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  const scrollTo = useCallback((direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.querySelector('.project-card')?.clientWidth || 400;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        scrollTo('left');
      } else if (e.key === 'ArrowRight') {
        scrollTo('right');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollTo]);

  const activeColor = projectData[activeIndex]?.accentColor || 'transparent';

  return (
    <section id="projects" className="relative min-h-screen py-24 md:py-32 overflow-hidden flex flex-col justify-center">
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundColor: activeColor,
          transition: 'background-color 600ms cubic-bezier(0.65,0,0.35,1)'
        }}
      />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-heading text-center mb-4"
        >
          Projects
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-portfolio-muted-silver text-center mb-12"
        >
          A showcase of my technical and creative work
        </motion.p>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto group">
        <button 
          onClick={() => scrollTo('left')}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button 
          onClick={() => scrollTo('right')}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
          aria-label="Next project"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-4 md:px-16 pb-8 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projectData.map((project, index) => {
            const cardContent = (
              <div className="h-full flex flex-col bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 md:p-8 hover:border-[rgba(255,255,255,0.15)] transition-all duration-300 hover:-translate-y-[2px]">
                <h3 className="font-serif italic text-xl md:text-2xl text-[#E8E8EA]">
                  {project.title}
                </h3>
                <p className="text-sm text-[#9A9AA0] mt-1">
                  {project.category}
                </p>
                <p className="text-sm md:text-base text-[#E8E8EA]/70 mt-4 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.badges.map(badge => (
                    <span 
                      key={badge}
                      className="text-xs px-3 py-1 rounded-full bg-[rgba(255,255,255,0.06)] text-[#E8E8EA]/60"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            );

            return (
              <div 
                key={project.title}
                data-index={index}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="project-card snap-center min-w-[340px] md:min-w-[420px] max-w-[420px] flex-shrink-0"
              >
                {project.link ? (
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full outline-none"
                  >
                    {cardContent}
                  </a>
                ) : (
                  <div className="h-full">
                    {cardContent}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 flex justify-center gap-2 mt-8">
        {projectData.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'bg-white w-6' : 'bg-white/30'
            }`}
            onClick={() => {
              const card = cardRefs.current[index];
              if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
              }
            }}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
