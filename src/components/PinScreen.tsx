import React, { useState } from 'react';
import { Lock, KeyRound, ArrowRight } from 'lucide-react';

interface PinScreenProps {
  correctPin: string;
  onUnlocked: () => void;
}

export const PinScreen: React.FC<PinScreenProps> = ({ correctPin, onUnlocked }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleKeyPress = (num: string) => {
    if (pin.length < 4) {
      const nextPin = pin + num;
      setPin(nextPin);
      if (nextPin.length === 4) {
        if (nextPin === correctPin) {
          onUnlocked();
        } else {
          setError(true);
          setTimeout(() => {
            setPin('');
            setError(false);
          }, 600);
        }
      }
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
    setError(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center space-y-6 max-w-sm mx-auto">
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-200">
        <Lock className={`w-8 h-8 ${error ? 'animate-bounce text-rose-400' : 'text-amber-300'}`} />
      </div>

      <div className="space-y-1">
        <h3 className="font-cinzel text-xl font-bold text-zinc-100">
          Private Journal Locked
        </h3>
        <p className="text-xs text-zinc-400">
          Enter your 4-digit PIN to access your personal daily reflections.
        </p>
      </div>

      {/* PIN Dots Indicator */}
      <div className="flex items-center justify-center gap-3 py-2">
        {[0, 1, 2, 3].map((idx) => (
          <div
            key={idx}
            className={`w-3.5 h-3.5 rounded-full border transition-all ${
              pin.length > idx
                ? 'bg-amber-400 border-amber-300 scale-110 shadow-lg shadow-amber-400/30'
                : 'bg-[#0c0c0f] border-white/10'
            }`}
          />
        ))}
      </div>

      {error && (
        <p className="text-xs text-rose-400 font-medium">Incorrect PIN. Please try again.</p>
      )}

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-[240px]">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => {
              if (k === 'C') setPin('');
              else if (k === '⌫') handleBackspace();
              else handleKeyPress(k);
            }}
            className="h-12 rounded-xl bg-[#0c0c0f] border border-white/10 text-base font-semibold text-zinc-200 hover:bg-[#181820] hover:border-amber-400/40 active:scale-95 transition-all flex items-center justify-center"
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );
};
