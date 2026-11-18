import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, CheckCircle2, Globe2, Microscope, Sprout } from 'lucide-react';
import criFieldPhoto from '../assets/images/facility_soil_analytics_1784976581491.jpg';
import worldVisionFieldPhoto from '../assets/images/agriculture_extension_level_6_fieldwork.jpeg';

interface PartnershipsSectionProps {
  setView: (view: string) => void;
  variant?: 'home' | 'about';
}

export const CoffeeResearchEmblem = ({ className = 'h-10 w-10' }: { className?: string }) => (
  <svg
    viewBox="0 0 44 44"
    fill="none"
    aria-hidden="true"
    className={`${className} shrink-0`}
  >
    <rect x="1.5" y="1.5" width="41" height="41" rx="10" fill="#FAF6F0" stroke="#C28A4E" strokeWidth="1.5" />
    <circle cx="22" cy="22" r="13.5" stroke="#2E221C" strokeWidth="1.2" strokeDasharray="2.5 2" opacity="0.45" />
    <path
      d="M22 10.5v23"
      stroke="#2E221C"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <path
      d="M22 17c-4.8 0-7.5 2.4-7.5 5.4 0 2.9 2.7 5.1 7.5 5.1M22 14.5c4.8 0 7.5 2.4 7.5 5.4 0 2.9-2.7 5.1-7.5 5.1"
      stroke="#14532D"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="22" cy="10.5" r="2.4" fill="#C28A4E" />
  </svg>
);

export const WorldVisionEmblem = ({ className = 'h-10 w-10' }: { className?: string }) => (
  <svg
    viewBox="0 0 44 44"
    fill="none"
    aria-hidden="true"
    className={`${className} shrink-0`}
  >
    <rect x="1.5" y="1.5" width="41" height="41" rx="10" fill="#FFF7ED" stroke="#EA580C" strokeWidth="1.5" />
    <circle cx="22" cy="22" r="12.5" stroke="#2E221C" strokeWidth="1.4" />
    <ellipse cx="22" cy="22" rx="6" ry="12.5" stroke="#C28A4E" strokeWidth="1.3" />
    <path d="M9.8 22h24.4" stroke="#2E221C" strokeWidth="1.2" strokeLinecap="round" />
    <path
      d="M22 13.5l2.2 5.3 5.7.5-4.3 3.7 1.3 5.5-4.9-3-4.9 3 1.3-5.5-4.3-3.7 5.7-.5L22 13.5z"
      fill="#EA580C"
      stroke="#FFF7ED"
      strokeWidth="0.9"
      strokeLinejoin="round"
    />
  </svg>
);

interface PartnerCardData {
  id: string;
  index: string;
  name: string;
  shortRole: string;
  meta: string;
  summary: string;
  outcomes: string[];
  impactMetric: string;
  impactContext: string;
  image: string;
  imageAlt: string;
  emblem: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
}

const PARTNERS: PartnerCardData[] = [
  {
    id: 'coffee-research-institute',
    index: '01',
    name: 'Coffee Research Institute (CRI)',
    shortRole: 'Applied Coffee Agronomy, Varietal Science & Quality Calibration',
    meta: 'Research & Technical Collaboration · Kenya Coffee Value Chain',
    summary:
      'VIBIT collaborates with the Coffee Research Institute to align our agronomy, green-bean grading, and cupping curricula with verified national coffee science—giving trainees direct exposure to climate-resilient cultivars such as Ruiru 11 and Batian.',
    outcomes: [
      'Curriculum alignment on Ruiru 11, Batian, and SL28/SL34 nursery management and disease control',
      'Soil fertility diagnostics, leaf-tissue analysis benchmarks, and sustainable wet-mill processing trials',
      'Guided research bench visits and sensory calibration pathways for Coffee Agronomy & Cupping trainees',
    ],
    impactMetric: 'Seed-to-Cup',
    impactContext: 'Science-backed agronomy & cupping benchmarks',
    image: criFieldPhoto,
    imageAlt: 'VIBIT students conducting coffee soil and laboratory analytics aligned with Coffee Research Institute protocols',
    emblem: <CoffeeResearchEmblem />,
    icon: Microscope,
  },
  {
    id: 'world-vision',
    index: '02',
    name: 'World Vision',
    shortRole: 'Youth Vocational Empowerment, Climate-Smart Farming & Community Livelihoods',
    meta: 'Development & Community Alliance · Smallholder & Youth Pathways',
    summary:
      'Working alongside World Vision community resilience initiatives, VIBIT expands access to accredited TVET hospitality, horticulture, and coffee value-chain training for youth and smallholder cooperative families across Kenya.',
    outcomes: [
      'Vocational training and cooperative skills pathways for youth from rural farming households',
      'Climate-smart agriculture, water-efficient horticulture, and post-harvest value-addition training',
      'Community extension linkages connecting graduates to county cooperatives and agripreneurship hubs',
    ],
    impactMetric: 'Inclusive TVET',
    impactContext: 'Community & youth agribusiness pathways',
    image: worldVisionFieldPhoto,
    imageAlt: 'VIBIT agriculture extension trainees engaged in community fieldwork supporting World Vision livelihood objectives',
    emblem: <WorldVisionEmblem />,
    icon: Globe2,
  },
];

