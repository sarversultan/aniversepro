import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DiscussionCard from '../community/DiscussionCard';

interface TopAnime {
  id: number;
  title: string;
  cover: string;
  viewers: number;
}

interface TopManga {
  id: number;
  title: string;
  cover: string;
  readers: number;
}

interface TopDiscussion {
  id: number;
  title: string;
  contentPreview: string;
  username: string;
  createdAt: string;
  repliesCount: number;
}

const LiveStatsPulseGrid: React.FC = () => {
  const [topAnime, setTopAnime] = useState<TopAnime[]>([]);
  const [topManga, setTopManga] = useState<TopManga[]>([]);
  const [topDiscussions, setTopDiscussions] = useState<TopDiscussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLiveStats = async () => {
      try {
        setLoading(true);
        // TODO: Connect to backend API
        const [animeRes, mangaRes, discussionsRes] = await Promise.all([
          fetch('/api/stats/top-anime'),
          fetch('/api/stats/top-manga'),
          fetch('/api/stats/top-discussions')
        ]);

        const [animeData, mangaData, discussionsData] = await Promise.all([
          animeRes.json(),
          mangaRes.json(),
          discussionsRes.json()
        ]);

        setTopAnime(animeData);
        setTopManga(mangaData);
        setTopDiscussions(discussionsData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load live stats');
        setLoading(false);
      }
    };

    fetchLiveStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-destructive bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Top Anime */}
      <div className="bg-card/80 rounded-2xl border border-primary/20 p-6">
        <h3 className="text-xl font-bold mb-4">Top Anime</h3>
        <div className="space-y-4">
          {topAnime.map((anime) => (
            <motion.div
              key={anime.id}
              className="flex items-center gap-4 p-2 rounded-lg hover:bg-primary/5 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate(`/anime/${anime.id}`)}
            >
              <img src={anime.cover} alt={anime.title} className="w-16 h-24 object-cover rounded-lg" />
              <div className="flex-1">
                <h4 className="font-semibold line-clamp-1">{anime.title}</h4>
                <p className="text-sm text-muted-foreground">{anime.viewers.toLocaleString()} viewers</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Top Manga */}
      <div className="bg-card/80 rounded-2xl border border-primary/20 p-6">
        <h3 className="text-xl font-bold mb-4">Top Manga</h3>
        <div className="space-y-4">
          {topManga.map((manga) => (
            <motion.div
              key={manga.id}
              className="flex items-center gap-4 p-2 rounded-lg hover:bg-primary/5 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate(`/manga/${manga.id}`)}
            >
              <img src={manga.cover} alt={manga.title} className="w-16 h-24 object-cover rounded-lg" />
              <div className="flex-1">
                <h4 className="font-semibold line-clamp-1">{manga.title}</h4>
                <p className="text-sm text-muted-foreground">{manga.readers.toLocaleString()} readers</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Top Discussions */}
      <div className="bg-card/80 rounded-2xl border border-primary/20 p-6">
        <h3 className="text-xl font-bold mb-4">Top Discussions</h3>
        <div className="space-y-4">
          {topDiscussions.map((discussion) => (
            <DiscussionCard
              key={discussion.id}
              id={discussion.id}
              title={discussion.title}
              content={discussion.contentPreview}
              username={discussion.username}
              createdAt={discussion.createdAt}
              repliesCount={discussion.repliesCount}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveStatsPulseGrid; 