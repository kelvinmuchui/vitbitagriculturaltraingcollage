import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, X, Check, ArrowRight, BookOpen, Calculator, CheckCircle2, Calendar, Clock, AlertCircle, FileText, Phone } from 'lucide-react';
import { ENROLLMENT_STEPS } from '../data';
import { Course } from '../types';

// Import our real student and campus photos
import studentsBuilding from '../assets/images/students_building_1783338059168.jpg';
import studentsAccreditation from '../assets/images/students_accreditation_1783338111803.jpg';

import { downloadEnrollmentConfirmationForm } from '../utils/downloadForm';

interface AdmissionsViewProps {
  setView: (view: string) => void;
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  courses: Course[];
}

export default function AdmissionsView({ setView, selectedCourseId, setSelectedCourseId, courses }: AdmissionsViewProps) {
  // Application Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    nationalId: '',
    dateOfBirth: '',
    address: '',
    courseId: selectedCourseId || (courses[0]?.id || 'barista-skills'),
    priorExperience: 'none',
    academicGrade: 'C',
    parentName: '',
    parentPhone: '',
    parentRelationship: 'Father/Mother',
    motivation: ''
  });

  // Dedicated file slots
  const [enrollmentFormFile, setEnrollmentFormFile] = useState<File | null>(null);
  const [idPassportFile, setIdPassportFile] = useState<File | null>(null);
  const [kcseCertFile, setKcseCertFile] = useState<File | null>(null);

  // Keep state in sync with selectedCourseId if updated from outside
  useEffect(() => {
    if (selectedCourseId) {
      setFormData(prev => ({ ...prev, courseId: selectedCourseId }));
    }
  }, [selectedCourseId]);

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  
  // Interview Booking State inside Success flow
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [interviewBooked, setInterviewBooked] = useState(false);

  // Fee Calculator State
  const [calcCourseId, setCalcCourseId] = useState(selectedCourseId || (courses[0]?.id || 'barista-skills'));

  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedCalcCourse = courses.find(c => c.id === calcCourseId) || courses[0];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'courseId') {
      setSelectedCourseId(value);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const code = `VIBIT-2026-${randomNum}`;

    const totalUploadedCount = (enrollmentFormFile ? 1 : 0) + (idPassportFile ? 1 : 0) + (kcseCertFile ? 1 : 0) + uploadedFiles.length;

    // Create the new application object
    const newApp = {
      id: `app-${Date.now()}`,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      nationalId: formData.nationalId,
      dateOfBirth: formData.dateOfBirth,
      address: formData.address,
      parentName: formData.parentName,
      parentPhone: formData.parentPhone,
      parentRelationship: formData.parentRelationship,
      courseId: formData.courseId,
      courseName: courses.find(c => c.id === formData.courseId)?.title || formData.courseId,
      priorExperience: formData.priorExperience,
      academicGrade: formData.academicGrade,
      motivation: formData.motivation,
      status: 'Pending' as const,
      generatedCode: code,
      timestamp: new Date().toISOString(),
      filesCount: totalUploadedCount > 0 ? totalUploadedCount : 1,
      documentsUploaded: {
        enrollmentForm: enrollmentFormFile ? enrollmentFormFile.name : 'Attached',
        idPassport: idPassportFile ? idPassportFile.name : 'Attached',
        kcseCert: kcseCertFile ? kcseCertFile.name : 'Attached'
      }
    };

    // 1. Persist the new application in localStorage
    const currentAppsLocal = localStorage.getItem('vibit_applications');
    let appList = [];
    if (currentAppsLocal) {
      try { appList = JSON.parse(currentAppsLocal); } catch (err) {}
    }
    appList.push(newApp);
    localStorage.setItem('vibit_applications', JSON.stringify(appList));

    // 2. Log submission event to analytics
    const currentAnalyticsLocal = localStorage.getItem('vibit_analytics');
    let analyticsData = {
      pageViews: {},
      courseClicks: {},
      submissions: 0,
      submissionsByCourse: {},
      timeline: [],
      emailLog: []
    };
    if (currentAnalyticsLocal) {
      try { analyticsData = JSON.parse(currentAnalyticsLocal); } catch (err) {}
    }
    analyticsData.submissions = (analyticsData.submissions || 0) + 1;
    analyticsData.submissionsByCourse = analyticsData.submissionsByCourse || {};
    analyticsData.submissionsByCourse[formData.courseId] = (analyticsData.submissionsByCourse[formData.courseId] || 0) + 1;
    
    // update timeline entries
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    analyticsData.timeline = analyticsData.timeline || [];
    let todayEntry = analyticsData.timeline.find((t: any) => t.date === today);
    if (!todayEntry) {
      todayEntry = { date: today, views: 0, submissions: 0 };
      analyticsData.timeline.push(todayEntry);
    }
    todayEntry.submissions += 1;
    localStorage.setItem('vibit_analytics', JSON.stringify(analyticsData));

    // 3. Dispatch actual email notification via FormSubmit.co to registrar
    const targetEmail = "muchuikelvin423@gmail.com";
    const endpoint = `https://formsubmit.co/ajax/${targetEmail}`;
    const emailBody = {
      _subject: `New VIBIT Admission Application: ${newApp.fullName} (${newApp.generatedCode})`,
      _template: "table",
      fullName: newApp.fullName,
      email: newApp.email,
      phone: newApp.phone,
      nationalId: newApp.nationalId,
      dateOfBirth: newApp.dateOfBirth,
      parentName: newApp.parentName,
      parentPhone: newApp.parentPhone,
      parentRelationship: newApp.parentRelationship,
      courseId: newApp.courseId,
      courseName: newApp.courseName,
      priorExperience: newApp.priorExperience,
      academicGrade: newApp.academicGrade,
      motivation: newApp.motivation,
      applicationCode: newApp.generatedCode,
      submissionTime: new Date(newApp.timestamp).toLocaleString(),
    };

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(emailBody)
    })
    .then(res => res.json())
    .then(data => {
      const isSuccess = data.success === "true" || data.success === true;
      const freshAnalytics = localStorage.getItem('vibit_analytics');
      let freshData = freshAnalytics ? JSON.parse(freshAnalytics) : {};
      freshData.emailLog = freshData.emailLog || [];
      freshData.emailLog.push({
        id: `email-${Date.now()}`,
        to: targetEmail,
        subject: emailBody._subject,
        body: `Applicant ${newApp.fullName} registered for ${newApp.courseName}. Credentials successfully dispatched to ${targetEmail} via FormSubmit AJAX gateway.`,
        timestamp: new Date().toISOString(),
        status: isSuccess ? 'Sent' : 'Failed'
      });
      localStorage.setItem('vibit_analytics', JSON.stringify(freshData));
    })
    .catch(err => {
      console.error("Email forward failed", err);
      const freshAnalytics = localStorage.getItem('vibit_analytics');
      let freshData = freshAnalytics ? JSON.parse(freshAnalytics) : {};
      freshData.emailLog = freshData.emailLog || [];
      freshData.emailLog.push({
        id: `email-${Date.now()}`,
        to: targetEmail,
        subject: emailBody._subject,
        body: `Applicant ${newApp.fullName} registered for ${newApp.courseName}. Credentials failed to send: ${err.message}`,
        timestamp: new Date().toISOString(),
        status: 'Failed'
      });
      localStorage.setItem('vibit_analytics', JSON.stringify(freshData));
    });

    // Handle complete UI submission state
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
      setGeneratedCode(code);
    }, 1200);
  };

  const handleBookInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (interviewDate && interviewTime) {
      setInterviewBooked(true);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      courseId: courses[0]?.id || 'barista-level-3',
      priorExperience: 'none',
      academicGrade: 'C',
      motivation: ''
    });
    setUploadedFiles([]);
    setSubmissionSuccess(false);
    setGeneratedCode('');
    setInterviewDate('');
    setInterviewTime('');
    setInterviewBooked(false);
  };

  return (
    <div className="space-y-24 pb-20" id="admissions-view">
      
      {/* 1. HERO */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200/80 min-h-[420px] sm:min-h-[480px] flex items-center justify-center p-6 sm:p-12">
          {/* Background image without dark overlay */}
          <img 
            src={studentsAccreditation}
            alt="Apply Offline Banner" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            referrerPolicy="no-referrer"
          />
          
          {/* Frosted card for crisp text readability */}
          <motion.div 
            className="relative z-10 max-w-3xl mx-auto bg-white/95 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/60 shadow-2xl text-center space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center px-3 py-1 bg-[#C28A4E]/15 text-[#C28A4E] text-xs font-extrabold uppercase tracking-widest rounded-full border border-[#C28A4E]/30">
              Admissions Open
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#2E221C] leading-tight">
              Shape Your Future in <br />
              <span className="text-[#C28A4E]">Coffee & Agriscience</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xs sm:text-sm text-[#2E221C]/80 leading-relaxed font-medium">
              Submit your credentials through our streamlined digital registry. Discover our flexible installment schedules or use our dynamic Tuition Calculator to estimate budgets instantly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. TIMELINE STEPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <motion.div 
          className="text-center space-y-4 max-w-2xl mx-auto"
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Form Left (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl p-6 sm:p-12 shadow-xl min-h-[600px] flex flex-col justify-center overflow-hidden">
            
            <AnimatePresence mode="wait">
              {!submissionSuccess ? (
                <motion.form 
                  key="admission-form"
                  onSubmit={handleFormSubmit} 
                  className="space-y-8 w-full"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.35 }}
                >
                
                {/* Custom Elegant Step Progress Bar (Apple Design) */}
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Enrollment Portal</span>
                    <h2 className="font-serif text-2xl font-bold text-gray-900">Online Application Portal</h2>
                  </div>
                  <div className="hidden sm:flex items-center space-x-2">
                    <span className="h-5 w-5 rounded-full bg-gray-900 text-white flex items-center justify-center text-[10px] font-bold">1</span>
                    <span className="h-0.5 w-8 bg-gray-200" />
                    <span className="h-5 w-5 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-[10px] font-bold">2</span>
                    <span className="h-0.5 w-8 bg-gray-200" />
                    <span className="h-5 w-5 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-[10px] font-bold">3</span>
                  </div>
                </div>

                {/* Download Official College Enrollment Form Banner */}
                <div className="bg-gradient-to-r from-[#2E221C] via-[#3D2E26] to-[#2E221C] text-white p-6 rounded-2xl border border-[#C28A4E]/30 shadow-md space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-[#C28A4E] uppercase tracking-widest block">Step 1: Download Official Document</span>
                      <h3 className="font-serif text-lg font-bold text-white">VIBIT College Enrollment Confirmation Form</h3>
                      <p className="text-xs text-gray-300 leading-relaxed max-w-xl">
                        Download the official enrollment confirmation form. You can print, fill, and sign it, or auto-generate a pre-filled copy, then upload it in the attachments section below.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => downloadEnrollmentConfirmationForm({
                        fullName: formData.fullName,
                        email: formData.email,
                        phone: formData.phone,
                        courseName: courses.find(c => c.id === formData.courseId)?.title || formData.courseId,
                        nationalId: formData.nationalId,
                        dateOfBirth: formData.dateOfBirth,
                        address: formData.address,
                        parentName: formData.parentName,
                        parentPhone: formData.parentPhone
                      })}
                      className="px-5 py-3 bg-[#C28A4E] hover:bg-[#A4713C] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Download Enrollment Form</span>
                    </button>
                  </div>
                </div>

                {/* Section A: Student Information */}
                <div className="space-y-4">
                  <h3 className="font-serif text-base font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-[#C28A4E]"></span>
                    <span>1. Student Personal Information</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="fullName">Full Legal Name (as in ID/Passport) *</label>
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Samuel Mwangi"
                        className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 transition-all shadow-xs"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. samuel@gmail.com"
                        className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 transition-all shadow-xs"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +254 722 000 000"
                        className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 transition-all shadow-xs"
                        required
                      />
                    </div>

                    {/* National ID / Passport */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="nationalId">National ID / Passport Number *</label>
                      <input
                        type="text"
                        name="nationalId"
                        id="nationalId"
                        value={formData.nationalId}
                        onChange={handleInputChange}
                        placeholder="e.g. 34567890 or A1234567"
                        className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 transition-all shadow-xs"
                        required
                      />
                    </div>

                    {/* Date of Birth */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="dateOfBirth">Date of Birth *</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 transition-all shadow-xs"
                        required
                      />
                    </div>

                    {/* Permanent Address */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="address">Permanent Address / Town *</label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="e.g. P.O Box 123, Nyeri / Nairobi"
                        className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 transition-all shadow-xs"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Section B: Parent / Guardian Information */}
                <div className="space-y-4 pt-2">
                  <h3 className="font-serif text-base font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-[#C28A4E]"></span>
                    <span>2. Parent / Guardian Contact & Details</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {/* Parent Name */}
                    <div className="space-y-1.5 sm:col-span-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="parentName">Parent / Guardian Full Name *</label>
                      <input
                        type="text"
                        name="parentName"
                        id="parentName"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        placeholder="e.g. John Mwangi"
                        className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 transition-all shadow-xs"
                        required
                      />
                    </div>

                    {/* Parent Phone */}
                    <div className="space-y-1.5 sm:col-span-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="parentPhone">Parent / Guardian Phone Number *</label>
                      <input
                        type="tel"
                        name="parentPhone"
                        id="parentPhone"
                        value={formData.parentPhone}
                        onChange={handleInputChange}
                        placeholder="e.g. +254 711 222 333"
                        className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 transition-all shadow-xs"
                        required
                      />
                    </div>

                    {/* Relationship */}
                    <div className="space-y-1.5 sm:col-span-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="parentRelationship">Relationship *</label>
                      <select
                        name="parentRelationship"
                        id="parentRelationship"
                        value={formData.parentRelationship}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 transition-all shadow-xs font-medium"
                      >
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Legal Guardian">Legal Guardian</option>
                        <option value="Sponsor">Sponsor / Employer</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section C: Program & Academic Details */}
                <div className="space-y-4 pt-2">
                  <h3 className="font-serif text-base font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-[#C28A4E]"></span>
                    <span>3. Program & Academic Qualifications</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {/* Intended Program */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="courseId">Intended Program of Study *</label>
                      <select
                        name="courseId"
                        id="courseId"
                        value={formData.courseId}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 transition-all shadow-xs font-semibold"
                        required
                      >
                        {courses.map(course => (
                          <option key={course.id} value={course.id}>{course.title} ({course.duration})</option>
                        ))}
                      </select>
                    </div>

                    {/* Academic Grade */}
                    <div className="space-y-1.5 sm:col-span-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="academicGrade">KCSE or Equivalent Grade *</label>
                      <select
                        name="academicGrade"
                        id="academicGrade"
                        value={formData.academicGrade}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 transition-all shadow-xs"
                      >
                        <option value="A">Grade A / B (Honors Entry)</option>
                        <option value="C">Grade C (Standard Prerequisite Entry)</option>
                        <option value="D">Grade D / Below (Special Practical Entry)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Motivation Box */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="motivation">Academic Motivation Statement *</label>
                  <textarea
                    name="motivation"
                    id="motivation"
                    rows={3}
                    value={formData.motivation}
                    onChange={handleInputChange}
                    placeholder="Provide a brief paragraph (2-3 sentences) explaining why you want to join VIBIT College and what you aim to achieve after graduation."
                    className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 transition-all shadow-xs"
                    required
                  ></textarea>
                </div>

                {/* Section D: Required File Uploads (3 Dedicated Slots) */}
                <div className="space-y-4 pt-2">
                  <h3 className="font-serif text-base font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <span className="h-2 w-2 rounded-full bg-[#C28A4E]"></span>
                      <span>4. Mandatory Document Attachments</span>
                    </span>
                    <span className="text-[10px] text-gray-400 font-sans uppercase tracking-widest font-bold">PDF or High-Res Image</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    {/* Slot 1: Enrollment Form */}
                    <div className={`p-4 rounded-2xl border-2 border-dashed transition-all ${enrollmentFormFile ? 'border-emerald-500 bg-emerald-50/20' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-extrabold text-gray-900">1. Enrollment Form *</span>
                        {enrollmentFormFile ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <FileText className="h-4 w-4 text-[#C28A4E]" />
                        )}
                      </div>
                      <p className="text-[10px] text-gray-500 mb-3">Filled & Signed College Confirmation Form</p>
                      
                      {enrollmentFormFile ? (
                        <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-emerald-200 text-xs">
                          <span className="truncate max-w-[120px] font-medium text-emerald-800">{enrollmentFormFile.name}</span>
                          <button type="button" onClick={() => setEnrollmentFormFile(null)} className="text-rose-600 hover:text-rose-800 p-1">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <label className="block text-center py-2 px-3 bg-white border border-gray-200 hover:border-gray-900 rounded-xl text-xs font-bold text-gray-700 cursor-pointer transition-all shadow-xs">
                          Upload Form
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setEnrollmentFormFile(e.target.files[0]);
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    {/* Slot 2: National ID / Passport */}
                    <div className={`p-4 rounded-2xl border-2 border-dashed transition-all ${idPassportFile ? 'border-emerald-500 bg-emerald-50/20' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-extrabold text-gray-900">2. National ID / Passport *</span>
                        {idPassportFile ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <Upload className="h-4 w-4 text-[#C28A4E]" />
                        )}
                      </div>
                      <p className="text-[10px] text-gray-500 mb-3">Clear copy of ID card or Passport photo</p>
                      
                      {idPassportFile ? (
                        <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-emerald-200 text-xs">
                          <span className="truncate max-w-[120px] font-medium text-emerald-800">{idPassportFile.name}</span>
                          <button type="button" onClick={() => setIdPassportFile(null)} className="text-rose-600 hover:text-rose-800 p-1">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <label className="block text-center py-2 px-3 bg-white border border-gray-200 hover:border-gray-900 rounded-xl text-xs font-bold text-gray-700 cursor-pointer transition-all shadow-xs">
                          Upload ID / Passport
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setIdPassportFile(e.target.files[0]);
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    {/* Slot 3: KCSE Certificate or Slip */}
                    <div className={`p-4 rounded-2xl border-2 border-dashed transition-all ${kcseCertFile ? 'border-emerald-500 bg-emerald-50/20' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-extrabold text-gray-900">3. KCSE Cert / Result Slip *</span>
                        {kcseCertFile ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <BookOpen className="h-4 w-4 text-[#C28A4E]" />
                        )}
                      </div>
                      <p className="text-[10px] text-gray-500 mb-3">High school certificate or KCSE result slip</p>
                      
                      {kcseCertFile ? (
                        <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-emerald-200 text-xs">
                          <span className="truncate max-w-[120px] font-medium text-emerald-800">{kcseCertFile.name}</span>
                          <button type="button" onClick={() => setKcseCertFile(null)} className="text-rose-600 hover:text-rose-800 p-1">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <label className="block text-center py-2 px-3 bg-white border border-gray-200 hover:border-gray-900 rounded-xl text-xs font-bold text-gray-700 cursor-pointer transition-all shadow-xs">
                          Upload Result Slip
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setKcseCertFile(e.target.files[0]);
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                  </div>
                </div>

                {/* Submission button */}
                <button
                  type="submit"
                  id="submit-admissions-form"
                  disabled={isSubmitting || (!enrollmentFormFile && !idPassportFile && !kcseCertFile)}
                  className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                    (!enrollmentFormFile && !idPassportFile && !kcseCertFile)
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                      : 'bg-[#2E221C] hover:bg-[#110E0C] text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing Registrar Application Record...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Official Application Dossier</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
                
                {(!enrollmentFormFile || !idPassportFile || !kcseCertFile) && (
                  <div className="flex items-center space-x-2 text-[10px] text-amber-800 bg-amber-50 p-3.5 rounded-xl border border-amber-200">
                    <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                    <span>Please upload the 3 required document attachments above (Signed Enrollment Form, ID/Passport photo, and KCSE result slip) to complete submission.</span>
                  </div>
                )}

                </motion.form>
              ) : (
                /* Success Flow: Generated custom code + scheduler */
                <motion.div 
                  key="success-admissions"
                  className="space-y-8 text-center py-6 w-full"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.35 }}
                >
                <div className="bg-emerald-100 h-16 w-16 flex items-center justify-center rounded-full text-emerald-800 mx-auto border border-emerald-300">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl font-bold text-[#2E221C]">Application Successfully Logged!</h3>
                  <p className="text-xs text-[#2E221C]/70 max-w-md mx-auto">
                    Congratulations, your academic files are saved under our central registry. We have sent a comprehensive receipt copy to <strong>{formData.email}</strong>.
                  </p>
                </div>

                {/* Code Card */}
                <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#C28A4E]/30 inline-block min-w-[320px] max-w-full">
                  <span className="text-[10px] uppercase font-bold text-[#8E7C74] tracking-wider block">Your Academic Registry Code:</span>
                  <div className="font-mono text-xl sm:text-2xl font-black text-[#2E221C] tracking-widest mt-1">
                    {generatedCode}
                  </div>
                  <span className="text-[9px] text-[#C28A4E] block mt-1.5 font-semibold uppercase">Keep this code to schedule interviews</span>
                </div>

                {/* Interview Scheduler Block */}
                {!interviewBooked ? (
                  <div className="bg-white border border-[#2E221C]/15 rounded-2xl p-6 text-left space-y-5 max-w-md mx-auto mt-6">
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-[#C28A4E] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-sm text-[#2E221C]">Immediate Step: Book Oral Interview</h4>
                        <p className="text-[11px] text-[#2E221C]/70">Choose a convenient date below for a 15-minute passion review with our registrar board (Virtual/On-Campus).</p>
                      </div>
                    </div>

                    <form onSubmit={handleBookInterview} className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-[#2E221C] uppercase tracking-wider" htmlFor="interviewDate">Select Date</label>
                          <input
                            type="date"
                            name="interviewDate"
                            id="interviewDate"
                            value={interviewDate}
                            onChange={(e) => setInterviewDate(e.target.value)}
                            className="w-full bg-[#FAF6F0] border border-[#2E221C]/15 rounded-xl px-3 py-2 text-xs text-[#2E221C]"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-[#2E221C] uppercase tracking-wider" htmlFor="interviewTime">Select Time Slot</label>
                          <select
                            name="interviewTime"
                            id="interviewTime"
                            value={interviewTime}
                            onChange={(e) => setInterviewTime(e.target.value)}
                            className="w-full bg-[#FAF6F0] border border-[#2E221C]/15 rounded-xl px-3 py-2 text-xs text-[#2E221C]"
                            required
                          >
                            <option value="">-- Choose Slot --</option>
                            <option value="09:00 AM">09:00 AM (Morning)</option>
                            <option value="11:30 AM">11:30 AM (Mid-day)</option>
                            <option value="02:30 PM">02:30 PM (Afternoon)</option>
                            <option value="04:00 PM">04:00 PM (Late-day)</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        id="book-interview-btn"
                        className="w-full bg-[#2E221C] hover:bg-[#110E0C] text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer"
                      >
                        Book Selected Slot
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-emerald-800 space-y-2 max-w-md mx-auto mt-6">
                    <div className="font-bold text-sm flex items-center justify-center space-x-1.5">
                      <Check className="h-4.5 w-4.5" />
                      <span>Oral Interview Booked!</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      Your calendar is booked for <strong>{interviewDate}</strong> at <strong>{interviewTime}</strong>. An email invite containing the virtual video connection room or campus direction map was sent.
                    </p>
                  </div>
                )}

                <div className="pt-6">
                  <button
                    onClick={resetForm}
                    className="text-xs font-bold text-[#C28A4E] hover:text-[#A4713C] uppercase tracking-wider"
                  >
                    Submit Another Application
                  </button>
                </div>

                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Sidebar Info Right (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Visual Callout block */}
            <motion.div 
              className="bg-[#2E221C] text-[#FAF6F0] rounded-3xl overflow-hidden shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -4 }}
            >
              <div className="h-44 bg-gray-200">
                <img 
                  src={studentsBuilding} 
                  alt="Cupping Session"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="font-serif text-lg font-bold">Apply Offline On Campus</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  We welcome walk-in applications at our valley registry office. Our registrars will assist you to copy certificates and print credentials free of charge.
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
              <h3 className="font-serif text-base font-bold text-[#2E221C]">Admissions Support</h3>
              <p className="text-xs text-[#2E221C]/75">Need assistance selecting a course pathway or troubleshooting upload files?</p>
              
              <div className="flex items-center space-x-3 text-xs border-t border-[#2E221C]/5 pt-4">
                <div className="bg-[#C28A4E]/15 p-2.5 rounded-lg text-[#C28A4E]">
                  <Phone className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="font-bold text-[#2E221C]">+254 708 137992</div>
                  <div className="text-[10px] text-[#8E7C74]">info@vibitcollege.ac.ke</div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 4. TUITION CALCULATOR */}
      <section className="bg-[#FAF6F0]/50 py-24 border-y border-[#2E221C]/5" id="tuition-calculator-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <motion.div 
            className="text-center space-y-4 max-w-2xl mx-auto"
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
              Select any program below to instantly display tuition metrics, caution deposits, and installment schedules.
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
                className="w-full bg-[#FAF6F0] border border-[#2E221C]/15 rounded-xl px-4 py-3 text-xs text-[#2E221C] focus:border-[#C28A4E] transition-all cursor-pointer"
              >
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>

              <div className="bg-[#FAF6F0] rounded-xl p-4 border border-[#2E221C]/5 space-y-1 text-xs">
                <span className="font-bold text-[#2E221C] block">Fee Installment Rules:</span>
                <p className="text-[11px] text-[#2E221C]/75 leading-relaxed">
                  Long-term certifications can be settled in up to 4 installments per academic year. Caution deposit is refundable upon graduation or program exit.
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
                        <span className="text-gray-500 block">Initial Deposit (On Registration):</span>
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
