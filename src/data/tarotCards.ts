import { TarotCard, SuitType, ElementType, LifeSpheres, CardSymbol } from '../types';

export const MAJOR_ARCANA: TarotCard[] = [
  {
    id: 'the-fool',
    name: 'The Fool',
    number: 0,
    romanNumeral: '0',
    arcana: 'major',
    suit: null,
    element: 'Air',
    astrologicalCorrespondence: 'Uranus',
    esotericTitle: 'The Spirit of Ether',
    summary: 'Spontaneous beginnings, pure potential, leaping into the unknown with faith and innocence.',
    uprightKeywords: ['New Beginnings', 'Innocence', 'Spontaneity', 'Free Spirit', 'Leap of Faith', 'Originality'],
    reversedKeywords: ['Recklessness', 'Hesitation', 'Risk-taking', 'Naivety', 'Carelessness', 'Stagnation'],
    uprightMeaning: 'The Fool signifies the start of an adventure, reminding you to approach life with openness, curiosity, and childlike wonder. You are embarking on a fresh journey where unlimited possibilities await.',
    reversedMeaning: 'Reversed, The Fool cautions against impulsive decisions or foolish negligence. Alternatively, it may indicate holding back due to fear of the unknown.',
    symbolism: [
      { symbol: 'The Precipice / Cliff', description: 'The threshold between the known mundane world and the boundless spiritual realm of infinite possibilities.' },
      { symbol: 'The White Dog', description: 'Loyal instinct and animal intuition warning you of peril while encouraging brave steps forward.' },
      { symbol: 'The White Rose', description: 'Purity of intent, desireless state of innocence, and divine passion.' },
      { symbol: 'The Knapsack & Wand', description: 'Untapped potential and latent subconscious memories carried lightly on the journey.' }
    ],
    lifeSpheres: {
      career: 'A golden opportunity to start a brand new endeavor or take an unorthodox career path with bold creativity.',
      love: 'Exciting romantic sparks, spontaneous encounters, or approaching love with an open, unburdened heart.',
      spirituality: 'A spiritual awakening where you step outside dogmatic rules to embrace genuine personal discovery.',
      advice: 'Trust the universe. Take the leap of faith, but keep your eyes on the terrain beneath you.'
    },
    dailyContemplation: 'What exciting path would you explore today if you released fear of looking foolish?',
    affirmation: 'I embrace new beginnings with joyful courage and an open heart.',
    artTheme: {
      primaryColor: '#F59E0B',
      secondaryColor: '#38BDF8',
      accentColor: '#FDE047',
      icon: 'sparkles',
      sceneDescription: 'A youthful wanderer poised at the cliff’s edge beneath a brilliant golden sun with a faithful white companion.'
    }
  },
  {
    id: 'the-magician',
    name: 'The Magician',
    number: 1,
    romanNumeral: 'I',
    arcana: 'major',
    suit: null,
    element: 'Air',
    astrologicalCorrespondence: 'Mercury',
    esotericTitle: 'The Magus of Power',
    summary: 'Manifestation, personal mastery, resourcefulness, and channeling divine inspiration into physical reality.',
    uprightKeywords: ['Manifestation', 'Resourcefulness', 'Power', 'Inspired Action', 'Skill', 'Focus'],
    reversedKeywords: ['Illusion', 'Manipulation', 'Untapped Talents', 'Scattered Energy', 'Deception'],
    uprightMeaning: 'The Magician represents your innate power to transform thought into form. You possess all the elemental tools required—Wand (Fire), Cup (Water), Sword (Air), and Pentacle (Earth)—to accomplish your goals.',
    reversedMeaning: 'Reversed, beware of deceptive promises, imposter syndrome, or misdirecting your immense creative gifts toward superficial manipulation.',
    symbolism: [
      { symbol: 'The Lemniscate (Infinity)', description: 'Infinite conscious energy, eternal wisdom, and mental mastery.' },
      { symbol: 'As Above, So Below', description: 'Right hand pointing to the heavens, left pointing to the earth—bridging divine spirit into tangible matter.' },
      { symbol: 'Four Elemental Tokens on the Table', description: 'Wand (willpower), Cup (emotion), Sword (intellect), and Pentacle (materiality).' },
      { symbol: 'Red Cloak and White Tunic', description: 'Worldly passion and pure, uncorrupted knowledge.' }
    ],
    lifeSpheres: {
      career: 'High clarity, persuasion, and the power to execute major projects with laser focus.',
      love: 'Magnetism, strong communication, and the ability to attract meaningful resonance.',
      spirituality: 'Active visualization and conscious manifestation aligning your higher self with everyday actions.',
      advice: 'Stop waiting for external permission. Channel your inner resources and build what you envision.'
    },
    dailyContemplation: 'Which elemental resource (Will, Emotion, Intellect, or Physical Effort) do you need to activate right now?',
    affirmation: 'I possess all the tools within me to manifest my highest purpose.',
    artTheme: {
      primaryColor: '#EF4444',
      secondaryColor: '#EAB308',
      accentColor: '#FCA5A5',
      icon: 'wand',
      sceneDescription: 'A robed master holding a double-ended wand aloft beneath a glowing lemniscate, surrounded by four elemental relics.'
    }
  },
  {
    id: 'the-high-priestess',
    name: 'The High Priestess',
    number: 2,
    romanNumeral: 'II',
    arcana: 'major',
    suit: null,
    element: 'Water',
    astrologicalCorrespondence: 'The Moon',
    esotericTitle: 'The Priestess of the Silver Star',
    summary: 'Intuition, sacred mysteries, subconscious wisdom, divine feminine stillness, and esoteric secrets.',
    uprightKeywords: ['Intuition', 'Sacred Knowledge', 'Subconscious', 'Mystery', 'Divine Feminine', 'Stillness'],
    reversedKeywords: ['Hidden Agendas', 'Ignored Intuition', 'Secrets', 'Superficiality', 'Disconnection'],
    uprightMeaning: 'The High Priestess sits at the veil of the subconscious mind. She calls on you to look past surface noise and listen to the soft, infallible whispers of your inner intuitive guidance.',
    reversedMeaning: 'Reversed indicates that you may be silencing your gut instinct or caught in intellectual overthinking instead of trusting what you intuitively sense.',
    symbolism: [
      { symbol: 'Pillars of Boaz and Jachin', description: 'Black and white pillars representing duality, shadow and light, passivity and action.' },
      { symbol: 'The Veil of Pomegranates', description: 'Fertility, abundance, and the boundary separating the conscious mind from esoteric depths.' },
      { symbol: 'The Scroll of TORA', description: 'Ancient esoteric law, spiritual truth partially veiled to test the seeker’s inner discernment.' },
      { symbol: 'Crescent Moon at Her Feet', description: 'Rulership over tidal emotions, dreams, and subconscious cycles.' }
    ],
    lifeSpheres: {
      career: 'Observe workplace dynamics quietly before making strategic moves; hidden insights will soon surface.',
      love: 'Deep soulful telepathy, spiritual connection, or keeping certain feelings sacred and private for now.',
      spirituality: 'Lucid dreams, meditation, and paying close attention to synchronicities and omens.',
      advice: 'Silence the outer chatter. The answer you seek is already resting within your quiet intuition.'
    },
    dailyContemplation: 'What is your quiet inner voice telling you that your logical mind is trying to rationalize away?',
    affirmation: 'I trust my intuition and honor the quiet wisdom of my soul.',
    artTheme: {
      primaryColor: '#3B82F6',
      secondaryColor: '#6366F1',
      accentColor: '#93C5FD',
      icon: 'moon',
      sceneDescription: 'A serene priestess seated between dark and light pillars before a veil of pomegranates, with a horned moon crown.'
    }
  },
  {
    id: 'the-empress',
    name: 'The Empress',
    number: 3,
    romanNumeral: 'III',
    arcana: 'major',
    suit: null,
    element: 'Earth',
    astrologicalCorrespondence: 'Venus',
    esotericTitle: 'The Daughter of the Mighty Ones',
    summary: 'Abundance, fertility, nurturing creation, sensory luxury, and the flourishing beauty of Mother Nature.',
    uprightKeywords: ['Abundance', 'Nurturing', 'Fertility', 'Sensuality', 'Creativity', 'Mother Nature'],
    reversedKeywords: ['Creative Block', 'Over-dependence', 'Smothering', 'Depletion', 'Neglect'],
    uprightMeaning: 'The Empress embodies lush harvest and fertile creativity. She invites you to nurture your passions, indulge your senses in beauty, and create a sanctuary of warmth and kindness.',
    reversedMeaning: 'Reversed points to creative fatigue, people-pleasing at the expense of your own vitality, or neglecting your physical well-being.',
    symbolism: [
      { symbol: 'Crown of Twelve Stars', description: 'The twelve zodiac signs and celestial harmony guiding earthly seasons.' },
      { symbol: 'Golden Wheat Field', description: 'Bountiful harvest, physical abundance, and the fruitful rewards of patience.' },
      { symbol: 'Waterfall and Forest', description: 'The free flow of emotions nourishing physical creation and vitality.' },
      { symbol: 'Venus Shield', description: 'Unconditional love, harmonious beauty, and radical self-worth.' }
    ],
    lifeSpheres: {
      career: 'A period of rich creative output, artistic breakthrough, and rewarding collaborative projects.',
      love: 'Warm, affectionate, supportive love; deep emotional security and blossoming romance.',
      spirituality: 'Connecting with the Earth, forest bathing, and honoring your body as a sacred temple.',
      advice: 'Nurture yourself first so you can create and give from an overflowing cup.'
    },
    dailyContemplation: 'How can you bring more beauty, comfort, and sensual appreciation into your immediate space today?',
    affirmation: 'I am surrounded by boundless abundance and nurture my creative gifts.',
    artTheme: {
      primaryColor: '#10B981',
      secondaryColor: '#F59E0B',
      accentColor: '#86EFAC',
      icon: 'heart',
      sceneDescription: 'A radiant queen in a gown adorned with myrtles, seated on velvet cushions in a lush sunlit wheat meadow.'
    }
  },
  {
    id: 'the-emperor',
    name: 'The Emperor',
    number: 4,
    romanNumeral: 'IV',
    arcana: 'major',
    suit: null,
    element: 'Fire',
    astrologicalCorrespondence: 'Aries',
    esotericTitle: 'The Son of the Morning',
    summary: 'Authority, structure, discipline, sovereign leadership, and building lasting earthly foundations.',
    uprightKeywords: ['Authority', 'Structure', 'Discipline', 'Leadership', 'Stability', 'Foundation'],
    reversedKeywords: ['Tyranny', 'Rigidity', 'Lack of Discipline', 'Chaos', 'Micromanagement'],
    uprightMeaning: 'The Emperor represents solid systems, rational strategy, and self-mastery. He calls on you to take ownership of your realm, establish healthy boundaries, and build with conviction.',
    reversedMeaning: 'Reversed suggests rigid stubbornness, abusive micromanagement, or conversely, a disorganized lack of structure that invites turmoil.',
    symbolism: [
      { symbol: 'Stone Throne with Ram Heads', description: 'Unyielding Aries determination, pioneering spirit, and stable authority.' },
      { symbol: 'Ankh Scepter and Golden Orb', description: 'The symbol of life and sovereignty over the material domain.' },
      { symbol: 'Armor Beneath the Robe', description: 'Constant readiness to protect the realm and uphold order.' },
      { symbol: 'Barren Mountains in Background', description: 'Solid unshakeable resolve and heights attained through grit.' }
    ],
    lifeSpheres: {
      career: 'Time to lead, establish clear processes, organize finances, and take commanding charge of goals.',
      love: 'Commitment, stability, and clear boundaries that make partners feel secure and respected.',
      spirituality: 'Spiritual discipline, daily rituals, and anchoring mystical concepts into practical daily life.',
      advice: 'Take command of your day. Structure is not confinement; it is the scaffolding of freedom.'
    },
    dailyContemplation: 'Where in your life do you need to bring firmer discipline or assert clearer boundaries?',
    affirmation: 'I lead my life with clarity, strength, and unwavering stability.',
    artTheme: {
      primaryColor: '#DC2626',
      secondaryColor: '#B45309',
      accentColor: '#F87171',
      icon: 'shield',
      sceneDescription: 'A stern, bearded monarch seated on a stone throne sculpted with rams, holding an ankh scepter.'
    }
  },
  {
    id: 'the-hierophant',
    name: 'The Hierophant',
    number: 5,
    romanNumeral: 'V',
    arcana: 'major',
    suit: null,
    element: 'Earth',
    astrologicalCorrespondence: 'Taurus',
    esotericTitle: 'The Magus of the Eternal Gods',
    summary: 'Spiritual traditions, mentorship, lineage wisdom, shared ethics, and seeking higher knowledge.',
    uprightKeywords: ['Tradition', 'Mentorship', 'Spiritual Wisdom', 'Lineage', 'Ethics', 'Belief Systems'],
    reversedKeywords: ['Rebellion', 'Dogma', 'Unconventional Beliefs', 'Rigid Orthodoxy', 'Hypocrisy'],
    uprightMeaning: 'The Hierophant acts as a bridge between the spiritual and communal worlds. He invites you to study established wisdom, seek mentorship, and align with core ethical foundations.',
    reversedMeaning: 'Reversed encourages questioning outdated dogma, breaking away from rigid social expectations, and forging your personal spiritual path.',
    symbolism: [
      { symbol: 'Triple Crown and Triple Cross', description: 'Authority over the conscious, subconscious, and superconscious spiritual planes.' },
      { symbol: 'Crossed Golden Keys', description: 'Unlocking conscious understanding and esoteric revelation.' },
      { symbol: 'Two Initiates / Acolytes', description: 'The transmission of lineage wisdom from teacher to student.' }
    ],
    lifeSpheres: {
      career: 'Collaborating within institutions, pursuing certifications, or learning from seasoned mentors.',
      love: 'Shared values, traditional commitments, marriage, and deep philosophical alignment.',
      spirituality: 'Studying sacred texts, participating in group rituals, or finding wisdom in ancient teachings.',
      advice: 'Honor the proven wisdom of the past while remaining true to your personal moral compass.'
    },
    dailyContemplation: 'What tradition or mentor has shaped your values, and what belief are you now ready to refine?',
    affirmation: 'I seek truth with an open mind and honor the lessons of collective wisdom.',
    artTheme: {
      primaryColor: '#7C3AED',
      secondaryColor: '#D97706',
      accentColor: '#C4B5FD',
      icon: 'book-open',
      sceneDescription: 'A papal spiritual teacher flanked by twin pillars, bestowing blessings upon two kneeling seekers.'
    }
  },
  {
    id: 'the-lovers',
    name: 'The Lovers',
    number: 6,
    romanNumeral: 'VI',
    arcana: 'major',
    suit: null,
    element: 'Air',
    astrologicalCorrespondence: 'Gemini',
    esotericTitle: 'The Children of the Voice',
    summary: 'Sacred union, alignment of values, soulmate harmony, and vital crossroads requiring moral choice.',
    uprightKeywords: ['Love', 'Harmonious Union', 'Values Alignment', 'Crucial Choice', 'Soul Connection', 'Attraction'],
    reversedKeywords: ['Disharmony', 'Misalignment', 'Inner Conflict', 'Bad Choices', 'Codependency'],
    uprightMeaning: 'The Lovers represents the sacred synthesis of dualities—heart and mind, masculine and feminine. It signifies authentic connection and making choices that deeply reflect your core values.',
    reversedMeaning: 'Reversed points to conflicting priorities, internal dissonance, or staying in relationships where fundamental values clash.',
    symbolism: [
      { symbol: 'Archangel Raphael', description: 'Divine blessing, emotional healing, and the higher superconscious observing the union.' },
      { symbol: 'Tree of Life & Tree of Knowledge', description: 'Twelve fiery fruits of desire on one side, serpent of wisdom on the other.' },
      { symbol: 'Mountain Peak in Background', description: 'The peak of transcendent consciousness achieved through unified love.' }
    ],
    lifeSpheres: {
      career: 'Synergistic partnerships, joint ventures, or choosing a path aligned with your integrity.',
      love: 'Profound soul connection, mutual vulnerability, romantic passion, and committed honesty.',
      spirituality: 'Integrating your inner masculine and feminine energies into harmonious wholeness.',
      advice: 'Make your decisions today from love and deep personal truth, not from fear or convenience.'
    },
    dailyContemplation: 'If you had to make a crucial choice today solely based on your deepest core values, what would it be?',
    affirmation: 'I choose with love, act with integrity, and attract harmonious connections.',
    artTheme: {
      primaryColor: '#EC4899',
      secondaryColor: '#8B5CF6',
      accentColor: '#F472B6',
      icon: 'heart-handshake',
      sceneDescription: 'Two souls standing blessed beneath the outstretched wings of Archangel Raphael against a sunlit landscape.'
    }
  },
  {
    id: 'the-chariot',
    name: 'The Chariot',
    number: 7,
    romanNumeral: 'VII',
    arcana: 'major',
    suit: null,
    element: 'Water',
    astrologicalCorrespondence: 'Cancer',
    esotericTitle: 'The Child of the Powers of the Waters',
    summary: 'Willpower, triumph over opposing forces, focused determination, momentum, and self-conquest.',
    uprightKeywords: ['Willpower', 'Determination', 'Victory', 'Drive', 'Self-Discipline', 'Momentum'],
    reversedKeywords: ['Lack of Control', 'Aggression', 'Obstacles', 'Directionless', 'Burnout'],
    uprightMeaning: 'The Chariot heralds triumph through resolute focus. By harmonizing opposing inner impulses (represented by the black and white sphinxes), you steer your life toward decisive victory.',
    reversedMeaning: 'Reversed warns against bulldozing over others aggressively or feeling powerless because your energies are pulling in conflicting directions.',
    symbolism: [
      { symbol: 'Black and White Sphinxes', description: 'Opposing emotional and rational impulses harnessed together through pure will.' },
      { symbol: 'Canopy of Stars', description: 'Divine celestial protection and celestial alignment with destiny.' },
      { symbol: 'Armor and Sun Crest', description: 'Invincible confidence forged through inner discipline and mastery.' }
    ],
    lifeSpheres: {
      career: 'Rapid advancement, winning competitive bids, and overcoming technical or organizational hurdles.',
      love: 'Navigating relationship challenges by keeping open dialogue and aligning on shared goals.',
      spirituality: 'Channeling raw emotions into disciplined spiritual focus and meditation mastery.',
      advice: 'Keep your eyes on the goal. Harness your conflicting feelings and drive forward with calm confidence.'
    },
    dailyContemplation: 'What two opposing desires are competing inside you, and how can you direct them toward one common goal?',
    affirmation: 'With focused will and steady discipline, I overcome every obstacle.',
    artTheme: {
      primaryColor: '#2563EB',
      secondaryColor: '#F59E0B',
      accentColor: '#60A5FA',
      icon: 'compass',
      sceneDescription: 'A triumphant warrior steering a celestial-canopied vehicle drawn by twin sphinxes of light and shadow.'
    }
  },
  {
    id: 'strength',
    name: 'Strength',
    number: 8,
    romanNumeral: 'VIII',
    arcana: 'major',
    suit: null,
    element: 'Fire',
    astrologicalCorrespondence: 'Leo',
    esotericTitle: 'The Daughter of the Flaming Sword',
    summary: 'Gentle courage, compassion over force, taming inner passions, resilience, and emotional fortitude.',
    uprightKeywords: ['Inner Courage', 'Compassion', 'Patience', 'Resilience', 'Taming Passions', 'Kindness'],
    reversedKeywords: ['Self-Doubt', 'Impatience', 'Raw Anger', 'Weakness', 'Vulnerability'],
    uprightMeaning: 'Strength demonstrates that true power is not brute aggression, but gentle persuasion, boundless patience, and steady moral courage. You conquer outer challenges by first calming inner fears.',
    reversedMeaning: 'Reversed suggests wrestling with self-criticism, giving into explosive anger, or feeling drained by prolonged emotional battles.',
    symbolism: [
      { symbol: 'The Lion Gently Caressed', description: 'Animal instincts and raw passions tempered through love rather than violence.' },
      { symbol: 'Lemniscate Above the Head', description: 'Infinite spiritual mastery through continuous patience and kindness.' },
      { symbol: 'Garland of Flowers', description: 'Beauty and gentleness binding the untamed forces of nature in harmony.' }
    ],
    lifeSpheres: {
      career: 'Diffusing tense workplace meetings with diplomatic grace and quiet, undeniable competence.',
      love: 'Patience with a partner’s vulnerabilities, healing past arguments through empathetic listening.',
      spirituality: 'Accepting your shadow traits with unconditional love rather than harsh suppression.',
      advice: 'Respond with kindness instead of wrath. Softness is the greatest armor.'
    },
    dailyContemplation: 'Where would a gentle, patient touch yield far greater results today than forcing an outcome?',
    affirmation: 'My true strength lies in quiet confidence, patience, and love.',
    artTheme: {
      primaryColor: '#F97316',
      secondaryColor: '#EAB308',
      accentColor: '#FDBA74',
      icon: 'sun',
      sceneDescription: 'A calm woman crowned with flowers gently holding open the jaws of a majestic golden lion.'
    }
  },
  {
    id: 'the-hermit',
    name: 'The Hermit',
    number: 9,
    romanNumeral: 'IX',
    arcana: 'major',
    suit: null,
    element: 'Earth',
    astrologicalCorrespondence: 'Virgo',
    esotericTitle: 'The Prophet of the Eternal',
    summary: 'Soul-searching, introspection, inner illumination, solitude, and becoming a beacon of wisdom.',
    uprightKeywords: ['Soul-Searching', 'Introspection', 'Inner Light', 'Solitude', 'Wisdom', 'Guidance'],
    reversedKeywords: ['Isolation', 'Loneliness', 'Withdrawal', 'Paranoia', 'Refusing Help'],
    uprightMeaning: 'The Hermit retreats from the cacophony of the world to illuminate the deeper truth of existence. He reminds you that answers to life’s most profound questions are found in quiet self-reflection.',
    reversedMeaning: 'Reversed warns of anti-social isolation, losing touch with your community, or burying your head in the sand to avoid reality.',
    symbolism: [
      { symbol: 'Lantern with Six-Pointed Star', description: 'The Seal of Solomon / Star of Hermes illuminating the dark road with truth.' },
      { symbol: 'Golden Staff', description: 'Spiritual authority, steady ground, and the pilgrim’s unwavering focus.' },
      { symbol: 'Snowy Mountain Peak', description: 'Heights of spiritual attainment reached through patient solitary contemplation.' }
    ],
    lifeSpheres: {
      career: 'Stepping back to analyze long-term career strategy rather than reacting to daily emergencies.',
      love: 'Taking healthy personal space to understand your emotional needs before engaging deeply.',
      spirituality: 'Deep meditation, reading sacred philosophy, journaling, and listening to your soul.',
      advice: 'Carve out time for quiet solitude today. Your inner lantern will light the way.'
    },
    dailyContemplation: 'What truth is waiting for you in the quiet silence if you disconnect from screens and chatter today?',
    affirmation: 'I look within to discover my truth and walk by the light of my inner wisdom.',
    artTheme: {
      primaryColor: '#64748B',
      secondaryColor: '#F59E0B',
      accentColor: '#94A3B8',
      icon: 'flame',
      sceneDescription: 'An elder pilgrim in a gray mantle standing atop a snowy ridge holding a glowing star lantern.'
    }
  },
  {
    id: 'wheel-of-fortune',
    name: 'Wheel of Fortune',
    number: 10,
    romanNumeral: 'X',
    arcana: 'major',
    suit: null,
    element: 'Fire',
    astrologicalCorrespondence: 'Jupiter',
    esotericTitle: 'The Lord of the Forces of Life',
    summary: 'Karmic cycles, destiny, shifts in fortune, inevitable change, and finding your center amidst life’s rotation.',
    uprightKeywords: ['Cycles of Life', 'Destiny', 'Good Fortune', 'Turning Point', 'Karma', 'Inevitable Change'],
    reversedKeywords: ['Bad Luck', 'Resisting Change', 'Negative Cycles', 'Setbacks', 'Helplessness'],
    uprightMeaning: 'The Wheel of Fortune turns perpetually. It signals a major turning point, reminding you that all conditions—joy and challenge alike—are temporary phases in the grand cosmic cycle.',
    reversedMeaning: 'Reversed reminds you that resisting natural cycles only magnifies suffering. Break recurring toxic patterns by recognizing your role in the loop.',
    symbolism: [
      { symbol: 'The Rotating Wheel with Hebrew Letters (YHVH)', description: 'The cosmic mechanism of destiny and eternal divine cycles.' },
      { symbol: 'Four Winged Creatures in the Corners', description: 'The fixed signs of the zodiac (Lion, Bull, Eagle, Angel) representing enduring stability.' },
      { symbol: 'The Sphinx, Anubis, and Typhon', description: 'Wisdom presiding at the top, ascending soul, and descending transformative force.' }
    ],
    lifeSpheres: {
      career: 'Unexpected fortunate breaks, timely synchronicities, or sudden opportunities entering your sphere.',
      love: 'Fated encounters, turning points in commitment, and learning karmic lessons together.',
      spirituality: 'Recognizing synchronicity and trusting that life unfolds in divine timing.',
      advice: 'Stay anchored in your center. When the wheel spins fast, the hub remains still.'
    },
    dailyContemplation: 'What recurring life pattern is presenting itself today, and how can you respond with higher awareness?',
    affirmation: 'I embrace the shifting cycles of life, knowing all change serves my highest evolution.',
    artTheme: {
      primaryColor: '#8B5CF6',
      secondaryColor: '#F59E0B',
      accentColor: '#A78BFA',
      icon: 'disc',
      sceneDescription: 'A golden wheel inscribed with mystical sigils surrounded by celestial winged beings in the clouds.'
    }
  },
  {
    id: 'justice',
    name: 'Justice',
    number: 11,
    romanNumeral: 'XI',
    arcana: 'major',
    suit: null,
    element: 'Air',
    astrologicalCorrespondence: 'Libra',
    esotericTitle: 'The Daughter of the Lords of Truth',
    summary: 'Universal truth, karma, fair balance, accountability, objective clarity, and moral integrity.',
    uprightKeywords: ['Truth', 'Fairness', 'Karma', 'Accountability', 'Clarity', 'Integrity'],
    reversedKeywords: ['Unfairness', 'Dishonesty', 'Bias', 'Avoiding Accountability', 'Harsh Judgment'],
    uprightMeaning: 'Justice sits with scales and sword, representing divine equilibrium. Every action yields an equal reaction. It calls for total honesty, fairness, and clear-eyed objective evaluation.',
    reversedMeaning: 'Reversed warns against blame-shifting, biased decisions, or being subjected to unfair treatment. Look deeply at where you might be deceiving yourself.',
    symbolism: [
      { symbol: 'The Upright Double-Edged Sword', description: 'Discernment that cuts through falsehood, with consequences for both sides.' },
      { symbol: 'Golden Balanced Scales', description: 'Impartial weighing of intent, action, evidence, and karmic balance.' },
      { symbol: 'Purple Veil of Intuitive Truth', description: 'Spiritual equilibrium behind worldly legal and ethical matters.' }
    ],
    lifeSpheres: {
      career: 'Fair contracts, ethical decisions, balanced negotiations, and receiving just compensation for hard work.',
      love: 'Radical honesty, equal emotional reciprocity, and resolving disputes with open, mature dialogue.',
      spirituality: 'Karmic balancing; understanding the spiritual law of cause and effect in your daily choices.',
      advice: 'Act with uncompromising integrity. The truth always clears the fog.'
    },
    dailyContemplation: 'Are your actions and words currently in complete alignment with what you know to be fair and true?',
    affirmation: 'I choose honesty, act with fairness, and walk in balance.',
    artTheme: {
      primaryColor: '#0EA5E9',
      secondaryColor: '#EAB308',
      accentColor: '#7DD3FC',
      icon: 'scale',
      sceneDescription: 'A crowned figure in crimson robes holding balanced golden scales and an upright steel blade.'
    }
  },
  {
    id: 'the-hanged-man',
    name: 'The Hanged Man',
    number: 12,
    romanNumeral: 'XII',
    arcana: 'major',
    suit: null,
    element: 'Water',
    astrologicalCorrespondence: 'Neptune',
    esotericTitle: 'The Magus of the Mighty Deluge',
    summary: 'Surrender, shifting perspectives, enlightened suspension, letting go of control, and sacred pause.',
    uprightKeywords: ['Surrender', 'New Perspective', 'Sacred Pause', 'Letting Go', 'Enlightenment', 'Patience'],
    reversedKeywords: ['Stalling', 'Resisting Surrender', 'Martyrdom', 'Futile Struggle', 'Narrow Mindset'],
    uprightMeaning: 'The Hanged Man willingly suspends himself upside down. By relinquishing ego control and pausing frantic motion, he gains a transcendent perspective and profound spiritual illumination.',
    reversedMeaning: 'Reversed suggests stubborn resistance to necessary change, playing the martyr, or waiting passively when direct action is required.',
    symbolism: [
      { symbol: 'The Golden Halo around the Head', description: 'Enlightenment and divine epiphany achieved through willing sacrifice.' },
      { symbol: 'Suspension in the Shape of the Ankh', description: 'Crossed legs forming a four and open arms a triangle—the spirit transcending physical gravity.' },
      { symbol: 'Living Wood of the T-Cross', description: 'Organic spiritual growth fed by deep patience and acceptance.' }
    ],
    lifeSpheres: {
      career: 'A project may be on temporary hold; use this pause to re-examine the strategy from an inverted angle.',
      love: 'Letting go of the need to always be right; seeing the relationship through your partner’s eyes.',
      spirituality: 'Surrendering ego attachments and resting in deep contemplative surrender.',
      advice: 'Stop forcing the river. Yield gracefully and observe what reveals itself in stillness.'
    },
    dailyContemplation: 'What would happen if you completely stopped pushing against a current obstacle today and simply observed?',
    affirmation: 'I release control and welcome new perspectives with an open spirit.',
    artTheme: {
      primaryColor: '#06B6D4',
      secondaryColor: '#6366F1',
      accentColor: '#67E8F9',
      icon: 'eye',
      sceneDescription: 'A serene figure suspended by one ankle from a living wooden beam, glowing with a golden halo.'
    }
  },
  {
    id: 'death',
    name: 'Death',
    number: 13,
    romanNumeral: 'XIII',
    arcana: 'major',
    suit: null,
    element: 'Water',
    astrologicalCorrespondence: 'Scorpio',
    esotericTitle: 'The Child of the Great Transformers',
    summary: 'Profound transformation, necessary endings, shedding the old, clearing space for vibrant rebirth.',
    uprightKeywords: ['Transformation', 'Endings', 'Rebirth', 'Transition', 'Letting Go', 'Metamorphosis'],
    reversedKeywords: ['Fear of Change', 'Clinging to the Past', 'Decay', 'Stagnation', 'Resisting the Inevitable'],
    uprightMeaning: 'Death rarely signifies physical demise; it represents the essential death of an old identity, worn-out pattern, or completed chapter. It clears the fertile ground so the new dawn can rise.',
    reversedMeaning: 'Reversed indicates clinging to decomposing situations, prolonging suffering by refusing to let go of what is already finished.',
    symbolism: [
      { symbol: 'Black Armor and White Horse', description: 'Invincible, impartial nature of time and purity of transformative purpose.' },
      { symbol: 'Mystic Five-Petaled Rose on Banner', description: 'Life force, beauty, and the promise of resurrection.' },
      { symbol: 'Rising Sun Between Twin Towers', description: 'Immortality of spirit and the inevitable dawn after every dark night.' },
      { symbol: 'Fallen King and Praying Child', description: 'Worldly status cannot prevent transformation; innocence welcomes it without fear.' }
    ],
    lifeSpheres: {
      career: 'Closing an old role or outdated workflow to make room for a dramatically upgraded professional chapter.',
      love: 'Transforming old dynamics, releasing past attachments, or closing an unhealthy relational cycle.',
      spirituality: 'Ego death, shedding self-limiting beliefs, and deep spiritual regeneration.',
      advice: 'Release what has run its course. Make way for the magnificent rebirth awaiting you.'
    },
    dailyContemplation: 'What worn-out habit or belief is ready to be gently laid to rest today so you can truly thrive?',
    affirmation: 'I release the past with gratitude and welcome my powerful transformation.',
    artTheme: {
      primaryColor: '#475569',
      secondaryColor: '#E2E8F0',
      accentColor: '#94A3B8',
      icon: 'sparkle',
      sceneDescription: 'An armored skeleton bearing a black banner with a white mystic rose as the sun rises between distant towers.'
    }
  },
  {
    id: 'temperance',
    name: 'Temperance',
    number: 14,
    romanNumeral: 'XIV',
    arcana: 'major',
    suit: null,
    element: 'Fire',
    astrologicalCorrespondence: 'Sagittarius',
    esotericTitle: 'The Daughter of the Reconcilers',
    summary: 'Alchemy, harmony, moderation, patient blending of opposites, middle path, and spiritual healing.',
    uprightKeywords: ['Balance', 'Moderation', 'Alchemy', 'Patience', 'Harmony', 'Inner Peace'],
    reversedKeywords: ['Imbalance', 'Excess', 'Impatience', 'Clashing Forces', 'Extremism'],
    uprightMeaning: 'Temperance represents divine alchemy. An angel pours water between two golden vessels without spilling a drop, demonstrating how moderation, emotional balance, and patient integration heal all extremes.',
    reversedMeaning: 'Reversed points to excess, burnout, emotional volatility, or trying to rush a delicate process that requires time.',
    symbolism: [
      { symbol: 'Water Flowing Between Twin Cups', description: 'Continuous harmonious exchange between conscious and subconscious realms.' },
      { symbol: 'One Foot on Earth, One in Water', description: 'Grounded in reality while deeply connected to intuitive currents.' },
      { symbol: 'Path to the Golden Crown on the Horizon', description: 'The steady spiritual journey toward ultimate enlightenment.' }
    ],
    lifeSpheres: {
      career: 'Finding sustainable work-life balance; mediating team disputes with calm diplomatic finesse.',
      love: 'Deep mutual compromise, emotional healing, and gentle, loving reciprocity.',
      spirituality: 'Synthesizing diverse ideas into a unified, peaceful personal philosophy.',
      advice: 'Walk the middle path. Blend patience with passion, and keep your inner equilibrium.'
    },
    dailyContemplation: 'Where in your life can you replace an extreme reaction with a calm, balanced middle approach today?',
    affirmation: 'I cultivate balance, harmony, and peace within my mind and heart.',
    artTheme: {
      primaryColor: '#14B8A6',
      secondaryColor: '#F59E0B',
      accentColor: '#5EEAD4',
      icon: 'droplets',
      sceneDescription: 'A winged angel pouring water continuously between two golden cups with one foot on land and one in water.'
    }
  },
  {
    id: 'the-devil',
    name: 'The Devil',
    number: 15,
    romanNumeral: 'XV',
    arcana: 'major',
    suit: null,
    element: 'Earth',
    astrologicalCorrespondence: 'Capricorn',
    esotericTitle: 'The Lord of the Gates of Matter',
    summary: 'Shadow self, illusions of entrapment, unhealthy attachments, addictions, and reclaiming personal sovereignty.',
    uprightKeywords: ['Shadow Self', 'Materialism', 'Unhealthy Attachments', 'Illusion', 'Addiction', 'Liberation Potential'],
    reversedKeywords: ['Breaking Free', 'Reclaiming Power', 'Overcoming Addiction', 'Facing Shadows', 'Awakening'],
    uprightMeaning: 'The Devil reveals where we bind ourselves through fear, materialism, or compulsive habits. Notice that the chains around the figures’ necks are loose—freedom is always available the moment you choose awareness.',
    reversedMeaning: 'Reversed is a triumphant sign of breaking chains, releasing toxic dependencies, and stepping out of psychological entrapment into autonomy.',
    symbolism: [
      { symbol: 'Loose Chains around the Necks', description: 'The entrapment is self-imposed and psychological; it can be slipped off at any time.' },
      { symbol: 'Inverted Pentagram on Brow', description: 'Spirit subordinated to matter and raw primal urges.' },
      { symbol: 'Half-Beast Baphomet Figure', description: 'The untamed animalistic subconscious that must be integrated, not denied.' }
    ],
    lifeSpheres: {
      career: 'Beware of golden handcuffs, toxic hustle culture, or compromising values for fleeting financial status.',
      love: 'Codependency, obsession, jealousy, or superficial physical attraction without emotional respect.',
      spirituality: 'Shadow work: confronting repressed shame and bringing it into the healing light of consciousness.',
      advice: 'Look at what holds you captive. Recognize that you hold the key to your own liberation.'
    },
    dailyContemplation: 'What habit, thought loop, or attachment are you ready to admit has power over you, and how will you step free?',
    affirmation: 'I release all unhealthy attachments and reclaim my personal freedom.',
    artTheme: {
      primaryColor: '#991B1B',
      secondaryColor: '#450A0A',
      accentColor: '#F87171',
      icon: 'flame',
      sceneDescription: 'A winged goat-horned figure perched upon a stone altar, with chained human figures whose bonds are loose.'
    }
  },
  {
    id: 'the-tower',
    name: 'The Tower',
    number: 16,
    romanNumeral: 'XVI',
    arcana: 'major',
    suit: null,
    element: 'Fire',
    astrologicalCorrespondence: 'Mars',
    esotericTitle: 'The Lord of the Hosts of the Mighty',
    summary: 'Sudden revelation, shattering of false structures, breakthrough awakening, and rebuilding on true foundations.',
    uprightKeywords: ['Sudden Awakening', 'Shattering Illusions', 'Breakthrough', 'Upheaval', 'Truth Revelation', 'Rebuilding'],
    reversedKeywords: ['Disaster Avoided', 'Delaying the Inevitable', 'Fear of Collapse', 'Internal Crisis'],
    uprightMeaning: 'Lightning strikes the arrogant stone tower, knocking off the false crown. While jarring, The Tower destroys only what was built on lies, ego, or illusion, paving the way for authentic liberation.',
    reversedMeaning: 'Reversed warns against desperately holding onto a crumbling structure out of fear, or processing a private internal breakthrough.',
    symbolism: [
      { symbol: 'Lightning Bolt of Truth', description: 'Divine sudden illumination piercing through manufactured ego defenses.' },
      { symbol: 'Falling Crown', description: 'Dethroning false pride, arrogance, and rigid intellectual assumptions.' },
      { symbol: 'Twenty-Two Drops of Golden Flame', description: 'The 22 letters of creation reminding that destruction serves cosmic renewal.' }
    ],
    lifeSpheres: {
      career: 'Disruptive news or structural overhaul that frees you from a dead-end situation.',
      love: 'Hard truths coming to light that shatter illusions and demand authentic honest restructuring.',
      spirituality: 'Radical spiritual awakening that dismantles outdated dogmatic worldviews.',
      advice: 'Do not fear the collapse of what was built on illusion. Rejoice that truth has set you free.'
    },
    dailyContemplation: 'What fragile assumption in your life needs to crumble so something genuinely resilient can take its place?',
    affirmation: 'I welcome the liberating power of truth and build my life on solid ground.',
    artTheme: {
      primaryColor: '#EA580C',
      secondaryColor: '#1E293B',
      accentColor: '#FDE047',
      icon: 'zap',
      sceneDescription: 'A stone tower struck by a bolt of lightning against a dark stormy sky, with golden sparks cascading down.'
    }
  },
  {
    id: 'the-star',
    name: 'The Star',
    number: 17,
    romanNumeral: 'XVII',
    arcana: 'major',
    suit: null,
    element: 'Air',
    astrologicalCorrespondence: 'Aquarius',
    esotericTitle: 'The Daughter of the Firmament',
    summary: 'Renewed hope, divine inspiration, serenity, emotional healing, faith in the universe, and lucid clarity.',
    uprightKeywords: ['Hope', 'Inspiration', 'Healing', 'Serenity', 'Faith', 'Blessings', 'Clarity'],
    reversedKeywords: ['Despair', 'Loss of Faith', 'Discouragement', 'Pessimism', 'Disconnection'],
    uprightMeaning: 'Following the storm of The Tower comes the radiant peace of The Star. It brings profound hope, spiritual replenishment, and a deep knowing that you are divinely guided and cherished.',
    reversedMeaning: 'Reversed suggests feeling cynical, disheartened, or temporarily disconnected from your sense of purpose and wonder.',
    symbolism: [
      { symbol: 'Great Eight-Pointed Golden Star', description: 'Cosmic guidance, hope, and the light of higher consciousness.' },
      { symbol: 'Twin Pitchers Pouring on Land and Sea', description: 'Generously returning spiritual waters to nourish both the subconscious and physical world.' },
      { symbol: 'The Ibis Bird in the Tree', description: 'The sacred bird of Thoth symbolizing wisdom, literature, and divine thought.' }
    ],
    lifeSpheres: {
      career: 'Creative inspiration at an all-time high; authentic visionary projects attracting widespread support.',
      love: 'Gentle, soothing romantic healing; pure vulnerability, deep spiritual trust, and mutual blessing.',
      spirituality: 'Profound peace during meditation; feeling the gentle presence of the universe supporting your path.',
      advice: 'Have boundless faith. You have weathered the dark; now bathe in the healing light of hope.'
    },
    dailyContemplation: 'What heartfelt wish or inspired vision are you ready to dedicate your genuine faith toward today?',
    affirmation: 'I am filled with peace, guided by hope, and open to the universe’s blessings.',
    artTheme: {
      primaryColor: '#0284C7',
      secondaryColor: '#E0E7FF',
      accentColor: '#38BDF8',
      icon: 'star',
      sceneDescription: 'A maiden kneeling beneath a radiant star-filled night sky, pouring crystal water into a pool and onto fertile earth.'
    }
  },
  {
    id: 'the-moon',
    name: 'The Moon',
    number: 18,
    romanNumeral: 'XVIII',
    arcana: 'major',
    suit: null,
    element: 'Water',
    astrologicalCorrespondence: 'Pisces',
    esotericTitle: 'The Ruler of Flux and Reflux',
    summary: 'Subconscious depth, dreams, illusions, navigating uncertainty, psychological shadow, and ancestral intuition.',
    uprightKeywords: ['Illusion', 'Subconscious', 'Intuition', 'Dreams', 'Uncertainty', 'Shadow Work'],
    reversedKeywords: ['Clarity Dawning', 'Overcoming Fear', 'Unmasking Secrets', 'Truth Emerging'],
    uprightMeaning: 'The Moon illuminates the mysterious landscape of the subconscious. Not everything is as it appears. Trust your instincts to navigate illusions, dreams, and hidden emotional currents.',
    reversedMeaning: 'Reversed signals that confusing fogs are beginning to lift, exposing illusions and restoring rational clarity.',
    symbolism: [
      { symbol: 'The Dog and the Wolf', description: 'The tame and wild aspects of our primal nature howling at the mystery of the psyche.' },
      { symbol: 'Crayfish Emerging from the Pool', description: 'Ancient subconscious memories and primal fears crawling into the light of awareness.' },
      { symbol: 'Winding Path Between Distant Towers', description: 'The narrow journey of initiation through the shadow realm toward higher dawn.' }
    ],
    lifeSpheres: {
      career: 'Postpone binding commitments if information seems ambiguous; investigate behind the scenes first.',
      love: 'Watch out for miscommunications fueled by projection, insecurity, or unresolved past hurts.',
      spirituality: 'Rich dreamwork, divination, and gentle exploration of the deep psychological subconscious.',
      advice: 'Do not let phantom fears paralyze you. Walk the path with steady, quiet intuitive discernment.'
    },
    dailyContemplation: 'What subtle anxiety or dream theme is trying to communicate a hidden message to your waking mind?',
    affirmation: 'I navigate through uncertainty with calm intuition and fearless trust.',
    artTheme: {
      primaryColor: '#4338CA',
      secondaryColor: '#FCD34D',
      accentColor: '#818CF8',
      icon: 'moon',
      sceneDescription: 'A full golden moon dripping dewdrops over two howling canines and a crayfish rising from a deep lagoon.'
    }
  },
  {
    id: 'the-sun',
    name: 'The Sun',
    number: 19,
    romanNumeral: 'XIX',
    arcana: 'major',
    suit: null,
    element: 'Fire',
    astrologicalCorrespondence: 'The Sun',
    esotericTitle: 'The Lord of the Fire of the World',
    summary: 'Radiant joy, vitality, triumphant success, clarity, celebration, warmth, and uninhibited confidence.',
    uprightKeywords: ['Radiant Joy', 'Vitality', 'Success', 'Celebration', 'Clarity', 'Enthusiasm', 'Confidence'],
    reversedKeywords: ['Temporary Cloud', 'Over-optimism', 'Depleted Energy', 'Delayed Celebration'],
    uprightMeaning: 'The Sun is the most auspicious card in the Tarot. It heralds pure joy, vitality, and triumphant clarity. Darkness dissipates completely as your true authentic self shines with effortless warmth.',
    reversedMeaning: 'Reversed merely indicates a passing cloud over your joy; the sun is still shining, waiting for you to look up.',
    symbolism: [
      { symbol: 'Great Radiant Smiling Sun', description: 'Conscious illumination, infinite life energy, and divine vitality.' },
      { symbol: 'Child on White Horse with Red Banner', description: 'Innocent joy, total freedom from shame, and triumphant ride through life.' },
      { symbol: 'Four Sunflowers Behind the Wall', description: 'The four elements brought into full, vibrant earthly blooming.' }
    ],
    lifeSpheres: {
      career: 'Outstanding recognition, career triumphs, profitable breakthroughs, and uplifting team enthusiasm.',
      love: 'Pure warmth, affectionate harmony, honest playfulness, and shared golden moments.',
      spirituality: 'Complete alignment with your divine light; feeling radiant gratitude for the gift of life.',
      advice: 'Shine without apology. Your warmth and authentic enthusiasm will illuminate everyone around you.'
    },
    dailyContemplation: 'What brings you genuine, childlike delight, and how can you celebrate that joy today?',
    affirmation: 'I radiate joyful vitality, confidence, and radiant light wherever I go.',
    artTheme: {
      primaryColor: '#EAB308',
      secondaryColor: '#F97316',
      accentColor: '#FEF08A',
      icon: 'sun',
      sceneDescription: 'A joyful child riding a gentle white steed beneath a glorious golden sun surrounded by blooming sunflowers.'
    }
  },
  {
    id: 'judgement',
    name: 'Judgement',
    number: 20,
    romanNumeral: 'XX',
    arcana: 'major',
    suit: null,
    element: 'Fire',
    astrologicalCorrespondence: 'Pluto',
    esotericTitle: 'The Spirit of the Primal Fire',
    summary: 'Higher calling, spiritual awakening, reckoning, forgiveness, life evaluation, and rebirth into purpose.',
    uprightKeywords: ['Higher Calling', 'Awakening', 'Reckoning', 'Forgiveness', 'Rebirth', 'Absolution'],
    reversedKeywords: ['Self-Doubt', 'Harsh Self-Criticism', 'Ignoring the Call', 'Guilt', 'Regret'],
    uprightMeaning: 'The archangel blows the cosmic trumpet, awakening souls from their stone tombs. You are hearing your true calling. Forgive the past, cast off outdated judgments, and rise into your higher purpose.',
    reversedMeaning: 'Reversed warns of crippling self-doubt, second-guessing your life calling, or drowning in regret over past mistakes.',
    symbolism: [
      { symbol: 'Archangel Gabriel with Golden Trumpet', description: 'The clarion call of divine consciousness awakening humanity.' },
      { symbol: 'Figures Rising from Open Tombs', description: 'Resurrection from mundane limitations into enlightened spiritual life.' },
      { symbol: 'Banner with Red Cross on White Field', description: 'Integration of matter and spirit, balance of conscious awakening.' }
    ],
    lifeSpheres: {
      career: 'A pivotal life decision; stepping up to a major vocation that aligns with your true soul mission.',
      love: 'Total forgiveness of past grievances; mutual renewal and clean-slate understanding.',
      spirituality: 'Profound spiritual initiation, answering the soul’s deepest longing, and letting go of guilt.',
      advice: 'Answer the call. Forgive yourself completely and step boldly into your higher chapter.'
    },
    dailyContemplation: 'What old judgment of yourself or another are you ready to completely forgive and release today?',
    affirmation: 'I hear my higher calling and rise into my true spiritual purpose.',
    artTheme: {
      primaryColor: '#6366F1',
      secondaryColor: '#F59E0B',
      accentColor: '#A5B4FC',
      icon: 'sparkles',
      sceneDescription: 'An archangel sounding a golden horn from the heavens as figures rise joyfully with open arms.'
    }
  },
  {
    id: 'the-world',
    name: 'The World',
    number: 21,
    romanNumeral: 'XXI',
    arcana: 'major',
    suit: null,
    element: 'Earth',
    astrologicalCorrespondence: 'Saturn',
    esotericTitle: 'The Great One of the Night of Time',
    summary: 'Wholeness, triumph, completion of a major cycle, cosmic integration, fulfillment, and ultimate mastery.',
    uprightKeywords: ['Completion', 'Wholeness', 'Integration', 'Fulfillment', 'Cosmic Harmony', 'Triumph'],
    reversedKeywords: ['Incomplete Cycle', 'Lack of Closure', 'Shortcut Seeking', 'Delays in Fulfillment'],
    uprightMeaning: 'The final card of the Major Arcana. The World celebrates full circle completion, mastery, and unity with all of existence. You have integrated all the lessons of the journey and step into joyful wholeness.',
    reversedMeaning: 'Reversed suggests that a small loose end needs resolution before you can fully celebrate complete closure.',
    symbolism: [
      { symbol: 'Dancing Figure inside Green Laurel Wreath', description: 'Victory, cosmic rhythm, and perpetual joy inside the sacred oval of eternity.' },
      { symbol: 'Two Wands in Hands', description: 'Mastery over both the invokative and evocative spiritual forces.' },
      { symbol: 'The Four Cherubic Creatures in Corners', description: 'Universal harmony of the four elements (Lion, Bull, Eagle, Angel) supporting the universe.' }
    ],
    lifeSpheres: {
      career: 'Major project completion, graduation, worldwide success, and reaching the pinnacle of a long goal.',
      love: 'A profound sense of completion and bliss in partnership; feeling truly home in love.',
      spirituality: 'Cosmic consciousness; sensing your unbreakable unity with the universe.',
      advice: 'Celebrate your victory. You have run the race with grace—savor your wholeness.'
    },
    dailyContemplation: 'What significant milestone or chapter of growth have you achieved that deserves your gratitude today?',
    affirmation: 'I am whole, complete, and aligned with the harmonious rhythm of the cosmos.',
    artTheme: {
      primaryColor: '#10B981',
      secondaryColor: '#8B5CF6',
      accentColor: '#6EE7B7',
      icon: 'globe',
      sceneDescription: 'A dancing figure draped in violet silk within a laurel wreath, flanked by the four cosmic guardians.'
    }
  }
];

