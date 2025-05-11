import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MangaCard from '../components/manga/MangaCard';
import { motion } from 'framer-motion';
import SectionHeader from '../components/common/SectionHeader';

const PER_PAGE = 20;

const BookIcon = (
  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-primary w-8 h-8">
    <rect x="4" y="5" width="16" height="14" rx="3" stroke="currentColor" strokeWidth="2" />
    <path d="M8 5v14" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const Manga: React.FC = () => {
  // TODO: Connect to backend API
  const [mangaList, setMangaList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/manga?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setMangaList(data.media);
        setHasNext(data.pageInfo?.hasNextPage ?? false);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load manga list');
        setLoading(false);
      });
  }, [page]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 min-h-[70vh]">
        <SectionHeader title="Manga" icon={BookIcon}>
          <span className="text-muted-foreground text-base font-normal">Explore the best manga, beautifully rewritten and curated for you.</span>
        </SectionHeader>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : error ? (
          <div className="text-destructive bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-center">{error}</div>
        ) : (
          <motion.div layout className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {/* TODO: Render mangaList from backend */}
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

export default Manga;
