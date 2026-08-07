import React, { useState } from 'react';
import { Sparkles, Send, BookOpen, Shield, Heart, Bookmark, Share2, Check, RefreshCw, AlertCircle } from 'lucide-react';
import { AIGuidanceResult, BookmarkItem, MoodCategory } from '../types';

interface AIGuidanceViewProps {
  onSaveBookmark: (item: BookmarkItem) => void;
  savedBookmarkIds: string[];
}

export const AIGuidanceView: React.FC<AIGuidanceViewProps> = ({
  onSaveBookmark,
  savedBookmarkIds,
}) => {
  const [userPrompt, setUserPrompt] = useState('');
  const [selectedMood, setSelectedMood] = useState<string>('anxiety');
  const [situationType, setSituationType] = useState<string>('Personal Situation');
  const [loading, setLoading] = useState(false);
  const [guidanceResult, setGuidanceResult] = useState<AIGuidanceResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const samplePrompts = [
    "I made a mistake at work and I'm overwhelmed with anxiety and guilt. How do I turn to Allah?",
    "I feel deeply heartbroken after a conflict with a loved one. What does Quran say about patience and healing?",
    "I'm experiencing sudden wealth / success and want to protect my heart from arrogance and give thanks properly.",
    "I am struggling with a strong temptation/habit and keep falling. How do I break free using Sunnah?",
    "I am physically sick and feeling emotionally drained. What Ruqyah or Prophet's remedies should I practice?"
  ];

  const handleAskAI = async (promptToUse?: string) => {
    const finalPrompt = promptToUse || userPrompt;
    if (!finalPrompt.trim()) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/guidance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: finalPrompt,
          mood: selectedMood,
          situationType,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch guidance from Al-Huda AI');
      }

      setGuidanceResult(data.data);
    } catch (err: any) {
      console.error('AI Guidance error:', err);
      setErrorMessage(err.message || 'Something went wrong while connecting to Al-Huda AI. Please verify network or API setup.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyResult = () => {
    if (!guidanceResult) return;
    const text = `✨ ${guidanceResult.title}\n\n📖 Quranic Verse:\n${guidanceResult.quranicVerse.arabic}\n"${guidanceResult.quranicVerse.translation}" (${guidanceResult.quranicVerse.reference})\n\n💡 Sunnah Teaching:\n${guidanceResult.propheticTeaching.english} (${guidanceResult.propheticTeaching.reference})\n\n🤲 Recommended Dua:\n${guidanceResult.recommendedDua.arabic}\n"${guidanceResult.recommendedDua.translation}"\n\nVia Al-Huda App`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/40 border border-amber-500/30 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span>Ask Al-Huda AI Spiritual Companion</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
          Seek Personal Guidance From Quran & Sunnah
        </h2>

        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          Describe any event, hardship, joy, temptation, or illness in your own words. Al-Huda AI will synthesize relevant Quranic verses, authentic Hadiths, practical Sunnah action steps, and recommended Duas.
        </p>
      </div>

      {/* Input Section */}
      <div className="rounded-3xl bg-slate-900/90 border border-amber-500/20 p-6 space-y-5 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-1.5">
              Current Emotion / Mood:
            </label>
            <select
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="anxiety">Anxiety & Worry</option>
              <option value="sadness">Sorrow & Grief</option>
              <option value="anger">Anger & Anger Management</option>
              <option value="fear">Fear & Uncertainty</option>
              <option value="joy">Joy & Gratitude</option>
              <option value="guilt">Guilt & Remorse (Seeking Tawbah)</option>
              <option value="temptation">Struggling with Temptation / Sin</option>
              <option value="despair">Hopelessness / Despair</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-1.5">
              Situation Category:
            </label>
            <select
              value={situationType}
              onChange={(e) => setSituationType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="Personal Situation">Personal / Internal Dilemma</option>
              <option value="Financial & Provision">Financial Strain / Business</option>
              <option value="Relationships & Conflict">Family or Marital Conflict</option>
              <option value="Sickness & Health">Physical / Mental Health Ailment</option>
              <option value="Sinful Impulse">Overcoming Sinful Urge</option>
              <option value="Milestone & Success">Handling Success & Blessings</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-2">
            Describe what you are going through:
          </label>
          <textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            rows={4}
            placeholder="Type your situation here... e.g. 'I am feeling very lost about a major career decision and afraid I might make a wrong choice that displeases Allah...'"
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 shadow-inner"
          />
        </div>

        {/* Sample Prompt Chips */}
        <div className="space-y-2">
          <p className="text-[11px] font-medium text-slate-400">Or tap a sample question:</p>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setUserPrompt(sample);
                  handleAskAI(sample);
                }}
                className="text-[11px] bg-slate-950 border border-slate-800 hover:border-amber-500/40 text-slate-300 px-3 py-1.5 rounded-xl text-left transition-all line-clamp-1"
              >
                💡 {sample}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={() => handleAskAI()}
          disabled={loading || !userPrompt.trim()}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-700 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:brightness-110 disabled:opacity-50 transition-all"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Synthesizing Quranic & Sunnah Guidance...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Seek Guidance From Quran & Sunnah</span>
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-950/50 border border-rose-800/60 flex items-start gap-3 text-rose-200 text-xs">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">Unable to complete request</strong>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      {/* AI Guidance Result Card */}
      {guidanceResult && (
        <div className="rounded-3xl bg-slate-900 border border-amber-500/40 p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in">
          {/* Top Result Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                Custom Quranic Response
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-amber-200 mt-2">
                {guidanceResult.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyResult}
                className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
                title="Copy Response"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() =>
                  onSaveBookmark({
                    id: `ai-${Date.now()}`,
                    type: 'ai_guidance',
                    title: guidanceResult.title,
                    arabic: guidanceResult.quranicVerse.arabic,
                    content: guidanceResult.quranicVerse.translation,
                    reference: guidanceResult.quranicVerse.reference,
                    savedAt: new Date().toLocaleDateString(),
                    meta: guidanceResult,
                  })
                }
                className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-300 hover:bg-amber-500/30"
                title="Save to Bookmarks"
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>

          {/* Section 1: Primary Quranic Verse */}
          <div className="space-y-3 bg-slate-950/80 p-5 rounded-2xl border border-amber-500/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                Primary Quranic Revelation
              </span>
              <span className="text-xs font-semibold text-amber-300/80">
                {guidanceResult.quranicVerse.reference}
              </span>
            </div>

            <div className="text-right py-2">
              <p className="font-arabic text-2xl sm:text-3xl text-amber-100 leading-loose font-medium">
                {guidanceResult.quranicVerse.arabic}
              </p>
              {guidanceResult.quranicVerse.transliteration && (
                <p className="text-[11px] text-slate-400 italic text-left mt-2">
                  {guidanceResult.quranicVerse.transliteration}
                </p>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              "{guidanceResult.quranicVerse.translation}"
            </p>

            <div className="bg-emerald-950/30 p-3 rounded-xl border border-emerald-900/40 text-xs text-emerald-200">
              <strong className="text-emerald-400 block mb-1">Spiritual Context & Reflection:</strong>
              {guidanceResult.quranicVerse.reflection}
            </div>
          </div>

          {/* Section 2: Prophetic Sunnah Teaching */}
          <div className="space-y-2 bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Teaching from Prophet Muhammad (ﷺ)
              </span>
              <span className="text-[10px] text-slate-400">{guidanceResult.propheticTeaching.reference}</span>
            </div>

            {guidanceResult.propheticTeaching.hadithArabic && (
              <p className="text-right font-arabic text-lg text-amber-200/90 pt-1">
                {guidanceResult.propheticTeaching.hadithArabic}
              </p>
            )}

            <p className="text-xs text-slate-200 italic">
              "{guidanceResult.propheticTeaching.english}"
            </p>

            <p className="text-xs text-slate-400 pt-1 border-t border-slate-800">
              <strong className="text-amber-300">How to Apply:</strong> {guidanceResult.propheticTeaching.explanation}
            </p>
          </div>

          {/* Section 3: Action Plan Steps */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              Sunnah Action Plan (Steps to Take Now)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {guidanceResult.actionPlan.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Recommended Dua */}
          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-amber-400" />
                Recommended Supplication: {guidanceResult.recommendedDua.title}
              </h4>
              {guidanceResult.recommendedDua.whenToRecite && (
                <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900">
                  {guidanceResult.recommendedDua.whenToRecite}
                </span>
              )}
            </div>

            <p className="text-right font-arabic text-xl text-amber-100">
              {guidanceResult.recommendedDua.arabic}
            </p>

            <p className="text-[11px] text-slate-300 italic">
              {guidanceResult.recommendedDua.transliteration}
            </p>

            <p className="text-xs text-slate-200">
              "{guidanceResult.recommendedDua.translation}"
            </p>
          </div>

          {/* Ruqyah or Healing if present */}
          {guidanceResult.ruqyahAndHealing && (
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200">
              <strong className="text-emerald-400 block mb-1">🌿 Prophetic Healing / Ruqyah Advice:</strong>
              {guidanceResult.ruqyahAndHealing}
            </div>
          )}

          {/* Section 5: Words of Reassurance */}
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-center space-y-1">
            <Heart className="w-5 h-5 text-rose-400 mx-auto" />
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "{guidanceResult.wordsOfReassurance}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
