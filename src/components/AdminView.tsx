import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Mail, ArrowUpRight, Check, X, Calendar, Search, 
  Trash2, Plus, Edit3, Settings, Eye, RefreshCw, Sparkles, 
  Award, Clock, DollarSign, Send, Filter, CheckCircle2, AlertCircle,
  TrendingUp, BarChart2, BookOpen, Layers, Laptop
} from 'lucide-react';
import { Course } from '../types';

interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  courseId: string;
  courseName: string;
  priorExperience: string;
  academicGrade: string;
  motivation: string;
  status: 'Pending' | 'Interview Scheduled' | 'Approved' | 'Rejected' | 'Archived';
  generatedCode: string;
  timestamp: string;
  interviewDate?: string;
  interviewTime?: string;
  filesCount: number;
}

interface AnalyticsData {
  pageViews: Record<string, number>;
  courseClicks: Record<string, number>;
  submissions: number;
  submissionsByCourse: Record<string, number>;
  timeline: { date: string; views: number; submissions: number }[];
  emailLog: {
    id: string;
    to: string;
    subject: string;
    body: string;
    timestamp: string;
    status: 'Sent' | 'Failed';
  }[];
}

interface AdminViewProps {
  courses: Course[];
  onUpdateCourses: (newCourses: Course[]) => void;
  onResetCourses: () => void;
}

// Default Seed Data for Applications
const SEED_APPLICATIONS: Application[] = [
  {
    id: "app-1",
    fullName: "Jane Wanjiku Mwangi",
    email: "jane.mwangi@gmail.com",
    phone: "+254 712 345678",
    courseId: "barista-level-3",
    courseName: "Barista Level 3 Skills",
    priorExperience: "one_year",
    academicGrade: "B+",
    motivation: "I have been working as a service attendant in a small cafe in Nyeri and want to elevate my credentials with an official TVET certificate, mastering advanced espresso chemistry and high-fidelity latte art to seek high-paying barista positions in Nairobi.",
    status: "Interview Scheduled",
    generatedCode: "VBIT-2026-84321",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    interviewDate: "2026-07-20",
    interviewTime: "10:30",
    filesCount: 2
  },
  {
    id: "app-2",
    fullName: "Emmanuel Kiprop",
    email: "kiprop.emmanuel@yahoo.com",
    phone: "+254 722 987654",
    courseId: "coffee-agronomy-level-3",
    courseName: "Coffee Agronomy Level 3",
    priorExperience: "none",
    academicGrade: "B-",
    motivation: "My family owns a 2-acre shaded coffee block in Kericho. I wish to learn professional climate-smart soil agronomy and pruning systems so I can double our cooperative cherry yields and transition us to organic production.",
    status: "Pending",
    generatedCode: "VBIT-2026-19283",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    filesCount: 1
  },
  {
    id: "app-3",
    fullName: "Mercy Chepkorir",
    email: "chepkorir.m@hotmail.com",
    phone: "+254 703 555111",
    courseId: "agripreneurship-level-5-6",
    courseName: "Agripreneurship Level 5 & 6",
    priorExperience: "three_years",
    academicGrade: "A-",
    motivation: "As a cooperative auditor in Eldoret, I see local farms struggling with price volatility. I want to study trade hedging, Direct Settlement Systems, and marketing branding to construct a regional export business directly connected to micro-lot buyers in Europe.",
    status: "Approved",
    generatedCode: "VBIT-2026-40291",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    filesCount: 3
  }
];

// Default Seed Data for Analytics
const SEED_ANALYTICS: AnalyticsData = {
  pageViews: {
    "home": 542,
    "about": 218,
    "courses": 389,
    "admissions": 147,
    "contact": 95,
    "admin": 24
  },
  courseClicks: {
    "barista-level-3": 112,
    "mixology-level-3": 45,
    "bartending-level-4": 38,
    "coffee-agronomy-level-3": 74,
    "agripreneurship-level-5-6": 91,
    "cooperative-management-level-5-6": 53,
    "cupping-technology-level-4-5": 62
  },
  submissions: 3,
  submissionsByCourse: {
    "barista-level-3": 1,
    "coffee-agronomy-level-3": 1,
    "agripreneurship-level-5-6": 1
  },
  timeline: [
    { date: "Jul 7", views: 45, submissions: 0 },
    { date: "Jul 8", views: 62, submissions: 1 }, // Mercy
    { date: "Jul 9", views: 89, submissions: 0 },
    { date: "Jul 10", views: 110, submissions: 1 }, // Jane
    { date: "Jul 11", views: 95, submissions: 0 },
    { date: "Jul 12", views: 125, submissions: 1 }, // Emmanuel
    { date: "Jul 13", views: 142, submissions: 0 }
  ],
  emailLog: [
    {
      id: "seed-mail-1",
      to: "muchuikelvin423@gmail.com",
      subject: "New VBIT Admission Application: Mercy Chepkorir (VBIT-2026-40291)",
      body: "Applicant Mercy Chepkorir submitted a formal application for Agripreneurship Level 5 & 6. Credentials successfully compiled and routed via FormSubmit Gateway.",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: "Sent"
    },
    {
      id: "seed-mail-2",
      to: "muchuikelvin423@gmail.com",
      subject: "New VBIT Admission Application: Jane Wanjiku Mwangi (VBIT-2026-84321)",
      body: "Applicant Jane Wanjiku Mwangi submitted a formal application for Barista Level 3. Credentials successfully compiled and routed via FormSubmit Gateway.",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      status: "Sent"
    },
    {
      id: "seed-mail-3",
      to: "muchuikelvin423@gmail.com",
      subject: "New VBIT Admission Application: Emmanuel Kiprop (VBIT-2026-19283)",
      body: "Applicant Emmanuel Kiprop submitted a formal application for Coffee Agronomy Level 3. Credentials successfully compiled and routed via FormSubmit Gateway.",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: "Sent"
    }
  ]
};

