import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, Coffee, Droplet, Thermometer, Wind, Zap, Flame, Award, ChevronRight, CheckCircle, Scale, Sliders, Info, Compass } from 'lucide-react';

// SENSORY WHEEL CATEGORIES & NOTES
interface SensoryCategory {
  id: string;
  name: string;
  color: string;
  description: string;
  notes: string[];
}

const SENSORY_CATEGORIES: SensoryCategory[] = [
  {
    id: 'fruity',
    name: 'Fruity',
    color: '#E11D48', // Bright Rose/Red
    description: 'Bright organic sweetness with punchy acidity.',
    notes: ['Blueberry', 'Citrus / Orange', 'Peach / Apricot', 'Cherry', 'Blackberry']
  },
  {
    id: 'floral',
    name: 'Floral',
    color: '#A855F7', // Purple/Lavender
    description: 'Delicate, tea-like qualities with elegant jasmine & rose aroma.',
    notes: ['Jasmine', 'Hibiscus', 'Orange Blossom', 'Lavender', 'Eucalyptus']
  },
  {
    id: 'sweet',
    name: 'Sweet',
    color: '#EAB308', // Amber/Yellow
    description: 'Delectable caramelized sugar, honey, and vanilla layers.',
    notes: ['Brown Sugar', 'Honey', 'Maple Syrup', 'Toffee', 'Vanilla']
  },
  {
    id: 'nutty',
    name: 'Nutty & Chocolatey',
    color: '#78350F', // Cocoa Brown
    description: 'Rich dark chocolates, toasted nuts, and comforting heavy body.',
    notes: ['Dark Chocolate', 'Hazelnut', 'Almond', 'Milk Chocolate', 'Toasted Pecan']
  },
  {
    id: 'spicy',
    name: 'Spicy',
    color: '#D97706', // Deep Amber
    description: 'Warm, exotic spice overtones with subtle bite.',
    notes: ['Cinnamon', 'Clove', 'Cardamom', 'Black Pepper', 'Nutmeg']
  },
  {
    id: 'roasted',
    name: 'Roasted',
    color: '#4B5563', // Charcoal/Slate
    description: 'Caramelized to dark wood notes, cedar, and high intensity.',
    notes: ['Cedar Wood', 'Toast', 'Tobacco', 'Caramelized Ash', 'Malty']
  },
  {
    id: 'herbal',
    name: 'Herbal & Green',
    color: '#10B981', // Emerald/Teal
    description: 'Fresh botanicals, green tea, and refreshing grass-like finish.',
    notes: ['Black Tea', 'Lemongrass', 'Bergamot', 'Spearmint', 'Tomato Leaf']
  }
];

// BREWING METHODS & RATIOS
interface BrewMethod {
  id: string;
  name: string;
  icon: string;
  ratio: number; // 1g coffee to Xg water
  temp: string;
  time: string;
  grind: 'Fine' | 'Medium-Fine' | 'Medium' | 'Medium-Coarse' | 'Coarse';
  grindDesc: string;
  particleSize: number; // For visual particles scale
  steps: string[];
}

