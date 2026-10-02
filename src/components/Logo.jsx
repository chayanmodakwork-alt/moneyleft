import React from 'react';

export default function Logo({ size = 'medium', showTagline = false, light = false }) {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  const iconDim = isLarge ? 52 : isSmall ? 32 : 40;

  return (
    <div className={`moneyleft-logo-wrap ${light ? 'light' : ''}`}>
      <div 
        className="logo-mark"
        style={{ width: iconDim, height: iconDim }}
      >
        <svg 
          viewBox="0 0 48 48" 
          width={iconDim} 
          height={iconDim} 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer ring representing budget envelope */}
          <rect width="48" height="48" rx="14" fill={light ? '#FFFFFF' : '#0D9488'} />
          
          {/* Subtle wallet/balance geometry */}
          <path 
            d="M13 18C13 15.7909 14.7909 14 17 14H31C33.2091 14 35 15.7909 35 18V30C35 32.2091 33.2091 34 31 34H17C14.7909 34 13 32.2091 13 30V18Z" 
            stroke={light ? '#0D9488' : '#FFFFFF'} 
            strokeWidth="2.5" 
            strokeLinecap="round"
          />
          {/* The "Money Left" available gauge - distinctive co-pilot arc */}
          <path 
            d="M18 24C18 20.6863 20.6863 18 24 18C27.3137 18 30 20.6863 30 24" 
            stroke={light ? '#14B8A6' : '#99F6E4'} 
            strokeWidth="2.5" 
            strokeLinecap="round"
          />
          {/* Accent coin center */}
          <circle 
            cx="24" 
            cy="27" 
            r="3.5" 
            fill={light ? '#0D9488' : '#F0FDFA'} 
          />
        </svg>
      </div>
      
      <div className="logo-text-block">
        <span className={`logo-brand-name ${isLarge ? 'text-2xl' : isSmall ? 'text-base' : 'text-lg'}`}>
          Money<strong>Left</strong>
        </span>
        {showTagline && (
          <span className="logo-tagline">Know your money. Before it’s gone.</span>
        )}
      </div>
    </div>
  );
}
