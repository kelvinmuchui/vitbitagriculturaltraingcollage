import React from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-10 w-10" }: LogoProps) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Deep Red Circle */}
      <circle cx="100" cy="100" r="94" fill="#8B1D1D" stroke="#D4AF37" strokeWidth="4" />
      
      {/* Inner Gold Ring */}
      <circle cx="100" cy="100" r="76" stroke="#D4AF37" strokeWidth="2" fill="none" />
      
      {/* Text Path definition */}
      <defs>
        {/* A path for VIBIT AGRICULTURAL TRAINING COLLEGE wrapping along the top inside the circle */}
        <path 
          id="textPathTop" 
          d="M 24,100 A 76,76 0 1,1 176,100" 
          fill="none" 
        />
        {/* A shadow filter for depth */}
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* SVG Text along path for the College Name */}
      <text fill="#FAF6F0" fontSize="11" fontWeight="bold" letterSpacing="1.2">
        <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
          VIBIT AGRICULTURAL TRAINING COLLEGE
        </textPath>
      </text>

      {/* Center Crest Area */}
      {/* White/Cream Background for inner circle */}
      <circle cx="100" cy="98" r="54" fill="#FAF6F0" filter="url(#shadow)" />
      
      {/* Gold Inner Circle Border */}
      <circle cx="100" cy="98" r="50" stroke="#D4AF37" strokeWidth="1.5" fill="none" />

      {/* Coffee Plant Leaves & Berries (Left & Right) */}
      {/* Left Leaf & Berries */}
      <path d="M 68,110 C 65,100 62,95 56,98 C 62,102 65,110 68,110 Z" fill="#1B4D3E" />
      <circle cx="66" cy="106" r="3" fill="#D21F3C" />
      <circle cx="69" cy="109" r="2.5" fill="#D21F3C" />
      <circle cx="63" cy="103" r="2" fill="#D4AF37" /> {/* Yellow/unripe cherry */}

      {/* Right Leaf & Berries */}
      <path d="M 132,110 C 135,100 138,95 144,98 C 138,102 135,110 132,110 Z" fill="#1B4D3E" />
      <circle cx="134" cy="106" r="3" fill="#D21F3C" />
      <circle cx="131" cy="109" r="2.5" fill="#D21F3C" />
      <circle cx="137" cy="103" r="2" fill="#D21F3C" />

      {/* Steaming Coffee Cup in Center */}
      {/* Steam lines */}
      <path d="M 94,82 Q 92,76 95,72" stroke="#8B1D1D" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 100,81 Q 98,74 102,70" stroke="#8B1D1D" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 106,82 Q 104,76 107,72" stroke="#8B1D1D" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Cup Body */}
      <path d="M 86,86 C 86,104 114,104 114,86 Z" fill="#8B1D1D" />
      <path d="M 83,86 H 117" stroke="#8B1D1D" strokeWidth="2.5" strokeLinecap="round" />
      {/* Cup Handle */}
      <path d="M 114,89 C 121,89 121,97 114,97" stroke="#8B1D1D" strokeWidth="2" fill="none" />
      {/* Cup Saucer */}
      <path d="M 80,105 C 80,109 120,109 120,105 Z" fill="#D4AF37" />

      {/* Graduation Cap overlapping slightly above the cup */}
      <g transform="translate(100, 56) scale(0.85)">
        {/* Cap Cap-base */}
        <path d="M -16,10 L -16,18 C -16,21 16,21 16,18 L 16,10" fill="#2E221C" stroke="#D4AF37" strokeWidth="1" />
        {/* Cap Diamond */}
        <polygon points="0,0 32,8 0,16 -32,8" fill="#110E0C" stroke="#D4AF37" strokeWidth="1.5" />
        {/* Cap Tassel */}
        <path d="M 0,8 C 12,12 18,18 19,26" stroke="#D4AF37" strokeWidth="1" fill="none" />
        <circle cx="19" cy="27" r="1.5" fill="#D4AF37" />
      </g>

      {/* Golden Banner at the Bottom */}
      <g filter="url(#shadow)">
        <path 
          d="M 25,142 L 35,134 L 165,134 L 175,142 L 165,152 L 35,152 Z" 
          fill="#D4AF37" 
        />
        <path 
          d="M 35,134 L 165,134 L 165,152 L 35,152 Z" 
          fill="#C28A4E" 
          stroke="#FAF6F0" 
          strokeWidth="1" 
        />
        {/* Banner folds on left and right */}
        <polygon points="25,142 35,134 35,152" fill="#8E7C74" />
        <polygon points="175,142 165,134 165,152" fill="#8E7C74" />
        
        {/* Banner Text: EMPOWERING SKILLS, GROWING FUTURES */}
        <text 
          x="100" 
          y="146.5" 
          fill="#FAF6F0" 
          fontSize="5.2" 
          fontWeight="900" 
          textAnchor="middle" 
          letterSpacing="0.4"
        >
          EMPOWERING SKILLS, GROWING FUTURES
        </text>
      </g>
    </svg>
  );
}
