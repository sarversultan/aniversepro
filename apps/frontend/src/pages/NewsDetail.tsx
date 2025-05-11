import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NewsDetailContent from '../components/news/NewsDetailContent';
import NewsComments from '../components/news/NewsComments';
import SectionHeader from '../components/common/SectionHeader';

const NewsIcon = (
  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-primary w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
  </svg>
);

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null); // This will be replaced with actual auth context

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/news/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load news details');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }
  if (error || !news) {
    return <div className="text-destructive bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-center">{error || 'Not found'}</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <SectionHeader title="News Details" icon={NewsIcon}>
        <span className="text-muted-foreground text-base font-normal">All content is AI-rewritten for a unique experience.</span>
      </SectionHeader>
      <div className="bg-card rounded-xl shadow-lg border border-ash p-6">
        <h1 className="text-3xl font-bold text-alabaster mb-4">{news.title}</h1>
        <p className="text-ash mb-4">{news.description}</p>
        <button className="rounded-lg bg-imperial text-alabaster font-semibold py-2 px-6 shadow hover:bg-imperial/90 transition">Read Full Article</button>
      </div>
      <SectionHeader title="Community Discussion" icon={NewsIcon} />
      <NewsComments newsId={news.id} user={user} />
    </div>
  );
};

export default NewsDetail; 