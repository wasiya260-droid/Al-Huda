import React, { useState, useMemo } from 'react';
import { 
  MOOD_DEFINITIONS, 
  SITUATION_DEFINITIONS, 
  QURAN_VERSES 
} from '../data/quranData';
import { HADITH_TEACHINGS } from '../data/hadithData';
import { AUTHENTIC_DUAS } from '../data/duasData';
import { MoodCategory, SituationCategory, QuranVerse, BookmarkItem } from '../types';
import { 
  Heart, 
  BookOpen, 
  Volume2, 
  Bookmark, 
  CheckCircle2, 
  Sparkles, 
  Share2, 
  Check, 
  ArrowRight,
  Shield,
  HelpCircle,
  Wind,
  CloudRain,
  Flame,
  Sun,
  Compass,
  RefreshCw,
  Zap
} from 'lucide-react';

interface MoodGuidanceViewProps {
  selectedMood: MoodCategory | null;
  setSelectedMood: (mood: MoodCategory) => void;
  searchQuery: string;
  onSaveBookmark: (item: BookmarkItem) => void;
  savedBookmarkIds: string[];
}

export const MoodGuidanceView: React.FC<MoodGuidanceViewProps> = ({
  selectedMood,
  setSelectedMood,
  searchQuery,
  onSaveBookmark,
  savedBookmarkIds,
}) => {
  const [selectedSituation, setSelectedSituation] = useState<SituationCategory | 'all'>('all');
  const [copiedVerseId, setCopiedVerseId] = useState<string | null>(null);
  const [activeVerseForModal, setActiveVerseForModal] = useState<QuranVerse | null>(null);

  // Filter verses based on mood, situation, search query
  const filteredVerses = useMemo(() => {
    return QURAN_VERSES.filter((verse) => {
      const matchesMood = !selectedMood || verse.moods.includes(selectedMood);
      const matchesSituation = selectedSituation === 'all' || verse.situations.includes(selectedSituation);
      const matchesSearch =
        !searchQuery ||
        verse.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        verse.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
        verse.surahName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        verse.reflection.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesMood && matchesSituation && matchesSearch;
    });
  }, [selectedMood, selectedSituation, searchQuery]);

  // Relevant Hadith
  const relevantHadith = useMemo(() => {
    if (selectedMood === 'guilt' || selectedMood === 'temptation') {
      return HADITH_TEACHINGS.filter(h => h.category === 'repentance');
    }
    if (selectedMood === 'anger' || selectedMood === 'sadness' || selectedMood === 'anxiety') {
      return HADITH_TEACHINGS.filter(h => h.category === 'mood');
    }
    return HADITH_TEACHINGS;
  }, [selectedMood]);

  // Relevant Duas
  const relevantDuas = useMemo(() => {
    if (selectedMood === 'guilt' || selectedMood === 'temptation') {
      return AUTHENTIC_DUAS.filter(d => d.category === 'repentance');
    }
    if (selectedMood === 'anxiety' || selectedMood === 'fear' || selectedMood === 'sadness') {
      return AUTHENTIC_DUAS.filter(d => d.category === 'anxiety');
    }
    if (selectedMood === 'joy') {
      return AUTHENTIC_DUAS.filter(d => d.category === 'gratitude');
    }
    return AUTHENTIC_DUAS;
  }, [selectedMood]);

  const handleCopyVerse = (verse: QuranVerse) => {
    const textToCopy = `${verse.arabic}\n"${verse.translation}"\n- Surah ${verse.surahName} (${verse.surahNumber}:${verse.verseNumber})\nVia Al-Huda App`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedVerseId(verse.id);
    setTimeout(() => setCopiedVerseId(null), 2000);
  };

  const getMoodIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wind': return <Wind className="w-4 h-4" />;
      case 'CloudRain': return <CloudRain className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Shield': return <Shield className="w-4 h-4" />;
      case 'Sun': return <Sun className="w-4 h-4" />;
      case 'Compass': return <Compass className="w-4 h-4" />;
      case 'HelpCircle': return <HelpCircle className="w-4 h-4" />;
      case 'Heart': return <Heart className="w-4 h-4" />;
      case 'RefreshCw': return <RefreshCw className="w-4 h-4" />;
      case 'Zap': return <Zap className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Mood Selector Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-amber-200 flex items-center gap-2">
            <Heart className="w-5 h-5 text-amber-400" />
            1. Select How You Feel or What You're Experiencing
          </h3>
          {selectedMood && (
            <button
              onClick={() => setSelectedMood(null as any)}
              className="text-xs text-amber-400 hover:underline"
            >
              Show All Moods
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {MOOD_DEFINITIONS.map((m) => {
            const isSelected = selectedMood === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMood(m.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-gradient-to-br from-amber-500/20 to-emerald-600/20 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)] scale-[1.02]'
                    : 'bg-slate-900/80 border-slate-800 hover:border-amber-500/30 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={isSelected ? 'text-amber-400' : 'text-slate-400'}>
                    {getMoodIcon(m.icon)}
                  </span>
                  <span className={`text-xs font-bold ${isSelected ? 'text-amber-200' : 'text-slate-200'}`}>
                    {m.label}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-snug">
                  {m.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Situation Filter Tabs */}
      <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-900">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
          Filter by Specific Life Event / Situation:
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedSituation('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedSituation === 'all'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-amber-500/30'
            }`}
          >
            All Situations
          </button>
          {SITUATION_DEFINITIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSituation(s.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedSituation === s.id
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-amber-500/30'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            Quranic Guidance & Ayats ({filteredVerses.length})
          </h3>
          <p className="text-xs text-slate-400">
            Authentic divine revelations regarding {selectedMood ? selectedMood : 'human conditions'}
          </p>
        </div>
      </div>

      {/* Verse List */}
      {filteredVerses.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/40 rounded-3xl border border-slate-800 p-8 space-y-3">
          <Sparkles className="w-8 h-8 text-amber-400/50 mx-auto" />
          <h4 className="text-base font-semibold text-slate-200">No specific verse matches this exact filter</h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try resetting the situation filter or ask our AI Counselor for custom guidance tailored to your scenario.
          </p>
          <button
            onClick={() => {
              setSelectedMood(null as any);
              setSelectedSituation('all');
            }}
            className="px-4 py-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredVerses.map((verse) => {
            const isBookmarked = savedBookmarkIds.includes(verse.id);
            return (
              <div
                key={verse.id}
                className="group relative rounded-3xl bg-slate-900/90 border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 p-6 flex flex-col justify-between space-y-4 shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]"
              >
                <div className="space-y-4">
                  {/* Top Bar: Surah Ref & Action Badges */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                      Surah {verse.surahName} ({verse.surahNumber}:{verse.verseNumber})
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyVerse(verse)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
                        title="Copy Verse"
                      >
                        {copiedVerseId === verse.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() =>
                          onSaveBookmark({
                            id: verse.id,
                            type: 'verse',
                            title: `Surah ${verse.surahName} (${verse.surahNumber}:${verse.verseNumber})`,
                            arabic: verse.arabic,
                            content: verse.translation,
                            reference: `Surah ${verse.surahName} ${verse.surahNumber}:${verse.verseNumber}`,
                            savedAt: new Date().toLocaleDateString(),
                            meta: verse
                          })
                        }
                        className={`p-1.5 rounded-lg border transition-all ${
                          isBookmarked
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                        }`}
                        title={isBookmarked ? 'Saved' : 'Bookmark Verse'}
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  </div>

                  {/* Arabic Verse Display */}
                  <div className="text-right bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                    <p className="font-arabic text-xl sm:text-2xl text-amber-100 leading-loose font-medium">
                      {verse.arabic}
                    </p>
                    <p className="text-[11px] text-slate-400 italic mt-2 text-left">
                      {verse.transliteration}
                    </p>
                  </div>

                  {/* English Translation */}
                  <div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                      "{verse.translation}"
                    </p>
                  </div>

                  {/* Reflection */}
                  <div className="bg-emerald-950/20 p-3 rounded-xl border border-emerald-500/20 text-[11px] text-emerald-200/90 leading-relaxed">
                    <strong className="text-emerald-400 block mb-0.5">Spiritual Reflection:</strong>
                    {verse.reflection}
                  </div>
                </div>

                {/* Bottom Action: Sunnah Reaction Protocol */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {verse.moods.map((m) => (
                      <span key={m} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                        #{m}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveVerseForModal(verse)}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    Sunnah Action Steps →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Relevant Hadith Section */}
      {relevantHadith.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-800">
          <h3 className="text-lg font-bold text-amber-200 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Prophetic Teachings (Sunnah) for this state
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relevantHadith.map((h) => (
              <div key={h.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded">
                  {h.source}
                </span>
                <p className="text-xs text-slate-200 italic">"{h.english}"</p>
                <p className="text-[11px] text-slate-400 border-t border-slate-800 pt-2">
                  <strong className="text-amber-300">Prophetic Wisdom:</strong> {h.lesson}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Relevant Duas Section */}
      {relevantDuas.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-800">
          <h3 className="text-lg font-bold text-amber-200 flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            Recommended Duas from Quran & Sunnah
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relevantDuas.map((d) => (
              <div key={d.id} className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-amber-300">{d.title}</h4>
                  <span className="text-[10px] text-slate-400">{d.reference}</span>
                </div>
                <p className="text-right font-arabic text-lg text-amber-100">{d.arabic}</p>
                <p className="text-[11px] text-slate-300 italic">{d.transliteration}</p>
                <p className="text-xs text-slate-200">"{d.translation}"</p>
                <p className="text-[10px] text-emerald-400 bg-emerald-950/30 p-2 rounded-lg border border-emerald-900/40">
                  💡 {d.whenToRecite}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for Sunnah Action Steps */}
      {activeVerseForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-amber-500/40 max-w-lg w-full rounded-3xl p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-amber-300">
                Sunnah Reaction Guide: Surah {activeVerseForModal.surahName}
              </h3>
              <button
                onClick={() => setActiveVerseForModal(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl text-right">
              <p className="font-arabic text-xl text-amber-200">{activeVerseForModal.arabic}</p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                How Prophet Muhammad (ﷺ) & The Sahabah Reacted:
              </h4>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-start gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200 block">1. Immediate Physical & Spiritual Cleanliness (Wudu)</strong>
                    <p className="text-slate-400 text-[11px]">Water extinguishes spiritual heat and anxiety. Make fresh Wudu with presence of mind.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200 block">2. Turn in Voluntary Prayer (Salat al-Hajah / Tawbah)</strong>
                    <p className="text-slate-400 text-[11px]">Whenever difficulty arose, the Prophet (ﷺ) hastened directly to prayer (Kan-a idha hazabahu amrun salla).</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200 block">3. Recite Istighfar & Specific Dhikr</strong>
                    <p className="text-slate-400 text-[11px]">Abundant Istighfar ("Astaghfirullahal 'Adhim") opens locked provision and dissolves worry.</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveVerseForModal(null)}
              className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:brightness-110"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
