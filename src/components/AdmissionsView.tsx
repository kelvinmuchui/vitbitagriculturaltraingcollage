import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, MessageSquare, Sparkles, Calculator 
} from 'lucide-react';
import { ENROLLMENT_STEPS } from '../data';
import { Course } from '../types';

// Import our real student and campus photos
import studentsBuilding from '../assets/images/students_building_1783338059168.jpg';
import ApplicationForm from './ApplicationForm';

interface AdmissionsViewProps {
  setView: (view: string) => void;
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  courses: Course[];
}

export default function AdmissionsView({ setView, selectedCourseId, setSelectedCourseId, courses }: AdmissionsViewProps) {
  // Fee Calculator State
  const [calcCourseId, setCalcCourseId] = useState(selectedCourseId || (courses[0]?.id || 'barista-skills'));
  const selectedCalcCourse = courses.find(c => c.id === calcCourseId) || courses[0];

  return (
    <div className="space-y-20 pt-8 pb-20" id="admissions-view">
      
      {/* 1. ULTRA-SIMPLE APPLICATION HELP BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-50 via-emerald-50 to-amber-50 border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-white" />
                <span>Easiest Way to Apply • Rahisi Kabisa</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2E221C]">
                Apply in 1 Minute — No Papers Needed Today!
              </h2>
              <p className="text-xs sm:text-sm text-[#2E221C]/80 max-w-2xl leading-relaxed">
                You do NOT need scanned certificates or documents right now. Just enter your <strong>Name</strong> and <strong>Phone Number</strong> below or message us directly on WhatsApp. Our admissions officer will assist you immediately!
              </p>
            </div>
            
            {/* Quick Contact Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 w-full sm:w-auto">
              <a
                href={`https://wa.me/254708137992?text=${encodeURIComponent("Hello VIBIT College Admissions, I would like to apply for the ongoing intake. Please assist me.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Apply on WhatsApp</span>
              </a>
              <a
                href="tel:0708137992"
                className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 bg-[#2E221C] hover:bg-[#110E0C] text-white font-bold text-xs px-3.5 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
                title="Call Admissions line 1"
              >
                <Phone className="h-4 w-4 text-[#C28A4E]" />
                <span>0708 137992</span>
              </a>
              <a
                href="tel:0759065090"
                className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 bg-[#C28A4E] hover:bg-[#A9743B] text-white font-bold text-xs px-3.5 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
                title="Call Admissions line 2"
              >
                <Phone className="h-4 w-4 text-white" />
                <span>0759 065 090</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TIMELINE STEPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <motion.div 
          className="text-center space-y-3 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#C28A4E]">How to Enroll</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E221C]">
            Our 4-Step Academic Admissions Process
          </h2>
        </motion.div>

        {/* Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {ENROLLMENT_STEPS.map((step, idx) => (
            <motion.div 
              key={idx} 
              id={`timeline-step-${idx}`}
              className="bg-white border border-[#2E221C]/5 rounded-2xl p-6 shadow-sm relative h-full flex flex-col justify-between"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.05)" }}
            >
              <div className="space-y-4">
                <span className="font-serif text-4xl font-extrabold text-[#C28A4E]/30 block leading-none">{step.number}</span>
                <h3 className="font-serif text-base font-bold text-[#2E221C] leading-snug">{step.title}</h3>
                <p className="text-xs text-[#2E221C]/70 leading-relaxed">{step.description}</p>
              </div>
              <div className="text-[10px] text-[#8E7C74] font-semibold uppercase tracking-wider border-t border-[#2E221C]/5 pt-3 mt-4">
                {step.details}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. APPLICATION FORM & SIDEBAR INFO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="application-form-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Form Left (8 cols) */}
          <div className="lg:col-span-8">
            <ApplicationForm 
              courses={courses}
              selectedCourseId={selectedCourseId}
              setSelectedCourseId={setSelectedCourseId}
              setView={setView}
            />
          </div>

          {/* Sidebar Info Right (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Direct WhatsApp Callout */}
            <div className="bg-emerald-50 border border-emerald-300 rounded-3xl p-6 text-emerald-950 space-y-3 shadow-sm">
              <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm">
                <MessageSquare className="h-5 w-5 text-emerald-600" />
                <span>Talk to Admissions Today</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Have questions or need someone to fill the application for you? Message our admissions team directly on WhatsApp:
              </p>
              <a
                href={`https://wa.me/254708137992?text=${encodeURIComponent("Hello VIBIT College, please assist me with enrolling for a course.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat on WhatsApp (+254 708 137 992)</span>
              </a>
            </div>

            {/* Visual Callout block */}
            <motion.div 
              className="bg-[#2E221C] text-[#FAF6F0] rounded-3xl overflow-hidden shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -4 }}
            >
              <div className="h-40 bg-gray-200">
                <img 
                  src={studentsBuilding} 
                  alt="VIBIT College Campus"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="font-serif text-lg font-bold">Apply Offline On Campus</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  We welcome walk-in applications at our Westlands Nairobi registry office. Our friendly registrars will help you fill out forms and copy certificates free of charge.
                </p>
                <div className="text-[11px] text-[#C28A4E] font-semibold border-t border-white/10 pt-3">
                  Campus Hours: Mon - Fri, 8:00 AM - 4:00 PM
                </div>
              </div>
            </motion.div>

            {/* Helpline contact block */}
            <motion.div 
              className="bg-white border border-[#2E221C]/10 rounded-2xl p-6 shadow-sm space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="font-serif text-base font-bold text-[#2E221C]">Admissions Helpline</h3>
              <p className="text-xs text-[#2E221C]/75">Need assistance selecting a course pathway or understanding fees?</p>
              
              <div className="flex items-center space-x-3 text-xs border-t border-[#2E221C]/5 pt-4">
                <div className="bg-[#C28A4E]/15 p-2.5 rounded-lg text-[#C28A4E]">
                  <Phone className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="font-bold text-[#2E221C] flex flex-wrap items-center gap-x-1.5">
                    <a href="tel:0708137992" className="hover:underline">0708 137992</a>
                    <span>/</span>
                    <a href="tel:0759065090" className="hover:underline">0759 065 090</a>
                  </div>
                  <div className="text-[10px] text-[#8E7C74]">vbitschoolofcoffeagribusiness@gmail.com</div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 4. TUITION CALCULATOR */}
      <section className="bg-[#FAF6F0]/50 py-20 border-y border-[#2E221C]/5" id="tuition-calculator-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <motion.div 
            className="text-center space-y-3 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C28A4E]">Academic Budgets</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E221C]">
              Dynamic Tuition & Fee Calculator
            </h2>
            <p className="text-sm text-[#2E221C]/70">
              Select any program below to instantly display tuition metrics and installment schedules.
            </p>
          </motion.div>

          <div className="bg-white border border-[#2E221C]/15 rounded-3xl p-6 sm:p-10 shadow-lg max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            
            {/* Left Inputs (5 cols) */}
            <div className="md:col-span-5 space-y-4">
              <label className="text-xs font-bold text-[#2E221C] uppercase tracking-wider block" htmlFor="calcCourseId">Select Program Pathway:</label>
              <select
                id="calcCourseId"
                value={calcCourseId}
                onChange={(e) => setCalcCourseId(e.target.value)}
                className="w-full bg-[#FAF6F0] border border-[#2E221C]/15 rounded-xl px-4 py-3 text-xs text-[#2E221C] focus:border-[#C28A4E] transition-all cursor-pointer font-semibold"
              >
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>

              <div className="bg-[#FAF6F0] rounded-xl p-4 border border-[#2E221C]/5 space-y-1 text-xs">
                <span className="font-bold text-[#2E221C] block">Fee Installment Rules:</span>
                <p className="text-[11px] text-[#2E221C]/75 leading-relaxed">
                  Long-term certifications can be settled in flexible installments per term. All practical lab facilities and machines are covered in your tuition.
                </p>
              </div>
            </div>

            {/* Right Totals (7 cols) */}
            <div className="md:col-span-7 space-y-5 border-t md:border-t-0 md:border-l border-[#2E221C]/10 pt-6 md:pt-0 md:pl-8 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={calcCourseId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <h3 className="font-serif text-lg font-bold text-[#2E221C]">{selectedCalcCourse.title}</h3>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center text-[#2E221C]/80">
                      <span>Tuition Fees:</span>
                      <span className="font-semibold">KSh {selectedCalcCourse.fees.tuition.toLocaleString()}</span>
                    </div>
                    {selectedCalcCourse.fees.labFee > 0 && (
                      <div className="flex justify-between items-center text-[#2E221C]/80">
                        <span>Materials Fees:</span>
                        <span className="font-semibold">KSh {selectedCalcCourse.fees.labFee.toLocaleString()}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center font-bold text-sm text-[#2E221C] border-t border-[#2E221C]/10 pt-3">
                      <span>Total Course Fees:</span>
                      <span className="font-serif text-[#C28A4E] text-lg font-extrabold">
                        KSh {(selectedCalcCourse.fees.tuition + selectedCalcCourse.fees.labFee).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Installment Schedule */}
                  <div className="bg-[#FAF6F0] rounded-xl p-4 border border-[#C28A4E]/20 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-[#8E7C74] tracking-wider block">Suggested Installment Payment Structure:</span>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div className="p-2 bg-white rounded-lg border border-[#2E221C]/5">
                        <span className="text-gray-500 block">Initial Deposit:</span>
                        <strong className="text-gray-900 font-bold">
                          KSh {Math.round((selectedCalcCourse.fees.tuition + selectedCalcCourse.fees.labFee) * 0.5).toLocaleString()}
                        </strong>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-[#2E221C]/5">
                        <span className="text-gray-500 block">2nd Installment:</span>
                        <strong className="text-gray-900 font-bold">
                          KSh {Math.round((selectedCalcCourse.fees.tuition + selectedCalcCourse.fees.labFee) * 0.5).toLocaleString()}
                        </strong>
                      </div>
                    </div>
                    {selectedCalcCourse.schedule && (
                      <div className="bg-white rounded-lg p-2.5 border border-[#2E221C]/5 text-[10px] text-[#2E221C]/80">
                        <span className="text-[#C28A4E] font-bold block mb-0.5">Term Breakdown / Schedule:</span>
                        <span>{selectedCalcCourse.schedule}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Official Requirements & Attachment Policy */}
          <div className="mt-10 max-w-3xl mx-auto bg-amber-500/10 border border-[#C28A4E]/30 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-[#C28A4E] text-white rounded-lg font-bold text-xs uppercase tracking-wider">Official Requirements</span>
              <h4 className="font-serif font-bold text-[#2E221C] text-sm sm:text-base">Student Items & Additional Operational Fees</h4>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#2E221C]/85">
              <li className="flex items-start gap-2 bg-white/60 p-2.5 rounded-lg border border-[#2E221C]/5">
                <span className="text-[#C28A4E] font-bold">1.</span>
                <span><strong>TVET CDACC Exam Fees:</strong> Payable during booking of national examinations.</span>
              </li>
              <li className="flex items-start gap-2 bg-white/60 p-2.5 rounded-lg border border-[#2E221C]/5">
                <span className="text-[#C28A4E] font-bold">2.</span>
                <span><strong>Barista Uniform:</strong> 2 long-sleeved shirts for Baristas (Branding done in school).</span>
              </li>
              <li className="flex items-start gap-2 bg-white/60 p-2.5 rounded-lg border border-[#2E221C]/5">
                <span className="text-[#C28A4E] font-bold">3.</span>
                <span><strong>Mixology Uniform:</strong> Black Apron for Mixologists (Branding done in school).</span>
              </li>
              <li className="flex items-start gap-2 bg-white/60 p-2.5 rounded-lg border border-[#2E221C]/5">
                <span className="text-[#C28A4E] font-bold">4.</span>
                <span><strong>Farm Visits & Tours:</strong> Charges of KSh 5,000 for practical field trips.</span>
              </li>
              <li className="flex items-start gap-2 bg-white/60 p-2.5 rounded-lg border border-[#2E221C]/5">
                <span className="text-[#C28A4E] font-bold">5.</span>
                <span><strong>Stationery:</strong> One ream of printing papers & one ream of full scaps.</span>
              </li>
              <li className="flex items-start gap-2 bg-white/60 p-2.5 rounded-lg border border-[#2E221C]/5">
                <span className="text-[#C28A4E] font-bold">6.</span>
                <span><strong>Industrial Attachment:</strong> 3 Months Attachment program depending on course level.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
