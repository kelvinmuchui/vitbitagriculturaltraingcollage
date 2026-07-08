import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Award, Star, Compass, MapPin, Eye, Play, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { FACILITIES } from '../data';

// Import our real student and campus photos
import baristaSmoothies from '../assets/images/barista_smoothies_1783338078505.jpg';
import sortingBeans from '../assets/images/sorting_beans_1783338143134.jpg';

interface AboutViewProps {
  setView: (view: string) => void;
}

export default function AboutView({ setView }: AboutViewProps) {
  const [activeFacilityIdx, setActiveFacilityIdx] = useState(0);

  const activeFacility = FACILITIES[activeFacilityIdx];

  const standards = [
    {
      title: "SCA Standards Aligned",
      description: "Our roasting and sensory modules follow rigorous Specialty Coffee Association protocols, certifying that your training is globally recognized.",
      icon: Award
    },
    {
      title: "Government TVET Accredited",
      description: "Approved by the Technical and Vocational Education and Training Authority, ensuring compliance with strict educational standards.",
      icon: ShieldCheck
    },
    {
      title: "Sustainable Agriculture Network",
      description: "Our horticultural curriculum is modeled around fairtrade, regenerative, shade-grown, and water-conservative farm methodologies.",
      icon: Heart
    }
  ];

  return (
    <div className="space-y-24 pb-20" id="about-view">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-28 flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={baristaSmoothies}
            alt="VIBIT Academic Barista Workshop" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#110E0C]/90 via-[#110E0C]/80 to-[#FAF6F0]"></div>
        </div>

        <motion.div 
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-flex items-center px-3 py-1 bg-[#C28A4E]/20 text-[#C28A4E] text-xs font-bold uppercase tracking-widest rounded-full border border-[#C28A4E]/30">
            About Our Academy
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            Nurturing Expertise <br />
            <span className="text-[#C28A4E]">From Seed to Cup</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-300 leading-relaxed">
            Established to elevate the standards of local coffee production and commercial agriculture, VIBIT Agricultural Training College acts as a direct conduit to the global premium coffee market.
          </p>
        </motion.div>
      </section>

      {/* 2. VISION, MISSION & STANDARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Mission Left */}
          <motion.div 
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#C28A4E]">
              Our Mandate
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#2E221C]">
              Empowering Communities Through Practical Agribusiness Mastery
            </h2>
            <div className="w-12 h-1 bg-[#C28A4E] rounded"></div>
            <p className="text-sm text-[#2E221C]/80 leading-relaxed">
              We envision an agricultural economy where growers don't just sell low-margin green commodities, but actively capture premium downstream specialty values by mastering commercial processing, sensory evaluation, precise roasting, and strategic brand management.
            </p>
            <div className="bg-[#2E221C]/5 p-6 rounded-2xl border-l-4 border-[#C28A4E] space-y-2">
              <div className="font-serif text-base font-bold text-[#2E221C]">The "Seed-to-Cup" Philosophy</div>
              <p className="text-xs text-[#2E221C]/70 leading-relaxed">
                By integrating rigorous horticultural agronomy with barista hospitality standards under a single cooperative campus, our graduates acquire the rare multi-disciplinary competence needed to build lucrative brands.
              </p>
            </div>
          </motion.div>

          {/* Standards Right */}
          <motion.div 
            className="lg:col-span-7 space-y-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2E221C] border-b border-[#2E221C]/10 pb-4">
              Our Academic Benchmarks
            </h3>

            <div className="space-y-8">
              {standards.map((std, idx) => {
                const Icon = std.icon;
                return (
                  <motion.div 
                    key={idx} 
                    className="flex items-start space-x-4" 
                    id={`standard-card-${idx}`}
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 250, damping: 15 }}
                  >
                    <div className="bg-[#C28A4E]/10 p-3.5 rounded-xl text-[#C28A4E] shrink-0">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-base text-[#2E221C]">{std.title}</h4>
                      <p className="text-xs text-[#2E221C]/75 leading-relaxed">{std.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. INTERACTIVE FACILITIES SHOWCASE */}
      <section className="bg-[#FAF6F0]/50 py-24 border-y border-[#2E221C]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <motion.div 
            className="text-center space-y-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C28A4E]">Active Learning Centers</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2E221C]">
              Explore Our State-of-the-Art Laboratories
            </h2>
            <p className="text-sm text-[#2E221C]/70">
              Students spend 80% of their lecture hours inside active testing environments. Click a lab below to inspect our real equipment sets.
            </p>
          </motion.div>

          {/* Tab Switcher Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#2E221C]/10 pb-4">
            {FACILITIES.map((facility, idx) => (
              <button
                key={facility.id}
                id={`facility-tab-${facility.id}`}
                onClick={() => setActiveFacilityIdx(idx)}
                className={`px-5 py-3 rounded-xl text-xs font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                  activeFacilityIdx === idx
                    ? 'bg-[#2E221C] text-[#FAF6F0] shadow-md'
                    : 'text-[#2E221C]/80 hover:bg-[#2E221C]/5'
                }`}
              >
                {facility.title}
              </button>
            ))}
          </div>

          {/* Active Facility Display Box with smooth switch slider */}
          <div className="bg-white border border-[#2E221C]/5 rounded-3xl p-6 sm:p-10 shadow-lg min-h-[460px] overflow-hidden flex items-center">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeFacilityIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full"
              >
                {/* Visual Left */}
                <div className="lg:col-span-6 relative aspect-video rounded-2xl overflow-hidden shadow-inner border border-[#2E221C]/10 h-full max-h-[340px]">
                  <img 
                    src={activeFacility.image} 
                    alt={activeFacility.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-[#2E221C]/90 text-[#FAF6F0] text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/15">
                    Active Training Space
                  </div>
                </div>

                {/* Content Right */}
                <div className="lg:col-span-6 space-y-6">
                  <h3 className="font-serif text-2xl font-bold text-[#2E221C]">{activeFacility.title}</h3>
                  <p className="text-sm text-[#2E221C]/75 leading-relaxed">
                    {activeFacility.description}
                  </p>

                  <div className="space-y-3.5">
                    <div className="text-xs font-bold text-[#C28A4E] uppercase tracking-widest border-b border-[#2E221C]/5 pb-2">
                      Featured Hardware & Setup:
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeFacility.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2.5 text-xs text-[#2E221C]/80">
                          <CheckCircle2 className="h-4 w-4 text-[#C28A4E] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 flex flex-wrap gap-4">
                    <button
                      id="facility-courses-btn"
                      onClick={() => setView('courses')}
                      className="bg-[#2E221C] hover:bg-[#110E0C] text-[#FAF6F0] font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-sm cursor-pointer"
                    >
                      View Related Courses
                    </button>
                    <button
                      id="facility-contact-btn"
                      onClick={() => setView('contact')}
                      className="bg-[#FAF6F0] hover:bg-[#2E221C]/5 text-[#2E221C] font-semibold text-xs px-5 py-3 rounded-xl border border-[#2E221C]/15 transition-all cursor-pointer"
                    >
                      Request Lab Tour
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 4. SUSTAINABILITY & INNOVATION (COOPERATIVE LINKAGES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Block Left */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute -inset-4 bg-green-800/10 rounded-3xl rotate-1"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video max-h-[360px] border border-[#2E221C]/10">
              <img 
                src={sortingBeans}
                alt="Students sorting coffee beans outdoors"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <motion.div 
              className="absolute -top-4 -right-4 bg-emerald-800 text-white p-4 rounded-xl shadow-lg flex items-center space-x-3.5 max-w-[250px]"
              whileHover={{ scale: 1.05 }}
            >
              <span className="font-bold text-3xl">100%</span>
              <span className="text-[10px] leading-tight uppercase font-semibold text-emerald-100">Regenerative Shade Grown Practices</span>
            </motion.div>
          </motion.div>

          {/* Content Block Right */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#C28A4E]">Regenerative Innovation</div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#2E221C] leading-tight">
              Pioneering Sustainable Cooperative Frameworks
            </h2>
            <div className="w-12 h-1 bg-[#C28A4E] rounded"></div>
            <p className="text-sm text-[#2E221C]/80 leading-relaxed">
              We collaborate active research with 14 local coffee grower cooperatives. By examining leaf health inside our Agri-Tech Commons, testing organic composting variables, and installing parabolic solar drier beds, our student-professor teams continuously share zero-waste farming systems with smallholders.
            </p>
            <ul className="space-y-3">
              {[
                "Soil health diagnostics with organic micro-element replacements",
                "Water-saving eco-pulping stations that reuse 90% of processing run-off",
                "Establishing direct cooperative auctions bypassing multi-tier brokerages",
                "Promoting heirloom botanical conservation resilient to mountain heat waves"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-xs text-[#2E221C]/80">
                  <CheckCircle2 className="h-4.5 w-4.5 text-[#C28A4E] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </section>

      {/* 5. FINAL CTA TEAM LINK */}
      <section className="bg-[#FAF6F0] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="bg-[#2E221C] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-[#C28A4E]/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-2 max-w-xl">
            <h3 className="font-serif text-2xl font-bold text-white">Join Our Next Campus Open Day</h3>
            <p className="text-xs text-gray-300">
              Speak directly with our cooperative agronomists, roasting masters, and admissions board. Taste micro-lots roasted on site in our cup-testing theater.
            </p>
          </div>
          <motion.button
            id="about-cta-apply"
            onClick={() => setView('admissions')}
            className="w-full md:w-auto shrink-0 bg-[#C28A4E] hover:bg-[#A4713C] text-white font-bold px-8 py-4 rounded-xl text-sm tracking-wide shadow-md transition-all cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Schedule Campus Visit
          </motion.button>
        </motion.div>
      </section>

    </div>
  );
}
