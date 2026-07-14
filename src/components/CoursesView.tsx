import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Clock, Award, BookOpen, Calculator, CheckSquare, 
  ArrowRight, X, ChevronDown, ChevronUp, Sparkles, Sliders, 
  Flame, Droplets, Leaf, Coffee, Play, ArrowLeft, RefreshCw, 
  HelpCircle, Check, Compass, Eye, Heart, Printer 
} from 'lucide-react';
import { Course } from '../types';

// Import our real student and campus photos
import latteArtTable from '../assets/images/latte_art_table_1783338092054.jpg';

interface CoursesViewProps {
  setView: (view: string) => void;
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  courses: Course[];
}

// Coffee Flavor Groups Data for Option 2 (Sensory & Flavor Profiler)
interface FlavorGroup {
  id: string;
  name: string;
  color: string;
  bgHex: string;
  glowClass: string;
  textHex: string;
  subNotes: string[];
  compounds: string;
  roastFit: string;
  origins: string;
  matchingCourseId: string;
  matchingCourseTitle: string;
  category: string;
  sliders: {
    acidity: number;
    body: number;
    sweetness: number;
  };
}

const FLAVOR_GROUPS: FlavorGroup[] = [
  {
    id: "fruity",
    name: "Fruity & Juicy",
    color: "#E11D48", // Rose Red
    bgHex: "rgba(225, 29, 72, 0.08)",
    glowClass: "shadow-rose-500/20",
    textHex: "text-rose-600",
    subNotes: ["Lemon & Lime (Citrus)", "Blueberry & Blackberry (Dark Berries)", "Peach & Apricot (Stone Fruit)"],
    compounds: "Citric & Malic organic acids",
    roastFit: "Light Roast, Wet/Washed processing",
    origins: "Kenya (Nyeri, Kirinyaga), Ethiopia (Yirgacheffe)",
    matchingCourseId: "cupping-technology-level-4-5",
    matchingCourseTitle: "Coffee Cupping & Technology Level 4 & 5",
    category: "Enzymatic / Organic Acids",
    sliders: { acidity: 92, body: 48, sweetness: 78 }
  },
  {
    id: "floral",
    name: "Floral & Herbal",
    color: "#A855F7", // Purple
    bgHex: "rgba(168, 85, 247, 0.08)",
    glowClass: "shadow-purple-500/20",
    textHex: "text-purple-600",
    subNotes: ["Jasmine & Orange Blossom", "Chamomile Tea", "Lemongrass & Coriander"],
    compounds: "Linalool & floral terpene esters",
    roastFit: "Ultralight Roast, Anaerobic slow fermentation",
    origins: "Panama (Geisha cultivar), Ethiopia (Guji / Sidamo)",
    matchingCourseId: "barista-level-3",
    matchingCourseTitle: "Barista Level 3 Certification",
    category: "Aromatic / Flowery",
    sliders: { acidity: 86, body: 40, sweetness: 72 }
  },
  {
    id: "sweet",
    name: "Sweet & Caramelized",
    color: "#D97706", // Amber
    bgHex: "rgba(217, 119, 6, 0.08)",
    glowClass: "shadow-amber-500/20",
    textHex: "text-amber-600",
    subNotes: ["Brown Sugar & Molasses", "Vanilla Bean", "Golden Honeycomb"],
    compounds: "Caramelization of sucrose (Furanones)",
    roastFit: "Medium Roast, Pulped Natural / Honey processing",
    origins: "Costa Rica (Tarrazu), El Salvador (Bourbon cultivar)",
    matchingCourseId: "coffee-roasting",
    matchingCourseTitle: "Coffee Roasting Fundamentals",
    category: "Sugar Browning",
    sliders: { acidity: 52, body: 72, sweetness: 94 }
  },
  {
    id: "nutty",
    name: "Nutty & Chocolatey",
    color: "#78350F", // Warm Brown
    bgHex: "rgba(120, 53, 15, 0.08)",
    glowClass: "shadow-amber-900/20",
    textHex: "text-amber-950",
    subNotes: ["Dark Chocolate Cocoa", "Roasted Hazelnut", "Toasted Almond"],
    compounds: "Maillard browning during roast phase (Pyrazines)",
    roastFit: "Medium-Dark Roast, Traditional Natural processing",
    origins: "Brazil (Sul de Minas), Colombia (Huila Excelso)",
    matchingCourseId: "coffee-roasting",
    matchingCourseTitle: "Coffee Roasting Fundamentals",
    category: "Maillard Reaction & Pyrolytic",
    sliders: { acidity: 28, body: 88, sweetness: 82 }
  },
  {
    id: "spicy",
    name: "Spicy & Savory",
    color: "#059669", // Emerald Green
    bgHex: "rgba(5, 150, 105, 0.08)",
    glowClass: "shadow-emerald-500/20",
    textHex: "text-emerald-700",
    subNotes: ["Ceylon Cinnamon", "Black Pepper & Clove", "Cedar Wood & Tobacco"],
    compounds: "Phenolic wood derivatives & essential oils",
    roastFit: "Dark Roast, Giling Basah (Wet-Hulled) processing",
    origins: "Indonesia (Sumatra Mandheling), Rwanda (Kivu region)",
    matchingCourseId: "coffee-agronomy-level-3",
    matchingCourseTitle: "Coffee Agronomy Level 3",
    category: "Dry Distillation / Spicy",
    sliders: { acidity: 18, body: 92, sweetness: 58 }
  }
];

