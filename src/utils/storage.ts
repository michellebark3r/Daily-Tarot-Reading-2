import { DailyReading, AppSettings, TarotStats, SuitType, ElementType } from '../types';
import { getTarotCardById } from '../data/tarotCards';

const READINGS_KEY = 'arcana_daily_readings_v1';
const SETTINGS_KEY = 'arcana_daily_settings_v1';

export const DEFAULT_SETTINGS: AppSettings = {
  allowReversals: true,
  soundEnabled: true,
  dailyReminderEnabled: false,
  reminderTime: '08:00',
  practiceModeUnlocked: false,
};

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getAppSettings(): AppSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveAppSettings(settings: AppSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
}

export function getAllReadings(): DailyReading[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(READINGS_KEY);
    if (!raw) return [];
    const readings: DailyReading[] = JSON.parse(raw);
    return readings.sort((a, b) => b.timestamp - a.timestamp);
  } catch (e) {
    console.error('Failed to load readings:', e);
    return [];
  }
}

export function getTodayReading(): DailyReading | null {
  const todayStr = getTodayDateString();
  const readings = getAllReadings();
  return readings.find((r) => r.date === todayStr) || null;
}

export function hasDrawnToday(): boolean {
  return getTodayReading() !== null;
}

export function saveDailyReading(reading: DailyReading): void {
  if (typeof window === 'undefined') return;
  try {
    const readings = getAllReadings();
    // Replace if same date exists, else prepend
    const existingIndex = readings.findIndex((r) => r.date === reading.date);
    if (existingIndex >= 0) {
      readings[existingIndex] = reading;
    } else {
      readings.unshift(reading);
    }
    localStorage.setItem(READINGS_KEY, JSON.stringify(readings));
  } catch (e) {
    console.error('Failed to save daily reading:', e);
  }
}

export function updateReading(id: string, updates: Partial<DailyReading>): void {
  if (typeof window === 'undefined') return;
  try {
    const readings = getAllReadings();
    const targetIndex = readings.findIndex((r) => r.id === id);
    if (targetIndex >= 0) {
      readings[targetIndex] = { ...readings[targetIndex], ...updates };
      localStorage.setItem(READINGS_KEY, JSON.stringify(readings));
    }
  } catch (e) {
    console.error('Failed to update reading:', e);
  }
}

export function deleteReading(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const readings = getAllReadings().filter((r) => r.id !== id);
    localStorage.setItem(READINGS_KEY, JSON.stringify(readings));
  } catch (e) {
    console.error('Failed to delete reading:', e);
  }
}

export function calculateStreaks(readings: DailyReading[]): { currentStreak: number; longestStreak: number } {
  if (readings.length === 0) return { currentStreak: 0, longestStreak: 0 };

  const sortedDates = Array.from(new Set(readings.map((r) => r.date))).sort().reverse();
  const today = getTodayDateString();
  
  // Calculate current streak
  let currentStreak = 0;
  let checkDate = new Date();
  
  // Check if today was drawn; if not, check if yesterday was drawn
  const todayInList = sortedDates.includes(today);
  if (!todayInList) {
    checkDate.setDate(checkDate.getDate() - 1);
  }

  while (true) {
    const year = checkDate.getFullYear();
    const month = String(checkDate.getMonth() + 1).padStart(2, '0');
    const day = String(checkDate.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    if (sortedDates.includes(dateStr)) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  // Calculate longest streak
  let longestStreak = 0;
  let tempStreak = 0;
  let previousTimestamp: number | null = null;

  const chronologicalDates = [...sortedDates].reverse();
  for (const dStr of chronologicalDates) {
    const parts = dStr.split('-').map(Number);
    const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
    const currentDayTime = dateObj.getTime();

    if (previousTimestamp === null) {
      tempStreak = 1;
    } else {
      const diffDays = Math.round((currentDayTime - previousTimestamp) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        tempStreak++;
      } else if (diffDays > 1) {
        tempStreak = 1;
      }
    }
    previousTimestamp = currentDayTime;
    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
    }
  }

  return {
    currentStreak,
    longestStreak: Math.max(longestStreak, currentStreak),
  };
}

export function getTimeUntilMidnight(): { hours: number; minutes: number; seconds: number } {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);

  const diffMs = midnight.getTime() - now.getTime();
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
}

