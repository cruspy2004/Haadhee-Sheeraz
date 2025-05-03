
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MouseFollower from "@/components/MouseFollower";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const projects = [
  {
    title: "KAROBAR BOX",
    tags: ["FinTech", "IoT", "Incubated"],
    description: "Incubated in NIC and Founder Institute. One of the 30 selected from 570 (the only fintech project selected). Validates transactions instantly with audiovisual messages.",
    image: "https://via.placeholder.com/600x400/1A1A1A/D1B07C?text=KAROBAR+BOX"
  },
  {
    title: "REM Real Estate Matchmaker",
    tags: ["SaaS", "B2B", "AI"],
    description: "An AI-powered real estate matchmaker app for the Dubai market. Connects property seekers with perfect matches based on advanced algorithms.",
    image: "https://via.placeholder.com/600x400/1A1A1A/D1B07C?text=REM"
  },
  {
    title: "Workflow Automation Suite",
    tags: ["SaaS", "Automation", "Integration"],
    description: "Custom workflow automation solution built with integrations for GHL, Kajabi and ClickFunnels. Streamlines business processes and improves conversion rates.",
    image: "https://via.placeholder.com/600x400/1A1A1A/D1B07C?text=Workflow+Automation"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const SaasProjects = () => {
  return (
    <div className="min-h-screen bg-portfolio-black text-portfolio-lightgray">
      <MouseFollower />
      <Header />
      <div className="container mx-auto px-4 pt-32 pb-20">
        <motion.div 
          className="mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-4xl md:text-5xl text-portfolio-gold mb-6">SaaS Projects</h1>
          <p className="text-lg text-portfolio-lightgray/80 mb-8">
            Exploring my journey in SaaS entrepreneurship, showcasing projects that blend technical development with business solutions.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center text-portfolio-gold hover:text-portfolio-gold/80 transition-colors"
          >
            <span className="mr-2">←</span> Back to Home
          </Link>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              className="bg-portfolio-darkgray rounded-lg overflow-hidden border border-portfolio-gold/10 hover:border-portfolio-gold/30 transition-all"
              variants={item}
            >
              <div className="h-48 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif text-portfolio-gold mb-2">{project.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-portfolio-black px-2 py-1 rounded text-portfolio-beige">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-portfolio-lightgray/80">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default SaasProjects;