export default function CoursesView({ setView, selectedCourseId, setSelectedCourseId, courses }: CoursesViewProps) {
  const [activeTab, setActiveTab] = useState<'catalog' | 'quiz' | 'sensory'>('catalog');
  const [printCourse, setPrintCourse] = useState<Course | null>(null);
  
  // 1. Program Catalog state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'diploma' | 'certificate' | 'short' | 'professional'>('all');
  const [expandedSyllabus, setExpandedSyllabus] = useState<Record<string, boolean>>({});

  // 2. Interactive Course Finder state
  const [quizStep, setQuizStep] = useState(0); // 0 = intro, 1 = Q1, 2 = Q2, 3 = Q3, 4 = results
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [quizResult, setQuizResult] = useState<Course | null>(null);
  const [quizMatchPercentage, setQuizMatchPercentage] = useState(95);

  // 3. Sensory Profiler state
  const [activeFlavorIdx, setActiveFlavorIdx] = useState(0);

  // Auto-scrolling or routing from external interactions
  useEffect(() => {
    if (selectedCourseId) {
      // If a course is selected from outside, make sure we go to the catalog tab
      setActiveTab('catalog');
      const element = document.getElementById(`course-card-${selectedCourseId}`);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);
      }
    }
  }, [selectedCourseId]);

  const categories = [
    { id: 'all', label: 'All Programs' },
    { id: 'diploma', label: 'Diplomas' },
    { id: 'certificate', label: 'Certificates' },
    { id: 'short', label: 'Short Courses' },
    { id: 'professional', label: 'Executive' },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.certification.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleSyllabus = (courseId: string) => {
    setExpandedSyllabus(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const handleApplyClick = (courseId: string) => {
    setSelectedCourseId(courseId);
    setView('admissions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCalculatorClick = (courseId: string) => {
    setSelectedCourseId(courseId);
    setView('admissions');
    setTimeout(() => {
      const calcEl = document.getElementById('tuition-calculator-section');
      if (calcEl) {
        calcEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  const getCategoryBadgeColor = (cat: string) => {
    switch(cat) {
      case 'diploma': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'certificate': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'short': return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'professional': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Course Finder Calculation Engine (Heuristic matching)
  const calculateResult = (userAns: Record<string, string>) => {
    const q1 = userAns['q1'];
    const q2 = userAns['q2'];
    const q3 = userAns['q3'];

    let courseId = 'barista-level-3'; // Default fallback

    if (q1 === 'agronomy') {
      if (q2 === 'short') {
        courseId = 'coffee-roasting';
      } else if (q2 === 'medium') {
        courseId = 'coffee-agronomy-level-3';
      } else {
        courseId = 'cupping-technology-level-4-5';
      }
    } else if (q1 === 'business') {
      if (q2 === 'short' || q2 === 'medium') {
        courseId = 'agripreneurship-level-5-6';
      } else {
        if (q3 === 'agri_leader') {
          courseId = 'cooperative-management-level-5-6';
        } else {
          courseId = 'agripreneurship-level-5-6';
        }
      }
    } else {
      // service / hospitality
      if (q2 === 'short') {
        courseId = 'coffee-roasting';
      } else if (q2 === 'medium') {
        if (q3 === 'founder') {
          courseId = 'mixology-level-3';
        } else {
          courseId = 'barista-level-3';
        }
      } else {
        courseId = 'bartending-level-4';
      }
    }

    const matched = courses.find(c => c.id === courseId) || courses[0];
    
    // Calculate a realistic high-end match percentage (e.g., 94-99%)
    const seed = (q1 ? q1.charCodeAt(0) : 0) + (q2 ? q2.charCodeAt(0) : 0) + (q3 ? q3.charCodeAt(0) : 0);
    const calculatedPercentage = 93 + (seed % 7);

    setQuizResult(matched);
    setQuizMatchPercentage(calculatedPercentage);
    setQuizStep(4);
  };

  const handleAnswerSelect = (qKey: string, optVal: string) => {
    const updated = { ...answers, [qKey]: optVal };
    setAnswers(updated);
    
    // Progress to next screen
    if (qKey === 'q1') setQuizStep(2);
    else if (qKey === 'q2') setQuizStep(3);
    else if (qKey === 'q3') {
      calculateResult(updated);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setQuizResult(null);
    setQuizStep(0);
  };

  const activeFlavor = FLAVOR_GROUPS[activeFlavorIdx];

  return (
    <div className="space-y-16 pb-20 animate-fade-in" id="courses-view">
      
      {/* 1. HERO BANNER */}
      <section className="relative py-24 flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={latteArtTable}
            alt="VBIT Laboratory Commons" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#110E0C]/85"></div>
        </div>

        <motion.div 
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center px-3.5 py-1 bg-[#C28A4E]/20 text-[#C28A4E] text-xs font-bold uppercase tracking-widest rounded-full border border-[#C28A4E]/30">
            Official Curriculum 
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">
            Nurturing Future Leaders of <br />
            <span className="text-[#C28A4E]">Coffee & Agribusiness</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-gray-300 leading-relaxed">
            Choose from government TVET-accredited diplomas, technical certificates, or intensive short modules designed for commercial practitioners and corporate farm cooperations.
          </p>
        </motion.div>
      </section>

      {/* 2. TAB NAVIGATION (Option 2 & 3 Integration) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="bg-[#FAF6F0]/95 backdrop-blur-md border border-[#2E221C]/15 rounded-3xl p-2 shadow-xl flex flex-col md:flex-row gap-1.5">
          <button
            onClick={() => { setActiveTab('catalog'); setSelectedCourseId(null); }}
            className={`flex-1 flex items-center justify-center space-x-2 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'catalog'
                ? 'bg-[#2E221C] text-[#FAF6F0] shadow-md'
                : 'text-[#2E221C]/70 hover:text-[#2E221C] hover:bg-[#2E221C]/5'
            }`}
          >
            <BookOpen className="h-4 w-4 text-[#C28A4E]" />
            <span>📚 Program Catalog</span>
          </button>
          
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-[#2E221C] text-[#FAF6F0] shadow-md'
                : 'text-[#2E221C]/70 hover:text-[#2E221C] hover:bg-[#2E221C]/5'
            }`}
          >
            <Sparkles className="h-4 w-4 text-[#C28A4E]" />
            <span>🎯 Course Finder Quiz</span>
          </button>

          <button
            onClick={() => setActiveTab('sensory')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'sensory'
                ? 'bg-[#2E221C] text-[#FAF6F0] shadow-md'
                : 'text-[#2E221C]/70 hover:text-[#2E221C] hover:bg-[#2E221C]/5'
            }`}
          >
            <Compass className="h-4 w-4 text-[#C28A4E]" />
            <span>🧪 Sensory Profiler</span>
          </button>
        </div>
      </section>

      {/* 3. DYNAMIC VIEWS CONTAINER */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          
          {/* TAB A: MAIN COURSE CATALOG */}
          {activeTab === 'catalog' && (
            <motion.div
              key="catalog-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-12"
            >
              {/* Dynamic Filter / Search Bar */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white border border-[#2E221C]/10 rounded-2xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
                  
                  {/* Category Filter Pills */}
                  <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        id={`cat-pill-${cat.id}`}
                        onClick={() => {
                          setActiveCategory(cat.id as any);
                          setSelectedCourseId(null);
                        }}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          activeCategory === cat.id
                            ? 'bg-[#2E221C] text-[#FAF6F0] shadow-sm'
                            : 'bg-[#FAF6F0] text-[#2E221C]/80 hover:bg-[#2E221C]/5 border border-[#2E221C]/10'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Search Box */}
                  <div className="relative w-full md:w-80">
                    <input
                      type="text"
                      id="courses-search"
                      placeholder="Search syllabus or programs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#FAF6F0] border border-[#2E221C]/15 rounded-xl pl-11 pr-4 py-3 text-xs text-[#2E221C] placeholder-[#8E7C74]/60 focus:border-[#C28A4E] focus:bg-white transition-all shadow-inner"
                    />
                    <Search className="h-4.5 w-4.5 text-[#8E7C74] absolute left-3.5 top-3.5" />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-3.5 p-0.5 hover:bg-[#2E221C]/10 rounded-full cursor-pointer"
                      >
                        <X className="h-3 w-3 text-[#8E7C74]" />
                      </button>
                    )}
                  </div>

                </div>
              </div>

              {/* Course Listing Grid */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {filteredCourses.length === 0 ? (
                  <div className="text-center py-16 bg-white border border-[#2E221C]/5 rounded-2xl shadow-sm space-y-4">
                    <BookOpen className="h-12 w-12 text-[#8E7C74] mx-auto opacity-40" />
                    <h3 className="font-serif text-lg font-bold text-[#2E221C]">No Programs Found</h3>
                    <p className="text-xs text-[#2E221C]/60 max-w-md mx-auto">
                      We couldn't find any courses matching your filters. Try clearing your search keyword or selecting "All Programs".
                    </p>
                    <button
                      onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                      className="bg-[#C28A4E] text-white text-xs px-4 py-2 rounded-lg font-semibold cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.map((course, idx) => {
                      const isSelected = selectedCourseId === course.id;
                      const isSyllabusOpen = !!expandedSyllabus[course.id];
                      
                      return (
                        <motion.div
                          key={course.id}
                          id={`course-card-${course.id}`}
                          className={`bg-white border rounded-3xl overflow-hidden shadow-sm flex flex-col h-full transition-shadow duration-300 ${
                            isSelected ? 'ring-2 ring-[#C28A4E] border-transparent scale-[1.01]' : 'border-[#2E221C]/10'
                          }`}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ 
                            opacity: { duration: 0.5, delay: (idx % 3) * 0.1 },
                            y: { duration: 0.5, delay: (idx % 3) * 0.1 },
                            scale: { type: 'spring', stiffness: 400, damping: 25 },
                            boxShadow: { duration: 0.2 }
                          }}
                          whileHover={{ 
                            y: -6, 
                            scale: 1.02, 
                            boxShadow: "0 20px 25px -5px rgba(46, 34, 28, 0.08), 0 10px 10px -6px rgba(46, 34, 28, 0.06)" 
                          }}
                        >
                          {/* Card Header Image */}
                          <div className="relative h-48 overflow-hidden bg-gray-100 shrink-0">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-3 left-3 flex gap-2">
                              <span className={`text-[10px] uppercase font-extrabold tracking-wider px-3 py-1 rounded-full border shadow-sm ${getCategoryBadgeColor(course.category)}`}>
                                {course.category}
                              </span>
                            </div>
                          </div>

                          {/* Card Core Content */}
                          <div className="p-6 flex flex-col justify-between flex-grow space-y-5">
                            <div className="space-y-3.5">
                              {/* Meta duration/level */}
                              <div className="flex items-center justify-between text-[11px] text-[#8E7C74] font-semibold border-b border-[#2E221C]/5 pb-2">
                                <span className="flex items-center space-x-1">
                                  <Clock className="h-3.5 w-3.5 text-[#C28A4E]" />
                                  <span>{course.duration}</span>
                                </span>
                                <span>{course.level}</span>
                              </div>

                              {/* Title */}
                              <h3 className="font-serif text-lg font-bold text-[#2E221C] leading-snug">
                                {course.title}
                              </h3>

                              {/* Description */}
                              <p className="text-xs text-[#2E221C]/75 leading-relaxed">
                                {course.description}
                              </p>

                              {/* Certification badge */}
                              <div className="bg-[#FAF6F0] p-3 rounded-xl border border-[#C28A4E]/15 flex items-start space-x-2 text-[11px] text-[#2E221C]/80">
                                <Award className="h-4 w-4 text-[#C28A4E] shrink-0 mt-0.5" />
                                <span><strong>Credential:</strong> {course.certification}</span>
                              </div>
                            </div>

                            {/* Collapsible Syllabus & Action buttons */}
                            <div className="space-y-4 pt-2">
                              {/* Expand Syllabus button */}
                              <button
                                id={`syllabus-toggle-${course.id}`}
                                onClick={() => toggleSyllabus(course.id)}
                                className="flex items-center justify-between w-full text-left text-xs font-bold text-[#2E221C] hover:text-[#C28A4E] border-t border-[#2E221C]/5 pt-3 cursor-pointer"
                              >
                                <span>Syllabus Breakdown</span>
                                {isSyllabusOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                              </button>

                              <AnimatePresence initial={false}>
                                {isSyllabusOpen && (
                                  <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="bg-[#FAF6F0]/50 rounded-xl p-3 border border-[#2E221C]/5 space-y-2 overflow-hidden"
                                  >
                                    <span className="text-[10px] uppercase font-bold text-[#8E7C74] tracking-wider">Course Modules:</span>
                                    <ul className="space-y-1.5">
                                      {course.syllabus.map((mod, i) => (
                                        <li key={i} className="flex items-start space-x-2 text-[10px] text-[#2E221C]/80">
                                          <span className="bg-[#C28A4E]/20 text-[#C28A4E] h-4 w-4 flex items-center justify-center rounded-full text-[8px] font-bold shrink-0 mt-0.5">{i+1}</span>
                                          <span>{mod}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              {/* Tuition pricing quick row */}
                              <div className="flex items-center justify-between text-xs border-t border-b border-[#2E221C]/5 py-3">
                                <span className="text-[#8E7C74] font-medium">Standard Tuition:</span>
                                <span className="font-serif font-extrabold text-[#2E221C]">
                                  KSh {course.fees.tuition.toLocaleString()}
                                </span>
                              </div>

                              {/* Actions */}
                              <div className="space-y-2.5">
                                <button
                                  id={`course-apply-btn-${course.id}`}
                                  onClick={() => handleApplyClick(course.id)}
                                  className="w-full bg-[#C28A4E] hover:bg-[#A4713C] text-white font-bold text-xs py-3 rounded-xl transition-all shadow-sm cursor-pointer text-center font-sans"
                                >
                                  Apply Now
                                </button>
                                <div className="grid grid-cols-2 gap-2">
                                  <button
                                    id={`course-calc-btn-${course.id}`}
                                    onClick={() => handleCalculatorClick(course.id)}
                                    className="w-full bg-[#FAF6F0] hover:bg-[#2E221C]/5 text-[#2E221C] font-bold text-xs py-2.5 rounded-xl border border-[#2E221C]/10 transition-all flex items-center justify-center space-x-1 cursor-pointer text-center font-sans"
                                  >
                                    <Calculator className="h-3.5 w-3.5 text-[#8E7C74]" />
                                    <span>Estimate Fees</span>
                                  </button>
                                  <button
                                    id={`course-print-btn-${course.id}`}
                                    onClick={() => setPrintCourse(course)}
                                    className="w-full bg-[#FAF6F0] hover:bg-[#2E221C]/5 text-[#2E221C] font-bold text-xs py-2.5 rounded-xl border border-[#2E221C]/10 transition-all flex items-center justify-center space-x-1 cursor-pointer text-center font-sans"
                                  >
                                    <Printer className="h-3.5 w-3.5 text-[#8E7C74]" />
                                    <span>Print Flyer</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB B: INTERACTIVE COURSE FINDER QUIZ */}
          {activeTab === 'quiz' && (
            <motion.div
              key="quiz-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="max-w-3xl mx-auto px-4"
            >
              <div className="bg-white border border-[#2E221C]/15 rounded-3xl shadow-xl overflow-hidden min-h-[480px] flex flex-col justify-between">
                
                {/* Header Banner */}
                <div className="bg-[#2E221C] text-white p-6 sm:p-8 space-y-2 border-b border-[#C28A4E]/20">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-[#C28A4E] animate-pulse" />
                    <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#C28A4E]">Academic Counseling</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold">VBIT PathFinder Quiz</h3>
                  <p className="text-xs text-gray-300">Answer 3 simple questions to instantly find the agricultural or coffee curriculum path tailored to your passion.</p>
                </div>

                {/* Main Content Area */}
                <div className="p-6 sm:p-10 flex-grow flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    
                    {/* STEP 0: INTRO SCREEN */}
                    {quizStep === 0 && (
                      <motion.div
                        key="step-0"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="text-center space-y-6 py-4"
                      >
                        <div className="h-16 w-16 bg-[#FAF6F0] rounded-full flex items-center justify-center text-[#C28A4E] mx-auto border border-[#C28A4E]/25">
                          <Coffee className="h-8 w-8" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-serif text-lg font-bold text-[#2E221C]">Discover Your True Calling</h4>
                          <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                            Whether you're aiming to master international direct-trade business, manage shaded agroforest blocks, or brew high-fidelity micro-foam as an elite barista, we have an accredited study pathway for you.
                          </p>
                        </div>
                        <button
                          onClick={() => setQuizStep(1)}
                          className="px-8 py-3.5 bg-[#C28A4E] hover:bg-[#A4713C] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center space-x-2"
                        >
                          <span>Start Pathfinder Quiz (30s)</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </motion.div>
                    )}

                    {/* STEP 1: QUESTION 1 */}
                    {quizStep === 1 && (
                      <motion.div
                        key="step-1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                          <span className="text-[10px] font-mono font-bold text-gray-400">Step 1 of 3</span>
                          <span className="h-2 w-16 bg-gray-100 rounded-full overflow-hidden"><span className="block h-full w-1/3 bg-[#C28A4E]" /></span>
                        </div>
                        <h4 className="font-serif text-lg font-extrabold text-[#2E221C]">1. What area of the coffee and agricultural ecosystem excites you most?</h4>
                        
                        <div className="grid grid-cols-1 gap-3.5">
                          <button
                            onClick={() => handleAnswerSelect('q1', 'service')}
                            className="text-left p-4.5 bg-[#FAF6F0] hover:bg-white border border-[#2E221C]/10 hover:border-[#C28A4E] hover:shadow-md rounded-2xl transition-all cursor-pointer group flex items-start space-x-4"
                          >
                            <span className="h-6 w-6 rounded-full bg-white border border-gray-300 flex items-center justify-center font-bold text-[10px] text-[#2E221C] shrink-0 group-hover:bg-[#C28A4E] group-hover:text-white group-hover:border-transparent transition-colors">A</span>
                            <div>
                              <div className="font-bold text-xs text-[#2E221C]">Beverage Crafting, Latte Art & Hospitality</div>
                              <p className="text-[10px] text-[#8E7C74] mt-0.5">Mastering high-fidelity milk texturing, advanced espresso calibration, mixology infusions, and cafe service operations.</p>
                            </div>
                          </button>

                          <button
                            onClick={() => handleAnswerSelect('q1', 'agronomy')}
                            className="text-left p-4.5 bg-[#FAF6F0] hover:bg-white border border-[#2E221C]/10 hover:border-[#C28A4E] hover:shadow-md rounded-2xl transition-all cursor-pointer group flex items-start space-x-4"
                          >
                            <span className="h-6 w-6 rounded-full bg-white border border-gray-300 flex items-center justify-center font-bold text-[10px] text-[#2E221C] shrink-0 group-hover:bg-[#C28A4E] group-hover:text-white group-hover:border-transparent transition-colors">B</span>
                            <div>
                              <div className="font-bold text-xs text-[#2E221C]">Soil Chemistry, Horticulture & Sensory Cupping</div>
                              <p className="text-[10px] text-[#8E7C74] mt-0.5">Focusing on organic plant nutrition, nursery breeding, climate-smart agroforestry, and professional sensory grading.</p>
                            </div>
                          </button>

                          <button
                            onClick={() => handleAnswerSelect('q1', 'business')}
                            className="text-left p-4.5 bg-[#FAF6F0] hover:bg-white border border-[#2E221C]/10 hover:border-[#C28A4E] hover:shadow-md rounded-2xl transition-all cursor-pointer group flex items-start space-x-4"
                          >
                            <span className="h-6 w-6 rounded-full bg-white border border-gray-300 flex items-center justify-center font-bold text-[10px] text-[#2E221C] shrink-0 group-hover:bg-[#C28A4E] group-hover:text-white group-hover:border-transparent transition-colors">C</span>
                            <div>
                              <div className="font-bold text-xs text-[#2E221C]">Agribusiness Systems, Cooperatives & Global Export</div>
                              <p className="text-[10px] text-[#8E7C74] mt-0.5">Building scalable models, managing futures contracts risk hedging, running cooperative auditing, and navigating export board laws.</p>
                            </div>
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: QUESTION 2 */}
                    {quizStep === 2 && (
                      <motion.div
                        key="step-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                          <button onClick={() => setQuizStep(1)} className="text-[10px] font-bold text-[#C28A4E] hover:underline flex items-center space-x-1 cursor-pointer">
                            <ArrowLeft className="h-3 w-3" /> <span>Back</span>
                          </button>
                          <span className="text-[10px] font-mono font-bold text-gray-400">Step 2 of 3</span>
                          <span className="h-2 w-16 bg-gray-100 rounded-full overflow-hidden"><span className="block h-full w-2/3 bg-[#C28A4E]" /></span>
                        </div>
                        <h4 className="font-serif text-lg font-extrabold text-[#2E221C]">2. What is your preferred study duration and schedule intensity?</h4>
                        
                        <div className="grid grid-cols-1 gap-3.5">
                          <button
                            onClick={() => handleAnswerSelect('q2', 'short')}
                            className="text-left p-4.5 bg-[#FAF6F0] hover:bg-white border border-[#2E221C]/10 hover:border-[#C28A4E] hover:shadow-md rounded-2xl transition-all cursor-pointer group flex items-start space-x-4"
                          >
                            <span className="h-6 w-6 rounded-full bg-white border border-gray-300 flex items-center justify-center font-bold text-[10px] text-[#2E221C] shrink-0 group-hover:bg-[#C28A4E] group-hover:text-white group-hover:border-transparent transition-colors">A</span>
                            <div>
                              <div className="font-bold text-xs text-[#2E221C]">Short, Intensive Skill-up Module (1–2 weeks)</div>
                              <p className="text-[10px] text-[#8E7C74] mt-0.5">Fast-track hands-on labs focusing on narrow hardware operations like commercial roasting calibration or artisan profiling.</p>
                            </div>
                          </button>

                          <button
                            onClick={() => handleAnswerSelect('q2', 'medium')}
                            className="text-left p-4.5 bg-[#FAF6F0] hover:bg-white border border-[#2E221C]/10 hover:border-[#C28A4E] hover:shadow-md rounded-2xl transition-all cursor-pointer group flex items-start space-x-4"
                          >
                            <span className="h-6 w-6 rounded-full bg-white border border-gray-300 flex items-center justify-center font-bold text-[10px] text-[#2E221C] shrink-0 group-hover:bg-[#C28A4E] group-hover:text-white group-hover:border-transparent transition-colors">B</span>
                            <div>
                              <div className="font-bold text-xs text-[#2E221C]">Comprehensive Technical Certificate (6 months)</div>
                              <p className="text-[10px] text-[#8E7C74] mt-0.5">Solid full-time practical foundations with government TVET approved certificate to kickstart industry careers.</p>
                            </div>
                          </button>

                          <button
                            onClick={() => handleAnswerSelect('q2', 'long')}
                            className="text-left p-4.5 bg-[#FAF6F0] hover:bg-white border border-[#2E221C]/10 hover:border-[#C28A4E] hover:shadow-md rounded-2xl transition-all cursor-pointer group flex items-start space-x-4"
                          >
                            <span className="h-6 w-6 rounded-full bg-white border border-gray-300 flex items-center justify-center font-bold text-[10px] text-[#2E221C] shrink-0 group-hover:bg-[#C28A4E] group-hover:text-white group-hover:border-transparent transition-colors">C</span>
                            <div>
                              <div className="font-bold text-xs text-[#2E221C]">Professional Diploma or Executive block (1–2 years)</div>
                              <p className="text-[10px] text-[#8E7C74] mt-0.5">Advanced structural credentials, leadership coaching, long-term industry placements, or hybrid executive releases.</p>
                            </div>
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: QUESTION 3 */}
                    {quizStep === 3 && (
                      <motion.div
                        key="step-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                          <button onClick={() => setQuizStep(2)} className="text-[10px] font-bold text-[#C28A4E] hover:underline flex items-center space-x-1 cursor-pointer">
                            <ArrowLeft className="h-3 w-3" /> <span>Back</span>
                          </button>
                          <span className="text-[10px] font-mono font-bold text-gray-400">Step 3 of 3</span>
                          <span className="h-2 w-16 bg-gray-100 rounded-full overflow-hidden"><span className="block h-full w-full bg-[#C28A4E]" /></span>
                        </div>
                        <h4 className="font-serif text-lg font-extrabold text-[#2E221C]">3. What is your ultimate career goal or primary business objective?</h4>
                        
                        <div className="grid grid-cols-1 gap-3.5">
                          <button
                            onClick={() => handleAnswerSelect('q3', 'job')}
                            className="text-left p-4.5 bg-[#FAF6F0] hover:bg-white border border-[#2E221C]/10 hover:border-[#C28A4E] hover:shadow-md rounded-2xl transition-all cursor-pointer group flex items-start space-x-4"
                          >
                            <span className="h-6 w-6 rounded-full bg-white border border-gray-300 flex items-center justify-center font-bold text-[10px] text-[#2E221C] shrink-0 group-hover:bg-[#C28A4E] group-hover:text-white group-hover:border-transparent transition-colors">A</span>
                            <div>
                              <div className="font-bold text-xs text-[#2E221C]">Acquire immediate, high-paying employment in top-tier establishments</div>
                              <p className="text-[10px] text-[#8E7C74] mt-0.5">Secure employment as an elite lead barista, head mixologist, or hospitality specialist locally and internationally.</p>
                            </div>
                          </button>

                          <button
                            onClick={() => handleAnswerSelect('q3', 'agri_leader')}
                            className="text-left p-4.5 bg-[#FAF6F0] hover:bg-white border border-[#2E221C]/10 hover:border-[#C28A4E] hover:shadow-md rounded-2xl transition-all cursor-pointer group flex items-start space-x-4"
                          >
                            <span className="h-6 w-6 rounded-full bg-white border border-gray-300 flex items-center justify-center font-bold text-[10px] text-[#2E221C] shrink-0 group-hover:bg-[#C28A4E] group-hover:text-white group-hover:border-transparent transition-colors">B</span>
                            <div>
                              <div className="font-bold text-xs text-[#2E221C]">Lead and coordinate agricultural institutions, cooperatives, or farms</div>
                              <p className="text-[10px] text-[#8E7C74] mt-0.5">Direct crop nutrition networks, run multi-member agricultural societies, or act as an organic field specialist.</p>
                            </div>
                          </button>

                          <button
                            onClick={() => handleAnswerSelect('q3', 'founder')}
                            className="text-left p-4.5 bg-[#FAF6F0] hover:bg-white border border-[#2E221C]/10 hover:border-[#C28A4E] hover:shadow-md rounded-2xl transition-all cursor-pointer group flex items-start space-x-4"
                          >
                            <span className="h-6 w-6 rounded-full bg-white border border-gray-300 flex items-center justify-center font-bold text-[10px] text-[#2E221C] shrink-0 group-hover:bg-[#C28A4E] group-hover:text-white group-hover:border-transparent transition-colors">C</span>
                            <div>
                              <div className="font-bold text-xs text-[#2E221C]">Launch my own enterprise, roastery brand, or direct-trade firm</div>
                              <p className="text-[10px] text-[#8E7C74] mt-0.5">Establish a commercial brand, invest in boutique micro-lots, roast custom recipes, and pitch products to global trade buyers.</p>
                            </div>
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 4: RESULTS SCREEN */}
                    {quizStep === 4 && quizResult && (
                      <motion.div
                        key="step-4"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="space-y-6 py-2"
                      >
                        {/* Perfect Match Header */}
                        <div className="text-center space-y-2">
                          <span className="inline-flex items-center px-3.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-200">
                            {quizMatchPercentage}% Core Match
                          </span>
                          <h4 className="font-serif text-xl sm:text-2xl font-black text-[#2E221C]">Your Recommended Pathway</h4>
                        </div>

                        {/* Recommendation Course Detail Card */}
                        <div className="bg-[#FAF6F0] border border-[#C28A4E]/30 rounded-2xl p-5 sm:p-6 space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#2E221C]/10 pb-3">
                            <div>
                              <span className={`text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border ${getCategoryBadgeColor(quizResult.category)}`}>
                                {quizResult.category}
                              </span>
                              <h5 className="font-serif text-base sm:text-lg font-bold text-[#2E221C] mt-1.5">{quizResult.title}</h5>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] text-[#8E7C74] block font-semibold">Duration:</span>
                              <span className="font-bold text-xs text-[#2E221C]">{quizResult.duration}</span>
                            </div>
                          </div>

                          <p className="text-xs text-[#2E221C]/80 leading-relaxed font-medium">
                            {quizResult.description}
                          </p>

                          {/* Quick career stats panel */}
                          <div className="grid grid-cols-2 gap-3 pt-1">
                            <div className="bg-white/80 p-3 rounded-xl border border-[#2E221C]/5 text-center">
                              <span className="text-[9px] text-[#8E7C74] block uppercase font-bold tracking-wider">Career Demand</span>
                              <strong className="text-emerald-700 text-xs uppercase font-extrabold block mt-0.5">High Demand</strong>
                            </div>
                            <div className="bg-white/80 p-3 rounded-xl border border-[#2E221C]/5 text-center">
                              <span className="text-[9px] text-[#8E7C74] block uppercase font-bold tracking-wider">Starting Tuition</span>
                              <strong className="text-gray-900 text-xs font-bold block mt-0.5">KSh {quizResult.fees.tuition.toLocaleString()}</strong>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                          <button
                            onClick={() => {
                              setActiveTab('catalog');
                              setSelectedCourseId(quizResult.id);
                              setTimeout(() => {
                                const element = document.getElementById(`course-card-${quizResult.id}`);
                                if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              }, 150);
                            }}
                            className="py-3 bg-[#2E221C] hover:bg-[#110E0C] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center flex items-center justify-center"
                          >
                            View Syllabus
                          </button>
                          
                          <button
                            onClick={() => setPrintCourse(quizResult)}
                            className="py-3 bg-[#FAF6F0] hover:bg-[#2E221C]/5 text-[#2E221C] text-[11px] font-bold uppercase tracking-wider rounded-xl border border-[#2E221C]/10 transition-all cursor-pointer text-center flex items-center justify-center space-x-1"
                          >
                            <Printer className="h-3.5 w-3.5 text-[#8E7C74]" />
                            <span>Print Flyer</span>
                          </button>

                          <button
                            onClick={() => {
                              setSelectedCourseId(quizResult.id);
                              setView('admissions');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="py-3 bg-[#C28A4E] hover:bg-[#A4713C] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer text-center flex items-center justify-center space-x-1"
                          >
                            <span>Apply Now</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

                {/* Footer Controls */}
                <div className="bg-gray-50 border-t border-gray-100 p-5 flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-[10px] text-gray-400">
                    <HelpCircle className="h-4.5 w-4.5 text-gray-300" />
                    <span>Need counseling? Call us at +254 708 137992</span>
                  </div>
                  
                  {quizStep > 0 && (
                    <button
                      onClick={resetQuiz}
                      className="text-[10px] font-bold text-gray-400 hover:text-gray-700 uppercase tracking-wider flex items-center space-x-1.5 cursor-pointer"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>Restart Quiz</span>
                    </button>
                  )}
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB C: COFFEE SENSORY WHEEL & FLAVOR PROFILER */}
          {activeTab === 'sensory' && (
            <motion.div
              key="sensory-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Left Side: Interative Grid Deck (7 cols) */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Compass className="h-5 w-5 text-[#C28A4E]" />
                      <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#C28A4E]">SCA Sensory Science</span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-black text-[#2E221C]">Tactile Coffee Flavor Profiler</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Coffee contains over 800 organic volatile flavor compounds. Click on any core flavor group card to inspect chemical profiles, soil origins, and corresponding VBIT grading courses.
                    </p>
                  </div>

                  {/* Flavor Cards Stack */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {FLAVOR_GROUPS.map((fg, idx) => {
                      const isActive = activeFlavorIdx === idx;
                      return (
                        <motion.button
                          key={fg.id}
                          onClick={() => setActiveFlavorIdx(idx)}
                          className={`text-left p-5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-40 ${
                            isActive 
                              ? 'border-transparent shadow-lg bg-white ' + fg.glowClass
                              : 'border-[#2E221C]/15 bg-white/70 hover:bg-white hover:border-[#2E221C]/40'
                          }`}
                          whileHover={{ y: -3 }}
                          transition={{ duration: 0.2 }}
                        >
                          {/* Radial Glow on active */}
                          {isActive && (
                            <div 
                              className="absolute inset-0 opacity-10 blur-xl pointer-events-none"
                              style={{ backgroundColor: fg.color }}
                            />
                          )}

                          {/* Left Bar Indicator */}
                          <div 
                            className="absolute left-0 top-0 bottom-0 w-1.5"
                            style={{ backgroundColor: fg.color }}
                          />

                          {/* Group header */}
                          <div className="space-y-1">
                            <span className="text-[9px] uppercase font-bold tracking-widest text-gray-400 block">{fg.category}</span>
                            <span className="font-serif text-base font-extrabold text-[#2E221C] block">{fg.name}</span>
                          </div>

                          {/* Sub notes display */}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {fg.subNotes.slice(0, 2).map((note, i) => (
                              <span key={i} className="text-[8px] font-bold px-2 py-0.5 bg-gray-50 border border-gray-150 rounded-md text-gray-600 truncate max-w-full">
                                {note.split(' (')[0]}
                              </span>
                            ))}
                          </div>

                          {/* Selected Active Dot */}
                          <div className="flex justify-between items-center w-full mt-4 border-t border-gray-100 pt-2.5">
                            <span className="text-[9px] font-mono text-gray-400">Origins: {fg.origins.split(' (')[0]}</span>
                            <span 
                              className="h-2.5 w-2.5 rounded-full" 
                              style={{ backgroundColor: fg.color }}
                            />
                          </div>

                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Side: High-fidelity Details Board (6 cols) */}
                <div className="lg:col-span-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFlavor.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white border border-[#2E221C]/15 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6"
                    >
                      {/* Top title and origin badges */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-5">
                        <div className="space-y-1.5">
                          <span className="text-[9px] font-mono uppercase font-bold text-white px-2.5 py-1 rounded-full border shadow-sm leading-none" style={{ backgroundColor: activeFlavor.color, borderColor: activeFlavor.color }}>
                            {activeFlavor.category}
                          </span>
                          <h4 className="font-serif text-xl sm:text-2xl font-black text-[#2E221C] mt-2">{activeFlavor.name} Profiles</h4>
                        </div>
                        <div className="text-right sm:max-w-[200px]">
                          <span className="text-[9px] text-gray-400 block font-bold uppercase tracking-wider">Benchmark Origins:</span>
                          <span className="text-xs text-[#2E221C] font-extrabold leading-snug">{activeFlavor.origins}</span>
                        </div>
                      </div>

                      {/* Chemical and Agriculture info */}
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="p-3.5 bg-gray-50 border border-gray-100 rounded-2xl">
                          <span className="text-[9px] text-[#8E7C74] font-bold block uppercase tracking-wider mb-1">Volatile Compound:</span>
                          <span className="font-mono text-xs font-semibold text-[#2E221C]">{activeFlavor.compounds}</span>
                        </div>
                        <div className="p-3.5 bg-gray-50 border border-gray-100 rounded-2xl">
                          <span className="text-[9px] text-[#8E7C74] font-bold block uppercase tracking-wider mb-1">Roast & Processing Fit:</span>
                          <span className="text-xs font-semibold text-[#2E221C]">{activeFlavor.roastFit}</span>
                        </div>
                      </div>

                      {/* Flavor Sub-Notes List */}
                      <div className="space-y-2">
                        <span className="text-[10px] text-gray-400 uppercase font-bold block tracking-wider">Sub-Notes Breakdowns:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {activeFlavor.subNotes.map((note, idx) => (
                            <div key={idx} className="p-3 bg-[#FAF6F0] rounded-xl border border-[#C28A4E]/10 font-bold text-center text-xs text-[#2E221C]">
                              {note}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Interactive Sliders (Non-adjustable but high-end data representation) */}
                      <div className="space-y-4 border-t border-gray-150 pt-5">
                        <span className="text-[10px] text-gray-400 uppercase font-bold block tracking-wider">Sensory Balance Mapping:</span>
                        
                        <div className="space-y-3.5 text-xs">
                          {/* Acidity */}
                          <div className="space-y-1">
                            <div className="flex justify-between font-bold text-[#2E221C]">
                              <span>Organic Acidity / Brightness</span>
                              <span style={{ color: activeFlavor.color }}>{activeFlavor.sliders.acidity}/100</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full rounded-full"
                                style={{ backgroundColor: activeFlavor.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${activeFlavor.sliders.acidity}%` }}
                                transition={{ duration: 0.6 }}
                              />
                            </div>
                          </div>

                          {/* Body */}
                          <div className="space-y-1">
                            <div className="flex justify-between font-bold text-[#2E221C]">
                              <span>Texture / Somatic Body (Mouthfeel)</span>
                              <span style={{ color: activeFlavor.color }}>{activeFlavor.sliders.body}/100</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full rounded-full"
                                style={{ backgroundColor: activeFlavor.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${activeFlavor.sliders.body}%` }}
                                transition={{ duration: 0.6 }}
                              />
                            </div>
                          </div>

                          {/* Sweetness */}
                          <div className="space-y-1">
                            <div className="flex justify-between font-bold text-[#2E221C]">
                              <span>Saccharide Sweetness</span>
                              <span style={{ color: activeFlavor.color }}>{activeFlavor.sliders.sweetness}/100</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full rounded-full"
                                style={{ backgroundColor: activeFlavor.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${activeFlavor.sliders.sweetness}%` }}
                                transition={{ duration: 0.6 }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Target Course Recommendation Callout */}
                      <div className="bg-[#FAF6F0] border-l-4 rounded-r-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" style={{ borderLeftColor: activeFlavor.color }}>
                        <div className="space-y-1">
                          <span className="text-[9px] uppercase font-bold text-[#8E7C74]">Corresponding VBIT Core Course:</span>
                          <p className="font-bold text-xs text-[#2E221C]">{activeFlavor.matchingCourseTitle}</p>
                          <p className="text-[10px] text-gray-500">Learn organic acid chemistry, sample roasting curves, and sensory evaluation in our TVET laboratories.</p>
                        </div>
                        
                        <div className="flex items-center space-x-2 shrink-0 self-start sm:self-center">
                          <button
                            onClick={() => {
                              const matchObj = courses.find(c => c.id === activeFlavor.matchingCourseId);
                              if (matchObj) setPrintCourse(matchObj);
                            }}
                            className="p-2.5 bg-white hover:bg-gray-50 text-gray-700 rounded-xl border border-gray-200 shadow-sm cursor-pointer flex items-center justify-center"
                            title="Print Course Flyer"
                          >
                            <Printer className="h-4 w-4 text-[#8E7C74]" />
                          </button>
                          
                          <button
                            onClick={() => {
                              setActiveTab('catalog');
                              setSelectedCourseId(activeFlavor.matchingCourseId);
                              setTimeout(() => {
                                const element = document.getElementById(`course-card-${activeFlavor.matchingCourseId}`);
                                if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              }, 150);
                            }}
                            className="px-4 py-2.5 text-white text-[10px] font-bold uppercase tracking-wider rounded-xl shadow-sm transition-colors cursor-pointer"
                            style={{ backgroundColor: activeFlavor.color }}
                          >
                            View Syllabus
                          </button>
                        </div>
                      </div>

                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* 4. SYLLABUS DISCLAIMER */}
      <section className="bg-[#FAF6F0]/60 py-16 border-t border-b border-[#2E221C]/5">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <CheckSquare className="h-8 w-8 text-[#C28A4E] mx-auto animate-pulse" />
          <h3 className="font-serif text-lg font-bold text-[#2E221C]">TVET Competency-Based Educational Framework</h3>
          <p className="text-xs text-[#2E221C]/70 leading-relaxed">
            All curriculum pathways are fully mapped to the National Occupational Standards of Kenya. In addition to theory logs, graduates must complete a mandatory 3-month external industrial field placement inside partnering washing stations, agricultural technology centers, or commercial roasteries prior to the awarding of diplomas.
          </p>
        </div>
      </section>

      {/* 5. PRINT-FRIENDLY FLYER PREVIEW MODAL */}
      <AnimatePresence>
        {printCourse && (
          <div className="fixed inset-0 z-[999] overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10" id="print-modal-container">
            {/* Modal backdrop */}
            <motion.div 
              id="print-modal-backdrop"
              className="fixed inset-0 bg-[#110E0C]/80 backdrop-blur-sm no-print"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPrintCourse(null)}
            />

            {/* Print Area Overlay Card */}
            <motion.div
              className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10 border border-[#2E221C]/15 print-modal-content-container"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
            >
              {/* Dynamic style sheet injection for perfect print layouts */}
              <style>{`
                @media print {
                  /* Completely hide main web contents, scrollbars, etc */
                  body {
                    background-color: #ffffff !important;
                    background-image: none !important;
                    font-family: 'Manrope', 'Inter', sans-serif !important;
                  }
                  #courses-view, header, footer, nav, button, .no-print {
                    display: none !important;
                  }
                  /* Unset fixed modal constraints for flat rendering on paper */
                  #print-modal-container {
                    position: absolute !important;
                    left: 0 !important;
                    top: 0 !important;
                    width: 100% !important;
                    height: auto !important;
                    overflow: visible !important;
                    display: block !important;
                    padding: 0 !important;
                    margin: 0 !important;
                  }
                  #print-modal-backdrop {
                    display: none !important;
                  }
                  .print-modal-content-container {
                    position: static !important;
                    max-height: none !important;
                    box-shadow: none !important;
                    border: none !important;
                    width: 100% !important;
                    overflow: visible !important;
                  }
                  .print-only-layout {
                    padding: 0 !important;
                    margin: 0 !important;
                  }
                  /* Force high-contrast black-and-white print adjustments */
                  .print-header-seal {
                    border-color: #000000 !important;
                  }
                  .print-text-dark {
                    color: #000000 !important;
                  }
                  .print-border-thick {
                    border-width: 2px !important;
                    border-color: #000000 !important;
                  }
                  .no-print-break {
                    page-break-inside: avoid !important;
                    break-inside: avoid !important;
                  }
                }
              `}</style>

              {/* Action Toolbar Header (Hidden in Print) */}
              <div id="print-controls" className="bg-[#2E221C] text-white px-6 py-4.5 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#C28A4E]/30 shrink-0 no-print">
                <div className="flex items-center space-x-2.5">
                  <div className="bg-[#C28A4E] text-white p-2 rounded-xl">
                    <Printer className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-extrabold tracking-wide">Print-Friendly Program Dossier</h4>
                    <p className="text-[11px] text-gray-300">Share or save this official TVET curriculum with families and business partners.</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => {
                      // Trigger analytics if needed
                      const saved = localStorage.getItem('vibit_analytics');
                      if (saved) {
                        try {
                          const data = JSON.parse(saved);
                          data.courseClicks = data.courseClicks || {};
                          data.courseClicks[printCourse.id] = (data.courseClicks[printCourse.id] || 0) + 1;
                          localStorage.setItem('vibit_analytics', JSON.stringify(data));
                        } catch (e) { console.error(e); }
                      }
                      window.print();
                    }}
                    className="flex-1 sm:flex-none px-4 py-2 bg-[#C28A4E] hover:bg-[#A4713C] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm font-sans"
                  >
                    <Printer className="h-4 w-4" />
                    <span>Print Dossier</span>
                  </button>
                  <button
                    onClick={() => setPrintCourse(null)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-xl border border-white/10 transition-all cursor-pointer font-sans"
                  >
                    Close
                  </button>
                </div>
              </div>

              {/* Printable Body Content (Will stretch and output perfectly in Print View) */}
              <div className="p-6 sm:p-10 overflow-y-auto print-only-layout space-y-8 bg-white text-[#2E221C]">
                {/* Official Crest & Institute Header */}
                <div id="vibit-print-area" className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-double border-[#2E221C]/25 pb-6">
                    <div className="text-center sm:text-left space-y-1.5">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-[#C28A4E] uppercase">ACADEMIC REGISTRY & COMMISSION</span>
                      <h2 className="font-serif text-xl sm:text-2xl font-black tracking-tight text-[#2E221C]">
                        VBIT School of Coffee and Agribusiness
                      </h2>
                      <p className="text-xs text-gray-500 max-w-lg leading-relaxed">
                        TVET Registered Center for Advanced Sensory Analysis, Farm Management Cooperatives, & Espresso Engineering. Kenya National Framework Standards.
                      </p>
                    </div>
                    {/* Simulated Logo Emblem */}
                    <div className="h-20 w-20 rounded-2xl border-2 border-dashed border-[#C28A4E]/30 p-2.5 flex flex-col items-center justify-center text-center bg-[#FAF6F0] shrink-0 print-header-seal">
                      <Coffee className="h-6 w-6 text-[#C28A4E]" />
                      <span className="text-[8px] font-mono font-bold text-[#2E221C]/60 mt-1">VBIT SEAL</span>
                    </div>
                  </div>

                  {/* Program Meta Box */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 no-print-break">
                    {/* Course Title and Description Card (8 cols) */}
                    <div className="md:col-span-8 space-y-4">
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FAF6F0] border border-[#C28A4E]/20 text-[#C28A4E]">
                          {printCourse.category} Curriculum
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2E221C] mt-2 leading-tight">
                          {printCourse.title}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed text-justify">
                        {printCourse.description}
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                        <div className="bg-[#FAF6F0]/60 p-3 rounded-xl border border-[#2E221C]/5">
                          <span className="text-[9px] text-[#8E7C74] font-bold uppercase block tracking-wider">Level</span>
                          <strong className="text-[#2E221C] font-semibold">{printCourse.level}</strong>
                        </div>
                        <div className="bg-[#FAF6F0]/60 p-3 rounded-xl border border-[#2E221C]/5">
                          <span className="text-[9px] text-[#8E7C74] font-bold uppercase block tracking-wider">Duration</span>
                          <strong className="text-[#2E221C] font-semibold">{printCourse.duration}</strong>
                        </div>
                        <div className="bg-[#FAF6F0]/60 p-3 rounded-xl border border-[#2E221C]/5 col-span-2 sm:col-span-1">
                          <span className="text-[9px] text-[#8E7C74] font-bold uppercase block tracking-wider">Schedule Option</span>
                          <strong className="text-[#2E221C] font-semibold">{printCourse.schedule || 'Full-Time & Part-Time'}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Quick Registry Seal (4 cols) */}
                    <div className="md:col-span-4 bg-[#FAF6F0] border border-[#C28A4E]/15 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono font-bold text-[#8E7C74] tracking-wider block uppercase">Accredited Credential</span>
                        <div className="flex items-start space-x-2">
                          <Award className="h-5 w-5 text-[#C28A4E] shrink-0 mt-0.5" />
                          <p className="text-xs font-bold text-[#2E221C] leading-snug">
                            {printCourse.certification}
                          </p>
                        </div>
                      </div>
                      
                      <div className="border-t border-[#2E221C]/10 pt-3">
                        <span className="text-[8px] font-mono text-gray-400 block">Dossier ID:</span>
                        <span className="text-[10px] font-mono font-bold text-[#2E221C]">VBIT-D-2026-{printCourse.id.substring(0,6).toUpperCase()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Complete Curriculum Syllabus (Saves space in print) */}
                  <div className="border border-[#2E221C]/10 rounded-2xl p-5 sm:p-6 bg-white no-print-break space-y-3.5">
                    <div className="flex items-center space-x-2 border-b border-[#2E221C]/10 pb-2.5">
                      <BookOpen className="h-4.5 w-4.5 text-[#C28A4E]" />
                      <h4 className="font-serif text-sm font-bold text-[#2E221C]">Syllabus Module breakdown</h4>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      Graduates must complete the following mandatory course modules and demonstrate professional competencies inside practical labs to satisfy graduation standards:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {printCourse.syllabus.map((mod, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs">
                          <span className="h-4.5 w-4.5 rounded-full bg-[#FAF6F0] text-[#C28A4E] text-[10px] font-extrabold flex items-center justify-center border border-[#C28A4E]/15 shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-[#2E221C]/90 leading-tight">{mod}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tuition pricing table */}
                  <div className="border border-[#2E221C]/10 rounded-2xl p-5 sm:p-6 bg-[#FAF6F0]/40 no-print-break space-y-4">
                    <div className="flex items-center justify-between border-b border-[#2E221C]/10 pb-2.5">
                      <h4 className="font-serif text-sm font-bold text-[#2E221C]">Official Tuition & Fees Schedule</h4>
                      <span className="text-[10px] font-mono text-gray-500 uppercase">Currency: KSh (Kenyan Shilling)</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1.5 border-b border-[#2E221C]/5">
                        <span className="text-gray-600">Standard Tuition (Per Academic Term)</span>
                        <span className="font-mono font-semibold text-[#2E221C]">KSh {printCourse.fees.tuition.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-[#2E221C]/5">
                        <span className="text-gray-600">Laboratory Materials & Brewing Consumables Fee</span>
                        <span className="font-mono font-semibold text-[#2E221C]">KSh {printCourse.fees.labFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-[#2E221C]/5">
                        <span className="text-gray-600">Admission Registration & Intake Deposit (Non-refundable)</span>
                        <span className="font-mono font-semibold text-[#2E221C]">KSh {printCourse.fees.deposit.toLocaleString()}</span>
                      </div>
                      
                      {/* Total row */}
                      <div className="flex justify-between pt-3 text-sm font-extrabold border-t border-[#2E221C]/10">
                        <span className="font-serif text-[#2E221C]">Estimated Total Academic Investment</span>
                        <span className="font-mono text-[#2E221C] text-base">
                          KSh {(printCourse.fees.tuition + printCourse.fees.labFee + printCourse.fees.deposit).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footnotes & Signature Registry block */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#2E221C]/10 no-print-break">
                    {/* Simulated Signature Line */}
                    <div className="space-y-4">
                      <span className="text-[9px] font-mono text-gray-400 block uppercase">Registrar Official Attestation</span>
                      <div className="border-b border-[#2E221C]/30 h-10 w-48 relative">
                        {/* Stamp Placeholder in print */}
                        <div className="absolute right-0 -top-4 h-12 w-12 border border-[#C28A4E]/30 rounded-full flex items-center justify-center bg-[#FAF6F0]/50 text-[6px] font-bold text-[#C28A4E] rotate-12 uppercase print-header-seal print-text-dark">
                          VBIT REGISTRY
                        </div>
                      </div>
                      <div>
                        <strong className="text-xs text-[#2E221C] block">Dr. Kenneth Njeru, Ph.D.</strong>
                        <span className="text-[10px] text-gray-400 block">Director of Academic Affairs, VBIT</span>
                      </div>
                    </div>

                    {/* How to Apply Guidelines for Families/Partners */}
                    <div className="bg-white border border-[#2E221C]/10 rounded-2xl p-4.5 space-y-2 text-xs">
                      <strong className="font-serif text-xs font-bold text-[#2E221C] block">Enrollment Instructions</strong>
                      <ol className="list-decimal pl-4 text-[11px] text-gray-500 space-y-1.5">
                        <li>Visit the online admission portal or scan the QR code to fill the secure application form.</li>
                        <li>Submit your ID/Passport copy alongside a certified copy of your KCSE Certificate.</li>
                        <li>Remit the Intake Deposit of KSh {printCourse.fees.deposit.toLocaleString()} to lock in your lab bench slot.</li>
                      </ol>
                    </div>
                  </div>

                  {/* Aesthetic barcode & computer generated note */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100 text-[10px] text-gray-400 no-print-break">
                    <div>
                      <p>Computer-generated reference flyer. Valid for 2026 academic intakes.</p>
                      <p className="mt-0.5">© 2026 VBIT School of Coffee and Agribusiness.</p>
                    </div>
                    {/* Simulated barcode using flex divs of various widths */}
                    <div className="flex items-center space-x-3 bg-[#FAF6F0] p-1.5 rounded-lg border border-[#2E221C]/5 shrink-0">
                      <div className="flex space-x-[2px] h-8 bg-white px-2 py-1 items-center">
                        <div className="w-[1px] h-full bg-black"></div>
                        <div className="w-[3px] h-full bg-black"></div>
                        <div className="w-[1px] h-full bg-black"></div>
                        <div className="w-[2px] h-full bg-black"></div>
                        <div className="w-[1px] h-full bg-black"></div>
                        <div className="w-[1px] h-full bg-black"></div>
                        <div className="w-[4px] h-full bg-black"></div>
                        <div className="w-[1px] h-full bg-black"></div>
                        <div className="w-[2px] h-full bg-black"></div>
                        <div className="w-[1px] h-full bg-black"></div>
                        <div className="w-[3px] h-full bg-black"></div>
                      </div>
                      <span className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">VBIT-SECURE</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
