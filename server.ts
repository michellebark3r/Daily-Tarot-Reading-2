import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI Client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Deep educational interpretation and personalized inquiry endpoint
app.post('/api/tarot/deep-dive', async (req, res) => {
  try {
    const { cardName, isReversed, userQuestion, mood, keywords, summary } = req.body;
    
    if (!cardName) {
      return res.status(400).json({ error: 'Card name is required' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback structured educational response if API key is not yet set
      return res.json({
        content: `### Esoteric Wisdom of ${cardName} (${isReversed ? 'Reversed' : 'Upright'})\n\n` +
                 `The archetypal resonance of **${cardName}** invites you to integrate conscious intention into today's rhythm.\n\n` +
                 `* **Core Lesson**: Deepen your awareness of inner alignment over external validation.\n` +
                 `* **Symbolic Alignment**: Notice how your current experiences mirror the card's elemental and mythic tension.\n` +
                 `* **Daily Contemplation**: How can you honor this energy today without rushing or forcing outcomes?`,
        suggestedQuestion: `What subconscious pattern is ${cardName} asking me to release today?`
      });
    }

    const prompt = `You are a wise, grounded, and deeply educational Tarot Scholar and Esoteric Mentor.
A seeker has drawn the daily card: "${cardName}" in ${isReversed ? 'REVERSED' : 'UPRIGHT'} orientation for today.
Keywords associated with this card: ${keywords ? keywords.join(', ') : 'Not specified'}.
Card essence: ${summary || ''}
${mood ? `Seeker's current emotional state/mood: "${mood}"` : ''}
${userQuestion ? `The seeker is specifically asking: "${userQuestion}"` : 'The seeker is seeking a deeper educational synthesis, practical daily application, and shadow/light integration for today.'}

Please provide an enlightening, mature, and psychologically insightful educational reading formatted in clean Markdown with:
1. **The Archetypal Lesson**: Explain the deeper mythic and psychological lesson of this card today.
2. **Everyday Manifestation**: How this energy typically surfaces in modern daily life (conversations, decisions, emotions).
3. **Shadow & Light**: The constructive path vs. the potential pitfall/avoidance trap.
4. **Journal Contemplation Prompt**: 1-2 poignant, soul-searching questions for their private journal.

Keep the tone grounded, philosophical, inspiring, and free of doom-mongering. Treat Tarot as a tool for self-discovery, mindfulness, and personal growth.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an articulate, compassionate Tarot scholar and archetypal psychology guide. Provide insightful, grounded wisdom formatted in markdown.',
        temperature: 0.7,
      },
    });

    return res.json({
      content: response.text || 'Insight generated for your daily meditation.',
    });
  } catch (error: any) {
    console.error('Error generating Tarot deep dive:', error);
    res.status(500).json({
      error: 'Failed to generate insight',
      details: error?.message || 'Server error',
    });
  }
});

// Periodic pattern synthesis endpoint (e.g. weekly or monthly pattern review)
app.post('/api/tarot/pattern-analysis', async (req, res) => {
  try {
    const { historySummary } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        analysis: 'Your daily cards reflect an evolving cycle of self-reflection and personal mastery. Continue observing recurring suits and archetypes in your journal.',
      });
    }

    const prompt = `Analyze this sequence of recent daily Tarot draws from a seeker's private journal:
${JSON.stringify(historySummary, null, 2)}

Provide a concise, profound synthesis (2-3 paragraphs):
1. The overarching spiritual or developmental theme connecting these cards.
2. Elemental balance (Fire, Water, Air, Earth) or Major vs Minor Arcana significance.
3. A guiding mantra/focus for the upcoming days.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are a master Tarot analyst identifying recurring cycles and growth patterns.',
        temperature: 0.6,
      },
    });

    return res.json({ analysis: response.text });
  } catch (error: any) {
    console.error('Error analyzing patterns:', error);
    res.status(500).json({ error: 'Failed to analyze pattern' });
  }
});

// Serve frontend in dev or prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Arcana Daily Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
