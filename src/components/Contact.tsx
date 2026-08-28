import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('contact');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://www.formbackend.com/f/58ff956cbe5f393c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-transparent relative z-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-heading text-center mb-12 text-3xl md:text-4xl font-bold text-[#E8E8EA]">
          Get In Touch
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT COLUMN - Contact Information */}
          <motion.div
            custom={1}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={cardVariants}
            style={glassStyle}
            className="rounded-2xl p-8"
          >
            <h3 className="font-serif italic text-xl text-[#E8E8EA] mb-6">Contact Information</h3>
            
            <div className="space-y-5">
              <a 
                href="mailto:Haadheesheeraz2004@gmail.com"
                className="flex items-center gap-3 group transition-all duration-300 hover:translate-x-1"
              >
                <Mail size={20} className="text-[#E8E8EA] flex-shrink-0" />
                <span className="text-[#9A9AA0] group-hover:text-[#E8E8EA] transition-colors break-all">
                  Haadheesheeraz2004@gmail.com
                </span>
              </a>
              
              <a 
                href="tel:+923258660707"
                className="flex items-center gap-3 group transition-all duration-300 hover:translate-x-1"
              >
                <Phone size={20} className="text-[#E8E8EA] flex-shrink-0" />
                <span className="text-[#9A9AA0] group-hover:text-[#E8E8EA] transition-colors">
                  +923258660707
                </span>
              </a>
              
              <a 
                href="https://github.com/cruspy2004"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group transition-all duration-300 hover:translate-x-1"
              >
                <Github size={20} className="text-[#E8E8EA] flex-shrink-0" />
                <span className="text-[#9A9AA0] group-hover:text-[#E8E8EA] transition-colors">
                  GitHub
                </span>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/m-haadhee-sheeraz-mian-7a25a12a2/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group transition-all duration-300 hover:translate-x-1"
              >
                <Linkedin size={20} className="text-[#E8E8EA] flex-shrink-0" />
                <span className="text-[#9A9AA0] group-hover:text-[#E8E8EA] transition-colors">
                  LinkedIn
                </span>
              </a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - Contact Form */}
          <motion.div
            custom={2}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={cardVariants}
            style={glassStyle}
            className="rounded-2xl p-8"
          >
            <h3 className="font-serif italic text-xl text-[#E8E8EA] mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm text-[#9A9AA0] mb-2 block">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-[#E8E8EA] placeholder:text-[#9A9AA0]/40 focus:outline-none focus:border-white/25 transition-colors"
                  placeholder="Your Name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="text-sm text-[#9A9AA0] mb-2 block">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-[#E8E8EA] placeholder:text-[#9A9AA0]/40 focus:outline-none focus:border-white/25 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="text-sm text-[#9A9AA0] mb-2 block">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-[#E8E8EA] placeholder:text-[#9A9AA0]/40 focus:outline-none focus:border-white/25 transition-colors resize-none"
                  placeholder="How can I help you?"
                />
              </div>
              
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3.5 rounded-xl font-semibold text-[#0A0A0C] transition-all duration-300 hover:opacity-90 hover:scale-[1.01] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed mt-2"
                style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #8E8E93 50%, #C8C9CC 100%)' }}
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <p className="text-green-400 text-sm mt-4 text-center">Message sent successfully!</p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-sm mt-4 text-center">Failed to send message. Please try again.</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
