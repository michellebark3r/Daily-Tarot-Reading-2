// Lunar phase calculation & esoteric astrological correspondences

export interface MoonPhaseInfo {
  phaseName: string;
  emoji: string;
  illumination: number; // 0 to 100%
  stage: 'new' | 'waxing' | 'full' | 'waning';
  esotericEnergy: string;
  recommendedFocus: string;
}

export function getMoonPhase(date: Date = new Date()): MoonPhaseInfo {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Astronomical Julian Date calculation for precise synodic lunar month (29.53058867 days)
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;
  
  // Known new moon reference: JD 2451549.5 (Jan 6, 2000)
  const daysSinceNew = (jd - 2451549.5) % 29.53058867;
  const normalizedAge = daysSinceNew < 0 ? daysSinceNew + 29.53058867 : daysSinceNew;
  const phaseRatio = normalizedAge / 29.53058867;

  // Illumination calculation (approximate cosine)
  const illumination = Math.round((1 - Math.cos(phaseRatio * 2 * Math.PI)) / 2 * 100);

  if (normalizedAge < 1.84566) {
    return {
      phaseName: 'New Moon',
      emoji: '🌑',
      illumination,
      stage: 'new',
      esotericEnergy: 'Stillness, Planting Seeds, New Beginnings',
      recommendedFocus: 'Set intentions for the upcoming cycle; ground your spirit in quiet reflection.',
    };
  } else if (normalizedAge < 5.53699) {
    return {
      phaseName: 'Waxing Crescent',
      emoji: '🌒',
      illumination,
      stage: 'waxing',
      esotericEnergy: 'Initiation, Hope, Gathering Momentum',
      recommendedFocus: 'Nurture emerging thoughts and take initial courageous steps forward.',
    };
  } else if (normalizedAge < 9.22831) {
    return {
      phaseName: 'First Quarter',
      emoji: '🌓',
      illumination,
      stage: 'waxing',
      esotericEnergy: 'Action, Overcoming Obstacles, Commitment',
      recommendedFocus: 'Re-align with your goals when faced with decisions; trust your inner fortitude.',
    };
  } else if (normalizedAge < 12.91963) {
    return {
      phaseName: 'Waxing Gibbous',
      emoji: '🌔',
      illumination,
      stage: 'waxing',
      esotericEnergy: 'Refinement, Patience, Cultivation',
      recommendedFocus: 'Fine-tune your craft and stay patient as your efforts blossom toward fruition.',
    };
  } else if (normalizedAge < 16.61096) {
    return {
      phaseName: 'Full Moon',
      emoji: '🌕',
      illumination,
      stage: 'full',
      esotericEnergy: 'Peak Illumination, Intuition, Celebration',
      recommendedFocus: 'Channel heightened psychic sensitivity and celebrate the fruits of your awareness.',
    };
  } else if (normalizedAge < 20.30228) {
    return {
      phaseName: 'Waning Gibbous',
      emoji: '🌖',
      illumination,
      stage: 'waning',
      esotericEnergy: 'Gratitude, Sharing Wisdom, Introspection',
      recommendedFocus: 'Reflect on lessons learned and offer your insights to guide others.',
    };
  } else if (normalizedAge < 23.99361) {
    return {
      phaseName: 'Last Quarter',
      emoji: '🌗',
      illumination,
      stage: 'waning',
      esotericEnergy: 'Release, Forgiveness, Cleansing',
      recommendedFocus: 'Let go of attachments, limiting beliefs, or habits that no longer serve your path.',
    };
  } else if (normalizedAge < 27.68493) {
    return {
      phaseName: 'Waning Crescent',
      emoji: '🌘',
      illumination,
      stage: 'waning',
      esotericEnergy: 'Rest, Surrender, Sacred Solitude',
      recommendedFocus: 'Recharge your emotional and energetic reserves; practice deep mindfulness.',
    };
  } else {
    return {
      phaseName: 'New Moon',
      emoji: '🌑',
      illumination,
      stage: 'new',
      esotericEnergy: 'Stillness, Planting Seeds, New Beginnings',
      recommendedFocus: 'Set intentions for the upcoming cycle; ground your spirit in quiet reflection.',
    };
  }
}
