import React, { useState } from 'react';
import { Bookmark, Trash2, Share2, Search, Check, Sparkles, BookOpen } from 'lucide-react';
import { BookmarkItem } from '../types';

interface SavedBookmarksViewProps {
  bookmarks: BookmarkItem[];
  onRemoveBookmark: (id: string) => void;
}

export const SavedBookmarksView: React.FC<SavedBookmarksViewProps> = ({
  bookmarks,
  onRemoveBookmark,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredBookmarks = bookmarks.filter((b) => {
    const matchesType = filterType === 'all' || b.type === filterType;
    const matchesSearch =
      !searchQuery ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleCopy = (b: BookmarkItem) => {
    const text = `${b.arabic ? b.arabic + '\n\n' : ''}"${b.content}"\n${b.reference ? '— ' + b.reference : ''}\n\nVia Al-Huda App`;
    navigator.clipboard.writeText(text);
    setCopiedId(b.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/40 border border-amber-500/30 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Bookmark className="w-3.5 h-3.5 text-amber-400" />
          <span>Your Sacred Saved Wisdom ({bookmarks.length})</span>
        </div>

        <h2 className="text-2xl font-extrabold text-slate-100">
          Saved Verses & Guidance
        </h2>

        <p className="text-slate-300 text-xs max-w-xl mx-auto">
          Access your saved Quranic verses, Duas, Ruqyah healing notes, and AI responses for quick reflection whenever needed.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['all', 'verse', 'dua', 'ruqyah', 'ai_guidance'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                filterType === t
                  ? 'bg-amber-500 text-slate-950 font-extrabold'
                  : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              {t === 'ai_guidance' ? 'AI Answers' : t}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-xs">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved items..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Bookmarks Grid */}
      {filteredBookmarks.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 p-8 space-y-3">
          <Bookmark className="w-10 h-10 text-amber-400/40 mx-auto" />
          <h3 className="text-base font-semibold text-slate-200">No saved bookmarks yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Tap the bookmark icon on any Quranic verse, Dua, or AI guidance response to save it here for quick offline reference.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBookmarks.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-3xl bg-slate-900 border border-amber-500/20 space-y-3 shadow-xl relative group hover:border-amber-400/50 transition-all"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                  {item.type}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(item)}
                    className="p-1 text-slate-400 hover:text-white"
                    title="Copy Text"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => onRemoveBookmark(item.id)}
                    className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h4 className="text-xs font-bold text-amber-300">{item.title}</h4>

              {item.arabic && (
                <p className="text-right font-arabic text-xl text-amber-100 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {item.arabic}
                </p>
              )}

              <p className="text-xs text-slate-200 leading-relaxed">"{item.content}"</p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[10px] text-slate-500">
                <span>{item.reference}</span>
                <span>Saved {item.savedAt}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
