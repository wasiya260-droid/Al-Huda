import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeId = 'sunset_gold' | 'midnight_blue' | 'sage_green' | 'twilight_amethyst';

export interface ThemePalette {
  id: ThemeId;
  name: string;
  description: string;
  icon: string;
  swatchColors: [string, string, string]; // hex or tailwind colors
  bgGlowGradient: string;
  topBannerGradient: string;
  cardBorder: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  glowShadow: string;
  activeTabGradient: string;
  pillBg: string;
}

export const THEME_PALETTES: Record<ThemeId, ThemePalette> = {
  sunset_gold: {
    id: 'sunset_gold',
    name: 'Sunset Gold',
    description: 'Warm royal amber, golden light & comforting rose undertones',
    icon: '🌅',
    swatchColors: ['#f59e0b', '#f43f5e', '#10b981'],
    bgGlowGradient: 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(245, 158, 11, 0.18), rgba(255, 255, 255, 0))',
    topBannerGradient: 'from-slate-950 via-emerald-950/60 to-slate-950',
    cardBorder: 'border-amber-500/30',
    accentText: 'text-amber-400',
    accentBg: 'bg-amber-500/20',
    accentBorder: 'border-amber-500/40',
    glowShadow: 'shadow-[0_0_25px_rgba(245,158,11,0.25)]',
    activeTabGradient: 'from-amber-500/20 to-emerald-500/20 border-amber-500/50 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.15)]',
    pillBg: 'hover:bg-amber-500/20 text-amber-300',
  },
  midnight_blue: {
    id: 'midnight_blue',
    name: 'Midnight Blue',
    description: 'Celestial sapphire, starlight cyan & deep indigo tranquility',
    icon: '🌌',
    swatchColors: ['#38bdf8', '#6366f1', '#a855f7'],
    bgGlowGradient: 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(56, 189, 248, 0.18), rgba(255, 255, 255, 0))',
    topBannerGradient: 'from-slate-950 via-indigo-950/70 to-slate-950',
    cardBorder: 'border-sky-500/30',
    accentText: 'text-sky-400',
    accentBg: 'bg-sky-500/20',
    accentBorder: 'border-sky-500/40',
    glowShadow: 'shadow-[0_0_25px_rgba(56,189,248,0.25)]',
    activeTabGradient: 'from-sky-500/20 to-indigo-500/20 border-sky-500/50 text-sky-200 shadow-[0_0_15px_rgba(56,189,248,0.15)]',
    pillBg: 'hover:bg-sky-500/20 text-sky-300',
  },
  sage_green: {
    id: 'sage_green',
    name: 'Sage Green',
    description: 'Peaceful oasis, mint emerald & comforting olive leaf tranquility',
    icon: '🌿',
    swatchColors: ['#34d399', '#10b981', '#f59e0b'],
    bgGlowGradient: 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(52, 211, 153, 0.18), rgba(255, 255, 255, 0))',
    topBannerGradient: 'from-slate-950 via-teal-950/70 to-slate-950',
    cardBorder: 'border-emerald-500/30',
    accentText: 'text-emerald-400',
    accentBg: 'bg-emerald-500/20',
    accentBorder: 'border-emerald-500/40',
    glowShadow: 'shadow-[0_0_25px_rgba(52,211,153,0.25)]',
    activeTabGradient: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/50 text-emerald-200 shadow-[0_0_15px_rgba(52,211,153,0.15)]',
    pillBg: 'hover:bg-emerald-500/20 text-emerald-300',
  },
  twilight_amethyst: {
    id: 'twilight_amethyst',
    name: 'Twilight Amethyst',
    description: 'Deep velvet violet, mystical orchid & soft rose serenity',
    icon: '🔮',
    swatchColors: ['#c084fc', '#e879f9', '#fb7185'],
    bgGlowGradient: 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(192, 132, 252, 0.18), rgba(255, 255, 255, 0))',
    topBannerGradient: 'from-slate-950 via-purple-950/70 to-slate-950',
    cardBorder: 'border-purple-500/30',
    accentText: 'text-purple-400',
    accentBg: 'bg-purple-500/20',
    accentBorder: 'border-purple-500/40',
    glowShadow: 'shadow-[0_0_25px_rgba(192,132,252,0.25)]',
    activeTabGradient: 'from-purple-500/20 to-fuchsia-500/20 border-purple-500/50 text-purple-200 shadow-[0_0_15px_rgba(192,132,252,0.15)]',
    pillBg: 'hover:bg-purple-500/20 text-purple-300',
  },
};

interface ThemeContextType {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  palette: ThemePalette;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    const saved = localStorage.getItem('al_huda_ethereal_theme');
    if (saved && saved in THEME_PALETTES) {
      return saved as ThemeId;
    }
    return 'sunset_gold';
  });

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme);
    localStorage.setItem('al_huda_ethereal_theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const palette = THEME_PALETTES[theme] || THEME_PALETTES.sunset_gold;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, palette }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
