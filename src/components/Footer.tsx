import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Award } from 'lucide-react';
import Logo from './Logo';

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
                <span>Leomar Court, Westlands Road No. 45, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-[#FAF6F0]/70">
                <Phone className="h-5 w-5 text-[#C28A4E] shrink-0" />
                <span>+254 708 137992</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-[#FAF6F0]/70">
                <Mail className="h-5 w-5 text-[#C28A4E] shrink-0" />
                <span>info@vibiagriculrturaltraningcollege.co.ke</span>
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

        {/* Bottom Section - Copyright */}
        <div className="pt-8 border-t border-[#FAF6F0]/10 text-center md:flex md:justify-between md:items-center">
          <p className="text-xs text-[#FAF6F0]/50">
            &copy; {new Date().getFullYear()} VIBIT Agricultural Training College. All Rights Reserved. TVET Board Reg No: TVET/COFFEE/2024/098
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
