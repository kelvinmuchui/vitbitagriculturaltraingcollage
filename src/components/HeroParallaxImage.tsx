import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { Sparkles, Award, ShieldCheck, Coffee, GraduationCap, ArrowUpRight } from 'lucide-react';

interface HeroParallaxImageProps {
  imageSrc: string;
}

export default function HeroParallaxImage({ imageSrc }: HeroParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Motion values for tracking relative mouse position from -0.5 to 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics configuration for luxurious, liquid-smooth transition
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 1. 3D Card Tilt transforms
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [12, -12]); // Up/Down tilt
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]); // Left/Right tilt
  const cardX = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);
  const cardY = useTransform(smoothMouseY, [-0.5, 0.5], [-10, 10]);

  // 2. Interactive Layer transforms (different intensities & directions for spatial parallax depth)
  const layer1X = useTransform(smoothMouseX, [-0.5, 0.5], [25, -25]); // TVET Seal (Top Right)
  const layer1Y = useTransform(smoothMouseY, [-0.5, 0.5], [25, -25]);

  const layer2X = useTransform(smoothMouseX, [-0.5, 0.5], [-35, 35]); // Coffee Lab Badge (Bottom Left)
  const layer2Y = useTransform(smoothMouseY, [-0.5, 0.5], [-35, 35]);

  const layer3X = useTransform(smoothMouseX, [-0.5, 0.5], [15, -15]); // Glowing Sparkles (Top Left)
  const layer3Y = useTransform(smoothMouseY, [-0.5, 0.5], [15, -15]);

  // 3. Holographic glare layer positions using dynamic coordinate strings
  const glareBg = useTransform(
    [smoothMouseX, smoothMouseY],
    ([x, y]) => {
      const pctX = `${(Number(x) + 0.5) * 100}%`;
      const pctY = `${(Number(y) + 0.5) * 100}%`;
      return `radial-gradient(circle at ${pctX} ${pctY}, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 65%)`;
    }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Relative mouse position from -0.5 to 0.5
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(relativeX);
    mouseY.set(relativeY);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    // Reset positions to center
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/3] sm:aspect-[4/3] md:aspect-[4/3] lg:aspect-[4/3] xl:aspect-[4/3] py-4 select-none touch-none"
      style={{ perspective: 1500 }}
      id="hero-parallax-container"
    >
      {/* Dynamic back glow matching brand colors - shifts opposite to cursor */}
      <motion.div 
        className="absolute inset-6 rounded-[2.5rem] bg-gradient-to-tr from-[#b6171e]/15 via-[#C28A4E]/20 to-amber-500/10 blur-3xl -z-10 pointer-events-none"
        style={{
          x: useTransform(smoothMouseX, [-0.5, 0.5], [40, -40]),
          y: useTransform(smoothMouseY, [-0.5, 0.5], [40, -40]),
          scale: hovered ? 1.15 : 1.0,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Main 3D Card Body with preserved 3D child rendering */}
      <motion.div
        className="relative w-full h-full bg-white rounded-3xl overflow-visible shadow-[0_30px_100px_rgba(46,34,28,0.18)] border border-gray-200/90 p-3"
        style={{
          rotateX,
          rotateY,
          x: cardX,
          y: cardY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Inner Card Container - clip content inside actual card frame */}
        <div 
          className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-gray-50"
          style={{ transform: "translateZ(1px)" }} // Force onto its own GPU layer
        >
          {/* Base Image Layer - sits deep in the perspective */}
          <motion.img 
            src={imageSrc} 
            alt="VBIT Student Cohort and Campus" 
            className="w-full h-full object-cover select-none"
            referrerPolicy="no-referrer"
            style={{
              scale: hovered ? 1.06 : 1.0,
              transform: "translateZ(0px)",
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Vignette & Contrast enhancement overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/10 mix-blend-multiply pointer-events-none" />

          {/* Glare/Shine Sweeper Overlay */}
          <motion.div 
            className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay"
            style={{
              background: glareBg,
              opacity: hovered ? 0.35 : 0.05,
            }}
          />

          {/* Integrated Bottom Content Banner inside the card */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/60 to-transparent p-5 pt-12 text-white z-10 flex justify-between items-end">
            <div>
              <span className="text-[9px] uppercase tracking-widest font-extrabold text-[#e24e54] font-mono flex items-center gap-1">
                <Sparkles className="h-2.5 w-2.5" />
                Active Student Cohort
              </span>
              <h4 className="font-sans font-extrabold text-base text-white mt-1 drop-shadow-sm">VBIT Academic Community</h4>
              <p className="text-[10px] text-gray-300 font-medium font-mono mt-0.5">Empowering specialty agribusiness</p>
            </div>
            
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-extrabold text-white bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-lg uppercase tracking-wider font-mono">
                Est. 2024
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            FLOATING INTERACTIVE LAYER 1: TVET Accreditation Gold Seal Badge (Top Right)
            Floats extremely forward and off the card's right edge for dramatic 3D effect
            ========================================================================= */}
        <motion.div 
          className="absolute -top-3 -right-6 bg-white border border-[#C28A4E]/30 text-gray-900 rounded-2xl p-3 shadow-2xl flex items-center space-x-3 pointer-events-none z-30 min-w-[200px]"
          style={{
            x: layer1X,
            y: layer1Y,
            transform: "translateZ(60px)",
          }}
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#C28A4E] to-amber-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[9px] text-[#C28A4E] font-extrabold uppercase tracking-widest font-mono leading-none">Government approved</div>
            <div className="font-sans font-extrabold text-xs text-gray-900 mt-0.5">TVET Accreditation</div>
            <div className="text-[8px] text-gray-400 font-medium font-mono mt-0.5">Official Certification</div>
          </div>
        </motion.div>

        {/* =========================================================================
            FLOATING INTERACTIVE LAYER 2: SCA Standard Coffee Lab Badge (Bottom Left)
            Floats forward and off the card's left edge
            ========================================================================= */}
        <motion.div 
          className="absolute bottom-16 -left-8 bg-gray-900 border border-gray-800 text-white rounded-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center space-x-3 pointer-events-none z-30 min-w-[190px]"
          style={{
            x: layer2X,
            y: layer2Y,
            transform: "translateZ(85px)",
          }}
        >
          <div className="h-10 w-10 rounded-xl bg-[#b6171e] flex items-center justify-center text-white shadow-md flex-shrink-0">
            <Coffee className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="text-[9px] text-[#e24e54] font-extrabold uppercase tracking-widest font-mono leading-none">Specialty Industry</div>
            <div className="font-sans font-extrabold text-xs text-white mt-0.5">SCA Cupping Lab</div>
            <div className="text-[8px] text-gray-400 font-medium font-mono mt-0.5">Commercial Grade Gear</div>
          </div>
        </motion.div>

        {/* =========================================================================
            FLOATING INTERACTIVE LAYER 3: Employment Rate Badge (Top Left / Inside-Border)
            Floats moderately, adds beautiful balanced asymmetry
            ========================================================================= */}
        <motion.div 
          className="absolute top-24 -left-6 bg-white border border-gray-200/80 text-gray-900 rounded-2xl px-3.5 py-2.5 shadow-xl flex items-center space-x-2.5 pointer-events-none z-20"
          style={{
            x: layer3X,
            y: layer3Y,
            transform: "translateZ(35px)",
          }}
        >
          <div className="h-6 w-6 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <div className="font-sans font-extrabold text-xs text-gray-900 leading-none">92% Hired</div>
            <div className="text-[8px] text-gray-400 font-bold font-mono mt-1 uppercase tracking-wider">Direct Placement</div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
