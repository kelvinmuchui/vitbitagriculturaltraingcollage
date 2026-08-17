import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, ArrowRight, ShieldAlert, Sparkles, HelpCircle, ExternalLink } from 'lucide-react';

// Custom SVG Icons for WhatsApp, Facebook, Instagram
const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const FacebookIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TikTokIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.89-2.88 2.89 2.89 0 0 1 2.89-2.88c.28 0 .54.04.79.1v-3.52a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.14 15.65 6.34 6.34 0 0 0 9.48 22a6.34 6.34 0 0 0 6.34-6.35V8.71a8.18 8.18 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.14z" />
  </svg>
);

// Import our real student and campus photos
import contactCampusImage from '../assets/images/contact_campus_image_1784976397743.jpg';

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
    { sender: 'bot', text: 'Jambo! I am VIBIT Registrar Bot. How can I help you navigate our coffee and agribusiness programs today?' }
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
      a: "As a registered TVET institution, VIBIT admits government-sponsored students through the KUCCPS placement portal. Students can also apply for tuition support loans through the Higher Education Loans Board (HELB)."
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
    <div className="space-y-24 pt-8 pb-20" id="contact-view">
      
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
              {/* Location Link */}
              <motion.li 
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <a
                  href="https://maps.google.com/?q=Leomar+Court,+45+Westlands+Road,+Nairobi,+Kenya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-4 group cursor-pointer"
                >
                  <div className="bg-[#C28A4E]/10 group-hover:bg-[#C28A4E] group-hover:text-white p-3.5 rounded-xl text-[#C28A4E] shrink-0 transition-colors">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-[#2E221C] group-hover:text-[#C28A4E] transition-colors flex items-center space-x-1.5">
                      <span>Campus Location</span>
                      <ExternalLink className="h-3 w-3 text-[#C28A4E]" />
                    </h4>
                    <p className="text-xs text-[#2E221C]/75 leading-relaxed underline decoration-dotted">Leomar Court, 45 Westlands Road, Nairobi, Kenya</p>
                  </div>
                </a>
              </motion.li>
              
              {/* Phone Link */}
              <motion.li 
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <a 
                  href="tel:0708137992"
                  className="flex items-start space-x-4 group cursor-pointer"
                >
                  <div className="bg-[#C28A4E]/10 group-hover:bg-[#C28A4E] group-hover:text-white p-3.5 rounded-xl text-[#C28A4E] shrink-0 transition-colors">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-[#2E221C] group-hover:text-[#C28A4E] transition-colors flex items-center space-x-1.5">
                      <span>Direct Dial Lines</span>
                      <ExternalLink className="h-3 w-3 text-[#C28A4E]" />
                    </h4>
                    <p className="text-xs text-[#2E221C]/90 font-bold hover:underline">0708 137992 / +254 708 137992</p>
                    <p className="text-[10px] text-[#8E7C74]">Admissions desk open Mon-Fri 8am-5pm, Sat 8am-1pm</p>
                  </div>
                </a>
              </motion.li>

              {/* WhatsApp Contact Item */}
              <motion.li 
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <a
                  href="https://wa.me/254708137992?text=Hello%20VIBIT%20College%20Registrar%2C%20I%20have%20an%20inquiry%20regarding%20admission%20and%20courses."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-4 group cursor-pointer"
                >
                  <div className="bg-emerald-500/10 group-hover:bg-emerald-600 group-hover:text-white p-3.5 rounded-xl text-emerald-600 shrink-0 border border-emerald-500/20 transition-colors">
                    <WhatsAppIcon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-[#2E221C] flex items-center space-x-2 group-hover:text-emerald-700 transition-colors">
                      <span>WhatsApp Registrar Chat</span>
                      <span className="bg-emerald-500/15 text-emerald-700 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border border-emerald-500/30">Active</span>
                    </h4>
                    <p className="text-xs text-[#2E221C]/90 font-bold hover:underline">+254 708 137992</p>
                    <div className="pt-1">
                      <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 group-hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors">
                        <span>Chat on WhatsApp</span>
                        <ExternalLink className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </a>
              </motion.li>

              {/* Email Link */}
              <motion.li 
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <a 
                  href="mailto:vbitschoolofcoffeagribusiness@gmail.com"
                  className="flex items-start space-x-4 group cursor-pointer"
                >
                  <div className="bg-[#C28A4E]/10 group-hover:bg-[#C28A4E] group-hover:text-white p-3.5 rounded-xl text-[#C28A4E] shrink-0 transition-colors">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-[#2E221C] group-hover:text-[#C28A4E] transition-colors flex items-center space-x-1.5">
                      <span>Registrar Registry Email</span>
                      <ExternalLink className="h-3 w-3 text-[#C28A4E]" />
                    </h4>
                    <p className="text-xs text-[#2E221C]/90 font-semibold hover:underline">vbitschoolofcoffeagribusiness@gmail.com</p>
                    <p className="text-[10px] text-[#8E7C74]">Average reply timeline: 24 working hours</p>
                  </div>
                </a>
              </motion.li>

              {/* Social Channels Quick Row */}
              <motion.li 
                className="flex items-start space-x-4"
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="bg-[#2E221C]/10 p-3.5 rounded-xl text-[#2E221C] shrink-0">
                  <Sparkles className="h-6 w-6 text-[#C28A4E]" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-sm text-[#2E221C]">Social Media Handles</h4>
                  <div className="flex flex-wrap items-center gap-2 pt-0.5">
                    <a 
                      href="https://facebook.com/vibitagriculturalcollege" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors shadow-2xs"
                    >
                      <FacebookIcon className="h-3.5 w-3.5" />
                      <span>Facebook</span>
                      <ExternalLink className="h-2.5 w-2.5 ml-0.5" />
                    </a>
                    <a 
                      href="https://instagram.com/vibit_agricultural_college" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs font-bold text-pink-700 bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-lg border border-pink-200 transition-colors shadow-2xs"
                    >
                      <InstagramIcon className="h-3.5 w-3.5" />
                      <span>Instagram</span>
                      <ExternalLink className="h-2.5 w-2.5 ml-0.5" />
                    </a>
                    <a 
                      href="https://www.tiktok.com/@vbit_shool" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs font-bold text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg border border-gray-300 transition-colors shadow-2xs"
                    >
                      <TikTokIcon className="h-3.5 w-3.5" />
                      <span>TikTok (@vbit shool)</span>
                      <ExternalLink className="h-2.5 w-2.5 ml-0.5" />
                    </a>
                  </div>
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

      {/* 2.5 INSTANT CONNECT: WHATSAPP, FACEBOOK, INSTAGRAM & TIKTOK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="bg-[#FAF6F0] border border-[#2E221C]/10 rounded-3xl p-6 sm:p-10 shadow-md space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C28A4E] bg-white px-3.5 py-1 rounded-full border border-[#C28A4E]/30 inline-block shadow-xs">
              Direct Social & Messaging Hub
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E221C]">
              Connect With VIBIT Registrars Online
            </h2>
            <p className="text-xs sm:text-sm text-[#2E221C]/75 leading-relaxed">
              Reach out via instant WhatsApp messaging or follow our official social handles for admissions advice, barista masterclasses, practical videos, and campus events.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* WhatsApp Card */}
            <motion.div 
              className="bg-white rounded-2xl p-6 border-2 border-emerald-500/20 shadow-md hover:shadow-xl transition-all space-y-5 flex flex-col justify-between group"
              whileHover={{ y: -5 }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                    <WhatsAppIcon className="h-7 w-7" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                    Official WhatsApp
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2E221C]">WhatsApp Help Desk</h3>
                  <p className="text-xs font-mono font-bold text-emerald-700 mt-1">+254 708 137992</p>
                </div>
                <p className="text-xs text-[#2E221C]/70 leading-relaxed">
                  Chat directly with our student counselor desk for entry requirements, fee breakdowns, and campus visit scheduling.
                </p>
              </div>

              <a
                id="contact-whatsapp-btn"
                href="https://wa.me/254708137992?text=Hello%20VIBIT%20College%20Registrar%2C%20I%20have%20an%20inquiry%20regarding%20admission%20and%20courses."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer font-sans"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>Chat WhatsApp</span>
              </a>
            </motion.div>

            {/* Facebook Card */}
            <motion.div 
              className="bg-white rounded-2xl p-6 border-2 border-blue-500/20 shadow-md hover:shadow-xl transition-all space-y-5 flex flex-col justify-between group"
              whileHover={{ y: -5 }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                    <FacebookIcon className="h-7 w-7" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
                    Official Page
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2E221C]">Facebook Community</h3>
                  <p className="text-xs font-medium text-blue-700 mt-1">@vibitagriculturalcollege</p>
                </div>
                <p className="text-xs text-[#2E221C]/70 leading-relaxed">
                  Join our official Facebook community for college announcements, student graduation streams, and coffee industry news.
                </p>
              </div>

              <a
                id="contact-facebook-btn"
                href="https://facebook.com/vibitagriculturalcollege"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer font-sans"
              >
                <FacebookIcon className="h-4 w-4" />
                <span>Visit Facebook</span>
              </a>
            </motion.div>

            {/* Instagram Card */}
            <motion.div 
              className="bg-white rounded-2xl p-6 border-2 border-pink-500/20 shadow-md hover:shadow-xl transition-all space-y-5 flex flex-col justify-between group"
              whileHover={{ y: -5 }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <InstagramIcon className="h-7 w-7" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-pink-700 bg-pink-50 border border-pink-200 px-2.5 py-1 rounded-full">
                    Campus Feed
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2E221C]">Instagram Gallery</h3>
                  <p className="text-xs font-medium text-pink-700 mt-1">@vibit_agricultural_college</p>
                </div>
                <p className="text-xs text-[#2E221C]/70 leading-relaxed">
                  Explore behind-the-scenes moments in our cupping labs, barista arts stages, commercial roasting, and greenhouse farms.
                </p>
              </div>

              <a
                id="contact-instagram-btn"
                href="https://instagram.com/vibit_agricultural_college"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:opacity-95 text-white font-bold text-xs py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer font-sans"
              >
                <InstagramIcon className="h-4 w-4" />
                <span>Follow Instagram</span>
              </a>
            </motion.div>

            {/* TikTok Card */}
            <motion.div 
              className="bg-white rounded-2xl p-6 border-2 border-gray-900/20 shadow-md hover:shadow-xl transition-all space-y-5 flex flex-col justify-between group"
              whileHover={{ y: -5 }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 bg-gray-900 text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <TikTokIcon className="h-7 w-7" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-900 bg-gray-100 border border-gray-300 px-2.5 py-1 rounded-full">
                    TikTok Official
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2E221C]">TikTok Channel</h3>
                  <p className="text-xs font-bold text-gray-900 mt-1">vbit shool (@vbit_shool)</p>
                </div>
                <p className="text-xs text-[#2E221C]/70 leading-relaxed">
                  Watch quick barista hacks, latte art tutorials, coffee roasting clips, and student campus life on our official TikTok.
                </p>
              </div>

              <a
                id="contact-tiktok-btn"
                href="https://www.tiktok.com/@vbit_shool"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gray-900 hover:bg-black text-white font-bold text-xs py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer font-sans"
              >
                <TikTokIcon className="h-4 w-4" />
                <span>Follow on TikTok</span>
              </a>
            </motion.div>

          </div>
        </motion.div>
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
              VIBIT Instant Registrar Chat
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
                href="mailto:vbitschoolofcoffeagribusiness@gmail.com?subject=Campus%20Tour%20Request"
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
