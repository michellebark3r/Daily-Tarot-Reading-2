import React from 'react';
import { TarotCard } from '../types';
import { Sparkles, Flame, Droplets, Wind, Mountain, Moon, Sun, Star, Heart, Compass, Shield, Eye, Scale, Globe, BookOpen } from 'lucide-react';

interface TarotCardVisualProps {
  card?: TarotCard;
  isReversed?: boolean;
  isFaceDown?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDetails?: boolean;
  className?: string;
  onClick?: () => void;
}

export const TarotCardVisual: React.FC<TarotCardVisualProps> = ({
  card,
  isReversed = false,
  isFaceDown = false,
  size = 'lg',
  showDetails = true,
  className = '',
  onClick,
}) => {
  const sizeClasses = {
    sm: 'w-24 h-40 text-[10px]',
    md: 'w-44 h-72 text-xs',
    lg: 'w-64 h-[26rem] text-sm',
    xl: 'w-80 h-[32rem] text-base',
  }[size];

  // Render Face Down Mystical Card Back
  if (isFaceDown || !card) {
    return (
      <div
        onClick={onClick}
        className={`relative select-none rounded-xl overflow-hidden border border-amber-400/40 bg-gradient-to-br from-[#0e0e14] via-[#08080a] to-[#121218] shadow-2xl shadow-black/90 cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:border-amber-300/70 ${sizeClasses} ${className}`}
      >
        {/* Ornate Gold Border Inset */}
        <div className="absolute inset-1.5 rounded-lg border border-amber-400/20 p-2 flex flex-col items-center justify-between">
          <div className="flex justify-between w-full text-amber-300/50">
            <span className="font-cinzel text-[10px]">✦</span>
            <span className="font-cinzel text-[10px]">✦</span>
          </div>

          {/* Central Sacred Geometry Mandala */}
          <div className="relative flex items-center justify-center my-auto">
            <div className="absolute w-28 h-28 rounded-full border border-amber-400/15 animate-spin-slow" />
            <div className="absolute w-20 h-20 rounded-full border border-dashed border-amber-400/30" />
            <div className="absolute w-12 h-12 rotate-45 border border-amber-300/40" />
            <div className="w-16 h-16 rounded-full bg-[#0c0c0f] backdrop-blur-sm flex items-center justify-center border border-amber-400/50 shadow-inner">
              <Moon className="w-7 h-7 text-amber-200/90 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
            </div>
          </div>

          <div className="flex justify-between w-full text-amber-300/50">
            <span className="font-cinzel text-[10px]">✦</span>
            <span className="font-cinzel text-[10px]">✦</span>
          </div>
        </div>

        {/* Subtle Constellation Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-400/5 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  }

  // Get Element Icon
  const renderElementIcon = () => {
    switch (card.element) {
      case 'Fire': return <Flame className="w-3.5 h-3.5 text-orange-300" />;
      case 'Water': return <Droplets className="w-3.5 h-3.5 text-sky-300" />;
      case 'Air': return <Wind className="w-3.5 h-3.5 text-indigo-300" />;
      case 'Earth': return <Mountain className="w-3.5 h-3.5 text-emerald-300" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-amber-200" />;
    }
  };

  // Get Motif Icon for artwork center
  const renderMotifIcon = () => {
    const iconName = card.artTheme.icon;
    const props = { className: "w-16 h-16 text-amber-200/90 drop-shadow-[0_0_12px_rgba(251,191,36,0.3)]" };
    switch (iconName) {
      case 'wand': return <Sparkles {...props} />;
      case 'moon': return <Moon {...props} />;
      case 'sun': return <Sun {...props} />;
      case 'heart': return <Heart {...props} />;
      case 'shield': return <Shield {...props} />;
      case 'compass': return <Compass {...props} />;
      case 'flame': return <Flame {...props} />;
      case 'scale': return <Scale {...props} />;
      case 'eye': return <Eye {...props} />;
      case 'zap': return <Sparkles {...props} />;
      case 'star': return <Star {...props} />;
      case 'globe': return <Globe {...props} />;
      case 'book-open': return <BookOpen {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative select-none rounded-xl overflow-hidden bg-[#0c0c0f] border border-amber-400/40 shadow-2xl shadow-black flex flex-col justify-between transition-transform duration-300 ${
        isReversed ? 'rotate-180' : ''
      } ${sizeClasses} ${className}`}
      style={{
        background: `radial-gradient(circle at 50% 30%, ${card.artTheme.primaryColor}18 0%, #08080a 100%)`,
      }}
    >
      {/* Outer Gilded Filigree Frame */}
      <div className="absolute inset-1.5 rounded-lg border border-amber-400/25 pointer-events-none" />
      <div className="absolute inset-2.5 rounded border border-amber-400/10 pointer-events-none" />

      {/* Card Header: Roman Numeral / Rank & Element */}
      <div className="relative z-10 px-3 pt-3 pb-1 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="font-cinzel font-bold text-amber-200/90 tracking-wider">
            {card.romanNumeral || (card.number !== undefined ? card.number : '')}
          </span>
          {card.arcana === 'major' ? (
            <span className="px-1.5 py-0.5 text-[9px] uppercase tracking-widest bg-amber-500/10 text-amber-200 rounded border border-amber-500/20">
              Major
            </span>
          ) : (
            <span className="px-1.5 py-0.5 text-[9px] uppercase tracking-widest bg-white/5 text-zinc-400 rounded border border-white/5">
              {card.suit}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 bg-[#08080a]/90 px-1.5 py-0.5 rounded border border-white/5 text-zinc-300">
          {renderElementIcon()}
          <span className="text-[10px] font-medium">{card.element}</span>
        </div>
      </div>

      {/* Center Illustrated Archetype Canvas */}
      <div className="relative z-10 mx-3 my-1 flex-1 rounded-md overflow-hidden bg-gradient-to-b from-[#08080a]/80 via-[#0c0c0f]/50 to-[#08080a]/90 border border-white/5 flex flex-col items-center justify-center p-3 text-center">
        {/* Atmospheric radiant glow */}
        <div
          className="absolute w-28 h-28 rounded-full blur-2xl opacity-25 pointer-events-none"
          style={{ backgroundColor: card.artTheme.primaryColor }}
        />

        {/* Central Icon Motif */}
        <div className="relative z-10 mb-2 p-3 rounded-full bg-[#08080a] border border-amber-400/30 shadow-lg">
          {renderMotifIcon()}
        </div>

        {/* Esoteric Archetype Title & Astrological Sigil */}
        <p className="relative z-10 text-[11px] font-cinzel text-amber-200/70 italic line-clamp-1 px-1">
          {card.esotericTitle}
        </p>
        <p className="relative z-10 text-[10px] text-zinc-500 font-sans tracking-wide mt-0.5">
          {card.astrologicalCorrespondence}
        </p>
      </div>

      {/* Card Footer: Name Plaque */}
      <div className="relative z-10 px-3 pb-3 pt-1 text-center bg-gradient-to-t from-[#08080a] via-[#08080a]/90 to-transparent">
        <div className="py-1 px-2 rounded bg-[#08080a]/95 border border-amber-400/30 shadow-md">
          <h4 className="font-cinzel font-bold text-amber-100 tracking-wider uppercase text-xs md:text-sm drop-shadow">
            {card.name}
          </h4>
          {showDetails && (
            <p className="text-[10px] text-amber-300/70 font-serif italic truncate mt-0.5">
              {isReversed ? 'Reversed' : 'Upright'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
