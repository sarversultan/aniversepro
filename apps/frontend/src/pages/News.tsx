import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewsCard from '../components/news/NewsCard';
import { motion } from 'framer-motion';

const News: React.FC = () => {
  // TODO: Connect to backend API
  const [newsList, setNewsList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/news?page=${page}`);
        const data = await res.json();
        setNewsList(data.results || []);
      } catch (err) {
        setError('Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [page]);

  return (
    <div className="min-h-screen bg-bg-100">
      <div className="container mx-auto py-10 min-h-[70vh]">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Latest Anime & Manga News</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : error ? (
          <div className="text-destructive bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-center">{error}</div>
        ) : (
          <motion.div layout className="flex flex-col gap-6">
            {/* TODO: Render newsList from backend */}
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

export default News;
