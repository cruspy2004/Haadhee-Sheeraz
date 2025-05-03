
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [showText, setShowText] = useState(false);
  const [showCodeText, setShowCodeText] = useState(false);
  const [showConvertsText, setShowConvertsText] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // Timeline for the animation sequence
    const imageTimer = setTimeout(() => {
      setShowText(true);
    }, 1000);

    const codeTextTimer = setTimeout(() => {
      setShowCodeText(true);
    }, 1500);

    const convertsTextTimer = setTimeout(() => {
      setShowConvertsText(true);
    }, 2000);
    
    const nameTimer = setTimeout(() => {
      setShowName(true);
    }, 2300);
    
    const buttonsTimer = setTimeout(() => {
      setShowButtons(true);
    }, 2600);

    return () => {
      clearTimeout(imageTimer);
      clearTimeout(codeTextTimer);
      clearTimeout(convertsTextTimer);
      clearTimeout(nameTimer);
      clearTimeout(buttonsTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-portfolio-black flex items-center justify-center z-50">
      <div className="relative h-screen w-full flex flex-col items-center justify-center">
        {/* Main image that moves from center to top right */}
        <motion.div
          className="absolute z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            x: showText ? "20vw" : 0,
            y: showText ? "-15vh" : 0 
          }}
          transition={{ 
            duration: 1.2,
            x: { delay: 1, type: "spring", stiffness: 100 },
            y: { delay: 1, type: "spring", stiffness: 100 }
          }}
        >
          <img
            src="/lovable-uploads/0361b692-6f36-4260-9278-b022843c2ab7.png"
            alt="Haadhee Sheeraz"
            className="max-w-full h-auto max-h-[50vh] object-contain rounded-xl"
          />
        </motion.div>

        {/* Name appears below image in top right */}
        {showName && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute text-3xl font-serif font-bold text-portfolio-gold"
            style={{ top: "35vh", right: "20vw" }}
          >
            Haadhee Sheeraz
          </motion.h1>
        )}

        {/* The "I write code that converts" text elements */}
        {showText && (
          <div className="ml-auto mr-32 flex flex-col items-start">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl text-portfolio-lightgray"
            >
              I write
            </motion.p>
            
            {showCodeText && (
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-7xl font-bold text-portfolio-gold my-2"
              >
                CODE
              </motion.h2>
            )}
            
            {showConvertsText && (
              <motion.h2
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-7xl font-bold text-portfolio-gold"
              >
                THAT CONVERTS
              </motion.h2>
            )}

            {showButtons && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-8 flex gap-4"
              >
                <button
                  onClick={onComplete}
                  className="px-6 py-3 bg-portfolio-gold text-portfolio-black rounded-md hover:bg-portfolio-gold/90 transition-colors"
                >
                  Explore My Work
                </button>
                <a 
                  href="#contact" 
                  onClick={onComplete}
                  className="px-6 py-3 border border-portfolio-gold text-portfolio-gold font-medium rounded-md hover:bg-portfolio-gold/10 transition-all"
                >
                  Get In Touch
                </a>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroAnimation;
