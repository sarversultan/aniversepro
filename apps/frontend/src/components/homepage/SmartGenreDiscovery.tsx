import React, { useState } from 'react';
import { motion } from 'framer-motion';

const genres = [
  { icon: '⚔️', label: 'Action' },
  { icon: '🤣', label: 'Comedy' },
  { icon: '😢', label: 'Drama' },
  { icon: '🤯', label: 'Mind-bend' },
  { icon: '👻', label: 'Horror' },
  { icon: '💖', label: 'Romance' },
  { icon: '🧙‍♂️', label: 'Fantasy' },
  { icon: '🤖', label: 'Sci-Fi' },
];
const moods = [
  { icon: '😢', label: 'Emotional' },
  { icon: '🤣', label: 'Comedy' },
  { icon: '🤯', label: 'Mind-bend' },
];
const types = [
  { icon: '🎬', label: 'Movie' },
  { icon: '🧱', label: 'Series' },
  { icon: '⚡', label: 'OVA' },
];
const suggestions = [
  'Try "Mob Psycho 100" for a wild ride!',
  'Feeling blue? Watch "Your Lie in April".',
  'Need action? "Jujutsu Kaisen" awaits!',
  'Laugh with "Gintama"!',
  'Get spooked by "Another".',
];

const SmartGenreDiscovery: React.FC = () => {
  const [suggestion, setSuggestion] = useState('');

  return (
    <section className="py-12">
      <div className="bg-[var(--secondary-bg)] rounded-lg shadow-sm p-6 transition-colors duration-500">
        <h2 className="text-xl font-bold text-[var(--accent-8)] mb-4">Smart Genre Discovery</h2>
        <p className="text-[var(--text-200)]">Coming soon: Discover anime and manga tailored to your tastes</p>
      </div>
      <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Find Your Anime Destiny</h2>
      <div className="flex flex-wrap gap-4 mb-6">
        {moods.map(m => (
          <span key={m.label} className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm flex items-center gap-1">{m.icon} {m.label}</span>
        ))}
        {types.map(t => (
          <span key={t.label} className="px-4 py-1.5 rounded-full bg-accent/10 text-accent font-semibold text-sm flex items-center gap-1">{t.icon} {t.label}</span>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
        {genres.map((g, i) => (
          <div key={g.label} className="rounded-xl bg-card border border-ash shadow-lg p-4 flex flex-col items-center">
            <div className="text-lg font-bold text-alabaster">{g.label}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="rounded-xl bg-gradient-to-r from-primary to-accent px-8 py-3 text-lg font-semibold text-primary-foreground shadow hover:opacity-90 transition mb-4"
          onClick={() => setSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)])}
        >
          🎲 Surprise Me
        </motion.button>
        {suggestion && <div className="text-base text-muted-foreground font-semibold mt-2">{suggestion}</div>}
      </div>
    </section>
  );
};

export default SmartGenreDiscovery; 