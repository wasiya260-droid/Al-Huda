import React, { useState } from 'react';
import { Activity, Shield, Droplet, Sparkles, Volume2, CheckCircle2, Bookmark, Heart } from 'lucide-react';
import { RUQYAH_VERSES, PROPHETIC_REMEDIES } from '../data/ruqyahData';
import { AUTHENTIC_DUAS } from '../data/duasData';
import { BookmarkItem } from '../types';

interface RuqyahHealingViewProps {
  onSaveBookmark: (item: BookmarkItem) => void;
  savedBookmarkIds: string[];
}

export const RuqyahHealingView: React.FC<RuqyahHealingViewProps> = ({
  onSaveBookmark,
  savedBookmarkIds,
}) => {
  const [activeTab, setActiveTab] = useState<'shifa' | 'tibb' | 'duas' | 'guide'>('shifa');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const healingDuas = AUTHENTIC_DUAS.filter((d) => d.category === 'healing');

  const playAudio = (url?: string, id?: string) => {
    if (!url || !id) return;
    if (playingAudioId === id) {
      setPlayingAudioId(null);
      return;
    }
    const audio = new Audio(url);
    audio.play();
    setPlayingAudioId(id);
    audio.onended = () => setPlayingAudioId(null);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-teal-950/50 border border-emerald-500/30 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span>Quranic Ruqyah & Prophetic Medicine (Tibb an-Nabawi)</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
          Divine Healing For Body, Mind & Soul
        </h2>

        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          The Holy Quran is explicitly revealed as "Shifa wa Rahmah" (Healing and Mercy). Access authentic Ruqyah verses, remedies of Prophet Muhammad (ﷺ), and step-by-step guidelines for self-treatment.
        </p>
      </div>

      {/* Internal Navigation Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('shifa')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'shifa'
              ? 'bg-emerald-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          📖 Verses of Healing (Ayat ash-Shifa)
        </button>

        <button
          onClick={() => setActiveTab('tibb')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'tibb'
              ? 'bg-emerald-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          🌿 Prophetic Remedies (Tibb Nabawi)
        </button>

        <button
          onClick={() => setActiveTab('duas')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'duas'
              ? 'bg-emerald-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          🤲 Physical Pain & Health Duas
        </button>

        <button
          onClick={() => setActiveTab('guide')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'guide'
              ? 'bg-emerald-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          ✨ Step-by-Step Ruqyah Guide
        </button>
      </div>

      {/* Tab 1: Verses of Healing */}
      {activeTab === 'shifa' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RUQYAH_VERSES.map((verse) => {
              const isBookmarked = savedBookmarkIds.includes(verse.id);
              return (
                <div
                  key={verse.id}
                  className="rounded-3xl bg-slate-900/90 border border-emerald-500/30 p-6 space-y-4 shadow-xl hover:border-emerald-400 transition-all"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-xs font-bold text-emerald-300">{verse.title}</h3>
                    <div className="flex items-center gap-2">
                      {verse.audioUrl && (
                        <button
                          onClick={() => playAudio(verse.audioUrl, verse.id)}
                          className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 ${
                            playingAudioId === verse.id
                              ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                              : 'bg-slate-800 text-emerald-400 border-slate-700'
                          }`}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          {playingAudioId === verse.id ? 'Playing' : 'Listen'}
                        </button>
                      )}

                      <button
                        onClick={() =>
                          onSaveBookmark({
                            id: verse.id,
                            type: 'ruqyah',
                            title: verse.title,
                            arabic: verse.arabic,
                            content: verse.translation,
                            reference: verse.reference,
                            savedAt: new Date().toLocaleDateString(),
                            meta: verse,
                          })
                        }
                        className={`p-1.5 rounded-lg border transition-all ${
                          isBookmarked
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                    <p className="font-arabic text-xl sm:text-2xl text-emerald-100 leading-loose">
                      {verse.arabic}
                    </p>
                    <p className="text-[11px] text-slate-400 italic text-left mt-2">
                      {verse.transliteration}
                    </p>
                  </div>

                  <p className="text-xs text-slate-200">"{verse.translation}"</p>

                  <div className="bg-emerald-950/30 p-3 rounded-xl border border-emerald-900/40 text-[11px] text-emerald-200 space-y-1">
                    <strong className="text-emerald-400 block">Benefits & Healing Purpose:</strong>
                    <p>{verse.benefits}</p>
                  </div>

                  <div className="text-[10px] text-amber-300 bg-amber-950/20 p-2 rounded-lg border border-amber-900/30">
                    💡 <strong>How to Use:</strong> {verse.methodOfUse}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Prophetic Remedies */}
      {activeTab === 'tibb' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROPHETIC_REMEDIES.map((remedy) => (
            <div
              key={remedy.id}
              className="rounded-3xl bg-slate-900 border border-amber-500/20 p-6 space-y-4 shadow-xl hover:border-amber-400/50 transition-all"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-amber-300">{remedy.name}</h3>
                  <span className="text-[11px] font-arabic text-amber-200/80">{remedy.arabicName}</span>
                </div>
                <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold">
                  Prophetic Sunnah
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{remedy.description}</p>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-amber-300/90 italic">
                📖 {remedy.hadithReference}
              </div>

              <div className="space-y-1">
                <strong className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Healing Properties:
                </strong>
                <ul className="space-y-1 text-xs text-slate-300">
                  {remedy.healingProperties.map((prop, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span>{prop}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-900/40 text-[11px] text-emerald-200">
                <strong>How to Apply:</strong> {remedy.howToApply}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Duas for Health */}
      {activeTab === 'duas' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {healingDuas.map((dua) => (
              <div key={dua.id} className="p-6 rounded-3xl bg-slate-900 border border-emerald-500/30 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-bold text-emerald-300">{dua.title}</h3>
                  <span className="text-[10px] text-slate-400">{dua.reference}</span>
                </div>

                <p className="text-right font-arabic text-xl text-amber-100">{dua.arabic}</p>

                <p className="text-[11px] text-slate-300 italic">{dua.transliteration}</p>

                <p className="text-xs text-slate-200">"{dua.translation}"</p>

                <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-900/40 text-[11px] text-emerald-300">
                  💡 {dua.whenToRecite}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Step-by-Step Ruqyah Guide */}
      {activeTab === 'guide' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-emerald-500/30 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-emerald-200 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              How to Perform Authentic Ruqyah on Yourself or Loved Ones
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Ruqyah is the spiritual recitation of Quranic verses and authentic prophetic supplications with firm belief that Allah alone is Al-Shafi (The Healer).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <strong className="text-xs font-bold text-amber-300 block">Step 1: Purity & Intention (Niyyah)</strong>
              <p className="text-xs text-slate-300 leading-relaxed">
                Make fresh Wudu. Face the Qiblah if possible. Form a sincere intention in your heart seeking Allah's healing alone, knowing that medicine and verses are means, but cure comes only from Allah.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <strong className="text-xs font-bold text-amber-300 block">Step 2: Recitation with Blowing (Nafth)</strong>
              <p className="text-xs text-slate-300 leading-relaxed">
                Recite Surah Al-Fatihah, Ayat Al-Kursi, Surah Al-Ikhlas, Al-Falaq, and An-Nas. Cup your palms together, blow lightly into them (a soft breath containing a hint of moisture/saliva), and wipe over your face and body.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <strong className="text-xs font-bold text-amber-300 block">Step 3: Ruqyah Water / Olive Oil</strong>
              <p className="text-xs text-slate-300 leading-relaxed">
                Recite the 6 Healing Verses over a bottle of pure drinking water or organic olive oil. Drink the water throughout the day or massage the oil over painful joint/muscle areas before sleeping.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <strong className="text-xs font-bold text-amber-300 block">Step 4: Steadfastness & Certainty (Yaqin)</strong>
              <p className="text-xs text-slate-300 leading-relaxed">
                Repeat the Ruqyah daily in the morning and evening. Combine spiritual Ruqyah with standard medical care and prescribed treatment as taught in Islam.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
