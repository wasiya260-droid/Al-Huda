import React, { useState } from 'react';
import { ShieldAlert, RefreshCw, CheckCircle2, Heart, Sparkles, BookOpen, Flame, ArrowRight, ShieldCheck } from 'lucide-react';
import { AUTHENTIC_DUAS } from '../data/duasData';

export const SinToTawbahView: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const sayyidulIstighfar = AUTHENTIC_DUAS.find((d) => d.id === 'dua-sayyidul-istighfar');

  const tawbahSteps = [
    {
      title: "1. Stop the Sin Immediately (Al-Iqla')",
      description: "Sever the immediate connection or environment leading to the sin. Block the triggers, walk away from the place, close the screen, or change your position.",
      quranRef: "Surah Al-A'raf 7:201 - 'Indeed, those who fear Allah - when an impulse touches them from Satan, they remember Allah and at once they have insight.'",
      practicalTip: "If temptation strikes on a device, put it in another room. If anger strikes, make cold Wudu immediately."
    },
    {
      title: "2. Feel Genuine Remorse in Your Heart (An-Nadam)",
      description: "Prophet Muhammad (ﷺ) taught: 'An-Nadamu Tawbah' (Regret itself is repentance). Feel sorrow not out of shame before people, but out of awe before Allah's majesty.",
      quranRef: "Surah At-Tahrim 66:8 - 'O you who have believed, repent to Allah with sincere repentance (Tawbatun Nasuha).'",
      practicalTip: "A single genuine tear shed in secret out of regret for Allah's sake can extinguish oceans of fire."
    },
    {
      title: "3. Make a Firm Resolve Never to Return (Al-'Azm)",
      description: "Formulate a concrete intention in your heart that you will strive with all your might never to repeat this mistake, placing your trust in Allah's aid.",
      quranRef: "Surah Al-Baqarah 2:222 - 'Indeed, Allah loves those who are constantly repentant and loves those who purify themselves.'",
      practicalTip: "Replace the bad habit with an immediate good deed (e.g. give charity or pray 2 Rakat), for good deeds erase bad ones."
    },
    {
      title: "4. Restore Rights If Others Were Harmed (Radd al-Mazalim)",
      description: "If the sin involved breaking someone's rights (e.g., backbiting, stealing, oppression, financial harm), seek their forgiveness or restore their property.",
      quranRef: "Hadith Sahih al-Bukhari - 'Whoever has wronged his brother... let him ask his forgiveness today before there is no Dinar nor Dirham.'",
      practicalTip: "If you backbit someone and cannot ask them directly without creating greater harm, make abundant sincere Dua for them in secret."
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-amber-950/40 border border-amber-500/30 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          <span>Turning Back to Allah from Sin & Temptation</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
          The Path of Sincere Repentance (Tawbatun Nasuh)
        </h2>

        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          No matter how many times you fall, the door of Allah's forgiveness remains wide open until your last breath. Learn how Prophet Muhammad (ﷺ) instructed us to overcome desires and turn sins into good deeds.
        </p>
      </div>

      {/* Hope Verse Highlight */}
      <div className="rounded-3xl bg-slate-900/90 border border-amber-500/30 p-6 space-y-4 shadow-xl text-center">
        <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          Surah Az-Zumar (39:53) - The Greatest Verse of Hope
        </span>

        <p className="font-arabic text-2xl sm:text-3xl text-amber-200 leading-loose">
          قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا
        </p>

        <p className="text-xs sm:text-sm text-slate-200 italic max-w-2xl mx-auto">
          "Say: 'O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful.'"
        </p>
      </div>

      {/* 4 Conditions of Sincere Repentance Interactive Guide */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-amber-200 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          The 4 Pillars of Sincere Repentance in Islam
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tawbahSteps.map((step, idx) => (
            <div
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                activeStep === idx
                  ? 'bg-slate-900 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-100">{step.title}</h4>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-3">{step.description}</p>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-[11px] text-amber-300/90 italic">
                📖 {step.quranRef}
              </div>

              <div className="mt-2 text-[11px] text-emerald-400 font-medium">
                💡 <span className="underline">Sunnah Tip:</span> {step.practicalTip}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to Pray Salat al-Tawbah */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-emerald-500/30 space-y-4 shadow-xl">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-emerald-200">
            How to Perform Salat al-Tawbah (The Prayer of Repentance)
          </h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The Messenger of Allah (ﷺ) said: "There is no servant who commits a sin, then purifies himself well (makes Wudu), stands up and prays two Rakat, then asks Allah for forgiveness, except that Allah forgives him." (Sunan Abi Dawud 1521).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
            <strong className="text-amber-400 block">Step 1: Perform Wudu</strong>
            <span>Make thorough, deliberate Wudu with the intention to wash away sins.</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
            <strong className="text-amber-400 block">Step 2: Pray 2 Rakat</strong>
            <span>Pray two voluntary units (Rakat) in quiet focus without distractions.</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
            <strong className="text-amber-400 block">Step 3: Ask Forgiveness</strong>
            <span>In Sujood or after Salam, pour out your heart to Allah and recite Istighfar.</span>
          </div>
        </div>
      </div>

      {/* Sayyidul Istighfar Reader */}
      {sayyidulIstighfar && (
        <div className="p-6 rounded-3xl bg-slate-950 border border-amber-500/40 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Sayyidul Istighfar (The Master Supplication for Repentance)
            </h3>
            <span className="text-[10px] text-slate-400">Sahih Al-Bukhari 6306</span>
          </div>

          <p className="text-right font-arabic text-xl sm:text-2xl text-amber-100 leading-loose">
            {sayyidulIstighfar.arabic}
          </p>

          <p className="text-xs text-slate-300 italic">
            {sayyidulIstighfar.transliteration}
          </p>

          <p className="text-xs text-slate-200">
            "{sayyidulIstighfar.translation}"
          </p>

          <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-900/50 text-[11px] text-emerald-300">
            <strong>Prophetic Promise:</strong> "Whoever recites this during the day with firm faith and dies before evening will be among the people of Jannah..."
          </div>
        </div>
      )}
    </div>
  );
};
