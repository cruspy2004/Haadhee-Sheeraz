
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import IntroAnimation from "@/components/IntroAnimation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MouseFollower from "@/components/MouseFollower";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // After intro animation completes, show the rest of content
    const timer = setTimeout(() => {
      setIntroComplete(true);
    }, 3000); // Total intro animation time

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-portfolio-black text-portfolio-lightgray">
      <MouseFollower />
      {!introComplete ? (
        <IntroAnimation onComplete={() => setIntroComplete(true)} />
      ) : (
        <>
          <Header />
          <div className="content-container">
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Skills />
            <Contact />
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
