import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Coffee, 
  BookOpen, 
  GraduationCap, 
  PhoneCall, 
  Info, 
  ArrowRight, 
  Compass, 
  Sparkles, 
  ChevronDown, 
  Users, 
  Award,
  Leaf
} from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  currentView: string;
  setView: (view: string) => void;
}

export default function Navbar({ currentView, setView }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Coffee },
    { id: 'about', label: 'About VIBIT', icon: Info },
    { id: 'courses', label: 'Courses', icon: BookOpen, hasDropdown: true },
    { id: 'admissions', label: 'Admissions', icon: GraduationCap },
    { id: 'student-life', label: 'Student Life', icon: Users },
    { id: 'resources', label: 'News & Blog', icon: Compass },
    { id: 'contact', label: 'Contact', icon: PhoneCall },
  ];

  const courseDepartments = [
    {
      title: "Coffee Courses",
      icon: Coffee,
      badge: "6 Specialized Tracks",
      desc: "Coffee Technology, Production, Processing, Cupping, Roasting & Barista Training",
      color: "text-[#C28A4E]"
    },
    {
      title: "Agriculture Courses",
      icon: Leaf,
      badge: "AgTech & Trade",
      desc: "Agripreneurship, AI in Agriculture & Sustainable Crop Production",
      color: "text-emerald-600"
    },
    {
      title: "TVET Programmes",
      icon: Award,
      badge: "CDACC Level 5 & 6",
      desc: "Diploma & Certificate in Co-operative Management, Professional Mixology",
      color: "text-amber-700"
    }
  ];

  const handleNavClick = (id: string) => {
    setView(id);
    setIsOpen(false);
    setCoursesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#2E221C]/10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
            id="nav-logo"
          >
            <Logo className="h-12 w-12 hover:scale-105 transition-all duration-300 drop-shadow-xs shrink-0" />
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
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              if (item.hasDropdown) {
                return (
                  <div 
                    key={item.id}
                    className="relative group"
                    onMouseEnter={() => setCoursesDropdownOpen(true)}
                    onMouseLeave={() => setCoursesDropdownOpen(false)}
                  >
                    <button
                      id={`nav-link-${item.id}`}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                        isActive 
                          ? 'bg-[#2E221C] text-[#FAF6F0] shadow-xs' 
                          : 'text-[#2E221C]/80 hover:text-[#2E221C] hover:bg-[#2E221C]/5'
                      }`}
                    >
                      <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-[#C28A4E]' : 'text-[#8E7C74]'}`} />
                      <span>{item.label}</span>
                      <ChevronDown className="h-3 w-3 text-[#8E7C74] group-hover:rotate-180 transition-transform duration-200" />
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 w-80 bg-white border border-[#2E221C]/10 rounded-2xl shadow-xl p-3 space-y-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#8E7C74] px-3 py-1 border-b border-[#2E221C]/5">
                        Academic Departments
                      </div>
                      {courseDepartments.map((dept, dIdx) => (
                        <div
                          key={dIdx}
                          onClick={() => handleNavClick('courses')}
                          className="p-2.5 rounded-xl hover:bg-[#FAF6F0] transition-colors cursor-pointer space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-serif font-bold text-xs text-[#2E221C] flex items-center space-x-1.5">
                              <dept.icon className={`h-3.5 w-3.5 ${dept.color}`} />
                              <span>{dept.title}</span>
                            </span>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm bg-[#2E221C]/5 text-[#8E7C74]">
                              {dept.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#8E7C74] line-clamp-2 leading-relaxed">
                            {dept.desc}
                          </p>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-[#2E221C]/5">
                        <button
                          onClick={() => handleNavClick('courses')}
                          className="w-full text-center text-xs font-bold text-[#C28A4E] hover:text-[#A9743B] py-1 flex items-center justify-center space-x-1 cursor-pointer"
                        >
                          <span>Explore All Programs</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                    isActive 
                      ? 'bg-[#2E221C] text-[#FAF6F0] shadow-xs' 
                      : 'text-[#2E221C]/80 hover:text-[#2E221C] hover:bg-[#2E221C]/5'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-[#C28A4E]' : 'text-[#8E7C74]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action CTA Button */}
          <div className="hidden lg:flex items-center space-x-2">
            <button
              id="nav-btn-apply"
              onClick={() => handleNavClick('admissions')}
              className="relative flex items-center space-x-1.5 bg-[#C28A4E] hover:bg-[#A9743B] text-white px-4 py-2.5 rounded-xl font-bold text-xs tracking-wide shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Apply Online</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-[#2E221C] hover:bg-[#2E221C]/5 focus:outline-none cursor-pointer"
              aria-expanded="false"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#FAF6F0] border-b border-[#2E221C]/10 py-4 px-4 space-y-1.5 shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center space-x-3 w-full px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-[#2E221C] text-[#FAF6F0]' 
                    : 'text-[#2E221C]/80 hover:bg-[#2E221C]/5'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-[#C28A4E]' : 'text-[#8E7C74]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          
          <div className="pt-3 border-t border-[#2E221C]/10">
            <button
              id="mobile-nav-btn-apply"
              onClick={() => handleNavClick('admissions')}
              className="flex items-center justify-center space-x-2 w-full bg-[#C28A4E] text-white py-3 rounded-xl font-bold text-sm shadow-xs hover:bg-[#A9743B] transition-colors cursor-pointer"
            >
              <span>Apply Online Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
