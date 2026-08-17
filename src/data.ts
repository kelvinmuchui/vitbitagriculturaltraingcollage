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
    schedule: "Full-Time (Mon - Fri) or Evening Sessions",
    requirements: [
      "Open to high school leavers and coffee enthusiasts",
      "KCSE certificate or equivalent prior learning",
      "Passion for culinary hospitality and specialty coffee"
    ],
    careers: [
      "Head Barista & Café Shift Supervisor",
      "Specialty Coffee Barista (Local & International Hospitality)",
      "Cruise Ship / Overseas Barista Specialist (Gulf & Europe)",
      "Café Entrepreneur / Independent Coffee Bar Owner"
    ],
    targetAudience: "Aspiring professional baristas, hospitality workers, café founders, and youth seeking international job mobility.",
    intakes: ["January", "May", "September", "First Monday of Every Month (Modular)"],
    practicalHoursRatio: "85% Hands-on Machine Labs • 15% Theory",
    seoTitle: "Barista Course in Nairobi Kenya | Professional Barista Training & Fees | VIBIT",
    metaDescription: "Enroll in accredited Coffee Barista Skills training in Nairobi at VIBIT. Master espresso calibration, milk latte art, brewing & café operations. Apply today.",
    primaryKeyword: "barista training Nairobi"
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
    schedule: "Weekend and Evening Hybrid",
    requirements: [
      "Interest in agricultural entrepreneurship and commodity trade",
      "Basic business arithmetic and secondary education background",
      "Existing farmers and agro-investors highly welcomed"
    ],
    careers: [
      "Agribusiness Founder & Commercial Farm Manager",
      "Agricultural Export Procurement & Logistics Officer",
      "Commodity Trading & Sourcing Specialist",
      "Agri-Fintech & Agricultural Loan Consultant"
    ],
    targetAudience: "Commercial farmers, agricultural entrepreneurs, cooperative committee members, and youth investing in modern agro-enterprises.",
    intakes: ["January", "May", "September", "Modular Weekend Cohorts"],
    practicalHoursRatio: "70% Case Studies & Field Analysis • 30% Strategy Labs",
    seoTitle: "Agribusiness Course in Kenya | Agripreneurship & Export Training | VIBIT",
    metaDescription: "Learn commercial agribusiness, commodity export logistics, and farm financial management at VIBIT Agricultural Training College Nairobi.",
    primaryKeyword: "agribusiness course in Kenya"
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
    schedule: "Full-Time or Block Release",
    requirements: [
      "KCSE D+ or Certificate in General Agriculture",
      "Passion for sustainable crop science and coffee estate management"
    ],
    careers: [
      "Coffee Estate Agronomist & Field Extension Officer",
      "Certified Coffee Seedling Nursery Operator",
      "Sustainable Soil & Crop Protection Consultant",
      "Cooperative Agricultural Field Advisor"
    ],
    targetAudience: "Coffee estate managers, agricultural extension agents, nursery owners, and crop science students.",
    intakes: ["January", "May", "September"],
    practicalHoursRatio: "80% Greenhouse & Field Trials • 20% Lecture",
    seoTitle: "Coffee Agronomy Course in Kenya | Sustainable Crop Science | VIBIT",
    metaDescription: "Master coffee agronomy, soil chemistry, nursery propagation, and climate-smart farm management at VIBIT Agricultural Training College.",
    primaryKeyword: "coffee agronomy course Kenya"
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
    schedule: "Full-Time or Alternate Weekends",
    requirements: [
      "Secondary school certificate or prior barista / roasting experience",
      "Sensory aptitude and commitment to rigorous quality control standards"
    ],
    careers: [
      "Licensed Coffee Cupper & Quality Assurance (QA) Director",
      "Green Coffee Buyer & Export Grader",
      "Wet & Dry Mill Operations Quality Manager",
      "Coffee Auction Sensory Representative"
    ],
    targetAudience: "Quality control technicians, coffee exporters, mill managers, and advanced sensory professionals.",
    intakes: ["January", "May", "September"],
    practicalHoursRatio: "90% Sensory Lab Cupping • 10% Industry Standards",
    seoTitle: "Coffee Cupping & Grading Course Kenya | Sensory Technology | VIBIT",
    metaDescription: "Become a certified coffee cupper and sensory quality specialist at VIBIT. Master SCA grading, defect classification, and export lot evaluation in Nairobi.",
    primaryKeyword: "coffee cupping course Kenya"
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
    schedule: "Intensive Day or Evening Sessions",
    requirements: [
      "Open to baristas, roastery operators, and coffee entrepreneurs",
      "Basic chemistry / thermodynamics comprehension"
    ],
    careers: [
      "Commercial Head Roaster",
      "Roastery Operations & Production Manager",
      "Specialty Coffee Brand Owner & Roaster",
      "Roastery Equipment Calibration Technician"
    ],
    targetAudience: "Café owners, production roasters, baristas advancing their craft, and specialty coffee entrepreneurs.",
    intakes: ["Monthly Rolling Intakes", "January", "May", "September"],
    practicalHoursRatio: "85% Roaster Hands-on • 15% Curve Analytics",
    seoTitle: "Coffee Roasting Course Nairobi Kenya | Commercial Roaster Training | VIBIT",
    metaDescription: "Learn commercial coffee roasting in Nairobi at VIBIT. Master drum roaster thermodynamics, Cropster profile logging, and defect analysis.",
    primaryKeyword: "coffee roasting course Kenya"
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
    schedule: "Full-Time or Evening Intensive",
    requirements: [
      "Minimum age: 18 years",
      "Passion for culinary flavor pairing, craft beverages, and bar hospitality"
    ],
    careers: [
      "Professional Mixologist & Bar Captain",
      "Craft Beverage & Mocktail Menu Developer",
      "Luxury Resort / Cruise Line Bartender",
      "Mobile Bar & Events Beverage Caterer"
    ],
    targetAudience: "Hospitality professionals, beverage developers, resort staff, and creative bartenders.",
    intakes: ["January", "May", "September", "Monthly Cohorts"],
    practicalHoursRatio: "85% Bar Practical • 15% Flavor Science",
    seoTitle: "Mixology Course in Nairobi Kenya | Craft Beverage & Bar Training | VIBIT",
    metaDescription: "Study professional mixology, craft botanical beverage creation, and bar operations at VIBIT Agricultural Training College in Nairobi.",
    primaryKeyword: "mixology course Nairobi"
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
    schedule: "Weekend Hybrid (Online + Practical Lab)",
    requirements: [
      "Basic computer literacy and secondary school qualification",
      "Interest in modern agricultural technology and automation"
    ],
    careers: [
      "AgTech Project Specialist & Digital Farm Integrator",
      "Smart Agriculture Data Analyst",
      "Automated Processing Mill Quality Supervisor",
      "Digital Traceability & Supply Chain Specialist"
    ],
    targetAudience: "Agronomists, tech innovators, supply chain specialists, and agricultural cooperative planners.",
    intakes: ["January", "May", "September", "Weekend Hybrid Sessions"],
    practicalHoursRatio: "60% Software & Lab Practical • 40% Conceptual Foundations",
    seoTitle: "AI in Agriculture Course Kenya | AgTech & Smart Coffee Farming | VIBIT",
    metaDescription: "Discover how AI and IoT sensors are revolutionizing agriculture, yield prediction, and coffee quality control in Kenya with VIBIT.",
    primaryKeyword: "AI in agriculture Kenya"
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
    schedule: "Full-Time or Block Release (KSh 45,000 / semester)",
    requirements: [
      "KCSE D (Plain) or equivalent TVET Level 4 Certificate",
      "Cooperative society staff, committee members, and youth leaders"
    ],
    careers: [
      "Co-operative Society Manager & Internal Auditor",
      "SACCO Operations & Credit Officer",
      "Member Extension & Agricultural Society Secretary",
      "Agricultural Marketing Society Coordinator"
    ],
    targetAudience: "Cooperative staff, SACCO officers, farmer group leaders, and career starters in cooperative finance.",
    intakes: ["January", "May", "September"],
    practicalHoursRatio: "60% Auditing & Governance Practicals • 40% Theory",
    seoTitle: "Certificate in Cooperative Management Kenya | TVET Approved | VIBIT",
    metaDescription: "Enroll in the TVET-approved Certificate in Co-operative Management at VIBIT in Nairobi. Master cooperative governance, DSS accounting, and audits.",
    primaryKeyword: "cooperative management course Kenya"
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
    schedule: "Full-Time / Executive Seminars (KSh 45,000 / semester)",
    requirements: [
      "KCSE C- (Minus) or Certificate in Co-operative Management / Business Administration",
      "Passionate about agricultural cooperative leadership and governance"
    ],
    careers: [
      "Chief Executive Officer (CEO) / General Manager of Cooperative Union",
      "Senior SACCO Financial Controller & Risk Manager",
      "Government Cooperative Auditor / Ministry Inspector",
      "International Commodity & Direct Export Trade Director"
    ],
    targetAudience: "Cooperative directors, SACCO managers, finance graduates, and senior agricultural leaders.",
    intakes: ["January", "May", "September"],
    practicalHoursRatio: "50% Executive Case Studies • 50% Regulatory & Financial Seminars",
    seoTitle: "Diploma in Cooperative Management in Kenya | TVET Diploma | VIBIT",
    metaDescription: "Advance your leadership with a TVET National Diploma in Co-operative Management at VIBIT Agricultural Training College in Nairobi, Kenya.",
    primaryKeyword: "diploma in cooperative management Kenya"
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
