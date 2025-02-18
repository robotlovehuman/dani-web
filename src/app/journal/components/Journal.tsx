"use client"

import { useState } from 'react';
import { Book, Plus, ChevronDown, ChevronUp } from 'lucide-react';

interface JournalEntry {
  id: number;
  title: string;
  content: string;
  date: string;
}

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: 1,
      title: "First Day of Spring",
      content: "Today marks the beginning of spring. The flowers are starting to bloom, and the air feels fresher. I'm excited about the new season and all the possibilities it brings.",
      date: "2024-03-20"
    },
    {
      id: 2,
      title: "Learning Retro Design",
      content: "Spent the day working on retro-styled web designs. The Commodore 64 color palette brings back so many memories. It's amazing how these old-school aesthetics still look great today.",
      date: "2024-03-21"
    }
  ]);
  
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({ title: '', content: '' });
  const [expandedEntry, setExpandedEntry] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.title.trim() || !newEntry.content.trim()) return;

    const entry: JournalEntry = {
      id: Date.now(),
      title: newEntry.title,
      content: newEntry.content,
      date: new Date().toISOString().split('T')[0]
    };

    setEntries(prev => [entry, ...prev]);
    setNewEntry({ title: '', content: '' });
    setShowNewEntry(false);
  };

  return (
    <div className="h-[calc(100vh-3rem)]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">RetroJournal</h1>
        <button 
          onClick={() => setShowNewEntry(!showNewEntry)}
          className="retro-button flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Entry
        </button>
      </div>

      {/* New Entry Form */}
      {showNewEntry && (
        <div className="retro-panel mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-bold mb-2">Title</label>
              <input
                type="text"
                value={newEntry.title}
                onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-2 bg-[var(--c64-light)] border-2 border-[var(--c64-brown)] rounded"
                placeholder="Enter title..."
              />
            </div>
            <div>
              <label className="block font-bold mb-2">Content</label>
              <textarea
                value={newEntry.content}
                onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                className="w-full h-32 p-2 bg-[var(--c64-light)] border-2 border-[var(--c64-brown)] rounded resize-none"
                placeholder="Write your thoughts..."
              />
            </div>
            <button type="submit" className="retro-button">
              Save Entry
            </button>
          </form>
        </div>
      )}

      {/* Journal Entries */}
      <div className="space-y-4 overflow-y-auto h-[calc(100%-4rem)]">
        {entries.map(entry => (
          <div key={entry.id} className="retro-panel">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)}
            >
              <div className="flex items-center gap-3">
                <Book className="w-5 h-5 text-[var(--c64-brown)]" />
                <div>
                  <h3 className="font-bold">{entry.title}</h3>
                  <p className="text-sm text-[var(--c64-brown)]">{entry.date}</p>
                </div>
              </div>
              {expandedEntry === entry.id ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
            
            {expandedEntry === entry.id && (
              <div className="mt-4 p-4 bg-[var(--c64-light)] border-2 border-[var(--c64-brown)] rounded">
                {entry.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 