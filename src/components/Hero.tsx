import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SMTP_CONFIG } from '../config/emailjs';

// Declare Email global for SMTP.js
interface EmailSendConfig {
  Host?: string;
  Username?: string;
  Password?: string;
  To?: string;
  From?: string;
  Subject?: string;
  Body?: string;
  CC?: string;
  BCC?: string;
  SecureToken?: string;
  Attachments?: Array<Record<string, unknown>>;
  [key: string]: unknown;
}

declare global {
  interface Window {
    Email: {
      send: (config: EmailSendConfig) => Promise<string>;
    };
  }
}

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [showHireForm, setShowHireForm] = useState(false);
  const [hireMessage, setHireMessage] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleHireSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const result = await window.Email.send({
        Host: SMTP_CONFIG.Host,
        Username: SMTP_CONFIG.Username,
        Password: SMTP_CONFIG.Password,
        To: SMTP_CONFIG.To,
        From: SMTP_CONFIG.From,
        Subject: `HIRE REQUEST from ${contactEmail}`,
        Body: `
          <h3>New Hire Request</h3>
          <p><strong>From:</strong> ${contactEmail}</p>
          <p><strong>Message:</strong></p>
          <p>${hireMessage}</p>
        `
      });
      
      if (result === "OK") {
        setSubmitStatus('success');
        setHireMessage('');
        setContactEmail('');
        setTimeout(() => setShowHireForm(false), 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Email send failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20 bg-portfolio-black/95">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div 
          className="space-y-6 md:pl-6 lg:pl-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-portfolio-gold">
            Haadhee Sheeraz
          </h1>
          <h2 className="text-2xl md:text-3xl text-portfolio-lightgray font-light leading-relaxed">
            Software Developmet 
            <span className="block text-portfolio-beige opacity-80">& Automations</span>
          </h2>
          <p className="text-lg text-portfolio-lightgray/80 max-w-md">
            I write code that converts
          </p>
          <div className="pt-4 flex gap-4 flex-wrap">
            <a 
              href="#projects" 
              className="px-6 py-3 bg-portfolio-gold text-portfolio-black font-medium rounded-md hover:bg-portfolio-gold/90 transition-all"
            >
              View Projects
            </a>
            <button 
              onClick={() => setShowHireForm(!showHireForm)}
              className="px-6 py-3 bg-gradient-to-r from-portfolio-black to-portfolio-darkgray border border-portfolio-gold text-portfolio-gold font-medium rounded-md hover:from-portfolio-darkgray hover:to-portfolio-black transition-all"
            >
              Hire Me
            </button>
            <a 
              href="#contact" 
              className="px-6 py-3 border border-portfolio-gold text-portfolio-gold font-medium rounded-md hover:bg-portfolio-gold/10 transition-all"
            >
              Get In Touch
            </a>
          </div>

          {/* Hire Me Form */}
          {showHireForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-portfolio-darkgray rounded-lg border border-portfolio-gold/20"
            >
              <h3 className="text-lg font-semibold text-portfolio-gold mb-3">Ready to hire me?</h3>
              
              {submitStatus === 'success' && (
                <div className="mb-3 p-2 bg-green-900/20 border border-green-500/50 rounded text-green-400 text-sm">
                  Message sent! I'll respond within 24 hours.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-3 p-2 bg-red-900/20 border border-red-500/50 rounded text-red-400 text-sm">
                  Failed to send. Please try the contact form below.
                </div>
              )}

              <form onSubmit={handleHireSubmit} className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                  className="w-full bg-portfolio-black border border-portfolio-gold/20 rounded px-3 py-2 text-portfolio-lightgray focus:outline-none focus:border-portfolio-gold"
                />
                <textarea
                  placeholder="Tell me about your project..."
                  value={hireMessage}
                  onChange={(e) => setHireMessage(e.target.value)}
                  required
                  rows={3}
                  className="w-full bg-portfolio-black border border-portfolio-gold/20 rounded px-3 py-2 text-portfolio-lightgray focus:outline-none focus:border-portfolio-gold"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-portfolio-gold text-portfolio-black font-medium rounded hover:bg-portfolio-gold/90 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowHireForm(false)}
                    className="px-4 py-2 border border-portfolio-gold/30 text-portfolio-lightgray rounded hover:bg-portfolio-gold/10 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </motion.div>
        
        {/* Profile Image - positioned to match the animation end position */}
        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: loaded ? 1 : 0, x: loaded ? 0 : 100 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="relative rounded-3xl overflow-hidden">
           <img
             src="/lovable-uploads/0361b692-6f36-4260-9278-b022843c2ab7.png"
             alt="Haadhee Sheeraz"
             className="w-full h-full object-cover animate-subtle-move"
             decoding="async"
             loading="lazy"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-portfolio-black via-transparent to-transparent pointer-events-none"></div>
         </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <span className="text-portfolio-lightgray/60 text-sm mb-2">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-portfolio-gold/30 rounded-full flex justify-center">
          <div className="w-2 h-2 bg-portfolio-gold rounded-full animate-bounce mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
