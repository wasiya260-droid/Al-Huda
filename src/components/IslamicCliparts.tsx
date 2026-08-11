import React from 'react';

// Lantern ClipArt
export const LanternClipart: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M50 5V20" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
    <circle cx="50" cy="8" r="5" fill="#FBBF24" />
    {/* Lantern Top Cap */}
    <path d="M30 30C30 22 70 22 70 30L65 40H35L30 30Z" fill="url(#lanternGold)" />
    {/* Glass Body */}
    <path d="M35 40L28 80H72L65 40H35Z" fill="url(#glassGlow)" stroke="#F59E0B" strokeWidth="2" />
    {/* Inner Flame Glow */}
    <ellipse cx="50" cy="60" rx="10" ry="16" fill="url(#flameGlow)" />
    <circle cx="50" cy="62" r="5" fill="#FEF08A" />
    {/* Lantern Base */}
    <path d="M25 80C25 88 75 88 75 80H25Z" fill="url(#lanternGold)" />
    <path d="M35 88L40 100H60L65 88H35Z" fill="#D97706" />
    {/* Rays */}
    <path d="M20 60H10M90 60H80M25 45L15 35M75 45L85 35M25 75L15 85M75 75L85 85" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <defs>
      <linearGradient id="lanternGold" x1="30" y1="20" x2="70" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBBF24" />
        <stop offset="1" stopColor="#B45309" />
      </linearGradient>
      <linearGradient id="glassGlow" x1="35" y1="40" x2="65" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FEF3C7" stopOpacity="0.4" />
        <stop offset="1" stopColor="#F59E0B" stopOpacity="0.1" />
      </linearGradient>
      <radialGradient id="flameGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 60) scale(10 16)">
        <stop stopColor="#FDE047" />
        <stop offset="0.7" stopColor="#F97316" />
        <stop offset="1" stopColor="#EF4444" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

// Crescent & Star Clipart
export const CrescentClipart: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M70 15C50 15 35 30 35 50C35 70 50 85 70 85C55 85 40 75 40 50C40 25 55 15 70 15Z" fill="url(#crescentGrad)" />
    {/* Sparkling Star */}
    <path d="M75 35L77.5 42.5L85 45L77.5 47.5L75 55L72.5 47.5L65 45L72.5 42.5L75 35Z" fill="#FBBF24" />
    <circle cx="82" cy="25" r="2" fill="#34D399" />
    <circle cx="25" cy="70" r="3" fill="#A78BFA" />
    <defs>
      <linearGradient id="crescentGrad" x1="35" y1="15" x2="70" y2="85" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBBF24" />
        <stop offset="0.5" stopColor="#34D399" />
        <stop offset="1" stopColor="#60A5FA" />
      </linearGradient>
    </defs>
  </svg>
);

// Quran Stand (Rahl) Clipart
export const QuranStandClipart: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Open Book */}
    <path d="M15 35C25 32 40 33 50 38C60 33 75 32 85 35V65C75 62 60 63 50 68C40 63 25 62 15 65V35Z" fill="url(#bookPages)" stroke="#10B981" strokeWidth="2" />
    {/* Book Cover Edge */}
    <path d="M12 37C22 34 38 35 48 40V70C38 65 22 64 12 67V37Z" fill="url(#bookCover)" />
    <path d="M88 37C78 34 62 35 52 40V70C62 65 78 64 88 67V37Z" fill="url(#bookCover)" />
    {/* Stand Wooden Cross */}
    <path d="M25 65L75 90M75 65L25 90" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
    <defs>
      <linearGradient id="bookPages" x1="15" y1="35" x2="85" y2="68" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FEF3C7" />
        <stop offset="1" stopColor="#FDE68A" />
      </linearGradient>
      <linearGradient id="bookCover" x1="12" y1="37" x2="88" y2="70" gradientUnits="userSpaceOnUse">
        <stop stopColor="#047857" />
        <stop offset="1" stopColor="#064E3B" />
      </linearGradient>
    </defs>
  </svg>
);

// Heart Refuge Shield Clipart
export const HeartShieldClipart: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Outer Shield */}
    <path d="M50 10L80 25V50C80 70 50 90 50 90C50 90 20 70 20 50V25L50 10Z" fill="url(#shieldGrad)" stroke="#F59E0B" strokeWidth="2" />
    {/* Inner Heart */}
    <path d="M50 38C45 32 35 32 30 38C25 44 28 54 50 68C72 54 75 44 70 38C65 32 55 32 50 38Z" fill="url(#heartGrad)" />
    {/* Sparkles */}
    <circle cx="50" cy="25" r="3" fill="#FEF08A" />
    <defs>
      <linearGradient id="shieldGrad" x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8B5CF6" />
        <stop offset="1" stopColor="#4C1D95" />
      </linearGradient>
      <linearGradient id="heartGrad" x1="30" y1="32" x2="70" y2="68" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F43F5E" />
        <stop offset="1" stopColor="#BE123C" />
      </linearGradient>
    </defs>
  </svg>
);

// Peaceful Lotus/Flower Clipart
export const LotusClipart: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Center Petal */}
    <path d="M50 20C40 40 40 60 50 75C60 60 60 40 50 20Z" fill="url(#petalCenter)" />
    {/* Left Petals */}
    <path d="M50 30C30 40 20 55 30 75C40 65 48 55 50 30Z" fill="url(#petalSide)" />
    <path d="M50 45C20 50 10 65 20 80C35 75 45 65 50 45Z" fill="url(#petalOuter)" />
    {/* Right Petals */}
    <path d="M50 30C70 40 80 55 70 75C60 65 52 55 50 30Z" fill="url(#petalSide)" />
    <path d="M50 45C80 50 90 65 80 80C65 75 55 65 50 45Z" fill="url(#petalOuter)" />
    {/* Base Lotus Pod */}
    <ellipse cx="50" cy="78" rx="25" ry="6" fill="#10B981" />
    <defs>
      <linearGradient id="petalCenter" x1="50" y1="20" x2="50" y2="75" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F472B6" />
        <stop offset="1" stopColor="#DB2777" />
      </linearGradient>
      <linearGradient id="petalSide" x1="30" y1="30" x2="70" y2="75" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FB7185" />
        <stop offset="1" stopColor="#E11D48" />
      </linearGradient>
      <linearGradient id="petalOuter" x1="20" y1="45" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBBF24" />
        <stop offset="1" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
  </svg>
);

// Olive Branch / Peace Clipart
export const OliveBranchClipart: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M15 85C30 70 50 40 85 15" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
    {/* Leaves */}
    <path d="M30 65C25 50 35 45 40 55C45 65 35 70 30 65Z" fill="#34D399" />
    <path d="M45 50C40 35 50 30 55 40C60 50 50 55 45 50Z" fill="#10B981" />
    <path d="M60 35C55 20 65 15 70 25C75 35 65 40 60 35Z" fill="#059669" />
    {/* Olives */}
    <circle cx="42" cy="62" r="5" fill="#FBBF24" />
    <circle cx="58" cy="48" r="5" fill="#FBBF24" />
    <circle cx="72" cy="32" r="5" fill="#FBBF24" />
  </svg>
);
