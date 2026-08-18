import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  MapPin, 
  Coffee, 
  GraduationCap, 
  Award, 
  PhoneCall, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  MessageSquareQuote,
  ExternalLink
} from 'lucide-react';
import { OFFICIAL_FAQS } from '../data';
import { FAQItem } from '../types';

interface FAQSectionProps {
  setView?: (view: string) => void;
  title?: string;
  subtitle?: string;
  initialCategory?: string;
  limit?: number;
  showCategoryFilter?: boolean;
  className?: string;
}

export default function FAQSection({
  setView,
  title = "Official Questions & Answers",
  subtitle = "Accurate answers from VIBIT Agricultural Training College for prospective students, partners, and Google Business inquiries.",
  initialCategory = "all",
  limit,
  showCategoryFilter = true,
  className = ""
}: FAQSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-location': true,
    'faq-coffee-training': true,
    'faq-coffee-tech': true
  });

  const categories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle, count: OFFICIAL_FAQS.length },
    { id: 'location', label: 'Campus & Location', icon: MapPin, count: OFFICIAL_FAQS.filter(f => f.category === 'location').length },
    { id: 'courses', label: 'Coffee & Agri Courses', icon: Coffee, count: OFFICIAL_FAQS.filter(f => f.category === 'courses').length },
    { id: 'admissions', label: 'Admissions & Fees', icon: GraduationCap, count: OFFICIAL_FAQS.filter(f => f.category === 'admissions').length },
    { id: 'tvet', label: 'TVET & Credentials', icon: Award, count: OFFICIAL_FAQS.filter(f => f.category === 'tvet').length },
  ];

  const filteredFaqs = OFFICIAL_FAQS.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (faq.badge && faq.badge.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const displayedFaqs = limit ? filteredFaqs.slice(0, limit) : filteredFaqs;

  const toggleFaq = (id: string) => {
    setOpenIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    OFFICIAL_FAQS.forEach(f => { allOpen[f.id] = true; });
    setOpenIds(allOpen);
  };

  const collapseAll = () => {
    setOpenIds({});
  };

  return (
    <section className={`w-full py-16 sm:py-24 bg-[#FAF6F0] relative overflow-hidden ${className}`} id="official-qna-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#2E221C]/5 border border-[#2E221C]/10 text-xs font-extrabold uppercase tracking-wider text-[#C28A4E]">
            <Sparkles className="h-3.5 w-3.5 text-[#C28A4E]" />
            <span>Google Business Profile & Institution Q&A</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2E221C] tracking-tight">
            {title}
          </h2>
          
          <p className="text-sm sm:text-base text-[#8E7C74] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Search & Actions Bar */}
        <div className="bg-white border border-[#2E221C]/10 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <input
                type="text"
                id="faq-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g. coffee technology, TVET, location, fees)..."
                className="w-full bg-[#FAF6F0] border border-[#2E221C]/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#2E221C] placeholder-[#8E7C74]/70 focus:border-[#C28A4E] focus:bg-white focus:outline-none transition-all"
              />
              <Search className="h-4 w-4 text-[#8E7C74] absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-[#8E7C74] hover:text-[#2E221C]"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end text-xs font-semibold text-[#8E7C74]">
              <button
                onClick={expandAll}
                className="px-3 py-1.5 rounded-lg hover:bg-[#FAF6F0] hover:text-[#2E221C] transition-colors cursor-pointer"
              >
                Expand All
              </button>
              <span>•</span>
              <button
                onClick={collapseAll}
                className="px-3 py-1.5 rounded-lg hover:bg-[#FAF6F0] hover:text-[#2E221C] transition-colors cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Category Pills */}
          {showCategoryFilter && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#2E221C]/5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8E7C74] mr-1">Filter Topic:</span>
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    id={`faq-tab-${cat.id}`}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#2E221C] text-white shadow-xs'
                        : 'bg-[#FAF6F0] text-[#2E221C]/80 hover:bg-[#2E221C]/10 border border-[#2E221C]/10'
                    }`}
                  >
                    <Icon className={`h-3.5 w-3.5 ${isSelected ? 'text-[#C28A4E]' : 'text-[#8E7C74]'}`} />
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#2E221C]/5 text-[#8E7C74]'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Q&A Accordion List */}
        <div className="space-y-4">
          {displayedFaqs.length === 0 ? (
            <div className="bg-white border border-[#2E221C]/10 rounded-2xl p-10 text-center space-y-3">
              <HelpCircle className="h-10 w-10 text-[#8E7C74]/50 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-[#2E221C]">No matching questions found</h3>
              <p className="text-xs text-[#8E7C74]">
                Try searching for keywords like "barista", "roasting", "diploma", "Westlands", or "requirements".
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="mt-2 text-xs font-bold text-[#C28A4E] hover:underline"
              >
                Reset Search & Filters
              </button>
            </div>
          ) : (
            displayedFaqs.map((faq) => {
              const isOpen = !!openIds[faq.id];
              return (
                <div
                  key={faq.id}
                  id={faq.id}
                  className="bg-white border border-[#2E221C]/10 rounded-2xl overflow-hidden shadow-xs hover:border-[#C28A4E]/40 transition-colors"
                >
                  {/* Question Header */}
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-5 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1.5 pr-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#FAF6F0] text-[#C28A4E] border border-[#C28A4E]/20">
                          {faq.badge || 'Official Q&A'}
                        </span>
                        <span className="text-[10px] text-[#8E7C74] flex items-center space-x-1">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600 inline" />
                          <span>Verified by VIBIT Registrar</span>
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-base sm:text-lg text-[#2E221C] leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <div className={`p-2 rounded-xl transition-all duration-200 shrink-0 ${
                      isOpen ? 'bg-[#2E221C] text-white rotate-180' : 'bg-[#FAF6F0] text-[#2E221C] hover:bg-[#2E221C]/10'
                    }`}>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  {/* Answer Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-1 text-sm text-[#2E221C]/90 leading-relaxed border-t border-[#2E221C]/5 space-y-4">
                          <div className="flex items-start space-x-3 pt-2">
                            <div className="w-1.5 h-full min-h-[36px] bg-[#C28A4E] rounded-full shrink-0 mt-0.5" />
                            <p className="text-xs sm:text-sm text-[#2E221C]/85 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>

                          {/* Quick Action Links inside Answer */}
                          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                            {faq.id === 'faq-location' && (
                              <a
                                href="https://maps.google.com/?q=Leomar+Court+45+Westlands+Road+Nairobi"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center space-x-1.5 text-[#C28A4E] font-bold hover:underline"
                              >
                                <MapPin className="h-3.5 w-3.5" />
                                <span>Open in Google Maps</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}

                            {(faq.id === 'faq-coffee-training' || faq.id === 'faq-coffee-tech' || faq.id === 'faq-agri-courses' || faq.id === 'faq-short-courses' || faq.id === 'faq-tvet-programmes') && setView && (
                              <button
                                onClick={() => {
                                  setView('courses');
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="inline-flex items-center space-x-1.5 text-[#C28A4E] font-bold hover:underline cursor-pointer"
                              >
                                <Coffee className="h-3.5 w-3.5" />
                                <span>Explore Related Courses & Syllabus</span>
                                <ArrowRight className="h-3 w-3" />
                              </button>
                            )}

                            {(faq.id === 'faq-how-to-apply' || faq.id === 'faq-entry-requirements' || faq.id === 'faq-fee-installments') && setView && (
                              <button
                                onClick={() => {
                                  setView('admissions');
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="inline-flex items-center space-x-1.5 text-[#C28A4E] font-bold hover:underline cursor-pointer"
                              >
                                <GraduationCap className="h-3.5 w-3.5" />
                                <span>Go to Admissions & Fee Portal</span>
                                <ArrowRight className="h-3 w-3" />
                              </button>
                            )}

                            <a
                              href="https://wa.me/254708137992?text=Hello%20VIBIT%20Admissions,%20I%20have%20a%20question%20regarding%20courses"
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center space-x-1.5 text-[#8E7C74] hover:text-[#2E221C] font-semibold ml-auto"
                            >
                              <PhoneCall className="h-3 w-3 text-emerald-600" />
                              <span>Ask on WhatsApp: 0708 137992</span>
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Help Desk Card */}
        <div className="bg-[#2E221C] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 text-[#C28A4E] text-xs font-extrabold uppercase tracking-wider">
              <MessageSquareQuote className="h-4 w-4" />
              <span>Have Another Question?</span>
            </div>
            <h4 className="font-serif text-lg sm:text-xl font-bold">
              Our Admissions & Academic Team is Here to Assist
            </h4>
            <p className="text-xs text-white/80 max-w-xl">
              Get personalized guidance on course fees, intake dates, prerequisite certificates, or scheduling a visit to our Westlands labs.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            {setView && (
              <button
                onClick={() => {
                  setView('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#C28A4E] hover:bg-[#A9743B] text-white text-xs font-bold px-5 py-3 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Contact Admissions
              </button>
            )}
            <a
              href="tel:+254708137992"
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-5 py-3 rounded-xl border border-white/20 transition-all flex items-center space-x-2"
            >
              <PhoneCall className="h-3.5 w-3.5 text-[#C28A4E]" />
              <span>Call: 0708 137992</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
