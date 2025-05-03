
import { useState, useEffect } from 'react';
import { MousePointer } from 'lucide-react';

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHidden, setIsHidden] = useState(true);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const handleMouseDown = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 150);
    };

    // Only add event listeners if we're in a browser environment
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mousedown', handleMouseDown);
      
      // Hide the cursor initially until it moves
      setTimeout(() => setIsHidden(false), 1000);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mousedown', handleMouseDown);
      }
    };
  }, []);

  if (typeof window === 'undefined' || isHidden) return null;

  return (
    <>
      {/* Main cursor */}
      <div 
        className={`pointer-events-none fixed z-50 flex items-center justify-center transition-transform duration-100 ${
          clicked ? 'scale-90' : 'scale-100'
        }`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="relative">
          {/* Outer ring */}
          <div className="absolute rounded-full border-2 border-portfolio-gold/60 w-8 h-8 -translate-x-1/2 -translate-y-1/2 animate-ping" 
               style={{ opacity: 0.2 }}/>
          
          {/* Inner ring */}
          <div className={`absolute rounded-full mix-blend-difference bg-portfolio-gold/20 w-4 h-4 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${
            clicked ? 'scale-150 opacity-100' : 'opacity-70'
          }`} />
        </div>
      </div>
      
      {/* Secondary glow effect */}
      <div 
        className="pointer-events-none fixed z-40 w-40 h-40 rounded-full bg-portfolio-gold opacity-10 blur-3xl transition-transform duration-500"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%) scale(0.5)',
        }}
      />
    </>
  );
};

export default MouseFollower;