// Helper to generate full 56 Minor Arcana with rich lore and symbolism
const SUIT_METADATA: Record<SuitType, { element: ElementType; color: string; accent: string; theme: string }> = {
  wands: { element: 'Fire', color: '#F97316', accent: '#FDBA74', theme: 'Passions, Willpower, Creative Energy, Action' },
  cups: { element: 'Water', color: '#0284C7', accent: '#7DD3FC', theme: 'Emotions, Intuition, Love, Relationships' },
  swords: { element: 'Air', color: '#6366F1', accent: '#A5B4FC', theme: 'Intellect, Truth, Challenges, Communication' },
  pentacles: { element: 'Earth', color: '#10B981', accent: '#6EE7B7', theme: 'Material Realm, Health, Craft, Abundance' }
};

interface MinorTemplate {
  rank: string;
  number: number;
  esotericTitle: string;
  summary: (suit: string) => string;
  uprightKeywords: (suit: string) => string[];
  reversedKeywords: (suit: string) => string[];
  uprightMeaning: (suit: string) => string;
  reversedMeaning: (suit: string) => string;
  lifeSpheres: (suit: string) => LifeSpheres;
  symbolism: (suit: string) => CardSymbol[];
  dailyContemplation: (suit: string) => string;
  affirmation: (suit: string) => string;
}

