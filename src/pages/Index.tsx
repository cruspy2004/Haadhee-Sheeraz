
import { useEffect, useState } from "react";
import NavDock from "@/components/NavDock";
import IntroAnimation from "@/components/IntroAnimation";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // Fallback timer in case intro animation hangs
    const timer = setTimeout(() => {
      setIntroComplete(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-portfolio-black text-portfolio-silver">
      {!introComplete ? (
        <IntroAnimation onComplete={() => setIntroComplete(true)} />
      ) : (
        <>
          <NavDock />
          <main>
            <Hero />
            <Experience />
            <Projects />
            <Contact />

            {/* Footer */}
            <footer className="py-8 border-t border-white/5">
              <div className="container mx-auto px-4 text-center">
                <p className="text-portfolio-muted-silver/60 text-sm font-sans">
                  © {new Date().getFullYear()} Haadhee Sheeraz. All rights reserved.
                </p>
              </div>
            </footer>
          </main>
        </>
      )}
    </div>
  );
};

export default Index;
