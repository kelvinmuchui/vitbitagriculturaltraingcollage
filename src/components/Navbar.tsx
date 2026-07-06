import React, { useState } from 'react';
import { Menu, X, Coffee, BookOpen, GraduationCap, PhoneCall, Info, ArrowRight } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  currentView: string;
  setView: (view: string) => void;
}

export default function Navbar({ currentView, setView }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Coffee },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'courses', label: 'Courses Catalog', icon: BookOpen },
    { id: 'admissions', label: 'Admissions', icon: GraduationCap },
    { id: 'contact', label: 'Contact Us', icon: PhoneCall },
  ];

  const handleNavClick = (id: string) => {
    setView(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#2E221C]/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
            id="nav-logo"
          >
            <Logo className="h-12 w-12 hover:scale-105 transition-all duration-300 drop-shadow-sm shrink-0" />
            <div className="flex flex-col">
              <span className="font-serif text-lg font-extrabold tracking-tight text-[#2E221C] group-hover:text-[#C28A4E] transition-colors leading-tight">
                VIBIT
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#8E7C74] font-bold leading-none">
                Agricultural Training College
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'bg-[#2E221C] text-[#FAF6F0] shadow-sm' 
                      : 'text-[#2E221C]/80 hover:text-[#2E221C] hover:bg-[#2E221C]/5'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-[#C28A4E]' : 'text-[#8E7C74]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action CTA Button */}
          <div className="hidden md:flex items-center">
            <button
              id="nav-btn-apply"
              onClick={() => handleNavClick('admissions')}
              className="relative flex items-center space-x-2 bg-[#C28A4E] hover:bg-[#A4713C] text-white px-5 py-2.5 rounded-xl font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Apply Online</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-[#2E221C] hover:bg-[#2E221C]/5 focus:outline-none"
              aria-expanded="false"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#FAF6F0] border-b border-[#2E221C]/10 py-4 px-4 space-y-2 shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-base font-bold transition-all ${
                  isActive 
                    ? 'bg-[#2E221C] text-[#FAF6F0]' 
                    : 'text-[#2E221C]/80 hover:bg-[#2E221C]/5'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-[#C28A4E]' : 'text-[#8E7C74]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          
          <div className="pt-4 border-t border-[#2E221C]/10">
            <button
              id="mobile-nav-btn-apply"
              onClick={() => handleNavClick('admissions')}
              className="flex items-center justify-center space-x-2 w-full bg-[#C28A4E] text-white py-3.5 rounded-xl font-bold text-base shadow-sm hover:bg-[#A4713C] transition-colors"
            >
              <span>Apply Online Now</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
