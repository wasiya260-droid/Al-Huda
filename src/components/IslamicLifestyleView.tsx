import React, { useState, useEffect } from 'react';
import { HeartPulse, Sun, Moon, Dumbbell, Brain, Droplets, Check, Sparkles, Apple, ShieldCheck, Flame } from 'lucide-react';
import { SUNNAH_LIFESTYLE_ITEMS } from '../data/sunnahLifestyleData';
import { OliveBranchClipart, LotusClipart } from './IslamicCliparts';

export const IslamicLifestyleView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'nutrition' | 'sleep' | 'fitness' | 'mental' | 'hygiene'>('all');

  const [completedPractices, setCompletedPractices] = useState<string[]>(() => {
    const saved = localStorage.getItem('al_huda_sunnah_lifestyle_done');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.date === new Date().toLocaleDateString()) {
          return parsed.practices || [];
        }
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      'al_huda_sunnah_lifestyle_done',
      JSON.stringify({ date: new Date().toLocaleDateString(), practices: completedPractices })
    );
  }, [completedPractices]);

  const togglePractice = (practiceText: string) => {
    setCompletedPractices((prev) =>
      prev.includes(practiceText) ? prev.filter((p) => p !== practiceText) : [...prev, practiceText]
    );
  };

  const filteredItems = activeCategory === 'all'
    ? SUNNAH_LIFESTYLE_ITEMS
    : SUNNAH_LIFESTYLE_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-amber-950/60 border border-emerald-500/40 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-center gap-3">
          <OliveBranchClipart className="w-12 h-12 text-emerald-400" />
          <LotusClipart className="w-10 h-10" />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-bold">
          <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />
          <span>Healthy & Islamic Way of Living (Sunnah Lifestyle)</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
          Prophetic Health, Nutrition & Wellness Hub
        </h2>

        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          "Your body has a right over you." (Sahih Al-Bukhari).
          Discover how Prophet Muhammad (ﷺ) lived a vibrant, highly disciplined life integrating physical fitness, mindful diet, sleep hygiene, emotional resilience, and daily purification.
        </p>

        <div className="pt-2 text-xs text-amber-300 font-bold bg-amber-500/10 py-2 px-4 rounded-full border border-amber-500/20 inline-block">
          Daily Healthy Practices Completed Today: {completedPractices.length}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {[
          { id: 'all', label: 'All Pillars', icon: Sparkles },
          { id: 'nutrition', label: 'Nutrition & Fasting', icon: Apple },
          { id: 'sleep', label: 'Sleep Hygiene', icon: Moon },
          { id: 'fitness', label: 'Physical Fitness', icon: Dumbbell },
          { id: 'mental', label: 'Stress Resilience', icon: Brain },
          { id: 'hygiene', label: 'Fitrah & Purity', icon: Droplets },
        ].map((tab) => {
          const IconComp = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeCategory === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-lg'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <IconComp className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl bg-slate-900 border border-emerald-500/30 p-6 space-y-4 shadow-xl hover:border-emerald-400 transition-all"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-amber-200">{item.title}</h3>
                <span className="font-arabic text-xs text-amber-300/80">{item.arabicTitle}</span>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                {item.category}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{item.summary}</p>

            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs text-amber-300/90 italic">
              📖 {item.hadithOrQuranRef}
            </div>

            {/* Key Practices List with Checkbox */}
            <div className="space-y-2 pt-1">
              <strong className="text-xs font-bold text-emerald-400 block uppercase tracking-wider">
                Sunnah Key Practices (Tap to check off today):
              </strong>

              <div className="space-y-1.5">
                {item.keyPractices.map((practice, idx) => {
                  const isChecked = completedPractices.includes(practice);
                  return (
                    <button
                      key={idx}
                      onClick={() => togglePractice(practice)}
                      className={`w-full p-2.5 rounded-xl text-xs text-left flex items-start gap-2.5 transition-all border ${
                        isChecked
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                        isChecked ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold' : 'border-slate-700'
                      }`}>
                        {isChecked && '✓'}
                      </span>
                      <span className="leading-relaxed">{practice}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200 space-y-0.5">
              <strong className="text-amber-400 block">🔬 Modern Health & Medical Science Validation:</strong>
              <p className="text-slate-300">{item.modernHealthBenefit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
