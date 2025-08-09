
import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'Haadheesheeraz2004@gmail.com'
        }
      );
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Email send failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
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

  return (
    <section id="contact" className="py-20 bg-portfolio-black">
      <div className="container mx-auto px-4">
        <div 
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="section-heading text-center">Get In Touch</h2>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-portfolio-darkgray rounded-lg p-6 border border-portfolio-gold/10">
              <h3 className="font-serif text-xl text-portfolio-gold mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <a href="mailto:Haadheesheeraz2004@gmail.com" className="contact-link">
                  <Mail size={20} className="text-portfolio-gold" />
                  <span>Haadheesheeraz2004@gmail.com</span>
                </a>
                
                <a href="tel:+923258660707" className="contact-link">
                  <Phone size={20} className="text-portfolio-gold" />
                  <span>+923258660707</span>
                </a>
                
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <Github size={20} className="text-portfolio-gold" />
                  <span>GitHub</span>
                </a>
                
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <Linkedin size={20} className="text-portfolio-gold" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
            
            <div className="bg-portfolio-darkgray rounded-lg p-6 border border-portfolio-gold/10">
              <h3 className="font-serif text-xl text-portfolio-gold mb-4">Send a Message</h3>
              
              {submitStatus === 'success' && (
                <div className="mb-4 p-3 bg-green-900/20 border border-green-500/50 rounded text-green-400 text-sm">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-4 p-3 bg-red-900/20 border border-red-500/50 rounded text-red-400 text-sm">
                  Failed to send message. Please try again or contact me directly.
                </div>
              )}
              
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm text-portfolio-lightgray/70 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-portfolio-black border border-portfolio-gold/20 rounded px-3 py-2 text-portfolio-lightgray focus:outline-none focus:border-portfolio-gold"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm text-portfolio-lightgray/70 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-portfolio-black border border-portfolio-gold/20 rounded px-3 py-2 text-portfolio-lightgray focus:outline-none focus:border-portfolio-gold"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm text-portfolio-lightgray/70 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full bg-portfolio-black border border-portfolio-gold/20 rounded px-3 py-2 text-portfolio-lightgray focus:outline-none focus:border-portfolio-gold"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-portfolio-gold text-portfolio-black font-medium rounded-md hover:bg-portfolio-gold/90 transition-all w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
