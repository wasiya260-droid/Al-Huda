import { useState } from 'react';
import { Lock, ShieldCheck, HeartHandshake, Sparkles, RefreshCw, AlertTriangle, ArrowRight, BookOpen, CheckCircle2, Bookmark, Share2, Check } from 'lucide-react';
import { SecretGuidanceResult, BookmarkItem } from '../types';
import { HeartShieldClipart, LotusClipart, LanternClipart } from './IslamicCliparts';

interface SecretTawbahBoxViewProps {
  onSaveBookmark: (item: BookmarkItem) => void;
  savedBookmarkIds: string[];
}

export const SecretTawbahBoxView = ({
  onSaveBookmark,
  savedBookmarkIds,
}: SecretTawbahBoxViewProps) => {
  const [secretText, setSecretText] = useState('');
  const [mistakeCategory, setMistakeCategory] = useState('Private Sin or Habit');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SecretGuidanceResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sampleConfessions = [
    "I promised Allah I would never fall back into a private shameful habit on my phone, but I gave in to temptation. I feel so disgusted and afraid Allah hates me.",
    "I accidentally spoke harsh words and backbit a close friend behind their back in anger. How do I make up for this without causing a huge rift?",
    "I broke a solemn oath I swore by Allah's name. What is the exact Kaffarah (expiation) I must do to be forgiven?",
    "I missed multiple prayers because of negligence and laziness. I want to repent sincerely and make them up properly."
  ];

  const handleSeekGuidance = async (promptToUse?: string) => {
    const textToSubmit = promptToUse || secretText;
    if (!textToSubmit.trim()) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/secret-guidance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secretDescription: textToSubmit,
          mistakeCategory,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch confidential guidance');
      }

      setResult(data.data);
    } catch (err: any) {
      console.error('Secret guidance error:', err);
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Confidentiality Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-rose-950/60 border border-purple-500/40 text-center space-y-4 relative overflow-hidden shadow-2xl">
        <div className="flex items-center justify-center gap-3">
          <HeartShieldClipart className="w-12 h-12" />
          <LotusClipart className="w-10 h-10" />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-200 text-xs font-bold">
          <Lock className="w-3.5 h-3.5 text-purple-300" />
          <span>Sacred & Confidential Sanctuary — You Are Accepted Here</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
          Share Your Burden & Receive Expiation Steps
        </h2>

        <p className="text-slate-200 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          "All of the children of Adam make mistakes, and the best of those who make mistakes are those who repent." (Tirmidhi).
          Allah is <strong className="text-amber-300">As-Satteer</strong> (The Concealer of Sins) and <strong className="text-emerald-300">Al-Ghaffar</strong> (The Constantly Forgiving). Express what burdens your conscience in 100% secrecy and receive practical Kaffarah (expiation) rules, Ruqyah protection, and erasing good deeds.
        </p>

        <div className="flex items-center justify-center gap-2 text-xs text-emerald-300 font-semibold bg-emerald-950/40 py-2 px-4 rounded-2xl border border-emerald-500/30 max-w-lg mx-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Your words are processed privately in volatile memory and never saved or visible to anyone.</span>
        </div>
      </div>

      {/* Input Section */}
      <div className="rounded-3xl bg-slate-900/90 border border-purple-500/20 p-6 space-y-5 shadow-2xl">
        <div>
          <label className="text-xs font-semibold text-purple-300 uppercase tracking-wider block mb-1.5">
            Category of Mistake / Sin:
          </label>
          <select
            value={mistakeCategory}
            onChange={(e) => setMistakeCategory(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-purple-400"
          >
            <option value="Private Sin or Habit">Private Sin / Unlawful Desire / Addiction</option>
            <option value="Broken Oath or Vow">Broken Oath (Yameen) or Promise to Allah</option>
            <option value="Relationship or Marital Hurt">Injustice / Hurt Caused to Spouse or Family</option>
            <option value="Backbiting & Gossip">Backbiting, Slander or False Speech</option>
            <option value="Financial or Property Mistake">Financial Wrongdoing / Unlawful Gain</option>
            <option value="Missed Worship Obligation">Missed Fard Prayers / Fasting</option>
            <option value="Arrogance or Outburst">Anger, Pride, or Outburst</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-2">
            Describe what you did or what burdens your conscience (In your own words):
          </label>
          <textarea
            value={secretText}
            onChange={(e) => setSecretText(e.target.value)}
            rows={4}
            placeholder="Write freely here without fear or judgment... e.g. 'I committed a mistake I deeply regret and I don't know how to face Allah or make up for the damage...'"
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-400 shadow-inner"
          />
        </div>

        {/* Prompts */}
        <div className="space-y-2">
          <p className="text-[11px] font-medium text-slate-400">Or click a sample scenario:</p>
          <div className="flex flex-col gap-1.5">
            {sampleConfessions.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSecretText(sample);
                  handleSeekGuidance(sample);
                }}
                className="text-[11px] bg-slate-950 border border-slate-800 hover:border-purple-500/40 text-slate-300 px-3 py-2 rounded-xl text-left transition-all line-clamp-2"
              >
                🔒 {sample}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => handleSeekGuidance()}
          disabled={loading || !secretText.trim()}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-amber-600 to-emerald-700 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(168,85,247,0.25)] hover:brightness-110 disabled:opacity-50 transition-all"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing Islamic Guidance & Kaffarah Rules...</span>
            </>
          ) : (
            <>
              <HeartHandshake className="w-4 h-4" />
              <span>Seek Confidential Tawbah & Kaffarah Steps</span>
            </>
          )}
        </button>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-950/50 border border-rose-800/60 flex items-start gap-3 text-rose-200 text-xs">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">Error</strong>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="rounded-3xl bg-slate-900 border border-purple-500/40 p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in">
          {/* Top Title Bar */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="px-2.5 py-1 rounded-md bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px] font-bold uppercase tracking-wider">
                Allah's Mercy & Expiation Plan
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-amber-200 mt-2">
                {result.verdictTitle}
              </h3>
            </div>

            <button
              onClick={() =>
                onSaveBookmark({
                  id: `secret-${Date.now()}`,
                  type: 'secret_guidance',
                  title: result.verdictTitle,
                  content: result.reassuranceMessage,
                  reference: 'Confidential Tawbah Guidance',
                  savedAt: new Date().toLocaleDateString(),
                  meta: result,
                })
              }
              className="p-2 rounded-xl bg-purple-500/20 border border-purple-500/50 text-purple-300 hover:bg-purple-500/30"
              title="Save to Private Bookmarks"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          </div>

          {/* Reassurance Message */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-2">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Message of Divine Reassurance & Hope
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
              "{result.reassuranceMessage}"
            </p>
          </div>

          {/* Section 1: How to Make Up For The Mistake (Kaffarah & Action Steps) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              How to Make Up For This Mistake (Kaffarah & Expiation Steps)
            </h4>

            <div className="space-y-2">
              {result.kaffarahAndMakeUpSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Erasing Good Deeds */}
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
            <strong className="text-xs font-bold text-emerald-300 block">
              🌿 Erasing Good Deeds (Sunnah: "Follow a bad deed with a good deed, it erases it")
            </strong>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
              {result.erasingGoodDeeds.map((deed, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-emerald-900/40">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{deed}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Ruqyah Shield Against Relapse */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-3">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Ruqyah Shield Against Relapsing into this Sin: {result.ruqyahShield.title}
            </span>

            <p className="text-right font-arabic text-xl sm:text-2xl text-amber-100 leading-relaxed">
              {result.ruqyahShield.arabic}
            </p>

            {result.ruqyahShield.transliteration && (
              <p className="text-[11px] text-slate-400 italic">
                {result.ruqyahShield.transliteration}
              </p>
            )}

            <p className="text-xs text-slate-200">
              "{result.ruqyahShield.translation}"
            </p>

            <div className="bg-amber-950/30 p-2.5 rounded-xl border border-amber-900/40 text-[11px] text-amber-300">
              💡 <strong>How to Use as Shield:</strong> {result.ruqyahShield.howToUse}
            </div>
          </div>

          {/* Section 4: Special Tawbah Dua */}
          <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-3 text-center">
            <span className="text-xs font-bold text-purple-300 block">
              🤲 Your Personal Supplication for Repentance
            </span>

            <p className="font-arabic text-2xl text-amber-100 leading-loose">
              {result.specialTawbahDua.arabic}
            </p>

            {result.specialTawbahDua.transliteration && (
              <p className="text-xs text-slate-300 italic">
                {result.specialTawbahDua.transliteration}
              </p>
            )}

            <p className="text-xs text-slate-200 max-w-xl mx-auto">
              "{result.specialTawbahDua.translation}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
