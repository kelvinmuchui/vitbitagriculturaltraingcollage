import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, X, Check, ArrowRight, BookOpen, CheckCircle2, 
  Calendar, AlertCircle, FileText, Phone, MessageSquare, 
  Sparkles, Zap, ShieldCheck, HelpCircle 
} from 'lucide-react';
import { Course } from '../types';
import { downloadEnrollmentConfirmationForm } from '../utils/downloadForm';

interface ApplicationFormProps {
  courses: Course[];
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  setView: (view: string) => void;
}

export default function ApplicationForm({
  courses,
  selectedCourseId,
  setSelectedCourseId,
  setView
}: ApplicationFormProps) {
  // Mode selection: Quick 1-Minute Apply (default) vs Full Form
  const [applyMode, setApplyMode] = useState<'quick' | 'full'>('quick');

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

  // Optional file uploads
  const [enrollmentFormFile, setEnrollmentFormFile] = useState<File | null>(null);
  const [idPassportFile, setIdPassportFile] = useState<File | null>(null);
  const [kcseCertFile, setKcseCertFile] = useState<File | null>(null);

  // Submission and Interview states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [interviewBooked, setInterviewBooked] = useState(false);

  // Sync when selectedCourseId changes from outside (e.g. from catalog)
  useEffect(() => {
    if (selectedCourseId) {
      setFormData(prev => ({ ...prev, courseId: selectedCourseId }));
    }
  }, [selectedCourseId]);

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
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      return;
    }
    setIsSubmitting(true);

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const code = `VIBIT-2026-${randomNum}`;

    const totalUploadedCount = (enrollmentFormFile ? 1 : 0) + (idPassportFile ? 1 : 0) + (kcseCertFile ? 1 : 0);

    const selCourse = courses.find(c => c.id === formData.courseId) || courses[0];

    // Create the new application object (safe with optional inputs)
    const newApp = {
      id: `app-${Date.now()}`,
      fullName: formData.fullName.trim(),
      email: formData.email.trim() || 'Not provided (Contact via Phone/WhatsApp)',
      phone: formData.phone.trim(),
      nationalId: formData.nationalId.trim() || 'To provide on campus',
      dateOfBirth: formData.dateOfBirth || 'Not specified',
      address: formData.address.trim() || 'Kenya',
      parentName: formData.parentName.trim() || 'Not specified',
      parentPhone: formData.parentPhone.trim() || 'Not specified',
      parentRelationship: formData.parentRelationship || 'Not specified',
      courseId: formData.courseId,
      courseName: selCourse?.title || formData.courseId,
      priorExperience: formData.priorExperience || 'none',
      academicGrade: formData.academicGrade || 'Open Practical',
      motivation: formData.motivation.trim() || 'Direct enrollment applicant',
      status: 'Pending' as const,
      generatedCode: code,
      timestamp: new Date().toISOString(),
      filesCount: totalUploadedCount,
      documentsUploaded: {
        enrollmentForm: enrollmentFormFile ? enrollmentFormFile.name : 'Physical copy on orientation',
        idPassport: idPassportFile ? idPassportFile.name : 'Physical copy on orientation',
        kcseCert: kcseCertFile ? kcseCertFile.name : 'Physical copy on orientation'
      }
    };

    // 1. Persist to localStorage
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
    
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    analyticsData.timeline = analyticsData.timeline || [];
    let todayEntry = analyticsData.timeline.find((t: any) => t.date === today);
    if (!todayEntry) {
      todayEntry = { date: today, views: 0, submissions: 0 };
      analyticsData.timeline.push(todayEntry);
    }
    todayEntry.submissions += 1;
    localStorage.setItem('vibit_analytics', JSON.stringify(analyticsData));

    // 3. Dispatch actual email notification via FormSubmit.co
    const targetEmail = "vbitschoolofcoffeagribusiness@gmail.com";
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
        body: `Applicant ${newApp.fullName} registered for ${newApp.courseName}. Application code: ${newApp.generatedCode}.`,
        timestamp: new Date().toISOString(),
        status: isSuccess ? 'Sent' : 'Failed'
      });
      localStorage.setItem('vibit_analytics', JSON.stringify(freshData));
    })
    .catch(err => {
      console.error("Email notification failed", err);
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
      setGeneratedCode(code);
    }, 1100);
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
      nationalId: '',
      dateOfBirth: '',
      address: '',
      courseId: courses[0]?.id || 'barista-skills',
      priorExperience: 'none',
      academicGrade: 'C',
      parentName: '',
      parentPhone: '',
      parentRelationship: 'Father/Mother',
      motivation: ''
    });
    setEnrollmentFormFile(null);
    setIdPassportFile(null);
    setKcseCertFile(null);
    setSubmissionSuccess(false);
    setGeneratedCode('');
    setInterviewDate('');
    setInterviewTime('');
    setInterviewBooked(false);
  };

  const currentCourse = courses.find(c => c.id === formData.courseId) || courses[0];

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-xl min-h-[550px] flex flex-col justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {!submissionSuccess ? (
          <motion.form 
            key="admission-form"
            onSubmit={handleFormSubmit} 
            className="space-y-7 w-full"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            transition={{ duration: 0.35 }}
          >
            {/* Form Mode Selector: Quick 1-Minute Apply vs Detailed Form */}
            <div className="space-y-3 pb-2 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#C28A4E] uppercase tracking-widest block">Direct Admissions Desk</span>
                  <h2 className="font-serif text-2xl font-bold text-gray-900">Choose How You Want to Apply</h2>
                </div>
                <span className="inline-flex items-center text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse mr-1.5" />
                  Ongoing Intake Open
                </span>
              </div>

              {/* Mode Switcher Buttons */}
              <div className="bg-[#FAF6F0] p-1.5 rounded-2xl border border-[#2E221C]/10 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                <button
                  type="button"
                  id="tab-quick-apply"
                  onClick={() => setApplyMode('quick')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                    applyMode === 'quick'
                      ? 'bg-white text-emerald-900 shadow-sm border border-emerald-300'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Zap className="h-4 w-4 text-emerald-600" />
                  <span>⚡ 1-Minute Quick Apply (Rahisi Kabisa)</span>
                </button>
                <button
                  type="button"
                  id="tab-full-apply"
                  onClick={() => setApplyMode('full')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                    applyMode === 'full'
                      ? 'bg-white text-[#2E221C] shadow-sm border border-[#C28A4E]/30'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FileText className="h-4 w-4 text-[#C28A4E]" />
                  <span>📋 Detailed Academic Form</span>
                </button>
              </div>
            </div>

            {/* MODE A: 1-MINUTE QUICK APPLY (SUPER SIMPLE) */}
            {applyMode === 'quick' ? (
              <div className="space-y-6">
                <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-4.5 flex items-start space-x-3 text-emerald-950 text-xs">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm font-bold text-emerald-950">Simple 3-Step Enrollment / Maombi Rahisi</strong>
                    <p className="text-emerald-800 text-xs mt-0.5 leading-relaxed">
                      Hakuna haja ya vyeti sasa! Enter your name and phone number below. Our admissions officer will call or WhatsApp you directly to confirm your spot.
                    </p>
                  </div>
                </div>

                {/* 1. Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center justify-between" htmlFor="quickFullName">
                    <span>1. Your Full Name (Jina Lako Kamili) *</span>
                    <span className="text-[10px] text-emerald-700 font-bold uppercase">Required</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="quickFullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. John Mwangi or Mary Chebet"
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-emerald-600 focus:bg-white rounded-xl px-4 py-3.5 text-base text-gray-900 transition-all font-medium"
                    required
                  />
                </div>

                {/* 2. Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center justify-between" htmlFor="quickPhone">
                    <span>2. Phone Number (Nambari ya Simu - WhatsApp / M-Pesa) *</span>
                    <span className="text-[10px] text-emerald-700 font-bold uppercase">Required</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="quickPhone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 0712 345 678"
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-emerald-600 focus:bg-white rounded-xl px-4 py-3.5 text-base text-gray-900 transition-all font-medium"
                    required
                  />
                </div>

                {/* 3. Program Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center justify-between" htmlFor="quickCourseId">
                    <span>3. Choose Your Program (Chagua Kozi Unayotaka) *</span>
                    <span className="text-[10px] text-emerald-700 font-bold uppercase">Required</span>
                  </label>
                  <select
                    name="courseId"
                    id="quickCourseId"
                    value={formData.courseId}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-emerald-600 focus:bg-white rounded-xl px-4 py-3.5 text-sm sm:text-base text-gray-900 transition-all font-bold cursor-pointer"
                    required
                  >
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>
                        {course.title} — ({course.duration}) — KSh {(course.fees.tuition + course.fees.labFee).toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Program Summary Card */}
                {currentCourse && (
                  <div className="bg-[#FAF6F0] rounded-2xl p-4.5 border border-[#C28A4E]/30 space-y-2 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 font-bold text-sm text-[#2E221C]">
                      <span>{currentCourse.title}</span>
                      <span className="text-[#C28A4E] font-black text-base">
                        Tuition: KSh {(currentCourse.fees.tuition + currentCourse.fees.labFee).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#2E221C]/80 leading-relaxed">
                      {currentCourse.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1 text-[10px] font-semibold text-[#8E7C74]">
                      <span className="bg-white px-2.5 py-1 rounded-md border border-[#2E221C]/10">⏳ Duration: {currentCourse.duration}</span>
                      <span className="bg-white px-2.5 py-1 rounded-md border border-[#2E221C]/10">🎓 Award: {currentCourse.level}</span>
                      <span className="bg-white px-2.5 py-1 rounded-md border border-[#2E221C]/10">📅 Next Cohort: Ongoing</span>
                    </div>
                  </div>
                )}

                {/* 4. Town / Location (Optional) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center justify-between" htmlFor="quickAddress">
                    <span>4. Your Town or Area (Mahali Unapoishi) - Optional</span>
                    <span className="text-[10px] text-gray-400 font-normal lowercase">optional</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="quickAddress"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="e.g. Nairobi, Kiambu, Nyeri, Nakuru, Machakos, Eldoret..."
                    className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 transition-all font-medium"
                  />
                </div>

                {/* Big Action Submit Button */}
                <div className="space-y-3 pt-3">
                  <button
                    type="submit"
                    id="submit-quick-application"
                    disabled={isSubmitting || !formData.fullName.trim() || !formData.phone.trim()}
                    className={`w-full py-4 rounded-xl font-black text-base tracking-wide shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                      (!formData.fullName.trim() || !formData.phone.trim())
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting Your Application...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Submit My Application (Tuma Maombi)</span>
                        <ArrowRight className="h-5 w-5 ml-1" />
                      </>
                    )}
                  </button>

                  {/* Instant WhatsApp Action Link */}
                  <a
                    href={`https://wa.me/254708137992?text=${encodeURIComponent(
                      `Hello VIBIT College Admissions, my name is ${formData.fullName || '[My Name]'} and my phone number is ${formData.phone || '[My Phone]'}. I would like to apply for ${currentCourse?.title || 'admission'}. Please assist me with enrollment.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-white hover:bg-gray-50 text-emerald-700 font-bold text-xs rounded-xl border-2 border-emerald-600/30 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
                  >
                    <MessageSquare className="h-4 w-4 text-emerald-600" />
                    <span>Prefer WhatsApp? Click to Apply via WhatsApp (+254 708 137 992)</span>
                  </a>
                </div>

                {/* Reassurance Footer */}
                <div className="text-center pt-2">
                  <p className="text-[11px] text-gray-500">
                    🔒 100% Free Application • No documents required today • Admissions desk will contact you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setApplyMode('full')}
                    className="mt-3 text-xs font-bold text-[#C28A4E] hover:text-[#A4713C] underline cursor-pointer"
                  >
                    Want to enter complete academic details or attach documents? Switch to Full Form.
                  </button>
                </div>
              </div>
            ) : (
              /* MODE B: DETAILED TVET ACADEMIC FORM */
              <div className="space-y-8">
                
                {/* Back to Quick mode hint */}
                <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900">
                  <span>Looking for the simple 3-field application?</span>
                  <button
                    type="button"
                    onClick={() => setApplyMode('quick')}
                    className="font-bold text-emerald-700 hover:underline flex items-center space-x-1 cursor-pointer"
                  >
                    <Zap className="h-3.5 w-3.5" />
                    <span>Switch to 1-Minute Apply</span>
                  </button>
                </div>

                {/* Download Official College Enrollment Form Banner */}
                <div className="bg-gradient-to-r from-[#2E221C] via-[#3D2E26] to-[#2E221C] text-white p-6 rounded-2xl border border-[#C28A4E]/30 shadow-md space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-[#C28A4E] uppercase tracking-widest block">Optional Document</span>
                      <h3 className="font-serif text-lg font-bold text-white">VIBIT College Enrollment Confirmation Form</h3>
                      <p className="text-xs text-gray-300 leading-relaxed max-w-xl">
                        You can generate a pre-filled confirmation form for your personal records, or print and bring it on orientation day.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => downloadEnrollmentConfirmationForm({
                        fullName: formData.fullName,
                        email: formData.email,
                        phone: formData.phone,
                        courseName: currentCourse?.title || formData.courseId,
                        nationalId: formData.nationalId,
                        dateOfBirth: formData.dateOfBirth,
                        address: formData.address,
                        parentName: formData.parentName,
                        parentPhone: formData.parentPhone
                      })}
                      className="px-5 py-3 bg-[#C28A4E] hover:bg-[#A4713C] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Download Form</span>
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
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="fullName">Full Legal Name *</label>
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

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="phone">Phone Number (WhatsApp / M-Pesa) *</label>
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

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="email">Email Address (Optional)</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. samuel@gmail.com"
                        className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 transition-all shadow-xs"
                      />
                    </div>

                    {/* National ID / Birth Cert */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="nationalId">National ID / Birth Cert (Optional)</label>
                      <input
                        type="text"
                        name="nationalId"
                        id="nationalId"
                        value={formData.nationalId}
                        onChange={handleInputChange}
                        placeholder="e.g. 34567890"
                        className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 transition-all shadow-xs"
                      />
                    </div>

                    {/* Date of Birth */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="dateOfBirth">Date of Birth (Optional)</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 transition-all shadow-xs"
                      />
                    </div>

                    {/* Address */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="address">Town / County (Optional)</label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="e.g. Nairobi, Kiambu, Nyeri..."
                        className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 transition-all shadow-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Section B: Next of Kin */}
                <div className="space-y-4">
                  <h3 className="font-serif text-base font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-[#C28A4E]"></span>
                    <span>2. Emergency Contact / Guardian (Optional)</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="space-y-1.5 sm:col-span-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="parentName">Guardian Name</label>
                      <input
                        type="text"
                        name="parentName"
                        id="parentName"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        placeholder="e.g. Grace Mwangi"
                        className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 transition-all shadow-xs font-medium"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="parentPhone">Guardian Phone</label>
                      <input
                        type="tel"
                        name="parentPhone"
                        id="parentPhone"
                        value={formData.parentPhone}
                        onChange={handleInputChange}
                        placeholder="e.g. +254 722 000 000"
                        className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 transition-all shadow-xs font-medium"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="parentRelationship">Relationship</label>
                      <select
                        name="parentRelationship"
                        id="parentRelationship"
                        value={formData.parentRelationship}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 transition-all shadow-xs font-medium cursor-pointer"
                      >
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Legal Guardian">Legal Guardian</option>
                        <option value="Sponsor">Sponsor / Employer</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section C: Program Selection */}
                <div className="space-y-4 pt-2">
                  <h3 className="font-serif text-base font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-[#C28A4E]"></span>
                    <span>3. Program Selection</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="fullCourseId">Program of Study *</label>
                      <select
                        name="courseId"
                        id="fullCourseId"
                        value={formData.courseId}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 transition-all shadow-xs font-semibold cursor-pointer"
                        required
                      >
                        {courses.map(course => (
                          <option key={course.id} value={course.id}>
                            {course.title} ({course.duration}) — KSh {(course.fees.tuition + course.fees.labFee).toLocaleString()}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5 sm:col-span-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="academicGrade">Academic Grade</label>
                      <select
                        name="academicGrade"
                        id="academicGrade"
                        value={formData.academicGrade}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 transition-all shadow-xs cursor-pointer"
                      >
                        <option value="A">Grade A / B</option>
                        <option value="C">Grade C</option>
                        <option value="D">Grade D / Plain</option>
                        <option value="Open">Open Practical Entry</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section D: Optional Document Uploads */}
                <div className="space-y-4 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-gray-100 pb-2">
                    <h3 className="font-serif text-base font-bold text-gray-900 flex items-center space-x-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                      <span>4. Document Uploads (100% Optional)</span>
                    </h3>
                    <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      You can also bring paper copies to campus!
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed">
                    Have your documents ready on your phone? You can attach them below. If not, don't worry! You can submit now and bring physical copies when starting classes.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Slot 1: Enrollment Form */}
                    <div className={`p-4 rounded-2xl border-2 border-dashed transition-all ${enrollmentFormFile ? 'border-emerald-500 bg-emerald-50/20' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-gray-900">Enrollment Form</span>
                        {enrollmentFormFile ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <FileText className="h-4 w-4 text-[#C28A4E]" />}
                      </div>
                      <p className="text-[10px] text-gray-500 mb-2">Optional attachment</p>
                      {enrollmentFormFile ? (
                        <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-emerald-200 text-xs">
                          <span className="truncate max-w-[120px] font-medium text-emerald-800">{enrollmentFormFile.name}</span>
                          <button type="button" onClick={() => setEnrollmentFormFile(null)} className="text-rose-600 hover:text-rose-800 p-1">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <label className="block text-center py-2 px-3 bg-white border border-gray-200 hover:border-gray-900 rounded-xl text-xs font-bold text-gray-700 cursor-pointer transition-all shadow-xs">
                          Attach Form
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
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-gray-900">ID / Passport</span>
                        {idPassportFile ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <Upload className="h-4 w-4 text-[#C28A4E]" />}
                      </div>
                      <p className="text-[10px] text-gray-500 mb-2">Optional photo/scan</p>
                      {idPassportFile ? (
                        <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-emerald-200 text-xs">
                          <span className="truncate max-w-[120px] font-medium text-emerald-800">{idPassportFile.name}</span>
                          <button type="button" onClick={() => setIdPassportFile(null)} className="text-rose-600 hover:text-rose-800 p-1">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <label className="block text-center py-2 px-3 bg-white border border-gray-200 hover:border-gray-900 rounded-xl text-xs font-bold text-gray-700 cursor-pointer transition-all shadow-xs">
                          Attach ID Photo
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

                    {/* Slot 3: KCSE Cert / Slip */}
                    <div className={`p-4 rounded-2xl border-2 border-dashed transition-all ${kcseCertFile ? 'border-emerald-500 bg-emerald-50/20' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-gray-900">Result Slip / Cert</span>
                        {kcseCertFile ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <BookOpen className="h-4 w-4 text-[#C28A4E]" />}
                      </div>
                      <p className="text-[10px] text-gray-500 mb-2">Optional photo/scan</p>
                      {kcseCertFile ? (
                        <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-emerald-200 text-xs">
                          <span className="truncate max-w-[120px] font-medium text-emerald-800">{kcseCertFile.name}</span>
                          <button type="button" onClick={() => setKcseCertFile(null)} className="text-rose-600 hover:text-rose-800 p-1">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <label className="block text-center py-2 px-3 bg-white border border-gray-200 hover:border-gray-900 rounded-xl text-xs font-bold text-gray-700 cursor-pointer transition-all shadow-xs">
                          Attach Result Slip
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

                {/* Submit Full Form Button */}
                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    id="submit-full-admissions-form"
                    disabled={isSubmitting || !formData.fullName.trim() || !formData.phone.trim()}
                    className={`w-full py-4 rounded-xl font-bold text-base tracking-wide shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                      (!formData.fullName.trim() || !formData.phone.trim())
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                        : 'bg-[#2E221C] hover:bg-[#110E0C] text-white shadow-md'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting Your Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application Dossier</span>
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </motion.form>
        ) : (
          /* SUCCESS FLOW */
          <motion.div 
            key="success-admissions"
            className="space-y-8 text-center py-6 w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35 }}
          >
            <div className="bg-emerald-100 h-20 w-20 flex items-center justify-center rounded-full text-emerald-800 mx-auto border-2 border-emerald-400 shadow-md">
              <CheckCircle2 className="h-12 w-12 text-emerald-600" />
            </div>
            
            <div className="space-y-3">
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2E221C]">Hongera! Application Received</h3>
              <p className="text-sm text-[#2E221C]/80 max-w-md mx-auto leading-relaxed">
                Your application for <strong>{currentCourse?.title || 'your chosen course'}</strong> has been received by our central registry. Our admissions registrar will contact you via phone or WhatsApp at <strong>{formData.phone}</strong>.
              </p>
            </div>

            {/* Code Card */}
            <div className="bg-[#FAF6F0] p-6 rounded-2xl border-2 border-[#C28A4E]/40 inline-block min-w-[320px] max-w-full shadow-sm">
              <span className="text-[11px] uppercase font-bold text-[#8E7C74] tracking-wider block">Your Official Admission Code:</span>
              <div className="font-mono text-2xl sm:text-3xl font-black text-[#2E221C] tracking-widest mt-1">
                {generatedCode}
              </div>
              <span className="text-[10px] text-emerald-700 block mt-1.5 font-bold uppercase">Save this code for your admission records</span>
            </div>

            {/* Instant WhatsApp Confirmation */}
            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-5 text-left space-y-3 max-w-md mx-auto">
              <div className="flex items-center space-x-2 text-emerald-950 font-bold text-sm">
                <MessageSquare className="h-5 w-5 text-emerald-600 shrink-0" />
                <span>Instant WhatsApp Confirmation</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Want an immediate response? Click below to send your application code directly to our admissions officer on WhatsApp.
              </p>
              <a
                href={`https://wa.me/254708137992?text=${encodeURIComponent(
                  `Hello VIBIT College Admissions, I have just submitted my application online. My admission code is ${generatedCode} for ${currentCourse?.title}. My name is ${formData.fullName}. Please confirm my intake spot.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat on WhatsApp (+254 708 137 992)</span>
              </a>
              <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-emerald-900 font-semibold">
                <span>Or Call:</span>
                <a href="tel:0708137992" className="underline hover:text-emerald-700 font-bold">0708 137992</a>
                <span>/</span>
                <a href="tel:0759065090" className="underline hover:text-emerald-700 font-bold">0759 065 090</a>
              </div>
            </div>

            {/* Interview Scheduler Block */}
            {!interviewBooked ? (
              <div className="bg-white border border-[#2E221C]/15 rounded-2xl p-6 text-left space-y-4 max-w-md mx-auto">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-[#C28A4E] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#2E221C]">Optional: Book Orientation Review</h4>
                    <p className="text-[11px] text-[#2E221C]/70">Choose a convenient date below for a quick conversation with our registrar board (Virtual or On-Campus).</p>
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
                      <label className="text-[10px] font-bold text-[#2E221C] uppercase tracking-wider" htmlFor="interviewTime">Select Time</label>
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
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-emerald-800 space-y-2 max-w-md mx-auto">
                <div className="font-bold text-sm flex items-center justify-center space-x-1.5">
                  <Check className="h-4.5 w-4.5" />
                  <span>Orientation Booked!</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Your session is booked for <strong>{interviewDate}</strong> at <strong>{interviewTime}</strong>. We look forward to welcoming you to VIBIT College.
                </p>
              </div>
            )}

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={resetForm}
                className="text-xs font-bold text-[#C28A4E] hover:text-[#A4713C] uppercase tracking-wider cursor-pointer"
              >
                Submit Another Application
              </button>
              <button
                onClick={() => {
                  setView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-gray-500 hover:text-gray-900 cursor-pointer"
              >
                Return to Home Page
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
