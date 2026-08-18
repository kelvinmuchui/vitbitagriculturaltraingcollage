import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  MapPin, 
  Coffee, 
  Leaf, 
  Award, 
  Users, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Compass, 
  Home, 
  Briefcase, 
  Utensils, 
  ShieldCheck, 
  Camera, 
  BookOpen, 
  Flame,
  Globe,
  ChevronRight
} from 'lucide-react';
import PhotoGallery from './PhotoGallery';

// Campus & Student Life Images
import homeHeroCampus from '../assets/images/home_hero_campus_1784976413691.jpg';
import facilityEspressoLab from '../assets/images/facility_espresso_lab_1784976539403.jpg';
import facilityRoasteryQc from '../assets/images/facility_roastery_qc_1784976554142.jpg';
import facilityCoffeeNursery from '../assets/images/facility_coffee_nursery_1784976568320.jpg';
import studentsAccreditation from '../assets/images/students_accreditation_1783338111803.jpg';
import latteArtCup from '../assets/images/latte_art_cup_1783338158532.jpg';
import testimonialMercy from '../assets/images/testimonial_mercy_1784976594167.jpg';
import testimonialSamuel from '../assets/images/testimonial_samuel_1784976608625.jpg';
import testimonialDavid from '../assets/images/testimonial_david_1784976621584.jpg';

interface StudentLifeViewProps {
  setView: (view: string) => void;
}

