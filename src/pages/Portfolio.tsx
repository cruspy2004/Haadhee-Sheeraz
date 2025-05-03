
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import MouseFollower from "@/components/MouseFollower";
import { Link } from "react-router-dom";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-portfolio-black text-portfolio-lightgray">
      <MouseFollower />
      <Header />
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="mb-12 max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-portfolio-gold mb-6">My Portfolio</h1>
          <p className="text-lg text-portfolio-lightgray/80 mb-8">
            A detailed showcase of my projects spanning web development, copywriting, and SaaS entrepreneurship.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center text-portfolio-gold hover:text-portfolio-gold/80 transition-colors"
          >
            <span className="mr-2">←</span> Back to Home
          </Link>
        </div>

        <Projects />
      </div>
      <Footer />
    </div>
  );
};

export default Portfolio;
