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
import coffeeCherriesDrying from './assets/images/coffee_cherries_drying_1783338132429.jpg';
import sortingBeans from './assets/images/sorting_beans_1783338143134.jpg';
import facilitySoilAnalytics from './assets/images/facility_soil_analytics_1784976581491.jpg';

import facilityEspressoLab from './assets/images/facility_espresso_lab_1784976539403.jpg';
import facilityRoasteryQc from './assets/images/facility_roastery_qc_1784976554142.jpg';
import facilityCoffeeNursery from './assets/images/facility_coffee_nursery_1784976568320.jpg';

import testimonialMercy from './assets/images/testimonial_mercy_1784976594167.jpg';
import testimonialSamuel from './assets/images/testimonial_samuel_1784976608625.jpg';
import testimonialDavid from './assets/images/testimonial_david_1784976621584.jpg';

export const LOGO_URL = ""; // Empty string or placeholder since we are using the new React <Logo /> component!

export const COURSES: Course[] = [
  /* =========================================================================
     1. COFFEE COURSES (6 Specialized Pillars)
     ========================================================================= */
  {
    id: "coffee-technology",
    title: "Coffee Technology & Quality Science",
    category: "diploma",
    department: "coffee",
    subCategory: "Coffee Technology",
    duration: "12 Weeks",
    level: "Advanced Certificate / Diploma",
    certification: "TVET Certificate in Coffee Technology, Quality Control & Processing",
    description: "Deep dive into coffee biochemistry, moisture testing metrics, water activity science, green bean defect grading, dry milling yield math, and export lot validation.",
    syllabus: [
      "Physical & Chemical Properties of Green Coffee Beans",
      "Green Coffee Grading & ISO / SCA Physical Defect Count Protocols",
      "Moisture Content, Water Activity & Bean Density Measurement",
      "Dry Milling Machinery: Destoners, Hullers, Graders & Color Sorters",
      "Warehouse Storage, GrainPro Bag Preservation & Export Standards"
    ],
    image: sortingBeans,
    fees: {
      tuition: 85000,
      labFee: 30000,
      deposit: 0
    },
    schedule: "Full-Time (Mon - Fri) or Modular Weekend",
    requirements: [
      "Secondary school certificate (KCSE D+ or equivalent)",
      "Basic interest in coffee quality assurance and laboratory testing"
    ],
    careers: [
      "Coffee Quality Assurance (QA) Lab Manager",
      "Green Coffee Sourcing & Export Quality Controller",
      "Dry Mill Quality Supervisor",
      "Coffee Board / Trade Standard Inspector"
    ],
    targetAudience: "Coffee mill technicians, quality analysts, exporters, warehouse managers, and coffee cooperative officers.",
    intakes: ["January", "May", "September", "Monthly Modular"],
    practicalHoursRatio: "80% Lab Diagnostics • 20% Theory",
    seoTitle: "Coffee Technology Course in Kenya | Quality Control & Processing | VIBIT",
    metaDescription: "Master coffee technology, green bean grading, moisture analytics, and dry milling quality control in Nairobi at VIBIT Agricultural Training College.",
    primaryKeyword: "coffee technology course Kenya"
  },
  {
    id: "coffee-production",
    title: "Coffee Production & Agronomy",
    category: "certificate",
    department: "coffee",
    subCategory: "Coffee Production",
    duration: "8 Weeks",
    level: "Level 3 Certificate",
    certification: "TVET Approved Certificate in Coffee Production & Agronomy",
    description: "A comprehensive practical grounding in Coffea Arabica botany, seedling nursery propagation, soil chemistry, climate-smart agroforestry, and organic farm nutrition.",
    syllabus: [
      "Coffee Botany, Taxonomy & Kenyan Cultivars (SL28, SL34, Ruiru 11, Batian)",
      "Commercial Nursery Setup, Seedling Propagation & Grafting",
      "Soil Fertility Management, pH Balancing & Organic Composting",
      "Canopy Management, Pruning Systems & Shade Tree Integration",
      "Integrated Pest & Disease Management (CBD, CLR, Stem Borer)"
    ],
    image: courseAgronomy,
    fees: {
      tuition: 60000,
      labFee: 20000,
      deposit: 0
    },
    schedule: "Full-Time or Block Release",
    requirements: [
      "KCSE D (Plain) or prior farming experience",
      "Passion for sustainable coffee cultivation and estate productivity"
    ],
    careers: [
      "Coffee Farm Agronomist & Field Extension Officer",
      "Certified Coffee Seedling Nursery Operator",
      "Crop Nutrition & Sustainable Farm Consultant",
      "Estate Supervisor & Cooperative Field Officer"
    ],
    targetAudience: "Coffee estate managers, smallholder farmers, nursery operators, and agricultural extension agents.",
    intakes: ["January", "May", "September", "Monthly Cohorts"],
    practicalHoursRatio: "80% Greenhouse & Field Trials • 20% Lecture",
    seoTitle: "Coffee Production & Agronomy Course Kenya | Sustainable Farming | VIBIT",
    metaDescription: "Study coffee production, nursery management, soil nutrition, and climate-smart agronomy in Nairobi with VIBIT Agricultural Training College.",
    primaryKeyword: "coffee production course Kenya"
  },
  {
    id: "coffee-processing",
    title: "Coffee Processing & Post-Harvest Technology",
    category: "short",
    department: "coffee",
    subCategory: "Coffee Processing",
    duration: "6 Weeks",
    level: "Certificate Level",
    certification: "VIBIT Certificate in Coffee Processing & Mill Operations",
    description: "Master wet and dry processing methodologies, Brix sugar cherry sorting, controlled fermentation (anaerobic, carbonic maceration, honey, natural), and raised bed solar drying.",
    syllabus: [
      "Cherry Harvesting Criteria & Refractometer Brix Sugar Testing",
      "Wet Processing Mechanics: Eco-Pulping, Demucilaging & Washing Channels",
      "Experimental Fermentation: Anaerobic, Carbonic Maceration & Extended Yeast",
      "Natural & Honey Processing Protocols for Micro-Lots",
      "Solar Raised Bed Drying Kinetics & Parchment Moisture Stabilization"
    ],
    image: coffeeCherriesDrying,
    fees: {
      tuition: 55000,
      labFee: 20000,
      deposit: 0
    },
    schedule: "Full-Time Intensive or Harvest-Season Block",
    requirements: [
      "Open to coffee farmers, wet mill managers, and processing enthusiasts",
      "Basic understanding of agricultural handling"
    ],
    careers: [
      "Wet Mill (Factory) Operations Manager",
      "Specialty Micro-Lot Processing Specialist",
      "Post-Harvest Quality Consultant",
      "Cooperative Factory Processing Supervisor"
    ],
    targetAudience: "Wet mill managers, farm owners seeking specialty price premiums, cooperative factory managers, and processing innovators.",
    intakes: ["January", "May", "September", "Harvest Intake"],
    practicalHoursRatio: "85% Mill & Solar Bed Practicals • 15% Theory",
    seoTitle: "Coffee Processing Course Kenya | Wet & Dry Milling Technology | VIBIT",
    metaDescription: "Learn professional coffee processing, experimental anaerobic fermentations, and solar bed drying protocols at VIBIT Agricultural Training College.",
    primaryKeyword: "coffee processing course Kenya"
  },
  {
    id: "cupping-technology",
    title: "Coffee Cupping & Sensory Grading",
    category: "diploma",
    department: "coffee",
    subCategory: "Coffee Cupping",
    duration: "12 Weeks",
    level: "Advanced Diploma / Certificate",
    certification: "TVET Certificate in Coffee Cupping, Sensory Grading & QA",
    description: "Advanced sensory analysis, SCA cupping protocols, triangulation drills, olfactory Le Nez du Café calibration, acid profiling, and commercial defect scoring.",
    syllabus: [
      "SCA Sensory Evaluation Protocols & Sensory Booth Setup",
      "Olfactory Discrimination & Flavor Wheel Mapping (Fragrance/Aroma)",
      "Taste Triangulation Drills & Acidity/Body/Cleanliness Scoring",
      "Identifying & Penalizing Commercial Defects (Stinker, Sour, Mould, Phenol)",
      "Cupping for Green Coffee Procurement, Auction Bidding & Export Contracts"
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
      "Sensory aptitude and keen palate for flavor differentiation"
    ],
    careers: [
      "Licensed Coffee Cupper & Quality Assurance (QA) Director",
      "Green Coffee Buyer & Export Grader",
      "Auction Sensory Representative & Sample Room Manager",
      "Specialty Coffee Roastery Green Buyer"
    ],
    targetAudience: "Quality control technicians, coffee exporters, mill managers, and advanced sensory professionals.",
    intakes: ["January", "May", "September", "Monthly Cohorts"],
    practicalHoursRatio: "90% Sensory Lab Cupping • 10% Industry Standards",
    seoTitle: "Coffee Cupping & Grading Course Kenya | Sensory Technology | VIBIT",
    metaDescription: "Become a certified coffee cupper and sensory quality specialist at VIBIT. Master SCA grading, defect classification, and export lot evaluation in Nairobi.",
    primaryKeyword: "coffee cupping course Kenya"
  },
  {
    id: "coffee-roasting",
    title: "Coffee Roasting & Profile Analytics",
    category: "short",
    department: "coffee",
    subCategory: "Coffee Roasting",
    duration: "8 Weeks",
    level: "Intermediate to Advanced",
    certification: "VIBIT Certificate in Coffee Roasting Technology",
    description: "Operate commercial drum roasters (Probat, Diedrich), manage heat and air thermodynamics, trace roast curves, log Rate of Rise (RoR), and prevent roast defects.",
    syllabus: [
      "Commercial Drum Roaster Hardware Setup & Safe Operation",
      "Thermodynamics: Conduction, Convection, & Radiation Profiles",
      "Artisan & Cropster Software Integration and Curve Diagnostics",
      "Rate of Rise (RoR), Yellowing, Maillard Reaction & First Crack Dynamics",
      "Detecting Roast Defects: Under-Roasting, Scorching, Baking & Chipping"
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
      "Basic chemistry and thermodynamics comprehension"
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
    id: "barista-skills",
    title: "Barista Training & Coffee Arts",
    category: "certificate",
    department: "coffee",
    subCategory: "Barista Training",
    duration: "12 Weeks",
    level: "Level 3 Certificate",
    certification: "TVET Approved Certificate in Coffee Barista Skills",
    description: "Master commercial multi-boiler espresso machines, grind calibration, milk micro-foam texturing, free-pour latte art, manual brewing methods, and café workflow speed.",
    syllabus: [
      "Espresso Extraction Science, Dose/Yield Ratios & Grind Calibration",
      "Milk Chemistry, Micro-Foam Texturing & Symmetrical Latte Art Pours",
      "Manual Brewing Methods: V60, Chemex, Aeropress, French Press & Syphon",
      "Sensory Analysis Foundations & Dial-In Diagnostics",
      "High-Volume Café Workflow Optimization, Machine Backflushing & Maintenance"
    ],
    image: courseBaristaSkills,
    fees: {
      tuition: 50000,
      labFee: 10000,
      deposit: 0
    },
    schedule: "Full-Time (Mon - Fri) or Evening Sessions",
    requirements: [
      "Open to school leavers, hospitality workers, and coffee enthusiasts",
      "KCSE certificate or equivalent prior learning",
      "Passion for culinary hospitality and specialty beverage preparation"
    ],
    careers: [
      "Head Barista & Café Shift Supervisor",
      "Specialty Coffee Barista (Local & International Hospitality)",
      "Cruise Ship / Overseas Barista Specialist (Gulf, Europe, Australia)",
      "Café Entrepreneur / Independent Coffee Bar Founder"
    ],
    targetAudience: "Aspiring professional baristas, hospitality workers, café founders, and youth seeking high-paying global employment.",
    intakes: ["January", "May", "September", "First Monday of Every Month (Modular)"],
    practicalHoursRatio: "85% Hands-on Machine Labs • 15% Theory",
    seoTitle: "Barista Course in Nairobi Kenya | Professional Barista Training & Fees | VIBIT",
    metaDescription: "Enroll in accredited Coffee Barista Skills training in Nairobi at VIBIT. Master espresso calibration, milk latte art, brewing & café operations. Apply today.",
    primaryKeyword: "barista training Nairobi"
  },

  /* =========================================================================
     2. AGRICULTURE COURSES (Commercial, AgTech & Crop Science)
     ========================================================================= */
  {
    id: "agripreneurship",
    title: "Agripreneurship & Commodity Export Logistics",
    category: "professional",
    department: "agriculture",
    subCategory: "Agribusiness & Trade",
    duration: "8 Weeks",
    level: "Certificate & Practical Modules",
    certification: "TVET Approved Certificate in Agripreneurship",
    description: "Build scalable agribusiness ventures. Master global commodity supply chains, direct export trade protocols, farm financial bookkeeping, hedging on commodity exchanges, and agricultural investment pitch decks.",
    syllabus: [
      "Business Model Generation for Commercial & Contract Farms",
      "Global Coffee & Agricultural Supply Chains, Shipping & Trade Compliance",
      "Commodity Exchange Markets: Price Hedging & Risk Management",
      "Agribusiness Bookkeeping, Farm Audits & Taxation Standards",
      "Strategic Branding, Traceable E-Commerce & Pitching to Venture Capitalists"
    ],
    image: courseAgripreneurship,
    fees: {
      tuition: 40000,
      labFee: 20000,
      deposit: 0
    },
    schedule: "Weekend and Evening Hybrid",
    requirements: [
      "Interest in commercial agriculture, commodity export, and farm investments",
      "Basic business arithmetic and secondary education background",
      "Commercial farmers, exporters, and agro-investors highly welcomed"
    ],
    careers: [
      "Agribusiness Founder & Commercial Farm General Manager",
      "Agricultural Export Procurement & Logistics Officer",
      "Commodity Trading & International Sourcing Specialist",
      "Agri-Fintech & Agricultural Loan Portfolio Officer"
    ],
    targetAudience: "Commercial farmers, agricultural entrepreneurs, cooperative board members, and professionals launching agricultural enterprises.",
    intakes: ["January", "May", "September", "Modular Weekend Cohorts"],
    practicalHoursRatio: "70% Case Studies & Field Analysis • 30% Strategy Labs",
    seoTitle: "Agribusiness Course in Kenya | Agripreneurship & Export Training | VIBIT",
    metaDescription: "Learn commercial agribusiness, commodity export logistics, and farm financial management at VIBIT Agricultural Training College Nairobi.",
    primaryKeyword: "agribusiness course in Kenya"
  },
  {
    id: "ai-coffee-industry",
    title: "AI in Agriculture & Smart AgTech",
    category: "short",
    department: "agriculture",
    subCategory: "AgTech & Automation",
    duration: "12 Weeks",
    level: "Certificate in AgTech & AI",
    certification: "VIBIT Certificate in AI Applications for Agriculture & Supply Chain",
    description: "Learn to apply Artificial Intelligence, satellite remote sensing, computer vision bean defect sorting, smart IoT soil probes, and automated climate models in modern agriculture.",
    syllabus: [
      "Introduction to AI, IoT Probes & Machine Learning in Crop Science",
      "Computer Vision & Automated Optical Defect Sorting Systems",
      "AI-Powered Weather Forecasting, Microclimate Sensors & Yield Modeling",
      "Smart Supply Chain Blockchain Ledgers & Direct Digital Settlement",
      "AI in Precision Roasting Optimization & Cold-Chain Monitoring"
    ],
    image: aiCoffeeAgtech,
    fees: {
      tuition: 50000,
      labFee: 10000,
      deposit: 0
    },
    schedule: "Weekend Hybrid (Online Lectures + On-Campus Machine Lab)",
    requirements: [
      "Basic computer literacy and secondary school qualification",
      "Interest in agricultural technology, data analysis, and automation"
    ],
    careers: [
      "AgTech Systems Specialist & Digital Farm Integrator",
      "Smart Agriculture Data Analyst",
      "Automated Processing Mill Quality Supervisor",
      "Digital Traceability & Supply Chain Specialist"
    ],
    targetAudience: "Agronomists, tech innovators, agricultural researchers, and cooperative planners.",
    intakes: ["January", "May", "September", "Weekend Hybrid Sessions"],
    practicalHoursRatio: "60% Software & Lab Practical • 40% Conceptual Foundations",
    seoTitle: "AI in Agriculture Course Kenya | AgTech & Smart Coffee Farming | VIBIT",
    metaDescription: "Discover how AI and IoT sensors are revolutionizing agriculture, yield prediction, and coffee quality control in Kenya with VIBIT.",
    primaryKeyword: "AI in agriculture Kenya"
  },
  {
    id: "sustainable-agriculture",
    title: "Sustainable Agriculture & Crop Production",
    category: "certificate",
    department: "agriculture",
    subCategory: "Crop Science & Farm Management",
    duration: "12 Weeks",
    level: "Certificate Level",
    certification: "TVET Certificate in Sustainable Crop Production & Farm Management",
    description: "Comprehensive hands-on training in commercial horticulture, drip irrigation systems, soil fertility restoration, integrated pest management, and greenhouse management.",
    syllabus: [
      "Principles of Agroecology & Sustainable Soil Biology",
      "Commercial Greenhouse Design, Humidity & Temperature Automation",
      "Drip Irrigation Setup, Fertigation & Water Harvesting Systems",
      "Integrated Biological Pest & Disease Management",
      "Post-Harvest Handling, Cold Chain Logistics & Market Linkages"
    ],
    image: facilitySoilAnalytics,
    fees: {
      tuition: 55000,
      labFee: 15000,
      deposit: 0
    },
    schedule: "Full-Time (Mon - Fri) or Practical Saturday Intensive",
    requirements: [
      "KCSE D+ or prior practical experience in farm management",
      "Passion for sustainable food security and high-value horticulture"
    ],
    careers: [
      "Commercial Greenhouse & Horticultural Farm Manager",
      "Sustainable Agriculture Field Consultant",
      "Irrigation & Farm Infrastructure Specialist",
      "Agri-Extension Trainer & Organic Inspector"
    ],
    targetAudience: "Horticultural farmers, greenhouse managers, agricultural extension workers, and youth entering high-value crop production.",
    intakes: ["January", "May", "September", "Monthly Cohorts"],
    practicalHoursRatio: "75% Practical Farm Work • 25% Agricultural Science",
    seoTitle: "Sustainable Agriculture Course in Kenya | Crop Science & Farming | VIBIT",
    metaDescription: "Enroll in Sustainable Agriculture and Crop Production training in Nairobi at VIBIT. Master greenhouse management, drip irrigation, and soil science.",
    primaryKeyword: "sustainable agriculture course Kenya"
  },

  /* =========================================================================
     3. TVET PROGRAMMES (CDACC Accreditations & Hospitality)
     ========================================================================= */
  {
    id: "cooperative-management-diploma",
    title: "Diploma in Co-operative Management",
    category: "diploma",
    department: "tvet",
    subCategory: "TVET CDACC Level 6",
    duration: "Two Years",
    level: "Diploma Level (TVET CDACC Level 6)",
    certification: "TVET National Diploma in Co-operative Governance & Management",
    description: "Advanced 2-year leadership program for cooperative executives, covering administrative law, fiduciary audit standards, SACCO regulation, and international commodity trading.",
    syllabus: [
      "Advanced Cooperative Law & Administrative Statutory Compliance",
      "Strategic Financial Management, Portfolio Risk & Auditing Standards",
      "Direct Settlement Systems (DSS) & Macro Commodity Trading",
      "International Trade Logistics & Cooperative Direct Exporting",
      "Executive Leadership, Board Governance Dynamics & Member Equity"
    ],
    image: courseCoopDiploma,
    fees: {
      tuition: 270000,
      labFee: 0,
      deposit: 0
    },
    schedule: "Full-Time / Executive Modular Seminars (KSh 45,000 / semester)",
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
  },
  {
    id: "cooperative-management-cert",
    title: "Certificate in Co-operative Management",
    category: "certificate",
    department: "tvet",
    subCategory: "TVET CDACC Level 5",
    duration: "One Year",
    level: "Certificate Level (TVET CDACC Level 5)",
    certification: "TVET Certificate in Co-operative Governance & Operations",
    description: "Comprehensive grounding in cooperative bookkeeping, financial accounting, Direct Settlement System (DSS) payments, and member agricultural extension services.",
    syllabus: [
      "Cooperative Governance Legal Frameworks & Bylaws",
      "Financial Accounting, Fiduciary Bookkeeping & Annual Audit Prep",
      "Direct Settlement Systems (DSS) Operations & Mobile Integration",
      "Member Engagement, Dispute Resolution & Extension Coordination",
      "Agricultural Marketing & Cooperative Value Addition"
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
    id: "mixology",
    title: "Professional Mixology & Beverage Technology",
    category: "certificate",
    department: "tvet",
    subCategory: "Hospitality & Beverage Arts",
    duration: "12 Weeks",
    level: "Level 3 Certificate",
    certification: "TVET Approved Certificate in Mixology & Beverage Technology",
    description: "Designed for world-class hospitality venues. Master flavor chemistry, cold-brew infusions, mocktails, botanical bitters formulation, and bar speed workflow.",
    syllabus: [
      "Foundations of Flavor Pairing & Structural Taste Science",
      "Cold-Brew Infusions & Nitro-Draft Implementations",
      "Craft Syrups, Shrubs, and Botanical Bitters Production",
      "Creative Presentation, Garnish Artistry & Glassware Pairing",
      "Inventory Management, Bar Ergonomics, Safety & Responsible Service"
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
