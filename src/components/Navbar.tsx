import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Sparkles, 
  ShieldAlert, 
  Activity, 
  Sun, 
  CircleDot, 
  Bookmark, 
  BookOpen,
  Lock,
  Zap,
  HeartPulse,
  Apple,
  Palette
} from 'lucide-react';
import { AmbientSoundPlayer } from './AmbientSoundPlayer';
import { useTheme } from '../context/ThemeContext';
import { ThemePickerModal } from './ThemePickerModal';

export type TabType = 
  | 'moods' 
  | 'ai_counselor' 
  | 'secret_tawbah' 
  | 'refuge_sin' 
  | 'mood_meter' 
  | 'recitation' 
  | 'sunnah_lifestyle' 
  | 'tawbah' 
  | 'ruqyah' 
  | 'boost' 
  | 'tasbeeh' 
  | 'bookmarks';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  bookmarkCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, bookmarkCount }) => {
  const { palette } = useTheme();
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const navItems: { id: TabType; label: string; icon: React.ReactNode; highlight?: boolean }[] = [
    { id: 'moods', label: 'Moods & Verses', icon: <HeartHandshake className="w-4 h-4" /> },
    { id: 'ai_counselor', label: 'Ask Al-Huda AI', icon: <Sparkles className="w-4 h-4" />, highlight: true },
    { id: 'secret_tawbah', label: 'Confidential Tawbah Box', icon: <Lock className="w-4 h-4" /> },
    { id: 'refuge_sin', label: 'Sin Prevention & Refuge', icon: <Zap className="w-4 h-4" /> },
    { id: 'mood_meter', label: 'Mood-o-Meter & Health', icon: <HeartPulse className="w-4 h-4" /> },
    { id: 'recitation', label: 'Daily Recitation', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'sunnah_lifestyle', label: 'Islamic Healthy Living', icon: <Apple className="w-4 h-4" /> },
    { id: 'tawbah', label: 'Pillars of Tawbah', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'ruqyah', label: 'Divine Ruqyah & Healing', icon: <Activity className="w-4 h-4" /> },
    { id: 'boost', label: 'Aesthetic Quote Studio', icon: <Sun className="w-4 h-4" /> },
    { id: 'tasbeeh', label: 'Digital Tasbeeh', icon: <CircleDot className="w-4 h-4" /> },
    { id: 'bookmarks', label: 'Saved Verses', icon: <Bookmark className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-amber-500/20">
      {/* Top Banner with Calligraphy */}
      <div className="bg-gradient-to-r from-slate-950 via-emerald-950/60 to-slate-950 py-1.5 px-4 text-center border-b border-slate-900">
        <span className="font-arabic text-amber-300/90 text-sm tracking-widest font-semibold">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </span>
        <span className="text-[11px] text-slate-400 ml-3 hidden sm:inline">
          In the Name of Allah, the Entirely Merciful, the Especially Merciful
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & App Name */}
          <div 
            onClick={() => setActiveTab('moods')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-emerald-800 p-0.5 shadow-[0_0_20px_rgba(217,119,6,0.25)] group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-emerald-300 bg-clip-text text-transparent">
                  Al-Huda
                </h1>
                <span className="px-1.5 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">
                  Divine Guidance
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden md:block">
                Quranic Wisdom • Sunnah Remedies • Spiritual Care
              </p>
            </div>
          </div>

          {/* Audio Recitation, Theme Switcher & Bookmarks Header Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            <AmbientSoundPlayer />

            {/* Theme Picker Trigger */}
            <button
              onClick={() => setIsThemeModalOpen(true)}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-200 text-xs font-medium transition-all flex items-center gap-2 shadow-sm group"
              title="Change Ethereal Theme Palette"
            >
              <Palette className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
              <span className="hidden sm:inline-flex items-center gap-1.5">
                <span>{palette.icon}</span>
                <span className="font-semibold text-slate-200">{palette.name}</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`relative p-2 rounded-xl border text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'bookmarks'
                  ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-amber-500/30'
              }`}
            >
              <Bookmark className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">Saved</span>
              {bookmarkCount > 0 && (
                <span className="ml-1 bg-amber-500 text-slate-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {bookmarkCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Theme Picker Modal */}
        <ThemePickerModal
          isOpen={isThemeModalOpen}
          onClose={() => setIsThemeModalOpen(false)}
        />

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none border-t border-slate-900 pt-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border border-amber-500/50 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.15)] font-semibold'
                    : item.highlight
                    ? 'bg-amber-950/30 text-amber-300 border border-amber-500/20 hover:border-amber-500/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <span className={isActive ? 'text-amber-400' : 'text-slate-400'}>
                  {item.icon}
                </span>
                {item.label}
                {item.highlight && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
