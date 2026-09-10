import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TarotCard, DailyReading } from '../types';
import { getTarotCardById } from '../data/tarotCards';
import { TarotCardVisual } from './TarotCardVisual';
import { AltarKeepsakeModal } from './AltarKeepsakeModal';
import { getTimeUntilMidnight, updateReading } from '../utils/storage';
import {
  Clock,
  Sparkles,
  BookOpen,
  Briefcase,
  Heart,
  Compass,
  MessageSquare,
  Bot,
  Send,
  Loader2,
  Check,
  Edit3,
  Share2,
  Bookmark,
  BookmarkCheck,
  Feather,
  Info,
  Layers,
} from 'lucide-react';

interface TodayCardViewProps {
  reading: DailyReading;
  onUpdateReading: (updated: DailyReading) => void;
  onExploreGrimoire: () => void;
  onOpenJournal: () => void;
}

export const TodayCardView: React.FC<TodayCardViewProps> = ({
  reading,
  onUpdateReading,
  onExploreGrimoire,
  onOpenJournal,
}) => {
  const isThreeCardSpread = reading.spreadType === 'three_card' && reading.spreadCards && reading.spreadCards.length > 0;
  
  // Active position index for 3-card spread (0, 1, 2, or -1 for holistic synthesis view)
  const [activePositionIndex, setActivePositionIndex] = useState<number>(0);

  // Active card calculation
  const currentCardSelection = isThreeCardSpread && reading.spreadCards
    ? (activePositionIndex >= 0 ? reading.spreadCards[activePositionIndex] : reading.spreadCards[0])
    : { cardId: reading.cardId, isReversed: reading.isReversed, positionLabel: 'Card of the Day', positionQuestion: '' };

  const card = getTarotCardById(currentCardSelection.cardId);
  const currentIsReversed = currentCardSelection.isReversed;

  const [activeTab, setActiveTab] = useState<'symbolism' | 'spheres' | 'journal' | 'mentor' | 'synthesis'>('symbolism');
  const [showAltarModal, setShowAltarModal] = useState(false);
  
  // Countdown Timer
  const [countdown, setCountdown] = useState(getTimeUntilMidnight());
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getTimeUntilMidnight());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Inline Journal Editing State
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [editedNotes, setEditedNotes] = useState(reading.userNotes || '');
  const [isBookmarked, setIsBookmarked] = useState(!!reading.bookmarked);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // AI Esoteric Mentor State
  const [userInquiry, setUserInquiry] = useState('');
  const [aiResponse, setAiResponse] = useState(reading.aiInsights || '');
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  if (!card) {
    return (
      <div className="text-center py-12 text-slate-400">
        <p>Reading data not found for today.</p>
      </div>
    );
  }

  // Toggle Bookmark
  const handleToggleBookmark = () => {
    const nextBookmarked = !isBookmarked;
    setIsBookmarked(nextBookmarked);
    updateReading(reading.id, { bookmarked: nextBookmarked });
    onUpdateReading({ ...reading, bookmarked: nextBookmarked });
  };

  // Save updated notes
  const handleSaveNotes = () => {
    updateReading(reading.id, { userNotes: editedNotes.trim() });
    onUpdateReading({ ...reading, userNotes: editedNotes.trim() });
    setIsEditingNotes(false);
  };

  // Ask AI Mentor
  const handleAskMentor = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isLoadingAi) return;

    setIsLoadingAi(true);
    try {
      const res = await fetch('/api/tarot/deep-dive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardName: card.name,
          isReversed: reading.isReversed,
          userQuestion: userInquiry.trim() || undefined,
          mood: reading.mood,
          keywords: reading.isReversed ? card.reversedKeywords : card.uprightKeywords,
          summary: card.summary,
        }),
      });

      const data = await res.json();
      if (data.content) {
        setAiResponse(data.content);
        updateReading(reading.id, { aiInsights: data.content });
        onUpdateReading({ ...reading, aiInsights: data.content });
        setUserInquiry('');
      }
    } catch (err) {
      console.error('AI deep dive failed:', err);
      setAiResponse('The oracle whispers wisdom: Trust the quiet guidance of your heart today.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  // Share / Copy summary to clipboard
  const handleCopySummary = () => {
    if (isThreeCardSpread && reading.spreadCards) {
      let text = `✦ Arcana Daily Reading — ${reading.date}\n3-Card Spread: ${reading.spreadPromptTitle || 'Daily Trinity'}\n\n`;
      reading.spreadCards.forEach((sc, idx) => {
        const c = getTarotCardById(sc.cardId);
        if (c) {
          text += `${idx + 1}. ${sc.positionLabel}: ${c.name} (${sc.isReversed ? 'Reversed' : 'Upright'})\n"${c.affirmation}"\n\n`;
        }
      });
      navigator.clipboard.writeText(text);
    } else {
      const text = `✦ Arcana Daily Reading — ${reading.date}\nCard of the Day: ${card.name} (${currentIsReversed ? 'Reversed' : 'Upright'})\nAffirmation: "${card.affirmation}"\nGuidance: ${currentIsReversed ? card.reversedMeaning : card.uprightMeaning}`;
      navigator.clipboard.writeText(text);
    }
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Sacred Draw Status & Countdown Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0c0c0f] border border-white/5 shadow-lg">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-200">
            {isThreeCardSpread ? <Layers className="w-5 h-5 text-amber-300" /> : <Sparkles className="w-5 h-5 text-amber-300" />}
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h3 className="font-cinzel text-sm font-bold text-zinc-100">
                {isThreeCardSpread
                  ? `Today's 3-Card Spread: ${reading.spreadPromptTitle || 'Daily Trinity'}`
                  : "Today's Sacred Card Completed"}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 text-[10px] font-semibold border border-emerald-500/20">
                Active
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-sans">
              {isThreeCardSpread
                ? 'Your trinitarian daily oracle is anchored. Toggle positions below to inspect each card.'
                : 'One card per day keeps the ritual sacred. Reflect deeply upon this archetype.'}
            </p>
          </div>
        </div>

        {/* Countdown */}
        <div className="flex items-center gap-2 bg-[#08080a] px-3.5 py-2 rounded-xl border border-white/5">
          <Clock className="w-4 h-4 text-amber-300" />
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 block leading-none">
              Next Draw In
            </span>
            <span className="font-mono text-xs font-bold text-amber-200 tracking-wider">
              {String(countdown.hours).padStart(2, '0')}h : {String(countdown.minutes).padStart(2, '0')}m : {String(countdown.seconds).padStart(2, '0')}s
            </span>
          </div>
        </div>
      </div>

      {/* 3-Card Spread Navigation Bar */}
      {isThreeCardSpread && reading.spreadCards && (
        <div className="p-3 rounded-2xl bg-[#0c0c0f] border border-amber-500/30 shadow-xl space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Spread Position Navigator</span>
            </span>
            <span className="text-[11px] text-zinc-400 font-cinzel">
              Card {activePositionIndex + 1} of 3 Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            {reading.spreadCards.map((sc, idx) => {
              const scCard = getTarotCardById(sc.cardId);
              const isActive = activePositionIndex === idx && activeTab !== 'synthesis';
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActivePositionIndex(idx);
                    if (activeTab === 'synthesis') setActiveTab('symbolism');
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    isActive
                      ? 'bg-[#181820] border-amber-500/50 text-amber-200 shadow-md ring-1 ring-amber-400/30'
                      : 'bg-[#08080a] border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/10'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold text-amber-300/80 block truncate">
                    {sc.positionLabel}
                  </span>
                  <span className="font-cinzel text-xs font-bold text-zinc-100 block truncate">
                    {scCard?.name || sc.cardId}
                  </span>
                  <span className="text-[9px] text-zinc-500 block">
                    {sc.isReversed ? 'Reversed' : 'Upright'}
                  </span>
                </button>
              );
            })}

            {/* Synthesis Button */}
            <button
              type="button"
              onClick={() => setActiveTab('synthesis')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                activeTab === 'synthesis'
                  ? 'bg-amber-500/20 border-amber-400/60 text-amber-100 shadow-md ring-1 ring-amber-400/30'
                  : 'bg-[#08080a] border-amber-500/20 text-amber-300 hover:bg-[#121217]'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-amber-300 block">
                Holistic Oracle
              </span>
              <span className="font-cinzel text-xs font-bold text-amber-100 block truncate flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Trinity Synthesis</span>
              </span>
              <span className="text-[9px] text-zinc-400 block">
                All 3 Cards Combined
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Main Grid: Card Spotlight + Interactive Educational Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Card + Daily Core Metadata */}
        <div className="lg:col-span-5 flex flex-col items-center space-y-4">
          {/* Position label indicator for 3-card spread */}
          {isThreeCardSpread && currentCardSelection.positionLabel && (
            <div className="w-full text-center py-1.5 px-3 rounded-lg bg-[#121217] border border-amber-500/25">
              <span className="text-[11px] font-bold text-amber-300 font-cinzel">
                {currentCardSelection.positionLabel}
              </span>
              {currentCardSelection.positionQuestion && (
                <p className="text-[10px] text-zinc-400 italic line-clamp-1 mt-0.5">
                  {currentCardSelection.positionQuestion}
                </p>
              )}
            </div>
          )}

          <div className="relative group">
            <TarotCardVisual
              card={card}
              isReversed={currentIsReversed}
              size="xl"
              className="hover:scale-[1.01] transition-transform shadow-2xl"
            />

            {/* Quick action buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-20">
              <button
                id="today-card-altar-btn"
                onClick={() => setShowAltarModal(true)}
                className="p-2 rounded-full bg-[#08080a]/80 text-amber-300 hover:text-amber-100 hover:bg-[#181820] border border-amber-500/30 backdrop-blur-md transition-colors"
                title="View Sacred Altar Keepsake / Talisman"
              >
                <Sparkles className="w-4 h-4" />
              </button>

              <button
                id="today-card-bookmark-btn"
                onClick={handleToggleBookmark}
                className={`p-2 rounded-full backdrop-blur-md transition-colors border ${
                  isBookmarked
                    ? 'bg-amber-500/20 text-amber-200 border-amber-400/40'
                    : 'bg-[#08080a]/80 text-zinc-400 hover:text-amber-200 border-white/10'
                }`}
                title={isBookmarked ? 'Bookmarked in favorites' : 'Bookmark this reading'}
              >
                {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              </button>

              <button
                id="today-card-copy-btn"
                onClick={handleCopySummary}
                className="p-2 rounded-full bg-[#08080a]/80 text-zinc-400 hover:text-amber-200 border border-white/10 backdrop-blur-md transition-colors"
                title="Copy card summary"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {copiedNotification && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-400 text-[#08080a] text-xs font-bold rounded-full shadow-lg z-30 animate-fade-in">
                Copied to clipboard!
              </div>
            )}
          </div>

          {/* Daily Affirmation Card */}
          <div className="w-full bg-[#0c0c0f] p-4 rounded-xl border border-amber-500/20 text-center space-y-2 shadow-sm">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
              Affirmation for this Archetype
            </span>
            <p className="font-serif italic text-amber-100 text-sm">
              "{card.affirmation}"
            </p>
            <button
              onClick={() => setShowAltarModal(true)}
              className="mt-1 inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 font-cinzel hover:underline"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Open Sacred Altar Talisman</span>
            </button>
          </div>
        </div>

        {/* Right Column: Educational Exploration Center */}
        <div className="lg:col-span-7 bg-[#0c0c0f] rounded-2xl border border-white/5 shadow-xl overflow-hidden flex flex-col">
          {/* Navigation Sub-Tabs */}
          <div className="flex border-b border-white/5 bg-[#08080a]/90 p-1.5 overflow-x-auto">
            {isThreeCardSpread && (
              <button
                id="today-tab-synthesis"
                onClick={() => setActiveTab('synthesis')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  activeTab === 'synthesis'
                    ? 'bg-[#181820] text-amber-200 border border-amber-500/30 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-amber-300" />
                <span>Spread Synthesis</span>
              </button>
            )}

            <button
              id="today-tab-symbolism"
              onClick={() => setActiveTab('symbolism')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === 'symbolism'
                  ? 'bg-[#181820] text-amber-200 border border-amber-500/30 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Info className="w-3.5 h-3.5 text-amber-300" />
              <span>Symbolism & Lore</span>
            </button>

            <button
              id="today-tab-spheres"
              onClick={() => setActiveTab('spheres')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === 'spheres'
                  ? 'bg-[#181820] text-amber-200 border border-amber-500/30 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-zinc-400" />
              <span>Life Spheres</span>
            </button>

            <button
              id="today-tab-journal"
              onClick={() => setActiveTab('journal')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === 'journal'
                  ? 'bg-[#181820] text-amber-200 border border-amber-500/30 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
              <span>My Journal Entry</span>
            </button>

            <button
              id="today-tab-mentor"
              onClick={() => setActiveTab('mentor')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === 'mentor'
                  ? 'bg-[#181820] text-amber-200 border border-amber-500/30 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-zinc-400" />
              <span>AI Esoteric Mentor</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 flex-1">
            {/* Tab: 3-Card Spread Synthesis */}
            {activeTab === 'synthesis' && isThreeCardSpread && reading.spreadCards && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-amber-300 font-bold">
                    Trinitarian Oracle Reading
                  </span>
                  <h4 className="font-cinzel text-lg font-bold text-zinc-100">
                    {reading.spreadPromptTitle || 'Daily 3-Card Spread'}
                  </h4>
                </div>

                {/* 3 Cards Mini Preview */}
                <div className="grid grid-cols-3 gap-3">
                  {reading.spreadCards.map((sc, idx) => {
                    const scCard = getTarotCardById(sc.cardId);
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setActivePositionIndex(idx);
                          setActiveTab('symbolism');
                        }}
                        className="cursor-pointer p-3 rounded-xl bg-[#08080a] border border-white/5 hover:border-amber-500/30 transition-all text-center space-y-1.5"
                      >
                        <span className="text-[10px] uppercase font-bold text-amber-300 block truncate">
                          {sc.positionLabel}
                        </span>
                        <div className="mx-auto w-14 h-20 rounded border border-amber-500/20 overflow-hidden shadow-sm flex items-center justify-center bg-[#121217]">
                          <span className="font-cinzel text-[10px] font-bold text-amber-200 text-center px-1">
                            {scCard?.name}
                          </span>
                        </div>
                        <span className="text-[10px] text-zinc-400 block truncate">
                          {sc.isReversed ? 'Reversed' : 'Upright'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 rounded-xl bg-[#121217] border border-amber-500/20 space-y-2">
                  <h5 className="font-cinzel text-xs font-bold text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>How These Three Energies Harmonize</span>
                  </h5>
                  <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
                    Notice the interplay between your past momentum, current crucible, and the awakening horizon. The archetypes mirror a continuous dialogue rather than isolated events.
                  </p>
                </div>

                {reading.userNotes && (
                  <div className="p-4 rounded-xl bg-[#08080a] border border-white/5 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                      Your Journaled Synthesis
                    </span>
                    <p className="text-xs text-zinc-200 whitespace-pre-wrap font-mono leading-relaxed">
                      {reading.userNotes}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
            {/* Tab 1: Symbolism & Lore */}
            {activeTab === 'symbolism' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-1">
                    Archetypal Essence ({reading.isReversed ? 'Reversed' : 'Upright'})
                  </h4>
                  <p className="text-sm md:text-base text-zinc-200 leading-relaxed font-sans">
                    {reading.isReversed ? card.reversedMeaning : card.uprightMeaning}
                  </p>
                </div>

                {/* Interactive Symbolism Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-widest text-zinc-400 font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Sacred Symbols in This Card</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {card.symbolism.map((sym, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-[#08080a] border border-white/5 hover:border-amber-400/30 transition-colors"
                      >
                        <span className="font-cinzel text-xs font-bold text-amber-200 block mb-1">
                          ✦ {sym.symbol}
                        </span>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {sym.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Daily Contemplation Prompt */}
                <div className="p-4 rounded-xl bg-[#121217] border border-white/5">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                    Contemplation Prompt for Today
                  </span>
                  <p className="text-xs md:text-sm text-amber-100/90 mt-1 font-serif italic">
                    "{card.dailyContemplation}"
                  </p>
                </div>
              </motion.div>
            )}

            {/* Tab 2: Life Spheres */}
            {activeTab === 'spheres' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {/* Career */}
                <div className="p-4 rounded-xl bg-[#08080a] border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300">
                    <Briefcase className="w-4 h-4" />
                    <span className="font-cinzel text-xs font-bold uppercase tracking-wider">
                      Work & Ambition
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {card.lifeSpheres.career}
                  </p>
                </div>

                {/* Love */}
                <div className="p-4 rounded-xl bg-[#08080a] border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-rose-300">
                    <Heart className="w-4 h-4" />
                    <span className="font-cinzel text-xs font-bold uppercase tracking-wider">
                      Love & Connection
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {card.lifeSpheres.love}
                  </p>
                </div>

                {/* Spirituality */}
                <div className="p-4 rounded-xl bg-[#08080a] border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-300">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-cinzel text-xs font-bold uppercase tracking-wider">
                      Spiritual Awakening
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {card.lifeSpheres.spirituality}
                  </p>
                </div>

                {/* Practical Advice */}
                <div className="p-4 rounded-xl bg-[#08080a] border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <Compass className="w-4 h-4" />
                    <span className="font-cinzel text-xs font-bold uppercase tracking-wider">
                      Practical Daily Action
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {card.lifeSpheres.advice}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Tab 3: My Journal Entry */}
            {activeTab === 'journal' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
                      Private Sanctuary Entry
                    </span>
                    <h4 className="font-cinzel text-sm font-bold text-zinc-100">
                      {reading.date} Reflection
                    </h4>
                  </div>

                  {!isEditingNotes && (
                    <button
                      id="today-journal-edit-btn"
                      onClick={() => setIsEditingNotes(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181820] hover:bg-[#20202a] text-xs text-zinc-200 font-medium transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-amber-300" />
                      <span>Edit Entry</span>
                    </button>
                  )}
                </div>

                {/* Intention if present */}
                {reading.intention && (
                  <div className="p-3 rounded-lg bg-[#08080a] border border-white/5">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold block mb-0.5">
                      Intention Set at Draw
                    </span>
                    <p className="text-xs text-amber-200/90 italic font-serif">
                      "{reading.intention}"
                    </p>
                  </div>
                )}

                {/* Mood & Tags */}
                <div className="flex flex-wrap items-center gap-3">
                  {reading.mood && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#08080a] border border-white/5 text-xs text-zinc-300">
                      <span>Energy:</span>
                      <span className="text-amber-200 font-medium">{reading.mood}</span>
                    </div>
                  )}

                  {reading.tags && reading.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                {/* User Notes Editor / Viewer */}
                {isEditingNotes ? (
                  <div className="space-y-3">
                    <textarea
                      id="today-journal-edit-textarea"
                      value={editedNotes}
                      onChange={(e) => setEditedNotes(e.target.value)}
                      placeholder="Write or update your reflection for today..."
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl bg-[#08080a] border border-white/10 text-zinc-100 text-sm focus:outline-none focus:border-amber-400/60 transition-all resize-y"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setIsEditingNotes(false)}
                        className="px-4 py-2 rounded-lg bg-[#181820] text-xs text-zinc-400 hover:bg-[#20202a]"
                      >
                        Cancel
                      </button>
                      <button
                        id="today-journal-save-btn"
                        onClick={handleSaveNotes}
                        className="px-4 py-2 rounded-lg bg-amber-400 text-[#08080a] text-xs font-bold hover:bg-amber-300 transition-colors"
                      >
                        Save Updates
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-[#08080a] border border-white/5 min-h-[120px]">
                    {reading.userNotes ? (
                      <p className="text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed">
                        {reading.userNotes}
                      </p>
                    ) : (
                      <div className="text-center py-6 text-zinc-500 text-xs space-y-2">
                        <Feather className="w-6 h-6 mx-auto text-zinc-600" />
                        <p>No notes logged yet for today.</p>
                        <button
                          onClick={() => setIsEditingNotes(true)}
                          className="text-amber-300 hover:underline"
                        >
                          + Write your reflection now
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* Tab 4: AI Esoteric Mentor (Gemini API) */}
            {activeTab === 'mentor' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-5"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Bot className="w-4 h-4 text-amber-300" />
                    <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider">
                      Esoteric Mentor & In-Depth Wisdom
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-400 font-sans">
                    Ask how {card.name} speaks to your specific dilemma today, or generate a tailored daily meditation.
                  </p>
                </div>

                {/* Inquiry Form */}
                <form onSubmit={handleAskMentor} className="space-y-3">
                  <div className="relative">
                    <input
                      id="mentor-inquiry-input"
                      type="text"
                      value={userInquiry}
                      onChange={(e) => setUserInquiry(e.target.value)}
                      placeholder="e.g. How do I balance this energy with a tough conversation at 3 PM?"
                      className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-[#08080a] border border-white/10 text-xs md:text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-400/60"
                    />
                    <button
                      type="submit"
                      disabled={isLoadingAi}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-amber-500/15 text-amber-200 hover:bg-amber-400 hover:text-[#08080a] transition-colors disabled:opacity-50"
                    >
                      {isLoadingAi ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  {/* Quick Preset Inquiry Prompts */}
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      `What shadow pattern should I watch for?`,
                      `How does this card help my decision making?`,
                      `Give me a 2-minute guided mindfulness reflection`,
                    ].map((prompt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setUserInquiry(prompt);
                        }}
                        className="px-2 py-1 rounded-md bg-[#08080a] text-[11px] text-zinc-400 hover:text-amber-200 border border-white/5 transition-colors"
                      >
                        ✦ {prompt}
                      </button>
                    ))}
                  </div>
                </form>

                {/* AI Insights Output */}
                <div className="p-4 rounded-xl bg-[#08080a] border border-white/5 text-zinc-200 text-xs md:text-sm leading-relaxed whitespace-pre-wrap max-h-[300px] overflow-y-auto">
                  {isLoadingAi ? (
                    <div className="flex items-center justify-center gap-2 py-8 text-amber-200 font-cinzel">
                      <Loader2 className="w-5 h-5 animate-spin text-amber-300" />
                      <span>Consulting the archetypal spheres...</span>
                    </div>
                  ) : aiResponse ? (
                    aiResponse
                  ) : (
                    <p className="text-zinc-600 italic text-center py-4">
                      Tap a prompt above or ask a specific question to receive personal esoteric guidance.
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Altar Keepsake / Talisman Modal */}
      {showAltarModal && (
        <AltarKeepsakeModal
          card={card}
          reading={reading}
          onClose={() => setShowAltarModal(false)}
        />
      )}
    </div>
  );
};
