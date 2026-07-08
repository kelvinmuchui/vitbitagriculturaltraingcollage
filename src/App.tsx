import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import CoursesView from './components/CoursesView';
import AdmissionsView from './components/AdmissionsView';
import ContactView from './components/ContactView';

export default function App() {
  const [currentView, setView] = useState<string>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  // Smooth scroll to top when changing screens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          />
        );
      case 'admissions':
        return (
          <AdmissionsView 
            setView={setView} 
            selectedCourseId={selectedCourseId} 
            setSelectedCourseId={setSelectedCourseId} 
          />
        );
      case 'contact':
        return <ContactView />;
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
