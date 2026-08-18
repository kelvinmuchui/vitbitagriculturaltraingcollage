import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import CoursesView from './components/CoursesView';
import AdmissionsView from './components/AdmissionsView';
import StudentLifeView from './components/StudentLifeView';
import ContactView from './components/ContactView';
import ResourcesView from './components/ResourcesView';
import AdminView from './components/AdminView';
import CoffeeSchoolNairobiView from './components/CoffeeSchoolNairobiView';
import SEOHead from './components/SEOHead';
import { COURSES } from './data';
import { Course } from './types';

function parseViewFromLocation(): string {
  try {
    const pathname = window.location.pathname.toLowerCase().trim();
    const hash = window.location.hash.toLowerCase().trim().replace(/^#\/?/, '');
    const search = new URLSearchParams(window.location.search);
    const viewParam = (search.get('view') || search.get('page') || search.get('p') || '').toLowerCase().trim();

    if (viewParam) {
      if (viewParam === 'coffee-school-nairobi' || viewParam === 'coffee-school' || viewParam === 'coffee_school_nairobi' || viewParam === 'coffee-school-in-nairobi') {
        return 'coffee-school-nairobi';
      }
      if (viewParam === 'news-blog' || viewParam === 'news' || viewParam === 'blog') return 'resources';
      const valid = ['home', 'about', 'courses', 'admissions', 'student-life', 'resources', 'contact', 'coffee-school-nairobi', 'admin'];
      if (valid.includes(viewParam)) return viewParam;
    }

    if (hash) {
      if (hash === 'coffee-school-nairobi' || hash === 'coffee-school' || hash === 'coffee_school_nairobi' || hash === 'coffee-school-in-nairobi') {
        return 'coffee-school-nairobi';
      }
      if (hash === 'admin' || hash === '/admin') return 'admin';
      if (hash === 'news-blog' || hash === 'news' || hash === 'blog') return 'resources';
      const valid = ['home', 'about', 'courses', 'admissions', 'student-life', 'resources', 'contact', 'coffee-school-nairobi', 'admin'];
      if (valid.includes(hash)) return hash;
    }

    // Clean pathname
    const cleanPath = pathname.replace(/\/+$/, '').replace(/^\/+/, '');

    if (!cleanPath || cleanPath === '' || cleanPath === 'index.html') {
      return 'home';
    }

    if (
      cleanPath === 'coffee-school-nairobi' ||
      cleanPath === 'coffee-school' ||
      cleanPath === 'coffee_school_nairobi' ||
      cleanPath === 'coffee-school-in-nairobi' ||
      cleanPath.startsWith('coffee-school')
    ) {
      return 'coffee-school-nairobi';
    }

    if (cleanPath === 'admin') return 'admin';
    if (cleanPath === 'news-blog' || cleanPath === 'news' || cleanPath === 'blog') return 'resources';
    if (cleanPath === 'courses' || cleanPath.startsWith('courses')) return 'courses';
    if (cleanPath === 'about' || cleanPath === 'about-us') return 'about';
    if (cleanPath === 'admissions' || cleanPath === 'admission' || cleanPath === 'apply') return 'admissions';
    if (cleanPath === 'student-life' || cleanPath === 'studentlife') return 'student-life';
    if (cleanPath === 'resources') return 'resources';
    if (cleanPath === 'contact' || cleanPath === 'contact-us') return 'contact';

    const validViews = ['home', 'about', 'courses', 'admissions', 'student-life', 'resources', 'contact', 'coffee-school-nairobi', 'admin'];
    const match = validViews.find(v => cleanPath === v || cleanPath === `${v}.html`);
    return match || 'home';
  } catch (e) {
    console.error('Error parsing route:', e);
    return 'home';
  }
}

export default function App() {
  const [currentView, setRawView] = useState<string>(() => parseViewFromLocation());

  const setView = (view: string) => {
    let normalized = view;
    if (view === 'news-blog' || view === 'blog' || view === 'news') {
      normalized = 'resources';
    } else if (
      view === 'coffee-school' || 
      view === 'coffee_school_nairobi' || 
      view === 'coffee-school-in-nairobi'
    ) {
      normalized = 'coffee-school-nairobi';
    }
    
    setRawView(normalized);

    // Safely update browser address bar
    try {
      const targetPath = normalized === 'home' ? '/' : `/${normalized}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ view: normalized }, '', targetPath);
      }
    } catch (e) {
      // In restricted iframe environments, sync hash
      try {
        window.location.hash = normalized === 'home' ? '' : normalized;
      } catch (_) {}
    }
  };

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  // Stateful, persistent courses catalog loaded from LocalStorage
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('vibit_courses');
    if (saved) {
      try {
        const parsed: Course[] = JSON.parse(saved);
        // Verify saved courses match the official fee structure IDs
        if (parsed.some(c => c.id === 'barista-skills' || c.id === 'coffee-technology')) {
          return parsed;
        }
      } catch (e) { console.error(e); }
    }
    return COURSES;
  });

  const handleUpdateCourses = (newCourses: Course[]) => {
    setCourses(newCourses);
    localStorage.setItem('vibit_courses', JSON.stringify(newCourses));
  };

  const handleResetCourses = () => {
    if (confirm("Reset program catalog back to government TVET default standards?")) {
      setCourses(COURSES);
      localStorage.removeItem('vibit_courses');
    }
  };

  // Synchronize view state with browser address bar path / hash changes (e.g. Back/Forward)
  useEffect(() => {
    const handleLocationChange = () => {
      const parsed = parseViewFromLocation();
      setRawView(parsed);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    // Initial check
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Smooth scroll to top and record analytics telemetry when changing screens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Performance Log Record
    const saved = localStorage.getItem('vibit_analytics');
    let analyticsData = {
      pageViews: {} as Record<string, number>,
      courseClicks: {} as Record<string, number>,
      submissions: 3, // Default seed count
      submissionsByCourse: {} as Record<string, number>,
      timeline: [] as { date: string; views: number; submissions: number }[],
      emailLog: [] as any[]
    };
    if (saved) {
      try { analyticsData = JSON.parse(saved); } catch (e) { console.error(e); }
    }
    
    analyticsData.pageViews = analyticsData.pageViews || {};
    analyticsData.pageViews[currentView] = (analyticsData.pageViews[currentView] || 0) + 1;

    // Timeline page views counter
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    analyticsData.timeline = analyticsData.timeline || [];
    let todayEntry = analyticsData.timeline.find((t: any) => t.date === today);
    if (!todayEntry) {
      todayEntry = { date: today, views: 0, submissions: 0 };
      analyticsData.timeline.push(todayEntry);
    }
    todayEntry.views += 1;

    // limit timeline to last 14 entries
    if (analyticsData.timeline.length > 14) {
      analyticsData.timeline = analyticsData.timeline.slice(-14);
    }

    localStorage.setItem('vibit_analytics', JSON.stringify(analyticsData));
  }, [currentView]);

  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView setView={setView} setSelectedCourseId={setSelectedCourseId} />;
      case 'about':
        return <AboutView setView={setView} />;
      case 'courses':
        return (
          <CoursesView 
            setView={setView} 
            selectedCourseId={selectedCourseId} 
            setSelectedCourseId={setSelectedCourseId} 
            courses={courses}
          />
        );
      case 'admissions':
        return (
          <AdmissionsView 
            setView={setView} 
            selectedCourseId={selectedCourseId} 
            setSelectedCourseId={setSelectedCourseId} 
            courses={courses}
          />
        );
      case 'student-life':
        return <StudentLifeView setView={setView} />;
      case 'resources':
      case 'news-blog':
        return (
          <ResourcesView 
            setView={setView} 
            setSelectedCourseId={setSelectedCourseId} 
          />
        );
      case 'contact':
        return <ContactView setView={setView} />;
      case 'coffee-school-nairobi':
        return (
          <CoffeeSchoolNairobiView 
            setView={setView} 
            setSelectedCourseId={setSelectedCourseId} 
          />
        );
      case 'admin':
        return (
          <AdminView 
            courses={courses} 
            onUpdateCourses={handleUpdateCourses} 
            onResetCourses={handleResetCourses} 
          />
        );
      default:
        return <HomeView setView={setView} setSelectedCourseId={setSelectedCourseId} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF6F0]" id="app-root-container">
      <SEOHead currentView={currentView} />
      {/* Interactive Navigation */}
      <Navbar currentView={currentView} setView={setView} />
      
      {/* Main Viewport */}
      <main className="flex-grow overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer setView={setView} />
    </div>
  );
}
