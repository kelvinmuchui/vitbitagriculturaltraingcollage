import { Course, Facility, Testimonial, EnrollmentStep, FAQItem } from './types';

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
import courseGeneralAgric from './assets/images/course_general_agric_1791444493905.jpg';
import courseHorticultureFarm from './assets/images/course_horticulture_farm_1791444505047.jpg';
import courseWaiterService from './assets/images/course_waiter_service_1791444518473.jpg';
import courseFoodOperations from './assets/images/course_food_operations_1791444530728.jpg';
import homeAgronomyPreview from './assets/images/home_agronomy_preview_1784976428501.jpg';
import imageTableSettingLuxury from './assets/images/table_setting_luxury_1792575391469.jpg';
import imageFoodProductionKitchen from './assets/images/fb_production_kitchen_1792575405827.jpg';
import imageFoodManagementHotel from './assets/images/fb_management_hotel_1792575418080.jpg';
import imageAiCoffeeIndustry from './assets/images/ai_coffee_industry_1792575432414.jpg';

import facilityEspressoLab from './assets/images/facility_espresso_lab_1784976539403.jpg';
import facilityRoasteryQc from './assets/images/facility_roastery_qc_1784976554142.jpg';
import facilityCoffeeNursery from './assets/images/facility_coffee_nursery_1784976568320.jpg';

import testimonialMercy from './assets/images/testimonial_mercy_1784976594167.jpg';
import testimonialSamuel from './assets/images/testimonial_samuel_1784976608625.jpg';
import testimonialDavid from './assets/images/testimonial_david_1784976621584.jpg';

export const LOGO_URL = ""; // Empty string or placeholder since we are using the new React <Logo /> component!

