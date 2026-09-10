import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DailyReading, TarotStats } from '../types';
import { computeTarotStats } from '../utils/storage';
import { getTarotCardById } from '../data/tarotCards';
import { TarotCardVisual } from './TarotCardVisual';
import {
  BarChart3,
  Flame,
  Droplets,
  Wind,
  Mountain,
  Sparkles,
  Bot,
  Loader2,
  Calendar,
  Layers,
  Heart,
  TrendingUp,
} from 'lucide-react';

interface InsightsDashboardProps {
  readings: DailyReading[];
}

export const InsightsDashboard: React.FC<InsightsDashboardProps> = ({ readings }) => {
  const stats: TarotStats = computeTarotStats(readings);
  const [aiSynthesis, setAiSynthesis] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const handleSynthesizeThemes = async () => {
    if (readings.length === 0 || isLoadingAi) return;
    setIsLoadingAi(true);

    try {
      const summaryPayload = readings.slice(0, 14).map((r) => {
        const card = getTarotCardById(r.cardId);
        return {
          date: r.date,
          spreadType: r.spreadType || 'single',
          card: card?.name || r.cardId,
          orientation: r.isReversed ? 'Reversed' : 'Upright',
          spreadCards: r.spreadCards?.map((sc) => ({
            position: sc.positionLabel,
            card: getTarotCardById(sc.cardId)?.name,
            isReversed: sc.isReversed ? 'Reversed' : 'Upright',
          })),
          element: card?.element,
          mood: r.mood,
          intention: r.intention,
        };
      });

      const res = await fetch('/api/tarot/pattern-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ historySummary: summaryPayload }),
      });

      const data = await res.json();
      if (data.analysis) {
        setAiSynthesis(data.analysis);
      }
    } catch (err) {
      console.error('Pattern synthesis error:', err);
      setAiSynthesis('Your daily draws reflect a steady rhythm of spiritual growth and deepening self-awareness.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  const totalElements = Object.values(stats.elementCounts).reduce((a, b) => a + b, 0) || 1;
  const totalSuits = Object.values(stats.suitCounts).reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-200">
          <BarChart3 className="w-6 h-6 text-amber-300" />
        </div>
        <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-zinc-100">
          Spiritual Patterns & Archetypal Flow
        </h2>
        <p className="text-xs md:text-sm text-zinc-400 font-sans leading-relaxed">
          Analyze recurring suits, elemental energies, and overarching themes in your daily readings.
        </p>
      </div>

      {readings.length === 0 ? (
        <div className="text-center py-16 bg-[#0c0c0f]/60 rounded-2xl border border-white/5 space-y-3">
          <Calendar className="w-10 h-10 mx-auto text-zinc-600" />
          <h3 className="font-cinzel text-base text-zinc-300">No Reading Data Yet</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Complete your daily draws to discover your personal elemental patterns and recurring archetypes.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#0c0c0f] border border-white/5 text-center space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">
                Total Readings
              </span>
              <p className="font-cinzel text-2xl md:text-3xl font-bold text-zinc-100">
                {stats.totalReadings}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0c0c0f] border border-white/5 text-center space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300/80 flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" /> Current Streak
              </span>
              <p className="font-cinzel text-2xl md:text-3xl font-bold text-amber-200">
                {stats.currentStreak} <span className="text-sm font-sans text-zinc-400">days</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0c0c0f] border border-white/5 text-center space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">
                Longest Streak
              </span>
              <p className="font-cinzel text-2xl md:text-3xl font-bold text-zinc-300">
                {stats.longestStreak} <span className="text-sm font-sans text-zinc-400">days</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0c0c0f] border border-white/5 text-center space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                Major Arcana Ratio
              </span>
              <p className="font-cinzel text-2xl md:text-3xl font-bold text-amber-100">
                {stats.totalReadings > 0
                  ? Math.round((stats.majorCount / stats.totalReadings) * 100)
                  : 0}
                %
              </p>
            </div>
          </div>

          {/* AI Pattern Synthesis Box */}
          <div className="p-6 rounded-2xl bg-[#0c0c0f] border border-white/10 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-zinc-100">
                    AI Esoteric Pattern Synthesis
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Analyze recurring archetypes and spiritual cycles from your recent history.
                  </p>
                </div>
              </div>

              <button
                id="insights-synthesize-btn"
                onClick={handleSynthesizeThemes}
                disabled={isLoadingAi}
                className="px-4 py-2 rounded-xl bg-[#181820] hover:bg-[#20202a] border border-amber-500/30 text-amber-200 text-xs font-bold font-cinzel tracking-wider shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isLoadingAi ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-300" />}
                <span>{aiSynthesis ? 'Regenerate Synthesis' : 'Synthesize My Path'}</span>
              </button>
            </div>

            {aiSynthesis && (
              <div className="p-4 rounded-xl bg-[#08080a] border border-white/5 text-zinc-200 text-xs md:text-sm leading-relaxed whitespace-pre-wrap">
                {aiSynthesis}
              </div>
            )}
          </div>

          {/* Elemental & Suit Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Elemental Energy Balance */}
            <div className="p-6 rounded-2xl bg-[#0c0c0f] border border-white/5 space-y-4">
              <h3 className="font-cinzel text-sm font-bold text-zinc-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Elemental Distribution</span>
              </h3>

              <div className="space-y-3">
                {[
                  { name: 'Fire (Passions, Will)', count: stats.elementCounts.Fire, color: 'bg-amber-600', icon: <Flame className="w-3.5 h-3.5 text-amber-400" /> },
                  { name: 'Water (Intuition, Emotion)', count: stats.elementCounts.Water, color: 'bg-sky-600', icon: <Droplets className="w-3.5 h-3.5 text-sky-400" /> },
                  { name: 'Air (Mind, Truth)', count: stats.elementCounts.Air, color: 'bg-zinc-400', icon: <Wind className="w-3.5 h-3.5 text-zinc-400" /> },
                  { name: 'Earth (Body, Manifestation)', count: stats.elementCounts.Earth, color: 'bg-emerald-600', icon: <Mountain className="w-3.5 h-3.5 text-emerald-400" /> },
                ].map((elem, i) => {
                  const percent = Math.round((elem.count / totalElements) * 100);
                  return (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-zinc-300">
                        <span className="flex items-center gap-1.5">{elem.icon} {elem.name}</span>
                        <span className="font-mono text-zinc-500">{elem.count} ({percent}%)</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#08080a] overflow-hidden border border-white/5">
                        <div
                          className={`h-full ${elem.color} transition-all duration-500 rounded-full`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Suit Dominance */}
            <div className="p-6 rounded-2xl bg-[#0c0c0f] border border-white/5 space-y-4">
              <h3 className="font-cinzel text-sm font-bold text-zinc-100 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-300" />
                <span>Minor Arcana Suit Breakdown</span>
              </h3>

              <div className="space-y-3">
                {[
                  { name: 'Wands (Fire & Creativity)', count: stats.suitCounts.wands, color: 'bg-amber-500' },
                  { name: 'Cups (Water & Relationships)', count: stats.suitCounts.cups, color: 'bg-blue-500' },
                  { name: 'Swords (Air & Intellect)', count: stats.suitCounts.swords, color: 'bg-zinc-400' },
                  { name: 'Pentacles (Earth & Prosperity)', count: stats.suitCounts.pentacles, color: 'bg-emerald-600' },
                ].map((suit, i) => {
                  const percent = Math.round((suit.count / totalSuits) * 100);
                  return (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-zinc-300">
                        <span>{suit.name}</span>
                        <span className="font-mono text-zinc-500">{suit.count} ({percent}%)</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#08080a] overflow-hidden border border-white/5">
                        <div
                          className={`h-full ${suit.color} transition-all duration-500 rounded-full`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Top Recurring Cards */}
          {stats.topCards.length > 0 && (
            <div className="p-6 rounded-2xl bg-[#0c0c0f] border border-white/5 space-y-4">
              <h3 className="font-cinzel text-sm font-bold text-zinc-100">
                Most Frequent Archetypes
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {stats.topCards.map((top, idx) => {
                  const card = getTarotCardById(top.cardId);
                  if (!card) return null;
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#08080a] border border-white/5 flex flex-col items-center text-center space-y-2"
                    >
                      <TarotCardVisual card={card} size="sm" showDetails={false} />
                      <span className="font-cinzel text-xs font-bold text-zinc-200 line-clamp-1">
                        {card.name}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-200 border border-amber-500/20">
                        Drawn {top.count} {top.count === 1 ? 'time' : 'times'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
