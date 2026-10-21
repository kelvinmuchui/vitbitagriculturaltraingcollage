export interface ResourceArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Courses Guide' | 'Careers & Jobs' | 'Agribusiness' | 'Coffee & Barista' | 'Admissions';
  readTime: string;
  publishedDate: string;
  author: string;
  summary: string;
  metaDescription: string;
  primaryKeyword: string;
  relatedCourseId: string;
  content: {
    sectionHeading: string;
    paragraphs: string[];
    bulletPoints?: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const AGRICULTURAL_RESOURCES: ResourceArticle[] = [
  {
    id: "guide-agriculture-courses-kenya",
    slug: "agriculture-courses-in-kenya",
    title: "Agriculture Courses in Kenya: Complete Guide to Programs, Colleges & Requirements",
    category: "Courses Guide",
    readTime: "6 min read",
    publishedDate: "August 2026",
    author: "VIBIT Academic Board",
    primaryKeyword: "agriculture courses in Kenya",
    relatedCourseId: "coffee-agronomy",
    metaDescription: "Comprehensive guide to agriculture courses in Kenya. Discover diploma, certificate, and short courses in agribusiness, agronomy, coffee technology, and admission requirements.",
    summary: "Agriculture remains the backbone of Kenya's economy, contributing over 33% of GDP. This guide explores the most marketable agricultural courses, entry requirements, career opportunities, and why practical TVET institutions like VIBIT lead the sector.",
    content: [
      {
        sectionHeading: "Why Study Agriculture in Kenya Today?",
        paragraphs: [
          "Kenya's agricultural sector is undergoing a massive transformation powered by value addition, agtech automation, and specialty export commodities such as specialty coffee, avocado, tea, and horticulture. Traditional farming is rapidly shifting into high-return agribusiness enterprises.",
          "Prospective students looking for sustainable, recession-proof careers will find agriculture offering diverse roles in farm management, commodity trading, quality assurance, nursery management, and value-chain processing."
        ],
        bulletPoints: [
          "High market demand for certified agronomy and value-addition specialists across 47 counties",
          "Booming specialty coffee and beverage sector with regional and international export demand",
          "Expanding digital agriculture and precision farming initiatives backed by national policies",
          "Clear entrepreneurial pathways from contract farming to agro-processing and direct trade"
        ]
      },
      {
        sectionHeading: "Types of Agriculture Courses Available at VIBIT",
        paragraphs: [
          "At VIBIT Agricultural Training College in Nairobi, courses are structured to emphasize 80% practical laboratory and field mastery combined with 20% essential theory. Students graduate with job-ready certifications recognized across the industry."
        ],
        bulletPoints: [
          "Certificate in Coffee Agronomy & Crop Health (8 Weeks)",
          "Professional Certificate in Agripreneurship & Export Logistics (8 Weeks)",
          "Diploma & Certificate in Co-operative Governance & Management (1 to 2 Years)",
          "Certificate in AI Applications for Agriculture & Coffee Supply Chain (12 Weeks)",
          "Professional Barista Skills & Commercial Coffee Roasting Certifications"
        ]
      },
      {
        sectionHeading: "Standard Entry Requirements for Agricultural Courses in Kenya",
        paragraphs: [
          "Entry criteria vary depending on the qualification level. VIBIT offers inclusive entry pathways for high school leavers, practicing farmers, cooperative managers, and career switchers."
        ],
        bulletPoints: [
          "Short Certificate & Professional Skills Courses: Open entry — Passion and secondary school background recommended.",
          "Level 3 & 4 Certificate Programs: KCSE D Plain / D+ or equivalent prior experiential learning.",
          "Diploma Programs: KCSE C- (Minus) or a recognized Level 4 Certificate in Agriculture / Agribusiness."
        ]
      }
    ],
    faqs: [
      {
        question: "Which agriculture course is most marketable in Kenya?",
        answer: "Specialized value-addition courses such as Specialty Coffee Technology, Barista Skills, Agripreneurship, and Co-operative Management have the highest marketability due to immediate commercial job demand in cafés, processing mills, and export cooperatives."
      },
      {
        question: "Where is VIBIT Agricultural Training College located?",
        answer: "VIBIT is conveniently located at Leomar Court, 45 Westlands Road, Nairobi, Kenya, offering state-of-the-art sensory labs, roasteries, and agronomy classrooms."
      }
    ]
  },
  {
    id: "guide-agribusiness-kenya",
    slug: "agribusiness-course-in-kenya",
    title: "Agribusiness Courses in Kenya: Career Opportunities, Earnings & Training",
    category: "Agribusiness",
    readTime: "5 min read",
    publishedDate: "August 2026",
    author: "VIBIT Agribusiness Faculty",
    primaryKeyword: "agribusiness course in Kenya",
    relatedCourseId: "agripreneurship-export",
    metaDescription: "Learn how an Agribusiness course in Kenya prepares you for profitable agricultural enterprises, supply chain management, direct commodity export, and farm profitability.",
    summary: "Agribusiness combines the science of agriculture with modern business principles. Discover how VIBIT's Agripreneurship curriculum equips students to build profitable agricultural ventures and navigate global commodity markets.",
    content: [
      {
        sectionHeading: "What is Agribusiness and Why Is It Lucrative?",
        paragraphs: [
          "Agribusiness covers the entire commercial agricultural spectrum: input supply, farm production, post-harvest handling, food processing, logistics, marketing, and retail distribution.",
          "Unlike subsistence farming, agribusiness applies financial modeling, risk mitigation, price hedging, and e-commerce platforms to generate predictable, high-margin revenues."
        ]
      },
      {
        sectionHeading: "Core Competencies Taught in VIBIT's Agripreneurship Program",
        paragraphs: [
          "VIBIT's hands-on Agripreneurship program is specifically designed to transform students into commercial agro-enterprises and export-ready operators."
        ],
        bulletPoints: [
          "Business Model Canvas formulation for smallholder and medium commercial estates",
          "International commodity trading, Direct Trade protocols, and logistics documentation",
          "Agricultural bookkeeping, tax compliance, and cooperative audit standards",
          "Direct Settlement Systems (DSS) integration for coffee and crop payments",
          "Pitching to angel investors, commercial banks, and agricultural grants"
        ]
      },
      {
        sectionHeading: "Career Paths in Modern Agribusiness",
        paragraphs: [
          "Graduates of agribusiness programs work as estate managers, export procurement officers, agricultural loan officers in microfinance, supply chain coordinators, and independent agribusiness entrepreneurs."
        ]
      }
    ],
    faqs: [
      {
        question: "How long does an Agribusiness Certificate take at VIBIT?",
        answer: "VIBIT offers an intensive 8-week Agripreneurship certification with hybrid evening and weekend schedules designed for working professionals and entrepreneurs."
      },
      {
        question: "Can I start an export business after this course?",
        answer: "Yes. The curriculum covers export licensing, phytosanitary requirements, consignment documentation, and direct buyer linkage."
      }
    ]
  },
  {
    id: "guide-agricultural-careers",
    slug: "agricultural-careers-in-kenya",
    title: "Agricultural Careers in Kenya: Top High-Demand Jobs for 2026 and Beyond",
    category: "Careers & Jobs",
    readTime: "5 min read",
    publishedDate: "August 2026",
    author: "VIBIT Career Services",
    primaryKeyword: "agricultural careers in Kenya",
    relatedCourseId: "barista-skills",
    metaDescription: "Explore the highest-paying and most in-demand agricultural careers in Kenya, from Certified Baristas and Coffee Cuppers to Agronomists and Cooperative Managers.",
    summary: "The perception of agriculture has shifted from manual labor to modern, technology-enabled professions. Explore the top agricultural careers in Kenya with exceptional job stability and earning potential.",
    content: [
      {
        sectionHeading: "Top Emerging Careers in Kenya's Agricultural Value Chain",
        paragraphs: [
          "The integration of specialty food & beverage industries, specialty coffee shops, export processing zones, and farmer cooperatives has unlocked exciting high-demand professions."
        ],
        bulletPoints: [
          "Professional Barista & Café Operations Manager: High demand in high-end hospitality in Nairobi, Mombasa, and international cruise liners.",
          "Certified Coffee Cupper & Quality Assurance Grader: Evaluates specialty lots for export houses, paying premium daily and monthly consultancy rates.",
          "Commercial Coffee Roaster: Crafts roast profiles for specialty roasteries and export brands.",
          "Field Agronomist & Crop Consultant: Advises commercial farms on soil health, pest control, and climate-resilient yield optimization.",
          "Co-operative General Manager & Internal Auditor: Leads multi-million shilling SACCOs and agricultural producer societies."
        ]
      },
      {
        sectionHeading: "How VIBIT Facilitates Student Placement",
        paragraphs: [
          "VIBIT maintains direct industry partnerships with leading specialty cafés, commercial roasters, cooperative unions, and agricultural exporters across East Africa. Students receive hands-on internship placement and portfolio development."
        ]
      }
    ],
    faqs: [
      {
        question: "Do Kenyan baristas get international employment opportunities?",
        answer: "Yes! VIBIT's TVET-approved curriculum and internationally aligned barista standards prepare graduates for hospitality jobs in Kenya, the Middle East (Dubai, Qatar, Saudi Arabia), and European cruise lines."
      }
    ]
  },
  {
    id: "guide-coffee-school-nairobi",
    slug: "coffee-school-in-nairobi-training-guide",
    title: "Specialty Coffee Training & Barista Certification in Nairobi: Complete Guide",
    category: "Coffee & Barista",
    readTime: "6 min read",
    publishedDate: "August 2026",
    author: "VIBIT Specialty Coffee Guild",
    primaryKeyword: "coffee school in Nairobi",
    relatedCourseId: "barista-skills",
    metaDescription: "Everything you need to know about barista training, coffee roasting, and cupping courses at VIBIT, Nairobi's premier accredited coffee training college.",
    summary: "Kenya produces some of the world's most prized Arabica coffee. VIBIT Agricultural Training College in Westlands, Nairobi provides world-class coffee training from seed to cup.",
    content: [
      {
        sectionHeading: "Why Nairobi is the Hub of Specialty Coffee Education",
        paragraphs: [
          "Nairobi is the commercial epicenter of African coffee. With top auction houses, specialty cafés, and international export companies headquartered in the city, learning coffee technology in Nairobi offers unmatched networking and immediate career access."
        ]
      },
      {
        sectionHeading: "VIBIT's World-Class Coffee Facilities",
        paragraphs: [
          "Our campus at Leomar Court, 45 Westlands Road, features cutting-edge professional equipment that mirrors real-world commercial environments."
        ],
        bulletPoints: [
          "Espresso Lab: Commercial La Marzocco and Slayer multi-boiler systems with Mythos and Mahlkönig precision grinders.",
          "Commercial Roastery: Drum roasters integrated with Artisan & Cropster profile logging software.",
          "SCA Sensory & Cupping Lab: Standardized cupping tables, calibrated water stations, and aroma analysis kits.",
          "Agri-Tech Greenhouse: Living nursery for botanical genetics, pruning, and wet-processing training."
        ]
      }
    ],
    faqs: [
      {
        question: "Do I need prior experience to join Barista Skills training?",
        answer: "No prior experience is required. The 12-week course starts from foundational espresso mechanics and milk texturing all the way to advanced latte art and café operations."
      }
    ]
  },
  {
    id: "guide-how-to-apply-vibit",
    slug: "how-to-apply-to-vibit-agricultural-training-college",
    title: "How to Apply to VIBIT Agricultural Training College: Requirements, Fees & Intakes",
    category: "Admissions",
    readTime: "4 min read",
    publishedDate: "August 2026",
    author: "VIBIT Admissions Office",
    primaryKeyword: "how to apply to VIBIT Agricultural Training College",
    relatedCourseId: "barista-skills",
    metaDescription: "Step-by-step guide on how to apply for courses at VIBIT Agricultural Training College in Nairobi. View requirements, fee payments, and intake schedules.",
    summary: "Ready to advance your agricultural and coffee career? Follow this easy step-by-step guide to complete your application at VIBIT Agricultural Training College.",
    content: [
      {
        sectionHeading: "Step 1: Choose Your Program of Study",
        paragraphs: [
          "Review our 9 accredited programs in Coffee Barista Skills, Agripreneurship, Coffee Agronomy, Cupping Technology, Roasting, Mixology, AI in AgTech, or Co-operative Management."
        ]
      },
      {
        sectionHeading: "Step 2: Prepare Your Documents",
        paragraphs: [
          "Have the following items ready for submission:"
        ],
        bulletPoints: [
          "Copy of National ID / Passport / Birth Certificate",
          "KCSE Result Slip / Leaving Certificate (for Certificate & Diploma programs)",
          "Two passport-size photographs",
          "Brief statement of interest or career goals"
        ]
      },
      {
        sectionHeading: "Step 3: Submit Online or Visit Our Campus",
        paragraphs: [
          "You can fill out the fast online application form on our website or visit our Admissions Desk at Leomar Court, 45 Westlands Road, Nairobi (Monday to Friday, 8:00 AM – 5:00 PM)."
        ]
      },
      {
        sectionHeading: "Step 4: Admission Letter & Fee Settlement",
        paragraphs: [
          "Successful applicants receive an official TVET Admission Letter within 24–48 hours detailing their reporting date, timetable, and approved fee payment plan."
        ]
      }
    ],
    faqs: [
      {
        question: "When are VIBIT's intakes?",
        answer: "Major intakes run in January, May, and September, while short modular certificate courses admit new students on the first Monday of every month."
      },
      {
        question: "Can I pay tuition in installments?",
        answer: "Yes, VIBIT provides flexible, student-friendly installment payment plans across all certificate and diploma programs."
      }
    ]
  }
];
