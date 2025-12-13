
import React from 'react';

interface KipukipetLogoProps {
  className?: string;
}

const KipukipetLogo: React.FC<KipukipetLogoProps> = ({ className = 'h-8 w-8' }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M50 0L0 50L50 100L65 85L30 50L65 15L50 0Z" fill="white"/>
      <path d="M50 0L100 50L50 100L35 85L70 50L35 15L50 0Z" fill="white"/>
    </svg>
  );
};

export default KipukipetLogo;
