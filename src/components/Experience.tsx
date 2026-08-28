import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const experiences = [
  { 
    title: 'Freelance Landing Page Dev', 
    company: '', 
    period: 'Current', 
    description: 'Creating landing pages, opt-in pages, email sequences and long form content for clients.' 
  },
  { 
    title: 'SWE', 
    company: 'Wateen', 
    period: 'Current', 
    description: 'Creating business solutions that boost sales and employee productivity.' 
  },
  { 
    title: 'Content Engineer', 
    company: 'It Empire (REM)', 
    period: 'Nov 2024 - Dec 2024', 
    description: 'Helped redesign the landing page, privacy policy, and store fronts for REM - an SAAS B2B AI real estate matchmaker app in Dubai.' 
  },
  { 
    title: 'Growth Engineer', 
    company: 'Leetly', 
    period: '1 month', 
    description: 'Helped grow the mobile alternative of leetcode' 
  },
  { 
    title: 'Sponsorships Executive', 
    company: 'Hack Club', 
    period: '1 year', 
    description: 'Secured sponsorships through professional outreach and managed partner relationships.' 
  },
  { 
    title: 'Marketing Executive', 
    company: 'ACM', 
    period: '1 year', 
    description: 'Boosted ticket sales and community engagement on crucial events.' 
  },
  { 
    title: 'Publications Team Member', 
    company: 'NDC', 
    period: '1 year', 
    description: 'Created and managed publication materials for the organization.' 
  }
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end center']
  });
  
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section 
      id="experience" 
      ref={sectionRef} 
      className="w-full py-24 md:py-32 bg-transparent"
    >
      <h2 className="section-heading text-center mb-16 font-serif italic text-3xl md:text-5xl text-portfolio-silver">
        Experience
      </h2>

      <div className="relative max-w-3xl mx-auto w-full px-4 md:px-8">
        {/* SVG Vertical Line */}
        <div className="absolute left-[23px] md:left-[39px] top-[40px] bottom-[40px] w-[2px]">
          <svg viewBox="0 0 2 100" preserveAspectRatio="none" className="w-full h-full">
            <path 
              d="M 1 0 L 1 100" 
              stroke="#E8E8EA" 
              strokeOpacity="0.15" 
              strokeWidth="2" 
              vectorEffect="non-scaling-stroke" 
            />
            <motion.path 
              d="M 1 0 L 1 100" 
              stroke="#E8E8EA" 
              strokeWidth="2" 
              vectorEffect="non-scaling-stroke" 
              style={{ pathLength }} 
            />
          </svg>
        </div>
        
        {/* Timeline Entries */}
        <div className="flex flex-col gap-6 relative z-10">
          {experiences.map((exp, index) => (
            <div key={index} className="relative flex items-start">
              {/* Timeline Dot */}
              <div 
                className="absolute left-0 top-[28px] w-4 h-4 rounded-full shadow-sm z-10"
                style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #8E8E93 50%, #C8C9CC 100%)' }}
              />
              
              {/* Timeline Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="pl-8 ml-4 w-full"
              >
                <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-xl p-6 backdrop-blur-sm">
                  <h3 className="font-serif italic text-lg text-portfolio-silver">
                    {exp.title}
                    {exp.company && (
                      <span className="font-sans not-italic text-portfolio-muted-silver">
                        {' '}at {exp.company}
                      </span>
                    )}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-portfolio-muted-silver/70 mt-1">
                    {exp.period}
                  </p>
                  <p className="text-sm text-portfolio-silver/70 mt-2">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
