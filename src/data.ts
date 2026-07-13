import { Course, Facility, Testimonial, EnrollmentStep } from './types';

// Import our real campus and student images
import studentsBuilding from './assets/images/students_building_1783338059168.jpeg';
import baristaSmoothies from './assets/images/barista_smoothies_1783338078505.jpeg';
import latteArtTable from './assets/images/latte_art_table_1783338092054.jpeg';
import latteArtTopdown from './assets/images/latte_art_topdown_1783338101365.jpeg';
import studentsAccreditation from './assets/images/students_accreditation_1783338111803.jpeg';
import coffeeCherriesDrying from './assets/images/coffee_cherries_drying_1783338132429.jpg';
import sortingBeans from './assets/images/sorting_beans_1783338143134.jpg';
import cocktailBar from './assets/images/cocktail_bar_1783338176140.jpeg';
import latteArtCup from './assets/images/latte_art_cup_1783338158532.jpg';

export const LOGO_URL = ""; // Empty string or placeholder since we are using the new React <Logo /> component!

export const COURSES: Course[] = [
  {
    id: "barista-level-3",
    title: "Barista Level 3",
    category: "certificate",
    duration: "6 Months",
    level: "Level 3 (Intermediate)",
    certification: "TVET Approved Level 3 Certificate in Barista Skills",
    description: "Master espresso extraction mechanics, milk chemistry, high-fidelity latte art, sensory profiling, and high-efficiency café workflow operations.",
    syllabus: [
      "Espresso Extraction Science & Grind Calibration",
      "Milk Chemistry, Micro-Foam Texturing & Latte Art Pours",
      "Manual Brewing Methods (V60, Chemex, Aeropress)",
      "Sensory Analysis Foundations & Tasting Protocols",
      "Café Workflow Optimization & Equipment Maintenance"
    ],
    image: latteArtCup,
    fees: {
      tuition: 60000,
      labFee: 15000,
      deposit: 5000
    },
    schedule: "Full-Time (Mon - Fri, 8:00 AM - 1:00 PM)"
  },
  {
    id: "mixology-level-3",
    title: "Mixology Level 3",
    category: "certificate",
    duration: "6 Months",
    level: "Level 3 (Intermediate)",
    certification: "TVET Approved Level 3 Certificate in Mixology",
    description: "Designed for premium bar environments. Focuses on flavor mapping, cold-brew infusions, non-alcoholic cocktail design, syrups, and craft botanical formulations.",
    syllabus: [
      "Foundations of Flavor Pairing & Structural Taste Science",
      "Cold-Brew Infusions & Nitro-Draft Implementations",
      "Craft Syrups, Shrubs, and Botanical Bitters Production",
      "Creative Presentation, Garnish Artistry & Glassware Pairing",
      "Inventory Management, Bar Setup, & Safety Standards"
    ],
    image: baristaSmoothies,
    fees: {
      tuition: 65000,
      labFee: 15000,
      deposit: 5000
    },
    schedule: "Full-Time or Evening Intensive"
  },
  {
    id: "bartending-level-4",
    title: "Bartending Level 4",
    category: "diploma",
    duration: "1 Year",
    level: "Level 4 (Advanced)",
    certification: "TVET Approved Level 4 Diploma in Bartending & Bar Operations",
    description: "Learn advanced hospitality service, cellar management, high-volume counter ergonomics, menu design, and the business metrics of modern bar systems.",
    syllabus: [
      "Advanced Customer Care & VIP Service Systems",
      "Somatic Bar Layout Design & Speed Workflows",
      "Beverage Costing, Menu Design, & Profit Optimization",
      "Cellar Management, Temperature Control, & Sourcing Logistics",
      "Staff Coordination, Leadership & Bar Licensing Regulations"
    ],
    image: cocktailBar,
    fees: {
      tuition: 85000,
      labFee: 20000,
      deposit: 8000
    },
    schedule: "Full-Time (Mon - Fri, 9:00 AM - 4:00 PM)"
  },
  {
    id: "coffee-agronomy-level-3",
    title: "Coffee Agronomy Level 3",
    category: "certificate",
    duration: "6 Months",
    level: "Level 3 (Beginner to Intermediate)",
    certification: "TVET Approved Level 3 Certificate in Coffee Agronomy",
    description: "A comprehensive grounding in coffee botany, soil health science, climate-resilient nursery management, and organic crop nutrition.",
    syllabus: [
      "Introduction to Coffee Botany & Cultivar Selection",
      "Nursery Setup, Shading Dynamics & Propagation Techniques",
      "Soil Chemistry, Nutrition Management & Composting Methods",
      "Climate-Smart Agroforestry & Shaded Plot Design",
      "Pest, Weed & Disease Management Protocols"
    ],
    image: sortingBeans,
    fees: {
      tuition: 55000,
      labFee: 10000,
      deposit: 5000
    },
    schedule: "Full-Time or Blocks (Mon - Fri)"
  },
  {
    id: "agripreneurship-level-5-6",
    title: "Agripreneurship Level 5 & 6",
    category: "professional",
    duration: "1–2 Years",
    level: "Level 5 & 6 (Graduate / Executive)",
    certification: "TVET Approved Level 5 & 6 National Diploma in Agripreneurship",
    description: "Build scalable agribusiness models. Master global supply chain systems, direct trade strategies, pricing hedging on futures markets, and regional export compliance.",
    syllabus: [
      "Business Model Generation for Commercial Farms",
      "Global Coffee Supply Chains, Logistics, & Trade Agreements",
      "The Futures Market: Price Hedging & Risk Management",
      "Agribusiness Bookkeeping, Taxation, & Financial Audit Standards",
      "Strategic Branding, E-Commerce, & Pitching to Global Investors"
    ],
    image: studentsAccreditation,
    fees: {
      tuition: 110000,
      labFee: 15000,
      deposit: 10000
    },
    schedule: "Weekend and Evening Hybrid (On-Campus + Remote)"
  },
  {
    id: "cooperative-management-level-5-6",
    title: "Cooperative Management Level 5 & 6",
    category: "professional",
    duration: "1–2 Years",
    level: "Level 5 & 6 (Graduate / Executive)",
    certification: "TVET National Diploma in Cooperative Governance & Agribusiness",
    description: "Focused training for cooperative leaders. Covers administrative law, cooperative audits, bookkeeping, Direct Settlement Systems (DSS), and modern rural leadership.",
    syllabus: [
      "Cooperative Governance Legal Frameworks & Compliance",
      "Financial Accounting, Fiduciary Bookkeeping, & Annual Audits",
      "Direct Settlement Systems (DSS) Operations & Mobile Integration",
      "Member Engagement, Dispute Resolution & Extension Coordination",
      "Strategic Management & Agricultural Investment Planning"
    ],
    image: studentsBuilding,
    fees: {
      tuition: 115000,
      labFee: 10000,
      deposit: 10000
    },
    schedule: "Block Release / Executive Seminars"
  },
  {
    id: "cupping-technology-level-4-5",
    title: "Coffee Cupping and Technology Level 4 & 5",
    category: "diploma",
    duration: "1 Year",
    level: "Level 4 & 5 (Intermediate to Advanced)",
    certification: "TVET National Diploma in Coffee Grading & Quality Assurance",
    description: "Advanced sensory analysis, specialty grading, moisture validation, dry milling loss calculation, and wet mill operations.",
    syllabus: [
      "SCA Sensory Evaluation Protocols & Olfactory Training",
      "Triangulation Drills & Identifying Bean Defect Classes",
      "Parchment Moisture Analysis & Milling Loss Math",
      "Biochemistry of Fermentation & Processing Technology",
      "Export Board Phytosanitary Requirements & Lot Sealing Protocols"
    ],
    image: latteArtTable,
    fees: {
      tuition: 95000,
      labFee: 20000,
      deposit: 10000
    },
    schedule: "Full-Time or Alternate Weekends"
  },
  {
    id: "coffee-roasting",
    title: "Coffee Roasting",
    category: "short",
    duration: "1–2 Weeks",
    level: "Beginner to Intermediate",
    certification: "VIBIT Certificate in Coffee Roasting Fundamentals",
    description: "Operate commercial roasters, manage heat profiles, trace roast curves, log first crack, and detect common roasting defects.",
    syllabus: [
      "Commercial Roaster Hardware Setup & Pre-Start Safety",
      "Thermodynamics, Conduction, and Convection Profiles",
      "Artisan & Cropster Software Profile Logging Integration",
      "Density and Moisture Testing of Green & Roasted Coffee",
      "Identifying Roast Defects: Under-Roasting, Scorching, & Baking"
    ],
    image: coffeeCherriesDrying,
    fees: {
      tuition: 25000,
      labFee: 10000,
      deposit: 5000
    },
    schedule: "Intensive 5-Day Day Session or 2-Week Evening Session"
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
