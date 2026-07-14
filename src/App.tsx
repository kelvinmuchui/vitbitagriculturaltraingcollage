import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import CoursesView from './components/CoursesView';
import AdmissionsView from './components/AdmissionsView';
import ContactView from './components/ContactView';
import AdminView from './components/AdminView';
import { COURSES } from './data';
import { Course } from './types';

export default function App() {
  const [currentView, setView] = useState<string>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  // Stateful, persistent courses catalog loaded from LocalStorage
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('vibit_courses');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
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
      case 'contact':
        return <ContactView />;
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
