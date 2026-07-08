import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Star, Award, Leaf, Flame, ShieldAlert, Sparkles, MoveRight, Users, Compass, BookOpen } from 'lucide-react';
import { TESTIMONIALS, LOGO_URL } from '../data';
import PhotoGallery from './PhotoGallery';
import CoffeeLabs from './CoffeeLabs';

// Import our real student and campus photos
import studentsBuilding from '../assets/images/students_building_1783338059168.jpeg';
import studentsAccreditation from '../assets/images/students_accreditation_1783338111803.jpeg';
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
    <div className="space-y-24 pb-20" id="home-view">
      
      {/* 1. APPLE-INSPIRED HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-amber-50/10 to-[#FAF6F0]/20 py-16 sm:py-24 lg:py-32">
        {/* Subtle decorative background gradient circles */}
        <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-red-500/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-12 left-12 h-[300px] w-[300px] bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Side: Elegant Display Copy (7 cols) */}
            <motion.div 
              className="lg:col-span-7 space-y-8 text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                className="inline-flex items-center space-x-2 bg-gray-50 border border-gray-200/60 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-gray-700 shadow-xs"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <span className="h-1.5 w-1.5 bg-[#b6171e] rounded-full animate-pulse" />
                <span>Admission Intake Now Open • Academic Year 2024 / 2025</span>
              </motion.div>

              <div className="space-y-4">
                <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1] md:leading-[1.05]">
                  Crafting the Future of <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-gray-900 via-[#271310] to-[#b6171e] bg-clip-text text-transparent">Specialty Coffee</span>
                </h1>
                <p className="font-serif text-lg sm:text-xl text-[#271310]/80 italic max-w-xl">
                  "Seed to Cup, farm management to luxury branding."
                </p>
              </div>

              <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl">
                Gain hands-on expertise inside Africa's premier coffee training academy. From nursery genetics and high-elevation cultivation to roasting gas metrics, sensory science, and barista calibration.
              </p>

              {/* Apple-style Premium Action Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <motion.button
                  id="hero-apply-btn"
                  onClick={() => setView('admissions')}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Apply Online Portal</span>
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
                <motion.button
                  id="hero-courses-btn"
                  onClick={() => setView('courses')}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-xl font-bold text-sm border border-gray-200 shadow-xs transition-all cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Explore Programs</span>
                  <BookOpen className="h-4 w-4 text-gray-400" />
                </motion.button>
              </div>

              {/* Mini Features List */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100 max-w-md">
                <div>
                  <span className="font-bold text-gray-900 block text-sm">TVET Board</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Approved Certs</span>
                </div>
                <div>
                  <span className="font-bold text-gray-900 block text-sm">SCA Aligned</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Cupping Standard</span>
                </div>
                <div>
                  <span className="font-bold text-gray-900 block text-sm">92% Hired</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Direct Internship</span>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Showcase Photo (5 cols) */}
            <motion.div 
              className="lg:col-span-5 w-full mt-10 lg:mt-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200/80 p-2.5">
                <img 
                  src={studentsBuilding} 
                  alt="VIBIT Student Cohort and Campus" 
                  className="w-full h-auto rounded-xl object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="mt-4 px-3 pb-1.5 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest font-bold text-[#b6171e] font-mono">Admitted Student Cohort</span>
                    <h4 className="font-sans font-extrabold text-sm text-gray-900 mt-0.5">VIBIT Academic Community</h4>
                  </div>
                  <span className="text-[9px] font-bold text-gray-500 bg-gray-100 border border-gray-200/50 px-2.5 py-1 rounded-md uppercase tracking-wider font-mono">TVET Approved</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. QUICK STATS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <motion.div 
          className="bg-[#2E221C] text-[#FAF6F0] rounded-2xl p-8 sm:p-12 shadow-2xl border border-[#C28A4E]/20 grid grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx} 
              className="text-center space-y-1.5 border-r border-[#FAF6F0]/10 last:border-0" 
              id={`stat-card-${idx}`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#C28A4E]">
                {stat.value}
              </div>
              <div className="text-sm font-bold tracking-tight text-white">{stat.label}</div>
              <div className="text-[11px] text-[#FAF6F0]/60 uppercase tracking-wider">{stat.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. ABOUT US INTRO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Text Left */}
          <motion.div 
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
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
          </motion.div>

          {/* Graphic Image Right */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            whileHover={{ y: -6 }}
          >
            <div className="absolute -inset-4 bg-[#C28A4E]/10 rounded-3xl -rotate-2"></div>
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-[#2E221C]/10 aspect-4/3">
              <img 
                src={studentsAccreditation}
                alt="Accredited Practical Training at VIBIT"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <motion.div 
              className="absolute -bottom-6 -left-6 bg-[#FAF6F0] border border-[#2E221C]/10 p-4 rounded-xl shadow-lg flex items-center space-x-3 max-w-[240px]"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-green-100 p-2 rounded-lg text-green-800">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-[#8E7C74] font-semibold leading-none">Global Network</div>
                <div className="font-serif text-sm font-bold text-[#2E221C] mt-1">SCA Aligned Curriculum</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. WHY CHOOSE VIBIT BENTO GRID */}
      <section className="bg-[#FAF6F0]/40 py-20 border-y border-[#2E221C]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <motion.div 
            className="text-center space-y-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#C28A4E]">Why Choose VIBIT</div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2E221C]">
              Built Around Practical, Real-world Laboratory Dynamics
            </h2>
            <p className="text-sm text-[#2E221C]/70">
              We focus purely on hands-on craft. Every theory module is validated in our sensory labs, roastery bays, or green greenhouses.
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            
            {/* Box 1 - Certification */}
            <motion.div 
              className="lg:col-span-7 bg-white border border-[#2E221C]/5 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row h-[320px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)" }}
            >
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
              <div className="md:w-1/2 h-full overflow-hidden">
                <img 
                  src={studentsAccreditation}
                  alt="Gold Seal TVET Certificate and Accreditation Banner"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

            {/* Box 2 - Industry Connections */}
            <motion.div 
              className="lg:col-span-5 bg-white border border-[#2E221C]/5 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between p-8 h-[320px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)" }}
            >
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
            </motion.div>

            {/* Box 3 - Barista Arts */}
            <motion.div 
              className="lg:col-span-5 bg-[#2E221C] text-[#FAF6F0] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between p-8 h-[320px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
            >
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
                  className="h-12 w-12 rounded-xl object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

            {/* Box 4 - Plantation Excellence */}
            <motion.div 
              className="lg:col-span-7 bg-white border border-[#2E221C]/5 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row h-[320px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)" }}
            >
              <div className="md:w-1/2 h-full overflow-hidden">
                <img 
                  src={sortingBeans}
                  alt="Students sorting beans at campus nursery"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. LEADING PROGRAMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <motion.div 
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-4">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#C28A4E]">Our Leading Programs</div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2E221C]">
              Launch a Specialized Career Path
            </h2>
          </div>
          <motion.button
            id="view-all-courses-btn"
            onClick={() => setView('courses')}
            className="inline-flex items-center space-x-2 bg-[#2E221C] hover:bg-[#110E0C] text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-md transition-colors w-max cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View Complete Catalog</span>
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </motion.div>

        {/* Programs cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadingPrograms.map((program, idx) => (
            <motion.div 
              key={program.id} 
              id={`program-highlight-${program.id}`}
              className="bg-white border border-[#2E221C]/5 rounded-2xl p-8 hover:shadow-xl hover:border-[#C28A4E]/20 transition-all flex flex-col justify-between h-[280px]"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)" }}
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
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#C28A4E] hover:text-[#A4713C] transition-colors text-left cursor-pointer"
              >
                <span>Syllabus & Tuition Calculator</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#C28A4E]" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE COFFEE LABS WORKSPACE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CoffeeLabs />
      </section>

      {/* PHOTO GALLERY SECTION */}
      <PhotoGallery />

      {/* 6. TESTIMONIAL CAROUSEL */}
      <section className="bg-[#110E0C] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#110E0C]"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          <motion.div 
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C28A4E]">Our Alumni Stories</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Success Measured by Our Graduates' Careers
            </h2>
          </motion.div>

          {/* Testimonial Active Slider Box with internal exit/entry animation */}
          <motion.div 
            className="bg-[#FAF6F0]/5 border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center"
              >
                
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

              </motion.div>
            </AnimatePresence>

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
          </motion.div>
        </div>
      </section>

      {/* 7. CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="bg-[#C28A4E] rounded-3xl p-8 sm:p-16 text-center space-y-8 relative overflow-hidden shadow-xl border border-white/10 text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full filter blur-xl transform translate-x-10 -translate-y-10"></div>
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold max-w-3xl mx-auto leading-tight">
            Ready to shape your future in specialty coffee & agribusiness?
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-white/90">
            Secure your slot for the upcoming intake. Speak directly with our admissions board or schedule an immersive campus tour today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              id="cta-apply-btn"
              onClick={() => setView('admissions')}
              className="w-full sm:w-auto bg-[#2E221C] hover:bg-[#110E0C] text-[#FAF6F0] font-bold px-8 py-4 rounded-xl text-base shadow-lg transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Online Enrollment
            </motion.button>
            <motion.button
              id="cta-contact-btn"
              onClick={() => setView('contact')}
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white font-bold px-8 py-4 rounded-xl text-base border border-white/40 transition-colors cursor-pointer"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.98 }}
            >
              Consult Admissions Team
            </motion.button>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
