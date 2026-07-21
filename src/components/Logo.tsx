import React from 'react';
import logoImage from '../assets/images/logo.jpg';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-10 w-10" }: LogoProps) {
  return (
    <img 
      src={logoImage} 
      alt="VIBIT Agricultural Training College Logo" 
      className={`${className} object-contain rounded-full shadow-xs`}
      referrerPolicy="no-referrer"
    />
  );
}
