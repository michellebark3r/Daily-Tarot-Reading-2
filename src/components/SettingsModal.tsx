import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AppSettings } from '../types';
import { saveAppSettings, exportJournalJSON, exportJournalMarkdown } from '../utils/storage';
import {
  X,
  Volume2,
  VolumeX,
  RotateCw,
  Lock,
  Download,
  Trash2,
  Shield,
  Sparkles,
  RefreshCw,
  Check,
} from 'lucide-react';

interface SettingsModalProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  onClose: () => void;
  onResetData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onClose,
  onResetData,
}) => {
  const [allowReversals, setAllowReversals] = useState(settings.allowReversals);
  const [soundEnabled, setSoundEnabled] = useState(settings.soundEnabled);
  const [practiceMode, setPracticeMode] = useState(!!settings.practiceModeUnlocked);
  const [pinInput, setPinInput] = useState(settings.journalPin || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    const updated: AppSettings = {
      ...settings,
      allowReversals,
      soundEnabled,
      practiceModeUnlocked: practiceMode,
      journalPin: pinInput.trim() ? pinInput.trim() : undefined,
    };
    saveAppSettings(updated);
    onUpdateSettings(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const handleResetConfirmation = () => {
    if (window.confirm('Are you sure you want to clear all journal entries and reset your streak? This cannot be undone.')) {
      onResetData();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08080a]/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg bg-[#0c0c0f] border border-white/10 rounded-2xl shadow-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-200">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-zinc-100">
                Tarot Ritual Settings
              </h3>
              <p className="text-xs text-zinc-400">Configure your daily reading preferences</p>
            </div>
          </div>

          <button
            id="settings-modal-close-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#08080a] border border-white/10 text-zinc-400 hover:text-zinc-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options List */}
        <div className="space-y-4">
          {/* Reversals Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#08080a] border border-white/5">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-zinc-200 block">
                Allow Reversed Cards
              </span>
              <span className="text-[11px] text-zinc-400 block">
                Include inverted card orientations with shadow & cautionary lessons.
              </span>
            </div>
            <button
              id="settings-toggle-reversals"
              type="button"
              onClick={() => setAllowReversals(!allowReversals)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                allowReversals ? 'bg-amber-400' : 'bg-[#181820]'
              }`}
            >
              <div
                className={`bg-[#08080a] w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  allowReversals ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Sound Synthesizer Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#08080a] border border-white/5">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-zinc-200 block">
                Ritual Sound Effects
              </span>
              <span className="text-[11px] text-zinc-400 block">
                Gentle celestial Solfeggio chimes and card shuffle synth.
              </span>
            </div>
            <button
              id="settings-toggle-sound"
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                soundEnabled ? 'bg-amber-400' : 'bg-[#181820]'
              }`}
            >
              <div
                className={`bg-[#08080a] w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  soundEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Practice / Test Mode Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#08080a] border border-white/5">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-zinc-200 block">
                Practice Mode / Multiple Draws
              </span>
              <span className="text-[11px] text-zinc-400 block">
                Unlock unrestricted practice draws (by default sacred rule is 1 draw per day).
              </span>
            </div>
            <button
              id="settings-toggle-practice-mode"
              type="button"
              onClick={() => setPracticeMode(!practiceMode)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                practiceMode ? 'bg-amber-400' : 'bg-[#181820]'
              }`}
            >
              <div
                className={`bg-[#08080a] w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  practiceMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Journal PIN Lock */}
          <div className="p-3.5 rounded-xl bg-[#08080a] border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-zinc-200">
              <Lock className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-semibold">Private Journal PIN Protection</span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Optionally enter a 4-digit PIN code to lock and protect your journal entries. Leave blank for no PIN.
            </p>
            <input
              id="settings-pin-input"
              type="password"
              maxLength={4}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 1234 (Leave blank to disable)"
              className="w-full px-3 py-2 rounded-lg bg-[#0c0c0f] border border-white/10 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-400/60"
            />
          </div>

          {/* Data Backup & Reset */}
          <div className="p-3.5 rounded-xl bg-[#08080a] border border-white/5 space-y-3">
            <span className="text-xs font-semibold text-zinc-200 block">
              Journal Backup & Data
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                id="settings-export-json-btn"
                onClick={exportJournalJSON}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0c0c0f] border border-white/10 text-xs text-zinc-300 hover:text-amber-200"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Backup JSON</span>
              </button>

              <button
                id="settings-export-md-btn"
                onClick={exportJournalMarkdown}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0c0c0f] border border-white/10 text-xs text-zinc-300 hover:text-amber-200"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Markdown</span>
              </button>
            </div>

            <div className="pt-2 border-t border-white/5">
              <button
                id="settings-reset-data-btn"
                onClick={handleResetConfirmation}
                className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 hover:underline"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset All Journal Data & Streak</span>
              </button>
            </div>
          </div>
        </div>

        {/* Save Footer */}
        <div className="pt-2 border-t border-white/5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#181820] hover:bg-[#20202a] text-xs text-zinc-300 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            id="settings-save-btn"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#08080a] text-xs font-bold font-cinzel tracking-wider flex items-center gap-1.5 shadow-md transition-colors"
          >
            {savedSuccess ? <Check className="w-4 h-4" /> : null}
            <span>{savedSuccess ? 'Saved!' : 'Save Preferences'}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