const BREW_METHODS: BrewMethod[] = [
  {
    id: 'espresso',
    name: 'Espresso',
    icon: '☕',
    ratio: 2, // 1:2
    temp: '93°C - 95°C',
    time: '25 - 30 sec',
    grind: 'Fine',
    grindDesc: 'Like powdered sugar or table salt',
    particleSize: 2,
    steps: [
      'Heat machine and purge group head to stabilize thermal equilibrium.',
      'Grind coffee into dry portafilter basket, distributing bed perfectly.',
      'Tamp firmly with parallel level force (approx 30 lbs) to prevent channeling.',
      'Engage pump and pull a 1:2 yield shot within 25-30 seconds.'
    ]
  },
  {
    id: 'v60',
    name: 'Hario V60 Pourover',
    icon: '📐',
    ratio: 16, // 1:16
    temp: '91°C - 94°C',
    time: '2:45 - 3:15 min',
    grind: 'Medium-Fine',
    grindDesc: 'Like table salt or beach sand',
    particleSize: 4,
    steps: [
      'Rinse paper filter with hot water to wash paper taste and pre-heat brewer.',
      'Add coffee, tap level, and bloom with 3x coffee weight in water for 45 seconds.',
      'Pour in spiral patterns, avoiding direct paper edge to encourage core extraction.',
      'Maintain steady pouring stream, finishing total drawdown by 3 minutes.'
    ]
  },
  {
    id: 'frenchpress',
    name: 'French Press',
    icon: '🥛',
    ratio: 15, // 1:15
    temp: '94°C - 96°C',
    time: '4:00 - 5:00 min',
    grind: 'Coarse',
    grindDesc: 'Like sea salt or bread crumbs',
    particleSize: 8,
    steps: [
      'Pre-warm beaker with boiling water, discard water.',
      'Add coarsely ground coffee, pour all brewing water rapidly to saturate coffee.',
      'Stir gently once at 1 minute to break crust and allow grinds to submerge.',
      'Place lid on plunger, steep for 4 minutes total, then plunge slowly and serve.'
    ]
  },
  {
    id: 'aeropress',
    name: 'AeroPress',
    icon: '💉',
    ratio: 11, // 1:11
    temp: '85°C - 90°C',
    time: '1:30 - 2:00 min',
    grind: 'Medium',
    grindDesc: 'Like sand or cornmeal',
    particleSize: 5,
    steps: [
      'Insert filter paper, rinse with hot water, assemble brewer in inverted state.',
      'Add medium ground coffee, pour water aggressively to stir and saturate.',
      'Cap with filter lid, flip carefully onto cup at 1:15 min.',
      'Press plunger downward slowly, stopping immediately when you hear the hiss.'
    ]
  },
  {
    id: 'chemex',
    name: 'Chemex',
    icon: '🧪',
    ratio: 16.6, // 1:16.6
    temp: '92°C - 95°C',
    time: '3:30 - 4:30 min',
    grind: 'Medium-Coarse',
    grindDesc: 'Like coarse kosher salt',
    particleSize: 7,
    steps: [
      'Insert thick Chemex proprietary filter with 3-layered side towards spout.',
      'Rinse paper thoroughly to eliminate cardboard notes, then add coffee.',
      'Bloom with 50-80g water, wait 45s. Pour in concentric circles.',
      'Keep liquid level 2cm below rim, allow continuous drip down to finish.'
    ]
  }
];

