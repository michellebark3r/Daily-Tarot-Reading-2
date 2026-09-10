import React, { useState } from 'react';
import { Sparkles, BookOpen, Flame, BarChart3, Settings, Moon, Bell, Volume2 } from 'lucide-react';
import { getMoonPhase } from '../utils/moonPhase';
import { playSingingBowlSound } from '../utils/audio';

interface HeaderProps {
  activeTab: 'draw' | 'journal' | 'grimoire' | 'insights';
  onSelectTab: (tab: 'draw' | 'journal' | 'grimoire' | 'insights') => void;
  onOpenSettings: () => void;
  streak: number;
  hasDrawnToday: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenSettings,
  streak,
  hasDrawnToday,
}) => {
  const [isPlayingChime, setIsPlayingChime] = useState(false);
  const moon = getMoonPhase();
  const todayFormatted = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  const handleRingChime = () => {
    setIsPlayingChime(true);
    playSingingBowlSound(true);
    setTimeout(() => setIsPlayingChime(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#08080a]/90 border-b border-white/5 px-4 py-3">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand & Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500/20 via-purple-500/15 to-indigo-500/15 p-0.5 border border-amber-500/25 shadow-md">
              <div className="w-full h-full bg-[#0c0c0f] rounded-[10px] flex items-center justify-center border border-amber-400/20">
                <Moon className="w-5 h-5 text-amber-200/90" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-cinzel font-bold text-lg md:text-xl text-zinc-100 tracking-wider flex items-center gap-1.5">
                  Arcana Daily
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-200/90">
                  1 Draw / Day
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500 font-sans">
                <span>{todayFormatted}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-amber-200/80 flex items-center gap-1" title={`${moon.phaseName} (${moon.illumination}% illuminated) — ${moon.esotericEnergy}`}>
                  <span>{moon.emoji}</span>
                  <span className="hidden sm:inline">{moon.phaseName}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Streak & Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={handleRingChime}
              className={`p-2 rounded-lg bg-[#0c0c0f] border border-white/5 text-zinc-400 hover:text-amber-200 transition-colors ${isPlayingChime ? 'animate-bounce text-amber-300' : ''}`}
              title="Ring Altar Chime (432Hz Sound Meditation)"
              aria-label="Ring Altar Chime"
            >
              <Bell className="w-4 h-4" />
            </button>

            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                streak > 0
                  ? 'bg-amber-500/10 border-amber-500/25 text-amber-200/90'
                  : 'bg-[#0c0c0f] border-white/5 text-zinc-500'
              }`}
            >
              <Flame className={`w-3.5 h-3.5 ${streak > 0 ? 'text-amber-400 fill-amber-400/30' : 'text-zinc-600'}`} />
              <span>{streak}d</span>
            </div>

            <button
              id="header-mobile-settings-btn"
              onClick={onOpenSettings}
              className="p-2 rounded-lg bg-[#0c0c0f] border border-white/5 text-zinc-400 hover:text-amber-200 hover:border-amber-500/30 hover:bg-[#121217] transition-colors"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between md:justify-end gap-1.5 md:gap-3 overflow-x-auto pb-1 md:pb-0">
          <nav className="flex items-center gap-1 bg-[#0c0c0f] p-1 rounded-xl border border-white/5">
            <button
              id="nav-tab-draw"
              onClick={() => onSelectTab('draw')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === 'draw'
                  ? 'bg-[#181820] text-amber-200 border border-amber-500/30 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{hasDrawnToday ? "Today's Card" : 'Daily Draw'}</span>
            </button>

            <button
              id="nav-tab-journal"
              onClick={() => onSelectTab('journal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === 'journal'
                  ? 'bg-[#181820] text-amber-200 border border-amber-500/30 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
              <span>Journal</span>
            </button>

            <button
              id="nav-tab-grimoire"
              onClick={() => onSelectTab('grimoire')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === 'grimoire'
                  ? 'bg-[#181820] text-amber-200 border border-amber-500/30 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>Learn & Grimoire</span>
            </button>

            <button
              id="nav-tab-insights"
              onClick={() => onSelectTab('insights')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === 'insights'
                  ? 'bg-[#181820] text-amber-200 border border-amber-500/30 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-zinc-400" />
              <span>Patterns</span>
            </button>
          </nav>

          {/* Desktop Streak Badge, Altar Chime & Settings */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={handleRingChime}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#0c0c0f] border border-white/5 text-zinc-400 hover:text-amber-200 hover:border-amber-500/30 transition-all ${isPlayingChime ? 'text-amber-300 border-amber-400/50 bg-[#181820]' : ''}`}
              title="Ring 432Hz Altar Sound Meditation"
            >
              <Bell className={`w-3.5 h-3.5 ${isPlayingChime ? 'animate-bounce text-amber-300' : ''}`} />
              <span>Altar Bell</span>
            </button>

            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${
                streak > 0
                  ? 'bg-amber-500/10 border-amber-500/25 text-amber-200/90'
                  : 'bg-[#0c0c0f] border-white/5 text-zinc-500'
              }`}
              title="Consecutive daily draws completed"
            >
              <Flame className={`w-4 h-4 ${streak > 0 ? 'text-amber-400 fill-amber-400/30' : 'text-zinc-600'}`} />
              <span className="font-semibold">{streak} Day Streak</span>
            </div>

            <button
              id="header-desktop-settings-btn"
              onClick={onOpenSettings}
              className="p-2 rounded-lg bg-[#0c0c0f] border border-white/5 text-zinc-400 hover:text-amber-200 hover:border-amber-500/30 hover:bg-[#121217] transition-colors"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

