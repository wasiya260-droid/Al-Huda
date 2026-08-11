import { useState } from 'react';
import { ShieldAlert, Zap, Flame, RefreshCw, Volume2, CheckCircle2, Heart, Shield, Lock, EyeOff, MessageSquareX, Sparkles } from 'lucide-react';
import { AUTHENTIC_DUAS } from '../data/duasData';
import { HeartShieldClipart, LanternClipart } from './IslamicCliparts';

export const RefugeSinReminderView = () => {
  const [panicMode, setPanicMode] = useState(false);
  const [selectedImpulse, setSelectedImpulse] = useState<string>('gaze');

  const refugeDuas = AUTHENTIC_DUAS.filter((d) => d.category === 'guidance' || d.category === 'repentance' || d.category === 'anxiety');

  const sinfulImpulses = [
    {
      id: 'gaze',
      icon: EyeOff,
      title: 'Unlawful Gaze & Sexual Temptation',
      arabicTitle: 'غَضُّ الْبَصَرِ وَعِفَّةُ النَّفْسِ',
      quranRef: 'Surah An-Nur 24:30 - "Tell the believing men to reduce [some] of their vision and guard their private parts. That is purer for them."',
      immediateRemedy: 'Instantly lower your eyes and turn off or set down the screen/device. Perform cold Wudu to cool down the body, then recite: "Allaahumma tahhir qalbee wa hassin farjee" (O Allah, purify my heart and protect my chastity).',
      sunnahStrategy: 'Fast voluntarily on Mondays and Thursdays or the White Days to dim sexual desires, as Prophet Muhammad (ﷺ) advised.'
    },
    {
      id: 'anger',
      icon: Flame,
      title: 'Anger & Explosive Outbursts',
      arabicTitle: 'إِطْفَاءُ الْغَضَبِ',
      quranRef: 'Surah Ali \'Imran 3:134 - "Those who spend [in the cause of Allah] during ease and hardship and who restrain anger and who pardon the people - and Allah loves the doers of good."',
      immediateRemedy: 'Cease speaking immediately. If standing, sit down; if sitting, lie down. Make cold Wudu as anger is from Shaytan and Shaytan was created from fire.',
      sunnahStrategy: 'Remember the Hadith: "The strong man is not the wrestler; the strong man is the one who controls himself when angry."'
    },
    {
      id: 'backbiting',
      icon: MessageSquareX,
      title: 'Backbiting, Slander & Gossip (Gheebah)',
      arabicTitle: 'حِفْظُ اللِّسَانِ وَتَرْكُ الْغِيبَةِ',
      quranRef: 'Surah Al-Hujurat 49:12 - "And do not spy or backbite each other. Would one of you like to eat the flesh of his brother when dead? You would detest it."',
      immediateRemedy: 'Stop speaking immediately. If someone else is backbiting, gently defend the absent brother/sister or politely excuse yourself from the conversation.',
      sunnahStrategy: 'Whenever you backbit someone, make sincere Dua for their forgiveness and praise their good qualities in secret.'
    },
    {
      id: 'envy',
      icon: Sparkles,
      title: 'Envy, Jealousy & Malice (Hasad)',
      arabicTitle: 'التَّطْهِيرُ مِنَ الْحَسَدِ',
      quranRef: 'Surah An-Nisa 4:32 - "And do not wish for that by which Allah has made some of you exceed others."',
      immediateRemedy: 'When feeling jealousy toward someone\'s blessing, say "BarakAllahu Laka" (May Allah bless it for you) and make Dua that Allah increases them and grants you content provision.',
      sunnahStrategy: 'Understand that Hasad consumes good deeds like fire consumes dry wood. Counter envy by giving that person a gift or praising them.'
    },
    {
      id: 'arrogance',
      icon: Lock,
      title: 'Arrogance, Pride & Self-Conceit (\'Ujb)',
      arabicTitle: 'مُعَالَجَةُ الْكِبْرِ وَالْعُجْبِ',
      quranRef: 'Surah Luqman 31:18 - "And do not turn your cheek [in contempt] toward people and do not walk through the earth exultantly. Indeed, Allah does not like everyone self-deluded and boastful."',
      immediateRemedy: 'Perform a physical act of humble service: clean a floor, serve someone food, or place your head in Sujood (prostration) directly on the ground in awe of Allah.',
      sunnahStrategy: 'Remember your weak origins from dust and fluid, and remember that no one enters Jannah with an atom\'s weight of arrogance.'
    }
  ];

  const currentImpulseData = sinfulImpulses.find((i) => i.id === selectedImpulse) || sinfulImpulses[0];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-rose-950/60 border border-amber-500/40 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-center gap-3">
          <HeartShieldClipart className="w-12 h-12" />
          <LanternClipart className="w-10 h-10 animate-pulse" />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs font-bold">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>Seeking Refuge (Istia'dhah) & Sin Prevention</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
          Shield Your Heart Against Sinful Impulses
        </h2>

        <p className="text-slate-200 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          Prophet Muhammad (ﷺ) taught us that when temptation or anger strikes, we must immediately seek refuge in Allah with Istia'dhah ("A'udhu billahi minash-shaytanir-rajim"). You are not alone in struggling against your lower self (Nafs).
        </p>

        {/* Emergency Button */}
        <div className="pt-2">
          <button
            onClick={() => setPanicMode(!panicMode)}
            className={`px-6 py-3 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto transition-all shadow-xl ${
              panicMode
                ? 'bg-rose-500 text-slate-950 animate-pulse border-2 border-rose-300'
                : 'bg-gradient-to-r from-rose-600 via-amber-600 to-rose-700 text-slate-950 shadow-[0_0_25px_rgba(225,29,72,0.3)] hover:brightness-110'
            }`}
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>{panicMode ? 'Close Emergency Panic Protocol' : '⚠️ Emergency Panic Button: I am Facing Temptation Right Now!'}</span>
          </button>
        </div>
      </div>

      {/* Emergency Panic Protocol Card */}
      {panicMode && (
        <div className="p-6 sm:p-8 rounded-3xl bg-rose-950/90 border-2 border-rose-500 space-y-6 shadow-2xl animate-fade-in text-rose-100">
          <div className="flex items-center gap-3 border-b border-rose-800 pb-3">
            <Flame className="w-6 h-6 text-amber-400 animate-bounce" />
            <div>
              <h3 className="text-lg font-bold text-amber-200">
                30-Second Emergency Sin Prevention Protocol
              </h3>
              <p className="text-xs text-rose-300">Follow these 5 immediate physical & spiritual steps right now:</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-rose-800/60 space-y-1">
              <strong className="text-amber-300 block font-bold">1. Say Istia'dhah Immediately</strong>
              <p className="font-arabic text-lg text-amber-100">أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ</p>
              <p className="text-slate-300 italic text-[11px]">"I seek refuge in Allah from Satan, the accursed."</p>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-rose-800/60 space-y-1">
              <strong className="text-amber-300 block font-bold">2. Change Physical Position / Leave Room</strong>
              <p className="text-slate-300">If standing, sit down. If lying down, stand up. Immediately step away from the isolated screen, device, or environment triggering temptation.</p>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-rose-800/60 space-y-1">
              <strong className="text-amber-300 block font-bold">3. Perform Cold Water Wudu</strong>
              <p className="text-slate-300">Wash your face, hands, and arms with cold water. Cold water extinguishes the heat of lust and anger created by Shaytan.</p>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-rose-800/60 space-y-1">
              <strong className="text-amber-300 block font-bold">4. Pray 2 Rakat Salat al-Tawbah</strong>
              <p className="text-slate-300">Stand up for prayer. Shaytan detests seeing a servant bow down in Sujood and will flee from you.</p>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-amber-500/40 text-center space-y-1">
            <strong className="text-amber-300 text-xs block font-bold">Key Mindset Anchor:</strong>
            <p className="text-xs text-slate-200 italic max-w-xl mx-auto">
              "Is the temporary pleasure of 5 minutes worth sacrificing eternal Jannah and losing Allah's pleasure? You are stronger than Shaytan's weak trap."
            </p>
          </div>
        </div>
      )}

      {/* Impulse Selector Tabs */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-amber-200 flex items-center gap-2">
          <Shield className="w-5 h-5 text-amber-400" />
          Common Sinful Impulses & Sunnah Countermeasures
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {sinfulImpulses.map((item) => {
            const IconComp = item.icon;
            const isSelected = selectedImpulse === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedImpulse(item.id)}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <IconComp className="w-5 h-5 mx-auto mb-1 text-amber-400" />
                <span className="text-[11px] font-bold block leading-tight">{item.title.split('&')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Impulse Details */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-amber-500/30 space-y-5 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-lg font-bold text-amber-300">{currentImpulseData.title}</h4>
              <span className="font-arabic text-amber-200/80 text-xs">{currentImpulseData.arabicTitle}</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold">
              Spiritual Defense
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-amber-300/90 italic">
            📖 {currentImpulseData.quranRef}
          </div>

          <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-900/40 text-xs text-rose-200 space-y-1">
            <strong className="text-amber-400 block font-bold">⚡ Immediate Action Steps:</strong>
            <p className="leading-relaxed">{currentImpulseData.immediateRemedy}</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-900/40 text-xs text-emerald-200 space-y-1">
            <strong className="text-emerald-400 block font-bold">🌿 Long-Term Sunnah Strategy:</strong>
            <p className="leading-relaxed">{currentImpulseData.sunnahStrategy}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
