import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface TrendingAnime {
  id: string;
  rewrittenTitle: string;
  rewrittenDescription: string;
  bannerImage?: string;
  coverImage?: { large?: string } | string;
}

interface CinematicCarouselProps {
  items: TrendingAnime[];
}

const CinematicCarousel: React.FC<CinematicCarouselProps> = ({ items }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [muted, setMuted] = useState(true);

  return (
    <section className="py-12">
      <div className="bg-[var(--secondary-bg)] rounded-lg shadow-sm p-6 transition-colors duration-500">
        <h2 className="text-xl font-bold text-[var(--accent-8)] mb-4">Cinematic Carousel</h2>
        <p className="text-[var(--text-200)]">Explore featured anime and manga</p>
      </div>

      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold mb-8 bg-gradient-to-r from-[var(--primary)] via-[var(--accent-2)] to-[var(--accent-6)] bg-clip-text text-transparent"
      >
        Streaming Right Now
      </motion.h2>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex gap-8 overflow-x-auto pb-4 hide-scrollbar"
      >
        {items.map((anime) => (
          <motion.div
            key={anime.id}
            className="relative min-w-[340px] max-w-[340px] h-[200px] rounded-2xl overflow-hidden shadow-xl border border-[var(--border)]/40 bg-[var(--card)]/90 group cursor-pointer backdrop-blur-xl"
            whileHover={{ scale: 1.04 }}
            onMouseEnter={() => setHovered(parseInt(anime.id))}
            onMouseLeave={() => setHovered(null)}
          >
            <motion.img 
              src={typeof anime.coverImage === 'string' ? anime.coverImage : anime.coverImage?.large || anime.bannerImage} 
              alt={anime.rewrittenTitle} 
              className="absolute inset-0 w-full h-full object-cover group-hover:opacity-60 transition-all duration-300"
              initial={{ scale: 1 }}
              animate={{ scale: hovered === parseInt(anime.id) ? 1.1 : 1 }}
              transition={{ duration: 0.5 }}
            />

            <motion.div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--primary-bg)] to-transparent p-4 rounded-b-2xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-bold text-[var(--text-100)] mb-1">{anime.rewrittenTitle}</h3>
              <p className="text-sm text-[var(--text-200)] line-clamp-2">{anime.rewrittenDescription}</p>
            </motion.div>

            <motion.div 
              className="absolute top-4 right-4 flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: hovered === parseInt(anime.id) ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-[var(--primary-bg)]/80 backdrop-blur-sm text-[var(--accent-2)] hover:bg-[var(--accent-2)]/20 transition-colors"
                onClick={() => setMuted(!muted)}
              >
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-[var(--primary-bg)]/80 backdrop-blur-sm text-[var(--accent-6)] hover:bg-[var(--accent-6)]/20 transition-colors"
              >
                <Play className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CinematicCarousel; 