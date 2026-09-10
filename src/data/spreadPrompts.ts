import { SpreadPrompt } from '../types';

export const SPREAD_PROMPTS: SpreadPrompt[] = [
  {
    id: 'past-present-future',
    title: 'Past • Present • Future',
    subtitle: 'Temporal Continuum of Cause, Current Energy, and Unfolding Trajectory',
    category: 'General',
    positions: [
      {
        index: 0,
        label: '1. Past Influences',
        question: 'What foundational roots, lessons, or past choices shaped this moment?',
        iconName: 'history',
      },
      {
        index: 1,
        label: '2. Present Reality',
        question: 'What is the active focal point, atmosphere, and energy surrounding you now?',
        iconName: 'clock',
      },
      {
        index: 2,
        label: '3. Unfolding Horizon',
        question: 'Where is your momentum carrying you if you maintain your present course?',
        iconName: 'sparkles',
      },
    ],
    synthesisGuide: 'Observe how the root cause in the Past directly illuminates the Present challenge, and how your current conscious choice dictates the Future trajectory.',
  },
  {
    id: 'mind-body-spirit',
    title: 'Mind • Body • Spirit',
    subtitle: 'Holistic Trinitarian Calibration for Inner Alignment and Vitality',
    category: 'Self-Growth',
    positions: [
      {
        index: 0,
        label: '1. Mind (Intellect)',
        question: 'What thoughts, mental narratives, or mental clutter require clarity today?',
        iconName: 'brain',
      },
      {
        index: 1,
        label: '2. Body (Physical & Mundane)',
        question: 'What somatic signals, grounding needs, or physical actions need care?',
        iconName: 'heart',
      },
      {
        index: 2,
        label: '3. Spirit (Soul & Intuition)',
        question: 'What spiritual yearning or higher wisdom seeks expression through you?',
        iconName: 'feather',
      },
    ],
    synthesisGuide: 'Notice which of the three realms holds tension or resistance, and how the other two can be called upon to restore harmonious equilibrium.',
  },
  {
    id: 'situation-obstacle-advice',
    title: 'Situation • Obstacle • Advice',
    subtitle: 'Practical Oracle for Overcoming Blocks and Taking Empowered Action',
    category: 'Decision & Guidance',
    positions: [
      {
        index: 0,
        label: '1. The Core Situation',
        question: 'What is the true underlying reality beneath surface appearances?',
        iconName: 'compass',
      },
      {
        index: 1,
        label: '2. The Hidden Obstacle',
        question: 'What internal fear, external delay, or blind spot creates friction?',
        iconName: 'shield-alert',
      },
      {
        index: 2,
        label: '3. Higher Oracle Advice',
        question: 'What specific mindset or conscious action will liberate your forward path?',
        iconName: 'lightbulb',
      },
    ],
    synthesisGuide: 'Do not view the Obstacle as a stop sign; view it as the crucible of growth, with the Advice card showing the exact key to unlock it.',
  },
  {
    id: 'embrace-release-focus',
    title: 'Embrace • Release • Direct Focus',
    subtitle: 'Daily Energy Calibration for Clear Intentional Living',
    category: 'Self-Growth',
    positions: [
      {
        index: 0,
        label: '1. What to Embrace',
        question: 'What gift, mindset, or quality should you lean into with gratitude?',
        iconName: 'sparkles',
      },
      {
        index: 1,
        label: '2. What to Release',
        question: 'What outdated habit, attachment, or needless worry must you surrender?',
        iconName: 'wind',
      },
      {
        index: 2,
        label: '3. Where to Direct Energy',
        question: 'What priority or purposeful effort will yield the greatest spiritual return?',
        iconName: 'target',
      },
    ],
    synthesisGuide: 'Releasing creates sacred empty space; what you embrace fills it with light, and your directed focus channels that light into tangible creation.',
  },
  {
    id: 'you-other-dynamic',
    title: 'You • The Other • The Sacred Dynamic',
    subtitle: 'Relational Resonance, Mutual Mirroring, and Interpersonal Harmony',
    category: 'Love & Connection',
    positions: [
      {
        index: 0,
        label: '1. Your Energy & Projection',
        question: 'What feelings, expectations, or vulnerability are you bringing into the bond?',
        iconName: 'user',
      },
      {
        index: 1,
        label: '2. Their Energy & State',
        question: 'What perspective, unspoken need, or emotional frequency are they holding?',
        iconName: 'users',
      },
      {
        index: 2,
        label: '3. The Synthesis / Bridge',
        question: 'What mutual lesson, bridge of empathy, or shared path connects both souls?',
        iconName: 'link',
      },
    ],
    synthesisGuide: 'Contrast the elemental dignities of cards 1 and 2 to see whether you are fueling or extinguishing one another, while card 3 shows the highest mutual growth point.',
  },
  {
    id: 'subconscious-conscious-guidance',
    title: 'Subconscious • Conscious • Higher Calling',
    subtitle: 'Jungian Depth Reading Connecting Shadow, Ego, and Transcendent Guidance',
    category: 'Shadow & Healing',
    positions: [
      {
        index: 0,
        label: '1. Subconscious Undercurrent',
        question: 'What latent desires, instinctual dreams, or shadow fears stir beneath the surface?',
        iconName: 'moon',
      },
      {
        index: 1,
        label: '2. Conscious Manifestation',
        question: 'What is your everyday waking mind and ego currently fixated on?',
        iconName: 'sun',
      },
      {
        index: 2,
        label: '3. Higher Calling & Transmutation',
        question: 'How does your Higher Self invite you to unify both realms into sacred power?',
        iconName: 'star',
      },
    ],
    synthesisGuide: 'When subconscious truth aligns with conscious will, resistance dissolves into pure, effortless spiritual flow.',
  },
  {
    id: 'strength-challenge-action',
    title: 'Strength • Challenge • Empowered Action',
    subtitle: 'Courage, Resilience, and Heroic Archetypal Alignment',
    category: 'Decision & Guidance',
    positions: [
      {
        index: 0,
        label: '1. Innate Strength',
        question: 'What inherent superpower, wisdom, or ally can you depend on today?',
        iconName: 'shield',
      },
      {
        index: 1,
        label: '2. Present Crucible / Test',
        question: 'What test of faith, patience, or skill is presenting itself right now?',
        iconName: 'flame',
      },
      {
        index: 2,
        label: '3. Empowered Action',
        question: 'How can you apply your strength with tactical grace to triumph?',
        iconName: 'zap',
      },
    ],
    synthesisGuide: 'Your Strength is already sufficient for this test. The Action card reveals the exact manner of applying that strength without unnecessary friction.',
  },
];

export function getSpreadPromptById(id: string): SpreadPrompt | undefined {
  return SPREAD_PROMPTS.find((p) => p.id === id);
}

export const DEFAULT_SPREAD_PROMPT = SPREAD_PROMPTS[0];
