import { Course, Facility, Testimonial, EnrollmentStep } from './types';

// Import distinct, non-repeating image assets for every single item
import courseBaristaSkills from './assets/images/course_barista_skills_1784976448236.jpg';
import courseAgripreneurship from './assets/images/course_agripreneurship_1784976463709.jpg';
import courseAgronomy from './assets/images/course_agronomy_1784976477732.jpg';
import cuppingLabSetup from './assets/images/cupping_lab_setup_1784706432096.jpg';
import coffeeRoastingMachine from './assets/images/coffee_roasting_machine_1784706415458.jpg';
import courseMixology from './assets/images/course_mixology_1784976493584.jpg';
import aiCoffeeAgtech from './assets/images/ai_coffee_agtech_1784706447375.jpg';
import courseCoopCert from './assets/images/course_coop_cert_1784976507855.jpg';
import courseCoopDiploma from './assets/images/course_coop_diploma_1784976521899.jpg';

import facilityEspressoLab from './assets/images/facility_espresso_lab_1784976539403.jpg';
import facilityRoasteryQc from './assets/images/facility_roastery_qc_1784976554142.jpg';
import facilityCoffeeNursery from './assets/images/facility_coffee_nursery_1784976568320.jpg';
import facilitySoilAnalytics from './assets/images/facility_soil_analytics_1784976581491.jpg';

import testimonialMercy from './assets/images/testimonial_mercy_1784976594167.jpg';
import testimonialSamuel from './assets/images/testimonial_samuel_1784976608625.jpg';
import testimonialDavid from './assets/images/testimonial_david_1784976621584.jpg';

export const LOGO_URL = ""; // Empty string or placeholder since we are using the new React <Logo /> component!

