
import { useState, useEffect } from "react";
import Lottie from "lottie-react";

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/lovable-uploads/Intro_animation.json")
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error("Error loading animation:", error));
  }, []);

  if (!animationData) {
    return (
      <div className="fixed inset-0 bg-portfolio-black flex items-center justify-center z-50">
        <div className="text-portfolio-gold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-portfolio-black flex items-center justify-center z-50">
      <Lottie
        animationData={animationData}
        loop={false}
        onComplete={onComplete}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default IntroAnimation;
