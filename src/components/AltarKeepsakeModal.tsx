import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { TarotCard, DailyReading } from '../types';
import { TarotCardVisual } from './TarotCardVisual';
import { getMoonPhase } from '../utils/moonPhase';
import { X, Download, Share2, Sparkles, Moon, Copy, Check } from 'lucide-react';

interface AltarKeepsakeModalProps {
  card: TarotCard;
  reading: DailyReading;
  onClose: () => void;
}

export const AltarKeepsakeModal: React.FC<AltarKeepsakeModalProps> = ({
  card,
  reading,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const moon = getMoonPhase();

  const handleCopyBlessing = () => {
    const text = `✦ ARCANA SACRED DAILY TALISMAN ✦\nDate: ${reading.date}\nLunar Phase: ${moon.phaseName} ${moon.emoji} (${moon.illumination}%)\n\nCard of the Day: ${card.name} (${reading.isReversed ? 'Reversed' : 'Upright'})\nArchetype: ${card.archetype || card.arcanaType}\nElement: ${card.element}\n\nDaily Affirmation:\n"${card.affirmation}"\n\nDaily Guidance:\n${reading.isReversed ? card.reversedMeaning : card.uprightMeaning}\n\nContemplation:\n${card.dailyContemplation}\n\n✦ Blessed Be Your Journey ✦`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08080a]/90 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="relative w-full max-w-lg bg-[#0c0c0f] border border-amber-500/30 rounded-3xl shadow-2xl p-6 md:p-8 space-y-6 max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#08080a] border border-white/10 text-zinc-400 hover:text-zinc-100 hover:border-amber-400/40 transition-colors z-20"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Sacred Altar Talisman</span>
          </div>
          <h2 className="font-cinzel text-xl md:text-2xl font-bold text-zinc-100">
            Card of the Day Altar Plate
          </h2>
          <p className="text-xs text-zinc-400">
            A shareable spiritual keepsake for your meditation sanctuary.
          </p>
        </div>

        {/* The Visual Altar Card */}
        <div
          id="altar-card-export-node"
          className="relative bg-gradient-to-b from-[#121217] to-[#08080a] p-6 md:p-8 rounded-2xl border border-amber-500/30 shadow-2xl space-y-6 text-center overflow-hidden"
        >
          {/* Subtle celestial corner runes */}
          <div className="absolute top-3 left-3 text-amber-500/30 font-serif text-sm">✦</div>
          <div className="absolute top-3 right-3 text-amber-500/30 font-serif text-sm">✦</div>
          <div className="absolute bottom-3 left-3 text-amber-500/30 font-serif text-sm">✦</div>
          <div className="absolute bottom-3 right-3 text-amber-500/30 font-serif text-sm">✦</div>

          {/* Date & Moon Phase Header */}
          <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-amber-500/20 pb-3">
            <span className="font-cinzel text-zinc-300 font-bold">{reading.date}</span>
            <span className="flex items-center gap-1.5 text-amber-200/90 font-medium">
              <span>{moon.emoji}</span>
              <span>{moon.phaseName}</span>
              <span className="text-[10px] text-zinc-500 font-mono">({moon.illumination}%)</span>
            </span>
          </div>

          {/* Card Visual Centerpiece */}
          <div className="flex justify-center py-2">
            <TarotCardVisual
              card={card}
              isReversed={reading.isReversed}
              size="lg"
              className="shadow-2xl hover:scale-105 transition-transform"
            />
          </div>

          {/* Card Title & Alignment */}
          <div className="space-y-1">
            <h3 className="font-cinzel text-xl font-bold text-zinc-100 tracking-wide">
              {card.name}
            </h3>
            <p className="text-xs text-amber-200/80 uppercase tracking-widest font-semibold">
              {reading.isReversed ? 'Reversed Orientation' : 'Upright Orientation'} • {card.element}
            </p>
          </div>

          {/* Daily Affirmation */}
          <div className="p-4 rounded-xl bg-[#08080a] border border-amber-500/20 text-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block mb-1">
              Guiding Mantra
            </span>
            <p className="font-serif italic text-amber-100 text-sm md:text-base">
              "{card.affirmation}"
            </p>
          </div>

          {/* Core Wisdom */}
          <p className="text-xs text-zinc-300 leading-relaxed max-w-sm mx-auto">
            {reading.isReversed ? card.reversedMeaning : card.uprightMeaning}
          </p>

          <div className="pt-2 border-t border-white/5 flex items-center justify-center gap-4 text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
            <span>ARCANA DAILY</span>
            <span>•</span>
            <span>SACRED RITUAL</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={handleCopyBlessing}
            className="flex-1 py-3 px-4 rounded-xl bg-[#181820] hover:bg-[#20202a] border border-amber-500/30 text-amber-200 text-xs font-bold font-cinzel tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Blessing Copied!' : 'Copy Altar Text'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex-1 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#08080a] text-xs font-bold font-cinzel tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md shadow-amber-400/20"
          >
            <Download className="w-4 h-4" />
            <span>Print / Save Altar</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