export default function CoffeeLabs() {
  const [activeTab, setActiveTab] = useState<'profiler' | 'roaster' | 'brewer'>('profiler');

  // --- SENSORY PROFILER STATE ---
  const [selectedCategory, setSelectedCategory] = useState<string>('fruity');
  const [selectedNotes, setSelectedNotes] = useState<string[]>(['Blueberry']);
  const [profileIntensity, setProfileIntensity] = useState<number>(4); // scale 1-5

  const handleToggleNote = (note: string) => {
    if (selectedNotes.includes(note)) {
      setSelectedNotes(selectedNotes.filter(n => n !== note));
    } else {
      setSelectedNotes([...selectedNotes, note]);
    }
  };

  const getSCAEvaluation = () => {
    if (selectedNotes.length === 0) return 'Select some flavor notes to compute cupping profile.';
    const cat = SENSORY_CATEGORIES.find(c => c.id === selectedCategory);
    return `Cupping assessment: Exhibits high complexity focusing on ${cat?.name} attributes. Palate shows defined notes of ${selectedNotes.join(', ')} with a structured intensity score of ${profileIntensity}/5. Highly recommended for premium single-origin Arabica roasts.`;
  };

  // --- ROASTING CURVE SIMULATOR STATE ---
  const [isRoasting, setIsRoasting] = useState<boolean>(false);
  const [roastTime, setRoastTime] = useState<number>(0); // 0 to 60s
  const [chargeTemp, setChargeTemp] = useState<number>(200); // °C
  const [burnerPower, setBurnerPower] = useState<number>(75); // %
  const [airflow, setAirflow] = useState<number>(30); // %
  
  const [roastLog, setRoastLog] = useState<{ time: number; temp: number; ror: number; phase: string }[]>([]);
  const simInterval = useRef<NodeJS.Timeout | null>(null);

  // Restart or reset simulation
  const handleResetRoast = () => {
    setIsRoasting(false);
    if (simInterval.current) clearInterval(simInterval.current);
    setRoastTime(0);
    setRoastLog([]);
  };

  const handleToggleRoast = () => {
    if (isRoasting) {
      setIsRoasting(false);
      if (simInterval.current) clearInterval(simInterval.current);
    } else {
      setIsRoasting(true);
      if (roastTime >= 60) {
        setRoastTime(0);
        setRoastLog([]);
      }
    }
  };

  // Run roasting calculations over time
  useEffect(() => {
    if (isRoasting) {
      simInterval.current = setInterval(() => {
        setRoastTime(prev => {
          const next = prev + 1;
          if (next >= 60) {
            setIsRoasting(false);
            if (simInterval.current) clearInterval(simInterval.current);
            return 60;
          }
          return next;
        });
      }, 500); // 1s roast simulation = 0.5s real time
    }
    return () => {
      if (simInterval.current) clearInterval(simInterval.current);
    };
  }, [isRoasting]);

  // Compute live temperature & RoR curve based on real thermodynamics
  useEffect(() => {
    if (roastTime === 0) {
      setRoastLog([]);
      return;
    }

    // Build curve array from 0 to roastTime
    const logs = [];
    let currentTemp = chargeTemp;
    let ror = 0;

    for (let t = 0; t <= roastTime; t++) {
      let phase = 'Charging';
      if (t < 8) {
        // Turning point dip (0s to 8s)
        const dipFactor = t / 8;
        currentTemp = chargeTemp - (chargeTemp - 90) * Math.sin(dipFactor * Math.PI / 2);
        ror = -12 + (t * 2.5); // Negative RoR turning into positive
        phase = 'Turning Point';
      } else if (t < 25) {
        // Drying phase (Yellowing starts)
        const progress = (t - 8) / 17;
        currentTemp = 90 + 60 * progress + (burnerPower * 0.15 * progress);
        ror = 15 - (progress * 6);
        phase = 'Drying Phase';
      } else if (t < 42) {
        // Maillard reaction / Yellowing
        const progress = (t - 25) / 17;
        currentTemp = 150 + 35 * progress + (burnerPower * 0.1 * progress) - (airflow * 0.05 * progress);
        ror = 10 - (progress * 4);
        phase = 'Yellowing / Maillard';
      } else if (t < 52) {
        // First Crack (caramelization peak)
        const progress = (t - 42) / 10;
        currentTemp = 185 + 20 * progress + (burnerPower * 0.05 * progress) - (airflow * 0.08 * progress);
        ror = 6 - (progress * 3);
        phase = 'First Crack 💥';
      } else {
        // Development / End
        const progress = (t - 52) / 8;
        currentTemp = 205 + 12 * progress + (burnerPower * 0.02 * progress) - (airflow * 0.1 * progress);
        ror = 4 - (progress * 3.5);
        phase = 'Development Phase';
      }

      logs.push({
        time: t,
        temp: Math.round(currentTemp),
        ror: parseFloat(ror.toFixed(1)),
        phase
      });
    }

    setRoastLog(logs);
  }, [roastTime, chargeTemp, burnerPower, airflow]);

  const currentStatus = roastLog[roastLog.length - 1] || { temp: chargeTemp, ror: 0, phase: 'Ready' };

  // Determine bean color based on temp
  const getBeanColor = (temp: number) => {
    if (temp < 100) return '#86EFAC'; // Pale green
    if (temp < 135) return '#BEF264'; // Grass green-yellow
    if (temp < 160) return '#FEF08A'; // Yellowing
    if (temp < 185) return '#F59E0B'; // Light cinnamon
    if (temp < 200) return '#B45309'; // Medium brown
    if (temp < 212) return '#78350F'; // Dark chocolate brown
    return '#451A03'; // Extremely dark roast / oily oily black
  };

  // --- BREWING RATIO WIZARD STATE ---
  const [selectedBrewId, setSelectedBrewId] = useState<string>('v60');
  const [coffeeWeight, setCoffeeWeight] = useState<number>(18); // grams
  const [waterWeight, setWaterWeight] = useState<number>(288); // grams (auto-linked initially)
  const [adjustMode, setAdjustMode] = useState<'ratio' | 'manual'>('ratio');

  const selectedBrew = BREW_METHODS.find(b => b.id === selectedBrewId) || BREW_METHODS[1];

  // Adjust water automatically when coffee or brew method changes in ratio lock mode
  useEffect(() => {
    if (adjustMode === 'ratio') {
      setWaterWeight(Math.round(coffeeWeight * selectedBrew.ratio));
    }
  }, [coffeeWeight, selectedBrewId, adjustMode]);

  const handleWaterSliderChange = (val: number) => {
    setWaterWeight(val);
    if (adjustMode === 'ratio') {
      // Recalculate coffee
      setCoffeeWeight(parseFloat((val / selectedBrew.ratio).toFixed(1)));
    }
  };

  const getBrewStrengthVibe = () => {
    const currentRatio = waterWeight / coffeeWeight;
    if (currentRatio < selectedBrew.ratio - 1.5) return { text: 'Strong / Heavy Intensity', color: 'text-amber-800 bg-amber-50 border-amber-200' };
    if (currentRatio > selectedBrew.ratio + 1.5) return { text: 'Light / High Clarity', color: 'text-sky-800 bg-sky-50 border-sky-200' };
    return { text: 'Golden Cup Ratio (Balanced)', color: 'text-emerald-800 bg-emerald-50 border-emerald-200' };
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden max-w-6xl mx-auto" id="coffee-labs-explorer">
      
      {/* 1. APPLE STYLE HEADER */}
      <div className="bg-gradient-to-b from-gray-50/50 to-white px-6 py-8 border-b border-gray-100 text-center space-y-3">
        <span className="inline-flex items-center px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200/50 rounded-full text-[10px] font-bold uppercase tracking-wider">
          <Award className="h-3 w-3 mr-1 text-[#b6171e]" /> Live Academic Playground
        </span>
        <h2 className="font-serif text-3xl font-bold tracking-tight text-gray-900">
          VBIT Interactive Coffee Labs
        </h2>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-gray-500 leading-relaxed">
          Interact with actual lab metrics taught inside our state-of-the-art sensory, commercial roasting, and professional brewing academies.
        </p>

        {/* Apple Segmented Controls Tabs */}
        <div className="flex justify-center pt-4">
          <div className="bg-gray-100/80 backdrop-blur-md p-1 rounded-xl flex space-x-1 border border-gray-200/40 w-full max-w-md sm:max-w-lg">
            <button
              onClick={() => setActiveTab('profiler')}
              className={`flex-1 flex items-center justify-center space-x-1.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'profiler'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Compass className="h-4 w-4" />
              <span>Sensory Profiler</span>
            </button>
            <button
              onClick={() => setActiveTab('roaster')}
              className={`flex-1 flex items-center justify-center space-x-1.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'roaster'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Flame className="h-4 w-4" />
              <span>Roasting Simulator</span>
            </button>
            <button
              onClick={() => setActiveTab('brewer')}
              className={`flex-1 flex items-center justify-center space-x-1.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'brewer'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Scale className="h-4 w-4" />
              <span>Brewing Wizard</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. TAB BODY */}
      <div className="p-6 sm:p-10">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: SENSORY PROFILER WHEEL */}
          {activeTab === 'profiler' && (
            <motion.div
              key="tab-profiler"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              {/* Left Column: Interactive Wheel Dials (5 cols) */}
              <div className="lg:col-span-5 flex flex-col items-center space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Tactile Sensory Compass</span>
                
                {/* SVG Sensory Compass */}
                <div className="relative h-64 w-64 sm:h-72 sm:w-72 flex items-center justify-center">
                  <svg viewBox="0 0 200 200" className="w-full h-full transform hover:scale-102 transition-transform duration-300">
                    {/* Inner core circle */}
                    <circle cx="100" cy="100" r="30" fill="#FAF6F0" stroke="#E5E7EB" strokeWidth="1" />
                    <text x="100" y="102" textAnchor="middle" fill="#271310" fontSize="8" fontWeight="bold" fontFamily="monospace">SCA WHEEL</text>
                    
                    {/* 7 slices representing outer categories */}
                    {SENSORY_CATEGORIES.map((cat, idx) => {
                      const totalSlices = SENSORY_CATEGORIES.length;
                      const angleStep = 360 / totalSlices;
                      const startAngle = (idx * angleStep) - 90;
                      const endAngle = startAngle + angleStep;
                      
                      const rad = Math.PI / 180;
                      const rIn = 32;
                      const rOut = 85;

                      const x1_in = 100 + rIn * Math.cos(startAngle * rad);
                      const y1_in = 100 + rIn * Math.sin(startAngle * rad);
                      const x1_out = 100 + rOut * Math.cos(startAngle * rad);
                      const y1_out = 100 + rOut * Math.sin(startAngle * rad);

                      const x2_in = 100 + rIn * Math.cos(endAngle * rad);
                      const y2_in = 100 + rIn * Math.sin(endAngle * rad);
                      const x2_out = 100 + rOut * Math.cos(endAngle * rad);
                      const y2_out = 100 + rOut * Math.sin(endAngle * rad);

                      const isSelected = selectedCategory === cat.id;

                      return (
                        <g 
                          key={cat.id} 
                          className="cursor-pointer group"
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            setSelectedNotes([cat.notes[0]]);
                          }}
                        >
                          <path
                            d={`
                              M ${x1_in} ${y1_in}
                              L ${x1_out} ${y1_out}
                              A ${rOut} ${rOut} 0 0 1 ${x2_out} ${y2_out}
                              L ${x2_in} ${y2_in}
                              A ${rIn} ${rIn} 0 0 0 ${x1_in} ${y1_in}
                              Z
                            `}
                            fill={cat.color}
                            fillOpacity={isSelected ? 0.85 : 0.25}
                            stroke="#ffffff"
                            strokeWidth="1.5"
                            className="transition-all duration-300 group-hover:fill-opacity-80"
                          />
                          {/* Small category text near outer arc */}
                          {(() => {
                            const textAngle = startAngle + (angleStep / 2);
                            const rText = 60;
                            const tx = 100 + rText * Math.cos(textAngle * rad);
                            const ty = 100 + rText * Math.sin(textAngle * rad);
                            
                            return (
                              <text
                                x={tx}
                                y={ty}
                                fill={isSelected ? "#ffffff" : "#1F2937"}
                                fontSize="6.5"
                                fontWeight="bold"
                                textAnchor="middle"
                                transform={`rotate(${textAngle > 90 || textAngle < -90 ? textAngle + 180 : textAngle}, ${tx}, ${ty})`}
                                className="pointer-events-none select-none transition-colors duration-300"
                              >
                                {cat.name.split(' ')[0]}
                              </text>
                            );
                          })()}
                        </g>
                      );
                    })}
                  </svg>
                  
                  {/* Floating active label indicator */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="h-28 w-28 bg-transparent rounded-full flex items-center justify-center">
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-[10px] text-gray-400 block font-medium">Click any compass wedge to explore core flavor profiles</span>
                </div>
              </div>

              {/* Right Column: Note Selector & Tasting Card (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Active Category Display */}
                {(() => {
                  const cat = SENSORY_CATEGORIES.find(c => c.id === selectedCategory) || SENSORY_CATEGORIES[0];
                  return (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <span className="h-4 w-4 rounded-full" style={{ backgroundColor: cat.color }} />
                        <h3 className="font-serif text-xl font-bold text-gray-900">{cat.name} Category</h3>
                      </div>
                      <p className="text-xs text-gray-500">{cat.description}</p>

                      {/* Notes Check list */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Select Palate Sub-Notes</span>
                        <div className="flex flex-wrap gap-2">
                          {cat.notes.map(note => {
                            const isChecked = selectedNotes.includes(note);
                            return (
                              <button
                                key={note}
                                onClick={() => handleToggleNote(note)}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 border ${
                                  isChecked
                                    ? 'bg-gray-900 border-gray-900 text-white shadow-sm'
                                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                }`}
                              >
                                {isChecked && <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />}
                                <span>{note}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Slider: Flavor Intensity */}
                      <div className="space-y-2 pt-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-gray-700">Acidity / Flavor Intensity Score:</span>
                          <span className="font-serif font-bold text-[#b6171e] text-sm">{profileIntensity} / 5</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          step="1"
                          value={profileIntensity}
                          onChange={(e) => setProfileIntensity(parseInt(e.target.value))}
                          className="w-full accent-[#b6171e] h-1.5 bg-gray-100 rounded-lg cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase">
                          <span>Mellow</span>
                          <span>Balanced</span>
                          <span>Brilliant</span>
                        </div>
                      </div>

                      {/* Cupping Report Card */}
                      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 space-y-4 shadow-inner">
                        <div className="flex items-center justify-between text-xs font-bold text-gray-700 border-b border-gray-200/60 pb-2">
                          <span className="font-mono text-[10px] text-[#827472] uppercase tracking-wider">Official Sensory Log</span>
                          <span className="text-[#b6171e]">VBIT Cupping Laboratory</span>
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed italic">
                          "{getSCAEvaluation()}"
                        </p>
                        <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 font-medium">
                          <span>Standard Prerequisite Check: OK</span>
                          <span>Certified Q-Grader matching</span>
                        </div>
                      </div>

                    </div>
                  );
                })()}
              </div>
            </motion.div>
          )}

          {/* TAB 2: ROASTING CURVE SIMULATOR */}
          {activeTab === 'roaster' && (
            <motion.div
              key="tab-roaster"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10"
            >
              {/* Left Side: Controls & Sliders (4 cols) */}
              <div className="lg:col-span-4 space-y-6 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                <h3 className="font-serif text-lg font-bold text-gray-900 flex items-center space-x-2">
                  <Sliders className="h-5 w-5 text-[#b6171e]" />
                  <span>Roaster Parameters</span>
                </h3>

                {/* Slider: Charge Temperature */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-gray-700">Charge Temp (Starting):</span>
                    <span className="font-mono text-gray-900 font-semibold">{chargeTemp}°C</span>
                  </div>
                  <input
                    type="range"
                    min="180"
                    max="215"
                    step="1"
                    disabled={isRoasting}
                    value={chargeTemp}
                    onChange={(e) => setChargeTemp(parseInt(e.target.value))}
                    className="w-full accent-gray-900 h-1 bg-gray-200 rounded-lg cursor-pointer disabled:opacity-50"
                  />
                  <span className="text-[10px] text-gray-400 block">Temperature of the drum metal before dropping green beans.</span>
                </div>

                {/* Slider: Burner Gas Power */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-gray-700">Burner Gas Power:</span>
                    <span className="font-mono text-gray-900 font-semibold">{burnerPower}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={burnerPower}
                    onChange={(e) => setBurnerPower(parseInt(e.target.value))}
                    className="w-full accent-[#b6171e] h-1 bg-gray-200 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] text-gray-400 block">Controls the thermal speed and Rate of Rise curve steepness.</span>
                </div>

                {/* Slider: Airflow */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-gray-700">Convective Airflow:</span>
                    <span className="font-mono text-gray-900 font-semibold">{airflow}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={airflow}
                    onChange={(e) => setAirflow(parseInt(e.target.value))}
                    className="w-full accent-blue-600 h-1 bg-gray-200 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] text-gray-400 block">Draws humidity and chaff out. Dampens heat retention slightly.</span>
                </div>

                {/* Action Controls */}
                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={handleToggleRoast}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-sm ${
                      isRoasting
                        ? 'bg-amber-600 text-white hover:bg-amber-700'
                        : roastTime >= 60
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    <Play className={`h-4 w-4 ${isRoasting ? 'animate-pulse' : ''}`} />
                    <span>{isRoasting ? 'Pause Roast' : roastTime >= 60 ? 'Completed! Restart' : 'Start Simulation'}</span>
                  </button>
                  <button
                    onClick={handleResetRoast}
                    className="px-4 py-3 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-bold text-xs transition-colors cursor-pointer"
                    title="Reset simulation"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>

                {/* Real-time Status Card */}
                <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-inner space-y-2.5">
                  <div className="flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest font-mono">
                    <span>Telemetry</span>
                    <span className="text-emerald-500 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" /> Active
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-gray-400 block">Roast Temp:</span>
                      <strong className="text-sm font-mono text-gray-900">{currentStatus.temp}°C</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Rate of Rise:</span>
                      <strong className="text-sm font-mono text-gray-900">
                        {currentStatus.ror > 0 ? `+${currentStatus.ror}` : currentStatus.ror}°C / s
                      </strong>
                    </div>
                    <div className="col-span-2 border-t border-gray-100 pt-2 flex items-center justify-between">
                      <span className="text-gray-400">Current State:</span>
                      <strong className="text-[#b6171e] text-xs font-bold uppercase tracking-wider">{currentStatus.phase}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Graph & Roasted Bean Morph (8 cols) */}
              <div className="lg:col-span-8 flex flex-col space-y-6">
                
                {/* Visual Roasted Bean Morph Card */}
                <div className="bg-gray-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-24 w-24 bg-white/5 rounded-full filter blur-xl" />
                  <div className="space-y-2 relative z-10 text-center sm:text-left">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-amber-400 font-mono">Bean Chamber Visualizer</span>
                    <h4 className="font-serif text-lg font-bold">Dynamic Bean Color Check</h4>
                    <p className="text-xs text-gray-400 max-w-sm">
                      Watch Arabica cherries morph color based on moisture drying, Maillard caramelization, and carbonization.
                    </p>
                  </div>

                  {/* Morphing Bean Graphic */}
                  <div className="flex flex-col items-center space-y-2 mt-4 sm:mt-0 relative z-10">
                    <motion.div 
                      className="h-20 w-14 rounded-full border border-black/10 relative shadow-inner"
                      style={{ 
                        backgroundColor: getBeanColor(currentStatus.temp),
                        boxShadow: 'inset 0 4px 6px -1px rgb(0 0 0 / 0.15)'
                      }}
                      animate={{ scale: isRoasting ? [1, 1.03, 1] : 1 }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      {/* Coffee bean center line crack crease */}
                      <div className="absolute inset-y-0 left-1/2 -ml-0.5 w-1 bg-black/20 transform rotate-1 rounded-full" />
                      {currentStatus.temp >= 190 && (
                        <motion.div 
                          className="absolute inset-y-0 left-1/2 -ml-0.5 w-1 bg-[#F59E0B]/30 transform rotate-1 rounded-full"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 1 }}
                        />
                      )}
                    </motion.div>
                    <span className="text-[10px] font-mono text-gray-300 bg-white/10 px-2 py-0.5 rounded-full">
                      Color hex: {getBeanColor(currentStatus.temp)}
                    </span>
                  </div>
                </div>

                {/* Live SVG Graph Canvas */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Academic Roasting Curve (Log Profile)</span>
                    <span className="text-xs font-mono text-gray-500">Timeline: {roastTime}s / 60s</span>
                  </div>

                  {/* SVG Chart */}
                  <div className="relative h-64 w-full">
                    <svg viewBox="0 0 500 200" className="w-full h-full" preserveAspectRatio="none">
                      {/* Background grid lines */}
                      {[0, 1, 2, 3, 4].map(gridIdx => (
                        <line
                          key={gridIdx}
                          x1="0"
                          y1={gridIdx * 40}
                          x2="500"
                          y2={gridIdx * 40}
                          stroke="#F3F4F6"
                          strokeWidth="1"
                        />
                      ))}
                      
                      {/* Vertical Grid Lines */}
                      {[0, 1, 2, 3, 4, 5].map(gridIdx => (
                        <line
                          key={gridIdx}
                          x1={gridIdx * 100}
                          y1="0"
                          x2={gridIdx * 100}
                          y2="200"
                          stroke="#F3F4F6"
                          strokeWidth="1"
                        />
                      ))}

                      {/* X and Y Axis Titles inside graph */}
                      <text x="5" y="15" fill="#9CA3AF" fontSize="8" fontWeight="bold" fontFamily="monospace">TEMP (°C)</text>
                      <text x="450" y="195" fill="#9CA3AF" fontSize="8" fontWeight="bold" fontFamily="monospace">TIME (s)</text>

                      {/* Curve line */}
                      {roastLog.length > 1 && (
                        <path
                          d={roastLog.reduce((pathStr, pt, idx) => {
                            // Map t(0-60) to x(0-500), temp(0-250) to y(200-0)
                            const x = (pt.time / 60) * 500;
                            const y = 200 - (pt.temp / 250) * 200;
                            return idx === 0 ? `M ${x} ${y}` : `${pathStr} L ${x} ${y}`;
                          }, '')}
                          fill="none"
                          stroke="#b6171e"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      )}

                      {/* Current head dot tracking */}
                      {roastLog.length > 0 && (
                        <circle
                          cx={(roastTime / 60) * 500}
                          y={200 - (currentStatus.temp / 250) * 200}
                          r="6"
                          fill="#b6171e"
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                      )}

                      {/* Static threshold guidelines (Drying/First crack thresholds) */}
                      <line x1="0" y1={200 - (150 / 250) * 200} x2="500" y2={200 - (150 / 250) * 200} stroke="#E5E7EB" strokeDasharray="3,3" />
                      <line x1="0" y1={200 - (190 / 250) * 200} x2="500" y2={200 - (190 / 250) * 200} stroke="#E5E7EB" strokeDasharray="3,3" />
                      <text x="430" y={200 - (150 / 250) * 200 - 4} fill="#9CA3AF" fontSize="7" fontWeight="bold">Drying End (150°C)</text>
                      <text x="410" y={200 - (190 / 250) * 200 - 4} fill="#9CA3AF" fontSize="7" fontWeight="bold">First Crack (190°C) 💥</text>
                    </svg>
                  </div>

                  <div className="flex items-center space-x-3 text-xs text-gray-500 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                    <Info className="h-4 w-4 text-blue-500 shrink-0" />
                    <span>
                      <strong>Theory check:</strong> At around 190°C (First Crack), moisture inside the cellulose structure turns to steam, physically breaking the bean walls. Adjust gas and airflow to ensure sufficient development time.
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 3: BREWING RATIO WIZARD */}
          {activeTab === 'brewer' && (
            <motion.div
              key="tab-brewer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10"
            >
              {/* Left Column: Device & Sliders (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">Select Extract Device</span>
                
                {/* Horizontal slider buttons representing devices */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {BREW_METHODS.map(method => {
                    const isSelected = selectedBrewId === method.id;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedBrewId(method.id)}
                        className={`p-3.5 rounded-xl flex flex-col items-center justify-center border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-gray-900 border-gray-900 text-white shadow-md scale-102'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-xl mb-1">{method.icon}</span>
                        <span className="text-[9px] font-bold tracking-tight text-center truncate w-full">{method.name.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Device Stats Badge */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-gray-700">Target Brewing Ratio:</span>
                    <strong className="text-sm text-gray-900 font-mono">1 : {selectedBrew.ratio}</strong>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div className="p-1.5 bg-white rounded border border-gray-100">
                      <span className="text-gray-400 block font-semibold uppercase">Water Temp:</span>
                      <strong className="text-gray-800">{selectedBrew.temp}</strong>
                    </div>
                    <div className="p-1.5 bg-white rounded border border-gray-100">
                      <span className="text-gray-400 block font-semibold uppercase">Brew Time:</span>
                      <strong className="text-gray-800">{selectedBrew.time}</strong>
                    </div>
                    <div className="p-1.5 bg-white rounded border border-gray-100">
                      <span className="text-gray-400 block font-semibold uppercase">Grind Size:</span>
                      <strong className="text-gray-800">{selectedBrew.grind}</strong>
                    </div>
                  </div>
                </div>

                {/* Control adjustment settings (Ratio Locked vs. Manual Override) */}
                <div className="flex justify-between items-center text-xs border-b border-gray-100 pb-2">
                  <span className="font-bold text-gray-700">Brew Ratio Mode:</span>
                  <div className="flex space-x-1 bg-gray-100 p-0.5 rounded-lg">
                    <button
                      onClick={() => setAdjustMode('ratio')}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer transition-all ${
                        adjustMode === 'ratio' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                      }`}
                    >
                      Ratio Locked
                    </button>
                    <button
                      onClick={() => setAdjustMode('manual')}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer transition-all ${
                        adjustMode === 'manual' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                      }`}
                    >
                      Manual Override
                    </button>
                  </div>
                </div>

                {/* Coffee Powder Sliders */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-gray-700 flex items-center gap-1">
                      <Coffee className="h-4 w-4 text-[#b6171e]" /> Dry Coffee Ground:
                    </span>
                    <span className="font-mono text-gray-900 font-semibold">{coffeeWeight}g</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="1"
                    value={coffeeWeight}
                    onChange={(e) => setCoffeeWeight(parseInt(e.target.value))}
                    className="w-full accent-[#b6171e] h-1.5 bg-gray-100 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Water Volume Sliders */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-gray-700 flex items-center gap-1">
                      <Droplet className="h-4 w-4 text-blue-500" /> Hot Water Volume:
                    </span>
                    <span className="font-mono text-gray-900 font-semibold">{waterWeight}ml</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="10"
                    value={waterWeight}
                    onChange={(e) => handleWaterSliderChange(parseInt(e.target.value))}
                    className="w-full accent-blue-600 h-1.5 bg-gray-100 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Strength Indicator */}
                <div className={`p-3.5 border rounded-xl text-xs font-semibold text-center ${getBrewStrengthVibe().color}`}>
                  {getBrewStrengthVibe().text} • Yielding approx 1:{(waterWeight / coffeeWeight).toFixed(1)} ratio
                </div>
              </div>

              {/* Right Column: Steps & Visual Particle Scale (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Visual Grind Particle Scale Card */}
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#827472] uppercase tracking-wider font-mono">Microscopic Grind Bed</span>
                    <span className="text-xs text-gray-600 font-medium">{selectedBrew.grindDesc}</span>
                  </div>
                  
                  {/* Visual dots representing particle sizes */}
                  <div className="h-16 bg-white border border-gray-100 rounded-xl p-3 flex flex-wrap items-center justify-center gap-2 overflow-hidden shadow-inner">
                    {[...Array(32)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-gray-800 rounded-full transition-all duration-300"
                        style={{
                          width: `${selectedBrew.particleSize}px`,
                          height: `${selectedBrew.particleSize}px`,
                          opacity: 0.8 + (Math.random() * 0.2),
                          margin: `${9 - selectedBrew.particleSize}px`
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Step-by-Step Timed Guide */}
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">Interactive Barista Extraction Guide</span>
                  
                  <div className="space-y-2.5">
                    {selectedBrew.steps.map((step, index) => {
                      // Adjust steps water labels dynamically
                      let parsedStep = step;
                      if (index === 1 && selectedBrew.id !== 'espresso') {
                        parsedStep = step.replace('3x', `${coffeeWeight * 3}g`);
                      }
                      if (index === 2 && selectedBrew.id !== 'espresso') {
                        parsedStep = step.replace('150g', `${Math.round(waterWeight * 0.6)}g`);
                      }

                      return (
                        <div key={index} className="flex items-start space-x-3 bg-white border border-gray-50 p-4 rounded-xl shadow-sm hover:border-gray-100 transition-colors">
                          <span className="bg-gray-100 text-gray-800 font-bold h-6 w-6 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <p className="text-xs text-gray-600 leading-relaxed">{parsedStep}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* 3. FOOTER PROMO */}
      <div className="bg-gray-50 border-t border-gray-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-2.5 text-gray-500">
          <Info className="h-4 w-4 text-gray-400 shrink-0" />
          <span>These physical simulators are based directly on the Specialty Coffee Association (SCA) syllabus.</span>
        </div>
        <span className="text-[10px] uppercase font-bold text-gray-400 font-mono">VBIT Coffee Academy • Kenya</span>
      </div>

    </div>
  );
}