export default function PartnershipsSection({ setView, variant = 'home' }: PartnershipsSectionProps) {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const navigateTo = (target: string) => {
    setView(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="strategic-partnerships"
      aria-labelledby="partnerships-heading"
      className={variant === 'about'
        ? 'bg-[#FAF6F0]/60 py-20 border-y border-[#2E221C]/10'
        : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}
    >
      <div className={variant === 'about' ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12' : 'space-y-12'}>
        {/* Editorial Section Header */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#2E221C]/10 pb-8"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
        >
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C28A4E]">
              Strategic Institutional Partnerships
            </p>
            <h2
              id="partnerships-heading"
              className="font-serif text-3xl sm:text-4xl font-bold text-[#2E221C] leading-tight [text-wrap:balance]"
            >
              Partnering With Leading Research &amp; Humanitarian Institutions
            </h2>
            <p className="text-sm sm:text-base text-[#2E221C]/75 leading-relaxed">
              Our academic standards and community outreach are strengthened through active collaboration with Kenya&apos;s foremost coffee research authority and global community development leadership.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              id="partnerships-apply-btn"
              onClick={() => navigateTo('admissions')}
              className="inline-flex items-center justify-center gap-2 bg-[#2E221C] hover:bg-[#110E0C] text-[#FAF6F0] font-bold text-xs px-5 py-3.5 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Apply for Intake</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              id="partnerships-contact-btn"
              onClick={() => navigateTo('contact')}
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FAF6F0] text-[#2E221C] border border-[#2E221C]/20 font-bold text-xs px-5 py-3.5 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Partnership Desk</span>
              <BookOpen className="h-4 w-4 text-[#C28A4E]" />
            </button>
          </div>
        </motion.div>

        {/* Two-Column Partner Dossiers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {PARTNERS.map((partner, idx) => {
            const FallbackIcon = partner.icon;
            const hasFailed = Boolean(failedImages[partner.id]);

            return (
              <motion.article
                key={partner.id}
                id={`partner-card-${partner.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="bg-white border border-[#2E221C]/10 rounded-3xl overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1"
              >
                <div>
                  {/* Editorial Media Header */}
                  <div className="relative aspect-[16/9] bg-[#2E221C] overflow-hidden">
                    {!hasFailed ? (
                      <img
                        src={partner.image}
                        alt={partner.imageAlt}
                        referrerPolicy="no-referrer"
                        onError={() => setFailedImages((prev) => ({ ...prev, [partner.id]: true }))}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#2E221C] to-[#4A372D] text-[#FAF6F0] p-6 text-center">
                        <FallbackIcon className="h-10 w-10 text-[#C28A4E]" />
                        <span className="font-serif text-lg font-bold">{partner.name}</span>
                      </div>
                    )}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#1A120E]/90 via-[#1A120E]/30 to-transparent"
                    />
                    <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4 text-white">
                      <div>
                        <p className="text-[11px] font-mono tracking-wider text-[#E5B885]">
                          {partner.index}. Strategic Alliance
                        </p>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">
                          {partner.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Dossier Body */}
                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="flex items-start gap-4">
                      {partner.emblem}
                      <div className="space-y-1 min-w-0">
                        <p className="text-xs font-medium text-[#8E7C74]">
                          {partner.meta}
                        </p>
                        <p className="text-sm font-bold text-[#2E221C] leading-snug">
                          {partner.shortRole}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-[#2E221C]/80 leading-relaxed">
                      {partner.summary}
                    </p>

                    <div className="pt-4 border-t border-[#2E221C]/10 space-y-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#8E7C74]">
                        Key Collaboration Areas
                      </p>
                      <ul className="space-y-2.5">
                        {partner.outcomes.map((item, oIdx) => (
                          <li key={oIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2E221C]/85 leading-relaxed">
                            <CheckCircle2 className="h-4 w-4 text-[#C28A4E] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Partner Footer Strip */}
                <div className="px-6 sm:px-8 py-4 bg-[#FAF6F0] border-t border-[#2E221C]/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-[#2E221C]/75">
                    <strong className="font-bold text-[#2E221C]">{partner.impactMetric}</strong>
                    <span className="mx-2 text-[#8E7C74]" aria-hidden="true">·</span>
                    <span>{partner.impactContext}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateTo('courses')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A4713C] hover:text-[#2E221C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Explore Aligned Courses</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Institutional Governance & Network Footer Ribbon */}
        <div className="bg-white border border-[#2E221C]/10 rounded-2xl px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs sm:text-sm text-[#2E221C]/85">
            <Sprout className="h-5 w-5 text-[#C28A4E] shrink-0" />
            <span>
              Aligned with <strong>TVET Authority</strong> (Reg: <span className="font-mono tabular-nums">TVATA/PRIVATE/TVC/0158/2026</span>), <strong>Specialty Coffee Association (SCA)</strong>, <strong>Coffee Research Institute</strong>, and <strong>World Vision</strong> community frameworks.
            </span>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('about')}
            className="text-xs font-bold text-[#2E221C] hover:text-[#C28A4E] underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 self-start md:self-auto cursor-pointer"
          >
            Read Institutional Mandate
          </button>
        </div>
      </div>
    </section>
  );
}