export default function AdminView({ courses, onUpdateCourses, onResetCourses }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState<'applications' | 'content' | 'analytics'>('applications');
  
  // Applications list state
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [appSearch, setAppSearch] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState<string>('all');
  
  // Analytics State
  const [analytics, setAnalytics] = useState<AnalyticsData>(SEED_ANALYTICS);
  const [activeSessionCount, setActiveSessionCount] = useState(4); // Simulated real-time visitors

  // Website Content Editing State
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [courseFormData, setCourseFormData] = useState<Partial<Course>>({
    id: '',
    title: '',
    category: 'certificate',
    duration: '',
    level: '',
    certification: '',
    description: '',
    syllabus: [''],
    image: '',
    fees: { tuition: 0, labFee: 0, deposit: 0 },
    schedule: ''
  });

  // Load and sync local state
  useEffect(() => {
    // 1. Applications
    const savedApps = localStorage.getItem('vibit_applications');
    if (savedApps) {
      try {
        setApplications(JSON.parse(savedApps));
      } catch (e) {
        setApplications(SEED_APPLICATIONS);
      }
    } else {
      setApplications(SEED_APPLICATIONS);
      localStorage.setItem('vibit_applications', JSON.stringify(SEED_APPLICATIONS));
    }

    // 2. Analytics
    const savedAnalytics = localStorage.getItem('vibit_analytics');
    if (savedAnalytics) {
      try {
        setAnalytics(JSON.parse(savedAnalytics));
      } catch (e) {
        setAnalytics(SEED_ANALYTICS);
      }
    } else {
      setAnalytics(SEED_ANALYTICS);
      localStorage.setItem('vibit_analytics', JSON.stringify(SEED_ANALYTICS));
    }

    // Simulated fluctuating traffic
    const interval = setInterval(() => {
      setActiveSessionCount(prev => {
        const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        const next = prev + delta;
        return next < 1 ? 2 : next > 8 ? 5 : next;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Update applications in local storage
  const updateApplicationsList = (newList: Application[]) => {
    setApplications(newList);
    localStorage.setItem('vibit_applications', JSON.stringify(newList));
  };

  // Status changer for applicants
  const handleUpdateAppStatus = (appId: string, newStatus: Application['status']) => {
    const updated = applications.map(app => {
      if (app.id === appId) {
        return { ...app, status: newStatus };
      }
      return app;
    });
    updateApplicationsList(updated);
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
  };

  // Delete/Archive applicant
  const handleDeleteApplicant = (appId: string) => {
    if (confirm("Are you sure you want to permanently delete this application?")) {
      const filtered = applications.filter(app => app.id !== appId);
      updateApplicationsList(filtered);
      setSelectedApp(null);
    }
  };

  // Simulated traffic generator button
  const triggerTrafficSpike = () => {
    const local = localStorage.getItem('vibit_analytics');
    let currentData = local ? JSON.parse(local) : { ...analytics };
    
    // Add page views to home, courses, and admissions
    currentData.pageViews.home = (currentData.pageViews.home || 0) + Math.floor(Math.random() * 25) + 15;
    currentData.pageViews.courses = (currentData.pageViews.courses || 0) + Math.floor(Math.random() * 15) + 10;
    currentData.pageViews.admissions = (currentData.pageViews.admissions || 0) + Math.floor(Math.random() * 8) + 4;
    
    // Add timeline spike for today
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    currentData.timeline = currentData.timeline || [];
    let todayEntry = currentData.timeline.find((t: any) => t.date === today);
    if (!todayEntry) {
      todayEntry = { date: today, views: 0, submissions: 0 };
      currentData.timeline.push(todayEntry);
    }
    todayEntry.views += Math.floor(Math.random() * 45) + 30;
    
    setAnalytics(currentData);
    localStorage.setItem('vibit_analytics', JSON.stringify(currentData));
    setActiveSessionCount(prev => prev + Math.floor(Math.random() * 4) + 3);
  };

  // Course save (Edit/Create)
  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseFormData.title || !courseFormData.duration) {
      alert("Please enter a Course Title and Duration.");
      return;
    }

    if (isAddingCourse) {
      // Create unique id if not set
      const slug = courseFormData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const newId = slug || `custom-course-${Date.now()}`;
      
      const newCourse: Course = {
        id: newId,
        title: courseFormData.title,
        category: (courseFormData.category as any) || 'certificate',
        duration: courseFormData.duration,
        level: courseFormData.level || 'TVET Certified Module',
        certification: courseFormData.certification || 'VBIT Technical Certification',
        description: courseFormData.description || '',
        syllabus: courseFormData.syllabus || ['Core Competencies Introduction'],
        image: courseFormData.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
        fees: {
          tuition: Number(courseFormData.fees?.tuition) || 45000,
          labFee: Number(courseFormData.fees?.labFee) || 10000,
          deposit: Number(courseFormData.fees?.deposit) || 5000
        },
        schedule: courseFormData.schedule || 'Regular Day-Shift Schedule'
      };

      onUpdateCourses([...courses, newCourse]);
      alert(`Successfully added new program: "${newCourse.title}"!`);
    } else if (editingCourse) {
      const updatedList = courses.map(c => {
        if (c.id === editingCourse.id) {
          return {
            ...c,
            title: courseFormData.title || c.title,
            category: (courseFormData.category as any) || c.category,
            duration: courseFormData.duration || c.duration,
            level: courseFormData.level || c.level,
            certification: courseFormData.certification || c.certification,
            description: courseFormData.description || c.description,
            syllabus: courseFormData.syllabus || c.syllabus,
            image: courseFormData.image || c.image,
            fees: {
              tuition: Number(courseFormData.fees?.tuition) !== undefined ? Number(courseFormData.fees?.tuition) : c.fees.tuition,
              labFee: Number(courseFormData.fees?.labFee) !== undefined ? Number(courseFormData.fees?.labFee) : c.fees.labFee,
              deposit: Number(courseFormData.fees?.deposit) !== undefined ? Number(courseFormData.fees?.deposit) : c.fees.deposit
            },
            schedule: courseFormData.schedule || c.schedule
          };
        }
        return c;
      });

      onUpdateCourses(updatedList);
      alert(`Updated details for: "${courseFormData.title}"!`);
    }

    // Reset state
    setEditingCourse(null);
    setIsAddingCourse(false);
  };

  const startEditCourse = (course: Course) => {
    setEditingCourse(course);
    setIsAddingCourse(false);
    setCourseFormData({
      id: course.id,
      title: course.title,
      category: course.category,
      duration: course.duration,
      level: course.level,
      certification: course.certification,
      description: course.description,
      syllabus: [...course.syllabus],
      image: course.image,
      fees: { ...course.fees },
      schedule: course.schedule
    });
  };

  const startAddCourse = () => {
    setIsAddingCourse(true);
    setEditingCourse(null);
    setCourseFormData({
      id: '',
      title: '',
      category: 'certificate',
      duration: '',
      level: '',
      certification: '',
      description: '',
      syllabus: [''],
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
      fees: { tuition: 45000, labFee: 10000, deposit: 5000 },
      schedule: 'Full-Time (Mon - Fri, 8:00 AM - 1:00 PM)'
    });
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirm("Are you sure you want to permanently delete this course from the public catalog?")) {
      const filtered = courses.filter(c => c.id !== courseId);
      onUpdateCourses(filtered);
    }
  };

  const handleAddSyllabusLine = () => {
    setCourseFormData(prev => ({
      ...prev,
      syllabus: [...(prev.syllabus || []), '']
    }));
  };

  const handleSyllabusLineChange = (index: number, val: string) => {
    const lines = [...(courseFormData.syllabus || [])];
    lines[index] = val;
    setCourseFormData(prev => ({
      ...prev,
      syllabus: lines
    }));
  };

  const handleRemoveSyllabusLine = (index: number) => {
    const lines = (courseFormData.syllabus || []).filter((_, i) => i !== index);
    setCourseFormData(prev => ({
      ...prev,
      syllabus: lines.length > 0 ? lines : ['']
    }));
  };

  // Search/Filter for applications
  const filteredApps = applications.filter(app => {
    const matchesSearch = app.fullName.toLowerCase().includes(appSearch.toLowerCase()) || 
                          app.email.toLowerCase().includes(appSearch.toLowerCase()) || 
                          app.phone.includes(appSearch) ||
                          app.generatedCode.toLowerCase().includes(appSearch.toLowerCase()) ||
                          app.courseName.toLowerCase().includes(appSearch.toLowerCase());
    
    const matchesStatus = appStatusFilter === 'all' || app.status === appStatusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate high level KPI analytics counters
  const totalApplications = applications.length;
  const approvedApplications = applications.filter(a => a.status === 'Approved').length;
  const pendingApplications = applications.filter(a => a.status === 'Pending').length;
  const interviewApplications = applications.filter(a => a.status === 'Interview Scheduled').length;
  
  // Overall conversion rate (Admissions submissions / Admissions page views)
  const admissionsPageViews = analytics.pageViews.admissions || 1;
  const rawConversionRate = (totalApplications / admissionsPageViews) * 100;
  const conversionRate = isNaN(rawConversionRate) ? 0 : rawConversionRate.toFixed(1);

  // SVG Chart data preparations
  const maxViews = Math.max(...analytics.timeline.map(t => t.views), 1);
  const chartHeight = 120;
  const chartWidth = 500;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10" id="admin-view-root">
      
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-[#2E221C]/10 pb-6 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-[#C28A4E] font-bold tracking-widest uppercase">
            <Settings className="h-4 w-4 animate-spin-slow" />
            <span>VBIT Security Portal</span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold text-[#2E221C] mt-1">
            Registrar & Content Administration
          </h1>
          <p className="text-xs text-[#8E7C74] mt-0.5">
            Admin: <span className="font-semibold text-[#2E221C]">muchuikelvin423@gmail.com</span> • Live and persistent controls.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="bg-[#FAF6F0] border border-[#2E221C]/15 rounded-2xl p-1.5 flex gap-1 self-start md:self-auto shadow-inner">
          <button
            onClick={() => setActiveTab('applications')}
            className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'applications'
                ? 'bg-[#2E221C] text-[#FAF6F0] shadow-sm'
                : 'text-[#2E221C]/75 hover:bg-[#2E221C]/5'
            }`}
          >
            <Users className="h-3.5 w-3.5 text-[#C28A4E]" />
            <span>Admissions ({totalApplications})</span>
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'content'
                ? 'bg-[#2E221C] text-[#FAF6F0] shadow-sm'
                : 'text-[#2E221C]/75 hover:bg-[#2E221C]/5'
            }`}
          >
            <Layers className="h-3.5 w-3.5 text-[#C28A4E]" />
            <span>Edit Website Content</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-[#2E221C] text-[#FAF6F0] shadow-sm'
                : 'text-[#2E221C]/75 hover:bg-[#2E221C]/5'
            }`}
          >
            <BarChart2 className="h-3.5 w-3.5 text-[#C28A4E]" />
            <span>Performance & Outbox</span>
          </button>
        </div>
      </div>

      {/* KPI METRICS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-white border border-[#2E221C]/10 rounded-2xl p-4.5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8E7C74]">Total Registrations</span>
            <Users className="h-4.5 w-4.5 text-[#C28A4E]" />
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-serif font-black text-[#2E221C]">{totalApplications}</div>
            <span className="text-[9px] text-[#059669] font-bold flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 shrink-0 mr-0.5" /> +100% cloud validated
            </span>
          </div>
        </div>

        <div className="bg-white border border-[#2E221C]/10 rounded-2xl p-4.5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8E7C74]">Live Visitors</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-serif font-black text-[#2E221C]">{activeSessionCount}</div>
            <span className="text-[9px] text-[#8E7C74] font-medium block mt-1">
              Active sessions on-site
            </span>
          </div>
        </div>

        <div className="bg-white border border-[#2E221C]/10 rounded-2xl p-4.5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8E7C74]">Email Forwarding</span>
            <Mail className="h-4.5 w-4.5 text-blue-500" />
          </div>
          <div className="mt-2.5">
            <div className="text-xs font-bold text-[#2E221C] truncate" title="muchuikelvin423@gmail.com">muchuikelvin423@gm...</div>
            <span className="text-[9px] text-emerald-600 font-bold flex items-center mt-1.5">
              <Check className="h-3 w-3 shrink-0 mr-0.5" /> FormSubmit.co Active
            </span>
          </div>
        </div>

        <div className="bg-white border border-[#2E221C]/10 rounded-2xl p-4.5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8E7C74]">Conversion rate</span>
            <TrendingUp className="h-4.5 w-4.5 text-emerald-500" />
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-serif font-black text-[#2E221C]">{conversionRate}%</div>
            <span className="text-[9px] text-[#8E7C74] font-medium block mt-1">
              Form submit vs admissions views
            </span>
          </div>
        </div>

      </div>

      {/* CORE WORKSPACE PANEL CONTAINER */}
      <div className="bg-white border border-[#2E221C]/10 rounded-3xl shadow-md overflow-hidden min-h-[500px]">
        
        {/* TAB 1: APPLICATIONS LISTING */}
        {activeTab === 'applications' && (
          <div className="divide-y divide-[#2E221C]/10">
            
            {/* Filter toolbar */}
            <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/70">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Search applicant name, course, phone, code..."
                  value={appSearch}
                  onChange={(e) => setAppSearch(e.target.value)}
                  className="w-full bg-white border border-[#2E221C]/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#2E221C] placeholder-[#8E7C74]/50 focus:border-[#C28A4E] transition-all shadow-sm"
                />
                <Search className="h-4 w-4 text-[#8E7C74] absolute left-3.5 top-3" />
                {appSearch && (
                  <button onClick={() => setAppSearch('')} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto self-start sm:self-auto">
                <Filter className="h-4 w-4 text-[#8E7C74] shrink-0" />
                <span className="text-[11px] font-bold text-[#2E221C] shrink-0">Filter Status:</span>
                <select
                  value={appStatusFilter}
                  onChange={(e) => setAppStatusFilter(e.target.value)}
                  className="bg-white border border-[#2E221C]/15 rounded-xl px-3 py-2 text-xs text-[#2E221C] font-semibold focus:border-[#C28A4E] shadow-sm flex-grow sm:flex-grow-0"
                >
                  <option value="all">All Registrations</option>
                  <option value="Pending">Pending Review</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Approved">Approved / Enrolled</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>

            {/* List body */}
            <div className="overflow-x-auto">
              {filteredApps.length === 0 ? (
                <div className="text-center py-20 space-y-3">
                  <AlertCircle className="h-10 w-10 text-gray-300 mx-auto" />
                  <h3 className="font-serif text-lg font-bold text-[#2E221C]">No Applications Found</h3>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto">We couldn't find any student applications matching your keywords or status filters.</p>
                </div>
              ) : (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-100/50 text-[#8E7C74] font-bold border-b border-[#2E221C]/5 uppercase tracking-wider text-[9px]">
                      <th className="py-4 px-6">Code / Date</th>
                      <th className="py-4 px-6">Applicant Info</th>
                      <th className="py-4 px-6">Course Selected</th>
                      <th className="py-4 px-6">Qualifications</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredApps.map((app) => (
                      <tr 
                        key={app.id} 
                        className={`hover:bg-amber-50/20 transition-colors cursor-pointer ${selectedApp?.id === app.id ? 'bg-amber-50/40' : ''}`}
                        onClick={() => setSelectedApp(app)}
                      >
                        <td className="py-4 px-6 space-y-1">
                          <div className="font-mono font-bold text-gray-900">{app.generatedCode}</div>
                          <div className="text-[10px] text-gray-400">
                            {new Date(app.timestamp).toLocaleDateString('en-KE', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>
                        <td className="py-4 px-6 space-y-1">
                          <div className="font-extrabold text-[#2E221C] text-sm">{app.fullName}</div>
                          <div className="text-gray-500 flex items-center space-x-1">
                            <span className="truncate">{app.email}</span>
                          </div>
                          <div className="text-gray-400 font-medium">{app.phone}</div>
                        </td>
                        <td className="py-4 px-6 space-y-1">
                          <div className="font-bold text-[#2E221C]">{app.courseName}</div>
                          <div className="text-[10px] text-[#C28A4E] font-semibold">{app.courseId}</div>
                        </td>
                        <td className="py-4 px-6 space-y-1">
                          <div className="flex items-center space-x-1.5">
                            <span className="bg-gray-100 text-gray-800 font-extrabold px-1.5 py-0.5 rounded text-[10px]">{app.academicGrade}</span>
                            <span className="text-gray-500 text-[10px]">KCSE</span>
                          </div>
                          <div className="text-gray-400 text-[10px]">
                            Prior Exp: <span className="font-semibold text-gray-600">{app.priorExperience === 'none' ? 'None' : app.priorExperience === 'one_year' ? '1 Year' : '3+ Years'}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            app.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            app.status === 'Interview Scheduled' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            app.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                            app.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                            'bg-gray-50 text-gray-600 border-gray-200'
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${
                              app.status === 'Approved' ? 'bg-emerald-500' :
                              app.status === 'Interview Scheduled' ? 'bg-blue-500' :
                              app.status === 'Pending' ? 'bg-amber-500' :
                              app.status === 'Rejected' ? 'bg-rose-500' :
                              'bg-gray-500'
                            }`} />
                            {app.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end space-x-1.5">
                            <button
                              onClick={() => setSelectedApp(app)}
                              className="p-1.5 text-gray-500 hover:text-[#C28A4E] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                              title="View Application Dossier"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteApplicant(app.id)}
                              className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Record"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: WEB CONTENT EDITOR */}
        {activeTab === 'content' && (
          <div className="p-6 md:p-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-5">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#2E221C]">Manage Courses and Curriculum</h3>
                <p className="text-xs text-[#8E7C74]">Updates instantly overwrite standard data in the public search engine and fee calculators.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={onResetCourses}
                  className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-[#2E221C] text-xs font-bold border border-gray-200 rounded-xl transition-all cursor-pointer flex items-center space-x-1"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Reset to Defaults</span>
                </button>
                <button
                  onClick={startAddCourse}
                  className="px-4 py-2 bg-[#C28A4E] hover:bg-[#A4713C] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center space-x-1.5 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add New Program</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Course List column */}
              <div className="lg:col-span-4 border border-[#2E221C]/10 rounded-2xl p-4 space-y-3 h-[500px] overflow-y-auto bg-gray-50/50">
                <span className="text-[9px] uppercase font-bold tracking-wider text-[#8E7C74] block pb-1 border-b border-gray-100">Programs Catalog ({courses.length})</span>
                {courses.map(course => (
                  <div
                    key={course.id}
                    onClick={() => startEditCourse(course)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                      editingCourse?.id === course.id 
                        ? 'bg-[#2E221C] border-[#2E221C] text-[#FAF6F0]' 
                        : 'bg-white border-[#2E221C]/10 text-[#2E221C] hover:border-[#C28A4E]/30 hover:shadow-sm'
                    }`}
                  >
                    <div className="space-y-0.5 truncate pr-2">
                      <h4 className="font-bold text-xs truncate">{course.title}</h4>
                      <span className={`text-[9px] uppercase font-bold ${editingCourse?.id === course.id ? 'text-[#C28A4E]' : 'text-gray-400'}`}>
                        {course.category} • {course.duration}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        onClick={(e) => { e.stopPropagation(); startEditCourse(course); }}
                        className={`p-1 rounded transition-colors ${editingCourse?.id === course.id ? 'hover:bg-white/10 text-[#FAF6F0]' : 'hover:bg-gray-100 text-gray-500'}`}
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteCourse(course.id); }}
                        className="p-1 rounded hover:bg-rose-50 hover:text-rose-600 text-gray-400 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Edit Form Column */}
              <div className="lg:col-span-8 bg-gray-50/30 border border-[#2E221C]/10 rounded-2xl p-6 h-[500px] overflow-y-auto">
                {editingCourse || isAddingCourse ? (
                  <form onSubmit={handleSaveCourse} className="space-y-6">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <h4 className="font-serif font-bold text-sm text-[#2E221C] flex items-center space-x-2">
                        <Sparkles className="h-4.5 w-4.5 text-[#C28A4E]" />
                        <span>{isAddingCourse ? "Add New Study Program" : `Edit Program: ${editingCourse?.title}`}</span>
                      </h4>
                      <button 
                        type="button" 
                        onClick={() => { setEditingCourse(null); setIsAddingCourse(false); }}
                        className="p-1 text-gray-400 hover:text-gray-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Course Title *</label>
                        <input
                          type="text"
                          required
                          value={courseFormData.title || ''}
                          onChange={(e) => setCourseFormData(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g. Advanced Roast profiling"
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-[#2E221C] focus:border-[#C28A4E] shadow-sm"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Category *</label>
                        <select
                          value={courseFormData.category || 'certificate'}
                          onChange={(e) => setCourseFormData(prev => ({ ...prev, category: e.target.value as any }))}
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-[#2E221C] font-semibold focus:border-[#C28A4E] shadow-sm"
                        >
                          <option value="diploma">Diploma</option>
                          <option value="certificate">Certificate</option>
                          <option value="short">Short Course</option>
                          <option value="professional">Executive Professional</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Duration *</label>
                        <input
                          type="text"
                          required
                          value={courseFormData.duration || ''}
                          onChange={(e) => setCourseFormData(prev => ({ ...prev, duration: e.target.value }))}
                          placeholder="e.g. 6 Months, 1 Year, 2 Weeks"
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-[#2E221C] focus:border-[#C28A4E] shadow-sm"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Level Designation</label>
                        <input
                          type="text"
                          value={courseFormData.level || ''}
                          onChange={(e) => setCourseFormData(prev => ({ ...prev, level: e.target.value }))}
                          placeholder="e.g. Level 3 (Intermediate), Level 5"
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-[#2E221C] focus:border-[#C28A4E] shadow-sm"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Awarding Credential Title</label>
                        <input
                          type="text"
                          value={courseFormData.certification || ''}
                          onChange={(e) => setCourseFormData(prev => ({ ...prev, certification: e.target.value }))}
                          placeholder="e.g. TVET Approved Level 3 Certificate in Barista Skills"
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-[#2E221C] focus:border-[#C28A4E] shadow-sm"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Course Summary Description</label>
                        <textarea
                          rows={3}
                          value={courseFormData.description || ''}
                          onChange={(e) => setCourseFormData(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Provide a comprehensive summary of the program goals..."
                          className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs text-[#2E221C] focus:border-[#C28A4E] shadow-sm leading-relaxed"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Banner Image URL</label>
                        <input
                          type="text"
                          value={courseFormData.image || ''}
                          onChange={(e) => setCourseFormData(prev => ({ ...prev, image: e.target.value }))}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-[#2E221C] focus:border-[#C28A4E] shadow-sm"
                        />
                      </div>

                      {/* Tuition Fees Panel */}
                      <div className="sm:col-span-2 bg-[#FAF6F0]/60 border border-[#2E221C]/5 rounded-2xl p-4 grid grid-cols-3 gap-3.5">
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-[#8E7C74] uppercase tracking-wider block">Tuition (KSh)</label>
                          <input
                            type="number"
                            value={courseFormData.fees?.tuition || 0}
                            onChange={(e) => setCourseFormData(prev => ({
                              ...prev,
                              fees: { ...(prev.fees || { tuition: 0, labFee: 0, deposit: 0 }), tuition: Number(e.target.value) }
                            }))}
                            className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-[#2E221C] font-extrabold focus:border-[#C28A4E]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-[#8E7C74] uppercase tracking-wider block">Lab Fee (KSh)</label>
                          <input
                            type="number"
                            value={courseFormData.fees?.labFee || 0}
                            onChange={(e) => setCourseFormData(prev => ({
                              ...prev,
                              fees: { ...(prev.fees || { tuition: 0, labFee: 0, deposit: 0 }), labFee: Number(e.target.value) }
                            }))}
                            className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-[#2E221C] font-extrabold focus:border-[#C28A4E]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-[#8E7C74] uppercase tracking-wider block">Reg Deposit (KSh)</label>
                          <input
                            type="number"
                            value={courseFormData.fees?.deposit || 0}
                            onChange={(e) => setCourseFormData(prev => ({
                              ...prev,
                              fees: { ...(prev.fees || { tuition: 0, labFee: 0, deposit: 0 }), deposit: Number(e.target.value) }
                            }))}
                            className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-[#2E221C] font-extrabold focus:border-[#C28A4E]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Weekly Timetable Schedule</label>
                        <input
                          type="text"
                          value={courseFormData.schedule || ''}
                          onChange={(e) => setCourseFormData(prev => ({ ...prev, schedule: e.target.value }))}
                          placeholder="e.g. Full-Time (Mon - Fri, 8:00 AM - 1:00 PM)"
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-[#2E221C] focus:border-[#C28A4E] shadow-sm"
                        />
                      </div>

                      {/* Syllabus List Builders */}
                      <div className="sm:col-span-2 space-y-3 pt-2">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Curriculum Syllabus Modules</label>
                          <button
                            type="button"
                            onClick={handleAddSyllabusLine}
                            className="text-[10px] text-[#C28A4E] font-bold hover:underline flex items-center space-x-1"
                          >
                            <Plus className="h-3 w-3" /> <span>Add Module Line</span>
                          </button>
                        </div>

                        <div className="space-y-2">
                          {(courseFormData.syllabus || []).map((line, i) => (
                            <div key={i} className="flex items-center space-x-2">
                              <span className="text-[10px] font-mono text-gray-400 font-bold w-5">{i+1}.</span>
                              <input
                                type="text"
                                required
                                value={line}
                                onChange={(e) => handleSyllabusLineChange(i, e.target.value)}
                                placeholder="Module title or competency block..."
                                className="flex-grow bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-[#2E221C] focus:border-[#C28A4E]"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveSyllabusLine(i)}
                                className="text-gray-400 hover:text-rose-600 p-1.5 hover:bg-rose-50 rounded-lg shrink-0"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    <div className="flex justify-end space-x-2.5 pt-4 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => { setEditingCourse(null); setIsAddingCourse(false); }}
                        className="px-4 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#C28A4E] hover:bg-[#A4713C] text-white text-xs font-bold rounded-xl shadow-sm"
                      >
                        {isAddingCourse ? "Save Program" : "Save Changes"}
                      </button>
                    </div>

                  </form>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="h-14 w-14 bg-[#FAF6F0] rounded-full border border-[#C28A4E]/20 flex items-center justify-center text-[#C28A4E]">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif font-bold text-sm text-[#2E221C]">No Program Selected</h4>
                      <p className="text-[11px] text-gray-400 max-w-sm">Select a course from the left sidebar to edit its tuition, syllabus, and timetable, or click "Add New Program".</p>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* TAB 3: PERFORMANCE & OUTBOX LOG */}
        {activeTab === 'analytics' && (
          <div className="p-6 md:p-8 space-y-10">
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-5">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#2E221C]">Website Traffic & Outbox Metrics</h3>
                <p className="text-xs text-[#8E7C74]">Track live site performance, telemetry conversions, and outgoing notification records.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={triggerTrafficSpike}
                  className="px-4 py-2 bg-[#2E221C] hover:bg-[#110E0C] text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center space-x-1.5"
                >
                  <Sparkles className="h-4 w-4 text-[#C28A4E]" />
                  <span>Simulate Traffic Spike</span>
                </button>
              </div>
            </div>

            {/* PERFORMANCE VISUAL CHARTS BENTO GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Chart A: Page view volume (SVG Path) */}
              <div className="border border-[#2E221C]/10 rounded-2xl p-5 space-y-4 bg-white shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#2E221C] uppercase tracking-wider">Page Views Timeline (Daily)</h4>
                  <span className="text-[10px] text-gray-400 font-medium">Last 7 Active Days</span>
                </div>

                <div className="relative">
                  {/* SVG Line Chart */}
                  <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full overflow-visible">
                    {/* Grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
                      <line
                        key={i}
                        x1="0"
                        y1={chartHeight * ratio}
                        x2={chartWidth}
                        y2={chartHeight * ratio}
                        stroke="#EFEBE7"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                    ))}

                    {/* Gradient area */}
                    <path
                      d={`
                        M 0,${chartHeight}
                        ${analytics.timeline.map((t, idx) => {
                          const x = (idx / (analytics.timeline.length - 1)) * chartWidth;
                          const y = chartHeight - (t.views / maxViews) * (chartHeight - 20);
                          return `L ${x},${y}`;
                        }).join(' ')}
                        L ${chartWidth},${chartHeight} Z
                      `}
                      fill="url(#viewsGradient)"
                      opacity="0.15"
                    />

                    {/* Smooth Area Line */}
                    <path
                      d={analytics.timeline.map((t, idx) => {
                        const x = (idx / (analytics.timeline.length - 1)) * chartWidth;
                        const y = chartHeight - (t.views / maxViews) * (chartHeight - 20);
                        return `${idx === 0 ? 'M' : 'L'} ${x},${y}`;
                      }).join(' ')}
                      fill="none"
                      stroke="#C28A4E"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Node points and helper labels */}
                    {analytics.timeline.map((t, idx) => {
                      const x = (idx / (analytics.timeline.length - 1)) * chartWidth;
                      const y = chartHeight - (t.views / maxViews) * (chartHeight - 20);
                      return (
                        <g key={idx} className="group/node cursor-pointer">
                          <circle
                            cx={x}
                            cy={y}
                            r="5"
                            className="fill-[#2E221C] stroke-white stroke-2 group-hover/node:r-7 transition-all"
                          />
                          <text
                            x={x}
                            y={y - 10}
                            textAnchor="middle"
                            className="text-[9px] font-mono font-black fill-[#2E221C] opacity-0 group-hover/node:opacity-100 transition-opacity bg-white"
                          >
                            {t.views}
                          </text>
                        </g>
                      );
                    })}

                    <defs>
                      <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C28A4E" />
                        <stop offset="100%" stopColor="#FAF6F0" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Horizontal X axis dates */}
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold px-1 pt-3.5 border-t border-gray-100">
                    {analytics.timeline.map((t, idx) => (
                      <span key={idx}>{t.date}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chart B: Conversion by Course (Bar Chart SVG) */}
              <div className="border border-[#2E221C]/10 rounded-2xl p-5 space-y-4 bg-white shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#2E221C] uppercase tracking-wider">Interest clicks by Study Program</h4>
                  <span className="text-[10px] text-gray-400 font-medium">User Clicks Tracker</span>
                </div>

                <div className="space-y-3.5 pt-1.5">
                  {Object.entries(analytics.courseClicks).slice(0, 5).map(([cId, clickCount]) => {
                    const courseObj = courses.find(c => c.id === cId) || { title: cId };
                    const clickCountNum = clickCount as number;
                    const maxClicks = Math.max(...(Object.values(analytics.courseClicks) as number[]), 1);
                    const percentage = (clickCountNum / maxClicks) * 100;
                    
                    return (
                      <div key={cId} className="space-y-1">
                        <div className="flex justify-between text-[11px] font-bold text-[#2E221C]">
                          <span className="truncate pr-4">{courseObj.title}</span>
                          <span className="font-mono text-gray-500">{clickCount} clicks</span>
                        </div>
                        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.6 }}
                            className="h-full bg-gradient-to-r from-[#2E221C] to-[#C28A4E] rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* LIVE OUTGOING EMAIL NOTIFICATION OUTBOX */}
            <div className="border border-[#2E221C]/10 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-[#2E221C] text-[#FAF6F0] p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4.5 w-4.5 text-[#C28A4E]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">FormSubmit.co Outbox Records</h4>
                </div>
                <span className="text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
                  Forward Target: muchuikelvin423@gmail.com
                </span>
              </div>

              <div className="divide-y divide-gray-100 max-h-[300px] overflow-y-auto">
                {analytics.emailLog.length === 0 ? (
                  <div className="p-10 text-center space-y-2">
                    <Mail className="h-8 w-8 text-gray-300 mx-auto" />
                    <p className="text-xs text-gray-400">No emails have been dispatched yet. When a new student registers, it logs here.</p>
                  </div>
                ) : (
                  [...analytics.emailLog].reverse().map((log) => (
                    <div key={log.id} className="p-4.5 hover:bg-gray-50/50 transition-colors flex flex-col sm:flex-row justify-between items-start gap-4 text-xs">
                      <div className="space-y-1.5 flex-grow">
                        <div className="flex items-center space-x-2">
                          <span className="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase">
                            {log.status}
                          </span>
                          <span className="font-mono text-gray-400 text-[10px]">
                            {new Date(log.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <h5 className="font-extrabold text-gray-900 leading-tight">{log.subject}</h5>
                        <p className="text-gray-500 leading-relaxed text-[11px] whitespace-pre-wrap">{log.body}</p>
                      </div>

                      <div className="text-right text-[10px] shrink-0">
                        <span className="text-gray-400 block font-medium">Gateway Endpoint</span>
                        <strong className="text-gray-700">api.web3forms.com/ajax/..</strong>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* APPLICANT DETAILED INSPECTOR MODAL */}
      <AnimatePresence>
        {selectedApp && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#110E0C]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedApp(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl border border-[#2E221C]/15 shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col justify-between"
            >
              {/* Modal Header */}
              <div className="bg-[#2E221C] text-white p-6 flex justify-between items-start border-b border-[#C28A4E]/25">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#C28A4E] uppercase tracking-wider">
                    Registration Dossier ({selectedApp.generatedCode})
                  </span>
                  <h3 className="font-serif text-2xl font-black">{selectedApp.fullName}</h3>
                  <p className="text-xs text-gray-300">
                    Received on {new Date(selectedApp.timestamp).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 text-xs text-gray-700 leading-relaxed">
                
                {/* Meta stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 border border-gray-100 rounded-2xl p-4">
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-[#8E7C74] block uppercase font-bold tracking-wider">KCSE Grade</span>
                    <strong className="text-[#2E221C] font-extrabold text-sm">{selectedApp.academicGrade}</strong>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-[#8E7C74] block uppercase font-bold tracking-wider">Prior Practice</span>
                    <strong className="text-[#2E221C] font-extrabold text-sm">
                      {selectedApp.priorExperience === 'none' ? 'None / Novice' : selectedApp.priorExperience === 'one_year' ? '1 Year' : '3+ Years'}
                    </strong>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-[#8E7C74] block uppercase font-bold tracking-wider">Admitted Program</span>
                    <strong className="text-[#C28A4E] font-extrabold text-sm truncate block" title={selectedApp.courseName}>{selectedApp.courseName}</strong>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-[#8E7C74] block uppercase font-bold tracking-wider">Review Status</span>
                    <strong className="text-gray-900 font-extrabold text-sm block">{selectedApp.status}</strong>
                  </div>
                </div>

                {/* Contact Shortcuts */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Student Contact Credentials</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a 
                      href={`mailto:${selectedApp.email}`}
                      className="p-3 bg-[#FAF6F0] hover:bg-[#C28A4E]/10 rounded-xl border border-gray-200 transition-colors flex items-center space-x-2.5 text-[#2E221C]"
                    >
                      <Mail className="h-4 w-4 text-[#C28A4E]" />
                      <div className="truncate">
                        <span className="text-[9px] text-gray-400 block font-bold leading-none uppercase">Primary Email</span>
                        <strong className="truncate block font-semibold mt-0.5 text-xs">{selectedApp.email}</strong>
                      </div>
                    </a>
                    
                    <a 
                      href={`tel:${selectedApp.phone}`}
                      className="p-3 bg-[#FAF6F0] hover:bg-[#C28A4E]/10 rounded-xl border border-gray-200 transition-colors flex items-center space-x-2.5 text-[#2E221C]"
                    >
                      <Users className="h-4 w-4 text-[#C28A4E]" />
                      <div>
                        <span className="text-[9px] text-gray-400 block font-bold leading-none uppercase">Mobile Phone</span>
                        <strong className="block font-semibold mt-0.5 text-xs">{selectedApp.phone}</strong>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Motivation statement */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Motivation Letter / Statement of Purpose</span>
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl italic text-gray-600 leading-relaxed text-[11px] whitespace-pre-wrap">
                    "{selectedApp.motivation || "No statement provided."}"
                  </div>
                </div>

                {/* Uploaded Documents */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Submitted Attachments ({selectedApp.filesCount})</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="p-3 bg-white border border-gray-200 rounded-xl flex items-center space-x-2.5 shadow-xs">
                      <div className="h-8 w-8 bg-amber-50 text-[#C28A4E] rounded-lg flex items-center justify-center shrink-0 border border-[#C28A4E]/10 font-bold text-xs">PDF</div>
                      <div className="truncate">
                        <strong className="block font-semibold text-xs truncate">Academic_Transcripts_KCSE.pdf</strong>
                        <span className="text-[9px] text-gray-400 block">1.4 MB • Verification Approved</span>
                      </div>
                    </div>
                    {selectedApp.filesCount > 1 && (
                      <div className="p-3 bg-white border border-gray-200 rounded-xl flex items-center space-x-2.5 shadow-xs">
                        <div className="h-8 w-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center shrink-0 border border-blue-100 font-bold text-xs">IMG</div>
                        <div className="truncate">
                          <strong className="block font-semibold text-xs truncate">National_ID_Passport.jpg</strong>
                          <span className="text-[9px] text-gray-400 block">680 KB • ID Scanned</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Interview Booker Details */}
                {selectedApp.status === 'Interview Scheduled' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start space-x-3 text-blue-800">
                    <Calendar className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-xs font-bold uppercase tracking-wider">Scheduled Registrar Interview</strong>
                      <p className="text-[11px] mt-0.5">The physical campus oral assessment is booked for <strong className="font-black underline">{selectedApp.interviewDate}</strong> at <strong className="font-black underline">{selectedApp.interviewTime} hours</strong>.</p>
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Footer Controls */}
              <div className="bg-gray-50 border-t border-gray-100 p-5 flex flex-col sm:flex-row justify-between gap-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateAppStatus(selectedApp.id, 'Approved')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedApp.status === 'Approved'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    Approve Enrollment
                  </button>
                  <button
                    onClick={() => {
                      const d = prompt("Enter interview date (YYYY-MM-DD):", "2026-07-22");
                      const t = prompt("Enter interview time (HH:MM):", "09:30");
                      if (d && t) {
                        const updated = applications.map(app => {
                          if (app.id === selectedApp.id) {
                            return { 
                              ...app, 
                              status: 'Interview Scheduled' as const,
                              interviewDate: d,
                              interviewTime: t
                            };
                          }
                          return app;
                        });
                        updateApplicationsList(updated);
                        setSelectedApp({ 
                          ...selectedApp, 
                          status: 'Interview Scheduled' as const,
                          interviewDate: d,
                          interviewTime: t
                        });
                      }
                    }}
                    className="px-4 py-2 bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Schedule Interview
                  </button>
                </div>

                <div className="flex gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => handleUpdateAppStatus(selectedApp.id, 'Rejected')}
                    className="px-3 py-2 bg-white hover:bg-rose-50 text-rose-600 border border-rose-100 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => setSelectedApp(null)}
                    className="px-4 py-2 bg-[#2E221C] hover:bg-[#110E0C] text-[#FAF6F0] rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Close Dossier
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
