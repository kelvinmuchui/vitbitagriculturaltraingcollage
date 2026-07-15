import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Layers, Compass, Flame, Leaf, Sparkles, X, ChevronLeft, ChevronRight, Info } from 'lucide-react';

// Import our real student and campus photos
import baristaSmoothies from '../assets/images/barista_smoothies_1783338078505.jpg';
import latteArtTable from '../assets/images/latte_art_table_1783338092054.jpeg';
import latteArtTopdown from '../assets/images/latte_art_topdown_1783338101365.jpeg';
import coffeeCherriesDrying from '../assets/images/coffee_cherries_drying_1783338132429.jpg';
import sortingBeans from '../assets/images/sorting_beans_1783338143134.jpg';
import cocktailBar from '../assets/images/cocktail_bar_1783338176140.jpg';
import latteArtCup from '../assets/images/latte_art_cup_1783338158532.jpg';

interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'sensory' | 'cupping' | 'roasting' | 'agribusiness';
  categoryLabel: string;
  description: string;
  image: string;
  specs: { label: string; value: string }[];
}

export default function PhotoGallery() {
  const [activeTab, setActiveTab] = useState<'all' | 'sensory' | 'cupping' | 'roasting' | 'agribusiness'>('all');
  const [selectedItemIdx, setSelectedItemIdx] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Facilities', icon: Layers },
    { id: 'sensory', label: 'Sensory & Barista Labs', icon: Compass },
    { id: 'cupping', label: 'Professional Cupping', icon: Sparkles },
    { id: 'roasting', label: 'Roasting & Profiling', icon: Flame },
    { id: 'agribusiness', label: 'Agribusiness Greenhouse', icon: Leaf },
  ] as const;

  const galleryItems: GalleryItem[] = [
    {
      id: 'gallery-sensory-1',
      title: 'SCA Specialty Sensory Laboratory',
      category: 'sensory',
      categoryLabel: 'Sensory Lab',
      description: 'Equipped with custom La Marzocco Linea PB espresso systems, reverse-osmosis mineral-water formulation columns, and high-precision Mahlkönig grinders for scientific extraction evaluation.',
      image: latteArtTable,
      specs: [
        { label: 'Espresso Stations', value: '12 Independent Workspaces' },
        { label: 'Technology', value: 'La Marzocco & Mythos Grinders' },
        { label: 'Focus', value: 'TDS Extraction, Water Profile Science' }
      ]
    },
    {
      id: 'gallery-cupping-1',
      title: 'Standard-Compliant Cupping Sanctuary',
      category: 'cupping',
      categoryLabel: 'Cupping Lounge',
      description: 'Built strictly to SCA standards, featuring soundproof acoustics, customized draft exhaust, rotating cupping tables, and specialized overhead spectral lighting for neutral color grading.',
      image: latteArtTopdown,
      specs: [
        { label: 'Brewing Temp', value: '93°C Terminally Regulated' },
        { label: 'Sample Capacity', value: 'Up to 48 Micro-lots daily' },
        { label: 'Acoustics', value: 'Below 35dB Isolation' }
      ]
    },
    {
      id: 'gallery-roasting-1',
      title: 'Industrial Drum Roasting Bay',
      category: 'roasting',
      categoryLabel: 'Roasting Station',
      description: 'Houses multiple drum roasters from Giesen and Probat connected directly to desktop logging suites. Students log rate-of-rise (RoR), gas pressures, and drum airflows in real-time.',
      image: coffeeCherriesDrying,
      specs: [
        { label: 'Roasters', value: 'Giesen W15A & Probatone 5' },
        { label: 'Telemetry', value: 'Cropster & Artisan Dual Logging' },
        { label: 'Batch Range', value: '500g Sample to 15kg Production' }
      ]
    },
    {
      id: 'gallery-agri-1',
      title: 'Botanical Cultivar Greenhouse',
      category: 'agribusiness',
      categoryLabel: 'Agribusiness',
      description: 'A controlled educational nursery focusing on cultivar genetic studies, soil moisture optimization, organic pest control, and regional soil composition mapping for sustainable farming.',
      image: sortingBeans,
      specs: [
        { label: 'Key Cultivars', value: 'SL28, SL34, Batian, Ruiru 11' },
        { label: 'Soil Analytics', value: 'N-P-K Electronic Sensor Mesh' },
        { label: 'Climate Control', value: 'Automatic Evaporative Cooling' }
      ]
    },
    {
      id: 'gallery-cupping-2',
      title: 'Green Coffee Sample Grading Benches',
      category: 'cupping',
      categoryLabel: 'Green Grading',
      description: 'Where incoming parchment coffee is analyzed for humidity, density, size screens, and visual physical defects under uniform daylight simulators.',
      image: latteArtCup,
      specs: [
        { label: 'Moisture Meters', value: 'Sinar BeanPro Coffee Analyzer' },
        { label: 'Screen Sizes', value: 'Official 14 to 20 Grading Sieves' },
        { label: 'Standard', value: 'SCA Defect Classification' }
      ]
    },
    {
      id: 'gallery-sensory-2',
      title: 'Barista Championship Simulation Stage',
      category: 'sensory',
      categoryLabel: 'Barista Lab',
      description: 'A replica of international barista competition layouts designed to polish sensory workflow, table presentation speed, signature drink design, and technical mastery under pressure.',
      image: cocktailBar,
      specs: [
        { label: 'Staging Deck', value: 'U-Shaped Professional Counter' },
        { label: 'Tamper Tools', value: 'Puqpress Gen 5 Automatic' },
        { label: 'Timers', value: 'Digital Millisecond Chronographs' }
      ]
    }
  ];

  const filteredItems = activeTab === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeTab);

  const handleOpenLightbox = (itemId: string) => {
    const idx = galleryItems.findIndex(item => item.id === itemId);
    if (idx !== -1) {
      setSelectedItemIdx(idx);
    }
  };

  const handleCloseLightbox = () => {
    setSelectedItemIdx(null);
  };

  const handleNextItem = () => {
    if (selectedItemIdx !== null) {
      setSelectedItemIdx((selectedItemIdx + 1) % galleryItems.length);
    }
  };

  const handlePrevItem = () => {
    if (selectedItemIdx !== null) {
      setSelectedItemIdx((selectedItemIdx - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-6" id="campus-photo-gallery">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-[#2E221C]/10 pb-8">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#C28A4E]/10 text-[#C28A4E] text-[11px] font-bold uppercase tracking-wider rounded-md border border-[#C28A4E]/20">
            <Compass className="h-3.5 w-3.5" />
            <span>Virtual Campus Walkthrough</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2E221C] tracking-tight">
            Specialized Facilities & <span className="text-[#C28A4E]">Sensory infrastructure</span>
          </h2>
          <p className="text-sm text-[#2E221C]/75 leading-relaxed">
            Take an immersive glance inside Kenya’s premier coffee education hub. Our professional laboratories are calibrated strictly to Specialty Coffee Association and industry board guidelines.
          </p>
        </div>

        {/* TABS CONTROLS */}
        <div className="flex flex-wrap gap-2 md:justify-end shrink-0">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                id={`gallery-tab-${cat.id}`}
                onClick={() => setActiveTab(cat.id)}
                className={`inline-flex items-center space-x-2 text-xs font-bold px-4 py-2.5 transition-all duration-200 cursor-pointer border ${
                  isActive 
                    ? 'bg-[#C28A4E] text-white border-[#C28A4E] shadow-sm' 
                    : 'bg-[#FAF6F0] hover:bg-[#C28A4E]/5 text-[#2E221C] border-[#2E221C]/10'
                }`}
              >
                <IconComponent className="h-3.5 w-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* GALLERY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item, idx) => (
          <motion.div 
            key={item.id}
            id={item.id}
            className="group bg-white border border-[#2E221C]/10 overflow-hidden hover:shadow-xl hover:border-[#C28A4E]/30 transition-all duration-300 flex flex-col justify-between"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
            whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)" }}
          >
            {/* Visual Block */}
            <div className="relative h-64 overflow-hidden bg-slate-100 shrink-0">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                <button 
                  onClick={() => handleOpenLightbox(item.id)}
                  id={`zoom-${item.id}`}
                  className="bg-white/95 text-[#2E221C] p-3 text-xs font-bold hover:bg-[#C28A4E] hover:text-white transition-colors shadow-lg flex items-center space-x-1.5 cursor-pointer"
                >
                  <Eye className="h-4 w-4" />
                  <span>Enlarge Spec Details</span>
                </button>
                <span className="text-[10px] text-white bg-[#C28A4E] px-2.5 py-1 font-bold uppercase tracking-widest">
                  {item.categoryLabel}
                </span>
              </div>
              <div className="absolute top-4 left-4 bg-[#21100B]/90 text-white text-[10px] font-bold px-2.5 py-1 tracking-wider uppercase border border-white/10">
                {item.categoryLabel}
              </div>
            </div>

            {/* Description Block */}
            <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-serif text-lg font-bold text-[#2E221C] group-hover:text-[#C28A4E] transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#2E221C]/70 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* Mini technical specs table */}
              <div className="border-t border-[#2E221C]/5 pt-4 space-y-2">
                <div className="flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8E7C74]">
                  <Info className="h-3 w-3 text-[#C28A4E]" />
                  <span>Technical Instrumentation Specs</span>
                </div>
                <div className="grid grid-cols-1 gap-1.5 bg-[#FAF6F0] p-3 border border-[#2E221C]/5">
                  {item.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex justify-between items-center text-[10px] border-b border-[#2E221C]/5 last:border-b-0 pb-1 last:pb-0">
                      <span className="text-gray-500 font-semibold">{spec.label}</span>
                      <span className="text-[#2E221C] font-bold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* LIGHTBOX MODAL WITH FULL IMAGE PREVIEW */}
      <AnimatePresence>
        {selectedItemIdx !== null && (
          <motion.div 
            className="fixed inset-0 z-50 bg-[#21100B]/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close trigger */}
            <button 
              onClick={handleCloseLightbox}
              id="close-lightbox"
              className="absolute top-6 right-6 text-white hover:text-[#C28A4E] p-3 transition-colors bg-white/10 hover:bg-white/20 cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Slider Controls */}
            <button 
              onClick={handlePrevItem}
              id="prev-lightbox-item"
              className="absolute left-4 sm:left-8 text-white hover:text-[#C28A4E] p-4 transition-colors bg-white/5 hover:bg-white/15 cursor-pointer z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <button 
              onClick={handleNextItem}
              id="next-lightbox-item"
              className="absolute right-4 sm:right-8 text-white hover:text-[#C28A4E] p-4 transition-colors bg-white/5 hover:bg-white/15 cursor-pointer z-10"
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Main Visual Frame & Spec Details */}
            <motion.div 
              className="bg-white max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 overflow-hidden shadow-2xl relative max-h-[85vh]"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Visual Area */}
              <div className="md:col-span-7 bg-black flex items-center justify-center relative min-h-[300px] md:min-h-[500px]">
                <img 
                  src={galleryItems[selectedItemIdx].image} 
                  alt={galleryItems[selectedItemIdx].title} 
                  className="w-full h-full object-cover max-h-[500px]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#C28A4E] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                  {galleryItems[selectedItemIdx].categoryLabel}
                </div>
              </div>

              {/* Explanations & Meta Info Area */}
              <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#FAF6F0] overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C28A4E] block mb-1">
                      VBIT Specialty Facility
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#2E221C] leading-snug">
                      {galleryItems[selectedItemIdx].title}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E7C74] block">
                      Infrastructure & Operational Purpose:
                    </span>
                    <p className="text-xs text-[#2E221C]/80 leading-relaxed">
                      {galleryItems[selectedItemIdx].description}
                    </p>
                  </div>

                  {/* Grid of full Technical specifications */}
                  <div className="space-y-3 pt-4 border-t border-[#2E221C]/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E7C74] block">
                      Academic Lab Specification:
                    </span>
                    <div className="grid grid-cols-1 gap-2.5">
                      {galleryItems[selectedItemIdx].specs.map((spec, sIdx) => (
                        <div key={sIdx} className="bg-white p-3 border border-[#2E221C]/5 flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-semibold">{spec.label}</span>
                          <span className="text-[#2E221C] font-bold">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#2E221C]/10 flex justify-between items-center text-[10px] text-[#8E7C74] font-bold uppercase">
                  <span>Facility Code: VBIT-{galleryItems[selectedItemIdx].id.toUpperCase()}</span>
                  <span>{selectedItemIdx + 1} of {galleryItems.length}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
