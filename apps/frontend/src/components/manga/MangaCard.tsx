import React from 'react';
import { motion } from 'framer-motion';

interface MangaCardProps {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  averageScore: number;
  genres: string[];
  chapters: number | null;
  onClick?: () => void;
}

const MangaCard: React.FC<MangaCardProps> = ({ id, title, description, coverImage, averageScore, genres, chapters, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(80,80,180,0.18)' }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, type: 'spring' }}
      className="group cursor-pointer rounded-2xl border border-border bg-card/80 shadow-lg backdrop-blur-lg overflow-hidden flex flex-col hover:shadow-2xl transition-all"
      onClick={onClick}
    >
      <div className="aspect-[3/4] w-full overflow-hidden relative">
        <img src={coverImage} alt={title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-2 left-2 bg-primary/90 text-xs text-primary-foreground px-2 py-0.5 rounded-full shadow">
          {averageScore}%
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold line-clamp-1 text-lg" title={title}>{title}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2" title={description}>{description}</p>
        <div className="flex flex-wrap gap-1">
          {genres.slice(0, 2).map((g) => (
            <span key={g} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
              {g}
            </span>
          ))}
        </div>
        <div className="text-xs text-muted-foreground mt-auto">
          {chapters ? `${chapters} chapters` : 'TBA'}
        </div>
      </div>
    </motion.div>
  );
};

export default MangaCard; 