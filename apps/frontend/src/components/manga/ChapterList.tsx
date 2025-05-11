import React from 'react';
import { motion } from 'framer-motion';

interface ChapterListProps {
  mangaId: number;
  total: number;
  current?: number;
  onSelect: (chapter: number) => void;
}

const ChapterList: React.FC<ChapterListProps> = ({ mangaId, total, current, onSelect }) => {
  if (!total || total < 1) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, type: 'spring' }}
      className="flex flex-wrap gap-2 mt-4"
    >
      {Array.from({ length: total }, (_, i) => i + 1).map((ch) => (
        <button
          key={ch}
          onClick={() => onSelect(ch)}
          className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${ch === current ? 'bg-primary text-primary-foreground shadow' : 'bg-background text-foreground border-border hover:bg-primary/10'}`}
        >
          Chapter {ch}
        </button>
      ))}
    </motion.div>
  );
};

export default ChapterList; 