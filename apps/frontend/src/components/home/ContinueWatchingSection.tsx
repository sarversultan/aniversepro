import React from 'react';
import { motion } from 'framer-motion';
import { useContinueContent, ContinueAnime } from '../../hooks/useContinueContent';
import { useNavigate } from 'react-router-dom';

const ContinueWatchingSection: React.FC = () => {
  const watched = useContinueContent('anime') as ContinueAnime[];
  const navigate = useNavigate();

  if (!watched || watched.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-4 px-2">Continue Watching</h2>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 min-w-[320px]">
          {watched.map((anime, idx) => (
            <motion.div
              key={anime.id}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08, type: 'spring' }}
              className="relative bg-card border border-ash shadow-lg p-4 flex flex-col rounded-2xl w-56 min-w-[220px] flex-shrink-0 overflow-hidden hover:shadow-neon-blue transition"
            >
              <div className="relative">
                <img
                  src={anime.thumbnailUrl}
                  alt={anime.title}
                  className="w-full h-36 object-cover rounded-t-2xl"
                />
                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full h-2 bg-background/60">
                  <div
                    className="h-2 bg-gradient-to-r from-primary to-accent shadow-neon-blue rounded-b-2xl transition-all"
                    style={{ width: `${anime.progress ?? 70}%` }}
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col p-4">
                <h3 className="font-semibold text-lg text-alabaster mb-1 truncate" title={anime.title}>{anime.title}</h3>
                <span className="text-sm text-ash mb-2">Episode {anime.episode}</span>
                <button
                  className="mt-auto w-full rounded-lg bg-imperial text-alabaster font-semibold py-2 shadow hover:bg-imperial/90 transition"
                  onClick={() => navigate(`/watch/${anime.id}/${anime.episode}`)}
                >
                  Continue
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContinueWatchingSection; 