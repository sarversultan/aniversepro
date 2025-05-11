import React from 'react';
import { motion } from 'framer-motion';

interface EpisodeSelectorProps {
  total: number;
  current: number;
  onSelect: (ep: number) => void;
}

const EpisodeSelector: React.FC<EpisodeSelectorProps> = ({ total, current, onSelect }) => {
  if (!total || total < 1) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, type: 'spring' }}
      className="flex flex-wrap gap-2 mt-4"
    >
      {Array.from({ length: total }, (_, i) => i + 1).map((ep) => (
        <button
          key={ep}
          onClick={() => onSelect(ep)}
          className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${ep === current ? 'bg-primary text-primary-foreground shadow' : 'bg-background text-foreground border-border hover:bg-primary/10'}`}
        >
          Ep {ep}
        </button>
      ))}
    </motion.div>
  );
};

export default EpisodeSelector; 