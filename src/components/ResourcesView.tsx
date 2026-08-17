import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  ArrowRight, 
  Clock, 
  User, 
  ChevronRight, 
  Sparkles, 
  Share2, 
  CheckCircle2, 
  HelpCircle,
  Search,
  GraduationCap,
  TrendingUp,
  Award,
  PhoneCall
} from 'lucide-react';
import { AGRICULTURAL_RESOURCES, ResourceArticle } from '../resourcesData';

interface ResourcesViewProps {
  setView: (view: string) => void;
  setSelectedCourseId?: (id: string) => void;
}

export default function ResourcesView({ setView, setSelectedCourseId }: ResourcesViewProps) {
  const [selectedArticle, setSelectedArticle] = useState<ResourceArticle | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Courses Guide', 'Agribusiness', 'Careers & Jobs', 'Coffee & Barista', 'Admissions'];

  const filteredArticles = AGRICULTURAL_RESOURCES.filter(article => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleApplyCourse = (courseId: string) => {
    if (setSelectedCourseId) setSelectedCourseId(courseId);
    setView('admissions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewCourse = (courseId: string) => {
    if (setSelectedCourseId) setSelectedCourseId(courseId);
    setView('courses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FAF6F0] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-[#8E7C74] mb-8">
          <button 
            onClick={() => { setSelectedArticle(null); setView('home'); }}
            className="hover:text-[#2E221C] transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="h-4 w-4" />
          <button 
            onClick={() => setSelectedArticle(null)}
            className={`cursor-pointer ${!selectedArticle ? 'font-bold text-[#2E221C]' : 'hover:text-[#2E221C]'}`}
          >
            Agricultural Resources & Guides
          </button>
          {selectedArticle && (
            <>
              <ChevronRight className="h-4 w-4" />
              <span className="font-bold text-[#C28A4E] truncate max-w-[200px] sm:max-w-md">
                {selectedArticle.title}
              </span>
            </>
          )}
        </nav>

        {selectedArticle ? (
          /* =========================================================================
             SINGLE ARTICLE VIEW (Google-readable, high authority SEO landing page)
             ========================================================================= */
          <motion.article 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-10"
          >
            {/* Header / Meta */}
            <div className="space-y-4 border-b border-[#2E221C]/10 pb-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C28A4E]/15 text-[#9D6833]">
                  {selectedArticle.category}
                </span>
                <span className="flex items-center text-xs font-medium text-[#8E7C74]">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  {selectedArticle.readTime}
                </span>
                <span className="flex items-center text-xs font-medium text-[#8E7C74]">
                  <User className="h-3.5 w-3.5 mr-1" />
                  {selectedArticle.author}
                </span>
                <span className="text-xs text-[#8E7C74]">
                  • Updated {selectedArticle.publishedDate}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2E221C] tracking-tight leading-[1.15]">
                {selectedArticle.title}
              </h1>

              <p className="text-lg sm:text-xl text-[#2E221C]/80 leading-relaxed font-sans bg-white/70 p-5 rounded-2xl border border-[#2E221C]/5 shadow-xs">
                {selectedArticle.summary}
              </p>
            </div>

            {/* Main Content Sections */}
            <div className="space-y-10">
              {selectedArticle.content.map((sec, idx) => (
                <section key={idx} className="space-y-4">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E221C] tracking-tight flex items-center">
                    <span className="w-2 h-6 bg-[#C28A4E] rounded-full mr-3 shrink-0" />
                    {sec.sectionHeading}
                  </h2>
                  
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-[#2E221C]/85 text-base sm:text-lg leading-relaxed">
                      {p}
                    </p>
                  ))}

                  {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                    <div className="bg-white/80 rounded-2xl p-6 border border-[#2E221C]/10 shadow-xs space-y-3">
                      {sec.bulletPoints.map((bp, bpIdx) => (
                        <div key={bpIdx} className="flex items-start space-x-3">
                          <CheckCircle2 className="h-5 w-5 text-[#C28A4E] shrink-0 mt-0.5" />
                          <span className="text-[#2E221C]/90 text-base">{bp}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* High-Intent Conversion Funnel Box */}
            <div className="bg-gradient-to-br from-[#2E221C] via-[#3B2A22] to-[#1F1511] text-[#FAF6F0] rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
              <div className="flex items-center space-x-2 text-[#C28A4E]">
                <Sparkles className="h-5 w-5" />
                <span className="text-xs uppercase tracking-widest font-bold">VIBIT Next Step Enrollment</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                Start Your Agricultural & Coffee Career at VIBIT
              </h3>
              <p className="text-[#FAF6F0]/80 text-base sm:text-lg max-w-2xl">
                Ready to turn agricultural knowledge into a practical, high-earning career? Apply for the upcoming intake or chat directly with our admissions counselor in Westlands, Nairobi.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => handleApplyCourse(selectedArticle.relatedCourseId)}
                  className="bg-[#C28A4E] hover:bg-[#A4713C] text-white px-7 py-3.5 rounded-xl font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>Apply for This Course</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleViewCourse(selectedArticle.relatedCourseId)}
                  className="bg-white/10 hover:bg-white/20 text-[#FAF6F0] px-6 py-3.5 rounded-xl font-bold text-base transition-colors border border-white/20 cursor-pointer"
                >
                  View Course Details & Fees
                </button>
                <a
                  href="https://wa.me/254708137992?text=Hello%20VIBIT%2C%20I%20read%20your%20guide%20and%20would%20like%20more%20details%20on%20admissions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3.5 rounded-xl font-bold text-base shadow-md transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <PhoneCall className="h-5 w-5" />
                  <span>WhatsApp 0708 137992</span>
                </a>
              </div>
            </div>

            {/* Frequently Asked Questions (FAQ Schema Snippet) */}
            {selectedArticle.faqs && selectedArticle.faqs.length > 0 && (
              <div className="space-y-6 pt-6 border-t border-[#2E221C]/10">
                <h3 className="font-serif text-2xl font-bold text-[#2E221C] flex items-center">
                  <HelpCircle className="h-6 w-6 text-[#C28A4E] mr-2.5" />
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {selectedArticle.faqs.map((faq, fIdx) => (
                    <div key={fIdx} className="bg-white rounded-2xl p-6 border border-[#2E221C]/10 shadow-xs space-y-2">
                      <h4 className="font-bold text-lg text-[#2E221C]">{faq.question}</h4>
                      <p className="text-[#2E221C]/80 text-base leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Back to Guides */}
            <div className="pt-6">
              <button
                onClick={() => {
                  setSelectedArticle(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-2 text-[#2E221C] font-bold hover:text-[#C28A4E] transition-colors cursor-pointer"
              >
                <span>← Back to All Educational Resources</span>
              </button>
            </div>
          </motion.article>
        ) : (
          /* =========================================================================
             RESOURCES HUB INDEX (Browsing, Category Filters & Search)
             ========================================================================= */
          <div className="space-y-12">
            
            {/* Header & Hero */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-[#C28A4E]/15 text-[#9D6833] inline-block">
                Agricultural Knowledge & Career Hub
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#2E221C] tracking-tight">
                Agricultural Guides, Careers & Training in Kenya
              </h1>
              <p className="text-base sm:text-lg text-[#2E221C]/75 leading-relaxed">
                Expert insights, admission guides, and industry analyses designed to help prospective students, farmers, and agribusiness leaders excel.
              </p>
            </div>

            {/* Search & Category Tabs */}
            <div className="space-y-6">
              <div className="max-w-xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#8E7C74]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles (e.g., agribusiness, barista, requirements, careers)..."
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#2E221C]/15 rounded-2xl text-base text-[#2E221C] focus:outline-none focus:ring-2 focus:ring-[#C28A4E]/50 shadow-xs"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-[#2E221C] text-[#FAF6F0] shadow-sm'
                        : 'bg-white text-[#2E221C]/70 hover:bg-[#2E221C]/5 border border-[#2E221C]/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <motion.div
                  key={article.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => {
                    setSelectedArticle(article);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white rounded-3xl p-7 border border-[#2E221C]/10 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C28A4E]/10 text-[#9D6833]">
                        {article.category}
                      </span>
                      <span className="flex items-center text-xs text-[#8E7C74]">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {article.readTime}
                      </span>
                    </div>

                    <h2 className="font-serif text-xl font-bold text-[#2E221C] group-hover:text-[#C28A4E] transition-colors leading-snug">
                      {article.title}
                    </h2>

                    <p className="text-[#2E221C]/70 text-sm line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#2E221C]/10 flex items-center justify-between text-sm font-bold text-[#C28A4E] group-hover:text-[#A4713C]">
                    <span>Read Full Guide</span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Conversion Banner */}
            <div className="bg-[#FAF6F0] border-2 border-dashed border-[#C28A4E]/40 rounded-3xl p-8 sm:p-10 text-center space-y-4 max-w-4xl mx-auto">
              <GraduationCap className="h-10 w-10 text-[#C28A4E] mx-auto" />
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E221C]">
                Ready to Join VIBIT Agricultural Training College?
              </h3>
              <p className="text-[#2E221C]/80 max-w-xl mx-auto text-base">
                Discover our comprehensive TVET-accredited programs in Barista Skills, Agripreneurship, Coffee Roasting, and Cupping Technology.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <button
                  onClick={() => { setView('courses'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="bg-[#2E221C] hover:bg-[#3B2A22] text-[#FAF6F0] px-6 py-3 rounded-xl font-bold text-sm shadow-sm cursor-pointer"
                >
                  Explore All 9 Courses
                </button>
                <button
                  onClick={() => { setView('admissions'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="bg-[#C28A4E] hover:bg-[#A4713C] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm cursor-pointer"
                >
                  Admissions & Fees Structure
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
