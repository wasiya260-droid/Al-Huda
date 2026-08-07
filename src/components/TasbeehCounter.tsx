import React, { useState, useEffect } from 'react';
import { CircleDot, RefreshCw, Volume2, VolumeX, Award, Sparkles, Check } from 'lucide-react';
import { DhikrTarget } from '../types';

const INITIAL_DHIKR_PRESETS: DhikrTarget[] = [
  {
    id: 'istighfar',
    name: 'Istighfar (Seeking Forgiveness)',
    arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    transliteration: 'Astaghfirullah wa atubu ilayh',
    translation: 'I seek forgiveness from Allah and I repent to Him.',
    count: 0,
    target: 100,
    benefits: 'Opens doors of provision, washes away accumulated sins, and brings peace to the heart.'
  },
  {
    id: 'subhanallah',
    name: 'SubhanAllah (Glorifying Allah)',
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'SubhanAllah',
    translation: 'Glory be to Allah.',
    count: 0,
    target: 33,
    benefits: 'Pours out heavy weight on the scale of good deeds and cleanses the soul.'
  },
  {
    id: 'alhamdulillah',
    name: 'Alhamdulillah (Praising Allah)',
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Alhamdulillah',
    translation: 'Praise be to Allah.',
    count: 0,
    target: 33,
    benefits: 'Fills the scale between the heavens and the earth with light.'
  },
  {
    id: 'allahuakbar',
    name: 'Allahu Akbar (Magnifying Allah)',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    translation: 'Allah is the Greatest.',
    count: 0,
    target: 34,
    benefits: 'Affirms that no worldly hardship or difficulty is larger than Allah.'
  },
  {
    id: 'salawat',
    name: 'Salawat on Prophet Muhammad (ﷺ)',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ',
    transliteration: 'Allahumma salli \'ala Muhammadin wa ali Muhammad',
    translation: 'O Allah, send peace and blessings upon Muhammad and the family of Muhammad.',
    reference: 'Sahih Muslim',
    count: 0,
    target: 100,
    benefits: 'For every 1 Salawat you send upon the Prophet (ﷺ), Allah sends 10 blessings upon you.'
  }
];

export const TasbeehCounter: React.FC = () => {
  const [dhikrList, setDhikrList] = useState<DhikrTarget[]>(() => {
    const saved = localStorage.getItem('al_huda_tasbeeh_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_DHIKR_PRESETS;
      }
    }
    return INITIAL_DHIKR_PRESETS;
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrateEnabled, setVibrateEnabled] = useState(true);

  const activeDhikr = dhikrList[activeIndex] || dhikrList[0];

  useEffect(() => {
    localStorage.setItem('al_huda_tasbeeh_data', JSON.stringify(dhikrList));
  }, [dhikrList]);

  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
      // Audio context fallbacks
    }
  };

  const handleIncrement = () => {
    if (vibrateEnabled && navigator.vibrate) {
      navigator.vibrate(20);
    }
    playClickSound();

    setDhikrList((prev) => {
      const updated = [...prev];
      const current = updated[activeIndex];
      updated[activeIndex] = {
        ...current,
        count: current.count + 1,
      };
      return updated;
    });
  };

  const handleResetCurrent = () => {
    setDhikrList((prev) => {
      const updated = [...prev];
      updated[activeIndex] = {
        ...updated[activeIndex],
        count: 0,
      };
      return updated;
    });
  };

  const isCompleted = activeDhikr.count >= activeDhikr.target;
  const progressPercent = Math.min(100, Math.round((activeDhikr.count / activeDhikr.target) * 100));

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-amber-950/40 border border-amber-500/30 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <CircleDot className="w-3.5 h-3.5 text-emerald-400" />
          <span>Digital Dhikr & Istighfar Tasbeeh</span>
        </div>

        <h2 className="text-2xl font-extrabold text-slate-100">
          Remembrance of Allah (Dhikr)
        </h2>

        <p className="text-slate-300 text-xs max-w-xl mx-auto">
          "Unquestionably, by the remembrance of Allah do hearts find rest." (Surah Ar-Ra'd 13:28)
        </p>
      </div>

      {/* Preset Dhikr Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {dhikrList.map((d, idx) => (
          <button
            key={d.id}
            onClick={() => setActiveIndex(idx)}
            className={`p-3 rounded-2xl border text-left transition-all ${
              activeIndex === idx
                ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-lg'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-amber-500/30'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold truncate">{d.name}</span>
              <span className="text-[10px] bg-slate-950 px-1.5 py-0.5 rounded text-amber-300 font-mono">
                {d.count}/{d.target}
              </span>
            </div>
            <p className="font-arabic text-sm text-right text-amber-100/90 truncate">{d.arabic}</p>
          </button>
        ))}
      </div>

      {/* Main Tasbeeh Counter UI */}
      <div className="rounded-3xl bg-slate-900 border border-amber-500/30 p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
        {isCompleted && (
          <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-md z-20 flex flex-col items-center justify-center p-6 space-y-4 animate-fade-in">
            <Award className="w-12 h-12 text-amber-400 animate-bounce" />
            <h3 className="text-xl font-bold text-amber-200">
              Target Completed! MashaAllah 🎉
            </h3>
            <p className="text-xs text-slate-200 max-w-md">
              You completed {activeDhikr.target} recitations of {activeDhikr.name}. May Allah accept your remembrance and shower His peace upon your heart.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleResetCurrent}
                className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg hover:brightness-110"
              >
                Reset & Repeat
              </button>
              <button
                onClick={() => setActiveIndex((activeIndex + 1) % dhikrList.length)}
                className="px-5 py-2.5 bg-slate-900 border border-slate-700 text-amber-300 font-semibold text-xs rounded-xl"
              >
                Next Dhikr
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-amber-300">{activeDhikr.name}</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
            <button
              onClick={handleResetCurrent}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs flex items-center gap-1"
              title="Reset Count"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Arabic Display */}
        <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-2">
          <p className="font-arabic text-3xl sm:text-4xl text-amber-100 leading-relaxed font-medium">
            {activeDhikr.arabic}
          </p>
          <p className="text-xs text-amber-300/80 italic">{activeDhikr.transliteration}</p>
          <p className="text-xs text-slate-300">"{activeDhikr.translation}"</p>
        </div>

        {/* Big Counter Button */}
        <div className="py-4 space-y-3">
          <button
            onClick={handleIncrement}
            className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-emerald-800 p-1 shadow-[0_0_40px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 transition-all mx-auto flex items-center justify-center cursor-pointer"
          >
            <div className="w-full h-full bg-slate-950 rounded-full flex flex-col items-center justify-center p-4">
              <span className="text-4xl sm:text-5xl font-extrabold text-amber-200 font-mono tracking-wider">
                {activeDhikr.count}
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
                Target: {activeDhikr.target}
              </span>
            </div>
          </button>
          <p className="text-[11px] text-slate-400">Tap anywhere on the circle to count</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>Progress: {progressPercent}%</span>
            <span>{activeDhikr.count} / {activeDhikr.target}</span>
          </div>
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Benefits Box */}
        <div className="bg-emerald-950/20 p-3.5 rounded-xl border border-emerald-900/40 text-xs text-emerald-300 text-left">
          <strong className="text-emerald-400 block mb-0.5">Spiritual Virtues:</strong>
          {activeDhikr.benefits}
        </div>
      </div>
    </div>
  );
};
