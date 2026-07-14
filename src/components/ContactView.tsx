import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, ArrowRight, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';

// Import our real student and campus photos
import studentsBuilding from '../assets/images/students_building_1783338059168.jpg';

export default function ContactView() {
  // Contact Form State
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  // Chatbot State
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: 'Jambo! I am VBIT Registrar Bot. How can I help you navigate our coffee and agribusiness programs today?' }
  ]);

  const faqQuestions = [
    {
      q: "What are the entry grade requirements?",
      a: "For our TVET Diplomas (such as Agribusiness), a KCSE Grade C- (or international equivalent secondary certificate) is required. For our Certificates, a Grade D is standard. Short Courses and Professional Masterclasses have zero academic prerequisites!"
    },
    {
      q: "Are there evening or weekend shifts?",
      a: "Yes! Our Certificate in Barista Arts offers intensive evening classes (Mon-Fri, 5:30 PM - 8:30 PM). Our Commercial Roasting Masterclass runs on alternating weekends (Saturdays & Sundays) to accommodate working professionals."
    },
    {
      q: "How do I secure government TVET funding?",
      a: "As a registered TVET institution, VBIT admits government-sponsored students through the KUCCPS placement portal. Students can also apply for tuition support loans through the Higher Education Loans Board (HELB)."
    },
    {
      q: "Can international students apply?",
      a: "Absolutely! We admit students from across the East African Community and globally. Our international relations desk coordinates student visas, local housing, and orientation before you arrive."
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      setForm({ name: '', email: '', subject: 'general', message: '' });
      setTimeout(() => setSentSuccess(false), 5000);
    }, 1200);
  };

  const handleFAQClick = (q: string, a: string) => {
    // Append question to chat, then bot answer immediately
    setChatHistory(prev => [
      ...prev,
      { sender: 'user', text: q },
      { sender: 'bot', text: a }
    ]);
  };

  return (
    <div className="space-y-24 pb-20" id="contact-view">
      
      {/* 1. HERO */}
      <section className="relative py-24 flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={studentsBuilding}
            alt="Contact Registrars" 
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
            Admissions Registry
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">
            Your Bridge to the <br />
            <span className="text-[#C28A4E]">Global Coffee Market</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-gray-300 leading-relaxed">
            Have questions about credits, campus tours, or enrollment procedures? Reach out to our valley registrar office or chat with our automated support bot below.
          </p>
        </motion.div>
      </section>

      {/* 2. CORE DETAILS & FORM GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Details Left (5 cols) */}
          <motion.div 
            className="lg:col-span-5 space-y-10"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#C28A4E]">Get in Touch</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E221C]">Registrar Support Offices</h2>
              <p className="text-xs text-[#2E221C]/75 leading-relaxed">
                Our administrative board is available daily to address admission audits, housing configurations, cooperative alignments, and syllabus inquiries.
              </p>
            </div>

            {/* Contacts Stack */}
            <ul className="space-y-6">
              <motion.li 
                className="flex items-start space-x-4"
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="bg-[#C28A4E]/10 p-3.5 rounded-xl text-[#C28A4E] shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-[#2E221C]">Campus Location</h4>
                  <p className="text-xs text-[#2E221C]/75 leading-relaxed">Leomar Court, Westlands Road No. 45, Nairobi, Kenya</p>
                </div>
              </motion.li>
              
              <motion.li 
                className="flex items-start space-x-4"
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="bg-[#C28A4E]/10 p-3.5 rounded-xl text-[#C28A4E] shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-[#2E221C]">Direct Dial lines</h4>
                  <p className="text-xs text-[#2E221C]/75">+254 708 137992</p>
                  <p className="text-[10px] text-[#8E7C74]">Toll-Free during academic intake periods</p>
                </div>
              </motion.li>

              <motion.li 
                className="flex items-start space-x-4"
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="bg-[#C28A4E]/10 p-3.5 rounded-xl text-[#C28A4E] shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-[#2E221C]">Registrar Registry Email</h4>
                  <p className="text-xs text-[#2E221C]/75">info@vibiagriculrturaltraningcollege.co.ke</p>
                  <p className="text-[10px] text-[#8E7C74]">Average reply timeline: 24 working hours</p>
                </div>
              </motion.li>
            </ul>

            {/* Accreditations badge */}
            <div className="bg-[#2E221C]/5 p-5 rounded-2xl border-l-4 border-[#C28A4E] text-xs text-[#2E221C]/80 leading-relaxed">
              <strong>Approved TVET Institution:</strong> Licensed by the Ministry of Education, State Department for Vocational and Technical Training. Registration Number: TVET/COFFEE/2024/098.
            </div>
          </motion.div>

          {/* Form Right (7 cols) */}
          <motion.div 
            className="lg:col-span-7 bg-white border border-[#2E221C]/10 rounded-3xl p-6 sm:p-10 shadow-lg"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif text-xl font-bold text-[#2E221C] border-b border-[#2E221C]/5 pb-4 mb-6">Send an Academic Inquiry</h3>
            
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#2E221C] uppercase tracking-wider" htmlFor="contact-name">Your Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    id="contact-name"
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Samuel Mwangi"
                    className="w-full bg-[#FAF6F0] border border-[#2E221C]/15 rounded-xl px-4 py-3 text-xs text-[#2E221C] focus:border-[#C28A4E] focus:bg-white transition-all shadow-inner"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#2E221C] uppercase tracking-wider" htmlFor="contact-email">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    id="contact-email"
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="e.g. sam@gmail.com"
                    className="w-full bg-[#FAF6F0] border border-[#2E221C]/15 rounded-xl px-4 py-3 text-xs text-[#2E221C] focus:border-[#C28A4E] focus:bg-white transition-all shadow-inner"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#2E221C] uppercase tracking-wider" htmlFor="contact-subject">Inquiry Subject *</label>
                <select
                  name="subject"
                  id="contact-subject"
                  value={form.subject}
                  onChange={handleInputChange}
                  className="w-full bg-[#FAF6F0] border border-[#2E221C]/15 rounded-xl px-4 py-3 text-xs text-[#2E221C] focus:border-[#C28A4E] focus:bg-white transition-all shadow-inner"
                >
                  <option value="general">General Admissions / Enrollment Requirements</option>
                  <option value="fees">Tuition & Installment Plan Questions</option>
                  <option value="housing">On-Campus Student Housing & Dining</option>
                  <option value="coop">Agricultural Cooperative Partnerships</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#2E221C] uppercase tracking-wider" htmlFor="contact-message">Inquiry Message *</label>
                <textarea
                  name="message"
                  id="contact-message"
                  rows={4}
                  value={form.message}
                  onChange={handleInputChange}
                  placeholder="Detail your request..."
                  className="w-full bg-[#FAF6F0] border border-[#2E221C]/15 rounded-xl px-4 py-3 text-xs text-[#2E221C] focus:border-[#C28A4E] focus:bg-white transition-all shadow-inner"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                id="submit-contact-form"
                disabled={isSending}
                className="w-full bg-[#C28A4E] hover:bg-[#A4713C] text-white font-bold text-xs py-3.5 rounded-xl tracking-wide shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                {isSending ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending Inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Deliver Message</span>
                    <Send className="h-3.5 w-3.5" />
                  </>
                )}
              </button>

              {sentSuccess && (
                <div className="flex items-center space-x-2 text-xs text-green-800 bg-green-500/10 p-3 rounded-xl border border-green-500/20">
                  <CheckCircle2 className="h-4.5 w-4.5 text-green-800 shrink-0" />
                  <span>Success! Your inquiry has been delivered safely to our registrar registry.</span>
                </div>
              )}

            </form>
          </motion.div>

        </div>
      </section>

      {/* 3. INTERACTIVE CHAT HELPER (INTELLIGENT FAQ BOT) */}
      <section className="bg-[#FAF6F0]/50 py-24 border-y border-[#2E221C]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <motion.div 
            className="text-center space-y-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C28A4E]">Instant Helper</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E221C]">
              VBIT Instant Registrar Chat
            </h2>
            <p className="text-sm text-[#2E221C]/70">
              Have immediate questions? Click one of our official query cards below to chat directly with our knowledge-base simulator.
            </p>
          </motion.div>

          <div className="bg-white border border-[#2E221C]/15 rounded-3xl p-6 sm:p-8 shadow-lg max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch h-[540px]">
            
            {/* Cards Left (5 cols) */}
            <div className="md:col-span-5 flex flex-col justify-between space-y-4">
              <span className="text-[10px] uppercase font-bold text-[#8E7C74] tracking-wider block">Frequently Asked Queries:</span>
              
              <div className="space-y-3 flex-grow overflow-y-auto pr-1">
                {faqQuestions.map((faq, idx) => (
                  <motion.button
                    key={idx}
                    id={`faq-btn-${idx}`}
                    onClick={() => handleFAQClick(faq.q, faq.a)}
                    className="w-full text-left bg-[#FAF6F0] hover:bg-[#C28A4E]/10 border border-[#2E221C]/10 p-3.5 rounded-xl transition-all flex items-start space-x-2.5 group cursor-pointer"
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <HelpCircle className="h-4 w-4 text-[#C28A4E] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-bold text-[#2E221C] leading-snug">{faq.q}</span>
                  </motion.button>
                ))}
              </div>

              <div className="bg-[#2E221C] text-white p-3.5 rounded-xl border border-white/10 text-[10px] leading-relaxed">
                Can't find what you need? Fill our inquiry form above or dial our helpline.
              </div>
            </div>

            {/* Chat Area Right (7 cols) */}
            <div className="md:col-span-7 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#2E221C]/10 pt-6 md:pt-0 md:pl-6 h-full">
              
              {/* Header */}
              <div className="flex items-center space-x-2.5 border-b border-[#2E221C]/5 pb-3 shrink-0">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-ping"></div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-4.5 w-4.5 text-[#C28A4E]" />
                  <span className="text-xs font-bold text-[#2E221C]">Academic Assistant Bot</span>
                </div>
              </div>

              {/* Chat Message Logs */}
              <div className="flex-grow overflow-y-auto py-4 space-y-4 text-xs pr-1" id="chat-messages-container">
                <AnimatePresence initial={false}>
                  {chatHistory.map((msg, i) => (
                    <motion.div
                      key={i}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#2E221C] text-white rounded-tr-none shadow-sm'
                          : 'bg-[#FAF6F0] text-[#2E221C] rounded-tl-none border border-[#2E221C]/10 shadow-sm'
                      }`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Input simulator (visual) */}
              <div className="border-t border-[#2E221C]/5 pt-3 flex space-x-2 shrink-0">
                <input
                  type="text"
                  placeholder="Query simulator - please use cards left..."
                  disabled
                  className="w-full bg-[#FAF6F0]/50 border border-[#2E221C]/10 rounded-xl px-3 py-2.5 text-[11px] text-gray-400 cursor-not-allowed"
                />
                <button disabled className="bg-gray-200 text-gray-400 p-2.5 rounded-xl cursor-not-allowed">
                  <Send className="h-4 w-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. STATIC VECTOR BLUEPRINT MAP (GEOGRAPHY FOCUS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#2E221C]/10 rounded-3xl p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Left (8 cols) - Stylized Vector Campus Layout */}
          <motion.div 
            className="lg:col-span-7 bg-[#FAF6F0] rounded-2xl p-6 border border-[#2E221C]/10 relative overflow-hidden flex flex-col justify-between h-[360px]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            
            <div className="absolute top-0 right-0 h-44 w-44 bg-[#C28A4E]/5 rounded-full filter blur-xl"></div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4.5 w-4.5 text-[#C28A4E]" />
                <span className="text-[10px] uppercase font-bold text-[#8E7C74] tracking-wider">Campus Map Architecture</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2E221C]">Westlands Main Campus Layout</h3>
              
              {/* Graphic Mock Blueprint representation */}
              <div className="grid grid-cols-2 gap-4 pt-4 text-xs">
                <div className="p-3 bg-white rounded-xl border border-[#C28A4E]/20 space-y-1">
                  <strong className="text-gray-800">Section A: Sensory Labs</strong>
                  <p className="text-[10px] text-gray-500">Includes SCA Cupping tables & roasting workshop stations</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#C28A4E]/20 space-y-1">
                  <strong className="text-gray-800">Section B: Botanical Greenhouse</strong>
                  <p className="text-[10px] text-gray-500">Live nursery cultivars & soil health analysis bays</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#C28A4E]/20 space-y-1">
                  <strong className="text-gray-800">Section C: Agribusiness Center</strong>
                  <p className="text-[10px] text-gray-500">Academic registrar offices, classrooms, and lecture theaters</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#C28A4E]/20 space-y-1">
                  <strong className="text-gray-800">Section D: Barista Stage & Cafe</strong>
                  <p className="text-[10px] text-gray-500">High-volume barista simulation & championship staging</p>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-[#8E7C74] border-t border-[#2E221C]/5 pt-3 font-semibold mt-4">
              Leomar Court, Westlands Road No. 45, Nairobi, Kenya
            </div>
          </motion.div>

          {/* Details Right (5 cols) */}
          <motion.div 
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C28A4E]">Physical Visits</span>
            <h3 className="font-serif text-2xl font-bold text-[#2E221C]">Schedule a Guided Campus Tour</h3>
            <p className="text-xs text-[#2E221C]/75 leading-relaxed">
              We host open-day campus tours every Tuesday and Thursday at 10:00 AM. Experience our cupping laboratories in active operation, sample artisan micro-lots roasted by our students, and discuss career prospects directly with our agronomy mentors.
            </p>
            <div className="pt-2">
              <a
                href="mailto:info@vibiagriculrturaltraningcollege.co.ke?subject=Campus%20Tour%20Request"
                className="inline-flex items-center space-x-2 bg-[#2E221C] hover:bg-[#110E0C] text-white px-5 py-3 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <span>Request Tour Invitation</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
}
