import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, X, Check, ArrowRight, BookOpen, Calculator, CheckCircle2, Calendar, Clock, AlertCircle, FileText, Phone } from 'lucide-react';
import { ENROLLMENT_STEPS } from '../data';
import { Course } from '../types';

// Import our real student and campus photos
import studentsBuilding from '../assets/images/students_building_1783338059168.jpeg';
import studentsAccreditation from '../assets/images/students_accreditation_1783338111803.jpeg';

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
    courseId: selectedCourseId || (courses[0]?.id || 'barista-level-3'),
    priorExperience: 'none',
    academicGrade: 'C',
    motivation: ''
  });

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
  const [calcCourseId, setCalcCourseId] = useState(selectedCourseId || (courses[0]?.id || 'barista-level-3'));

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

  // Drag and Drop files
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files) as File[];
    // filter only pdf or images
    const validFiles = files.filter(f => f.type === 'application/pdf' || f.type.startsWith('image/'));
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files) as File[];
      const validFiles = files.filter(f => f.type === 'application/pdf' || f.type.startsWith('image/'));
      setUploadedFiles(prev => [...prev, ...validFiles]);
    }
  };

  const removeFile = (idx: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const code = `VIBIT-2026-${randomNum}`;

    // Create the new application object
    const newApp = {
      id: `app-${Date.now()}`,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      courseId: formData.courseId,
      courseName: courses.find(c => c.id === formData.courseId)?.title || formData.courseId,
      priorExperience: formData.priorExperience,
      academicGrade: formData.academicGrade,
      motivation: formData.motivation,
      status: 'Pending' as const,
      generatedCode: code,
      timestamp: new Date().toISOString(),
      filesCount: uploadedFiles.length > 0 ? uploadedFiles.length : 1
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
      <section className="relative py-24 flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={studentsAccreditation}
            alt="Apply Offline Banner" 
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
            Admissions Open
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">
            Shape Your Future in <br />
            <span className="text-[#C28A4E]">Coffee & Agriscience</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-gray-300 leading-relaxed">
            Submit your credentials through our streamlined digital registry. Discover our flexible installment schedules or use our dynamic Tuition Calculator to estimate budgets instantly.
          </p>
        </motion.div>
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

                {/* Form Instructions */}
                <p className="text-xs text-gray-500 leading-relaxed bg-gray-50 border border-gray-100 p-4 rounded-xl">
                  <strong>Notice:</strong> Please fulfill all fields carefully. The admissions board uses these details for course placement, academic background vetting, and prerequisite check.
                </p>

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="fullName">Full Name (as in ID/Passport) *</label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Samuel Mwangi"
                      className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3.5 text-sm text-gray-900 transition-all shadow-xs"
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
                      placeholder="e.g. sam@gmail.com"
                      className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3.5 text-sm text-gray-900 transition-all shadow-xs"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="phone">Phone Number (Active) *</label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +254 722 000 000"
                      className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3.5 text-sm text-gray-900 transition-all shadow-xs"
                      required
                    />
                  </div>

                  {/* Intended Program */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="courseId">Intended Program of Study *</label>
                    <select
                      name="courseId"
                      id="courseId"
                      value={formData.courseId}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3.5 text-sm text-gray-900 transition-all shadow-xs"
                      required
                    >
                      {courses.map(course => (
                        <option key={course.id} value={course.id}>{course.title} ({course.duration})</option>
                      ))}
                    </select>
                  </div>

                  {/* Prior Experience */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="priorExperience">Prior Coffee/Agri Industry Experience *</label>
                    <select
                      name="priorExperience"
                      id="priorExperience"
                      value={formData.priorExperience}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3.5 text-sm text-gray-900 transition-all shadow-xs"
                    >
                      <option value="none">No prior experience (Beginner)</option>
                      <option value="some">Some experience (Barista / Farm Hand)</option>
                      <option value="pro">Experienced Professional (Roaster / Cooperative Manager)</option>
                    </select>
                  </div>

                  {/* Academic Grade */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="academicGrade">Secondary School Exam Grade (KCSE or Equivalent)</label>
                    <select
                      name="academicGrade"
                      id="academicGrade"
                      value={formData.academicGrade}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3.5 text-sm text-gray-900 transition-all shadow-xs"
                    >
                      <option value="A">Grade A / B (Honors Entry)</option>
                      <option value="C">Grade C (Standard Prerequisite Entry)</option>
                      <option value="D">Grade D / Below (Special Practical Entry)</option>
                    </select>
                  </div>
                </div>

                {/* Motivation Box */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="motivation">Academic Motivation Statement *</label>
                  <textarea
                    name="motivation"
                    id="motivation"
                    rows={4}
                    value={formData.motivation}
                    onChange={handleInputChange}
                    placeholder="Provide a brief paragraph (2-3 sentences) explaining why you want to join VIBIT and what you aim to achieve after your graduation."
                    className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3.5 text-sm text-gray-900 transition-all shadow-xs"
                    required
                  ></textarea>
                </div>

                {/* Drag-and-Drop File Zone */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Credentials Upload (ID Copy & Academic Certificates) *</label>
                  
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={triggerFileSelect}
                    className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
                      isDragOver
                        ? 'border-gray-900 bg-gray-50/50 scale-[0.99]'
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100/80'
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      className="hidden"
                      multiple
                      accept="image/*,application/pdf"
                    />
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                    <p className="text-xs font-bold text-gray-800">
                      Drag and drop your academic PDF files here, or <span className="text-[#b6171e] hover:underline">click to browse files</span>
                    </p>
                    <p className="text-[10px] text-gray-400 mt-2 font-medium">
                      Supports PDF and high-res Images. Required: Copy of national ID and High School results certificate.
                    </p>
                  </div>

                  {/* Uploaded Files List */}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2 mt-3">
                      <span className="text-[10px] uppercase font-bold text-gray-400">Attached Files ({uploadedFiles.length}):</span>
                      <ul className="space-y-2">
                        {uploadedFiles.map((file, idx) => (
                          <li key={idx} className="flex items-center justify-between bg-white border border-gray-150 p-3.5 rounded-xl text-xs shadow-xs">
                            <div className="flex items-center space-x-2.5">
                              <FileText className="h-4 w-4 text-gray-400 shrink-0" />
                              <span className="font-semibold text-gray-800 truncate max-w-xs">{file.name}</span>
                              <span className="text-[10px] text-gray-400">({(file.size / 1024).toFixed(1)} KB)</span>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                              className="text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg cursor-pointer transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Submission button */}
                <button
                  type="submit"
                  id="submit-admissions-form"
                  disabled={isSubmitting || uploadedFiles.length === 0}
                  className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                    uploadedFiles.length === 0 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing Registrar Record...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Official Application</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
                
                {uploadedFiles.length === 0 && (
                  <div className="flex items-center space-x-2 text-[10px] text-amber-800 bg-amber-50 p-3.5 rounded-xl border border-amber-200">
                    <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                    <span>Please attach at least one academic certificate or ID copy in the file zone to unlock form submission.</span>
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
                  <div className="text-[10px] text-[#8E7C74]">info@vibiagriculrturaltraningcollege.co.ke</div>
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
                      <span>Standard Tuition:</span>
                      <span className="font-semibold">KSh {selectedCalcCourse.fees.tuition.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-[#2E221C]/80">
                      <span>SCA Laboratory & Equipment fee:</span>
                      <span className="font-semibold">KSh {selectedCalcCourse.fees.labFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-[#2E221C]/80">
                      <span>Refundable Caution Deposit:</span>
                      <span className="font-semibold">KSh {selectedCalcCourse.fees.deposit.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center font-bold text-sm text-[#2E221C] border-t border-[#2E221C]/10 pt-3">
                      <span>Estimated Total:</span>
                      <span className="font-serif text-[#C28A4E] text-base font-extrabold">
                        KSh {(selectedCalcCourse.fees.tuition + selectedCalcCourse.fees.labFee + selectedCalcCourse.fees.deposit).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Installment Schedule */}
                  <div className="bg-[#FAF6F0] rounded-xl p-4 border border-[#C28A4E]/20 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-[#8E7C74] tracking-wider block">Quarterly Installment Schedule (4 Terms):</span>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div className="p-1.5 bg-white rounded border border-[#2E221C]/5">
                        <span className="text-gray-500 block">Term 1 (On Entry):</span>
                        <strong className="text-gray-800">
                          KSh {( (selectedCalcCourse.fees.tuition * 0.4) + selectedCalcCourse.fees.labFee + selectedCalcCourse.fees.deposit ).toLocaleString()}
                        </strong>
                      </div>
                      <div className="p-1.5 bg-white rounded border border-[#2E221C]/5">
                        <span className="text-gray-500 block">Term 2 (Month 3):</span>
                        <strong className="text-gray-800">
                          KSh {(selectedCalcCourse.fees.tuition * 0.2).toLocaleString()}
                        </strong>
                      </div>
                      <div className="p-1.5 bg-white rounded border border-[#2E221C]/5">
                        <span className="text-gray-500 block">Term 3 (Month 6):</span>
                        <strong className="text-gray-800">
                          KSh {(selectedCalcCourse.fees.tuition * 0.2).toLocaleString()}
                        </strong>
                      </div>
                      <div className="p-1.5 bg-white rounded border border-[#2E221C]/5">
                        <span className="text-gray-500 block">Term 4 (Month 9):</span>
                        <strong className="text-gray-800">
                          KSh {(selectedCalcCourse.fees.tuition * 0.2).toLocaleString()}
                        </strong>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
