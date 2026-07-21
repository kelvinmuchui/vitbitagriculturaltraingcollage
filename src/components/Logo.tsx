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
      {/* Outer Deep Red Circle Rim */}
      <circle cx="100" cy="100" r="97" fill="#C21A1A" />
      
      {/* Inner White Band with Red Dots/Beads */}
      <circle cx="100" cy="100" r="91" fill="#FAF6F0" />
      {/* Red Beaded/Dotted Ring */}
      <circle 
        cx="100" 
        cy="100" 
        r="86" 
        stroke="#C21A1A" 
        strokeWidth="3" 
        strokeDasharray="1 5.5" 
        strokeLinecap="round" 
        fill="none" 
      />
      
      {/* Solid Red Circular Band for Text */}
      <circle cx="100" cy="100" r="76" fill="none" stroke="#C21A1A" strokeWidth="16" />
      
      {/* Text Path Definitions */}
      <defs>
        {/* Curved path for VIBIT AGRICULTURAL along the top */}
        <path 
          id="textPathTop" 
          d="M 32,100 A 68,68 0 0,1 168,100" 
          fill="none" 
        />
        {/* Curved path for TRAINING COLLEGE along the bottom */}
        <path 
          id="textPathBottom" 
          d="M 168,100 A 68,68 0 0,1 32,100" 
          fill="none" 
        />
        {/* A subtle drop shadow filter for the banner */}
        <filter id="bannerShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* White text: VIBIT AGRICULTURAL */}
      <text fill="#FFFFFF" fontSize="10.5" fontWeight="900" letterSpacing="1.2" fontFamily="system-ui, -apple-system, sans-serif">
        <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
          VIBIT AGRICULTURAL
        </textPath>
      </text>

      {/* White text: TRAINING COLLEGE */}
      <text fill="#FFFFFF" fontSize="10.5" fontWeight="900" letterSpacing="1.2" fontFamily="system-ui, -apple-system, sans-serif">
        <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
          TRAINING COLLEGE
        </textPath>
      </text>

      {/* Left and Right Separator Dots */}
      <circle cx="28" cy="100" r="3.5" fill="#FAF6F0" stroke="#C21A1A" strokeWidth="1" />
      <circle cx="28" cy="100" r="1.5" fill="#C21A1A" />
      
      <circle cx="172" cy="100" r="3.5" fill="#FAF6F0" stroke="#C21A1A" strokeWidth="1" />
      <circle cx="172" cy="100" r="1.5" fill="#C21A1A" />

      {/* Center White/Cream Badge */}
      <circle cx="100" cy="100" r="59" fill="#FAF6F0" />
      <circle cx="100" cy="100" r="56" stroke="#C21A1A" strokeWidth="1.5" fill="none" />

      {/* Red Shield outline framing the coffee cup */}
      <path 
        d="M 72,82 C 68,110 84,124 100,126 C 116,124 132,110 128,82" 
        stroke="#C21A1A" 
        strokeWidth="3.5" 
        fill="none" 
        strokeLinecap="round" 
      />

      {/* Steaming Coffee Cup inside Shield */}
      {/* Steam lines */}
      <path d="M 95,74 Q 92,67 96,62 T 94,52" stroke="#FAF6F0" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 95,74 Q 92,67 96,62 T 94,52" stroke="#4A2C11" strokeWidth="1" fill="none" strokeLinecap="round" />

      <path d="M 100,74 Q 97,66 101,61 T 99,50" stroke="#FAF6F0" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 100,74 Q 97,66 101,61 T 99,50" stroke="#4A2C11" strokeWidth="1" fill="none" strokeLinecap="round" />

      {/* Cup Body */}
      <path d="M 83,82 C 83,104 117,104 117,82 Z" fill="#FAF6F0" stroke="#4A2C11" strokeWidth="3.5" />
      {/* Cup Rim */}
      <ellipse cx="100" cy="82" rx="17" ry="4.5" fill="#4A2C11" />
      {/* Coffee inside Cup */}
      <ellipse cx="100" cy="82.5" rx="14" ry="3" fill="#8B5A2B" />
      {/* Cup Handle */}
      <path d="M 117,86 C 124,86 124,96 117,96" stroke="#4A2C11" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Red Graduation Cap (Mortarboard) */}
      <g transform="translate(100, 48) scale(0.95)">
        {/* Base skull cap */}
        <path d="M -16,8 L -16,15 C -16,18 16,18 16,15 L 16,8" fill="#C21A1A" stroke="#FAF6F0" strokeWidth="0.5" />
        {/* Diamond top */}
        <polygon points="0,-3 32,5 0,13 -32,5" fill="#C21A1A" stroke="#FAF6F0" strokeWidth="1" />
        {/* Cap Button */}
        <circle cx="0" cy="5" r="2" fill="#FAF6F0" />
        {/* Red Tassel hanging down to the right */}
        <path d="M 0,5 Q 18,8 23,16" stroke="#FAF6F0" strokeWidth="1" fill="none" />
        <path d="M 23,16 L 23,24" stroke="#C21A1A" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Dark Brown Ribbon Banner with text at the bottom */}
      <g filter="url(#bannerShadow)">
        {/* Ribbon banner folds (background) */}
        <polygon points="34,130 42,120 42,138" fill="#311D11" />
        <polygon points="166,130 158,120 158,138" fill="#311D11" />
        <path d="M 34,130 L 26,124 L 42,120 Z" fill="#4A2C11" />
        <path d="M 166,130 L 174,124 L 158,120 Z" fill="#4A2C11" />
        
        {/* Ribbon banner main face */}
        <path 
          d="M 40,120 L 160,120 L 155,138 L 45,138 Z" 
          fill="#4A2C11" 
          stroke="#D4AF37" 
          strokeWidth="1.2" 
        />
        
        {/* Ribbon text: Empowering skills, growing futures */}
        <text 
          x="100" 
          y="131.5" 
          fill="#FFFFFF" 
          fontSize="5" 
          fontWeight="700" 
          textAnchor="middle" 
          letterSpacing="0.1"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Empowering skills,growing futures
        </text>
      </g>
    </svg>
  );
}
