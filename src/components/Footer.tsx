import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Award } from 'lucide-react';
import Logo from './Logo';

// Custom SVG Icons for WhatsApp, Facebook, Instagram
const WhatsAppIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const FacebookIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TikTokIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.89-2.88 2.89 2.89 0 0 1 2.89-2.88c.28 0 .54.04.79.1v-3.52a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.14 15.65 6.34 6.34 0 0 0 9.48 22a6.34 6.34 0 0 0 6.34-6.35V8.71a8.18 8.18 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.14z" />
  </svg>
);

interface FooterProps {
  setView: (view: string) => void;
}

export default function Footer({ setView }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleLinkClick = (viewId: string) => {
    setView(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#110E0C] text-[#FAF6F0] pt-16 pb-8 border-t border-[#FAF6F0]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section - Grid of Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 cursor-pointer animate-fade-in" onClick={() => handleLinkClick('home')} id="footer-logo">
              <Logo className="h-11 w-11 drop-shadow-md hover:scale-105 transition-all duration-300" />
              <div>
                <span className="font-serif text-xl font-extrabold tracking-tight text-[#FAF6F0] block leading-tight">
                  VIBIT
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#8E7C74] font-bold block">
                  Agricultural Training College
                </span>
              </div>
            </div>
            
            <p className="text-sm text-[#FAF6F0]/70 leading-relaxed">
              VIBIT is a premier TVET-accredited institution bridging the gap between specialty coffee craft and commercial agricultural management. From Seed to Cup, we nurture future industry leaders.
            </p>

            <div className="flex items-center space-x-3 text-xs bg-[#2E221C]/50 p-3.5 rounded-xl border border-[#C28A4E]/20">
              <Award className="h-5 w-5 text-[#C28A4E] shrink-0" />
              <span className="text-[#FAF6F0]/80">Approved TVET Institution & SCA Network Partner</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-serif text-base font-bold text-[#C28A4E] tracking-wide uppercase mb-6">
              Our Institution
            </h4>
            <ul className="space-y-3.5">
              {[
                { id: 'home', label: 'Welcome Portal' },
                { id: 'about', label: 'Our Standards & Labs' },
                { id: 'courses', label: 'Program Catalog' },
                { id: 'admissions', label: 'Enrollment Portal' },
                { id: 'resources', label: 'Agricultural Guides & Resources' },
                { id: 'contact', label: 'Contact Registrar' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    id={`footer-nav-${link.id}`}
                    onClick={() => handleLinkClick(link.id)}
                    className="text-sm text-[#FAF6F0]/70 hover:text-[#C28A4E] transition-colors font-medium text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Contact */}
          <div>
            <h4 className="font-serif text-base font-bold text-[#C28A4E] tracking-wide uppercase mb-6">
              Registrar Office
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-[#FAF6F0]/70">
                <MapPin className="h-5 w-5 text-[#C28A4E] shrink-0 mt-0.5" />
                <span>Leomar Court, 45 Westlands Road, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-[#FAF6F0]/70">
                <Phone className="h-5 w-5 text-[#C28A4E] shrink-0" />
                <a href="tel:0708137992" className="hover:text-[#C28A4E] transition-colors">0708 137992 / +254 708 137992</a>
              </li>
              <li className="flex items-center space-x-3 text-sm text-[#FAF6F0]/70">
                <a 
                  href="https://wa.me/254708137992?text=Hello%20VIBIT%20College%20Registrar%2C%20I%20have%20an%20inquiry." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <WhatsAppIcon className="h-5 w-5 text-emerald-500 shrink-0" />
                  <span className="font-medium">WhatsApp: 0708 137992</span>
                </a>
              </li>
              <li className="flex items-center space-x-3 text-sm text-[#FAF6F0]/70">
                <Mail className="h-5 w-5 text-[#C28A4E] shrink-0" />
                <a href="mailto:vbitschoolofcoffeagribusiness@gmail.com" className="hover:text-[#C28A4E] transition-colors">vbitschoolofcoffeagribusiness@gmail.com</a>
              </li>
              <li className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                <a 
                  href="https://facebook.com/vibitagriculturalcollege" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#2E221C] hover:bg-blue-600 text-white p-2 rounded-lg border border-white/10 transition-colors flex items-center space-x-1.5"
                  title="Facebook Page"
                >
                  <FacebookIcon className="h-4 w-4" />
                  <span>Facebook</span>
                </a>
                <a 
                  href="https://instagram.com/vibit_agricultural_college" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#2E221C] hover:bg-pink-600 text-white p-2 rounded-lg border border-white/10 transition-colors flex items-center space-x-1.5"
                  title="Instagram Feed"
                >
                  <InstagramIcon className="h-4 w-4" />
                  <span>Instagram</span>
                </a>
                <a 
                  href="https://www.tiktok.com/@vbit_shool" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#2E221C] hover:bg-black text-white p-2 rounded-lg border border-white/10 transition-colors flex items-center space-x-1.5"
                  title="TikTok Channel (vbit shool)"
                >
                  <TikTokIcon className="h-4 w-4" />
                  <span>TikTok</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter Subscription */}
          <div>
            <h4 className="font-serif text-base font-bold text-[#C28A4E] tracking-wide uppercase mb-6">
              Industry Newsletter
            </h4>
            <p className="text-sm text-[#FAF6F0]/70 mb-4">
              Get bi-weekly research digests, coffee market price trends, and upcoming masterclass slots.
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  id="newsletter-email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAF6F0]/5 border border-[#FAF6F0]/10 rounded-xl px-4 py-3 text-sm text-[#FAF6F0] placeholder-[#FAF6F0]/40 focus:border-[#C28A4E] focus:bg-[#FAF6F0]/10 transition-all"
                  required
                />
                <button
                  type="submit"
                  id="newsletter-submit"
                  className="absolute right-2 top-2 bg-[#C28A4E] hover:bg-[#A4713C] text-white p-1.5 rounded-lg transition-all cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>

            {subscribed && (
              <div className="mt-3 flex items-center space-x-2 text-xs text-green-400 bg-green-500/10 p-2.5 rounded-lg border border-green-500/20">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Subscribed! Check your inbox for VIBIT Welcome Kit.</span>
              </div>
            )}
          </div>

        </div>

        {/* Local SEO Keyword Hub for Search Engines */}
        <div className="my-8 py-4 px-6 bg-white/5 rounded-2xl border border-white/10 text-center space-y-2">
          <p className="text-xs font-bold text-[#C28A4E] uppercase tracking-wider">
            #1 Rated Accredited Coffee School in Nairobi, Kenya
          </p>
          <p className="text-xs text-[#FAF6F0]/60 leading-relaxed max-w-5xl mx-auto">
            VIBIT Agricultural Training College is the leading TVET-registered <strong>coffee school in Nairobi</strong>. Located at Leomar Court, Westlands Road No. 45, Nairobi, we offer hands-on <strong>barista training in Nairobi</strong>, professional coffee cupping & Q-grading certification, commercial coffee roasting, and agribusiness diploma courses across Kenya and East Africa.
          </p>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="pt-8 border-t border-[#FAF6F0]/10 text-center md:flex md:justify-between md:items-center">
          <p className="text-xs text-[#FAF6F0]/50">
            &copy; {new Date().getFullYear()} VIBIT Agricultural Training College. All Rights Reserved. TVET Board Reg No: TVET/AGRICULTURE/2024/098
          </p>
          <div className="mt-4 md:mt-0 flex justify-center space-x-6 text-xs text-[#FAF6F0]/50">
            <a href="#" className="hover:text-[#C28A4E] transition-colors">Academic Catalog</a>
            <a href="#" className="hover:text-[#C28A4E] transition-colors">Student Handbook</a>
            <a href="#" className="hover:text-[#C28A4E] transition-colors">Privacy Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
