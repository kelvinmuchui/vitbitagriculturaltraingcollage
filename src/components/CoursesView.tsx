import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Clock, Award, BookOpen, Calculator, CheckSquare, ArrowRight, X, ChevronDown, ChevronUp } from 'lucide-react';
import { COURSES } from '../data';
import { Course } from '../types';

// Import our real student and campus photos
import latteArtTable from '../assets/images/latte_art_table_1783338092054.jpeg';

interface CoursesViewProps {
  setView: (view: string) => void;
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
}

export default function CoursesView({ setView, selectedCourseId, setSelectedCourseId }: CoursesViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'diploma' | 'certificate' | 'short' | 'professional'>('all');
  const [expandedSyllabus, setExpandedSyllabus] = useState<Record<string, boolean>>({});

  // If a course was pre-selected (e.g. clicked from Home page), scroll or focus.
  useEffect(() => {
    if (selectedCourseId) {
      const element = document.getElementById(`course-card-${selectedCourseId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

  const filteredCourses = COURSES.filter((course) => {
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
    }, 100);
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

  return (
    <div className="space-y-20 pb-20" id="courses-view">
      
      {/* 1. HERO BANNER */}
      <section className="relative py-24 flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={latteArtTable}
            alt="VIBIT Laboratory Commons" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#110E0C]/85"></div>
        </div>

        <motion.div 
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center px-3 py-1 bg-[#C28A4E]/20 text-[#C28A4E] text-xs font-bold uppercase tracking-widest rounded-full border border-[#C28A4E]/30">
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

      {/* 2. DYNAMIC FILTER & SEARCH BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="bg-white border border-[#2E221C]/10 rounded-2xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          
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
                className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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

        </motion.div>
      </section>

      {/* 3. COURSES LISTING GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  className={`bg-white border rounded-2xl overflow-hidden shadow-sm flex flex-col h-full ${
                    isSelected ? 'ring-2 ring-[#C28A4E] border-transparent' : 'border-[#2E221C]/10'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                  whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)" }}
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
                      <div className="grid grid-cols-2 gap-3.5">
                        <button
                          id={`course-apply-btn-${course.id}`}
                          onClick={() => handleApplyClick(course.id)}
                          className="w-full bg-[#C28A4E] hover:bg-[#A4713C] text-white font-bold text-xs py-3 rounded-xl transition-all shadow-sm cursor-pointer text-center"
                        >
                          Apply Now
                        </button>
                        <button
                          id={`course-calc-btn-${course.id}`}
                          onClick={() => handleCalculatorClick(course.id)}
                          className="w-full bg-[#FAF6F0] hover:bg-[#2E221C]/5 text-[#2E221C] font-bold text-xs py-3 rounded-xl border border-[#2E221C]/10 transition-all flex items-center justify-center space-x-1.5 cursor-pointer text-center"
                        >
                          <Calculator className="h-3.5 w-3.5 text-[#8E7C74]" />
                          <span>Estimate Fees</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}
      </section>

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

    </div>
  );
}
