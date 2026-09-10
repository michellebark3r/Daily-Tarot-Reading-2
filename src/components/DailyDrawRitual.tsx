import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TarotCard, DailyReading, SpreadPrompt, SpreadCardSelection } from '../types';
import { getRandomDailyCard, getRandomCards, ALL_TAROT_CARDS } from '../data/tarotCards';
import { SPREAD_PROMPTS, DEFAULT_SPREAD_PROMPT } from '../data/spreadPrompts';
import { TarotCardVisual } from './TarotCardVisual';
import { playShuffleSound, playFlipSound, playCelebrationSound } from '../utils/audio';
import { saveDailyReading, getTodayDateString } from '../utils/storage';
import {
  Sparkles,
  Shuffle,
  Moon,
  Feather,
  Check,
  ArrowRight,
  Heart,
  Tag,
  BookOpen,
  Layers,
  HelpCircle,
  Eye,
  RotateCw,
  Flame,
  Droplets,
  Wind,
  Mountain,
} from 'lucide-react';

interface DailyDrawRitualProps {
  allowReversals: boolean;
  soundEnabled: boolean;
  onReadingCompleted: (reading: DailyReading) => void;
}

const MOODS = [
  { id: 'peaceful', label: 'Peaceful', icon: '🌿' },
  { id: 'inspired', label: 'Inspired', icon: '✨' },
  { id: 'focused', label: 'Focused', icon: '🎯' },
  { id: 'reflective', label: 'Reflective', icon: '🌊' },
  { id: 'seeking', label: 'Seeking Clarity', icon: '🔍' },
  { id: 'anxious', label: 'Anxious', icon: '🌪️' },
  { id: 'grateful', label: 'Grateful', icon: '🙏' },
];

const COMMON_TAGS = ['DailyMindfulness', 'Career', 'Love', 'InnerGrowth', 'Decision', 'Creativity', 'Health'];