export function computeTarotStats(readings: DailyReading[]): TarotStats {
  const { currentStreak, longestStreak } = calculateStreaks(readings);
  
  let majorCount = 0;
  let minorCount = 0;
  const suitCounts: Record<SuitType, number> = { wands: 0, cups: 0, swords: 0, pentacles: 0 };
  const elementCounts: Record<ElementType, number> = { Fire: 0, Water: 0, Air: 0, Earth: 0, Spirit: 0 };
  const moodCounts: Record<string, number> = {};
  const cardFrequency: Record<string, number> = {};

  readings.forEach((r) => {
    // If it's a 3-card spread, count all cards in the spread
    const cardIds = r.spreadCards && r.spreadCards.length > 0
      ? r.spreadCards.map((sc) => sc.cardId)
      : [r.cardId];

    cardIds.forEach((cId) => {
      const card = getTarotCardById(cId);
      if (card) {
        if (card.arcana === 'major') {
          majorCount++;
        } else {
          minorCount++;
        }

        if (card.suit && suitCounts[card.suit] !== undefined) {
          suitCounts[card.suit]++;
        }

        if (card.element && elementCounts[card.element] !== undefined) {
          elementCounts[card.element]++;
        }

        cardFrequency[card.id] = (cardFrequency[card.id] || 0) + 1;
      }
    });

    if (r.mood) {
      moodCounts[r.mood] = (moodCounts[r.mood] || 0) + 1;
    }
  });

  const topCards = Object.entries(cardFrequency)
    .map(([cardId, count]) => ({ cardId, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalReadings: readings.length,
    currentStreak,
    longestStreak,
    majorCount,
    minorCount,
    suitCounts,
    elementCounts,
    moodCounts,
    topCards,
  };
}

export function exportJournalJSON(): void {
  const readings = getAllReadings();
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(readings, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `arcana_tarot_journal_${getTodayDateString()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportJournalMarkdown(): void {
  const readings = getAllReadings();
  let md = `# Arcana Daily - Tarot Journal Archive\n*Exported on ${new Date().toLocaleDateString()}*\n\n---\n\n`;

  readings.forEach((r) => {
    if (r.spreadType === 'three_card' && r.spreadCards && r.spreadCards.length > 0) {
      md += `## ${r.date} — 3-Card Spread: ${r.spreadPromptTitle || 'Daily Spread'}\n\n`;
      if (r.intention) md += `**Intention:** *"${r.intention}"*\n\n`;
      if (r.mood) md += `**Mood:** ${r.mood}\n\n`;
      if (r.tags && r.tags.length > 0) md += `**Tags:** ${r.tags.map((t) => `#${t}`).join(' ')}\n\n`;

      r.spreadCards.forEach((sc, idx) => {
        const card = getTarotCardById(sc.cardId);
        if (card) {
          md += `### Position ${idx + 1}: ${sc.positionLabel} — ${card.name} (${sc.isReversed ? 'Reversed' : 'Upright'})\n`;
          if (sc.positionQuestion) md += `*Query:* ${sc.positionQuestion}\n\n`;
          md += `*Wisdom:* ${sc.isReversed ? card.reversedMeaning : card.uprightMeaning}\n\n`;
          md += `*Affirmation:* "${card.affirmation}"\n\n`;
        }
      });
    } else {
      const card = getTarotCardById(r.cardId);
      if (!card) return;
      md += `## ${r.date} — ${card.name} (${r.isReversed ? 'Reversed' : 'Upright'})\n\n`;
      if (r.intention) md += `**Intention:** *"${r.intention}"*\n\n`;
      if (r.mood) md += `**Mood:** ${r.mood}\n\n`;
      if (r.tags && r.tags.length > 0) md += `**Tags:** ${r.tags.map((t) => `#${t}`).join(' ')}\n\n`;
      md += `### Card Wisdom\n*${r.isReversed ? card.reversedMeaning : card.uprightMeaning}*\n\n`;
      md += `**Daily Affirmation:** "${card.affirmation}"\n\n`;
    }

    if (r.userNotes) {
      md += `### My Private Journal Entry\n${r.userNotes}\n\n`;
    }
    if (r.aiInsights) {
      md += `### Esoteric Mentor Insights\n${r.aiInsights}\n\n`;
    }
    md += `---\n\n`;
  });

  const dataStr = 'data:text/markdown;charset=utf-8,' + encodeURIComponent(md);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `arcana_tarot_journal_${getTodayDateString()}.md`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function importJournalJSON(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) return false;
    // Validate basic structure
    const validReadings = parsed.filter((item: any) => item && item.id && item.date && item.cardId);
    if (validReadings.length === 0) return false;

    const existing = getAllReadings();
    const existingMap = new Map(existing.map((r) => [r.id, r]));
    
    validReadings.forEach((r: DailyReading) => {
      existingMap.set(r.id, r);
    });

    const merged = Array.from(existingMap.values()).sort((a, b) => b.timestamp - a.timestamp);
    localStorage.setItem(READINGS_KEY, JSON.stringify(merged));
    return true;
  } catch (e) {
    console.error('Failed to import readings:', e);
    return false;
  }
}

export function getConsecutiveStreak(): number {
  const readings = getAllReadings();
  return calculateStreaks(readings).currentStreak;
}

export function clearAllData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(READINGS_KEY);
  localStorage.removeItem(SETTINGS_KEY);
}