export const COURSES: Course[] = [
  {
    id: "barista-skills",
    title: "Coffee Barista Skills",
    category: "certificate",
    duration: "12 Weeks",
    level: "Level 3 Certificate",
    certification: "TVET Approved Certificate in Coffee Barista Skills",
    description: "Master espresso extraction mechanics, milk chemistry, high-fidelity latte art, sensory profiling, and high-efficiency café workflow operations.",
    syllabus: [
      "Espresso Extraction Science & Grind Calibration",
      "Milk Chemistry, Micro-Foam Texturing & Latte Art Pours",
      "Manual Brewing Methods (V60, Chemex, Aeropress)",
      "Sensory Analysis Foundations & Tasting Protocols",
      "Café Workflow Optimization & Equipment Maintenance"
    ],
    image: courseBaristaSkills,
    fees: {
      tuition: 50000,
      labFee: 10000,
      deposit: 0
    },
    schedule: "Full-Time (Mon - Fri) or Evening Sessions"
  },
  {
    id: "agripreneurship",
    title: "Agripreneurship",
    category: "professional",
    duration: "8 Weeks",
    level: "Certificate & Practical Modules",
    certification: "TVET Approved Certificate in Agripreneurship",
    description: "Build scalable agribusiness models. Master global supply chain systems, direct trade strategies, pricing hedging on futures markets, and regional export compliance.",
    syllabus: [
      "Business Model Generation for Commercial Farms",
      "Global Coffee Supply Chains, Logistics, & Trade Agreements",
      "The Futures Market: Price Hedging & Risk Management",
      "Agribusiness Bookkeeping, Taxation, & Financial Audit Standards",
      "Strategic Branding, E-Commerce, & Pitching to Global Investors"
    ],
    image: courseAgripreneurship,
    fees: {
      tuition: 40000,
      labFee: 20000,
      deposit: 0
    },
    schedule: "Weekend and Evening Hybrid"
  },
  {
    id: "coffee-agronomy",
    title: "Coffee Agronomy",
    category: "certificate",
    duration: "8 Weeks",
    level: "Level 3 Certificate",
    certification: "TVET Approved Certificate in Coffee Agronomy",
    description: "A comprehensive grounding in coffee botany, soil health science, climate-resilient nursery management, and organic crop nutrition.",
    syllabus: [
      "Introduction to Coffee Botany & Cultivar Selection",
      "Nursery Setup, Shading Dynamics & Propagation Techniques",
      "Soil Chemistry, Nutrition Management & Composting Methods",
      "Climate-Smart Agroforestry & Shaded Plot Design",
      "Pest, Weed & Disease Management Protocols"
    ],
    image: courseAgronomy,
    fees: {
      tuition: 60000,
      labFee: 20000,
      deposit: 0
    },
    schedule: "Full-Time or Block Release"
  },
  {
    id: "cupping-technology",
    title: "Coffee Cupping & Technology",
    category: "diploma",
    duration: "12 Weeks",
    level: "Advanced Diploma / Certificate",
    certification: "TVET Certificate in Coffee Cupping, Grading & Processing Technology",
    description: "Advanced sensory analysis, specialty grading, moisture validation, dry milling loss calculation, and wet mill operations.",
    syllabus: [
      "SCA Sensory Evaluation Protocols & Olfactory Training",
      "Triangulation Drills & Identifying Bean Defect Classes",
      "Parchment Moisture Analysis & Milling Loss Math",
      "Biochemistry of Fermentation & Processing Technology",
      "Export Board Phytosanitary Requirements & Lot Sealing Protocols"
    ],
    image: cuppingLabSetup,
    fees: {
      tuition: 90000,
      labFee: 40000,
      deposit: 0
    },
    schedule: "Full-Time or Alternate Weekends"
  },
  {
    id: "coffee-roasting",
    title: "Coffee Roasting",
    category: "short",
    duration: "8 Weeks",
    level: "Intermediate to Advanced",
    certification: "VIBIT Certificate in Coffee Roasting Technology",
    description: "Operate commercial roasters, manage heat profiles, trace roast curves, log first crack, and detect common roasting defects.",
    syllabus: [
      "Commercial Roaster Hardware Setup & Pre-Start Safety",
      "Thermodynamics, Conduction, and Convection Profiles",
      "Artisan & Cropster Software Profile Logging Integration",
      "Density and Moisture Testing of Green & Roasted Coffee",
      "Identifying Roast Defects: Under-Roasting, Scorching, & Baking"
    ],
    image: coffeeRoastingMachine,
    fees: {
      tuition: 60000,
      labFee: 20000,
      deposit: 0
    },
    schedule: "Intensive Day or Evening Sessions"
  },
  {
    id: "mixology",
    title: "Mixology",
    category: "certificate",
    duration: "12 Weeks",
    level: "Level 3 Certificate",
    certification: "TVET Approved Certificate in Mixology",
    description: "Designed for premium bar environments. Focuses on flavor mapping, cold-brew infusions, non-alcoholic cocktail design, syrups, and craft botanical formulations.",
    syllabus: [
      "Foundations of Flavor Pairing & Structural Taste Science",
      "Cold-Brew Infusions & Nitro-Draft Implementations",
      "Craft Syrups, Shrubs, and Botanical Bitters Production",
      "Creative Presentation, Garnish Artistry & Glassware Pairing",
      "Inventory Management, Bar Setup, & Safety Standards"
    ],
    image: courseMixology,
    fees: {
      tuition: 50000,
      labFee: 10000,
      deposit: 0
    },
    schedule: "Full-Time or Evening Intensive"
  },
  {
    id: "ai-coffee-industry",
    title: "Certificate in AI in Coffee Industry",
    category: "short",
    duration: "12 Weeks",
    level: "Certificate in AgTech & AI",
    certification: "VIBIT Certificate in AI Applications for Coffee Agronomy & Supply Chain",
    description: "Learn to apply Artificial Intelligence, predictive yield modeling, computer vision bean defect sorting, and automated climate monitoring in the coffee value chain.",
    syllabus: [
      "Introduction to AI, IoT Sensors & Machine Learning in Agriculture",
      "Computer Vision & Automated Coffee Bean Defect Detection",
      "AI-Powered Weather, Soil Sensor & Yield Prediction Models",
      "Smart Supply Chain Tracking, Direct Settlement Systems & Digital Ledger",
      "AI in Roasting Profile Optimization & Quality Control Automation"
    ],
    image: aiCoffeeAgtech,
    fees: {
      tuition: 50000,
      labFee: 10000,
      deposit: 0
    },
    schedule: "Weekend Hybrid (Online + Practical Lab)"
  },
  {
    id: "cooperative-management-cert",
    title: "Certificate in Co-operative Management",
    category: "certificate",
    duration: "One Year",
    level: "Certificate Level",
    certification: "TVET Certificate in Co-operative Governance & Management",
    description: "Comprehensive grounding in cooperative governance, financial accounting, DSS payment systems, and agricultural member extension services.",
    syllabus: [
      "Cooperative Governance Legal Frameworks & Compliance",
      "Financial Accounting, Fiduciary Bookkeeping, & Annual Audits",
      "Direct Settlement Systems (DSS) Operations & Mobile Integration",
      "Member Engagement, Dispute Resolution & Extension Coordination",
      "Strategic Management & Agricultural Investment Planning"
    ],
    image: courseCoopCert,
    fees: {
      tuition: 135000,
      labFee: 0,
      deposit: 0
    },
    schedule: "Full-Time or Block Release (KSh 45,000 / semester)"
  },
  {
    id: "cooperative-management-diploma",
    title: "Diploma in Co-operative Management",
    category: "diploma",
    duration: "Two Years",
    level: "Diploma Level",
    certification: "TVET National Diploma in Co-operative Governance & Management",
    description: "Advanced 2-year leadership program for cooperative executives, covering administrative law, fiduciary audit standards, regional trade, and corporate governance.",
    syllabus: [
      "Advanced Cooperative Law & Administrative Regulations",
      "Strategic Financial Management & Auditing Standards",
      "Direct Settlement Systems & Macro Commodity Trading",
      "International Trade Logistics & Cooperative Direct Exporting",
      "Executive Leadership & Board Governance Dynamics"
    ],
    image: courseCoopDiploma,
    fees: {
      tuition: 270000,
      labFee: 0,
      deposit: 0
    },
    schedule: "Full-Time / Executive Seminars (KSh 45,000 / semester)"
  }
];

export const FACILITIES: Facility[] = [
  {
    id: "sensory-lab",
    title: "Sensory & Cupping Lab",
    description: "Our world-class sensory theater is built to rigorous Specialty Coffee Association (SCA) environmental, lighting, and water standards. Here, students learn to identify flavor profiles, score coffees, and conduct professional cupping trials.",
    image: facilityEspressoLab,
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
    image: facilityRoasteryQc,
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
    image: facilityCoffeeNursery,
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
    image: facilitySoilAnalytics,
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
    image: testimonialMercy,
    year: "Class of 2023"
  },
  {
    id: "t2",
    name: "Samuel Mwangi",
    role: "Head Barista & Roaster, Zenith Roasters",
    quote: "VIBIT isn't just a college; it's a bridge to the global industry. The intensity of their Barista Skills certificate and their connections got me hired before I even graduated. Operating commercial roasters is standard practice here.",
    image: testimonialSamuel,
    year: "Class of 2022"
  },
  {
    id: "t3",
    name: "Evelyn Korir",
    role: "Founder, Bloom Agrisolution Ltd.",
    quote: "Using VIBIT's botanical commons to trial eco-friendly fertilizer alternatives launched my consulting business. Their professors are world-class mentors who support you long after graduation.",
    image: testimonialDavid,
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
