// Web Audio API celestial synthesizer for gentle, soothing ritual sound effects

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playShuffleSound(enabled = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Gentle rustling / card slide sound
    const now = ctx.currentTime;
    for (let i = 0; i < 4; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(300 + Math.random() * 400, now + i * 0.08);
      filter.Q.setValueAtTime(3, now);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180 + Math.random() * 80, now + i * 0.08);
      
      gain.gain.setValueAtTime(0, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.04, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.09);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.1);
    }
  } catch (e) {
    // Ignore audio errors gracefully
  }
}

export function playFlipSound(enabled = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Harmonic celestial chime chord
    const frequencies = [528, 660, 792, 1056]; // Solfeggio / Miracle tone harmony
    
    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      gain.gain.setValueAtTime(0, now + idx * 0.04);
      gain.gain.linearRampToValueAtTime(0.05, now + idx * 0.04 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 1.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 1.7);
    });
  } catch (e) {
    // Ignore audio errors gracefully
  }
}

export function playCelebrationSound(enabled = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const chord = [440, 554.37, 659.25, 880, 1108.73]; // A major celestial harp
    
    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);

      gain.gain.setValueAtTime(0, now + idx * 0.09);
      gain.gain.linearRampToValueAtTime(0.04, now + idx * 0.09 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.09 + 2.0);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 2.1);
    });
  } catch (e) {
    // Ignore audio errors gracefully
  }
}

export function playSingingBowlSound(enabled = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // F# 432Hz healing frequency with rich overtone spectrum
    const baseFreq = 432;
    const partials = [
      { ratio: 1.0, gain: 0.12, decay: 4.5 },
      { ratio: 2.76, gain: 0.06, decay: 3.8 },
      { ratio: 5.4, gain: 0.03, decay: 2.9 },
      { ratio: 8.93, gain: 0.015, decay: 2.1 },
    ];

    partials.forEach(({ ratio, gain: maxGain, decay }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * ratio, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(maxGain, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decay + 0.1);
    });
  } catch (e) {
    // Ignore audio errors gracefully
  }
}

