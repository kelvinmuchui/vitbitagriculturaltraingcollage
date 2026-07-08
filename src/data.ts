import { Course, Facility, Testimonial, EnrollmentStep } from './types';

// Import our real campus and student images
import studentsBuilding from './assets/images/students_building_1783338059168.jpeg';
import baristaSmoothies from './assets/images/barista_smoothies_1783338078505.jpeg';
import latteArtTable from './assets/images/latte_art_table_1783338092054.jpeg';
import latteArtTopdown from './assets/images/latte_art_topdown_1783338101365.jpg';
import studentsAccreditation from './assets/images/students_accreditation_1783338111803.jpeg';
import coffeeCherriesDrying from './assets/images/coffee_cherries_drying_1783338132429.jpg';
import sortingBeans from './assets/images/sorting_beans_1783338143134.jpg';
import cocktailBar from './assets/images/cocktail_bar_1783338176140.jpeg';
import latteArtCup from './assets/images/latte_art_cup_1783338158532.jpg';

export const LOGO_URL = ""; // Empty string or placeholder since we are using the new React <Logo /> component!

export const COURSES: Course[] = [
  // 1. Certificates (Duration: 6-12 Months)
  {
    id: "cert-production",
    title: "Certificate in Coffee Production",
    category: "certificate",
    duration: "6–12 Months",
    level: "Beginner to Intermediate",
    certification: "TVET Board Approved Level 4 Certificate in Coffee Production",
    description: "Equips learners with foundational knowledge and practical skills in soil preparation, coffee botany, climate-smart agronomy, nursery management, and harvesting.",
    syllabus: [
      "Introduction to Coffee Botany & Cultivar Selection",
      "Nursery Setup, Propagation & Shading Dynamics",
      "Soil Health, Nutrition & Organic Fertilization",
      "Pest, Weed & Disease Management",
      "Harvesting Standards & Selective Cherry Picking"
    ],
    image: sortingBeans,
    fees: {
      tuition: 65000,
      labFee: 10000,
      deposit: 5000
    },
    schedule: "Full-Time (Mon - Fri, 8:00 AM - 4:00 PM)"
  },
  {
    id: "cert-processing",
    title: "Certificate in Coffee Processing & Quality",
    category: "certificate",
    duration: "6–12 Months",
    level: "Beginner to Intermediate",
    certification: "TVET Board Approved Level 4 Certificate in Processing & Sorting",
    description: "Dive deep into post-harvest methods including wet processing, ecological pulping, fermentation, drying bed management, and dry milling quality standards.",
    syllabus: [
      "Post-Harvest Chemistry & Fruit Biology",
      "Wet Milling Operations & Eco-Pulping Systems",
      "Fermentation Dynamics & Controlled Washing Protocols",
      "Solar Parabolic & Raised Drying Bed Management",
      "Dry Milling Principles & Grading Mechanics"
    ],
    image: coffeeCherriesDrying,
    fees: {
      tuition: 70000,
      labFee: 15000,
      deposit: 6000
    },
    schedule: "Full-Time or Intensive Block Mode"
  },
  {
    id: "cert-barista-brewing",
    title: "Certificate in Barista & Brewing Skills",
    category: "certificate",
    duration: "6–12 Months",
    level: "Beginner to Intermediate",
    certification: "SCA Aligned Proficiency & TVET Level 4 Certificate",
    description: "Equips learners with hands-on skills in espresso extraction, brewing methods, milk chemistry, latte art, and café operations.",
    syllabus: [
      "Espresso Extraction Science & Grind Calibration",
      "Manual Brewing Methods (V60, Chemex, Aeropress, French Press)",
      "Milk Chemistry, Micro-Foam Texturing & Latte Art",
      "Sensory Analysis Foundations & Flavor Profile Evaluation",
      "Cafe Workflow Management & Equipment Maintenance"
    ],
    image: latteArtCup,
    fees: {
      tuition: 85000,
      labFee: 20000,
      deposit: 8000
    },
    schedule: "Full-Time or Afternoon Intensive (Mon - Fri)"
  },

  // 2. Diplomas (Duration: 1-2 Years)
  {
    id: "diploma-tech",
    title: "Diploma in Coffee Technology",
    category: "diploma",
    duration: "1–2 Years",
    level: "Intermediate to Advanced",
    certification: "TVET National Diploma in Coffee Technology",
    description: "Advanced coffee processing, fermentation techniques, milling operations, grading, equipment maintenance, and quality assurance systems.",
    syllabus: [
      "Biochemistry of Coffee Fermentation & Microbial Control",
      "Industrial Coffee Processing Machinery & Eco-Pulper Maintenance",
      "Commercial Roasting Thermodynamics & Heat Profile Optimization",
      "Dry Mill Engineering & Sorting Loss Auditing",
      "Quality Assurance Systems & Organic Standards Compliance"
    ],
    image: coffeeCherriesDrying,
    fees: {
      tuition: 110000,
      labFee: 20000,
      deposit: 10000
    },
    schedule: "Full-Time (Mon - Fri, 8:30 AM - 4:30 PM)"
  },
  {
    id: "diploma-sensory",
    title: "Diploma in Coffee Quality & Sensory Analysis",
    category: "diploma",
    duration: "1–2 Years",
    level: "Intermediate to Advanced",
    certification: "TVET National Diploma in Specialty Coffee Grading & Sensory Arts",
    description: "Become an elite cupper, grading expert, or Q-grader. Master olfaction exercises, organic acid identification, blind triangulation, and commercial defect evaluation.",
    syllabus: [
      "Le Nez du Café: Olfactory Reference Library Training",
      "Gustatory Training: Identifying Organic Acids & Sweets",
      "SCA Cupping Protocols & Sample Roasting Management",
      "Triangulation Drills & Specialty Lot Authentication",
      "Water Chemistry Standards & Flavor Profile Engineering"
    ],
    image: latteArtTable,
    fees: {
      tuition: 115000,
      labFee: 25000,
      deposit: 10000
    },
    schedule: "Full-Time or Evening Block Release"
  },
  {
    id: "diploma-marketing",
    title: "Diploma in Coffee Marketing & Export Management",
    category: "diploma",
    duration: "1–2 Years",
    level: "Intermediate to Advanced",
    certification: "TVET National Diploma in International Coffee Trade & Marketing",
    description: "Navigate global supply chains, international logistics, direct-trade business models, futures markets, price hedging, and custom regulatory protocols.",
    syllabus: [
      "Global Coffee Supply Chain, Shipping & Port Logistics",
      "The Coffee Futures Market: NY/London Price Risk Hedging",
      "International Trade Law, Contracts, & Arbitration Regulations",
      "Direct Trade Business Models & Estate-to-Consumer Marketing",
      "Specialty Branding, Packaging & E-Commerce Implementations"
    ],
    image: studentsAccreditation,
    fees: {
      tuition: 105000,
      labFee: 10000,
      deposit: 10000
    },
    schedule: "Full-Time or Weekend Hybrid Model"
  },
  {
    id: "diploma-cooperative",
    title: "Diploma in Coffee Cooperative & Enterprise Management",
    category: "diploma",
    duration: "1–2 Years",
    level: "Intermediate to Advanced",
    certification: "TVET National Diploma in Cooperative Governance & Agribusiness",
    description: "Cooperative Management Training: Focuses on administrative law, cooperative audits, bookkeeping, Direct Settlement Systems (DSS), and modern rural leadership.",
    syllabus: [
      "Cooperative Governance Legal Frameworks & Regulatory Compliance",
      "Financial Accounting, Bookkeeping & Fiduciary Reporting",
      "Direct Settlement Systems (DSS) Operations & Mobile Integration",
      "Member Engagement, Strategic Dispute Resolution & Extension Coordination",
      "Strategic Management & Agricultural Investment Planning"
    ],
    image: studentsBuilding,
    fees: {
      tuition: 98000,
      labFee: 10000,
      deposit: 8000
    },
    schedule: "Full-Time or Block Release Blocks"
  },

  // 3. Higher Diplomas & Executive (Duration: 1-2 Years)
  {
    id: "higher-diploma-value",
    title: "Higher Diploma in Coffee Value Chain Management",
    category: "professional",
    duration: "1–2 Years",
    level: "Advanced (Graduate / Professional)",
    certification: "TVET Higher National Diploma in Coffee Value Chain Management",
    description: "Integrated value chain analysis, sustainability certifications (RA, Fairtrade, Organic), risk and compliance management, digital traceability, and coffee policy.",
    syllabus: [
      "Integrated Supply Chain Mapping & Competitive Optimization",
      "Global Sustainability Certifications (Rainforest Alliance, Fairtrade)",
      "Internal Auditing Systems, Compliance & International Standards",
      "Digital Traceability Platforms & Agricultural Blockchain Solutions",
      "Coffee Sector Policy, Advocacy & Regional Government Relations"
    ],
    image: studentsAccreditation,
    fees: {
      tuition: 130000,
      labFee: 15000,
      deposit: 12000
    },
    schedule: "Evening and Weekend Hybrid (Online + On-Campus Practicals)"
  },
  {
    id: "prof-cert-inspection",
    title: "Professional Certificate in Coffee Inspection & Export Readiness",
    category: "professional",
    duration: "1–2 Years",
    level: "Advanced / Professional",
    certification: "VIBIT Professional Certificate in Export Regulatory Compliance",
    description: "Prepare professional auditors and coffee exporters to navigate strict inspection systems, phytosanitary requirements, outturn validation, and international quality standards.",
    syllabus: [
      "Export Board Regulations & Phytosanitary Checks",
      "Pre-Shipment Sample Authentication & Lot Sealing Protocols",
      "Milling Loss Auditing & Moisture Verification",
      "Specialty Warehouse Inspection & Pest Prevention Chemistry",
      "Customs Valuation, Trade Financing & Letters of Credit"
    ],
    image: studentsBuilding,
    fees: {
      tuition: 125000,
      labFee: 15000,
      deposit: 10000
    },
    schedule: "Block Release / Alternating Weekends"
  },
  {
    id: "bsc-coffee",
    title: "Bachelor of Science (BSc) in Coffee Science & Agribusiness",
    category: "professional",
    duration: "4 Years (2 Years at VIBIT)",
    level: "Undergraduate (Affiliated Track)",
    certification: "BSc in Coffee Science & Agribusiness (Joint University Affiliation)",
    description: "Delivered through university affiliation. Learners complete Years 1–2 at VIBIT Agricultural Training College and finalize Years 3–4 at an accredited partner university. Program covers agronomy, genetics, processing technology, global economics, and trade.",
    syllabus: [
      "Year 1-2: Advanced Botany, Soils, Processing & Sensory Lab Work at VIBIT",
      "Year 1-2: Agribusiness Bookkeeping, Mechanics & Nursery Operations at VIBIT",
      "Year 3-4: Advanced Crop Genetics & Food Science (Accredited University)",
      "Year 3-4: Macro-Economics, Hedging & Export Policy (Accredited University)",
      "Year 3-4: Undergraduate Research Dissertation & Cooperative Internship"
    ],
    image: studentsBuilding,
    fees: {
      tuition: 160000,
      labFee: 30000,
      deposit: 20000
    },
    schedule: "Full-Time Calendar (September Intake)"
  },

  // 4. Short Courses (Duration: 3–14 Days)
  {
    id: "short-cupping",
    title: "Coffee Cupping & Grading",
    category: "short",
    duration: "3–14 Days",
    level: "Beginner to Intermediate",
    certification: "VIBIT Practical Certificate of Competence in Coffee Grading",
    description: "Train your senses to assess coffee quality according to standard SCA protocols. Includes flavor recognition, defect counting, and grading sheets.",
    syllabus: [
      "Flavor Wheel & Taste Standards Mapping",
      "Defect Counts, Identification, & Bean Grading",
      "SCA Scoring Methods & Form Audits",
      "Triangulation & Comparative Origins Trials"
    ],
    image: latteArtTopdown,
    fees: {
      tuition: 18000,
      labFee: 5000,
      deposit: 2000
    },
    schedule: "Intensive 5-Day Day Session"
  },
  {
    id: "short-barista",
    title: "Professional Barista Training",
    category: "short",
    duration: "3–14 Days",
    level: "Beginner to Intermediate",
    certification: "VIBIT Certificate in Professional Barista Skills",
    description: "Launch your career with intensive practicals on commercial espresso extraction, perfect milk texturing, recipe development, and cafe bar logistics.",
    syllabus: [
      "Espresso Brewing Variables & Extraction Science",
      "Grinder Adjustment & Workstation Setup",
      "Milk Texturing (Micro-Foam) & Latte Art Pours",
      "Specialty Menu Management & Customer Relations"
    ],
    image: baristaSmoothies,
    fees: {
      tuition: 15000,
      labFee: 5000,
      deposit: 2000
    },
    schedule: "Daily Practicals (9:00 AM - 1:00 PM)"
  },
  {
    id: "short-roasting",
    title: "Coffee Roasting Fundamentals",
    category: "short",
    duration: "3–14 Days",
    level: "Beginner to Intermediate",
    certification: "VIBIT Practical Certificate of Roastery Operations",
    description: "An interactive, practical introduction to operating commercial roasters, tracing roast logs, control panel adjustments, and identifying roast defects.",
    syllabus: [
      "Commercial Roaster Safety & Pre-Start Checks",
      "Thermodynamics & Basic Heat Profiles",
      "Logging First Crack & Density Changes",
      "Identifying Over-Roasting, Scorches & Baking Defects"
    ],
    image: coffeeCherriesDrying,
    fees: {
      tuition: 22000,
      labFee: 8000,
      deposit: 3000
    },
    schedule: "Intensive 4-Day Session (Includes Saturdays)"
  },
  {
    id: "short-milling",
    title: "Milling Loss Calculation",
    category: "short",
    duration: "3–14 Days",
    level: "Intermediate",
    certification: "VIBIT Certificate in Coffee Milling & Loss Evaluation",
    description: "Designed for dry-mill supervisors. Learn to calculate parchment-to-green bean outturn ratios, identify where loss occurs, and optimize milling efficiency.",
    syllabus: [
      "Parchment Grade Assessment & Moisture Auditing",
      "Dry Milling Operations & De-Hulling Shrinkage",
      "Outturn Determination Math & Yield Formulas",
      "Waste Control, Trash Grading & Dust Mass Accounting"
    ],
    image: sortingBeans,
    fees: {
      tuition: 12000,
      labFee: 3000,
      deposit: 1000
    },
    schedule: "3-Day Block Intensive Seminar"
  },
  {
    id: "short-dss",
    title: "Direct Settlement Systems",
    category: "short",
    duration: "3–14 Days",
    level: "Beginner to Intermediate",
    certification: "VIBIT Certificate in DSS Trade Operations",
    description: "Understand the financial architecture of direct settle payout regulations in Kenya. Learn how payouts route from auctions directly to cooperative societies and farmer ledgers.",
    syllabus: [
      "Kenya Coffee Act Regulations & DSS Guidelines",
      "Payment Gateway Interfaces & Cooperative Setup",
      "Accounting Integration & Automated Ledger Auditing",
      "Fiduciary Reporting & Transacting Transparency Standards"
    ],
    image: studentsAccreditation,
    fees: {
      tuition: 10000,
      labFee: 2000,
      deposit: 1000
    },
    schedule: "Online & On-Campus Evening Program (4 Days)"
  },
  {
    id: "short-governance",
    title: "Board Governance for Cooperatives",
    category: "short",
    duration: "3–14 Days",
    level: "Intermediate to Advanced",
    certification: "VIBIT Certificate in Cooperative Fiduciary Governance",
    description: "Empower cooperative board directors with structural management skills, fiduciary standards, transparent auditing, and member-centric strategic planning.",
    syllabus: [
      "Cooperative Administrative Policies & Voting Systems",
      "Fiduciary Accountability & Annual General Meetings (AGMs)",
      "Financial Audit Controls & Cooperative Capital Management",
      "Advocacy, Regional Representation & Extension Planning"
    ],
    image: studentsBuilding,
    fees: {
      tuition: 15000,
      labFee: 2000,
      deposit: 2000
    },
    schedule: "3-Day Executive Block Retaining Format"
  },
  {
    id: "short-climate",
    title: "Climate Resilience in Coffee Farming",
    category: "short",
    duration: "3–14 Days",
    level: "Beginner to Intermediate",
    certification: "VIBIT Certificate in Climate-Resilient Coffee Agronomy",
    description: "Adapt your coffee plots to global weather shifts. Master agroforestry shade patterns, drought-tolerant seedling husbandry, water-conserving drip setups, and organic mulching.",
    syllabus: [
      "Climate-Shift Vectors in Coffee Belt Regions",
      "Shaded Agroforestry Layouts & Canopy Selection",
      "Drought-Tolerant Seedling Propagating & Soil Moisture Care",
      "Sustainable Soil Carbon Trapping & Drip Irrigation Layouts"
    ],
    image: sortingBeans,
    fees: {
      tuition: 11000,
      labFee: 3000,
      deposit: 1000
    },
    schedule: "Field-Intensive 4-Day Session"
  }
];

