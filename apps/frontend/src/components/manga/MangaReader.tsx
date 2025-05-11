import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface MangaReaderProps {
  pages?: string[];
}

const MangaReader: React.FC<MangaReaderProps> = ({ pages }) => {
  const [zoom, setZoom] = useState(1);
  if (!pages || pages.length === 0) {
    return <div className="text-center text-muted-foreground py-12">No pages available.</div>;
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center gap-8 bg-background"
    >
      <div className="flex gap-4 mb-4">
        <button onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))} className="px-3 py-1 rounded bg-muted text-foreground">-</button>
        <span className="text-sm text-muted-foreground">Zoom: {(zoom * 100).toFixed(0)}%</span>
        <button onClick={() => setZoom((z) => Math.min(2, z + 0.1))} className="px-3 py-1 rounded bg-muted text-foreground">+</button>
      </div>
      {pages.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt={`Page ${idx + 1}`}
          style={{ width: `${zoom * 100}%`, maxWidth: '900px' }}
          className="rounded-lg shadow-lg select-none"
          draggable={false}
        />
      ))}
    </motion.div>
  );
};

export default MangaReader; 