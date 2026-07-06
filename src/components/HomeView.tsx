import React, { useState } from 'react';
import { ArrowRight, Star, Award, Leaf, Flame, ShieldAlert, Sparkles, MoveRight, Users, Compass, BookOpen } from 'lucide-react';
import { TESTIMONIALS, LOGO_URL } from '../data';
import PhotoGallery from './PhotoGallery';

// Import our real student and campus photos
import studentsBuilding from '../assets/images/students_building_1783338059168.jpg';
import studentsAccreditation from '../assets/images/students_accreditation_1783338111803.jpg';
import sortingBeans from '../assets/images/sorting_beans_1783338143134.jpg';
import latteArtCup from '../assets/images/latte_art_cup_1783338158532.jpg';

interface HomeViewProps {
  setView: (view: string) => void;
  setSelectedCourseId?: (id: string | null) => void;
}

export default function HomeView({ setView, setSelectedCourseId }: HomeViewProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const stats = [
    { value: '15+', label: 'Expert Instructors', desc: 'SCA Certified Practitioners' },
    { value: '2.5k+', label: 'Graduated Alumni', desc: 'Worldwide Coffee Leaders' },
    { value: '4', label: 'Advanced Labs', desc: 'State-of-the-art sensory/roast gears' },
    { value: '100%', label: 'Hands-on Practice', desc: 'No abstract theory' },
  ];

  const leadingPrograms = [
    {
      id: "diploma-agri",
      title: "Diploma in Agribusiness Management",
      duration: "2 Years",
      highlight: "Comprehensive agronomy & trade principles",
      badge: "High Enrollment",
      color: "border-emerald-600/30 text-emerald-800 bg-emerald-50"
    },
    {
      id: "cert-barista",
      title: "Certificate in Barista & Coffee Sensory Arts",
      duration: "1 Year",
      highlight: "Advanced espresso, milk texturing & palate metrics",
      badge: "SCA Aligned",
      color: "border-amber-600/30 text-amber-800 bg-amber-50"
    },
    {
      id: "short-roasting",
      title: "Commercial Coffee Roasting Masterclass",
      duration: "1 Month",
      highlight: "Drum roaster mechanics, gas logging & profiling",
      badge: "Executive Favorite",
      color: "border-rose-600/30 text-rose-800 bg-rose-50"
    }
  ];

  const handleProgramClick = (id: string) => {
    if (setSelectedCourseId) {
      setSelectedCourseId(id);
    }
    setView('courses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-24 pb-20 animate-fade-in" id="home-view">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with elegant heavy overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={studentsBuilding}
            alt="VIBIT Agricultural Training College Campus" 
            className="w-full h-full object-cover scale-105 transform hover:scale-100 transition-transform duration-[10s]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#110E0C] via-[#110E0C]/75 to-transparent"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content Box */}
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="inline-flex items-center space-x-2 bg-[#FAF6F0]/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-[#FAF6F0] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="h-4 w-4 text-[#C28A4E]" />
            <span>Admissions Now Open • Academic Year 2024/2025</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            Master the Art of Coffee <br />
            <span className="text-[#C28A4E]">From Bean to Market</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-200 font-medium leading-relaxed">
            Acquire world-class training in sustainable agronomy, sensory profiling, commercial roasting, and agribusiness enterprise. Bridging local farming excellence with the global coffee economy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              id="hero-apply-btn"
              onClick={() => setView('admissions')}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#C28A4E] hover:bg-[#A4713C] text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <span>Apply Online Portal</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              id="hero-courses-btn"
              onClick={() => setView('courses')}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-base border border-white/30 backdrop-blur-sm transition-all cursor-pointer"
            >
              <span>Explore Programs</span>
              <BookOpen className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. QUICK STATS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="bg-[#2E221C] text-[#FAF6F0] rounded-2xl p-8 sm:p-12 shadow-2xl border border-[#C28A4E]/20 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center space-y-1.5 border-r border-[#FAF6F0]/10 last:border-0" id={`stat-card-${idx}`}>
              <div className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#C28A4E]">
                {stat.value}
              </div>
              <div className="text-sm font-bold tracking-tight text-white">{stat.label}</div>
              <div className="text-[11px] text-[#FAF6F0]/60 uppercase tracking-wider">{stat.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ABOUT US INTRO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Text Left */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#C28A4E]">
              Crafting Careers from the Ground Up
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2E221C] leading-tight">
              Bridging the gap between agricultural heritage and specialty markets.
            </h2>
            <div className="w-16 h-1 bg-[#C28A4E] rounded"></div>
            <p className="text-[#2E221C]/80 leading-relaxed text-base sm:text-lg">
              At VIBIT Agricultural Training College, we empower students with immersive, completely practical education. Our campus acts as a mini-cooperative value chain, enabling you to study breeding inside our nursery, harvest cherries, process them, roast them commercially, and serve them as a qualified barista.
            </p>
            <p className="text-[#2E221C]/70 text-sm">
              Whether you are an aspiring entrepreneur seeking to launch a specialty cafe, a farming cooperative manager modernizing local practices, or a professional aiming for international roasting championships, VIBIT supplies the state-of-the-art facilities and mentors to secure your success.
            </p>
            <div className="pt-4">
              <button
                id="about-read-more"
                onClick={() => setView('about')}
                className="inline-flex items-center space-x-2 text-[#C28A4E] hover:text-[#A4713C] font-bold text-sm group cursor-pointer"
              >
                <span>Discover our Standards & Facilities</span>
                <MoveRight className="h-5 w-5 transform group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Graphic Image Right */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-[#C28A4E]/10 rounded-3xl -rotate-2"></div>
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-[#2E221C]/10 aspect-4/3">
              <img 
                src={studentsAccreditation}
                alt="Accredited Practical Training at VIBIT"
                className="w-full h-full object-cover animate-fade-in"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#FAF6F0] border border-[#2E221C]/10 p-4 rounded-xl shadow-lg flex items-center space-x-3 max-w-[240px]">
              <div className="bg-green-100 p-2 rounded-lg text-green-800">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-[#8E7C74] font-semibold leading-none">Global Network</div>
                <div className="font-serif text-sm font-bold text-[#2E221C] mt-1">SCA Aligned Curriculum</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE VIBIT BENTO GRID */}
      <section className="bg-[#FAF6F0]/40 py-20 border-y border-[#2E221C]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#C28A4E]">Why Choose VIBIT</div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2E221C]">
              Built Around Practical, Real-world Laboratory Dynamics
            </h2>
            <p className="text-sm text-[#2E221C]/70">
              We focus purely on hands-on craft. Every theory module is validated in our sensory labs, roastery bays, or green greenhouses.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            
            {/* Box 1 - Certification */}
            <div className="lg:col-span-7 bg-white border border-[#2E221C]/5 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row h-[320px]">
              <div className="p-8 flex flex-col justify-between md:w-1/2">
                <div className="space-y-4">
                  <span className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                    <Award className="h-3 w-3 mr-1" /> TVET Approved
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#2E221C]">TVET Board Approved Certification</h3>
                  <p className="text-xs text-[#2E221C]/70 leading-relaxed">
                    All long-term diplomas and certificate programs are fully approved by the Technical and Vocational Education and Training (TVET) Authority, offering a valid academic foundation recognized across Africa.
                  </p>
                </div>
                <div className="text-xs text-[#8E7C74] font-medium">Valid Government Accreditation</div>
              </div>
              <div className="md:w-1/2 h-full">
                <img 
                  src={studentsAccreditation}
                  alt="Gold Seal TVET Certificate and Accreditation Banner"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Box 2 - Industry Connections */}
            <div className="lg:col-span-5 bg-white border border-[#2E221C]/5 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between p-8 h-[320px]">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                    <Compass className="h-3 w-3 mr-1" /> Global Reach
                  </span>
                  <img 
                    src={latteArtCup} 
                    alt="Industry grade latte art"
                    className="h-14 w-14 rounded-full object-cover border-2 border-[#C28A4E]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2E221C]">Direct Cooperative Connections</h3>
                <p className="text-xs text-[#2E221C]/70 leading-relaxed">
                  We maintain partnerships with local farming cooperatives, green buyers, and international roasters. Our career office coordinates annual internships, giving students a direct avenue to work immediately after coursework completes.
                </p>
              </div>
              <div className="text-xs text-[#8E7C74] font-medium">92% Immediate Employment Rate</div>
            </div>

            {/* Box 3 - Barista Arts */}
            <div className="lg:col-span-5 bg-[#2E221C] text-[#FAF6F0] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between p-8 h-[320px]">
              <div className="space-y-4">
                <span className="inline-flex items-center px-3 py-1 bg-[#FAF6F0]/10 text-[#C28A4E] text-xs font-bold rounded-full">
                  <Flame className="h-3 w-3 mr-1" /> Barista Masters
                </span>
                <h3 className="font-serif text-xl font-bold text-white">World-Class Barista Arts</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Train on professional-grade multi-boiler espresso systems, utilizing precision digital gravimetric grinders to achieve micro-foam perfection. Discover milk chemistry, high-volume ergonomics, and latte art styling.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#C28A4E] font-medium">La Marzocco Partnership</span>
                <img 
                  src={latteArtCup} 
                  alt="Barista art"
                  className="h-12 w-12 rounded-xl object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Box 4 - Plantation Excellence */}
            <div className="lg:col-span-7 bg-white border border-[#2E221C]/5 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row h-[320px]">
              <div className="md:w-1/2 h-full">
                <img 
                  src={sortingBeans}
                  alt="Students sorting beans at campus nursery"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 flex flex-col justify-between md:w-1/2">
                <div className="space-y-4">
                  <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                    <Leaf className="h-3 w-3 mr-1" /> Sustainable Farming
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#2E221C]">Seed-to-Cup Agronomy</h3>
                  <p className="text-xs text-[#2E221C]/70 leading-relaxed">
                    Gain essential understanding of organic soil health, smart water infrastructure, botanical genetics, shade management, and disease mitigation inside our on-campus experimental commons.
                  </p>
                </div>
                <div className="text-xs text-[#8E7C74] font-medium">Eco-friendly Practices & Standards</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. LEADING PROGRAMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-4">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#C28A4E]">Our Leading Programs</div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2E221C]">
              Launch a Specialized Career Path
            </h2>
          </div>
          <button
            id="view-all-courses-btn"
            onClick={() => setView('courses')}
            className="inline-flex items-center space-x-2 bg-[#2E221C] hover:bg-[#110E0C] text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-md transition-colors w-max cursor-pointer"
          >
            <span>View Complete Catalog</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Programs cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadingPrograms.map((program) => (
            <div 
              key={program.id} 
              id={`program-highlight-${program.id}`}
              className="bg-white border border-[#2E221C]/5 rounded-2xl p-8 hover:shadow-xl hover:border-[#C28A4E]/20 transition-all flex flex-col justify-between h-[280px]"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase border ${program.color}`}>
                    {program.badge}
                  </span>
                  <span className="text-xs font-semibold text-[#8E7C74]">{program.duration}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2E221C] hover:text-[#C28A4E] transition-colors cursor-pointer" onClick={() => handleProgramClick(program.id)}>
                  {program.title}
                </h3>
                <p className="text-xs text-[#2E221C]/70 leading-relaxed">
                  {program.highlight}
                </p>
              </div>
              <button
                id={`program-link-${program.id}`}
                onClick={() => handleProgramClick(program.id)}
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#C28A4E] hover:text-[#A4713C] transition-colors text-left"
              >
                <span>Syllabus & Tuition Calculator</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* PHOTO GALLERY SECTION */}
      <PhotoGallery />

      {/* 6. TESTIMONIAL CAROUSEL */}
      <section className="bg-[#110E0C] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#110E0C]"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          <div className="text-center space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C28A4E]">Our Alumni Stories</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Success Measured by Our Graduates' Careers
            </h2>
          </div>

          {/* Testimonial Active Slider Box */}
          <div className="bg-[#FAF6F0]/5 border border-white/10 rounded-3xl p-8 sm:p-12 relative">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              
              {/* Photo */}
              <div className="md:col-span-4 flex justify-center">
                <div className="relative h-44 w-44 sm:h-52 sm:w-52 rounded-2xl overflow-hidden border-2 border-[#C28A4E]/30 shadow-lg">
                  <img 
                    src={TESTIMONIALS[activeTestimonial].image} 
                    alt={TESTIMONIALS[activeTestimonial].name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Quote Content */}
              <div className="md:col-span-8 space-y-6">
                <div className="flex space-x-1 text-[#C28A4E]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-[#C28A4E]" />)}
                </div>
                
                <p className="font-serif text-lg sm:text-xl md:text-2xl italic leading-relaxed text-gray-200">
                  "{TESTIMONIALS[activeTestimonial].quote}"
                </p>

                <div className="space-y-1">
                  <h4 className="font-bold text-base text-white">{TESTIMONIALS[activeTestimonial].name}</h4>
                  <div className="text-xs text-[#C28A4E] font-semibold">{TESTIMONIALS[activeTestimonial].role}</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest">{TESTIMONIALS[activeTestimonial].year}</div>
                </div>
              </div>

            </div>

            {/* Slider Dots */}
            <div className="absolute bottom-6 right-8 flex space-x-2">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  id={`testimonial-dot-${idx}`}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2.5 w-2.5 rounded-full transition-all cursor-pointer ${
                    activeTestimonial === idx ? 'bg-[#C28A4E] w-6' : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#C28A4E] rounded-3xl p-8 sm:p-16 text-center space-y-8 relative overflow-hidden shadow-xl border border-white/10 text-white">
          <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full filter blur-xl transform translate-x-10 -translate-y-10"></div>
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold max-w-3xl mx-auto leading-tight">
            Ready to shape your future in specialty coffee & agribusiness?
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-white/90">
            Secure your slot for the upcoming intake. Speak directly with our admissions board or schedule an immersive campus tour today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="cta-apply-btn"
              onClick={() => setView('admissions')}
              className="w-full sm:w-auto bg-[#2E221C] hover:bg-[#110E0C] text-[#FAF6F0] font-bold px-8 py-4 rounded-xl text-base shadow-lg transition-colors cursor-pointer"
            >
              Start Online Enrollment
            </button>
            <button
              id="cta-contact-btn"
              onClick={() => setView('contact')}
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white font-bold px-8 py-4 rounded-xl text-base border border-white/40 transition-colors cursor-pointer"
            >
              Consult Admissions Team
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
