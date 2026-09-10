import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DailyReading, TarotCard, SuitType, ArcanaType } from '../types';
import { getTarotCardById } from '../data/tarotCards';
import { TarotCardVisual } from './TarotCardVisual';
import { updateReading, deleteReading, exportJournalJSON, exportJournalMarkdown, importJournalJSON } from '../utils/storage';
import {
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  Calendar,
  Download,
  Upload,
  Trash2,
  Edit3,
  Check,
  ChevronDown,
  ChevronUp,
  Tag,
  Feather,
  Sparkles,
  Lock,
  FileText,
  FileCode,
  X,
} from 'lucide-react';

interface DailyJournalProps {
  readings: DailyReading[];
  onRefreshReadings: () => void;
  onSelectReadingForView?: (reading: DailyReading) => void;
}

export const DailyJournal: React.FC<DailyJournalProps> = ({
  readings,
  onRefreshReadings,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState<string>('all');
  const [selectedArcana, setSelectedArcana] = useState<string>('all');
  const [selectedSuit, setSelectedSuit] = useState<string>('all');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);

  // Expanded cards tracker
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState('');

  // Import file ref
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Filter logic
  const filteredReadings = readings.filter((r) => {
    const card = getTarotCardById(r.cardId);
    if (!card) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = card.name.toLowerCase().includes(q);
      const matchNotes = r.userNotes?.toLowerCase().includes(q);
      const matchIntention = r.intention?.toLowerCase().includes(q);
      const matchKeywords = card.uprightKeywords.some((k) => k.toLowerCase().includes(q));
      const matchTags = r.tags?.some((t) => t.toLowerCase().includes(q));
      if (!matchName && !matchNotes && !matchIntention && !matchKeywords && !matchTags) {
        return false;
      }
    }

    // Bookmarked filter
    if (onlyBookmarked && !r.bookmarked) return false;

    // Mood filter
    if (selectedMood !== 'all' && r.mood !== selectedMood) return false;

    // Arcana filter
    if (selectedArcana !== 'all' && card.arcana !== selectedArcana) return false;

    // Suit filter
    if (selectedSuit !== 'all' && card.suit !== selectedSuit) return false;

    return true;
  });

  const handleToggleBookmark = (r: DailyReading) => {
    const nextVal = !r.bookmarked;
    updateReading(r.id, { bookmarked: nextVal });
    onRefreshReadings();
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove the reading for ${name}?`)) {
      deleteReading(id);
      onRefreshReadings();
    }
  };

  const handleStartEdit = (r: DailyReading) => {
    setEditingId(r.id);
    setEditNotes(r.userNotes || '');
  };

  const handleSaveEdit = (id: string) => {
    updateReading(id, { userNotes: editNotes.trim() });
    setEditingId(null);
    onRefreshReadings();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importJournalJSON(content);
      if (success) {
        setImportStatus('Journal archive successfully imported!');
        onRefreshReadings();
      } else {
        setImportStatus('Failed to import: Invalid file format.');
      }
      setTimeout(() => setImportStatus(null), 3000);
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Journal Header & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-cinzel text-2xl font-bold text-zinc-100">
              Private Daily Journal
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#0c0c0f] border border-white/5 text-amber-200 text-xs font-semibold">
              {readings.length} {readings.length === 1 ? 'Entry' : 'Entries'}
            </span>
          </div>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Your sacred archive of daily cards, reflections, and evolving life lessons.
          </p>
        </div>

        {/* Export / Backup Controls */}
        <div className="flex items-center gap-2">
          <button
            id="journal-export-json-btn"
            onClick={exportJournalJSON}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0c0c0f] border border-white/10 text-xs font-medium text-zinc-300 hover:text-amber-200 hover:border-amber-500/40 transition-colors"
            title="Download JSON backup"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            id="journal-export-md-btn"
            onClick={exportJournalMarkdown}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0c0c0f] border border-white/10 text-xs font-medium text-zinc-300 hover:text-amber-200 hover:border-amber-500/40 transition-colors"
            title="Download formatted Markdown journal"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Export .MD</span>
          </button>

          <button
            id="journal-import-btn"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0c0c0f] border border-white/10 text-xs font-medium text-zinc-300 hover:text-amber-200 hover:border-amber-500/40 transition-colors"
            title="Import JSON backup"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json"
            className="hidden"
          />
        </div>
      </div>

      {/* Import Status Banner */}
      {importStatus && (
        <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs font-medium flex items-center justify-between">
          <span>{importStatus}</span>
          <button onClick={() => setImportStatus(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="bg-[#0c0c0f] p-4 rounded-2xl border border-white/5 space-y-3">
        <div className="flex flex-col sm:flex-row gap-2.5">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              id="journal-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cards, keywords, tags, or personal reflections..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#08080a] border border-white/10 text-xs md:text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-amber-400/60"
            />
          </div>

          {/* Bookmarks Only Toggle */}
          <button
            id="journal-filter-bookmarked-btn"
            onClick={() => setOnlyBookmarked(!onlyBookmarked)}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors whitespace-nowrap ${
              onlyBookmarked
                ? 'bg-amber-500/20 text-amber-200 border-amber-400/40'
                : 'bg-[#08080a] text-zinc-400 border-white/5 hover:text-zinc-200'
            }`}
          >
            {onlyBookmarked ? <BookmarkCheck className="w-3.5 h-3.5 text-amber-300" /> : <Bookmark className="w-3.5 h-3.5" />}
            <span>Favorites</span>
          </button>
        </div>

        {/* Filter Pills Row */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {/* Arcana Filter */}
          <select
            id="journal-filter-arcana"
            value={selectedArcana}
            onChange={(e) => setSelectedArcana(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-[#08080a] border border-white/10 text-xs text-zinc-300 focus:outline-none focus:border-amber-400/60"
          >
            <option value="all">All Arcana</option>
            <option value="major">Major Arcana</option>
            <option value="minor">Minor Arcana</option>
          </select>

          {/* Suit Filter */}
          <select
            id="journal-filter-suit"
            value={selectedSuit}
            onChange={(e) => setSelectedSuit(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-[#08080a] border border-white/10 text-xs text-zinc-300 focus:outline-none focus:border-amber-400/60"
          >
            <option value="all">All Suits</option>
            <option value="wands">Wands (Fire)</option>
            <option value="cups">Cups (Water)</option>
            <option value="swords">Swords (Air)</option>
            <option value="pentacles">Pentacles (Earth)</option>
          </select>

          {/* Mood Filter */}
          <select
            id="journal-filter-mood"
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-[#08080a] border border-white/10 text-xs text-zinc-300 focus:outline-none focus:border-amber-400/60"
          >
            <option value="all">All Energies</option>
            <option value="Peaceful">🌿 Peaceful</option>
            <option value="Inspired">✨ Inspired</option>
            <option value="Focused">🎯 Focused</option>
            <option value="Reflective">🌊 Reflective</option>
            <option value="Seeking Clarity">🔍 Seeking Clarity</option>
            <option value="Anxious">🌪️ Anxious</option>
            <option value="Grateful">🙏 Grateful</option>
          </select>

          {(searchQuery || selectedMood !== 'all' || selectedArcana !== 'all' || selectedSuit !== 'all' || onlyBookmarked) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedMood('all');
                setSelectedArcana('all');
                setSelectedSuit('all');
                setOnlyBookmarked(false);
              }}
              className="text-xs text-amber-300 hover:underline px-2"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Reading List */}
      {filteredReadings.length === 0 ? (
        <div className="text-center py-16 bg-[#0c0c0f]/60 rounded-2xl border border-white/5 space-y-3">
          <Calendar className="w-10 h-10 mx-auto text-zinc-600" />
          <h3 className="font-cinzel text-base text-zinc-300">No Journal Entries Found</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            {readings.length === 0
              ? "You haven't recorded any daily readings yet. Complete today's draw to start your journal."
              : 'No entries match your search criteria. Try adjusting the filters above.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReadings.map((reading) => {
            const card = getTarotCardById(reading.cardId);
            if (!card) return null;
            const isExpanded = expandedId === reading.id;
            const isEditing = editingId === reading.id;

            return (
              <motion.div
                key={reading.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0c0c0f] rounded-2xl border border-white/5 hover:border-amber-500/25 transition-all overflow-hidden shadow-lg"
              >
                {/* Entry Header Summary */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Thumbnail Card */}
                    <div className="shrink-0 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : reading.id)}>
                      <TarotCardVisual
                        card={card}
                        isReversed={reading.isReversed}
                        size="sm"
                        showDetails={false}
                        className="hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Meta info */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-amber-300 font-semibold">
                          {reading.date}
                        </span>
                        {reading.spreadType === 'three_card' ? (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-200 border border-amber-500/30 font-medium">
                            3-Card Spread
                          </span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#08080a] text-zinc-400 border border-white/5">
                            {reading.isReversed ? 'Reversed' : 'Upright'}
                          </span>
                        )}
                      </div>

                      <h3
                        className="font-cinzel text-base sm:text-lg font-bold text-zinc-100 cursor-pointer hover:text-amber-200 transition-colors"
                        onClick={() => setExpandedId(isExpanded ? null : reading.id)}
                      >
                        {reading.spreadType === 'three_card'
                          ? reading.spreadPromptTitle || 'Daily 3-Card Oracle'
                          : card.name}
                      </h3>

                      {reading.spreadType === 'three_card' && reading.spreadCards && (
                        <p className="text-[11px] text-zinc-400">
                          {reading.spreadCards.map((sc, idx) => {
                            const c = getTarotCardById(sc.cardId);
                            return `${sc.positionLabel}: ${c?.name || sc.cardId}`;
                          }).join(' • ')}
                        </p>
                      )}

                      {reading.intention && (
                        <p className="text-xs text-zinc-400 italic line-clamp-1 font-serif">
                          "{reading.intention}"
                        </p>
                      )}

                      {/* Mood and Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {reading.mood && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-200 border border-amber-500/20">
                            {reading.mood}
                          </span>
                        )}
                        {reading.tags && reading.tags.slice(0, 3).map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md text-[10px] bg-[#08080a] text-zinc-400 border border-white/5"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Expand Toggle */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => handleToggleBookmark(reading)}
                      className={`p-2 rounded-lg border transition-colors ${
                        reading.bookmarked
                          ? 'bg-amber-500/20 border-amber-400/40 text-amber-200'
                          : 'bg-[#08080a] border-white/5 text-zinc-500 hover:text-zinc-300'
                      }`}
                      title={reading.bookmarked ? 'Remove bookmark' : 'Bookmark this reading'}
                    >
                      {reading.bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : reading.id)}
                      className="p-2 rounded-lg bg-[#08080a] border border-white/5 text-zinc-400 hover:text-zinc-200 transition-colors"
                      title={isExpanded ? 'Collapse' : 'Expand full reading'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details & Journal Reflection */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/5 bg-[#08080a]/60 p-5 space-y-5"
                    >
                      {/* Card Meaning or 3-Card Spread Breakdown */}
                      {reading.spreadType === 'three_card' && reading.spreadCards && reading.spreadCards.length > 0 ? (
                        <div className="space-y-3">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
                            3-Card Spread Breakdown
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {reading.spreadCards.map((sc, idx) => {
                              const scCard = getTarotCardById(sc.cardId);
                              return (
                                <div key={idx} className="p-3 rounded-xl bg-[#121217] border border-amber-500/20 space-y-1.5">
                                  <span className="text-[10px] uppercase font-bold text-amber-300 block truncate">
                                    {sc.positionLabel}
                                  </span>
                                  <h4 className="font-cinzel text-xs font-bold text-zinc-100">
                                    {scCard?.name || sc.cardId} ({sc.isReversed ? 'Reversed' : 'Upright'})
                                  </h4>
                                  <p className="text-[11px] text-zinc-300 line-clamp-3 font-sans">
                                    {sc.isReversed ? scCard?.reversedMeaning : scCard?.uprightMeaning}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
                            Archetypal Meaning
                          </span>
                          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                            {reading.isReversed ? card.reversedMeaning : card.uprightMeaning}
                          </p>
                        </div>
                      )}

                      {/* Affirmation */}
                      <div className="p-3 rounded-xl bg-[#121217] border border-amber-500/20">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
                          Daily Affirmation
                        </span>
                        <p className="font-serif italic text-amber-100 text-xs md:text-sm mt-0.5">
                          "{card.affirmation}"
                        </p>
                      </div>

                      {/* Personal Notes Section */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 flex items-center gap-1.5">
                            <Feather className="w-3.5 h-3.5 text-amber-300" />
                            <span>My Personal Reflection</span>
                          </span>

                          {!isEditing && (
                            <button
                              onClick={() => handleStartEdit(reading)}
                              className="flex items-center gap-1 text-xs text-amber-300 hover:underline"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Edit Reflection</span>
                            </button>
                          )}
                        </div>

                        {isEditing ? (
                          <div className="space-y-2">
                            <textarea
                              value={editNotes}
                              onChange={(e) => setEditNotes(e.target.value)}
                              rows={4}
                              className="w-full px-3 py-2 rounded-xl bg-[#08080a] border border-white/10 text-xs md:text-sm text-zinc-100 focus:outline-none focus:border-amber-400/60"
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => setEditingId(null)}
                                className="px-3 py-1.5 rounded-lg bg-[#181820] text-xs text-zinc-400"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSaveEdit(reading.id)}
                                className="px-3 py-1.5 rounded-lg bg-amber-400 text-[#08080a] text-xs font-bold hover:bg-amber-300"
                              >
                                Save Reflection
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="p-3.5 rounded-xl bg-[#08080a] border border-white/5 text-xs md:text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap">
                            {reading.userNotes || (
                              <span className="text-zinc-600 italic">No notes logged for this entry.</span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* AI Insights if recorded */}
                      {reading.aiInsights && (
                        <div className="p-3.5 rounded-xl bg-[#121217] border border-white/5 space-y-1">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-300" />
                            <span>Esoteric Mentor Insights</span>
                          </span>
                          <p className="text-xs text-zinc-200 leading-relaxed whitespace-pre-wrap">
                            {reading.aiInsights}
                          </p>
                        </div>
                      )}

                      {/* Delete Entry Footer */}
                      <div className="flex justify-end pt-2 border-t border-white/5">
                        <button
                          onClick={() => handleDelete(reading.id, `${card.name} (${reading.date})`)}
                          className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 hover:underline"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Entry</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
