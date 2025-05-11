import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MangaDetailInfo from '../components/manga/MangaDetailInfo';
import ChapterList from '../components/manga/ChapterList';
import { motion } from 'framer-motion';
import MangaComments from '../components/manga/MangaComments';
import SectionHeader from '../components/common/SectionHeader';

const BookIcon = (
  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-primary w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const MangaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [manga, setManga] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentChapter, setCurrentChapter] = useState<number | null>(null);
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null); // This will be replaced with actual auth context

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/manga/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        setManga(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load manga details');
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
  if (error || !manga) {
    return <div className="text-destructive bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-center">{error || 'Not found'}</div>;
  }

  // Prepare characters for display (if available)
  const characters = manga.characters || [];
  const totalChapters = manga.chapters || 12;

  return (
    <div className="container mx-auto py-10">
      <SectionHeader title="Manga Details" icon={BookIcon}>
        <span className="text-muted-foreground text-base font-normal">All info is AI-rewritten for a unique experience.</span>
      </SectionHeader>
      <div className="bg-card rounded-xl shadow-lg border border-ash p-6">
        <h1 className="text-3xl font-bold text-alabaster mb-4">{manga.title}</h1>
        <p className="text-ash mb-4">{manga.description}</p>
        <button className="rounded-lg bg-imperial text-alabaster font-semibold py-2 px-6 shadow hover:bg-imperial/90 transition">Read Now</button>
      </div>
      <MangaDetailInfo manga={manga} />
      <ChapterList
        chapters={manga.chapterList}
        currentChapter={currentChapter}
        onSelectChapter={setCurrentChapter}
      />
      <SectionHeader title="Community Discussion" icon={BookIcon} />
      <MangaComments mangaId={manga.id} user={user} />
    </div>
  );
};

export default MangaDetail; 