const MINOR_TEMPLATES: MinorTemplate[] = [
  {
    rank: 'Ace',
    number: 1,
    esotericTitle: 'The Root of the Powers of',
    summary: (suit) => `Pure, primal seed of ${suit}. A breakthrough spark of inspiration, feeling, clarity, or prosperity.`,
    uprightKeywords: (suit) => [`New ${suit.slice(0, -1)} Energy`, 'Inspiration', 'Pure Potential', 'Clarity', 'Gift'],
    reversedKeywords: (suit) => ['Missed Opportunity', 'Blocked Energy', 'Delays', 'Hesitation'],
    uprightMeaning: (suit) => `The Ace of ${suit} offers an untamed gift from the universe. Grab this fresh spark and nurture it into physical reality.`,
    reversedMeaning: (suit) => `Reversed, the initial momentum is feeling blocked or misdirected. Clear internal doubts.`,
    lifeSpheres: (suit) => ({
      career: `A brand new venture or brilliant idea is emerging in your professional world.`,
      love: `Fresh emotional spark, open-hearted vulnerability, or exciting new connection.`,
      spirituality: `Direct flash of intuitive illumination and creative alignment.`,
      advice: `Take hold of the opportunity presented to you today with bold confidence.`
    }),
    symbolism: (suit) => [
      { symbol: `The Divine Hand from the Cloud`, description: `The celestial gift of pure potential extended directly from the cosmos.` },
      { symbol: `Lush Landscape Below`, description: `Fertile earthly conditions ready to receive and grow this seed.` }
    ],
    dailyContemplation: (suit) => `What fresh spark or opportunity is trying to enter your awareness today?`,
    affirmation: (suit) => `I eagerly receive the fresh gifts and inspiration flowing to me.`
  },
  {
    rank: 'Two',
    number: 2,
    esotericTitle: 'The Lord of Dominion / Peace / Harmony',
    summary: (suit) => `Planning, duality, balance, partnership, and visionary contemplation in the realm of ${suit}.`,
    uprightKeywords: () => ['Planning', 'Decisions', 'Partnership', 'Balance', 'Future Vision'],
    reversedKeywords: () => ['Disorganization', 'Imbalance', 'Fear of Unknown', 'Hesitation'],
    uprightMeaning: (suit) => `The Two of ${suit} represents weighing two paths and making forward-looking plans with confidence.`,
    reversedMeaning: () => `Reversed warns against procrastination or refusing to commit to a direction.`,
    lifeSpheres: () => ({
      career: 'Evaluating long-term options and mapping out strategic moves.',
      love: 'Harmonious mutual understanding and balanced communication.',
      spirituality: 'Harmonizing conflicting internal desires into aligned peace.',
      advice: 'Look toward the horizon and plan your next steps with calm clarity.'
    }),
    symbolism: () => [
      { symbol: 'Twin Emblems Held in Balance', description: 'Duality, choices, and partnership.' }
    ],
    dailyContemplation: (suit) => `What decision requires thoughtful planning rather than impulsive reaction today?`,
    affirmation: () => `I balance my options with wisdom and plan my future with confidence.`
  },
  {
    rank: 'Three',
    number: 3,
    esotericTitle: 'The Lord of Established Strength / Abundance',
    summary: (suit) => `Expansion, teamwork, early success, collaboration, and seeing ships come in.`,
    uprightKeywords: () => ['Expansion', 'Teamwork', 'Collaboration', 'Initial Reward', 'Growth'],
    reversedKeywords: () => ['Delays', 'Miscommunication', 'Frustration', 'Obstacles'],
    uprightMeaning: (suit) => `The Three of ${suit} shows your efforts gaining momentum. Progress is tangible and collaboration thrives.`,
    reversedMeaning: () => `Reversed warns of friction in team projects or impatience with expected timelines.`,
    lifeSpheres: () => ({
      career: 'Fruitful teamwork, expanding operations, and early milestones achieved.',
      love: 'Shared joy, celebration, or collaborative partnership goals.',
      spirituality: 'Expressing your soul’s truth through collaborative community.',
      advice: 'Build bridges with others; combined talent accelerates great outcomes.'
    }),
    symbolism: () => [
      { symbol: 'Three Emblems Standing Strong', description: 'Creation, collaboration, and structural stability.' }
    ],
    dailyContemplation: () => `Who can you collaborate with today to expand what you are building?`,
    affirmation: () => `I celebrate growing momentum and co-create with joyful purpose.`
  },
  {
    rank: 'Four',
    number: 4,
    esotericTitle: 'The Lord of Perfected Work / Solitude',
    summary: (suit) => `Stability, celebration, foundation, sanctuary, or boundary-setting in ${suit}.`,
    uprightKeywords: () => ['Foundation', 'Stability', 'Sanctuary', 'Celebration', 'Security'],
    reversedKeywords: () => ['Instability', 'Restlessness', 'Rigidity', 'Over-defensiveness'],
    uprightMeaning: (suit) => `The Four of ${suit} establishes a solid foundation and a safe container for your happiness.`,
    reversedMeaning: () => `Reversed suggests feeling boxed in by your own routines or resisting necessary adaptations.`,
    lifeSpheres: () => ({
      career: 'Solid progress, celebratory milestones, and strong company culture.',
      love: 'Domestic bliss, commitment milestones, and peaceful sanctuary at home.',
      spirituality: 'Finding peace within a quiet, sacred inner sanctuary.',
      advice: 'Ground your energy and take time to appreciate the stable foundation you’ve built.'
    }),
    symbolism: () => [
      { symbol: 'Four Pillars / Wreaths', description: 'Sacred structure, sanctuary, and enduring protection.' }
    ],
    dailyContemplation: () => `How can you honor and protect your personal sanctuary today?`,
    affirmation: () => `My life is grounded in peace, security, and grateful celebration.`
  },
  {
    rank: 'Five',
    number: 5,
    esotericTitle: 'The Lord of Strife / Loss / Defeat',
    summary: (suit) => `Conflict, challenge, friction, competition, and learning through turbulence.`,
    uprightKeywords: () => ['Conflict', 'Competition', 'Challenge', 'Tension', 'Growth Through Friction'],
    reversedKeywords: () => ['Resolution', 'Avoiding Conflict', 'Lingering Bitterness', 'Truce'],
    uprightMeaning: (suit) => `The Five of ${suit} signals friction. Treat challenges not as setbacks, but as sharpeners of your wisdom and resolve.`,
    reversedMeaning: () => `Reversed shows a conflict winding down, offering an opportunity to forgive and reconcile.`,
    lifeSpheres: () => ({
      career: 'Navigating rivalries or differing opinions; focus on solutions over winning arguments.',
      love: 'Diffusing petty arguments by focusing on genuine listening and empathy.',
      spirituality: 'Refining your values when tested by outer turbulence.',
      advice: 'Pick your battles wisely. Inner peace is far more valuable than proving a point.'
    }),
    symbolism: () => [
      { symbol: 'Friction between Five Forces', description: 'The dynamic tension that forces growth and clarity.' }
    ],
    dailyContemplation: () => `What unnecessary battle can you step away from today to preserve your energy?`,
    affirmation: () => `I rise above petty friction with calm dignity and grace.`
  },
  {
    rank: 'Six',
    number: 6,
    esotericTitle: 'The Lord of Victory / Pleasure / Success',
    summary: (suit) => `Harmony, victory, nostalgia, generous reciprocity, and smooth transitions.`,
    uprightKeywords: () => ['Victory', 'Harmony', 'Generosity', 'Sweet Memories', 'Relief'],
    reversedKeywords: () => ['Ego Pride', 'Stuck in Past', 'Unbalanced Giving', 'Short-lived Win'],
    uprightMeaning: (suit) => `The Six of ${suit} brings a welcome wave of harmony, triumph, or sweet nostalgia. Joy is shared freely.`,
    reversedMeaning: () => `Reversed cautions against living in past glories or giving so much that you deplete yourself.`,
    lifeSpheres: () => ({
      career: 'Public acclaim, supportive leadership, and smooth progress toward milestones.',
      love: 'Sweet affectionate memories, tender reunions, and reciprocal emotional generosity.',
      spirituality: 'Grateful reflection on how far you have traveled on your spiritual path.',
      advice: 'Share your blessings generously and enjoy this sweet chapter of harmony.'
    }),
    symbolism: () => [
      { symbol: 'Triumphant Laurels and Flowers', description: 'Reward, peaceful respite, and reciprocal kindness.' }
    ],
    dailyContemplation: () => `How can you share your current blessings or kindness with someone today?`,
    affirmation: () => `I walk in victory, give generously, and receive life’s sweetness.`
  },
  {
    rank: 'Seven',
    number: 7,
    esotericTitle: 'The Lord of Valor / Illusion / Patience',
    summary: (suit) => `Perseverance, strategic choices, patience, standing your ground, and assessment.`,
    uprightKeywords: () => ['Perseverance', 'Patience', 'Assessment', 'Standing Ground', 'Strategy'],
    reversedKeywords: () => ['Giving Up Too Soon', 'Impatience', 'Overwhelmed', 'Miscalculated Effort'],
    uprightMeaning: (suit) => `The Seven of ${suit} asks for patience and courage. Do not abandon your harvest prematurely; stand firm in your values.`,
    reversedMeaning: () => `Reversed suggests either exhaustion from holding out too long or anxiety about pending results.`,
    lifeSpheres: () => ({
      career: 'Assessing long-term ROI; defending your innovative ideas with conviction.',
      love: 'Patiently working through complex dynamics; clarifying realistic expectations.',
      spirituality: 'Staying true to your convictions even when walking an unconventional path.',
      advice: 'Stay patient and resolute. True mastery is built through consistent perseverance.'
    }),
    symbolism: () => [
      { symbol: 'Seven Seeds / Staves in Terrain', description: 'Testing resolve, evaluating investments, and defending sacred space.' }
    ],
    dailyContemplation: () => `Where is your patience currently being tested, and how can you hold steady?`,
    affirmation: () => `I hold my ground with patience and trust the unfolding of my harvest.`
  },
  {
    rank: 'Eight',
    number: 8,
    esotericTitle: 'The Lord of Swiftness / Apprenticeship / Mastery',
    summary: (suit) => `Rapid momentum, dedicated craftsmanship, leaving the past behind, or breaking self-limiting traps.`,
    uprightKeywords: () => ['Rapid Momentum', 'Mastery', 'Diligence', 'Movement', 'Skill'],
    reversedKeywords: () => ['Delays', 'Frustration', 'Perfectionism Trap', 'Scattered Energy'],
    uprightMeaning: (suit) => `The Eight of ${suit} signifies swift progress and dedicated focus. Your skills are sharpening rapidly.`,
    reversedMeaning: () => `Reversed warns of rushing carelessly or feeling trapped by your own perfectionism.`,
    lifeSpheres: () => ({
      career: 'Honing your craft, rapid influx of communications, and focused productivity.',
      love: 'Fast-moving romantic developments or moving past old emotional stagnation.',
      spirituality: 'Disciplined daily meditation that yields tangible mental clarity.',
      advice: 'Channel your energy into focused craft. Momentum is on your side.'
    }),
    symbolism: () => [
      { symbol: 'Eight Relics in Flight or Craft', description: 'Focused effort, swift action, and disciplined execution.' }
    ],
    dailyContemplation: () => `What skill or project deserves your undivided, uninterrupted focus today?`,
    affirmation: () => `I focus my energy with mastery and advance swiftly toward my goals.`
  },
  {
    rank: 'Nine',
    number: 9,
    esotericTitle: 'The Lord of Great Strength / Happiness / Solitude',
    summary: (suit) => `Resilience, wish fulfillment, near completion, wisdom, and inner fortitude.`,
    uprightKeywords: () => ['Resilience', 'Fulfillment', 'Inner Fortitude', 'Gratitude', 'Near Completion'],
    reversedKeywords: () => ['Exhaustion', 'Smugness', 'Guardedness', 'Lingering Worry'],
    uprightMeaning: (suit) => `The Nine of ${suit} shows you stand on the brink of completion. You have the resilience to see this through.`,
    reversedMeaning: () => `Reversed warns of burning out on the final stretch or staying overly defensive.`,
    lifeSpheres: () => ({
      career: 'One final push before reaching a major summit; take pride in your track record.',
      love: 'Contentment, emotional satisfaction, or lowering unnecessary defensive walls.',
      spirituality: 'Recognizing your soul’s immense resilience through all life trials.',
      advice: 'Draw on your inner reservoir of strength. You are stronger than you think.'
    }),
    symbolism: () => [
      { symbol: 'Nine Emblems of Attainment', description: 'Maturity, endurance, and deep satisfaction.' }
    ],
    dailyContemplation: () => `What strength have you discovered within yourself through recent challenges?`,
    affirmation: () => `I am resilient, fulfilled, and ready to complete my journey.`
  },
  {
    rank: 'Ten',
    number: 10,
    esotericTitle: 'The Lord of Oppression / Satiety / Ruin / Wealth',
    summary: (suit) => `Culmination, legacy, ultimate conclusion, heavy burdens, or generational wealth in ${suit}.`,
    uprightKeywords: () => ['Culmination', 'Legacy', 'Ultimate Completion', 'Abundance', 'Release of Burden'],
    reversedKeywords: () => ['Carrying Too Much', 'Resisting Endings', 'Financial Stress', 'Exhaustion'],
    uprightMeaning: (suit) => `The Ten of ${suit} represents the complete culmination of this cycle. A major phase is fulfilled and ready for transformation.`,
    reversedMeaning: () => `Reversed urges you to put down heavy burdens you were never meant to carry alone.`,
    lifeSpheres: () => ({
      career: 'Achieving the ultimate milestone or delegating workload to avoid burnout.',
      love: 'Enduring family harmony, long-term commitment, or releasing toxic relationship weights.',
      spirituality: 'Closing a major karmic chapter and preparing for a new evolutionary spiral.',
      advice: 'Celebrate your culmination and put down any heavy baggage you no longer need.'
    }),
    symbolism: () => [
      { symbol: 'Ten Emblems of Legacy and Completion', description: 'Full manifestation, final threshold, and ancestral continuity.' }
    ],
    dailyContemplation: () => `What heavy responsibility can you delegate or release to feel lighter today?`,
    affirmation: () => `I honor the completion of this cycle and welcome enduring fulfillment.`
  },
  {
    rank: 'Page',
    number: 11,
    esotericTitle: 'The Princess of the Echoing Hills',
    summary: (suit) => `Curious student, fresh message, youthful enthusiasm, and playful exploration of ${suit}.`,
    uprightKeywords: () => ['Curiosity', 'Fresh Message', 'Youthful Explorer', 'Learning', 'Eagerness'],
    reversedKeywords: () => ['Childishness', 'Gossip', 'Unfocused Energy', 'Disappointment'],
    uprightMeaning: (suit) => `The Page of ${suit} brings exciting news and an invitation to learn with a humble, enthusiastic beginner’s mind.`,
    reversedMeaning: () => `Reversed warns of scattered attention, procrastination, or spreading unverified rumors.`,
    lifeSpheres: () => ({
      career: 'Exciting new project brief, entry-level opportunity, or starting a new skill course.',
      love: 'Playful flirtation, charming texts, and sweet, inquisitive conversations.',
      spirituality: 'Approaching spirituality with pure curiosity and wide-eyed wonder.',
      advice: 'Be a curious learner today. Ask questions and explore with an open mind.'
    }),
    symbolism: () => [
      { symbol: 'Youth Holding Single Emblem with Fascination', description: 'Beginner’s mind, pure curiosity, and fresh beginnings.' }
    ],
    dailyContemplation: () => `What would you love to learn or explore purely for the joy of it today?`,
    affirmation: () => `I stay curious, humble, and open to inspiring messages.`
  },
  {
    rank: 'Knight',
    number: 12,
    esotericTitle: 'The Lord of the Wild & Swift Winds',
    summary: (suit) => `Action, passion, pursuit of quests, determination, and charging toward visions in ${suit}.`,
    uprightKeywords: () => ['Action', 'Pursuit', 'Bravery', 'Drive', 'Adventure', 'Directness'],
    reversedKeywords: () => ['Recklessness', 'Burnout', 'Impatience', 'Aggression', 'Stalling'],
    uprightMeaning: (suit) => `The Knight of ${suit} is in active pursuit of a mission. Gallop forward with courage and clear purpose.`,
    reversedMeaning: () => `Reversed cautions against charging headlong into trouble without assessing risks.`,
    lifeSpheres: () => ({
      career: 'Aggressive project execution, defending proposals, and driving momentum.',
      love: 'Passionate pursuit, grand romantic gestures, or needing to slow down and listen.',
      spirituality: 'Courageously standing up for ethical principles and pursuing truth.',
      advice: 'Take purposeful action today, but keep a steady hand on the reins.'
    }),
    symbolism: () => [
      { symbol: 'Armored Knight on Charged Steed', description: 'Focused mission, dynamic courage, and purposeful movement.' }
    ],
    dailyContemplation: () => `What goal deserves your bold, courageous action today?`,
    affirmation: () => `I ride forward with courage, passion, and focused purpose.`
  },
  {
    rank: 'Queen',
    number: 13,
    esotericTitle: 'The Queen of the Thrones of Fire / Water / Air / Earth',
    summary: (suit) => `Mature mastery, intuitive wisdom, nurturing authority, and magnetic confidence in ${suit}.`,
    uprightKeywords: () => ['Intuitive Mastery', 'Compassion', 'Confidence', 'Nurturing Leader', 'Grace'],
    reversedKeywords: () => ['Insecurity', 'Domineering', 'Jealousy', 'Emotional Drain'],
    uprightMeaning: (suit) => `The Queen of ${suit} embodies emotional and practical sovereignty. She leads with empathy, grace, and unshakable self-worth.`,
    reversedMeaning: () => `Reversed reminds you to recharge your emotional reserves and avoid feeling bitter or neglected.`,
    lifeSpheres: () => ({
      career: 'Inspirational leadership, mentoring colleagues, and executing with magnetic poise.',
      love: 'Deep, mature affection; holding space for loved ones while upholding self-respect.',
      spirituality: 'Embodying wisdom through kindness, intuition, and grounded presence.',
      advice: 'Lead with empathy and quiet confidence. Your presence is your power.'
    }),
    symbolism: () => [
      { symbol: 'Sovereign Queen on Carved Throne', description: 'Mature mastery over the emotional and elemental domain.' }
    ],
    dailyContemplation: () => `How can you embody both fierce confidence and tender compassion today?`,
    affirmation: () => `I lead my life with grace, intuition, and loving sovereignty.`
  },
  {
    rank: 'King',
    number: 14,
    esotericTitle: 'The Prince of the Chariot of Earth / Fire / Water / Air',
    summary: (suit) => `Executive mastery, seasoned leadership, strategic vision, and stable governance of ${suit}.`,
    uprightKeywords: () => ['Executive Mastery', 'Strategic Vision', 'Authority', 'Wisdom', 'Integrity'],
    reversedKeywords: () => ['Tyranny', 'Dogmatic Control', 'Rigidity', 'Loss of Vision'],
    uprightMeaning: (suit) => `The King of ${suit} represents highest mastery. You have the experience and authority to build lasting institutions and govern with wisdom.`,
    reversedMeaning: () => `Reversed cautions against autocratic control or using power to intimidate rather than inspire.`,
    lifeSpheres: () => ({
      career: 'Executive decision-making, strategic negotiations, and solid financial or organizational leadership.',
      love: 'Protective, dependable, mature love; providing a rock-solid anchor in relationships.',
      spirituality: 'Spiritual maturity; acting as a stabilizing anchor of wisdom for your community.',
      advice: 'Take the high road of seasoned leadership. Make decisions for the greater good.'
    }),
    symbolism: () => [
      { symbol: 'Crowned King with Scepter of Command', description: 'Ultimate mastery, executive authority, and protective stability.' }
    ],
    dailyContemplation: () => `How can you exercise mature, calm leadership in your current situation today?`,
    affirmation: () => `I govern my life with wisdom, clarity, and steadfast integrity.`
  }
];