export const DailyDrawRitual: React.FC<DailyDrawRitualProps> = ({
  allowReversals,
  soundEnabled,
  onReadingCompleted,
}) => {
  // Ritual Step
  const [step, setStep] = useState<'intention' | 'select' | 'reveal' | 'journal'>('intention');
  
  // Spread Type & Prompt Choice
  const [drawMode, setDrawMode] = useState<'single' | 'three_card'>('single');
  const [selectedSpreadPrompt, setSelectedSpreadPrompt] = useState<SpreadPrompt>(DEFAULT_SPREAD_PROMPT);
  
  // Intention & Mood
  const [intention, setIntention] = useState('');
  const [isShuffling, setIsShuffling] = useState(false);
  
  // Single Card Selection State
  const [selectedSingleCard, setSelectedSingleCard] = useState<{ card: TarotCard; isReversed: boolean } | null>(null);
  const [isSingleFlipped, setIsSingleFlipped] = useState(false);

  // 3-Card Spread Selection State
  const [spreadPickedCards, setSpreadPickedCards] = useState<Array<{ card: TarotCard; isReversed: boolean }>>([]);
  const [revealedIndices, setRevealedIndices] = useState<number[]>([0, 1, 2]);
  const [focusedCardIndex, setFocusedCardIndex] = useState<number>(0);

  // Journaling State
  const [mood, setMood] = useState('inspired');
  const [notes, setNotes] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['DailyMindfulness']);
  const [customTag, setCustomTag] = useState('');

  // Handle deck shuffle
  const handleShuffle = () => {
    setIsShuffling(true);
    playShuffleSound(soundEnabled);
    setTimeout(() => {
      setIsShuffling(false);
    }, 700);
  };

  // Card Pick in Single Card Mode
  const handleSingleCardPick = () => {
    if (selectedSingleCard) return;
    const cardData = getRandomDailyCard(allowReversals);
    setSelectedSingleCard(cardData);
    setStep('reveal');
    playShuffleSound(soundEnabled);

    setTimeout(() => {
      setIsSingleFlipped(true);
      playFlipSound(soundEnabled);
      setTimeout(() => {
        playCelebrationSound(soundEnabled);
      }, 400);
    }, 500);
  };

  // Card Pick in 3-Card Spread Mode
  const handleSpreadCardPick = () => {
    if (spreadPickedCards.length >= 3) return;

    // Get an available random card not already in spreadPickedCards
    const existingIds = spreadPickedCards.map((p) => p.card.id);
    const available = ALL_TAROT_CARDS.filter((c) => !existingIds.includes(c.id));
    const randomCard = available[Math.floor(Math.random() * available.length)];
    const isReversed = allowReversals ? Math.random() < 0.35 : false;

    playFlipSound(soundEnabled);
    const nextList = [...spreadPickedCards, { card: randomCard, isReversed }];
    setSpreadPickedCards(nextList);

    // If 3rd card picked, proceed to reveal
    if (nextList.length === 3) {
      setTimeout(() => {
        setStep('reveal');
        setRevealedIndices([0, 1, 2]);
        playCelebrationSound(soundEnabled);
      }, 700);
    }
  };

  // Switch to Journaling with pre-populated reflection hints
  const handleProceedToJournal = () => {
    if (drawMode === 'three_card') {
      const template = `[1. ${selectedSpreadPrompt.positions[0].label}: ${spreadPickedCards[0]?.card.name}]\n- Insights:\n\n[2. ${selectedSpreadPrompt.positions[1].label}: ${spreadPickedCards[1]?.card.name}]\n- Insights:\n\n[3. ${selectedSpreadPrompt.positions[2].label}: ${spreadPickedCards[2]?.card.name}]\n- Insights:\n\n[Sacred Synthesis & Actionable Takeaway]\n- `;
      if (!notes) {
        setNotes(template);
      }
    }
    setStep('journal');
  };

  // Toggle tag
  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleAddCustomTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      setSelectedTags([...selectedTags, customTag.trim().replace(/^#/, '')]);
      setCustomTag('');
    }
  };

  // Save the complete daily reading to journal
  const handleSaveToJournal = () => {
    if (drawMode === 'single') {
      if (!selectedSingleCard) return;

      const newReading: DailyReading = {
        id: `reading_${Date.now()}`,
        date: getTodayDateString(),
        timestamp: Date.now(),
        cardId: selectedSingleCard.card.id,
        isReversed: selectedSingleCard.isReversed,
        spreadType: 'single',
        intention: intention.trim() || undefined,
        userNotes: notes.trim() || undefined,
        mood: mood,
        tags: selectedTags,
        bookmarked: false,
      };

      saveDailyReading(newReading);
      onReadingCompleted(newReading);
    } else {
      if (spreadPickedCards.length < 3) return;

      const spreadCardsData: SpreadCardSelection[] = spreadPickedCards.map((sc, i) => ({
        cardId: sc.card.id,
        isReversed: sc.isReversed,
        positionLabel: selectedSpreadPrompt.positions[i].label,
        positionQuestion: selectedSpreadPrompt.positions[i].question,
      }));

      const newReading: DailyReading = {
        id: `reading_${Date.now()}`,
        date: getTodayDateString(),
        timestamp: Date.now(),
        cardId: spreadPickedCards[0].card.id, // primary card
        isReversed: spreadPickedCards[0].isReversed,
        spreadType: 'three_card',
        spreadPromptId: selectedSpreadPrompt.id,
        spreadPromptTitle: selectedSpreadPrompt.title,
        spreadCards: spreadCardsData,
        intention: intention.trim() || undefined,
        userNotes: notes.trim() || undefined,
        mood: mood,
        tags: selectedTags,
        bookmarked: false,
      };

      saveDailyReading(newReading);
      onReadingCompleted(newReading);
    }
  };

  // Compute elemental summary for 3 cards
  const getElementalBreakdown = () => {
    if (spreadPickedCards.length < 3) return '';
    const counts: Record<string, number> = {};
    let majorCount = 0;
    spreadPickedCards.forEach((sc) => {
      counts[sc.card.element] = (counts[sc.card.element] || 0) + 1;
      if (sc.card.arcana === 'major') majorCount++;
    });
    const parts = Object.entries(counts).map(([el, c]) => `${c} ${el}`);
    return `${parts.join(', ')} • ${majorCount} Major Arcana`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Step 1: Intention & Spread Choice */}
      {step === 'intention' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-200 shadow-lg shadow-black/60">
            <Moon className="w-8 h-8 animate-pulse text-amber-200" />
          </div>

          <div className="space-y-2">
            <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-zinc-100 tracking-wide">
              Today's Sacred Tarot Ritual
            </h2>
            <p className="text-sm md:text-base text-zinc-400 max-w-lg mx-auto font-sans leading-relaxed">
              Take a slow, grounding breath. Choose your sacred draw format for today: a focused Single Card anchor or an illuminating 3-Card Spread.
            </p>
          </div>

          {/* Draw Format Switcher (Single Card vs 3-Card Spread) */}
          <div className="max-w-md mx-auto bg-[#0c0c0f] p-1.5 rounded-2xl border border-white/10 flex gap-1.5 shadow-lg">
            <button
              id="draw-format-single-btn"
              type="button"
              onClick={() => setDrawMode('single')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-cinzel font-bold transition-all flex items-center justify-center gap-2 ${
                drawMode === 'single'
                  ? 'bg-[#181820] text-amber-200 border border-amber-500/30 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#121217]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Single Card (Daily Focus)</span>
            </button>

            <button
              id="draw-format-three-card-btn"
              type="button"
              onClick={() => setDrawMode('three_card')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-cinzel font-bold transition-all flex items-center justify-center gap-2 ${
                drawMode === 'three_card'
                  ? 'bg-[#181820] text-amber-200 border border-amber-500/30 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#121217]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-300" />
              <span>3-Card Spread (Trinity)</span>
            </button>
          </div>

          {/* 3-Card Spread Prompt Selector Dropdown */}
          {drawMode === 'three_card' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="max-w-md mx-auto bg-[#0c0c0f] p-5 rounded-2xl border border-amber-500/30 shadow-xl space-y-4 text-left"
            >
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-300" />
                  <span>Select 3-Card Spread Inquiry Prompt</span>
                </label>
                <select
                  id="ritual-spread-prompt-select"
                  value={selectedSpreadPrompt.id}
                  onChange={(e) => {
                    const found = SPREAD_PROMPTS.find((p) => p.id === e.target.value);
                    if (found) setSelectedSpreadPrompt(found);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#08080a] border border-white/10 text-zinc-100 text-xs md:text-sm font-medium focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/30 transition-all cursor-pointer"
                >
                  {SPREAD_PROMPTS.map((prompt) => (
                    <option key={prompt.id} value={prompt.id} className="bg-[#0c0c0f] text-zinc-200 py-1">
                      {prompt.title} ({prompt.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Spread Position Preview */}
              <div className="space-y-2 pt-1 border-t border-white/5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">
                  Spread Positions & Inquiries
                </span>
                <div className="space-y-1.5">
                  {selectedSpreadPrompt.positions.map((pos, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-[#08080a] border border-white/5 text-xs">
                      <span className="font-cinzel font-bold text-amber-200 block text-[11px]">
                        {pos.label}
                      </span>
                      <span className="text-[11px] text-zinc-400 italic">
                        {pos.question}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-amber-200/80 italic pt-1">
                  ✦ {selectedSpreadPrompt.synthesisGuide}
                </p>
              </div>
            </motion.div>
          )}

          {/* Today's Guiding Intention (Optional) */}
          <div className="max-w-md mx-auto bg-[#0c0c0f] p-6 rounded-2xl border border-amber-500/20 shadow-xl space-y-4 text-left">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-amber-200/90 uppercase tracking-widest flex items-center gap-1.5">
                <Feather className="w-3.5 h-3.5 text-amber-300" />
                <span>Today's Guiding Intention (Optional)</span>
              </label>
            </div>
            <textarea
              id="ritual-intention-input"
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder={
                drawMode === 'single'
                  ? 'e.g. What mindset should I embody during my meeting today? Or: Grant me clarity on personal boundaries...'
                  : `e.g. Guidance for navigating this ${selectedSpreadPrompt.title} inquiry...`
              }
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl bg-[#08080a] border border-white/10 text-zinc-100 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/30 transition-all resize-none"
            />
            
            {/* Quick Oracle Prompt Suggestions */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Quick Oracle Prompts</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(drawMode === 'single'
                  ? [
                      'What energy should I embody today?',
                      'Where is my focus most needed?',
                      'What hidden strength can I call on?',
                      'What lesson is ready to unfold?',
                    ]
                  : [
                      'Show me the full truth of this transition.',
                      'Align my mind, body, and spirit.',
                      'What must I release to move forward?',
                      'Illuminate my blind spot with grace.',
                    ]
                ).map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => setIntention(prompt)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-[#121217] border border-white/5 text-zinc-400 hover:text-amber-200 hover:border-amber-500/30 transition-colors text-left"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-zinc-500 italic pt-1 border-t border-white/5">
              ✦ Remember: You receive one sacred ritual draw per calendar day.
            </p>
          </div>

          <button
            id="ritual-proceed-to-draw-btn"
            onClick={() => {
              setSpreadPickedCards([]);
              setSelectedSingleCard(null);
              setStep('select');
            }}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-[#08080a] font-bold font-cinzel tracking-wider text-sm shadow-xl shadow-amber-500/20 hover:shadow-amber-400/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 mx-auto"
          >
            <span>Enter the Sacred Arc</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* Step 2: Interactive Card Fan / Deck Selection */}
      {step === 'select' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="text-center space-y-6"
        >
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">
              {drawMode === 'single' ? 'Sacred Arc' : 'Trinity Spread Arc'}
            </span>
            <h3 className="font-cinzel text-xl md:text-2xl font-bold text-zinc-100">
              {drawMode === 'single'
                ? 'Select Your Card of the Day'
                : `Draw Card ${spreadPickedCards.length + 1} of 3: ${
                    selectedSpreadPrompt.positions[Math.min(spreadPickedCards.length, 2)].label
                  }`}
            </h3>
            <p className="text-xs md:text-sm text-zinc-400">
              {drawMode === 'single'
                ? 'Allow your intuition to guide your hand. Tap any card in the arc when you feel the pull.'
                : selectedSpreadPrompt.positions[Math.min(spreadPickedCards.length, 2)].question}
            </p>
          </div>

          {/* 3-Card Spread Slots Indicator */}
          {drawMode === 'three_card' && (
            <div className="max-w-2xl mx-auto grid grid-cols-3 gap-3 p-3 rounded-2xl bg-[#0c0c0f] border border-white/10">
              {selectedSpreadPrompt.positions.map((pos, idx) => {
                const picked = spreadPickedCards[idx];
                const isCurrentTarget = spreadPickedCards.length === idx;
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      picked
                        ? 'bg-[#181820] border-amber-500/40 text-amber-200'
                        : isCurrentTarget
                        ? 'bg-[#121217] border-amber-400/50 text-amber-300 ring-2 ring-amber-400/20'
                        : 'bg-[#08080a] border-white/5 text-zinc-600'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold tracking-wider block truncate">
                      {pos.label}
                    </span>
                    <div className="mt-2 h-16 rounded-lg border border-dashed flex items-center justify-center text-xs">
                      {picked ? (
                        <div className="text-center px-1">
                          <span className="font-cinzel font-bold text-zinc-100 line-clamp-1 text-[11px]">
                            {picked.card.name}
                          </span>
                          <span className="text-[9px] text-amber-200/80 block">
                            {picked.isReversed ? 'Reversed' : 'Upright'}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-zinc-600 font-mono">
                          {isCurrentTarget ? '✦ Draw Here' : `Slot ${idx + 1}`}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Shuffle Deck Action */}
          <div className="flex justify-center">
            <button
              id="ritual-shuffle-deck-btn"
              onClick={handleShuffle}
              disabled={isShuffling}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0c0c0f] border border-amber-500/25 text-amber-200 text-xs font-medium hover:bg-[#16161c] transition-colors shadow-sm"
            >
              <Shuffle className={`w-3.5 h-3.5 ${isShuffling ? 'animate-spin' : ''}`} />
              <span>{isShuffling ? 'Shuffling Sacred Deck...' : 'Shuffle Deck'}</span>
            </button>
          </div>

          {/* Interactive Card Arc / Fan */}
          <div className="relative py-12 px-4 flex items-center justify-center min-h-[300px] overflow-hidden">
            <div className="relative flex items-center justify-center">
              {[...Array(9)].map((_, i) => {
                const rotation = (i - 4) * 6;
                const xOffset = (i - 4) * 28;
                const yOffset = Math.abs(i - 4) * 6;

                return (
                  <motion.div
                    key={i}
                    onClick={drawMode === 'single' ? handleSingleCardPick : handleSpreadCardPick}
                    animate={{
                      rotate: isShuffling ? (Math.random() - 0.5) * 30 : rotation,
                      x: isShuffling ? (Math.random() - 0.5) * 60 : xOffset,
                      y: isShuffling ? (Math.random() - 0.5) * 20 : yOffset,
                    }}
                    whileHover={{
                      y: yOffset - 30,
                      scale: 1.08,
                      zIndex: 30,
                      transition: { duration: 0.15 },
                    }}
                    className="absolute cursor-pointer transition-shadow"
                    style={{ zIndex: 10 + i }}
                  >
                    <TarotCardVisual isFaceDown size="md" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          <p className="text-xs text-amber-300/80 italic animate-pulse">
            {drawMode === 'single'
              ? '✦ Tap any card in the deck to reveal your daily message'
              : `✦ Tap a card in the arc to assign it to Position ${spreadPickedCards.length + 1}`}
          </p>
        </motion.div>
      )}

      {/* Step 3: Card Reveal & Educational Breakdown */}
      {step === 'reveal' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          {/* Header Title */}
          <div className="text-center space-y-1">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">
              {drawMode === 'single' ? 'Divine Revelation' : `Sacred Trinity: ${selectedSpreadPrompt.title}`}
            </span>
            <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-zinc-100">
              {drawMode === 'single'
                ? selectedSingleCard?.card.name
                : selectedSpreadPrompt.title}
            </h2>
            <p className="text-xs text-amber-200/80 font-serif italic">
              {drawMode === 'single'
                ? `${selectedSingleCard?.isReversed ? 'Reversed Orientation' : 'Upright Orientation'} • ${selectedSingleCard?.card.element} Element`
                : getElementalBreakdown()}
            </p>
          </div>

          {/* SINGLE CARD REVEAL VIEW */}
          {drawMode === 'single' && selectedSingleCard && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, rotateY: 180 }}
                  animate={{ scale: 1, rotateY: isSingleFlipped ? 0 : 180 }}
                  transition={{ duration: 0.8, type: 'spring' }}
                  className="transform-style-3d perspective-1000 shadow-2xl rounded-2xl"
                >
                  <TarotCardVisual
                    card={selectedSingleCard.card}
                    isReversed={selectedSingleCard.isReversed}
                    size="xl"
                  />
                </motion.div>
              </div>

              <div className="lg:col-span-7 space-y-5 bg-[#0c0c0f] p-6 rounded-2xl border border-amber-500/20 shadow-xl">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-amber-300 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>The Archetypal Wisdom</span>
                  </h4>
                  <p className="text-sm md:text-base text-zinc-200 leading-relaxed font-sans">
                    {selectedSingleCard.isReversed
                      ? selectedSingleCard.card.reversedMeaning
                      : selectedSingleCard.card.uprightMeaning}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
                    Key Resonance
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(selectedSingleCard.isReversed
                      ? selectedSingleCard.card.reversedKeywords
                      : selectedSingleCard.card.uprightKeywords
                    ).map((kw, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full text-xs bg-amber-500/10 border border-amber-500/25 text-amber-200/90 font-medium"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#121217] border border-amber-500/20">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
                    Daily Affirmation
                  </span>
                  <p className="font-serif italic text-amber-100 text-sm md:text-base mt-1">
                    "{selectedSingleCard.card.affirmation}"
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#121217] border border-white/5">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                    Daily Contemplation Question
                  </span>
                  <p className="text-zinc-300 text-xs md:text-sm mt-1">
                    {selectedSingleCard.card.dailyContemplation}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    id="ritual-proceed-to-journal-btn"
                    onClick={handleProceedToJournal}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-[#08080a] font-bold font-cinzel tracking-wider text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-400/30 transition-all flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Record in Daily Journal</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3-CARD SPREAD REVEAL VIEW */}
          {drawMode === 'three_card' && spreadPickedCards.length === 3 && (
            <div className="space-y-8">
              {/* The 3 Cards Laid Out Side-by-Side */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {spreadPickedCards.map((item, idx) => {
                  const pos = selectedSpreadPrompt.positions[idx];
                  const isFocused = focusedCardIndex === idx;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.15 }}
                      onClick={() => setFocusedCardIndex(idx)}
                      className={`cursor-pointer p-4 rounded-2xl border transition-all flex flex-col items-center text-center space-y-3 ${
                        isFocused
                          ? 'bg-[#121217] border-amber-500/50 shadow-2xl ring-2 ring-amber-400/20'
                          : 'bg-[#0c0c0f] border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
                          {pos.label}
                        </span>
                        <p className="text-[11px] text-zinc-400 italic line-clamp-1">
                          {pos.question}
                        </p>
                      </div>

                      {/* 3D Visual Card */}
                      <TarotCardVisual
                        card={item.card}
                        isReversed={item.isReversed}
                        size="md"
                        className="shadow-xl hover:scale-105 transition-transform"
                      />

                      <div className="space-y-1">
                        <h4 className="font-cinzel text-sm font-bold text-zinc-100">
                          {item.card.name}
                        </h4>
                        <span className="text-[10px] uppercase font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-200 border border-amber-500/25">
                          {item.isReversed ? 'Reversed' : 'Upright'} • {item.card.element}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-300 font-sans line-clamp-3 leading-relaxed text-left pt-1">
                        {item.isReversed ? item.card.reversedMeaning : item.card.uprightMeaning}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Focused Card Detail & Holistic Synthesis Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0c0c0f] p-6 rounded-2xl border border-amber-500/30 shadow-2xl">
                {/* Left: Focused Card Archetype */}
                <div className="lg:col-span-6 space-y-4 border-b lg:border-b-0 lg:border-r border-white/5 pb-6 lg:pb-0 lg:pr-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold tracking-widest text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Focused Position: {selectedSpreadPrompt.positions[focusedCardIndex].label}</span>
                    </span>
                    <span className="text-xs text-zinc-400 font-cinzel">
                      Card {focusedCardIndex + 1} of 3
                    </span>
                  </div>

                  <h3 className="font-cinzel text-xl font-bold text-zinc-100">
                    {spreadPickedCards[focusedCardIndex].card.name}
                  </h3>
                  
                  <p className="text-xs text-amber-200/90 italic font-cinzel">
                    {spreadPickedCards[focusedCardIndex].card.esotericTitle}
                  </p>

                  <p className="text-xs md:text-sm text-zinc-200 leading-relaxed font-sans">
                    {spreadPickedCards[focusedCardIndex].isReversed
                      ? spreadPickedCards[focusedCardIndex].card.reversedMeaning
                      : spreadPickedCards[focusedCardIndex].card.uprightMeaning}
                  </p>

                  <div className="p-3 rounded-xl bg-[#121217] border border-amber-500/20 text-xs">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block mb-1">
                      Affirmation
                    </span>
                    <p className="italic text-amber-100 font-serif">
                      "{spreadPickedCards[focusedCardIndex].card.affirmation}"
                    </p>
                  </div>
                </div>

                {/* Right: Trinitarian Holistic Synthesis */}
                <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-xs uppercase font-bold tracking-widest text-amber-300 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Holistic Spread Synthesis</span>
                    </span>

                    <div className="p-3.5 rounded-xl bg-[#121217] border border-white/5 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-zinc-300">Elemental Dynamics:</span>
                        <span className="text-amber-200 font-medium">{getElementalBreakdown()}</span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {selectedSpreadPrompt.synthesisGuide}
                      </p>
                    </div>

                    <div className="space-y-1.5 text-xs text-zinc-300">
                      <p>
                        ✦ <strong>Narrative Arc:</strong> {spreadPickedCards[0].card.name} establishes the roots, {spreadPickedCards[1].card.name} challenges or channels present awareness, and {spreadPickedCards[2].card.name} offers the emergent wisdom.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <button
                      id="ritual-proceed-to-journal-btn"
                      onClick={handleProceedToJournal}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-[#08080a] font-bold font-cinzel tracking-wider text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-400/30 transition-all flex items-center justify-center gap-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Record 3-Card Spread in Journal</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Step 4: Record in Private Daily Journal */}
      {step === 'journal' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-[#0c0c0f] p-6 md:p-8 rounded-2xl border border-amber-500/30 shadow-2xl space-y-6"
        >
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                Private Sanctuary Log
              </span>
              <h3 className="font-cinzel text-xl font-bold text-zinc-100">
                {drawMode === 'single' ? 'Journal Your Daily Reflection' : `Journal: ${selectedSpreadPrompt.title}`}
              </h3>
            </div>
            <div className="text-right">
              <span className="font-cinzel text-xs md:text-sm text-amber-200">
                {drawMode === 'single'
                  ? selectedSingleCard?.card.name
                  : `3 Cards • ${selectedSpreadPrompt.title}`}
              </span>
              <p className="text-[11px] text-zinc-500">
                {drawMode === 'single'
                  ? selectedSingleCard?.isReversed ? 'Reversed' : 'Upright'
                  : 'Sacred Spread'}
              </p>
            </div>
          </div>

          {/* Mood Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>Your Current Energy / Mood</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {MOODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMood(m.label)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                    mood === m.label
                      ? 'bg-amber-500/15 border-amber-400/50 text-amber-200 shadow-sm'
                      : 'bg-[#08080a] border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/10'
                  }`}
                >
                  <span className="text-base">{m.icon}</span>
                  <span className="truncate">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Journal Reflection Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <Feather className="w-3.5 h-3.5 text-amber-300" />
              <span>Personal Reflection & Insights</span>
            </label>
            <textarea
              id="ritual-journal-reflection-input"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What thoughts, intuitive nudges, or everyday connections come to mind with this reading? Write freely in your private sanctuary..."
              rows={drawMode === 'three_card' ? 8 : 5}
              className="w-full px-4 py-3 rounded-xl bg-[#08080a] border border-white/10 text-zinc-100 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/30 transition-all resize-y font-mono text-xs md:text-sm leading-relaxed"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-zinc-400" />
              <span>Theme Tags</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleToggleTag(tag)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-400/40 text-amber-200'
                        : 'bg-[#08080a] border-white/5 text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>

            {/* Custom Tag Input */}
            <form onSubmit={handleAddCustomTag} className="flex gap-2 pt-1">
              <input
                type="text"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                placeholder="Add custom tag..."
                className="px-3 py-1.5 rounded-lg bg-[#08080a] border border-white/10 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-amber-400/60"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-[#181820] hover:bg-[#20202a] text-xs text-zinc-300 font-medium"
              >
                + Add
              </button>
            </form>
          </div>

          {/* Save Action */}
          <div className="pt-4 border-t border-white/5 flex gap-3">
            <button
              id="ritual-save-reading-btn"
              onClick={handleSaveToJournal}
              className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-[#08080a] font-bold font-cinzel tracking-wider text-sm shadow-xl shadow-amber-500/20 hover:shadow-amber-400/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Complete Ritual & Save Reading</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
