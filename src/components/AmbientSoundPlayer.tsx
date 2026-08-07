import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Sparkles } from 'lucide-react';

interface AudioTrack {
  id: string;
  title: string;
  reciter: string;
  url: string;
  type: 'quran' | 'ambient';
}

const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 'fatihah',
    title: 'Surah Al-Fatihah (The Cure)',
    reciter: 'Mishary Rashid Alafasy',
    url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3',
    type: 'quran'
  },
  {
    id: 'kursi',
    title: 'Ayat Al-Kursi (Protection)',
    reciter: 'Mishary Rashid Alafasy',
    url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/262.mp3',
    type: 'quran'
  },
  {
    id: 'sharh',
    title: 'Surah Ash-Sharh (Relief from Hardship)',
    reciter: 'Mishary Rashid Alafasy',
    url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6089.mp3',
    type: 'quran'
  },
  {
    id: 'rahman',
    title: 'Surah Ar-Rahman (The Most Merciful)',
    reciter: 'Mishary Rashid Alafasy',
    url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/4902.mp3',
    type: 'quran'
  },
  {
    id: 'mulk',
    title: 'Surah Al-Mulk (Sovereignty & Peace)',
    reciter: 'Mishary Rashid Alafasy',
    url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/5242.mp3',
    type: 'quran'
  }
];

export const AmbientSoundPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isOpen, setIsOpen] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = AUDIO_TRACKS[selectedTrackIndex];

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(currentTrack.url);
    } else {
      audioRef.current.src = currentTrack.url;
    }
    audioRef.current.volume = isMuted ? 0 : volume;

    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.warn("Audio play prevented:", err);
        setAudioError(true);
        setIsPlaying(false);
      });
    }

    const handleEnded = () => {
      // Loop or play next
      setSelectedTrackIndex((prev) => (prev + 1) % AUDIO_TRACKS.length);
    };

    audioRef.current.addEventListener('ended', handleEnded);
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, [selectedTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    setAudioError(false);

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn("Audio play error:", err);
        setAudioError(true);
      });
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-xs font-medium ${
          isPlaying
            ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
            : 'bg-slate-900/80 border-slate-700/60 text-slate-300 hover:border-amber-500/40'
        }`}
        title="Spiritual Ambient Player"
      >
        <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin text-amber-400' : ''}`} />
        <span className="hidden sm:inline">
          {isPlaying ? 'Recitation Playing' : 'Peaceful Recitation'}
        </span>
        {isPlaying && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-amber-500/30 shadow-2xl z-50 text-slate-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h4 className="text-sm font-semibold text-amber-200">Quranic Recitation Player</h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white text-xs"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <p className="text-xs font-semibold text-slate-200 truncate">{currentTrack.title}</p>
              <p className="text-[11px] text-amber-400/80">{currentTrack.reciter}</p>
            </div>

            {audioError && (
              <p className="text-[11px] text-rose-400 bg-rose-950/40 p-2 rounded-lg border border-rose-800/40">
                Audio playback blocked or unavailable. Click play again.
              </p>
            )}

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={togglePlay}
                className="flex-1 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-600 text-slate-950 font-semibold text-xs flex items-center justify-center gap-1.5 shadow-lg hover:brightness-110 transition-all"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950" />}
                {isPlaying ? 'Pause Recitation' : 'Play Recitation'}
              </button>

              <button
                onClick={toggleMute}
                className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Select Recitation</label>
              <select
                value={selectedTrackIndex}
                onChange={(e) => {
                  setSelectedTrackIndex(Number(e.target.value));
                  setIsPlaying(true);
                }}
                className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-amber-500/60"
              >
                {AUDIO_TRACKS.map((track, idx) => (
                  <option key={track.id} value={idx}>
                    {track.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <VolumeX className="w-3 h-3 text-slate-500" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-amber-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
              />
              <Volume2 className="w-3 h-3 text-amber-400" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