// Generate all 56 Minor Arcana
export const MINOR_ARCANA: TarotCard[] = [];
const SUITS: SuitType[] = ['wands', 'cups', 'swords', 'pentacles'];

SUITS.forEach((suit) => {
  const meta = SUIT_METADATA[suit];
  const suitCapitalized = suit.charAt(0).toUpperCase() + suit.slice(1);

  MINOR_TEMPLATES.forEach((tmpl) => {
    const cardId = `${tmpl.rank.toLowerCase()}-of-${suit}`;
    const cardName = `${tmpl.rank} of ${suitCapitalized}`;

    MINOR_ARCANA.push({
      id: cardId,
      name: cardName,
      number: tmpl.number,
      arcana: 'minor',
      suit: suit,
      element: meta.element,
      astrologicalCorrespondence: `${meta.element} Signs (${suitCapitalized})`,
      esotericTitle: `${tmpl.esotericTitle} ${suitCapitalized}`,
      summary: tmpl.summary(suitCapitalized),
      uprightKeywords: tmpl.uprightKeywords(suitCapitalized),
      reversedKeywords: tmpl.reversedKeywords(suitCapitalized),
      uprightMeaning: tmpl.uprightMeaning(suitCapitalized),
      reversedMeaning: tmpl.reversedMeaning(suitCapitalized),
      symbolism: tmpl.symbolism(suitCapitalized),
      lifeSpheres: tmpl.lifeSpheres(suitCapitalized),
      dailyContemplation: tmpl.dailyContemplation(suitCapitalized),
      affirmation: tmpl.affirmation(suitCapitalized),
      artTheme: {
        primaryColor: meta.color,
        secondaryColor: '#1E293B',
        accentColor: meta.accent,
        icon: suit === 'wands' ? 'flame' : suit === 'cups' ? 'droplet' : suit === 'swords' ? 'sword' : 'coins',
        sceneDescription: `${cardName} illustrated with symbols of ${suitCapitalized} and elemental ${meta.element}.`
      }
    });
  });
});

export const ALL_TAROT_CARDS: TarotCard[] = [...MAJOR_ARCANA, ...MINOR_ARCANA];

export function getTarotCardById(id: string): TarotCard | undefined {
  return ALL_TAROT_CARDS.find((c) => c.id === id);
}

export function getRandomDailyCard(allowReversals = true): { card: TarotCard; isReversed: boolean } {
  const randomIndex = Math.floor(Math.random() * ALL_TAROT_CARDS.length);
  const card = ALL_TAROT_CARDS[randomIndex];
  const isReversed = allowReversals ? Math.random() < 0.35 : false;
  return { card, isReversed };
}

export function getRandomCards(count: number, allowReversals = true): Array<{ card: TarotCard; isReversed: boolean }> {
  // Shuffle a copy of the deck without mutating
  const shuffled = [...ALL_TAROT_CARDS].sort(() => Math.random() - 0.5);
  const picked = shuffled.slice(0, Math.min(count, shuffled.length));
  return picked.map((card) => ({
    card,
    isReversed: allowReversals ? Math.random() < 0.35 : false,
  }));
}
