export type MoodCategory = 
  | 'anxiety' 
  | 'sadness' 
  | 'anger' 
  | 'fear' 
  | 'joy' 
  | 'despair' 
  | 'confusion' 
  | 'loneliness' 
  | 'guilt' 
  | 'temptation';

export type SituationCategory = 
  | 'hardship'
  | 'finances'
  | 'relationships'
  | 'health'
  | 'gratitude'
  | 'temptation_sin'
  | 'seeking_decision'
  | 'loss';

export interface QuranVerse {
  id: string;
  arabic: string;
  surahName: string;
  surahNumber: number;
  verseNumber: number;
  transliteration: string;
  translation: string;
  reflection: string;
  audioUrl?: string;
  moods: MoodCategory[];
  situations: SituationCategory[];
  isRuqyah?: boolean;
}

export interface HadithTeaching {
  id: string;
  source: string;
  arabic?: string;
  english: string;
  reference: string;
  lesson: string;
  category: 'mood' | 'situation' | 'repentance' | 'healing';
}

export interface RuqyahItem {
  id: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
  benefits: string;
  category: 'shifa_verses' | 'protection' | 'prophetic_remedy' | 'anxiety_cure';
  methodOfUse: string;
  audioUrl?: string;
}

export interface PropheticRemedy {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  hadithReference: string;
  healingProperties: string[];
  howToApply: string;
  imageIcon: string;
}

export interface DuaItem {
  id: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
  category: 'anxiety' | 'repentance' | 'morning_evening' | 'healing' | 'gratitude' | 'guidance';
  whenToRecite: string;
}

export interface AIGuidanceResult {
  title: string;
  quranicVerse: {
    arabic: string;
    reference: string;
    transliteration?: string;
    translation: string;
    reflection: string;
  };
  propheticTeaching: {
    hadithArabic?: string;
    english: string;
    reference: string;
    explanation: string;
  };
  actionPlan: string[];
  recommendedDua: {
    title: string;
    arabic: string;
    transliteration: string;
    translation: string;
    whenToRecite?: string;
  };
  ruqyahAndHealing?: string;
  wordsOfReassurance: string;
}

export interface SecretGuidanceResult {
  verdictTitle: string;
  reassuranceMessage: string;
  kaffarahAndMakeUpSteps: string[];
  ruqyahShield: {
    title: string;
    arabic: string;
    transliteration?: string;
    translation: string;
    howToUse: string;
  };
  specialTawbahDua: {
    arabic: string;
    transliteration?: string;
    translation: string;
    benefits?: string;
  };
  erasingGoodDeeds: string[];
}

export interface MoodLogEntry {
  id: string;
  timestamp: string;
  date: string;
  moodLevel: number; // 1 to 10
  moodLabel: 'Sakinah (Peaceful)' | 'Shukr (Grateful)' | 'Anxiety (Khawf)' | 'Grief (Huzn)' | 'Remorse (Nadam)' | 'Struggling (Jihad al-Nafs)';
  energyLevel: number; // 1 to 5
  prayerCount: number; // 0 to 5
  quranReadMinutes: number;
  dhikrDone: boolean;
  journalNote: string;
}

export interface MoodAnalyticsResult {
  overallAssessment: string;
  spiritualHeartDiagnosis: string;
  recommendedRoutine: string[];
  encouragementQuote: string;
}

export interface DailyRecitationItem {
  id: string;
  surahName: string;
  arabicName: string;
  surahNumber: number;
  versesCount: number;
  virtue: string;
  bestTime: string;
  audioUrl?: string;
  keyVerseArabic: string;
  keyVerseTranslation: string;
  keyVerseRef: string;
}

export interface SunnahLifestyleItem {
  id: string;
  title: string;
  arabicTitle: string;
  category: 'nutrition' | 'sleep' | 'fitness' | 'mental' | 'hygiene';
  summary: string;
  hadithOrQuranRef: string;
  keyPractices: string[];
  modernHealthBenefit: string;
}

export interface BookmarkItem {
  id: string;
  type: 'verse' | 'dua' | 'ruqyah' | 'ai_guidance' | 'secret_guidance';
  title: string;
  arabic?: string;
  content: string;
  reference?: string;
  savedAt: string;
  meta?: any;
}

export interface DhikrTarget {
  id: string;
  name: string;
  arabic: string;
  transliteration: string;
  translation: string;
  count: number;
  target: number;
  benefits: string;
  reference?: string;
}
