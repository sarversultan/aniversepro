import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimeCard from '../components/anime/AnimeCard';
import { motion } from 'framer-motion';
import SectionHeader from '../components/common/SectionHeader';

const PER_PAGE = 20;

const TVIcon = (
  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-primary w-8 h-8">
    <rect x="3" y="6" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="2" />
    <path d="M8 20h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 16v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Anime: React.FC = () => {
  // TODO: Connect to backend API
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/anime?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setAnimeList(data.media);
        setHasNext(data.pageInfo?.hasNextPage ?? false);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load anime list');
        setLoading(false);
      });
  }, [page]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 min-h-[70vh]">
        <SectionHeader title="Anime" icon={TVIcon}>
          <span className="text-muted-foreground text-base font-normal">Discover trending and top-rated anime series, all rewritten for a fresh experience.</span>
        </SectionHeader>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : error ? (
          <div className="text-destructive bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-center mb-6">{error}</div>
        ) : (
          <motion.div layout className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {/* TODO: Render animeList from backend */}
          </motion.div>
        )}
        <div className="flex justify-center gap-4 mt-10">
          <button
            className="px-4 py-2 rounded-lg border bg-background text-foreground disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 text-primary font-semibold">Page {page}</span>
          <button
            className="px-4 py-2 rounded-lg border bg-background text-foreground disabled:opacity-50"
            onClick={() => setPage((p) => p + 1)}
            disabled={!hasNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Anime;
