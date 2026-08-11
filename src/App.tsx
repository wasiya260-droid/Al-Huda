/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, TabType } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MoodGuidanceView } from './components/MoodGuidanceView';
import { AIGuidanceView } from './components/AIGuidanceView';
import { SinToTawbahView } from './components/SinToTawbahView';
import { RuqyahHealingView } from './components/RuqyahHealingView';
import { SpiritualBoostView } from './components/SpiritualBoostView';
import { TasbeehCounter } from './components/TasbeehCounter';
import { SavedBookmarksView } from './components/SavedBookmarksView';
import { SecretTawbahBoxView } from './components/SecretTawbahBoxView';
import { RefugeSinReminderView } from './components/RefugeSinReminderView';
import { MoodMeterTrackerView } from './components/MoodMeterTrackerView';
import { DailyRecitationView } from './components/DailyRecitationView';
import { IslamicLifestyleView } from './components/IslamicLifestyleView';
import { MoodCategory, BookmarkItem } from './types';
import { Heart, Shield, BookOpen, Sparkles } from 'lucide-react';

import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const { palette } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>('moods');
  const [selectedMood, setSelectedMood] = useState<MoodCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
    const saved = localStorage.getItem('al_huda_bookmarks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('al_huda_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const handleSaveBookmark = (item: BookmarkItem) => {
    setBookmarks((prev) => {
      if (prev.some((b) => b.id === item.id)) {
        // Toggle off if already bookmarked
        return prev.filter((b) => b.id !== item.id);
      }
      return [item, ...prev];
    });
  };

  const handleRemoveBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  const savedBookmarkIds = bookmarks.map((b) => b.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 transition-colors duration-500">
      {/* Dynamic Top Background Glow Lattices */}
      <div 
        className="fixed top-0 left-0 right-0 h-[30rem] pointer-events-none z-0 transition-all duration-700" 
        style={{ background: palette.bgGlowGradient }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          bookmarkCount={bookmarks.length}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Show HeroSection on 'moods' tab */}
          {activeTab === 'moods' && (
            <HeroSection
              setActiveTab={setActiveTab}
              setSelectedMood={(m) => setSelectedMood(m)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}

          {/* Tab Views */}
          {activeTab === 'moods' && (
            <MoodGuidanceView
              selectedMood={selectedMood}
              setSelectedMood={(m) => setSelectedMood(m)}
              searchQuery={searchQuery}
              onSaveBookmark={handleSaveBookmark}
              savedBookmarkIds={savedBookmarkIds}
            />
          )}

          {activeTab === 'ai_counselor' && (
            <AIGuidanceView
              onSaveBookmark={handleSaveBookmark}
              savedBookmarkIds={savedBookmarkIds}
            />
          )}

          {activeTab === 'secret_tawbah' && (
            <SecretTawbahBoxView
              onSaveBookmark={handleSaveBookmark}
              savedBookmarkIds={savedBookmarkIds}
            />
          )}

          {activeTab === 'refuge_sin' && <RefugeSinReminderView />}

          {activeTab === 'mood_meter' && <MoodMeterTrackerView />}

          {activeTab === 'recitation' && <DailyRecitationView />}

          {activeTab === 'sunnah_lifestyle' && <IslamicLifestyleView />}

          {activeTab === 'tawbah' && <SinToTawbahView />}

          {activeTab === 'ruqyah' && (
            <RuqyahHealingView
              onSaveBookmark={handleSaveBookmark}
              savedBookmarkIds={savedBookmarkIds}
            />
          )}

          {activeTab === 'boost' && (
            <SpiritualBoostView
              onSaveBookmark={handleSaveBookmark}
              savedBookmarkIds={savedBookmarkIds}
            />
          )}

          {activeTab === 'tasbeeh' && <TasbeehCounter />}

          {activeTab === 'bookmarks' && (
            <SavedBookmarksView
              bookmarks={bookmarks}
              onRemoveBookmark={handleRemoveBookmark}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-slate-900 bg-slate-950/90 py-8 text-center text-xs text-slate-500 space-y-2">
          <div className="font-arabic text-amber-300/80 text-sm">
            وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ۚ عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ أُنِيبُ
          </div>
          <p className="max-w-md mx-auto text-slate-400">
            "And my success is not but through Allah. Upon Him I have relied, and to Him I return." (Surah Hud 11:88)
          </p>
          <p className="text-[11px] text-slate-600">
            Al-Huda • Authentic Quranic & Sunnah Guidance • Powered by Gemini AI
          </p>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
