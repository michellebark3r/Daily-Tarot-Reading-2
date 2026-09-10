import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DailyReading, AppSettings } from './types';
import {
  getAllReadings,
  hasDrawnToday,
  getTodayReading,
  getConsecutiveStreak,
  getAppSettings,
  clearAllData,
} from './utils/storage';
import { Header } from './components/Header';
import { DailyDrawRitual } from './components/DailyDrawRitual';
import { TodayCardView } from './components/TodayCardView';
import { DailyJournal } from './components/DailyJournal';
import { GrimoireCompendium } from './components/GrimoireCompendium';
import { InsightsDashboard } from './components/InsightsDashboard';
import { SettingsModal } from './components/SettingsModal';
import { PinScreen } from './components/PinScreen';

export default function App() {
  const [readings, setReadings] = useState<DailyReading[]>([]);
  const [todayReading, setTodayReading] = useState<DailyReading | null>(null);
  const [settings, setSettings] = useState<AppSettings>(getAppSettings());
  const [streak, setStreak] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'draw' | 'journal' | 'grimoire' | 'insights'>('draw');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isJournalUnlocked, setIsJournalUnlocked] = useState(false);

  // Sync state from storage
  const refreshAppData = () => {
    const all = getAllReadings();
    setReadings(all);
    const today = getTodayReading();
    setTodayReading(today);
    setStreak(getConsecutiveStreak());
    setSettings(getAppSettings());
  };

  useEffect(() => {
    refreshAppData();
  }, []);

  // When a new reading is completed in the ritual
  const handleReadingCompleted = (newReading: DailyReading) => {
    refreshAppData();
    setTodayReading(newReading);
  };

  const handleUpdateTodayReading = (updated: DailyReading) => {
    setTodayReading(updated);
    refreshAppData();
  };

  const handleResetData = () => {
    clearAllData();
    refreshAppData();
    setIsJournalUnlocked(false);
  };

  const alreadyDrawnToday = !!todayReading && !settings.practiceModeUnlocked;

  return (
    <div className="min-h-screen bg-[#08080a] text-[#d1d1d1] flex flex-col font-sans selection:bg-amber-500/25 selection:text-amber-100">
      {/* Background Mystical Nebula Radiance */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-950/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-amber-950/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-950/10 rounded-full blur-3xl" />
      </div>

      {/* Persistent Navigation Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
        }}
        onOpenSettings={() => setIsSettingsOpen(true)}
        streak={streak}
        hasDrawnToday={alreadyDrawnToday}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col">
        {/* TAB 1: SACRED DAILY DRAW */}
        {activeTab === 'draw' && (
          <div className="flex-1 flex flex-col justify-center">
            {alreadyDrawnToday && todayReading ? (
              <TodayCardView
                reading={todayReading}
                onUpdateReading={handleUpdateTodayReading}
                onExploreGrimoire={() => setActiveTab('grimoire')}
                onOpenJournal={() => setActiveTab('journal')}
              />
            ) : (
              <DailyDrawRitual
                allowReversals={settings.allowReversals}
                soundEnabled={settings.soundEnabled}
                onReadingCompleted={handleReadingCompleted}
              />
            )}
          </div>
        )}

        {/* TAB 2: PRIVATE DAILY JOURNAL */}
        {activeTab === 'journal' && (
          <div className="flex-1">
            {settings.journalPin && !isJournalUnlocked ? (
              <PinScreen
                correctPin={settings.journalPin}
                onUnlocked={() => setIsJournalUnlocked(true)}
              />
            ) : (
              <DailyJournal
                readings={readings}
                onRefreshReadings={refreshAppData}
              />
            )}
          </div>
        )}

        {/* TAB 3: TAROT GRIMOIRE & ENCYCLOPEDIA */}
        {activeTab === 'grimoire' && (
          <div className="flex-1">
            <GrimoireCompendium />
          </div>
        )}

        {/* TAB 4: PATTERNS & INSIGHTS */}
        {activeTab === 'insights' && (
          <div className="flex-1">
            <InsightsDashboard readings={readings} />
          </div>
        )}
      </main>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          settings={settings}
          onUpdateSettings={(newSet) => {
            setSettings(newSet);
            refreshAppData();
          }}
          onClose={() => setIsSettingsOpen(false)}
          onResetData={handleResetData}
        />
      )}
    </div>
  );
}
