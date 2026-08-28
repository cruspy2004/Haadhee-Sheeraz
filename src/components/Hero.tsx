import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // expo-out
    },
  },
};

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (!mounted) return null;

  return (
    <section className="min-h-screen w-full bg-portfolio-black flex flex-col items-center justify-center relative overflow-hidden font-sans text-white">
      <div className="container mx-auto px-6 py-24 flex-grow flex items-center w-full max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
          
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col space-y-6 z-10"
          >
            <motion.div variants={itemVariants}>
              <h1 className="font-serif italic text-5xl md:text-7xl lg:text-8xl tracking-tight">
                Haadhee Sheeraz
              </h1>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-col space-y-2 mt-2">
              <h2 className="text-xl md:text-2xl text-portfolio-muted-silver font-light">
                Software Development & Automations
              </h2>
              <p className="text-lg md:text-xl text-portfolio-muted-silver/80">
                I write code that converts
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-6">
              <button
                onClick={() => scrollTo('projects')}
                className="glass-surface text-portfolio-silver rounded-xl px-8 py-3 transition-transform hover:scale-105 active:scale-95"
              >
                View Projects
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="border border-white/12 text-portfolio-silver rounded-xl px-8 py-3 transition-transform hover:scale-105 active:scale-95 hover:bg-white/5"
              >
                Get In Touch
              </button>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center items-center w-full"
          >
            <img
              src="/Screenshot 2026-07-25 081549.png"
              alt="Haadhee Sheeraz"
              className="w-full max-w-[600px] object-cover pointer-events-none"
              style={{
                maskImage: 'radial-gradient(ellipse 80% 75% at 50% 40%, black 35%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 80% 75% at 50% 40%, black 35%, transparent 100%)',
              }}
            />
          </motion.div>
          
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
        onClick={() => scrollTo('projects')}
      >
        <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-portfolio-muted-silver rounded-full mt-1"
          />
        </div>
      </motion.div>
    </section>
  );
}