export const COURSES: Course[] = [
  /* =========================================================================
     1. COFFEE COURSES (Exclusively 4 Dedicated Coffee Department Programs)
     ========================================================================= */
  {
    id: "barista-skills",
    title: "Coffee Barista skills",
    category: "certificate",
    department: "coffee",
    subCategory: "Barista Training & Coffee Arts",
    duration: "12 weeks",
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
      labFee: 0,
      deposit: 0
    },
    schedule: "Full-Time (Mon - Fri) or Modular Weekend",
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
    intakes: ["January", "May", "September", "Monthly Modular"],
    practicalHoursRatio: "85% Hands-on Machine Labs • 15% Theory",
    seoTitle: "Coffee Barista Skills Course in Nairobi Kenya | Barista Training & Fees | VIBIT",
    metaDescription: "Enroll in accredited Coffee Barista Skills training in Nairobi at VIBIT. Master espresso calibration, milk latte art, brewing & café operations. Duration 12 weeks, fees KSh 50,000.",
    primaryKeyword: "coffee barista skills Nairobi"
  },
  {
    id: "coffee-agronomy",
    title: "coffee Agronomy",
    category: "certificate",
    department: "coffee",
    subCategory: "Coffee Agronomy & Crop Science",
    duration: "8 weeks",
    level: "Level 3 Certificate",
    certification: "TVET Approved Certificate in Coffee Agronomy",
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
      tuition: 80000,
      labFee: 0,
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
    seoTitle: "Coffee Agronomy Course Kenya | Sustainable Farming | VIBIT",
    metaDescription: "Study coffee agronomy, nursery management, soil nutrition, and climate-smart agronomy in Nairobi with VIBIT Agricultural Training College. Duration 8 weeks, fees KSh 80,000.",
    primaryKeyword: "coffee agronomy course Kenya"
  },
  {
    id: "coffee-cupping-technology",
    title: "Coffee cupping and technology",
    category: "diploma",
    department: "coffee",
    subCategory: "Sensory & Quality Technology",
    duration: "8 weeks",
    level: "Advanced Certificate / Diploma",
    certification: "TVET Certificate in Coffee Cupping, Technology & Sensory Quality Control",
    description: "Comprehensive training combining coffee cupping, SCA sensory protocols, flavor wheel analysis, green bean defect grading, moisture testing metrics, and laboratory quality control.",
    syllabus: [
      "SCA Sensory Evaluation Protocols, Calibration & Triangulation Drills",
      "Olfactory Discrimination & Flavor Wheel Mapping (Acidity, Body, Cleanliness)",
      "Physical Green Coffee Bean Grading & Kenya Coffee Directorate Standards",
      "Moisture Content, Water Activity & Bean Density Measurement",
      "Commercial Defect Scoring, Auction Lot Validation & Export Compliance"
    ],
    image: cuppingLabSetup,
    fees: {
      tuition: 130000,
      labFee: 0,
      deposit: 0
    },
    schedule: "Full-Time (Mon - Fri) or Alternate Weekends",
    requirements: [
      "Secondary school certificate (KCSE D+ or equivalent)",
      "Basic interest or background in sensory evaluation, coffee quality, or laboratory testing"
    ],
    careers: [
      "Licensed Coffee Cupper & Quality Assurance (QA) Director",
      "Green Coffee Buyer & Export Grader",
      "Auction Sensory Representative & Sample Room Manager",
      "Dry Mill Quality Supervisor & Standard Inspector"
    ],
    targetAudience: "Quality control technicians, coffee exporters, mill managers, baristas advancing to sensory QA, and coffee cooperative officers.",
    intakes: ["January", "May", "September", "Monthly Modular"],
    practicalHoursRatio: "85% Sensory Lab Diagnostics & Cupping • 15% Theory",
    seoTitle: "Coffee Cupping and Technology Course in Kenya | VIBIT",
    metaDescription: "Master coffee cupping and technology at VIBIT Agricultural Training College in Nairobi. SCA sensory protocols, green bean grading, moisture analytics. Duration 8 weeks, fees KSh 130,000.",
    primaryKeyword: "coffee cupping and technology Kenya"
  },
  {
    id: "coffee-roasting",
    title: "coffee Roasting",
    category: "short",
    department: "coffee",
    subCategory: "Roasting Technology",
    duration: "8 weeks",
    level: "Intermediate to Advanced Certificate",
    certification: "VIBIT Certificate in Coffee Roasting Technology",
    description: "Operate commercial drum roasters, manage heat and air thermodynamics, trace roast curves, log Rate of Rise (RoR), and prevent roast defects for specialty coffee.",
    syllabus: [
      "Commercial Drum Roaster Hardware Setup & Safe Operation",
      "Thermodynamics: Conduction, Convection, & Radiation Profiles",
      "Artisan & Cropster Software Integration and Curve Diagnostics",
      "Rate of Rise (RoR), Yellowing, Maillard Reaction & First Crack Dynamics",
      "Detecting Roast Defects: Under-Roasting, Scorching, Baking & Chipping"
    ],
    image: coffeeRoastingMachine,
    fees: {
      tuition: 80000,
      labFee: 0,
      deposit: 0
    },
    schedule: "Intensive Day or Evening Sessions",
    requirements: [
      "Open to baristas, roastery operators, and coffee entrepreneurs",
      "Basic understanding of coffee fundamentals"
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
    metaDescription: "Learn commercial coffee roasting in Nairobi at VIBIT. Master drum roaster thermodynamics, Cropster profile logging, and defect analysis. Duration 8 weeks, fees KSh 80,000.",
    primaryKeyword: "coffee roasting course Kenya"
  },
  {
    id: "ai-coffee-industry",
    title: "Certificate in AI in Coffee Industry",
    category: "certificate",
    department: "coffee",
    subCategory: "Coffee Technology & AI",
    duration: "12 Weeks",
    level: "Certificate Level",
    certification: "VIBIT Certificate in AI in Coffee Industry & Smart Processing",
    description: "Master artificial intelligence applications across the modern specialty coffee value chain. Learn computer vision for green coffee bean defect grading, IoT smart moisture & microclimate probes, automated roaster profiling algorithms, and digital supply chain traceability.",
    syllabus: [
      "Introduction to AI, IoT Telemetry & Machine Learning in Specialty Coffee",
      "Computer Vision & Optical Green Bean Defect Sorting Systems",
      "AI-Powered Microclimate Telemetry, Weather Modeling & Yield Analytics",
      "Automated Roaster Profiling, Real-Time RoR Diagnostics & Flavor Optimization",
      "Digital Supply Chain Traceability, Smart Contracts & Direct Export Valuation"
    ],
    image: imageAiCoffeeIndustry,
    fees: {
      tuition: 50000,
      labFee: 10000,
      deposit: 0
    },
    schedule: "Weekend Hybrid (Online Lectures + On-Campus Coffee Tech Lab)",
    requirements: [
      "Open to coffee professionals, baristas, roasters, agronomists, and tech enthusiasts",
      "Basic computer literacy and secondary school qualification"
    ],
    careers: [
      "Smart Coffee Technology Specialist & Digital Mill Integrator",
      "AI-Assisted Quality Assurance Inspector & Cupper",
      "Automated Processing Mill Quality Supervisor",
      "Coffee Supply Chain & Digital Traceability Lead"
    ],
    targetAudience: "Baristas, roasters, coffee cooperative officers, exporters, and technology innovators seeking to leverage AI in the specialty coffee industry.",
    intakes: ["January", "May", "September", "Modular Weekend Cohorts"],
    practicalHoursRatio: "70% Software & Lab Practical • 30% Sensory and Roasting Integration",
    seoTitle: "Certificate in AI in Coffee Industry Kenya | Smart Coffee Tech | VIBIT",
    metaDescription: "Master AI in coffee at VIBIT Nairobi. Computer vision bean defect sorting, IoT moisture telemetry, automated roast profiling, and supply chain analytics. 12 weeks, KSh 60,000.",
    primaryKeyword: "Certificate in AI in Coffee Industry Kenya"
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
  {
    id: "general-agriculture-level-5",
    title: "General Agriculture (Level 5 Certificate)",
    category: "certificate",
    department: "agriculture",
    subCategory: "General Agriculture",
    duration: "1 Year (3 Terms)",
    level: "Level 5 Certificate (TVET CDACC)",
    certification: "TVET CDACC National Certificate in General Agriculture (Level 5)",
    description: "Hands-on competency-based training in crop husbandry, livestock management, soil fertility conservation, farm machinery operation, and farm budgeting.",
    syllabus: [
      "Crop Production Systems & Soil Fertility Management",
      "Livestock Husbandry, Animal Feeds & Health Basics",
      "Farm Structures, Implements & Machinery Operation",
      "Agroforestry, Water Harvesting & Soil Conservation",
      "Agricultural Economics, Record Keeping & Farm Budgeting"
    ],
    image: courseGeneralAgric,
    fees: {
      tuition: 65000,
      labFee: 15000,
      deposit: 0
    },
    schedule: "Full-Time (Mon - Fri) or Modular Block Release",
    requirements: [
      "KCSE mean grade D (Plain) or equivalent qualification",
      "Or recognized TVET Level 4 Certificate in Agriculture",
      "Passion for practical farming and agribusiness"
    ],
    careers: [
      "Assistant Farm Manager / Farm Supervisor",
      "Crop & Livestock Field Technician",
      "Agro-Vet Sales Representative & Technical Advisor",
      "Agricultural Demonstration Field Assistant"
    ],
    targetAudience: "School leavers, commercial farm technicians, family farm operators, and aspiring agricultural entrepreneurs.",
    intakes: ["January", "May", "September"],
    practicalHoursRatio: "75% Practical Farm Fields • 25% Theory",
    seoTitle: "General Agriculture Certificate Level 5 Kenya | TVET CDACC | VIBIT",
    metaDescription: "Study General Agriculture Level 5 Certificate in Nairobi at VIBIT. TVET CDACC accredited curriculum in crop production, livestock, and farm management.",
    primaryKeyword: "general agriculture certificate Kenya level 5"
  },
  {
    id: "general-agriculture-level-6",
    title: "General Agriculture (Level 6 Diploma)",
    category: "diploma",
    department: "agriculture",
    subCategory: "General Agriculture",
    duration: "2 Years (6 Terms / Modular)",
    level: "Level 6 Diploma (TVET CDACC)",
    certification: "TVET CDACC National Diploma in General Agriculture (Level 6)",
    description: "Advanced agricultural management diploma covering commercial agronomy, animal breeding technologies, farm project appraisal, irrigation engineering, and agribusiness value chains.",
    syllabus: [
      "Advanced Commercial Crop Husbandry & Seed Technology",
      "Animal Nutrition, Breeding Systems & Dairy Management",
      "Agricultural Irrigation Engineering & Soil Science",
      "Farm Enterprise Planning, Financial Management & Auditing",
      "Agribusiness Supply Chains, Value Addition & Commodity Trade",
      "Agricultural Research Methods & Field Project Work"
    ],
    image: courseGeneralAgric,
    fees: {
      tuition: 130000,
      labFee: 25000,
      deposit: 0
    },
    schedule: "Full-Time or Executive Modular",
    requirements: [
      "KCSE mean grade C- (Minus) or equivalent",
      "Or Level 5 Certificate in General Agriculture / Related Field",
      "Pass in Biology / Agriculture and Mathematics"
    ],
    careers: [
      "Commercial Farm General Manager",
      "Agricultural Project Officer (NGO & Government)",
      "Agro-Industrial Production Supervisor",
      "Agricultural Loan Appraiser & Technical Consultant"
    ],
    targetAudience: "Aspiring farm directors, agribusiness managers, agriculture diploma candidates, and enterprise managers.",
    intakes: ["January", "May", "September"],
    practicalHoursRatio: "70% Experimental Plots & Labs • 30% Management Theory",
    seoTitle: "General Agriculture Diploma Level 6 Kenya | TVET CDACC | VIBIT",
    metaDescription: "Enroll in the TVET CDACC Diploma in General Agriculture Level 6 at VIBIT Nairobi. Master commercial crop farming, livestock production, and farm management.",
    primaryKeyword: "general agriculture diploma Kenya level 6"
  },
  {
    id: "agriculture-extension-level-5",
    title: "Agriculture and Extension (Level 5 Certificate)",
    category: "certificate",
    department: "agriculture",
    subCategory: "Agriculture Extension",
    duration: "1 Year (3 Terms)",
    level: "Level 5 Certificate (TVET CDACC)",
    certification: "TVET CDACC National Certificate in Agriculture and Extension (Level 5)",
    description: "Prepare for essential field extension advisory services. Learn participatory farmer training methodologies, group mobilization, modern crop demonstration trials, climate change adaptation advisory, and rural pest control support.",
    syllabus: [
      "Principles & Methodologies of Agricultural Extension",
      "Farmer Group Formation, Leadership & Community Mobilization",
      "Field Demonstration Plot Design & Farmer Field Schools (FFS)",
      "Climate-Smart Agriculture & Soil Fertility Extension",
      "Agricultural Communication Skills & Information Dissemination"
    ],
    image: homeAgronomyPreview,
    fees: {
      tuition: 65000,
      labFee: 15000,
      deposit: 0
    },
    schedule: "Full-Time or Block Release",
    requirements: [
      "KCSE mean grade D (Plain) or equivalent",
      "Or TVET Level 4 Certificate in Agriculture",
      "Strong passion for community development and farmer empowerment"
    ],
    careers: [
      "Community Agricultural Extension Field Assistant",
      "Farmer Field School (FFS) Facilitator",
      "Cooperative Society Agricultural Extension Officer",
      "Agro-Dealer Technical Field Advisor"
    ],
    targetAudience: "Community workers, cooperative field staff, youth champions in agriculture, and outreach officers.",
    intakes: ["January", "May", "September"],
    practicalHoursRatio: "75% Community Fieldwork & Demonstrations • 25% Theory",
    seoTitle: "Agriculture and Extension Certificate Level 5 Kenya | VIBIT",
    metaDescription: "Study Agriculture and Extension Level 5 Certificate in Nairobi at VIBIT. Become a qualified agricultural extension field agent and community trainer.",
    primaryKeyword: "agriculture and extension certificate Kenya level 5"
  },
  {
    id: "agriculture-extension-level-6",
    title: "Agriculture and Extension (Level 6 Diploma)",
    category: "diploma",
    department: "agriculture",
    subCategory: "Agriculture Extension",
    duration: "2 Years (6 Terms / Modular)",
    level: "Level 6 Diploma (TVET CDACC)",
    certification: "TVET CDACC National Diploma in Agriculture and Extension (Level 6)",
    description: "Advanced diploma in agricultural extension leadership, rural socio-economic analysis, digital extension technologies, program design, monitoring and evaluation (M&E), and participatory technology transfer.",
    syllabus: [
      "Advanced Extension Programme Planning, M&E and Policy",
      "Rural Sociology, Behavioral Change & Farmer Mobilization",
      "Digital Extension Systems, Mobile Advisory & Agri-ICT Tools",
      "Agricultural Value Chain Analysis & Market Linkages",
      "Sustainable Natural Resource Management & Watershed Extension",
      "Research Methods in Extension & Field Practicum Dissertation"
    ],
    image: homeAgronomyPreview,
    fees: {
      tuition: 130000,
      labFee: 25000,
      deposit: 0
    },
    schedule: "Full-Time or Executive Modular",
    requirements: [
      "KCSE mean grade C- (Minus) or equivalent",
      "Or Level 5 Certificate in Agriculture and Extension / General Agriculture",
      "Commitment to agricultural advisory leadership"
    ],
    careers: [
      "County Agricultural Extension Officer",
      "Agricultural Project Coordinator (NGOs, USAID, FAO, AGRA)",
      "Cooperative Agricultural Extension Director",
      "Agricultural Extension Program Monitoring & Evaluation Specialist"
    ],
    targetAudience: "Agricultural extension professionals, development project officers, cooperative managers, and agriculture diploma seekers.",
    intakes: ["January", "May", "September"],
    practicalHoursRatio: "65% Field Practicum & Rural Outreach • 35% Academic Seminars",
    seoTitle: "Agriculture and Extension Diploma Level 6 Kenya | VIBIT",
    metaDescription: "TVET CDACC Diploma in Agriculture and Extension Level 6 in Nairobi at VIBIT. Master rural advisory programs, digital extension tools, and value chains.",
    primaryKeyword: "agriculture and extension diploma Kenya level 6"
  },
  {
    id: "horticulture-level-5",
    title: "Horticulture Production (Level 5 Certificate)",
    category: "certificate",
    department: "agriculture",
    subCategory: "Horticulture",
    duration: "1 Year (3 Terms)",
    level: "Level 5 Certificate (TVET CDACC)",
    certification: "TVET CDACC National Certificate in Horticulture Production (Level 5)",
    description: "Intensive commercial training in high-value vegetable farming (olericulture), fruit orchards (pomology), cut flowers (floriculture), greenhouse production, drip irrigation systems, and GlobalGAP export guidelines.",
    syllabus: [
      "Commercial Vegetable & Herb Production (Olericulture)",
      "Fruit Tree Propagation, Orchard Layout & Management (Pomology)",
      "Commercial Floriculture & Cut-Flower Production",
      "Greenhouse Climate Control, Hydroponics & Drip Fertigation",
      "Post-Harvest Grading, Packhouse Sorting & GlobalGAP Standards"
    ],
    image: courseHorticultureFarm,
    fees: {
      tuition: 70000,
      labFee: 20000,
      deposit: 0
    },
    schedule: "Full-Time (Mon - Fri) or Practical Saturday Track",
    requirements: [
      "KCSE mean grade D (Plain) or equivalent",
      "Or TVET Level 4 Certificate in Crop Production",
      "Passion for high-value horticultural crops and greenhouse farming"
    ],
    careers: [
      "Commercial Greenhouse Supervisor",
      "Horticultural Farm Production Assistant",
      "Fresh Produce Packhouse Quality Inspector",
      "Nursery & Floriculture Technician"
    ],
    targetAudience: "Greenhouse farmers, export horticulture workers, youth entering commercial vegetable/flower production, and estate technicians.",
    intakes: ["January", "May", "September"],
    practicalHoursRatio: "80% Greenhouse & Field Trials • 20% Theory",
    seoTitle: "Horticulture Certificate Level 5 Kenya | Commercial Greenhouse | VIBIT",
    metaDescription: "Study Horticulture Level 5 Certificate in Nairobi at VIBIT. Hands-on greenhouse management, drip fertigation, vegetable and flower production.",
    primaryKeyword: "horticulture certificate Kenya level 5"
  },
  {
    id: "horticulture-level-6",
    title: "Horticulture Production & Management (Level 6 Diploma)",
    category: "diploma",
    department: "agriculture",
    subCategory: "Horticulture",
    duration: "2 Years (6 Terms / Modular)",
    level: "Level 6 Diploma (TVET CDACC)",
    certification: "TVET CDACC National Diploma in Horticulture Production & Management (Level 6)",
    description: "Advanced horticultural enterprise diploma covering commercial export horticulture, cold chain logistics, post-harvest physiology, automated climate greenhouses, integrated pest management (IPM), and international phytosanitary compliance.",
    syllabus: [
      "Advanced Commercial Floriculture & Ornamental Horticulture",
      "High-Value Vegetable & Protected Crop Production Systems",
      "Tropical & Subtropical Pomology and Orchard Economics",
      "Post-Harvest Physiology, Modified Atmosphere Storage & Cold Chains",
      "Integrated Pest & Disease Management (Biological Controls & IPM)",
      "International Fresh Produce Trade, Phytosanitary Laws & GlobalGAP/BRC Auditing"
    ],
    image: courseHorticultureFarm,
    fees: {
      tuition: 135000,
      labFee: 30000,
      deposit: 0
    },
    schedule: "Full-Time or Executive Modular",
    requirements: [
      "KCSE mean grade C- (Minus) or equivalent",
      "Or Level 5 Certificate in Horticulture Production / Agriculture",
      "Pass in Biology / Agriculture and Chemistry / Science"
    ],
    careers: [
      "Horticultural Farm General Manager / Production Director",
      "Horticultural Export Packhouse Operations Manager",
      "Fresh Produce Quality Assurance (QA) Director",
      "Horticultural Agronomy Consultant & GlobalGAP Auditor"
    ],
    targetAudience: "Horticultural estate managers, exporters, agronomists, greenhouse supervisors, and commercial farm owners.",
    intakes: ["January", "May", "September"],
    practicalHoursRatio: "75% Greenhouse, Field & Packhouse Practicals • 25% Management",
    seoTitle: "Horticulture Diploma Level 6 Kenya | Commercial Production | VIBIT",
    metaDescription: "Enroll in the TVET CDACC Diploma in Horticulture Level 6 at VIBIT Agricultural Training College Nairobi. Master export flower, vegetable, and orchard management.",
    primaryKeyword: "horticulture diploma Kenya level 6"
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
    id: "food-beverage-production-level-5",
    title: "Food and Beverage Production (Level 5)",
    category: "certificate",
    department: "tvet",
    subCategory: "Food & Beverage Production (TVET CDACC)",
    duration: "1 year",
    level: "Level 5 Certificate (TVET CDACC)",
    certification: "TVET CDACC National Certificate in Food and Beverage Production (Level 5)",
    description: "1-year comprehensive commercial culinary and food production qualification. Master commercial kitchen management, hot and cold culinary production, food costing, yield analysis, HACCP food hygiene safety standards, menu engineering, and culinary presentation.",
    syllabus: [
      "Commercial Kitchen Organization, Hygiene & HACCP Regulatory Safety",
      "Culinary Foundations: Stocks, Soups, Mother Sauces & Entrées",
      "Baking & Pastry Production, Plating Artistry & Buffet Presentation",
      "Food Costing, Recipe Standardisation & Portion Control Systems",
      "Menu Engineering, Dietary Nutrition & Allergen Management",
      "Food & Beverage Cold-Chain Storage & Inventory Control"
    ],
    image: imageFoodProductionKitchen,
    fees: {
      tuition: 110000,
      labFee: 0,
      deposit: 0
    },
    schedule: "Full-Time (1 Year / 3 Terms) or Modular Block Release",
    requirements: [
      "KCSE mean grade D+ (Plus) or C- (Minus) or equivalent",
      "Or TVET Level 4 Certificate in Food and Beverage / Hospitality",
      "Passion for commercial food production, culinary arts, and professional kitchen operations"
    ],
    careers: [
      "Commercial Chef de Partie / Kitchen Supervisor",
      "Food Production Lead / Commissary Kitchen Supervisor",
      "Institutional Catering Operations Supervisor (Schools, Hospitals, Corporate)",
      "Catering Entrepreneur & Commercial Food Producer"
    ],
    targetAudience: "Aspiring professional chefs, culinary supervisors, commercial kitchen operators, and students advancing in food production leadership.",
    intakes: ["January", "May", "September"],
    practicalHoursRatio: "80% Commercial Kitchen Culinary Labs • 20% Theory & Costing",
    seoTitle: "Food and Beverage Production Level 5 Course Kenya | TVET CDACC | VIBIT",
    metaDescription: "Enroll in TVET CDACC Level 5 Certificate in Food and Beverage Production at VIBIT Nairobi. 1 year comprehensive commercial culinary and kitchen management. Fees KSh 110,000.",
    primaryKeyword: "food and beverage production level 5"
  },
  {
    id: "food-beverage-management-level-6",
    title: "Food and Beverage Management (Level 6)",
    category: "diploma",
    department: "tvet",
    subCategory: "Food & Beverage Management (TVET CDACC)",
    duration: "2 years",
    level: "Level 6 Diploma (TVET CDACC)",
    certification: "TVET CDACC National Diploma in Food and Beverage Management (Level 6)",
    description: "Advanced 2-year diploma for executive hospitality managers and food & beverage directors. Master strategic hospitality finance, international culinary trends, sommelier & cellar management, facility design, labor regulations, and luxury guest experience.",
    syllabus: [
      "Strategic Food & Beverage Operations & Facility Layout Planning",
      "Advanced Hospitality Financial Accounting, Budgeting & P&L Analysis",
      "International Beverage Trade, Cellar Management & Sommelier Studies",
      "Total Quality Management (TQM), ISO 22000 & Global Food Safety Audits",
      "Human Resource Management, Hospitality Labor Law & Team Leadership",
      "Hospitality Marketing, Brand Positioning & Revenue Management"
    ],
    image: imageFoodManagementHotel,
    fees: {
      tuition: 255000,
      labFee: 0,
      deposit: 0
    },
    schedule: "2 Years (6 Terms) • First Year: KSh 45,000 per term (3 terms = KSh 135,000) • Second Year: KSh 40,000 per term (3 terms = KSh 120,000)",
    requirements: [
      "KCSE mean grade C- (Minus) or equivalent",
      "Or Level 5 Certificate in Food and Beverage Management / Operations",
      "Aspirations toward senior hospitality leadership and enterprise management"
    ],
    careers: [
      "Food and Beverage Director / Operations Manager",
      "Executive Restaurant General Manager",
      "Hotel Banquet & Catering Director",
      "Hospitality Consultant & Culinary Business Entrepreneur"
    ],
    targetAudience: "Career hospitality professionals, senior supervisors, hotel managers, and entrepreneurs establishing restaurant and catering ventures.",
    intakes: ["January", "May", "September"],
    practicalHoursRatio: "65% Management Simulation & Practical Labs • 35% Strategic Leadership",
    seoTitle: "Food and Beverage Management Level 6 Diploma Kenya | TVET CDACC | VIBIT",
    metaDescription: "Enroll in the TVET CDACC Diploma in Food and Beverage Management Level 6 at VIBIT Nairobi. 2 years (Year 1: KSh 45k/term, Year 2: KSh 40k/term). Total KSh 255,000.",
    primaryKeyword: "food and beverage management level 6"
  },

  /* =========================================================================
     4. HOSPITALITY DEPARTMENT (TVET CDACC Certified Programs)
     ========================================================================= */
  {
    id: "mixology",
    title: "Mixology",
    category: "certificate",
    department: "hospitality",
    subCategory: "Hospitality & Beverage Arts",
    duration: "12 weeks",
    level: "Level 3 Certificate",
    certification: "TVET Approved Certificate in Mixology",
    description: "Designed for modern beverage lounges and luxury hospitality venues. Master flavor chemistry, craft syrups, botanical infusions, classic & contemporary mocktails and cocktails, bar ergonomics, and responsible service.",
    syllabus: [
      "Foundations of Flavor Pairing & Structural Taste Science",
      "Cold-Brew Infusions, Craft Syrups, Shrubs & Botanical Bitters",
      "Classic & Contemporary Mocktails, Cocktails & Drink Styling",
      "Bar Station Ergonomics, Speed Pouring & Glassware Pairing",
      "Inventory Management, Bar Costing, Safety & Responsible Service"
    ],
    image: courseMixology,
    fees: {
      tuition: 60000,
      labFee: 0,
      deposit: 0
    },
    schedule: "Full-Time (Mon - Fri) or Evening / Weekend Track",
    requirements: [
      "Minimum age: 18 years",
      "Passion for beverage craftsmanship, flavor pairing, and hospitality service"
    ],
    careers: [
      "Professional Mixologist & Bar Captain",
      "Craft Beverage & Mocktail Specialist",
      "Luxury Resort & Hotel Lounge Bartender",
      "Mobile Bar & Events Beverage Caterer"
    ],
    targetAudience: "Hospitality professionals, bartenders, beverage developers, and restaurant service staff.",
    intakes: ["January", "May", "September", "Monthly Cohorts"],
    practicalHoursRatio: "85% Bar Practical Lab • 15% Flavor Science",
    seoTitle: "Mixology Course Nairobi Kenya | 12 Weeks Bar Training | VIBIT",
    metaDescription: "Study professional mixology in Nairobi with VIBIT. 12-week comprehensive bar training, drink styling, and customer service. Fees KSh 60,000.",
    primaryKeyword: "mixology course Nairobi 12 weeks"
  },
  {
    id: "food-beverage-management-level-2",
    title: "Food and Beverage management level 2 waiter module 1",
    category: "certificate",
    department: "hospitality",
    subCategory: "Food & Beverage Management",
    duration: "3 months",
    level: "Level 2 Certificate (TVET CDACC)",
    certification: "TVET CDACC National Certificate in Food and Beverage Management (Level 2 Waiter Module 1)",
    description: "Professional fast-track entry course for restaurant and dining service. Master exquisite table setting covers, order taking, tray balance, plate clearing, beverage service sequences, food hygiene, and dining room etiquette.",
    syllabus: [
      "Introduction to Food & Beverage Service Industry & Hierarchy",
      "Restaurant Equipment, Glassware, Crockery & Silverware Handling",
      "Table Laying, Cover Settings (A La Carte & Table D'Hôte) & Napkin Folds",
      "Tray Service Mechanics, Plate Service & Clearance Techniques",
      "Guest Greeting, Order Taking, Food Service Sequence & Etiquette",
      "Hospitality Personal Hygiene, Grooming Standards & Safety"
    ],
    image: imageTableSettingLuxury,
    fees: {
      tuition: 50000,
      labFee: 0,
      deposit: 0
    },
    schedule: "Full-Time Intensive (3 Months / 1 Term) or Modular Shift Release",
    requirements: [
      "KCSE Certificate or open entry for passionate hospitality starters",
      "Good interpersonal communication skills and enthusiasm for customer service",
      "Minimum age: 18 years"
    ],
    careers: [
      "Professional Restaurant Waiter / Server",
      "Banquet & Events Catering Server",
      "Hotel In-Room Dining Server",
      "Café & Bistro Service Attendant"
    ],
    targetAudience: "School leavers, youth seeking fast-track employment in hotels, restaurants, lounges, and catering establishments.",
    intakes: ["Monthly Intakes", "January", "May", "September"],
    practicalHoursRatio: "85% Restaurant Simulation Lab • 15% Service Theory",
    seoTitle: "Food and Beverage Management Level 2 Waiter Module 1 Nairobi | VIBIT",
    metaDescription: "Train as a certified professional waiter in Nairobi with VIBIT. 3 months TVET CDACC Level 2 Waiter Module 1 course. Fees KSh 50,000.",
    primaryKeyword: "food and beverage management level 2 waiter module 1"
  },
  {
    id: "food-beverage-management-level-4",
    title: "Food and beverage management level 4 - waiter module 1 and 2",
    category: "certificate",
    department: "hospitality",
    subCategory: "Food & Beverage Management",
    duration: "6 months",
    level: "Level 4 Certificate (TVET CDACC)",
    certification: "TVET CDACC National Certificate in Food and Beverage Management - Waiter Modules 1 & 2 (Level 4)",
    description: "Comprehensive 6-month dining room and supervisory service program covering Modules 1 & 2. Master luxury table settings, silver service, guéridon trolley service, wine & beverage service etiquette, station supervision, handling guest billing and POS, upselling, and VIP protocol.",
    syllabus: [
      "Module 1: Professional Table Service, Covers & Restaurant Mechanics",
      "Module 2: Advanced Silver Service, Guéridon & Flambé Service",
      "Wine Knowledge, Wine Service Protocols & Beverage Pairing",
      "Station Supervision, Shift Handover & Table Allocation",
      "Point of Sale (POS) Billing, Cashiering & Guest Complaint Resolution",
      "Banqueting, Conference Buffets & VIP Dignitary Service Protocols"
    ],
    image: imageTableSettingLuxury,
    fees: {
      tuition: 85000,
      labFee: 0,
      deposit: 0
    },
    schedule: "Full-Time (6 Months / 2 Terms) or Modular Shift Release",
    requirements: [
      "KCSE mean grade D (Plain) or equivalent",
      "Or Level 2 Certificate in Food & Beverage / Prior Waiter experience",
      "Professional demeanor and service passion"
    ],
    careers: [
      "Captain Waiter / Restaurant Station Head",
      "Fine Dining Head Server",
      "Banquet Service Supervisor",
      "Cruise Ship / 5-Star Hotel Dining Server"
    ],
    targetAudience: "Experienced waiters upgrading to supervisory level, hospitality practitioners, and career service professionals.",
    intakes: ["January", "May", "September"],
    practicalHoursRatio: "80% Advanced Service Lab & Banqueting • 20% Supervisory Theory",
    seoTitle: "Food and Beverage Management Level 4 Waiter Modules 1 & 2 Nairobi | VIBIT",
    metaDescription: "Advance your hospitality career with TVET CDACC Level 4 Food and Beverage Management (Waiter Modules 1 & 2) at VIBIT Nairobi. 6 months, KSh 85,000.",
    primaryKeyword: "food and beverage management level 4 waiter module 1 and 2"
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

export const OFFICIAL_FAQS: FAQItem[] = [
  {
    id: "faq-location",
    question: "Where is VIBIT Agricultural Training College located?",
    answer: "VIBIT Agricultural Training College is located at Leomar Court, 45 Westlands Road, Westlands, Nairobi, Kenya (P.O. Box 14700-00800 Nairobi). Our central Westlands campus is situated in a secure, easily accessible commercial and educational hub with seamless public transit links, on-site specialty coffee laboratories, commercial roasteries, and modern agribusiness lecture rooms.",
    category: "location",
    badge: "Location & Campus"
  },
  {
    id: "faq-coffee-training",
    question: "Does VIBIT offer coffee training?",
    answer: "Yes, absolutely. VIBIT provides comprehensive, hands-on practical coffee training spanning the entire farm-to-cup value chain. Our accredited courses include Professional Barista Training & Latte Art, Commercial Coffee Roasting & Profiling, Sensory Cupping & Quality Evaluation, and Coffee Production & Post-Harvest Processing. Training is conducted on commercial equipment including La Marzocco espresso machines, Mahlkönig grinders, and Probat drum roasters.",
    category: "courses",
    badge: "Coffee Education"
  },
  {
    id: "faq-coffee-tech",
    question: "Does VIBIT offer coffee technology courses?",
    answer: "Yes. VIBIT offers the specialized \"Coffee Technology & Quality Science\" program (12 Weeks). This course provides in-depth training on green coffee grading, physical screen sizing, defect classification according to international standards, moisture and water activity analytics, dry milling operations, hulling mechanics, and export lot preparation for international commodity trade.",
    category: "courses",
    badge: "Coffee Technology"
  },
  {
    id: "faq-agri-courses",
    question: "Does VIBIT offer agricultural courses?",
    answer: "Yes. VIBIT offers high-impact, market-driven agricultural courses including Agripreneurship & Commodity Export Logistics, AI in Agriculture & Smart AgTech, Sustainable Agriculture & Crop Production, and Sustainable Coffee Agronomy. Our curriculum integrates commercial greenhouse management, drip irrigation systems, regenerative soil health, and digital agricultural tools.",
    category: "courses",
    badge: "Agribusiness & AgTech"
  },
  {
    id: "faq-how-to-apply",
    question: "How can I apply to VIBIT?",
    answer: "Applying to VIBIT is quick and straightforward: (1) Online through our interactive Admissions Portal on this website, (2) By emailing your academic certificates and national ID copy to vbitschoolofcoffeagribusiness@gmail.com, (3) Via WhatsApp or telephone call to our Admissions Desk at +254 708 137992 / +254 759 065 090, or (4) In person by visiting our Westlands campus at Leomar Court, 45 Westlands Road, Nairobi.",
    category: "admissions",
    badge: "Enrollment & Intake"
  },
  {
    id: "faq-short-courses",
    question: "Does VIBIT offer short courses?",
    answer: "Yes. VIBIT offers flexible modular short courses ranging from 1 to 8 weeks in Barista Skills, Commercial Coffee Roasting, Wet Mill Operations, Sensory Cupping Triangulation, and Smart AgTech workshops. These intensive programs are designed for working professionals, entrepreneurs, and busy students, offering flexible full-time, evening, and Saturday intensive schedules.",
    category: "courses",
    badge: "Short & Modular Courses"
  },
  {
    id: "faq-tvet-programmes",
    question: "Does VIBIT offer TVET programmes?",
    answer: "Yes. VIBIT Agricultural Training College is a TVET-approved and CDACC-accredited vocational training institution. We offer TVET National Diploma (Level 6) and Certificate (Level 5) programs in Co-operative Management, Coffee Barista Skills (Level 3), and Professional Mixology & Beverage Technology.",
    category: "tvet",
    badge: "TVET / CDACC Accredited"
  },
  {
    id: "faq-entry-requirements",
    question: "What are the entry requirements for courses at VIBIT?",
    answer: "Entry requirements depend on the program level: National Diplomas require a KCSE grade of C- (Minus) or a relevant Level 5 Certificate; Certificate programs require a KCSE grade of D (Plain) or D+; while Short Courses and Executive Masterclasses (e.g. Barista Skills, Coffee Roasting, Smart AgTech) have open entry with no minimum KCSE grade required—open to anyone passionate about coffee or agribusiness.",
    category: "admissions",
    badge: "Entry Requirements"
  },
  {
    id: "faq-fee-installments",
    question: "Can students pay tuition fees in installments?",
    answer: "Yes. VIBIT offers student-friendly flexible payment plans. Long-term Diploma and Certificate programs allow tuition to be paid in semester-based installments (e.g. KSh 45,000 per semester), and short courses can be paid in structured partial installments prior to practical laboratory sessions.",
    category: "admissions",
    badge: "Fees & Payment Plans"
  },
  {
    id: "faq-job-placement",
    question: "Does VIBIT assist students with job placement and internships?",
    answer: "Yes. VIBIT maintains active industry partnerships with leading specialty coffee roasteries, export houses, commercial estates, SACCOs, luxury hotels, and agricultural cooperatives across East Africa. We connect students with internship opportunities, industry field days, and direct employment pipelines upon graduation.",
    category: "general",
    badge: "Careers & Internships"
  }
];