export const FACILITIES: Facility[] = [
  {
    id: "sensory-lab",
    title: "Sensory & Cupping Lab",
    description: "Our world-class sensory theater is built to rigorous Specialty Coffee Association (SCA) environmental, lighting, and water standards. Here, students learn to identify flavor profiles, score coffees, and conduct professional cupping trials.",
    image: latteArtTable,
    features: [
      "SCA Standard Cupping tables with individual task lighting",
      "Sartorius precision micro-scales & digital refractometers",
      "Controlled zero-vibration sensory panel booths",
      "Carbon-active multi-stage water filtration manifold"
    ]
  },
  {
    id: "roastery-stations",
    title: "Production Roastery Stations",
    description: "Work with commercial drum and fluid-bed roasters from leading brands (Probat, Diedrich, and Giesen). Integrated with Cropster software, our roasting lab offers a safe, real-world space to master thermodynamics and recipe logging.",
    image: coffeeCherriesDrying,
    features: [
      "Commercial Probat 5kg and Giesen W1A roasting machines",
      "Artisan & Cropster automated profile logging integration",
      "Sinar digital green bean density & moisture testers",
      "Industrial thermal oxidizers (smoke scrubbers)"
    ]
  },
  {
    id: "agri-commons",
    title: "Agri-Tech Botanical Commons",
    description: "Our active on-campus coffee greenhouse and nursery function as a living lab. Students study coffee breeding, soil health, organic compost production, climate-smart cropping, and wet/dry cherry washing workflows first-hand.",
    image: sortingBeans,
    features: [
      "Greenhouse housing major Coffea Arabica and Robusta cultivars",
      "Soil analysis kits and micro-element mapping stations",
      "Eco-pulping wet mills and solar parabolic drying beds",
      "Modern drip irrigation networks and compost fermentation bays"
    ]
  },
  {
    id: "barista-stage",
    title: "Barista Performance Stage",
    description: "An high-fidelity simulation of an active, world-class specialty cafe and competition stage. Equipped with top-tier multi-boiler espresso machines (La Marzocco, Slayer) and electronic gravimetric grinders.",
    image: cocktailBar,
    features: [
      "La Marzocco Linea PB AV and Slayer Steam EP espresso systems",
      "Mahlkönig EK43, Mazzer, and Mythos Two gravimetric grinders",
      "Somatic flow bar layouts for speed and ergonomics",
      "Active brew bar featuring V60, Kalita Wave, and Chemex stations"
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Clara Chebet",
    role: "Estate Manager, Mount Elgon Cooperative",
    quote: "The Agribusiness program at VIBIT transformed our estate. I learned how to process our coffee from commercial grade to 86+ Specialty Honey micro-lots. Our farm's revenue increased by 40% in our very first harvest season.",
    image: studentsAccreditation,
    year: "Class of 2023"
  },
  {
    id: "t2",
    name: "Samuel Mwangi",
    role: "Head Barista & Roaster, Zenith Roasters",
    quote: "VIBIT isn't just an academy; it's a bridge to the global industry. The intensity of their Barista Skills certificate and their connections got me hired before I even graduated. Operating commercial roasters is standard practice here.",
    image: baristaSmoothies,
    year: "Class of 2022"
  },
  {
    id: "t3",
    name: "Evelyn Korir",
    role: "Founder, Bloom Agrisolution Ltd.",
    quote: "Using VIBIT's botanical commons to trial eco-friendly fertilizer alternatives launched my consulting business. Their professors are world-class mentors who support you long after graduation.",
    image: latteArtTable,
    year: "Class of 2024"
  }
];

export const ENROLLMENT_STEPS: EnrollmentStep[] = [
  {
    number: "01",
    id: "step-1",
    title: "Submit Online Application",
    description: "Choose your program and submit your academic records, national ID, and quick motivational paragraph online.",
    details: "Your files are securely saved and processed by the registrar within 24 hours."
  },
  {
    number: "02",
    id: "step-2",
    title: "Academic & Document Review",
    description: "The admissions board reviews qualifications to ensure TVET compliance or prerequisites.",
    details: "Diplomas require secondary certificates, while short courses require zero academic prerequisites."
  },
  {
    number: "03",
    id: "step-3",
    title: "Orientation & Oral Interview",
    description: "Meet with our instructors either on campus or virtually for a 15-minute passion assessment.",
    details: "We evaluate your alignment with the program and introduce you to our laboratory culture."
  },
  {
    number: "04",
    id: "step-4",
    title: "Secure Seat & Induction",
    description: "Receive your formal Admission Letter and secure your slot with a standard security deposit.",
    details: "Induction and lab equipment check-outs occur one week prior to class start dates."
  }
];
