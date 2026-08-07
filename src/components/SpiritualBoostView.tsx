import React, { useState } from 'react';
import { Sun, RefreshCw, Volume2, Copy, Bookmark, Check, Sparkles, Download, Share2 } from 'lucide-react';
import { QURAN_VERSES } from '../data/quranData';
import { BookmarkItem, QuranVerse } from '../types';

interface SpiritualBoostViewProps {
  onSaveBookmark: (item: BookmarkItem) => void;
  savedBookmarkIds: string[];
}

export const SpiritualBoostView: React.FC<SpiritualBoostViewProps> = ({
  onSaveBookmark,
  savedBookmarkIds,
}) => {
  const [verseIndex, setVerseIndex] = useState(0);
  const [cardTheme, setCardTheme] = useState<'emerald' | 'midnight' | 'gold' | 'sapphire' | 'velvet'>('emerald');
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentVerse: QuranVerse = QURAN_VERSES[verseIndex];
  const isBookmarked = savedBookmarkIds.includes(currentVerse.id);

  const themeStyles = {
    emerald: 'from-slate-950 via-emerald-950 to-slate-950 border-emerald-500/40 text-emerald-100',
    midnight: 'from-slate-950 via-slate-900 to-indigo-950 border-indigo-500/40 text-indigo-100',
    gold: 'from-slate-950 via-amber-950 to-slate-950 border-amber-500/40 text-amber-100',
    sapphire: 'from-slate-950 via-cyan-950 to-slate-950 border-cyan-500/40 text-cyan-100',
    velvet: 'from-slate-950 via-rose-950 to-slate-950 border-rose-500/40 text-rose-100'
  };

  const handleNextVerse = () => {
    setVerseIndex((prev) => (prev + 1) % QURAN_VERSES.length);
  };

  const handleCopy = () => {
    const text = `${currentVerse.arabic}\n\n"${currentVerse.translation}"\n— Surah ${currentVerse.surahName} (${currentVerse.surahNumber}:${currentVerse.verseNumber})\n\nAl-Huda Quranic Guidance`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlayAudio = () => {
    if (!currentVerse.audioUrl) return;
    setIsPlaying(true);
    const audio = new Audio(currentVerse.audioUrl);
    audio.play();
    audio.onended = () => setIsPlaying(false);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/40 border border-amber-500/30 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Sun className="w-3.5 h-3.5 text-amber-400" />
          <span>Daily Spiritual Boost & Quote Card Studio</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
          Ethereal Quranic Quote Studio
        </h2>

        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          Reflect on divine words, listen to peaceful recitations, customize aesthetic quote cards, and share spiritual wisdom with friends and family.
        </p>
      </div>

      {/* Customizer Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Aesthetic Canvas Theme:</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCardTheme('emerald')}
              className={`w-6 h-6 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-900 border-2 ${
                cardTheme === 'emerald' ? 'border-amber-400 scale-110' : 'border-transparent'
              }`}
              title="Emerald Divine"
            />
            <button
              onClick={() => setCardTheme('midnight')}
              className={`w-6 h-6 rounded-full bg-gradient-to-r from-indigo-600 to-slate-900 border-2 ${
                cardTheme === 'midnight' ? 'border-amber-400 scale-110' : 'border-transparent'
              }`}
              title="Midnight Stars"
            />
            <button
              onClick={() => setCardTheme('gold')}
              className={`w-6 h-6 rounded-full bg-gradient-to-r from-amber-500 to-amber-900 border-2 ${
                cardTheme === 'gold' ? 'border-amber-400 scale-110' : 'border-transparent'
              }`}
              title="Golden Glow"
            />
            <button
              onClick={() => setCardTheme('sapphire')}
              className={`w-6 h-6 rounded-full bg-gradient-to-r from-cyan-600 to-slate-900 border-2 ${
                cardTheme === 'sapphire' ? 'border-amber-400 scale-110' : 'border-transparent'
              }`}
              title="Sapphire Peace"
            />
            <button
              onClick={() => setCardTheme('velvet')}
              className={`w-6 h-6 rounded-full bg-gradient-to-r from-rose-600 to-slate-900 border-2 ${
                cardTheme === 'velvet' ? 'border-amber-400 scale-110' : 'border-transparent'
              }`}
              title="Velvet Sunset"
            />
          </div>
        </div>

        <button
          onClick={handleNextVerse}
          className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 hover:brightness-110 transition-all shadow-lg"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>New Quranic Verse</span>
        </button>
      </div>

      {/* Quote Card Preview Container */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${themeStyles[cardTheme]} border p-8 sm:p-12 shadow-2xl space-y-8 text-center transition-all duration-500`}>
        {/* Subtle Calligraphy Top Watermark */}
        <div className="text-center">
          <span className="font-arabic text-amber-300/80 text-lg sm:text-xl font-semibold">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
          </span>
        </div>

        {/* Main Arabic Verse */}
        <div className="py-4 space-y-3">
          <p className="font-arabic text-2xl sm:text-4xl leading-loose font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            {currentVerse.arabic}
          </p>
          <p className="text-xs text-amber-300/90 tracking-widest font-semibold uppercase">
            Surah {currentVerse.surahName} • Verse {currentVerse.verseNumber}
          </p>
        </div>

        {/* Translation */}
        <div className="max-w-2xl mx-auto space-y-2">
          <p className="text-sm sm:text-base italic leading-relaxed text-slate-100 font-serif">
            "{currentVerse.translation}"
          </p>
          <p className="text-xs text-slate-300/80 pt-2 border-t border-slate-800/60 max-w-xl mx-auto">
            {currentVerse.reflection}
          </p>
        </div>

        {/* Card Footer Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800/80">
          <span className="text-[11px] text-amber-300/80 font-bold uppercase tracking-widest">
            Al-Huda • Quranic Guidance & Healing
          </span>

          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            {currentVerse.audioUrl && (
              <button
                onClick={handlePlayAudio}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isPlaying
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-slate-900/80 text-amber-300 border-slate-800 hover:border-amber-500/40'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                {isPlaying ? 'Playing...' : 'Recite'}
              </button>
            )}

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Quote'}
            </button>

            <button
              onClick={() =>
                onSaveBookmark({
                  id: currentVerse.id,
                  type: 'verse',
                  title: `Surah ${currentVerse.surahName} (${currentVerse.surahNumber}:${currentVerse.verseNumber})`,
                  arabic: currentVerse.arabic,
                  content: currentVerse.translation,
                  reference: `Surah ${currentVerse.surahName} ${currentVerse.surahNumber}:${currentVerse.verseNumber}`,
                  savedAt: new Date().toLocaleDateString(),
                  meta: currentVerse,
                })
              }
              className={`p-1.5 rounded-xl border transition-all ${
                isBookmarked
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
