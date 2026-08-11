import React from 'react';
import { Palette, Check, Sparkles, X, Sun, Moon, Sparkle, ShieldCheck } from 'lucide-react';
import { useTheme, THEME_PALETTES, ThemeId } from '../context/ThemeContext';
import { LanternClipart, LotusClipart, CrescentClipart } from './IslamicCliparts';

interface ThemePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemePickerModal: React.FC<ThemePickerModalProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme, palette } = useTheme();

  if (!isOpen) return null;

  const themesList = Object.values(THEME_PALETTES);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-xl rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative background cliparts */}
        <div className="absolute top-2 right-2 opacity-20 pointer-events-none">
          <LanternClipart className="w-20 h-20" />
        </div>
        <div className="absolute bottom-2 left-2 opacity-15 pointer-events-none">
          <CrescentClipart className="w-16 h-16" />
        </div>

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-amber-500/20 via-sky-500/20 to-emerald-500/20 border border-slate-700 text-amber-300">
              <Palette className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-100 tracking-tight">
                  Ethereal Palette Sanctuary
                </h3>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                  Live Preview
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Choose your preferred spiritual aura & peaceful visual atmosphere
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Grid Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {themesList.map((t) => {
            const isSelected = theme === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setTheme(t.id as ThemeId)}
                className={`relative cursor-pointer rounded-2xl p-4 border transition-all duration-300 flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-slate-950 border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.2)] ring-2 ring-amber-400/30'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950/90'
                }`}
              >
                {/* Header info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{t.icon}</span>
                    <span className="font-bold text-slate-100 text-sm">{t.name}</span>
                  </div>
                  {isSelected ? (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">
                      <Check className="w-3 h-3" /> Active
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 group-hover:text-slate-300">
                      Select
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {t.description}
                </p>

                {/* Swatch color pills */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-900">
                  <div className="flex items-center gap-1.5">
                    {t.swatchColors.map((color, idx) => (
                      <span
                        key={idx}
                        className="w-4 h-4 rounded-full border border-slate-700 shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  <span className="text-[11px] font-mono text-slate-400">
                    Aura Palette
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Current Theme Accent Banner */}
        <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Active Atmosphere: <strong className="text-amber-300 font-bold">{palette.name}</strong></span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-bold text-xs shadow-md transition-all"
          >
            Apply & Sanctuary Return
          </button>
        </div>
      </div>
    </div>
  );
};
