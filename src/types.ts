export type ArcanaType = 'major' | 'minor';
export type SuitType = 'wands' | 'cups' | 'swords' | 'pentacles';
export type ElementType = 'Fire' | 'Water' | 'Air' | 'Earth' | 'Spirit';

export interface CardSymbol {
  symbol: string;
  description: string;
  esotericMeaning?: string;
}

export interface LifeSpheres {
  career: string;
  love: string;
  spirituality: string;
  advice: string;
}

export interface TarotCard {
  id: string;
  name: string;
  number: number;
  romanNumeral?: string;
  arcana: ArcanaType;
  suit: SuitType | null;
  element: ElementType;
  astrologicalCorrespondence: string;
  esotericTitle: string;
  summary: string;
  uprightKeywords: string[];
  reversedKeywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  symbolism: CardSymbol[];
  lifeSpheres: LifeSpheres;
  dailyContemplation: string;
  affirmation: string;
  artTheme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    icon: string;
    sceneDescription: string;
  };
}

export interface SpreadPosition {
  index: number;
  label: string;
  question: string;
  iconName?: string;
}

export interface SpreadPrompt {
  id: string;
  title: string;
  subtitle: string;
  category: 'General' | 'Self-Growth' | 'Decision & Guidance' | 'Love & Connection' | 'Shadow & Healing';
  positions: [SpreadPosition, SpreadPosition, SpreadPosition];
  synthesisGuide: string;
}

export interface SpreadCardSelection {
  cardId: string;
  isReversed: boolean;
  positionLabel: string;
  positionQuestion?: string;
}

export interface DailyReading {
  id: string;
  date: string; // YYYY-MM-DD
  timestamp: number;
  cardId: string; // primary card or 1st card
  isReversed: boolean;
  spreadType?: 'single' | 'three_card';
  spreadPromptId?: string;
  spreadPromptTitle?: string;
  spreadCards?: SpreadCardSelection[];
  intention?: string;
  userNotes?: string;
  mood?: string;
  tags?: string[];
  aiInsights?: string;
  bookmarked?: boolean;
}

export interface TarotQuizQuestion {
  id: string;
  category: 'Major Arcana' | 'Minor Arcana' | 'Symbolism' | 'Reversals' | 'Elements & Astrology';
  difficulty: 'Beginner' | 'Intermediate' | 'Adept';
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  relatedCardId?: string;
}

export interface FoolsJourneyStage {
  step: number;
  cardId: string;
  name: string;
  act: 1 | 2 | 3;
  actTitle: string;
  psychologicalArchetype: string;
  lessonTitle: string;
  mythologicalAllegory: string;
  reflectionPrompt: string;
}

export interface AppSettings {
  allowReversals: boolean;
  soundEnabled: boolean;
  journalPin?: string;
  dailyReminderEnabled?: boolean;
  reminderTime?: string;
  practiceModeUnlocked?: boolean; // strictly for testing / practice if enabled in settings
}

export interface TarotStats {
  totalReadings: number;
  currentStreak: number;
  longestStreak: number;
  majorCount: number;
  minorCount: number;
  suitCounts: Record<SuitType, number>;
  elementCounts: Record<ElementType, number>;
  moodCounts: Record<string, number>;
  topCards: { cardId: string; count: number }[];
}
