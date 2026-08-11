import React, { useState } from 'react';
import { Sparkles, Heart, Shield, Activity, Search, RefreshCw, Volume2 } from 'lucide-react';
import { QURAN_VERSES } from '../data/quranData';
import { MoodCategory } from '../types';
import { TabType } from './Navbar';
import { LanternClipart, CrescentClipart, LotusClipart } from './IslamicCliparts';

interface HeroSectionProps {
  setActiveTab: (tab: TabType) => void;
  setSelectedMood: (mood: MoodCategory) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  setActiveTab,
  setSelectedMood,
  searchQuery,
  setSearchQuery,
}) => {
  const [currentAyatIndex, setCurrentAyatIndex] = useState(0);

  const dailyAyat = QURAN_VERSES[currentAyatIndex];

  const handleNextAyat = () => {
    setCurrentAyatIndex((prev) => (prev + 1) % QURAN_VERSES.length);
  };

  const quickMoods: { id: MoodCategory; label: string; icon: string; bg: string }[] = [
    { id: 'anxiety', label: 'Anxious / Overwhelmed', icon: '🌪️', bg: 'hover:bg-teal-500/20' },
    { id: 'sadness', label: 'Sorrowful / Heartbroken', icon: '🌧️', bg: 'hover:bg-blue-500/20' },
    { id: 'temptation', label: 'Facing Temptation', icon: '🔥', bg: 'hover:bg-rose-500/20' },
    { id: 'joy', label: 'Grateful / Blessed', icon: '☀️', bg: 'hover:bg-amber-500/20' },
    { id: 'fear', label: 'Fearful / Insecure', icon: '🛡️', bg: 'hover:bg-indigo-500/20' },
    { id: 'guilt', label: 'Guilty / Seeking Tawbah', icon: '🕊️', bg: 'hover:bg-purple-500/20' },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/80 border border-amber-500/30 shadow-2xl p-6 sm:p-10 mb-10">
      {/* ClipArt Accents */}
      <div className="absolute top-3 right-4 opacity-30 pointer-events-none hidden sm:block">
        <LanternClipart className="w-16 h-16 animate-pulse" />
      </div>
      <div className="absolute bottom-3 left-4 opacity-25 pointer-events-none hidden sm:block">
        <CrescentClipart className="w-16 h-16" />
      </div>

      {/* Background Divine Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-amber-500/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Col: Main Intro & AI Guidance Call to Action */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-500/20 border border-amber-500/40 text-amber-200 text-xs font-semibold shadow-md">
            <LotusClipart className="w-5 h-5" />
            <span>Welcome to Al-Huda Sanctuary — A Place of Peace, Non-Judgment & Hope</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-100 leading-tight">
            How should a believer react in <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-emerald-300 bg-clip-text text-transparent">every human moment?</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            You are warmly welcomed here. Find immediate Quranic comfort, non-judgmental Tawbah guidance, Ruqyah healing, and healthy Prophetic lifestyle wisdom for whatever burdens your heart today.
          </p>

          {/* Quick Search Bar */}
          <div className="relative max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 h-4 text-amber-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your feeling or situation e.g. 'anxiety', 'backbiting', 'healing', 'anger'..."
              className="w-full pl-10 pr-24 py-3.5 bg-slate-900/90 border border-amber-500/40 rounded-2xl text-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-300 hover:text-white px-2.5 py-1 bg-slate-800 rounded-xl"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Mood Pills */}
          <div>
            <p className="text-xs font-bold text-amber-300/90 mb-2.5 uppercase tracking-wider flex items-center gap-1.5">
              <span>🌸</span> Select Your Current State / Emotion:
            </p>
            <div className="flex flex-wrap gap-2">
              {quickMoods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedMood(m.id);
                    setActiveTab('moods');
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 ${m.bg} text-slate-200 text-xs font-medium transition-all shadow-sm`}
                >
                  <span>{m.icon}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('ai_counselor')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:brightness-110 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Ask AI Spiritual Counselor
            </button>

            <button
              onClick={() => setActiveTab('secret_tawbah')}
              className="px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-900/80 to-slate-900 border border-purple-500/50 hover:border-purple-400 text-purple-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md"
            >
              🔒 Confidential Tawbah Box
            </button>

            <button
              onClick={() => setActiveTab('ruqyah')}
              className="px-4 py-3 rounded-2xl bg-slate-900 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 font-medium text-xs sm:text-sm flex items-center gap-2 transition-all"
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              Ruqyah Healing
            </button>
          </div>
        </div>

        {/* Right Col: Ayat of the Moment Highlight Card */}
        <div className="lg:col-span-5">
          <div className="relative rounded-3xl bg-slate-950/90 border border-amber-500/40 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Ayat of the Moment
                </span>
              </div>

              <button
                onClick={handleNextAyat}
                className="text-xs text-slate-300 hover:text-amber-300 flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-xl border border-slate-800"
                title="Refresh Verse"
              >
                <RefreshCw className="w-3 h-3" />
                Next Verse
              </button>
            </div>

            {/* Arabic Text */}
            <div className="text-right py-2">
              <p className="font-arabic text-2xl sm:text-3xl text-amber-100 leading-loose tracking-wide font-medium">
                {dailyAyat.arabic}
              </p>
              <p className="text-xs text-amber-400/90 font-semibold mt-1">
                Surah {dailyAyat.surahName} ({dailyAyat.surahNumber}:{dailyAyat.verseNumber})
              </p>
            </div>

            {/* Translation & Reflection */}
            <div className="space-y-2 bg-slate-900/80 p-4 rounded-2xl border border-slate-800/80">
              <p className="text-xs text-slate-200 italic leading-relaxed">
                "{dailyAyat.translation}"
              </p>
              <p className="text-[11px] text-slate-300 leading-relaxed pt-1 border-t border-slate-800">
                <strong className="text-emerald-400 font-bold">Reflection:</strong> {dailyAyat.reflection}
              </p>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => {
                  setSelectedMood(dailyAyat.moods[0]);
                  setActiveTab('moods');
                }}
                className="text-[11px] text-amber-300 hover:underline flex items-center gap-1 font-semibold"
              >
                Explore guidance for this verse →
              </button>

              <button
                onClick={() => setActiveTab('boost')}
                className="text-[11px] text-slate-400 hover:text-white underline"
              >
                Open Quote Studio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
