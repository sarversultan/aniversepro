import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimeTitle {
  romaji: string;
  english: string | null;
}

interface AnimeCoverImage {
  large: string;
}

interface AnimeData {
  id: number;
  title: AnimeTitle;
  coverImage: AnimeCoverImage;
  episodes: number | null;
  description: string;
  averageScore: number;
  genres: string[];
  status: 'RELEASING' | 'FINISHED' | string;
  rewrittenTitle?: string;
  rewrittenDescription?: string;
}

interface AnimeResponse {
  data: {
    Page: {
      media: AnimeData[];
    };
  };
}

const statusColors: Record<string, string> = {
  RELEASING: 'bg-gradient-to-r from-green-400 to-blue-500 text-white',
  FINISHED: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
  NOT_YET_RELEASED: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
  CANCELLED: 'bg-gradient-to-r from-red-500 to-red-700 text-white',
};

const TrendingAnime: React.FC = () => {
  const [trendingAnime, setTrendingAnime] = useState<AnimeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingAnime = async () => {
      try {
        const response = await fetch('/api/anime?sort=trending&limit=10');
        const data = await response.json();
        setTrendingAnime(data.results || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch trending anime');
        setLoading(false);
      }
    };

    fetchTrendingAnime();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Trending Now</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {trendingAnime.map((anime, idx) => (
          <motion.div
            key={anime.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07, duration: 0.5, type: 'spring' }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card/70 shadow-xl backdrop-blur-lg transition-all hover:scale-[1.03] hover:shadow-2xl"
            style={{ minHeight: 380 }}
          >
            <div className="aspect-[3/4] overflow-hidden relative">
              <img
                src={anime.coverImage?.large || anime.coverImage}
                alt={anime.rewrittenTitle || anime.title?.english || anime.title?.romaji}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <span
                className={`absolute top-3 left-3 z-10 rounded-full px-3 py-1 text-xs font-semibold shadow-lg ${statusColors[anime.status] || 'bg-muted text-foreground'}`}
              >
                {anime.status === 'RELEASING' ? 'Releasing' : anime.status === 'FINISHED' ? 'Finished' : anime.status?.replace(/_/g, ' ').toLowerCase()}
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-semibold line-clamp-1 text-lg" title={anime.rewrittenTitle}>
                {anime.rewrittenTitle}
              </h3>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                {anime.episodes && (
                  <>
                    <span>{anime.episodes} episodes</span>
                    <span>•</span>
                  </>
                )}
                <span>{anime.averageScore}% rating</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {anime.genres?.slice(0, 2).map((genre: string) => (
                  <span
                    key={genre}
                    className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2" title={anime.rewrittenDescription}>
                {anime.rewrittenDescription}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrendingAnime; 