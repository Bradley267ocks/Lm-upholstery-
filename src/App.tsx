/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  Armchair, 
  Car, 
  Tent, 
  Bed, 
  Scissors, 
  Camera,
  ChevronRight,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

type Page = 'home' | 'services' | 'gallery' | 'contact';

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Handle URL hash for navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as Page;
      if (['home', 'services', 'gallery', 'contact'].includes(hash)) {
        setActivePage(hash);
      } else {
        setActivePage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: Page) => {
    window.location.hash = page;
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // NOTE: Replace 'your-form-id' with your actual Formspree endpoint ID
      // Example: https://formspree.io/f/xyzkpvwr
      const response = await fetch('https://formspree.io/f/your-form-id', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
        alert('Oops! There was a problem submitting your form. Please check the Formspree ID in the code or try again later.');
      }
    } catch (err) {
      setFormStatus('error');
      alert('There was an error sending your message. Please try again or call us directly.');
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Contact', id: 'contact' },
  ];

  const services = [
    {
      title: 'Upholstery',
      description: 'Expert reupholstering for all types of couches, chairs, and furniture. Give your old favorites a brand new life.',
      icon: <Armchair className="w-8 h-8" />,
    },
    {
      title: 'Motor Trimming',
      description: 'Professional car seat repairs, interior renewals, and custom automotive trimming for all vehicle models.',
      icon: <Car className="w-8 h-8" />,
    },
    {
      title: 'Car Ports',
      description: 'Durable awnings and fabric structures designed to protect your vehicles from the harsh sun and weather.',
      icon: <Tent className="w-8 h-8" />,
    },
    {
      title: 'Cushions & Mattress Covers',
      description: 'Custom-made cushions of all shapes and sizes, plus high-quality mattress covers for protection and comfort.',
      icon: <CheckCircle2 className="w-8 h-8" />,
    },
    {
      title: 'New Couches & Headboards',
      description: 'We build beautiful, custom couches and headboards from scratch, exactly to your specifications and design.',
      icon: <Bed className="w-8 h-8" />,
    },
    {
      title: 'Curtain Stitching & Installations',
      description: 'Full curtain service including precision stitching of all designs and professional installation in your home or office.',
      icon: <Scissors className="w-8 h-8" />,
    },
  ];

  return (
    <div className="min-h-screen bg-bg-main text-text-main font-sans selection:bg-brand-primary/20 flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full bg-bg-nav border-b border-slate-100 h-20 flex items-center shrink-0 z-50">
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary opacity-30"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm border border-white/20">LM</div>
            <span className="text-xl font-bold tracking-tight text-text-heading">LM <span className="text-brand-primary">Upholstery</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 text-sm font-semibold uppercase tracking-widest">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigateTo(link.id as Page)}
                className={`transition-colors duration-200 hover:text-brand-primary border-b-2 py-1 ${
                  activePage === link.id ? 'border-brand-primary text-brand-primary' : 'border-transparent text-text-muted'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="tel:0693217404" className="hidden sm:block bg-brand-primary text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-brand-secondary shadow-lg shadow-brand-primary/20 transition-all active:scale-95">
              CALL NOW
            </a>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-brand-primary p-2 rounded-lg hover:bg-brand-primary/10 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-20 left-0 w-full md:hidden bg-white border-b border-slate-100 overflow-hidden shadow-xl"
            >
              <div className="flex flex-col p-6 space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => navigateTo(link.id as Page)}
                    className={`text-left text-xs font-bold uppercase tracking-widest py-4 px-5 rounded-xl transition-all ${
                      activePage === link.id ? 'bg-brand-primary/10 text-brand-primary' : 'text-text-muted hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <motion.section
              key="home"
              id="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-[calc(100vh-128px)] flex items-center justify-center p-8 lg:p-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full max-w-6xl">
                <div className="space-y-8 order-2 md:order-1">
                  <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight text-text-heading">
                    Quality Upholstery & <br />
                    <span className="text-brand-primary drop-shadow-sm">Custom Curtains</span>
                  </h1>
                  <p className="text-lg md:text-xl text-text-muted leading-relaxed">
                    From luxury couches and car seats to bespoke headboards. Expert stitching and installations in Pretoria West since years. Family-run craftsmanship you can trust.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <button 
                      onClick={() => navigateTo('services')}
                      className="px-10 py-5 bg-brand-primary text-white rounded-xl font-bold shadow-xl shadow-brand-primary/20 hover:bg-brand-secondary transition-all active:scale-95 text-lg"
                    >
                      Explore Services
                    </button>
                    <div className="p-4 border-l-4 border-brand-accent bg-blue-50/50 backdrop-blur-sm rounded-r-xl">
                      <p className="text-xs font-bold uppercase text-brand-primary tracking-widest">Free Estimates</p>
                      <p className="text-sm italic font-medium text-text-muted">On-site quotes available</p>
                    </div>
                  </div>
                </div>
                
                <div className="order-1 md:order-2 h-[400px] md:h-[550px] bg-slate-100 rounded-[2.5rem] relative overflow-hidden shadow-2xl ring-8 ring-slate-50 group">
                  {/* Replace with your own hero image */}
                  <img 
                    src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800" 
                    alt="Elegant Living Room" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
              </div>
            </motion.section>
          )}

          {activePage === 'services' && (
            <motion.section
              key="services"
              id="services"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 px-6 lg:px-10 flex flex-col items-center"
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl font-serif font-bold text-text-heading mb-3">Our Specialist Services</h2>
                <div className="inline-flex py-1.5 px-5 bg-white border-2 border-brand-primary text-brand-primary rounded-full font-bold text-xs tracking-widest animate-pulse">
                  PRICE ON REQUEST
                </div>
                <p className="mt-4 text-text-muted font-medium">Premium Craftsmanship at Competitive Rates</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white p-10 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center transition-all hover:shadow-xl hover:shadow-brand-primary/5 hover:border-brand-primary hover:-translate-y-2"
                  >
                    <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-8 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-text-heading">{service.title}</h3>
                    <p className="text-sm text-text-muted leading-relaxed mb-8">
                      {service.description}
                    </p>
                    <button 
                      onClick={() => navigateTo('contact')}
                      className="mt-auto w-full py-3 border-2 border-brand-primary/30 text-brand-primary font-bold rounded-xl hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all text-xs tracking-widest uppercase"
                    >
                      REQUEST QUOTE
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {activePage === 'gallery' && (
            <motion.section
              key="gallery"
              id="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 px-6 lg:px-10 flex flex-col items-center"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-serif font-bold text-text-heading mb-3">Our Recent Work</h2>
                <p className="text-text-muted italic max-w-xl">Every project is handled with precision and care. Browse our portfolio of recent transformations.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-7xl">
                {[
                  "https://i.ibb.co/XrdZgyzY/IMG-20260423-WA0000.jpg",
                  "https://i.ibb.co/HDSyByr5/IMG-20260423-WA0005.jpg",
                  "https://i.ibb.co/ZRhqP5D7/IMG-20260423-WA0012.jpg",
                  "https://i.ibb.co/WW3VX9vQ/IMG-20260423-WA0019.jpg",
                  "https://i.ibb.co/8nC7zYW3/IMG-20260423-WA0020.jpg",
                  "https://i.ibb.co/35F8J4F3/IMG-20260423-WA0001.jpg",
                  "https://i.ibb.co/PGx1GcMT/IMG-20260423-WA0024.jpg",
                  "https://i.ibb.co/B2ZkwK1x/IMG-20260423-WA0002.jpg",
                  "https://i.ibb.co/SXxzVY9n/IMG-20260423-WA0004.jpg",
                  "https://i.ibb.co/d0dk7wLK/IMG-20260423-WA0003.jpg",
                  "https://i.ibb.co/60hn059b/IMG-20260423-WA0006.jpg",
                  "https://i.ibb.co/fKNGVRX/IMG-20260423-WA0007.jpg",
                  "https://i.ibb.co/SwwRFmsH/IMG-20260423-WA0008.jpg",
                  "https://i.ibb.co/r25sy6DX/IMG-20260423-WA0009.jpg",
                  "https://i.ibb.co/B7YxJX7/IMG-20260423-WA0010.jpg",
                  "https://i.ibb.co/RtHr9vW/IMG-20260423-WA0011.jpg",
                  "https://i.ibb.co/1G8TdkQZ/IMG-20260423-WA0016.jpg",
                  "https://i.ibb.co/M5pmXfCp/IMG-20260423-WA0021.jpg",
                  "https://i.ibb.co/nqBdmd55/IMG-20260423-WA0022.jpg",
                  "https://i.ibb.co/4g0XrR2d/IMG-20260423-WA0023.jpg"
                ].map((src, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 4) * 0.05 }}
                    className="aspect-square bg-slate-50 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-brand-primary/20 transition-all group relative"
                  >
                    <img 
                      src={src} 
                      alt={`Gallery Image ${i + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </motion.div>
                ))}
              </div>
              <p className="mt-16 text-sm text-brand-primary font-bold uppercase tracking-widest px-6 py-3 border border-brand-primary/20 rounded-full bg-brand-primary/5">Contact us to discuss your custom project ideas</p>
            </motion.section>
          )}

          {activePage === 'contact' && (
            <motion.section
              key="contact"
              id="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 px-6 lg:px-10 flex items-center justify-center min-h-[calc(100vh-128px)]"
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row border border-slate-100">
                <div className="w-full md:w-2/5 bg-brand-primary p-12 text-white flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                  <div className="relative z-10">
                    <h2 className="text-4xl font-serif font-bold mb-6">Contact Us</h2>
                    <p className="text-white/90 mb-12 font-light leading-relaxed">Send us a message for a free estimate on your next project. We typically respond within 24 hours.</p>
                    <div className="space-y-10">
                      <div className="flex items-start gap-5">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                          <MapPin size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-lg">Visit Us</p>
                          <p className="text-sm text-white/80">261 Mitchell Street, Pretoria West</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-5">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                          <Phone size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-lg">Call White</p>
                          <p className="text-sm text-white/80">069 321 7404</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-5">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                          <Mail size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-lg">Email</p>
                          <p className="text-sm text-white/80 break-all">Whiteprince057@mail.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-white/50 border-t border-white/10 pt-8 mt-16 relative z-10 font-bold">
                    Open Mon-Fri: 08:00 - 17:00
                  </div>
                </div>

                <div className="w-full md:w-3/5 p-12 bg-white">
                  {formStatus === 'success' ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                      <div className="w-24 h-24 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 size={56} />
                      </div>
                      <h4 className="text-3xl font-serif font-bold text-text-heading">Message Delivered</h4>
                      <p className="text-text-muted max-w-sm mx-auto">Thank you for reaching out. We will contact you soon for your free estimate.</p>
                      <button onClick={() => setFormStatus('idle')} className="px-8 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-secondary transition-all mt-6 shadow-lg shadow-brand-primary/20">Send another</button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Full Name</label>
                          <input name="name" required type="text" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary bg-slate-50/50 transition-all" placeholder="Your Name" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Phone</label>
                          <input name="phone" required type="text" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary bg-slate-50/50 transition-all" placeholder="Your Phone" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Email Address</label>
                        <input name="email" required type="email" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary bg-slate-50/50 transition-all" placeholder="example@mail.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Message / Project Details</label>
                        <textarea name="message" required rows={6} className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary bg-slate-50/50 transition-all resize-none" placeholder="Tell us about the services you need..."></textarea>
                      </div>
                      <button type="submit" disabled={formStatus === 'submitting'} className="w-full py-5 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-secondary transition-all shadow-xl shadow-brand-primary/20 mt-4 disabled:opacity-50 active:scale-[0.98]">
                        {formStatus === 'submitting' ? 'SENDING...' : 'REQUEST A FREE QUOTE'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-bg-footer border-t border-slate-100 py-10 px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-bold text-text-muted shrink-0 uppercase tracking-widest gap-4">
        <div>© {new Date().getFullYear()} LM UPHOLSTERY & CURTAINS • PRETORIA WEST</div>
        <div className="flex gap-8 items-center">
          <span className="hidden lg:inline opacity-60">Handcrafted Excellence</span>
          <div className="bg-white border border-brand-primary/30 px-4 py-2 rounded-lg text-brand-primary">PRICE ON REQUEST</div>
          <button onClick={() => navigateTo('contact')} className="text-brand-secondary font-extrabold hover:text-brand-primary transition-colors underline decoration-brand-accent/40 decoration-2 underline-offset-4">CONTACT FOR FREE QUOTE</button>
        </div>
      </footer>
    </div>
  );
}
