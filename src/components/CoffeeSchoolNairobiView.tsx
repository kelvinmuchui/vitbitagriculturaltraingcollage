import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Coffee, 
  MapPin, 
  CheckCircle2, 
  GraduationCap, 
  Flame, 
  Sparkles, 
  Award, 
  Clock, 
  Calendar, 
  PhoneCall, 
  ArrowRight, 
  BookOpen, 
  TrendingUp, 
  Check, 
  Compass, 
  ChevronRight, 
  Layers, 
  Cpu, 
  Droplet, 
  Beaker, 
  Scale, 
  Eye, 
  ShieldCheck, 
  Users, 
  DollarSign, 
  Download,
  ExternalLink,
  MessageCircle,
  HelpCircle,
  Building,
  Target
} from 'lucide-react';
import { COURSES } from '../data';
import FAQSection from './FAQSection';

// Image assets
import facilityEspressoLab from '../assets/images/facility_espresso_lab_1784976539403.jpg';
import cuppingLabSetup from '../assets/images/cupping_lab_setup_1784706432096.jpg';
import coffeeRoastingMachine from '../assets/images/coffee_roasting_machine_1784706415458.jpg';
import galleryLatteArt from '../assets/images/gallery_latte_art_swan_1784976721626.jpg';
import galleryGreenBean from '../assets/images/gallery_green_bean_sorting_1784976666339.jpg';
import galleryCherryDepulping from '../assets/images/gallery_cherry_depulping_1784976680693.jpg';
import coffeeCherriesDrying from '../assets/images/coffee_cherries_drying_1783338132429.jpg';
import facilityRoasteryQC from '../assets/images/facility_roastery_qc_1784976554142.jpg';
import contactCampusImage from '../assets/images/contact_campus_image_1784976397743.jpg';

interface CoffeeSchoolNairobiViewProps {
  setView: (view: string) => void;
  setSelectedCourseId?: (id: string | null) => void;
}

