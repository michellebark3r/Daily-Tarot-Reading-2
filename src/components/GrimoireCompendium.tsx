import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_TAROT_CARDS, getTarotCardById } from '../data/tarotCards';
import {
  FOOLS_JOURNEY,
  ELEMENT_LEARNING_GUIDES,
  NUMEROLOGY_GUIDE,
  COURT_CARDS_GUIDE,
  TAROT_QUIZ_QUESTIONS,
} from '../data/tarotLearningData';
import { TarotCard, TarotQuizQuestion, FoolsJourneyStage } from '../types';
import { TarotCardVisual } from './TarotCardVisual';
import {
  Search,
  BookOpen,
  Sparkles,
  Flame,
  Droplets,
  Wind,
  Mountain,
  Compass,
  Briefcase,
  Heart,
  X,
  Info,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Award,
  Layers,
  Moon,
  Sun,
  Shield,
  GraduationCap,
  Feather,
} from 'lucide-react';

export const GrimoireCompendium: React.FC = () => {
  // Top Study Section
  const [studySection, setStudySection] = useState<'grimoire' | 'fools_journey' | 'suits_elements' | 'quiz'>('grimoire');

  // Grimoire State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'major' | 'wands' | 'cups' | 'swords' | 'pentacles'>('all');
  const [selectedElement, setSelectedElement] = useState<string>('all');
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [modalReversed, setModalReversed] = useState(false);

  // Fool's Journey State
  const [selectedAct, setSelectedAct] = useState<1 | 2 | 3 | 'all'>('all');
  const [activeFoolStage, setActiveFoolStage] = useState<FoolsJourneyStage | null>(FOOLS_JOURNEY[0]);

  // Suits & Elements State
  const [activeElementTab, setActiveElementTab] = useState<'elements' | 'numerology' | 'court'>('elements');
  const [selectedSuit, setSelectedSuit] = useState<'wands' | 'cups' | 'swords' | 'pentacles'>('wands');

  // Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizFilterCategory, setQuizFilterCategory] = useState<string>('all');

  // Filtered Quiz Questions
  const filteredQuestions = TAROT_QUIZ_QUESTIONS.filter((q) => {
    if (quizFilterCategory === 'all') return true;
    return q.category === quizFilterCategory;
  });
  const currentQuestion: TarotQuizQuestion | undefined = filteredQuestions[currentQuizIndex];

  // Reset Quiz
  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !currentQuestion) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex + 1 < filteredQuestions.length) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  // Filter cards in Grimoire
  const filteredCards = ALL_TAROT_CARDS.filter((card) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = card.name.toLowerCase().includes(q);
      const matchTitle = card.esotericTitle.toLowerCase().includes(q);
      const matchKeywords = card.uprightKeywords.some((k) => k.toLowerCase().includes(q));
      const matchSummary = card.summary.toLowerCase().includes(q);
      if (!matchName && !matchTitle && !matchKeywords && !matchSummary) {
        return false;
      }
    }

    if (selectedCategory === 'major' && card.arcana !== 'major') return false;
    if (selectedCategory === 'wands' && card.suit !== 'wands') return false;
    if (selectedCategory === 'cups' && card.suit !== 'cups') return false;
    if (selectedCategory === 'swords' && card.suit !== 'swords') return false;
    if (selectedCategory === 'pentacles' && card.suit !== 'pentacles') return false;

    if (selectedElement !== 'all' && card.element !== selectedElement) return false;

    return true;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-200 shadow-md">
          <BookOpen className="w-6 h-6 text-amber-300" />
        </div>
        <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-zinc-100 tracking-wide">
          Tarot Academy & Compendium
        </h2>
        <p className="text-xs md:text-sm text-zinc-400 font-sans leading-relaxed">
          Master the esoteric language of Tarot. Explore the complete 78-card grimoire, walk the 22 stages of the Fool's Journey, decode sacred numerology, and test your intuitive discernment.
        </p>
      </div>

      {/* Main Study Navigation Tabs */}
      <div className="bg-[#0c0c0f] p-1.5 rounded-2xl border border-white/10 flex flex-wrap gap-1 shadow-lg max-w-2xl mx-auto">
        {[
          { id: 'grimoire', label: '78-Card Grimoire', icon: BookOpen },
          { id: 'fools_journey', label: "The Fool's Journey", icon: Compass },
          { id: 'suits_elements', label: 'Elements & Suits', icon: Sparkles },
          { id: 'quiz', label: 'Tarot Mastery Quiz', icon: GraduationCap },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = studySection === tab.id;
          return (
            <button
              key={tab.id}
              id={`study-tab-${tab.id}`}
              type="button"
              onClick={() => setStudySection(tab.id as any)}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-cinzel font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                isActive
                  ? 'bg-[#181820] text-amber-200 border border-amber-500/40 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#121217]'
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-amber-300" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: 78-CARD ENCYCLOPEDIA */}
      {studySection === 'grimoire' && (
        <div className="space-y-6">
          {/* Filter & Search Bar */}
          <div className="bg-[#0c0c0f] p-4 rounded-2xl border border-white/5 space-y-3 shadow-lg">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                id="grimoire-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search card name, archetype, keyword (e.g. 'The Fool', 'Intuition', 'Rebirth')..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#08080a] border border-white/10 text-xs md:text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-amber-400/60"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { id: 'all', label: 'All 78 Cards' },
                { id: 'major', label: 'Major Arcana (22)' },
                { id: 'wands', label: 'Wands (Fire)' },
                { id: 'cups', label: 'Cups (Water)' },
                { id: 'swords', label: 'Swords (Air)' },
                { id: 'pentacles', label: 'Pentacles (Earth)' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-[#181820] border-amber-500/30 text-amber-200 shadow-sm'
                      : 'bg-[#08080a] border-white/5 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredCards.map((card) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -4, transition: { duration: 0.15 } }}
                onClick={() => {
                  setSelectedCard(card);
                  setModalReversed(false);
                }}
                className="cursor-pointer flex flex-col items-center group"
              >
                <TarotCardVisual
                  card={card}
                  size="sm"
                  showDetails={false}
                  className="w-full aspect-[2/3] h-auto shadow-md group-hover:border-amber-400/40 transition-colors"
                />
                <span className="font-cinzel text-xs text-zinc-200 group-hover:text-amber-200 font-bold mt-2 text-center line-clamp-1 transition-colors">
                  {card.name}
                </span>
                <span className="text-[10px] text-zinc-500 font-sans capitalize">
                  {card.arcana === 'major' ? 'Major Arcana' : card.suit}
                </span>
              </motion.div>
            ))}
          </div>

          {filteredCards.length === 0 && (
            <div className="text-center py-16 text-zinc-500">
              <p>No cards found matching your query.</p>
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: THE FOOL'S JOURNEY (MAJOR ARCANA PILGRIMAGE) */}
      {studySection === 'fools_journey' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-[#0c0c0f] border border-amber-500/30 shadow-lg space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h3 className="font-cinzel text-lg font-bold text-zinc-100">
                  The Fool's Psycho-Spiritual Journey
                </h3>
                <p className="text-xs text-zinc-400">
                  The 22 Major Arcana represent the universal soul's pilgrimage from innocent beginnings to ultimate cosmic integration.
                </p>
              </div>

              {/* Act Filter */}
              <div className="flex gap-1.5">
                {[
                  { id: 'all', label: 'All 3 Acts' },
                  { id: 1, label: 'Act I: Persona' },
                  { id: 2, label: 'Act II: Shadow' },
                  { id: 3, label: 'Act III: Cosmic' },
                ].map((act) => (
                  <button
                    key={act.id}
                    onClick={() => setSelectedAct(act.id as any)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                      selectedAct === act.id
                        ? 'bg-[#181820] border-amber-500/40 text-amber-200'
                        : 'bg-[#08080a] border-white/5 text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {act.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stepper Timeline Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-2">
              {FOOLS_JOURNEY.filter((stg) => selectedAct === 'all' || stg.act === selectedAct).map((stage) => {
                const isSelected = activeFoolStage?.cardId === stage.cardId;
                return (
                  <button
                    key={stage.cardId}
                    onClick={() => setActiveFoolStage(stage)}
                    className={`shrink-0 px-2.5 py-1.5 rounded-lg border text-xs font-cinzel transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-amber-100 font-bold shadow-md'
                        : 'bg-[#08080a] border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/10'
                    }`}
                  >
                    <span>{stage.name.split('.')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stage Detailed Showcase */}
          {activeFoolStage && (() => {
            const stageCard = getTarotCardById(activeFoolStage.cardId);
            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#0c0c0f] p-6 md:p-8 rounded-2xl border border-white/5 shadow-2xl">
                {/* Left Card Visual */}
                <div className="lg:col-span-4 flex flex-col items-center space-y-3">
                  {stageCard && (
                    <TarotCardVisual
                      card={stageCard}
                      size="lg"
                      className="shadow-2xl hover:scale-105 transition-transform"
                    />
                  )}
                  <span className="text-[11px] uppercase font-bold tracking-widest text-amber-300 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25">
                    Stage {activeFoolStage.step} of 21
                  </span>
                </div>

                {/* Right Stage Educational Content */}
                <div className="lg:col-span-8 space-y-4">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-widest text-amber-300/80">
                      {activeFoolStage.actTitle}
                    </span>
                    <h3 className="font-cinzel text-2xl font-bold text-zinc-100">
                      {activeFoolStage.name} — {activeFoolStage.lessonTitle}
                    </h3>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#121217] border border-amber-500/20 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Jungian Archetype</span>
                    </span>
                    <p className="text-xs md:text-sm text-amber-100 font-medium">
                      {activeFoolStage.psychologicalArchetype}
                    </p>
                  </div>

                  <div className="space-y-1 text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
                    <h5 className="font-bold text-zinc-200">Mythological & Esoteric Allegory:</h5>
                    <p>{activeFoolStage.mythologicalAllegory}</p>
                  </div>

                  {stageCard && (
                    <div className="space-y-1 text-xs md:text-sm text-zinc-400 leading-relaxed">
                      <h5 className="font-bold text-zinc-200">The Initiate's Lesson:</h5>
                      <p>{stageCard.uprightMeaning}</p>
                    </div>
                  )}

                  <div className="p-4 rounded-xl bg-[#08080a] border border-white/10 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider flex items-center gap-1.5">
                      <Feather className="w-3.5 h-3.5 text-amber-300" />
                      <span>Soul Reflection Inquiry</span>
                    </span>
                    <p className="font-serif italic text-amber-200 text-xs md:text-sm">
                      "{activeFoolStage.reflectionPrompt}"
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* SECTION 3: SUITS, ELEMENTS & NUMEROLOGY */}
      {studySection === 'suits_elements' && (
        <div className="space-y-6">
          {/* Sub-tab navigation */}
          <div className="flex gap-2 border-b border-white/5 pb-3">
            {[
              { id: 'elements', label: 'The 4 Classical Elements & Suits' },
              { id: 'numerology', label: 'Minor Arcana Numerology (1-10)' },
              { id: 'court', label: 'Court Card Hierarchy' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setActiveElementTab(st.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold border transition-all ${
                  activeElementTab === st.id
                    ? 'bg-[#181820] border-amber-500/40 text-amber-200 shadow-sm'
                    : 'bg-[#0c0c0f] border-white/5 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Sub-tab 1: The 4 Elements & Suits */}
          {activeElementTab === 'elements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ELEMENT_LEARNING_GUIDES.map((guide) => (
                <div
                  key={guide.suit}
                  className="p-6 rounded-2xl bg-[#0c0c0f] border border-white/10 shadow-xl space-y-4 hover:border-amber-500/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md"
                        style={{ backgroundColor: `${guide.color}20`, border: `1px solid ${guide.color}40` }}
                      >
                        {guide.suit === 'wands' && <Flame className="w-5 h-5 text-red-400" />}
                        {guide.suit === 'cups' && <Droplets className="w-5 h-5 text-blue-400" />}
                        {guide.suit === 'swords' && <Wind className="w-5 h-5 text-purple-400" />}
                        {guide.suit === 'pentacles' && <Mountain className="w-5 h-5 text-emerald-400" />}
                      </div>
                      <div>
                        <h4 className="font-cinzel text-base font-bold text-zinc-100">
                          {guide.name}
                        </h4>
                        <span className="text-[11px] text-zinc-400 font-sans">
                          Element: {guide.element} • {guide.astrologicalSigns}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    {guide.corePhilosophy}
                  </p>

                  <div className="p-3 rounded-xl bg-[#08080a] border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300 block">
                      Realm of Human Experience
                    </span>
                    <p className="text-xs text-zinc-300">{guide.realm}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-red-400/90 block">
                      Shadow / Imbalance State
                    </span>
                    <p className="text-xs text-zinc-400">{guide.shadowManifestation}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#121217] border border-amber-500/20">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300 block">
                      How to Read in a Spread
                    </span>
                    <p className="text-xs text-amber-100/90 italic font-sans">{guide.howToRead}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Sub-tab 2: Numerology 1-10 */}
          {activeElementTab === 'numerology' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {NUMEROLOGY_GUIDE.map((num) => (
                <div
                  key={num.number}
                  className="p-4 rounded-xl bg-[#0c0c0f] border border-white/5 hover:border-amber-500/30 transition-colors space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-200 font-cinzel font-bold text-xs flex items-center justify-center">
                      {num.number}
                    </div>
                    <h4 className="font-cinzel text-sm font-bold text-zinc-100">
                      {num.title}
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    <strong>Esoteric Meaning:</strong> {num.esotericMeaning}
                  </p>
                  <p className="text-xs text-amber-200/80 italic font-serif">
                    ✦ {num.lesson}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Sub-tab 3: Court Cards Hierarchy */}
          {activeElementTab === 'court' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COURT_CARDS_GUIDE.map((court) => (
                <div
                  key={court.rank}
                  className="p-6 rounded-2xl bg-[#0c0c0f] border border-white/10 shadow-xl space-y-3"
                >
                  <h4 className="font-cinzel text-base font-bold text-amber-200">
                    {court.rank}
                  </h4>
                  <div className="space-y-1 text-xs">
                    <p className="text-zinc-400">
                      <strong>Elemental Quality:</strong> {court.elementalQuality}
                    </p>
                    <p className="text-zinc-400">
                      <strong>Archetypal Role:</strong> {court.psychologicalRole}
                    </p>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {court.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 4: TAROT MASTERY QUIZ */}
      {studySection === 'quiz' && (
        <div className="max-w-2xl mx-auto bg-[#0c0c0f] p-6 md:p-8 rounded-2xl border border-amber-500/30 shadow-2xl space-y-6">
          {!quizFinished ? (
            <>
              {/* Quiz Header & Category Filters */}
              <div className="space-y-3 border-b border-white/5 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-widest text-amber-300 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    <span>Question {currentQuizIndex + 1} of {filteredQuestions.length}</span>
                  </span>
                  <span className="font-mono text-xs text-zinc-400 font-bold">
                    Score: {score} / {filteredQuestions.length}
                  </span>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-1">
                  {['all', 'Major Arcana', 'Minor Arcana', 'Symbolism', 'Reversals', 'Elements & Astrology'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setQuizFilterCategory(cat);
                        handleRestartQuiz();
                      }}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium border transition-colors ${
                        quizFilterCategory === cat
                          ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                          : 'bg-[#08080a] border-white/5 text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {cat === 'all' ? 'All Questions' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {currentQuestion && (
                <div className="space-y-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#181820] text-amber-300 border border-white/5">
                        {currentQuestion.category}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#181820] text-zinc-400 border border-white/5">
                        {currentQuestion.difficulty}
                      </span>
                    </div>
                    <h3 className="font-cinzel text-base md:text-lg font-bold text-zinc-100 leading-snug pt-2">
                      {currentQuestion.prompt}
                    </h3>
                  </div>

                  {/* Multiple Choice Options */}
                  <div className="space-y-2.5">
                    {currentQuestion.options.map((option, optIdx) => {
                      const isSelected = selectedOption === optIdx;
                      const isCorrect = optIdx === currentQuestion.correctIndex;
                      
                      let optionStyle = 'bg-[#08080a] border-white/5 text-zinc-300 hover:border-amber-400/40';
                      if (isAnswerSubmitted) {
                        if (isCorrect) {
                          optionStyle = 'bg-emerald-950/30 border-emerald-500/60 text-emerald-200';
                        } else if (isSelected && !isCorrect) {
                          optionStyle = 'bg-rose-950/30 border-rose-500/60 text-rose-200';
                        } else {
                          optionStyle = 'bg-[#08080a] border-white/5 text-zinc-600 opacity-60';
                        }
                      } else if (isSelected) {
                        optionStyle = 'bg-amber-500/15 border-amber-400/60 text-amber-200';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(optIdx)}
                          disabled={isAnswerSubmitted}
                          className={`w-full p-3.5 rounded-xl border text-left text-xs md:text-sm font-sans flex items-center justify-between gap-3 transition-all ${optionStyle}`}
                        >
                          <span>{option}</span>
                          {isAnswerSubmitted && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                          {isAnswerSubmitted && isSelected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Answer Explanation Box */}
                  {isAnswerSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-[#121217] border border-amber-500/30 space-y-1.5"
                    >
                      <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300 block">
                        ✦ Esoteric Wisdom Explanation
                      </span>
                      <p className="text-xs text-zinc-200 font-sans leading-relaxed">
                        {currentQuestion.explanation}
                      </p>
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-2">
                    {!isAnswerSubmitted ? (
                      <button
                        type="button"
                        onClick={handleSubmitAnswer}
                        disabled={selectedOption === null}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-[#08080a] font-bold font-cinzel text-xs uppercase tracking-wider disabled:opacity-40 transition-opacity"
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNextQuestion}
                        className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#08080a] font-bold font-cinzel text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                      >
                        <span>{currentQuizIndex + 1 < filteredQuestions.length ? 'Next Question' : 'View Final Score'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Quiz Completion Screen */
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-300">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="font-cinzel text-2xl font-bold text-zinc-100">
                  Quiz Completed
                </h3>
                <p className="text-sm text-zinc-400">
                  You scored <strong className="text-amber-200">{score}</strong> out of{' '}
                  <strong className="text-zinc-200">{filteredQuestions.length}</strong>!
                </p>
              </div>

              <p className="text-xs text-zinc-300 font-serif italic max-w-md mx-auto">
                {score === filteredQuestions.length
                  ? 'Mastery attained! You possess a deep, comprehensive intuition for the esoteric symbols and paths of the tarot.'
                  : score >= filteredQuestions.length / 2
                  ? 'Impressive foundation. Your understanding of archetypes is flourishing with steady practice.'
                  : 'The journey of the seeker is one of patient unfolding. Return to the Grimoire and study the cards daily.'}
              </p>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleRestartQuiz}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#181820] hover:bg-[#22222c] border border-amber-500/30 text-amber-200 font-cinzel text-xs font-bold transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restart Quiz</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Detailed Card Study Modal (from Grimoire) */}
      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08080a]/90 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-[#0c0c0f] border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto space-y-6"
            >
              <button
                id="grimoire-modal-close-btn"
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-[#08080a] border border-white/10 text-zinc-400 hover:text-zinc-100 hover:border-white/20 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row items-center gap-6 border-b border-white/5 pb-6">
                <div className="shrink-0 flex flex-col items-center gap-2">
                  <TarotCardVisual
                    card={selectedCard}
                    isReversed={modalReversed}
                    size="md"
                    className="shadow-2xl"
                  />
                  <button
                    onClick={() => setModalReversed(!modalReversed)}
                    className="px-3 py-1 rounded-full bg-[#08080a] border border-white/10 text-xs text-amber-200 hover:bg-[#181820] transition-colors"
                  >
                    Flip: {modalReversed ? 'Reversed' : 'Upright'}
                  </button>
                </div>

                <div className="space-y-3 flex-1 text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    <span className="text-xs uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-200 border border-amber-500/25">
                      {selectedCard.arcana === 'major' ? 'Major Arcana' : `Suit of ${selectedCard.suit}`}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#08080a] text-zinc-400 border border-white/5">
                      Element: {selectedCard.element}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#08080a] text-zinc-400 border border-white/5">
                      {selectedCard.astrologicalCorrespondence}
                    </span>
                  </div>

                  <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-zinc-100">
                    {selectedCard.name}
                  </h3>
                  <p className="text-xs text-amber-200/90 italic font-cinzel">
                    {selectedCard.esotericTitle}
                  </p>
                  <p className="text-xs md:text-sm text-zinc-300 font-sans leading-relaxed">
                    {selectedCard.summary}
                  </p>
                </div>
              </div>

              {/* Meanings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#08080a] border border-white/5 space-y-2">
                  <span className="text-xs uppercase font-bold tracking-widest text-amber-300 block">
                    Upright Orientation
                  </span>
                  <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
                    {selectedCard.uprightMeaning}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {selectedCard.uprightKeywords.map((kw, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-[#181820] text-amber-200 border border-white/5">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#08080a] border border-white/5 space-y-2">
                  <span className="text-xs uppercase font-bold tracking-widest text-rose-300 block">
                    Reversed Orientation
                  </span>
                  <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
                    {selectedCard.reversedMeaning}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {selectedCard.reversedKeywords.map((kw, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-[#181820] text-rose-200 border border-white/5">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Symbolism */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-widest text-amber-300 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Symbolism & Esoteric Codes</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedCard.symbolism.map((sym, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#08080a] border border-white/5">
                      <span className="font-cinzel text-xs font-bold text-amber-200 block mb-0.5">
                        ✦ {sym.symbol}
                      </span>
                      <p className="text-xs text-zinc-400">{sym.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Affirmation & Contemplation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#121217] border border-amber-500/20">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block">
                    Daily Affirmation
                  </span>
                  <p className="font-serif italic text-amber-100 text-xs md:text-sm mt-1">
                    "{selectedCard.affirmation}"
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#121217] border border-white/5">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 block">
                    Contemplation Prompt
                  </span>
                  <p className="text-zinc-300 text-xs md:text-sm mt-1">
                    {selectedCard.dailyContemplation}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
