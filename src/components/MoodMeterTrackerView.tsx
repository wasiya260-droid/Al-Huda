import React, { useState, useEffect } from 'react';
import { Activity, Heart, Sparkles, RefreshCw, Calendar, CheckCircle2, TrendingUp, BookOpen, Brain, Sun, ShieldCheck } from 'lucide-react';
import { MoodLogEntry, MoodAnalyticsResult } from '../types';
import { LotusClipart, OliveBranchClipart } from './IslamicCliparts';

export const MoodMeterTrackerView: React.FC = () => {
  const [moodLevel, setMoodLevel] = useState<number>(7);
  const [moodLabel, setMoodLabel] = useState<'Sakinah (Peaceful)' | 'Shukr (Grateful)' | 'Anxiety (Khawf)' | 'Grief (Huzn)' | 'Remorse (Nadam)' | 'Struggling (Jihad al-Nafs)'>('Sakinah (Peaceful)');
  const [energyLevel, setEnergyLevel] = useState<number>(4);
  const [prayerCount, setPrayerCount] = useState<number>(5);
  const [quranMinutes, setQuranMinutes] = useState<number>(15);
  const [dhikrDone, setDhikrDone] = useState<boolean>(true);
  const [journalNote, setJournalNote] = useState<string>('');

  const [logs, setLogs] = useState<MoodLogEntry[]>(() => {
    const saved = localStorage.getItem('al_huda_mood_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 'sample-1',
        timestamp: new Date().toISOString(),
        date: new Date(Date.now() - 86400000).toLocaleDateString(),
        moodLevel: 8,
        moodLabel: 'Shukr (Grateful)',
        energyLevel: 4,
        prayerCount: 5,
        quranReadMinutes: 20,
        dhikrDone: true,
        journalNote: 'Felt deep peace during Fajr prayer today.'
      },
      {
        id: 'sample-2',
        timestamp: new Date().toISOString(),
        date: new Date(Date.now() - 172800000).toLocaleDateString(),
        moodLevel: 5,
        moodLabel: 'Anxiety (Khawf)',
        energyLevel: 3,
        prayerCount: 4,
        quranReadMinutes: 10,
        dhikrDone: false,
        journalNote: 'Felt anxious about work, turned to Istighfar before sleep.'
      }
    ];
  });

  const [analytics, setAnalytics] = useState<MoodAnalyticsResult | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  useEffect(() => {
    localStorage.setItem('al_huda_mood_logs', JSON.stringify(logs));
  }, [logs]);

  const handleSaveLog = () => {
    const newEntry: MoodLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
      moodLevel,
      moodLabel,
      energyLevel,
      prayerCount,
      quranReadMinutes: quranMinutes,
      dhikrDone,
      journalNote,
    };

    setLogs([newEntry, ...logs]);
    setJournalNote('');
  };

  const handleAnalyzeTrends = async () => {
    if (logs.length === 0) return;
    setLoadingAnalytics(true);

    try {
      const response = await fetch('/api/mood-analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logs: logs.slice(0, 10) }),
      });

      const data = await response.json();
      if (data.success) {
        setAnalytics(data.data);
      }
    } catch (err) {
      console.error('Failed to run mood analytics:', err);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const getMoodColor = (level: number) => {
    if (level >= 8) return 'from-emerald-500 to-teal-400';
    if (level >= 5) return 'from-amber-500 to-yellow-400';
    return 'from-rose-500 to-amber-600';
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-950/60 via-slate-900 to-emerald-950/60 border border-teal-500/40 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-center gap-3">
          <LotusClipart className="w-12 h-12" />
          <OliveBranchClipart className="w-12 h-12 text-teal-400" />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-200 text-xs font-bold">
          <Activity className="w-3.5 h-3.5 text-teal-400" />
          <span>Spiritual Mood-o-Meter & Mental Health Tracker</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
          Islamic Heart State & Emotional Tracker
        </h2>

        <p className="text-slate-200 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          In Islamic spirituality (Ilm al-Nafs), self-inventory (Muhasabah) is key to inner tranquility (Sakinah). Track your spiritual heart state without harsh judgment, monitor prayer consistency, and receive AI analytics.
        </p>
      </div>

      {/* Mood-o-Meter Input Card */}
      <div className="rounded-3xl bg-slate-900 border border-teal-500/30 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-teal-200 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400" />
            Today's Spiritual & Emotional Check-In
          </h3>
          <span className="text-xs text-slate-400 font-mono">{new Date().toLocaleDateString()}</span>
        </div>

        {/* Interactive Gauge Slider */}
        <div className="space-y-3 text-center bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span>Severe Distress / Guilt</span>
            <span className="text-amber-300 font-mono text-base">Score: {moodLevel} / 10</span>
            <span>Deep Sakinah & Shukr</span>
          </div>

          <input
            type="range"
            min={1}
            max={10}
            value={moodLevel}
            onChange={(e) => setMoodLevel(Number(e.target.value))}
            className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
          />

          <div className="pt-2">
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r ${getMoodColor(moodLevel)} shadow-md`}>
              State: {moodLabel}
            </span>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Primary Spiritual Heart State:
            </label>
            <select
              value={moodLabel}
              onChange={(e: any) => setMoodLabel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
            >
              <option value="Sakinah (Peaceful)">Sakinah (Tranquility & Peace)</option>
              <option value="Shukr (Grateful)">Shukr (Overwhelmed with Gratitude)</option>
              <option value="Anxiety (Khawf)">Anxiety / Fear (Khawf & Worry)</option>
              <option value="Grief (Huzn)">Grief / Sadness (Huzn)</option>
              <option value="Remorse (Nadam)">Remorse / Guilt (Nadam)</option>
              <option value="Struggling (Jihad al-Nafs)">Struggling with Temptation / Sin</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Energy & Vitality Level (1 to 5):
            </label>
            <select
              value={energyLevel}
              onChange={(e) => setEnergyLevel(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
            >
              <option value={5}>⚡⚡⚡⚡⚡ 5 - High Vitality & Vigor</option>
              <option value={4}>⚡⚡⚡⚡ 4 - Good Steady Energy</option>
              <option value={3}>⚡⚡⚡ 3 - Moderate Energy</option>
              <option value={2}>⚡⚡ 2 - Tired / Drained</option>
              <option value={1}>⚡ 1 - Exhausted / Burnout</option>
            </select>
          </div>
        </div>

        {/* Spiritual Habits Tracker */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-amber-300 block uppercase tracking-wider">
            Today's Spiritual Foundation:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] text-slate-300 block mb-1">Fard Prayers Completed:</label>
              <select
                value={prayerCount}
                onChange={(e) => setPrayerCount(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200"
              >
                <option value={5}>5 / 5 (All Prayers on time)</option>
                <option value={4}>4 / 5 Prayers</option>
                <option value={3}>3 / 5 Prayers</option>
                <option value={2}>2 / 5 Prayers</option>
                <option value={1}>1 / 5 Prayer</option>
                <option value={0}>0 Prayers</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-slate-300 block mb-1">Quran Recitation (Mins):</label>
              <input
                type="number"
                value={quranMinutes}
                onChange={(e) => setQuranMinutes(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200"
              />
            </div>

            <div className="flex items-center pt-4">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={dhikrDone}
                  onChange={(e) => setDhikrDone(e.target.checked)}
                  className="w-4 h-4 rounded accent-teal-400"
                />
                <span>Morning / Evening Adhkar Done</span>
              </label>
            </div>
          </div>
        </div>

        {/* Confidential Journal Note */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">
            Personal Reflection Note (Optional):
          </label>
          <textarea
            value={journalNote}
            onChange={(e) => setJournalNote(e.target.value)}
            rows={2}
            placeholder="How did your heart feel today? What triggered peace or anxiety?"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
          />
        </div>

        <button
          onClick={handleSaveLog}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-teal-500 via-emerald-600 to-amber-600 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Save Today's Spiritual Check-In</span>
        </button>
      </div>

      {/* Analytics & History Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-teal-200 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-400" />
            Spiritual Log History ({logs.length} Entries)
          </h3>

          <button
            onClick={handleAnalyzeTrends}
            disabled={loadingAnalytics || logs.length === 0}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md hover:brightness-110 disabled:opacity-50"
          >
            {loadingAnalytics ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Brain className="w-3.5 h-3.5" />}
            <span>AI Heart State Analysis</span>
          </button>
        </div>

        {/* AI Analytics Output Card */}
        {analytics && (
          <div className="p-6 rounded-3xl bg-slate-900 border border-amber-500/40 space-y-4 shadow-2xl animate-fade-in">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h4 className="text-sm font-bold text-amber-300">
                AI Spiritual Mental Health Diagnosis
              </h4>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed">
              <strong>Heart State:</strong> {analytics.spiritualHeartDiagnosis}
            </p>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
              "{analytics.overallAssessment}"
            </p>

            <div className="space-y-1">
              <strong className="text-xs font-bold text-emerald-400 block">Recommended Daily Habits for Equilibrium:</strong>
              <ul className="space-y-1 text-xs text-slate-300">
                {analytics.recommendedRoutine.map((r, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-950/20 p-3 rounded-xl border border-amber-900/30 text-xs text-amber-300 italic text-center">
              "{analytics.encouragementQuote}"
            </div>
          </div>
        )}

        {/* Past Logs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {logs.map((log) => (
            <div key={log.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400">{log.date}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-slate-950 bg-gradient-to-r ${getMoodColor(log.moodLevel)}`}>
                  Score: {log.moodLevel}/10 • {log.moodLabel.split(' ')[0]}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-300 bg-slate-950 p-2 rounded-xl border border-slate-800/60">
                <span>Prayers: {log.prayerCount}/5</span>
                <span>Quran: {log.quranReadMinutes}m</span>
                <span>Adhkar: {log.dhikrDone ? 'Done ✓' : 'Missed'}</span>
              </div>

              {log.journalNote && (
                <p className="text-xs text-slate-300 italic pt-1 border-t border-slate-800">
                  "{log.journalNote}"
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
