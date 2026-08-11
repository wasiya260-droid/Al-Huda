import React, { useState, useEffect } from 'react';
import { BookOpen, Volume2, CheckCircle2, Sparkles, Award, Sun, Moon, Calendar } from 'lucide-react';
import { DAILY_RECITATIONS } from '../data/recitationData';
import { QuranStandClipart, LanternClipart } from './IslamicCliparts';

export const DailyRecitationView: React.FC = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('al_huda_completed_recitations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.date === new Date().toLocaleDateString()) {
          return parsed.ids || [];
        }
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      'al_huda_completed_recitations',
      JSON.stringify({ date: new Date().toLocaleDateString(), ids: completedIds })
    );
  }, [completedIds]);

  const toggleComplete = (id: string) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePlayAudio = (url?: string, id?: string) => {
    if (!url || !id) return;
    if (playingId === id) {
      setPlayingId(null);
      return;
    }
    const audio = new Audio(url);
    audio.play();
    setPlayingId(id);
    audio.onended = () => setPlayingId(null);
  };

  const completionRate = Math.round((completedIds.length / DAILY_RECITATIONS.length) * 100);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-amber-950/60 border border-emerald-500/40 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-center gap-3">
          <QuranStandClipart className="w-12 h-12" />
          <LanternClipart className="w-10 h-10 animate-pulse" />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
          <span>Daily Quranic Recitation & Virtuous Surahs</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
          Daily Quran Recitation Planner
        </h2>

        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          Prophet Muhammad (ﷺ) taught that specific Surahs possess immense intercession, light, and protection when recited daily. Maintain a steady habit of daily recitation.
        </p>

        {/* Daily Completion Meter */}
        <div className="pt-2 max-w-md mx-auto space-y-1">
          <div className="flex justify-between text-xs text-slate-300 font-bold">
            <span>Today's Recitation Goal: {completedIds.length} / {DAILY_RECITATIONS.length} Surahs</span>
            <span className="text-emerald-400 font-mono">{completionRate}% Completed</span>
          </div>
          <div className="w-full h-2.5 bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 transition-all duration-300"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Surahs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DAILY_RECITATIONS.map((item) => {
          const isDone = completedIds.includes(item.id);
          const isPlaying = playingId === item.id;

          return (
            <div
              key={item.id}
              className={`rounded-3xl p-6 space-y-4 border transition-all shadow-xl relative overflow-hidden ${
                isDone
                  ? 'bg-slate-900/90 border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                  : 'bg-slate-900/70 border-slate-800 hover:border-amber-500/30'
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-amber-200">{item.surahName}</h3>
                  <span className="text-xs text-slate-400">
                    Surah {item.surahNumber} • {item.versesCount} Verses
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {item.audioUrl && (
                    <button
                      onClick={() => handlePlayAudio(item.audioUrl, item.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                        isPlaying
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-950 text-emerald-400 border-slate-800 hover:border-emerald-500/40'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isPlaying ? 'Playing' : 'Listen'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => toggleComplete(item.id)}
                    className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                      isDone
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                    title={isDone ? 'Mark Incomplete' : 'Mark Completed Today'}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Arabic Key Verse */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-right">
                <p className="font-arabic text-xl text-amber-100 leading-loose">
                  {item.keyVerseArabic}
                </p>
                <p className="text-[11px] text-slate-300 text-left italic">
                  "{item.keyVerseTranslation}" — <span className="text-amber-300 font-semibold">{item.keyVerseRef}</span>
                </p>
              </div>

              {/* Virtue & Best Time */}
              <div className="space-y-2 text-xs">
                <div className="bg-emerald-950/30 p-3 rounded-xl border border-emerald-900/40 text-emerald-200">
                  <strong className="text-emerald-400 block mb-0.5">Prophetic Virtue:</strong>
                  {item.virtue}
                </div>

                <div className="flex items-center gap-2 text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span><strong>Best Time to Recite:</strong> {item.bestTime}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
