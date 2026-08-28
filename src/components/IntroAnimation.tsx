import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [step, setStep] = useState(0); // 0: writing, 1: border drawing, 2: shrink & fade

  useEffect(() => {
    // Write duration is ~2000ms. Wait 300ms after it finishes.
    const timer1 = setTimeout(() => setStep(1), 2300);
    // Border draw is ~400ms. Wait 400ms after step 1 begins.
    const timer2 = setTimeout(() => setStep(2), 2700);
    // Box shrink takes 800ms. After that, sequence is fully complete.
    const timer3 = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  const name = "Haadhee Sheeraz";
  const letters = Array.from(name);

  // ambient easing for letters
  const letterEase = [0.65, 0, 0.35, 1];
  // expo-out for shrink
  const shrinkEase = [0.16, 1, 0.3, 1];

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        // ~2000ms total staggered duration for all letters
        delay: i * (2000 / letters.length) / 1000,
        duration: 0.8,
        ease: letterEase
      }
    })
  };

  const borderVariants = {
    hidden: { width: "0%", height: "0%", opacity: 0 },
    visible: { 
      width: "100%", 
      height: "100%", 
      opacity: 1,
      transition: { duration: 0.4, ease: "easeInOut" }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0C]"
        initial={{ opacity: 1 }}
        animate={{ opacity: step === 2 ? 0 : 1 }}
        // 800ms shrink. Fade out overlaps last 40% (which means it's 500ms long, starting at 300ms)
        transition={{ delay: step === 2 ? 0.3 : 0, duration: 0.5 }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ scale: 1, y: 0 }}
          animate={{ 
            scale: step === 2 ? 0.6 : 1, 
            y: step === 2 ? -150 : 0 
          }}
          transition={{ duration: 0.8, ease: shrinkEase }}
        >
          {/* Inner text container */}
          <div className="px-8 py-4 flex" style={{ letterSpacing: '0.05em' }}>
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="font-serif italic text-4xl md:text-6xl text-[#E8E8EA]"
                style={{ 
                  display: "inline-block", 
                  // ensure spaces take up appropriate width
                  width: letter === " " ? "0.4em" : "auto" 
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Border */}
          {step >= 1 && (
            <motion.div
              className="absolute border border-[rgba(255,255,255,0.2)] rounded-xl pointer-events-none"
              style={{ top: '50%', left: '50%', x: '-50%', y: '-50%' }}
              variants={borderVariants}
              initial="hidden"
              animate="visible"
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