export default function CoffeeSchoolNairobiView({ 
  setView, 
  setSelectedCourseId 
}: CoffeeSchoolNairobiViewProps) {
  const [activeTopic, setActiveTopic] = useState<'all' | 'technology' | 'production' | 'processing' | 'quality' | 'cupping' | 'roasting' | 'barista' | 'agribusiness'>('all');

  const coffeeCourses = COURSES.filter(c => 
    c.id.includes('coffee') || 
    c.id.includes('barista') || 
    c.department.toLowerCase().includes('coffee')
  );

  const pillars = [
    {
      id: 'technology',
      title: '1. Coffee Technology & Quality Science',
      badge: 'Green Bean & Milling',
      icon: Cpu,
      image: galleryGreenBean,
      summary: 'Physical grading, screen sizing, moisture analysis, and milling mechanics.',
      details: [
        'Physical green bean grading according to SCA & Kenya Coffee Directorate standards.',
        'Screen size classification (AA: 17/18, AB: 15/16, PB: Peaberry, C, TT, T).',
        'Defect identification & count (primary defects: full black, sour, pod; secondary: broken, insect damage, immature).',
        'Moisture content (target 10.5%–11.5%) and water activity (aw) measurements using calibrated digital meters.',
        'Dry milling technology, hulling mechanics, pneumatic destoning, gravity separation, and optical color sorting.'
      ]
    },
    {
      id: 'production',
      title: '2. Coffee Production & Agronomy',
      badge: 'Seed to Harvest',
      icon: Layers,
      image: facilityRoasteryQC,
      summary: 'Varietal genetics, nursery propagation, canopy management, and soil health.',
      details: [
        'Commercial cultivars: SL-28, SL-34, Ruiru 11, Batian, and K7 varietal genetics and climate resilience.',
        'Coffee nursery establishment, potting soil preparation, grafting techniques, and root development.',
        'Holistic plant nutrition, soil pH optimization (5.5–6.5), organic mulching, and micro-nutrient management.',
        'Pruning systems (single-stem vs. multiple-stem cyclic renewal) and agroforestry shade tree integration.',
        'Integrated pest & disease management for Coffee Berry Disease (CBD), Coffee Leaf Rust (CLR), and stem borers.'
      ]
    },
    {
      id: 'processing',
      title: '3. Post-Harvest Coffee Processing',
      badge: 'Wet & Dry Mills',
      icon: Droplet,
      image: galleryCherryDepulping,
      summary: 'Washed, Natural, Honey processing, controlled fermentation, and drying.',
      details: [
        'Selective cherry harvesting (Brix sugar measurement: 18°–22° for peak ripeness).',
        'Fully Washed (Wet Processing): Eco-pulpers, disc pulpers, flotation density tanks, and mucilage removal.',
        'Controlled microbial fermentation: dry fermentation vs. wet soaking under clean water (24–36 hrs).',
        'Honey Process profiles (Yellow, Red, Black Honey) and anaerobic / carbonic maceration experimental lots.',
        'Parchment drying on raised African drying beds, parchment moisture tracking, skin drying, and conditioning.'
      ]
    },
    {
      id: 'quality',
      title: '4. Coffee Quality & Export Standards',
      badge: 'International Compliance',
      icon: ShieldCheck,
      image: coffeeCherriesDrying,
      summary: 'Export lot preparation, phytosanitary certification, and grade standards.',
      details: [
        'Kenya Coffee Directorate grading criteria and international export auction requirements.',
        'Sensory defect thresholds and sample lot compilation for international buyers.',
        'Packaging standards: GrainPro hermetic moisture-barrier liners and jute bag export compliance.',
        'Traceability systems, single-estate lot tracking, cooperative micro-lot segregation, and sustainability certifications (Rainforest Alliance, Fairtrade, Organic).'
      ]
    },
    {
      id: 'cupping',
      title: '5. Sensory Cupping & Quality Evaluation',
      badge: 'SCA Protocols',
      icon: Eye,
      image: cuppingLabSetup,
      summary: 'SCA cupping protocols, flavor wheel, fragrance/aroma, and triangulation.',
      details: [
        'Standardized SCA sensory protocol: roast color (Agtron 58–63), grind particle size, 8.25g per 150ml water.',
        'Water chemistry for cupping: 75–150 ppm total dissolved solids (TDS), neutral pH 7.0, 93°C water temperature.',
        'Sensory scoring sheet: Fragrance/Aroma, Flavor, Aftertaste, Acidity, Body, Balance, Uniformity, Clean Cup, Sweetness.',
        'Kenya origin flavor descriptors: blackcurrant, bright phosphoric acidity, jasmine florals, bergamot, and rich chocolate body.',
        'Triangulation discrimination testing, sensory calibration, and identifying roast and processing defects.'
      ]
    },
    {
      id: 'roasting',
      title: '6. Commercial Coffee Roasting & Profiling',
      badge: 'Drum Roasting',
      icon: Flame,
      image: coffeeRoastingMachine,
      summary: 'Thermodynamics, roast curves, Rate of Rise (RoR), and roast profiles.',
      details: [
        'Heat transfer dynamics in drum roasters: conduction, convection, and radiant thermal energy.',
        'Roast phases: Drying phase (endothermic), Maillard color transformation, Yellowing, Caramelization, and First Crack (exothermic).',
        'Rate of Rise (RoR) management, Development Time Ratio (DTR: 15%–20%), and gas/airflow control.',
        'Profiling light filter roasts (preserving floral acidity) vs. medium-dark espresso roasts (maximizing sweetness & crema body).',
        'Roaster maintenance, safety protocols, chaff collector cleaning, and sample roasting for green evaluation.'
      ]
    },
    {
      id: 'barista',
      title: '7. Professional Barista Skills & Latte Art',
      badge: 'Espresso Science',
      icon: Coffee,
      image: facilityEspressoLab,
      summary: 'Espresso extraction physics, grinder calibration, microfoam, and latte art.',
      details: [
        'Espresso extraction physics: dose, yield, brew ratio (1:2 to 1:2.5), 9 bar pressure, and 25–30 sec extraction time.',
        'Grind size dialing using commercial stepless grinders (Mahlkönig & Mazzer), particle distribution, and channeling prevention (WDT & distribution tools).',
        'Milk texturing chemistry: protein denaturing, microfoam creation at 60°C–65°C, and glossy velvety texture.',
        'Free-pour latte art mastery: Monk’s Head, Heart, Tulip, Rosetta, and intricate Swan designs.',
        'Speed of service, multi-order cafe workflow, workstation hygiene, and espresso machine backflushing.'
      ]
    },
    {
      id: 'agribusiness',
      title: '8. Coffee Agribusiness & Value Addition',
      badge: 'Trade & Entrepreneurship',
      icon: TrendingUp,
      image: contactCampusImage,
      summary: 'Value addition, direct trade, coffee shop business, and SACCO governance.',
      details: [
        'Value addition economics: raw green cherry vs. specialty roasted coffee packaging and margin expansion.',
        'Direct trade export pathways, working with international roasters, FOB pricing, and coffee auction mechanics.',
        'Coffee shop business modeling: location selection, equipment budgeting, menu engineering, and COGS calculations.',
        'Cooperative governance, SACCO accounting, member payment models, and digital agricultural supply chains.'
      ]
    }
  ];

  const handleEnrollCourse = (courseId: string) => {
    if (setSelectedCourseId) {
      setSelectedCourseId(courseId);
    }
    setView('admissions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredPillars = activeTopic === 'all' 
    ? pillars 
    : pillars.filter(p => p.id === activeTopic);

  return (
    <div className="bg-[#FAF6F0] min-h-screen text-[#2E221C]">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#2E221C] text-white pt-20 pb-24 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C28A4E_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C28A4E]/30 text-xs font-extrabold uppercase tracking-wider text-[#C28A4E]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Premier Coffee School in Nairobi, Kenya</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                Accredited Specialty <span className="text-[#C28A4E]">Coffee School in Nairobi</span>
              </h1>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl">
                Master the entire coffee value chain from farm to cup. VIBIT Agricultural Training College in Westlands, Nairobi provides hands-on practical training in <strong>Coffee Technology</strong>, <strong>Coffee Roasting</strong>, <strong>Sensory Cupping</strong>, <strong>Professional Barista Skills</strong>, and <strong>Coffee Agribusiness</strong>.
              </p>

              {/* Key Credentials Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center space-x-2.5">
                  <Award className="h-5 w-5 text-[#C28A4E] shrink-0" />
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-white leading-none">TVET Approved</p>
                    <p className="text-[10px] text-white/60">CDACC Accredited</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center space-x-2.5">
                  <MapPin className="h-5 w-5 text-[#C28A4E] shrink-0" />
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-white leading-none">Westlands Campus</p>
                    <p className="text-[10px] text-white/60">Leomar Court, Nairobi</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center space-x-2.5 col-span-2 sm:col-span-1">
                  <Beaker className="h-5 w-5 text-[#C28A4E] shrink-0" />
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-white leading-none">85%+ Hands-On</p>
                    <p className="text-[10px] text-white/60">Commercial Labs</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  id="hero-apply-btn"
                  onClick={() => {
                    setView('admissions');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-[#C28A4E] hover:bg-[#A9743B] text-white px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>Apply for Next Coffee Intake</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <a
                  href="https://wa.me/254708137992?text=Hello%20VIBIT%20Coffee%20School,%20I%20am%20interested%20in%20coffee%20courses%20in%20Nairobi."
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 shadow-md"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp: 0708 137992</span>
                </a>
              </div>

            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#C28A4E]/30 bg-[#1E1713]">
                <img 
                  src={facilityEspressoLab} 
                  alt="Specialty Coffee Barista Lab at VIBIT Coffee School in Westlands, Nairobi" 
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#110E0C] via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 bg-[#2E221C]/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-white space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C28A4E] uppercase tracking-wider flex items-center space-x-1.5">
                      <Building className="h-3.5 w-3.5" />
                      <span>Westlands Commercial Labs</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                      Open for Admissions
                    </span>
                  </div>
                  <p className="text-xs text-white/80">
                    Training on commercial La Marzocco espresso machines, Mahlkönig grinders, and Probat drum roasters.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE VIBIT AS YOUR COFFEE SCHOOL IN NAIROBI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#2E221C]/5 border border-[#2E221C]/10 text-xs font-bold uppercase tracking-wider text-[#C28A4E]">
              <Target className="h-3.5 w-3.5" />
              <span>VIBIT's Coffee Training Philosophy</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2E221C] tracking-tight">
              Why VIBIT is Kenya's Leading Specialty Coffee Training College
            </h2>

            <p className="text-sm text-[#8E7C74] leading-relaxed">
              Kenya produces some of the most sought-after specialty coffees in the world, renowned for complex berry acidity and floral sweetness. However, capturing value requires deep technical mastery across agronomy, wet milling, defect grading, roasting thermodynamics, and barista craft.
            </p>

            <p className="text-sm text-[#8E7C74] leading-relaxed">
              At VIBIT Coffee School in Westlands, Nairobi, we bridge the divide between rural coffee production and urban specialty cafes. Our curriculum is 100% aligned with TVET-CDACC competency-based standards and international Specialty Coffee Association (SCA) protocols, ensuring graduates excel in local luxury hotels, specialty roasteries, and global export commodity houses.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white border border-[#2E221C]/10 rounded-2xl p-4 space-y-1.5 shadow-xs">
                <div className="flex items-center space-x-2 text-[#C28A4E]">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span className="font-serif font-bold text-xs text-[#2E221C]">100% Practical Training</span>
                </div>
                <p className="text-[11px] text-[#8E7C74]">
                  Every student gets dedicated daily station time on commercial espresso machines and roasters.
                </p>
              </div>

              <div className="bg-white border border-[#2E221C]/10 rounded-2xl p-4 space-y-1.5 shadow-xs">
                <div className="flex items-center space-x-2 text-[#C28A4E]">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span className="font-serif font-bold text-xs text-[#2E221C]">Direct Job Pipelines</span>
                </div>
                <p className="text-[11px] text-[#8E7C74]">
                  Internship placements with leading roasteries, luxury hotels, SACCOs, and cafes in Nairobi & Middle East.
                </p>
              </div>

              <div className="bg-white border border-[#2E221C]/10 rounded-2xl p-4 space-y-1.5 shadow-xs">
                <div className="flex items-center space-x-2 text-[#C28A4E]">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span className="font-serif font-bold text-xs text-[#2E221C]">Flexible Timetables</span>
                </div>
                <p className="text-[11px] text-[#8E7C74]">
                  Full-time weekday cohorts, evening classes for working professionals, and intensive Saturday workshops.
                </p>
              </div>

              <div className="bg-white border border-[#2E221C]/10 rounded-2xl p-4 space-y-1.5 shadow-xs">
                <div className="flex items-center space-x-2 text-[#C28A4E]">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span className="font-serif font-bold text-xs text-[#2E221C]">Central Westlands Location</span>
                </div>
                <p className="text-[11px] text-[#8E7C74]">
                  Located at Leomar Court, 45 Westlands Road with seamless public transport access and secure parking.
                </p>
              </div>
            </div>

          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-md border border-[#2E221C]/10">
                <img 
                  src={cuppingLabSetup} 
                  alt="Sensory Cupping Lab in Westlands Nairobi" 
                  className="w-full h-48 sm:h-56 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-3 bg-white text-center">
                  <p className="text-xs font-bold text-[#2E221C]">Sensory Cupping Lab</p>
                  <p className="text-[10px] text-[#8E7C74]">SCA Protocol Evaluation</p>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-md border border-[#2E221C]/10">
                <img 
                  src={coffeeRoastingMachine} 
                  alt="Commercial Coffee Roasting at VIBIT Nairobi" 
                  className="w-full h-48 sm:h-56 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-3 bg-white text-center">
                  <p className="text-xs font-bold text-[#2E221C]">Probat Drum Roasting</p>
                  <p className="text-[10px] text-[#8E7C74]">Thermodynamic Profiling</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-md border border-[#2E221C]/10">
              <img 
                src={galleryLatteArt} 
                alt="Latte Art & Barista Training at VIBIT Coffee School" 
                className="w-full h-44 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="p-3 bg-white flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#2E221C]">Barista & Latte Art Academy</p>
                  <p className="text-[10px] text-[#8E7C74]">Espresso Dialing & Free-Pour Pattern Mastery</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 bg-[#C28A4E]/10 text-[#C28A4E] rounded-md">
                  Level 3 TVET
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. IN-DEPTH COFFEE CURRICULUM & VALUE CHAIN PILLARS */}
      <section className="bg-white border-y border-[#2E221C]/10 py-16 sm:py-24" id="coffee-curriculum-pillars">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#2E221C]/5 border border-[#2E221C]/10 text-xs font-extrabold uppercase tracking-wider text-[#C28A4E]">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Comprehensive Coffee Syllabus</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2E221C]">
              What You Will Learn at VIBIT Coffee School
            </h2>
            <p className="text-sm text-[#8E7C74] leading-relaxed">
              Explore the 8 comprehensive pillars of our coffee education framework, covering green coffee science, production, roasting thermodynamics, sensory cupping, and espresso craft.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {[
                { id: 'all', label: 'All Modules' },
                { id: 'technology', label: 'Coffee Technology' },
                { id: 'production', label: 'Production & Agronomy' },
                { id: 'processing', label: 'Processing & Wet Mills' },
                { id: 'quality', label: 'Quality Standards' },
                { id: 'cupping', label: 'Cupping & Sensory' },
                { id: 'roasting', label: 'Roasting Science' },
                { id: 'barista', label: 'Barista & Latte Art' },
                { id: 'agribusiness', label: 'Agribusiness & Trade' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTopic(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTopic === tab.id
                      ? 'bg-[#2E221C] text-white shadow-xs'
                      : 'bg-[#FAF6F0] text-[#2E221C]/80 hover:bg-[#2E221C]/10 border border-[#2E221C]/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={pillar.id}
                  className="bg-[#FAF6F0] border border-[#2E221C]/10 rounded-3xl overflow-hidden shadow-xs hover:border-[#C28A4E]/40 transition-all space-y-4 flex flex-col justify-between"
                >
                  <div>
                    {/* Header Image */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <img 
                        src={pillar.image} 
                        alt={pillar.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-[#2E221C]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg border border-white/20">
                        {pillar.badge}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-2.5 rounded-xl bg-white border border-[#2E221C]/10 text-[#C28A4E] shrink-0">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-serif text-lg font-bold text-[#2E221C]">
                            {pillar.title}
                          </h3>
                          <p className="text-xs text-[#8E7C74] mt-0.5">
                            {pillar.summary}
                          </p>
                        </div>
                      </div>

                      {/* Detailed Bullet Points */}
                      <ul className="space-y-2 pt-2 border-t border-[#2E221C]/10">
                        {pillar.details.map((point, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-xs text-[#2E221C]/85">
                            <Check className="h-3.5 w-3.5 text-[#C28A4E] shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => handleEnrollCourse('barista-skills')}
                      className="w-full bg-white hover:bg-[#2E221C] text-[#2E221C] hover:text-white border border-[#2E221C]/15 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Enroll in Related Course</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. PRACTICAL TRAINING & WESTLANDS CAMPUS LOCATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="bg-[#2E221C] text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-[#C28A4E]/30 text-xs font-bold uppercase tracking-wider text-[#C28A4E]">
                <MapPin className="h-3.5 w-3.5" />
                <span>Central Westlands Campus, Nairobi</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                Train in the Heart of Nairobi's Thriving Coffee Capital
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-white/80 leading-relaxed">
                <p>
                  <strong>Location:</strong> Leomar Court, 45 Westlands Road, Westlands, Nairobi, Kenya.
                </p>
                <p>
                  Our modern facility is situated in the vibrant commercial district of Westlands, surrounded by specialty coffee roasteries, multinational trading corporations, and vibrant cafe culture.
                </p>
                <p>
                  The campus features high-capacity espresso training bars, dedicated sensory cupping benches with controlled lighting, sample roasting laboratories, and agribusiness multimedia lecture rooms.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
                  <p className="text-xs font-bold text-[#C28A4E] uppercase">Commuter Friendly</p>
                  <p className="text-[11px] text-white/70">
                    Direct access via Waiyaki Way, Mpaka Road, and Chiromo Road matatu stages.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
                  <p className="text-xs font-bold text-[#C28A4E] uppercase">Student Accommodation</p>
                  <p className="text-[11px] text-white/70">
                    Vetted private hostels and student housing options available within 5–10 mins walk.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4">
                <a
                  href="https://maps.google.com/?q=Leomar+Court+45+Westlands+Road+Nairobi"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#C28A4E] hover:bg-[#A9743B] text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all shadow-md"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="h-3 w-3" />
                </a>

                <a
                  href="tel:+254708137992"
                  className="bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all border border-white/20"
                >
                  <PhoneCall className="h-4 w-4 text-[#C28A4E]" />
                  <span>Call Admissions: 0708 137992</span>
                </a>
              </div>

            </div>

            {/* Right Map & Contact Summary Card */}
            <div className="lg:col-span-5 bg-white text-[#2E221C] rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="font-serif text-base font-bold border-b border-[#2E221C]/10 pb-3 flex items-center space-x-2">
                <Building className="h-4 w-4 text-[#C28A4E]" />
                <span>Visit VIBIT Westlands Campus</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-[#8E7C74] uppercase text-[10px] block">Address:</span>
                  <p className="font-medium text-[#2E221C]">Leomar Court, 45 Westlands Road, Nairobi</p>
                </div>
                <div>
                  <span className="font-bold text-[#8E7C74] uppercase text-[10px] block">Postal Address:</span>
                  <p className="font-medium text-[#2E221C]">P.O. Box 14700-00800 Nairobi, Kenya</p>
                </div>
                <div>
                  <span className="font-bold text-[#8E7C74] uppercase text-[10px] block">Office Hours:</span>
                  <p className="font-medium text-[#2E221C]">Monday – Friday: 8:00 AM – 5:00 PM</p>
                  <p className="font-medium text-[#2E221C]">Saturday: 8:30 AM – 2:00 PM</p>
                </div>
                <div>
                  <span className="font-bold text-[#8E7C74] uppercase text-[10px] block">Email Admissions:</span>
                  <p className="font-medium text-[#C28A4E]">vbitschoolofcoffeagribusiness@gmail.com</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setView('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full bg-[#2E221C] hover:bg-[#C28A4E] text-white py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Schedule a Campus Tour
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 5. COURSES, DURATION, FEES & ENTRY REQUIREMENTS */}
      <section className="bg-white border-y border-[#2E221C]/10 py-16 sm:py-24" id="coffee-courses-catalog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#2E221C]/5 border border-[#2E221C]/10 text-xs font-extrabold uppercase tracking-wider text-[#C28A4E]">
              <GraduationCap className="h-3.5 w-3.5" />
              <span>Program Catalog</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2E221C]">
              Coffee Courses, Duration & Entry Requirements
            </h2>
            <p className="text-sm text-[#8E7C74] leading-relaxed">
              Explore specialized tracks designed for beginner baristas, commercial roasters, coffee farmers, and export entrepreneurs.
            </p>
          </div>

          {/* Courses Table / Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coffeeCourses.map((course) => (
              <div 
                key={course.id}
                className="bg-[#FAF6F0] border border-[#2E221C]/10 rounded-2xl p-6 space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#2E221C]/5 text-[#C28A4E]">
                      {course.department}
                    </span>
                    <span className="text-xs font-bold text-[#2E221C]">
                      {course.duration}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-[#2E221C] leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs text-[#8E7C74] line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-[#2E221C]/10 text-xs">
                    <div className="flex items-center justify-between text-[#8E7C74]">
                      <span>Tuition Fee:</span>
                      <span className="font-bold text-[#2E221C]">{course.fees}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#8E7C74]">
                      <span>Entry Criteria:</span>
                      <span className="font-bold text-[#2E221C] text-[11px]">{course.requirements}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#2E221C]/10 flex items-center space-x-2">
                  <button
                    onClick={() => handleEnrollCourse(course.id)}
                    className="flex-1 bg-[#C28A4E] hover:bg-[#A9743B] text-white py-2 rounded-xl text-xs font-bold transition-colors text-center cursor-pointer shadow-xs"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => {
                      setView('courses');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-3 py-2 bg-white hover:bg-[#2E221C]/10 text-[#2E221C] border border-[#2E221C]/10 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Syllabus
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Quick Summary of Requirements Box */}
          <div className="bg-[#2E221C]/5 border border-[#2E221C]/10 rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#2E221C] flex items-center space-x-2">
              <Scale className="h-5 w-5 text-[#C28A4E]" />
              <span>Summary of Entry Requirements at VIBIT</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed text-[#2E221C]/85">
              <div className="space-y-1.5 bg-white p-4 rounded-xl border border-[#2E221C]/10">
                <span className="font-bold text-[#C28A4E] uppercase text-[10px] block">Short Courses & Masterclasses (1–8 Wks)</span>
                <p className="font-bold text-[#2E221C]">Open Entry (No Minimum Grade)</p>
                <p className="text-[#8E7C74]">Open to coffee enthusiasts, aspiring baristas, working professionals, cafe managers, and farmers.</p>
              </div>

              <div className="space-y-1.5 bg-white p-4 rounded-xl border border-[#2E221C]/10">
                <span className="font-bold text-[#C28A4E] uppercase text-[10px] block">TVET Certificates (Level 5)</span>
                <p className="font-bold text-[#2E221C]">KCSE D (Plain) or D+</p>
                <p className="text-[#8E7C74]">Or relevant Level 4 competency pass slip. Direct progression to National Diploma.</p>
              </div>

              <div className="space-y-1.5 bg-white p-4 rounded-xl border border-[#2E221C]/10">
                <span className="font-bold text-[#C28A4E] uppercase text-[10px] block">TVET National Diplomas (Level 6)</span>
                <p className="font-bold text-[#2E221C]">KCSE C- (Minus) or Above</p>
                <p className="text-[#8E7C74]">Or an accredited Level 5 Certificate in a related agricultural or business discipline.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. HOW TO APPLY STEP-BY-STEP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24" id="how-to-apply-guide">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#2E221C]/5 border border-[#2E221C]/10 text-xs font-extrabold uppercase tracking-wider text-[#C28A4E]">
            <Clock className="h-3.5 w-3.5" />
            <span>Admissions Procedure</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2E221C]">
            How to Apply to VIBIT Coffee School in 4 Easy Steps
          </h2>
          <p className="text-sm text-[#8E7C74]">
            Enrollment is ongoing for upcoming January, May, and September cohorts as well as monthly short-course intakes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Choose Your Course",
              desc: "Select your preferred program (Barista, Roasting, Coffee Tech, or Agripreneurship) and preferred schedule (Full-time or Weekend)."
            },
            {
              step: "02",
              title: "Submit Application",
              desc: "Fill our online application form or send your ID & KCSE results slip via WhatsApp / email to vbitschoolofcoffeagribusiness@gmail.com."
            },
            {
              step: "03",
              title: "Receive Admission Letter",
              desc: "Our registrar will issue your official admission letter, fee structure with installment payment guidelines, and equipment kit details."
            },
            {
              step: "04",
              title: "Orientation & Practical Labs",
              desc: "Attend orientation at Leomar Court in Westlands, receive your barista kit, and start hands-on commercial lab training."
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="bg-white border border-[#2E221C]/10 rounded-2xl p-6 space-y-3 relative overflow-hidden shadow-xs hover:border-[#C28A4E]/50 transition-colors"
            >
              <span className="font-serif text-3xl font-extrabold text-[#C28A4E]/30 block leading-none">
                {item.step}
              </span>
              <h3 className="font-serif text-base font-bold text-[#2E221C]">
                {item.title}
              </h3>
              <p className="text-xs text-[#8E7C74] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              setView('admissions');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-[#2E221C] hover:bg-[#C28A4E] text-white px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer inline-flex items-center space-x-2"
          >
            <span>Proceed to Online Application Portal</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* 7. DEDICATED COFFEE SCHOOL Q&A SECTION */}
      <FAQSection 
        setView={setView} 
        title="Coffee School in Nairobi – Frequently Asked Questions"
        subtitle="Official answers from VIBIT registrar regarding barista training, roasting certificates, fees, and campus location in Westlands."
        initialCategory="courses"
      />

      {/* 8. BOTTOM ADMISSION CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-[#C28A4E] rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold">
              Ready to Launch Your Career in the Global Specialty Coffee Industry?
            </h2>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              Join Kenya’s premier coffee school in Westlands, Nairobi. Limited spots per practical cohort to guarantee dedicated commercial station time for every student.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                setView('admissions');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white hover:bg-[#FAF6F0] text-[#2E221C] px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
            >
              Apply Online Today
            </button>
            <a
              href="https://wa.me/254708137992?text=Hello%20VIBIT%20Admissions,%20I%20would%20like%20to%20register%20for%20coffee%20training%20in%20Nairobi."
              target="_blank"
              rel="noreferrer"
              className="bg-[#2E221C] hover:bg-[#1E1713] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2"
            >
              <PhoneCall className="h-4 w-4 text-[#C28A4E]" />
              <span>Call / WhatsApp 0708 137992</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