export default function StudentLifeView({ setView }: StudentLifeViewProps) {
  const [activeTab, setActiveTab] = useState<'campus' | 'excursions' | 'competitions' | 'housing' | 'careers'>('campus');

  const lifeHighlights = [
    {
      icon: Coffee,
      title: "100% Practical Lab Immersion",
      desc: "Zero abstract whiteboard lecturing. From Day 1, students calibrate multi-boiler espresso machines, log roast curves on Cropster, and perform SCA sensory grading."
    },
    {
      icon: Compass,
      title: "Real Estate & Processing Mill Trips",
      desc: "Regular field expeditions to Kiambu & Nyeri coffee farms, wet mills, dry milling plants, and the Nairobi Coffee Exchange live trading floor."
    },
    {
      icon: Flame,
      title: "Latte Art & Barista Throwdowns",
      desc: "Monthly internal latte art showdowns, sensory triangulation speed-tests, and coaching for national and regional barista championships."
    },
    {
      icon: Briefcase,
      title: "94% Graduate Career Placement",
      desc: "Direct employer recruitment days connecting graduates with 5-star hotels, specialty roasteries in the Gulf & Europe, and agricultural cooperatives."
    }
  ];

  const housingOptions = [
    {
      name: "Westlands Student Hostels & Residences",
      location: "Within 5–10 mins walk from Leomar Court",
      type: "Studio & Shared Rooms",
      price: "KSh 12,000 – 25,000 / month",
      perks: ["High-speed Wi-Fi", "24/7 Security & CCTV", "Biometric Access", "Backup Generator"]
    },
    {
      name: "Parklands / Highridge Accommodations",
      location: "1.5 km (quick 10-min commute or stroll)",
      type: "Single Rooms & 2-Bed Apartments",
      price: "KSh 15,000 – 30,000 / month",
      perks: ["Quiet Study Environment", "Water Storage Backup", "Proximity to Malls & Cafés", "Affordable Eateries"]
    },
    {
      name: "Nairobi CBD & Ngara Student Hubs",
      location: "Direct 15-min Matatu / Bus connection to Westlands",
      type: "Budget Shared Hostels",
      price: "KSh 8,000 – 14,000 / month",
      perks: ["Budget Friendly", "Meal Plans Available", "Close to Transport Terminals", "Vibrant Student Community"]
    }
  ];

  const fieldTrips = [
    {
      title: "Central Highlands Coffee Harvest Expedition",
      destination: "Nyeri & Kirinyaga Coffee Estates",
      duration: "3-Day Practical Fieldwork",
      desc: "Hands-on cherry selective harvesting, Brix sugar validation, and operating eco-pulpers during peak harvest.",
      tag: "Coffee Production & Processing"
    },
    {
      title: "Commercial Dry Milling & Export Terminal Tour",
      destination: "Ruiru & Industrial Area Milling Facilities",
      duration: "Full-Day Technical Audit",
      desc: "Witnessing industrial destoners, gravity separators, color sorting machines, and container lot stuffing.",
      tag: "Coffee Technology & Export"
    },
    {
      title: "Nairobi Coffee Exchange Live Auction Experience",
      destination: "Wakulima House, Haile Selassie Ave, Nairobi",
      duration: "Half-Day Trading Immersion",
      desc: "Observing electronic bidding, auction lot catalogs, price discovery dynamics, and broker sample rooms.",
      tag: "Agribusiness & Cooperatives"
    }
  ];

  return (
    <div className="space-y-20 pb-24" id="student-life-view">
      
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#FAF6F0]/30 to-[#FAF6F0]/70 py-16 sm:py-24 border-b border-[#2E221C]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <motion.div 
              className="lg:col-span-7 space-y-6 text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center space-x-2 bg-white border border-[#C28A4E]/30 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-[#C28A4E] shadow-xs">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Life at VIBIT Agricultural Training College</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#2E221C] tracking-tight leading-[1.15]">
                A Vibrant Community of <span className="italic text-[#C28A4E]">Agri-Innovators</span> & Coffee Artisans
              </h1>

              <p className="text-base sm:text-lg text-[#2E221C]/80 leading-relaxed font-sans max-w-2xl">
                Located in the energetic heart of Westlands, Nairobi, VIBIT offers more than vocational certification. Experience world-class laboratory practice, industry mentorship, estate expeditions, and a tight-knit campus culture designed for global career readiness.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => setView('admissions')}
                  className="bg-[#2E221C] hover:bg-[#1A1411] text-white px-7 py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center space-x-2 cursor-pointer hover:shadow-lg active:scale-95"
                >
                  <span>Apply for Next Intake</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setView('contact')}
                  className="bg-white hover:bg-[#FAF6F0] text-[#2E221C] border border-[#2E221C]/20 px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <MapPin className="h-4 w-4 text-[#C28A4E]" />
                  <span>Book a Campus Visit</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#2E221C]/10 text-xs">
                <div>
                  <div className="font-serif font-bold text-lg text-[#2E221C]">Westlands</div>
                  <div className="text-[#8E7C74]">Central Nairobi Campus</div>
                </div>
                <div>
                  <div className="font-serif font-bold text-lg text-[#2E221C]">94%</div>
                  <div className="text-[#8E7C74]">Graduate Employment</div>
                </div>
                <div>
                  <div className="font-serif font-bold text-lg text-[#2E221C]">4 Labs</div>
                  <div className="text-[#8E7C74]">Commercial Facilities</div>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Hero Visual Mosaic */}
            <motion.div 
              className="lg:col-span-5 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] group">
                <img 
                  src={homeHeroCampus} 
                  alt="VIBIT Agricultural Training College Student Campus Life" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2E221C]/90 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#C28A4E] block">Campus Atmosphere</span>
                  <p className="font-serif font-bold text-base">Leomar Court, 45 Westlands Road, Nairobi</p>
                  <p className="text-xs text-white/80">Surrounded by premier hospitality venues, specialty cafés, and ag-trade headquarters.</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. THE 4 PILLARS OF STUDENT EXPERIENCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#C28A4E]">Campus Culture</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2E221C]">
            Crafted for Mastery, Collaboration & Growth
          </h2>
          <p className="text-sm text-[#2E221C]/75">
            Every day at VIBIT blends rigorous technical standards with hands-on practice, collaborative team labs, and real-world commercial assignments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lifeHighlights.map((hl, idx) => {
            const Icon = hl.icon;
            return (
              <motion.div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#2E221C]/10 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
                whileHover={{ y: -4 }}
              >
                <div className="h-12 w-12 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-[#C28A4E] border border-[#C28A4E]/20">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className="font-serif font-bold text-base text-[#2E221C]">{hl.title}</h3>
                  <p className="text-xs text-[#2E221C]/70 leading-relaxed">{hl.desc}</p>
                </div>
                <div className="text-[11px] font-semibold text-[#C28A4E] flex items-center space-x-1 pt-2">
                  <span>Learn more</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. INTERACTIVE SECTION TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6F0] rounded-3xl p-6 sm:p-10 border border-[#2E221C]/10 space-y-8">
          
          {/* Navigation Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#2E221C]/10 pb-6">
            {[
              { id: 'campus', label: 'Westlands Campus & Labs', icon: BuildingIcon },
              { id: 'excursions', label: 'Field Trips & Estate Visits', icon: Compass },
              { id: 'competitions', label: 'Barista Guild & Contests', icon: Award },
              { id: 'housing', label: 'Accommodation Guide', icon: Home },
              { id: 'careers', label: 'Career Placements & Alumni', icon: Briefcase }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                    isActive 
                      ? 'bg-[#2E221C] text-white shadow-md' 
                      : 'bg-white text-[#2E221C]/70 hover:bg-white/80 hover:text-[#2E221C]'
                  }`}
                >
                  <tab.icon className="h-3.5 w-3.5 text-[#C28A4E]" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: CAMPUS & LABS */}
          {activeTab === 'campus' && (
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C28A4E]">Modern Facilities</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E221C]">
                  Learn on Commercial Machinery, Not Classroom Toys
                </h3>
                <p className="text-xs sm:text-sm text-[#2E221C]/80 leading-relaxed">
                  Our laboratories at Leomar Court in Westlands are designed in partnership with leading global coffee roasteries and export institutions. Every workstation provides tactile, individual machine time.
                </p>
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-start space-x-3 text-xs text-[#2E221C]">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Espresso Bar Stage:</strong> Dual & multi-boiler machines (La Marzocco, Slayer) with gravimetric Mahlkönig grinders.</span>
                  </div>
                  <div className="flex items-start space-x-3 text-xs text-[#2E221C]">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Roasting Theater:</strong> Commercial 5kg Probat & Diedrich drum roasters equipped with Cropster telemetry.</span>
                  </div>
                  <div className="flex items-start space-x-3 text-xs text-[#2E221C]">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>SCA Sensory Theater:</strong> Calibrated 5500K daylight lighting, carbon-pure water filtration, and individual cupping pods.</span>
                  </div>
                  <div className="flex items-start space-x-3 text-xs text-[#2E221C]">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Greenhouse Commons:</strong> Active nursery beds with SL28, Batian, and Ruiru 11 cultivars for agronomy research.</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl overflow-hidden aspect-square shadow-sm">
                  <img src={facilityEspressoLab} alt="Espresso Lab" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square shadow-sm">
                  <img src={facilityRoasteryQc} alt="Roastery QC" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square shadow-sm">
                  <img src={facilityCoffeeNursery} alt="Coffee Nursery" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square shadow-sm">
                  <img src={studentsAccreditation} alt="Students in Lab" className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: EXCURSIONS */}
          {activeTab === 'excursions' && (
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="max-w-2xl space-y-2">
                <h3 className="font-serif text-2xl font-bold text-[#2E221C]">
                  Farm-to-Cup Field Trips & Industrial Excursions
                </h3>
                <p className="text-xs sm:text-sm text-[#2E221C]/80">
                  We bridge the gap between classroom science and field reality. Students participate in supervised visits to certified estates, cooperative factories, and auction floors.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {fieldTrips.map((trip, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-[#2E221C]/10 space-y-3 shadow-xs">
                    <span className="text-[9px] uppercase font-bold text-[#C28A4E] bg-[#C28A4E]/10 px-2.5 py-1 rounded-md tracking-wider">
                      {trip.tag}
                    </span>
                    <h4 className="font-serif font-bold text-base text-[#2E221C]">{trip.title}</h4>
                    <div className="text-[11px] text-[#8E7C74] space-y-0.5">
                      <p><strong>Destination:</strong> {trip.destination}</p>
                      <p><strong>Timeline:</strong> {trip.duration}</p>
                    </div>
                    <p className="text-xs text-[#2E221C]/75 leading-relaxed">{trip.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: COMPETITIONS */}
          {activeTab === 'competitions' && (
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C28A4E]">Excellence Under Pressure</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E221C]">
                  VIBIT Barista Guild & Championship Training
                </h3>
                <p className="text-xs sm:text-sm text-[#2E221C]/80 leading-relaxed">
                  Join our active student barista guild. Weekly latte art smackdowns, cupping triangulation sprints, and stage routine rehearsals prepare students for national competitions and luxury hospitality careers.
                </p>
                <div className="bg-white p-4 rounded-2xl border border-[#2E221C]/10 space-y-2 text-xs">
                  <div className="font-bold text-[#2E221C] flex items-center space-x-2">
                    <Award className="h-4 w-4 text-[#C28A4E]" />
                    <span>Annual VIBIT Throwdown Prizes:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-[#2E221C]/80">
                    <li>Sponsored entry to the Kenya National Barista Championship (KNBC)</li>
                    <li>Specialty coffee origin travel grants to Mount Kenya & Rift Valley</li>
                    <li>Direct interview placement with international café chains</li>
                  </ul>
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-md aspect-video">
                <img src={latteArtCup} alt="Latte art competition" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          )}

          {/* TAB 4: HOUSING */}
          {activeTab === 'housing' && (
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="max-w-2xl space-y-2">
                <h3 className="font-serif text-2xl font-bold text-[#2E221C]">
                  Accommodation & Living in Westlands, Nairobi
                </h3>
                <p className="text-xs sm:text-sm text-[#2E221C]/80">
                  Moving from upcountry or outside Kenya? We assist enrolled students in securing safe, fully vetted student hostels, private studios, and furnished flatshares near campus.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {housingOptions.map((house, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-[#2E221C]/10 space-y-3 shadow-xs flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#C28A4E] uppercase tracking-wider">{house.type}</span>
                        <Home className="h-4 w-4 text-[#C28A4E]" />
                      </div>
                      <h4 className="font-serif font-bold text-base text-[#2E221C]">{house.name}</h4>
                      <p className="text-xs text-[#8E7C74]">{house.location}</p>
                      <div className="font-mono font-bold text-xs text-[#2E221C] bg-[#FAF6F0] p-2 rounded-lg">
                        {house.price}
                      </div>
                    </div>
                    <div className="space-y-1.5 pt-2 border-t border-[#2E221C]/10 text-[11px] text-[#2E221C]/80">
                      {house.perks.map((perk, pIdx) => (
                        <div key={pIdx} className="flex items-center space-x-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 5: CAREERS & ALUMNI */}
          {activeTab === 'careers' && (
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C28A4E]">Lifelong Network</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E221C]">
                  Over 2,500 Alumni Leading the Global Coffee & Agri Sector
                </h3>
                <p className="text-xs sm:text-sm text-[#2E221C]/80 leading-relaxed">
                  Our alumni work across 18 countries, including top specialty coffee roasters in Dubai, Doha, London, Melbourne, and Nairobi, as well as cooperative managers overseeing thousands of hectares of sustainable farms.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white p-3.5 rounded-xl border border-[#2E221C]/10 text-xs">
                    <strong className="text-[#2E221C] block text-sm font-serif">Hospitality Chains</strong>
                    <span className="text-[#8E7C74] text-[11px]">Kempinski, Serena, Radisson Blu, Artcaffe & Java House</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-[#2E221C]/10 text-xs">
                    <strong className="text-[#2E221C] block text-sm font-serif">Export & Trade</strong>
                    <span className="text-[#8E7C74] text-[11px]">Dormans, Taylor Winch, Ibero & Sasini Coffee</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-[#2E221C]/10 space-y-4 shadow-sm">
                <div className="flex items-center space-x-3">
                  <img src={testimonialSamuel} alt="Samuel Mwangi" className="h-12 w-12 rounded-full object-cover border-2 border-[#C28A4E]" />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#2E221C]">Samuel Mwangi</h4>
                    <p className="text-[10px] text-[#8E7C74]">Head Barista & Roaster, Zenith Roasters</p>
                  </div>
                </div>
                <p className="text-xs text-[#2E221C]/85 italic leading-relaxed">
                  "VIBIT gave me direct access to commercial drum roasters and sensory grading calibration. I received two job offers before my final week of training was even completed."
                </p>
                <div className="text-[11px] font-bold text-[#C28A4E]">Class of 2022 Alumni</div>
              </div>
            </motion.div>
          )}

        </div>
      </section>

      {/* 4. PHOTO GALLERY COMPONENT */}
      <PhotoGallery />

      {/* 5. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2E221C] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C28A4E]">Your Journey Starts Here</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              Ready to Experience Life at VIBIT?
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Applications are reviewed on a rolling monthly basis. Connect with our admissions counselors or visit us at Leomar Court, Westlands.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setView('admissions')}
              className="bg-[#C28A4E] hover:bg-[#A9743B] text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all cursor-pointer hover:shadow-lg"
            >
              Start Your Application Online
            </button>
            <button
              onClick={() => setView('contact')}
              className="bg-transparent hover:bg-white/10 text-white border border-white/20 px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all cursor-pointer"
            >
              Schedule Campus Visit & Tour
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

function BuildingIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
      <path d="M9 22v-4h6v4"/>
      <path d="M8 6h.01"/>
      <path d="M16 6h.01"/>
      <path d="M8 10h.01"/>
      <path d="M16 10h.01"/>
      <path d="M8 14h.01"/>
      <path d="M16 14h.01"/>
    </svg>
  );
}
