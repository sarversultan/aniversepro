import React from 'react';
import { motion } from 'framer-motion';

interface MangaDetailInfoProps {
  title: string;
  cover: string;
  banner?: string;
  genres: string[];
  averageScore: number;
  format: string;
  status: string;
  description: string;
  chapters: number | null;
  volumes: number | null;
}

const MangaDetailInfo: React.FC<MangaDetailInfoProps> = ({
  title,
  cover,
  banner,
  genres,
  averageScore,
  format,
  status,
  description,
  chapters,
  volumes,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="rounded-2xl bg-card/80 shadow-xl overflow-hidden mb-8"
    >
      {banner && (
        <div className="h-48 w-full relative overflow-hidden">
          <img src={banner} alt="banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-8 p-6">
        <div className="flex-shrink-0 w-40 h-56 rounded-xl overflow-hidden shadow-lg border border-border bg-background">
          <img src={cover} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <span key={g} className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary font-semibold">
                {g}
              </span>
            ))}
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground mt-2">
            <span>{averageScore}% Score</span>
            <span>• {format}</span>
            <span>• {status}</span>
            <span>• {chapters ? `${chapters} ch.` : 'TBA'}</span>
            <span>• {volumes ? `${volumes} vols.` : 'TBA'}</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default MangaDetailInfo; 