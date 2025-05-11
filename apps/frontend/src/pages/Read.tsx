import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import MangaReader from '../components/manga/MangaReader';
import { getMangaChapters, getChapter, MangaInfo, Chapter } from '../api/read';

const Read: React.FC = () => {
  const { mangaId, chapterId } = useParams<{ mangaId: string; chapterId: string }>();
  const navigate = useNavigate();
  const [manga, setManga] = useState<MangaInfo | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!mangaId || !chapterId) {
        setError('Invalid manga or chapter ID');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch manga data
        const mangaData = await getMangaChapters(mangaId);
        setManga(mangaData);

        // Fetch chapter data
        const chapterNum = parseInt(chapterId);
        if (isNaN(chapterNum)) {
          throw new Error('Invalid chapter number');
        }
        const chapterInfo = await getChapter(mangaId, chapterNum);
        setChapter(chapterInfo);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load manga data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mangaId, chapterId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F1A] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3C9DF6]"></div>
      </div>
    );
  }

  if (error || !manga || !chapter) {
    return (
      <div className="min-h-screen bg-[#0F0F1A] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#EDEDED] mb-2">Error</h2>
          <p className="text-[#EDEDED] mb-4">{error || 'Manga or chapter not found'}</p>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-[#3C9DF6] text-[#EDEDED] rounded-md hover:bg-[#2B8CE6] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F1A] py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-[#EDEDED] hover:text-[#3C9DF6] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Manga
        </button>

        {/* Manga Info */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#EDEDED] mb-2">
            {manga.title} - Chapter {chapter.number}
          </h1>
          {chapter.title && (
            <h2 className="text-xl text-[#EDEDED]/80">{chapter.title}</h2>
          )}
        </div>

        {/* Chapter Reader */}
        <div className="mb-8">
          <MangaReader pages={chapter.pages} />
        </div>

        {/* Chapter Navigation */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(`/read/${mangaId}/${chapter.number - 1}`)}
            disabled={chapter.number <= 1}
            className="px-4 py-2 bg-[#1A1A2E] text-[#EDEDED] rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2A2A3E] transition-colors"
          >
            Previous Chapter
          </button>
          <button
            onClick={() => navigate(`/read/${mangaId}/${chapter.number + 1}`)}
            disabled={chapter.number >= manga.totalChapters}
            className="px-4 py-2 bg-[#1A1A2E] text-[#EDEDED] rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2A2A3E] transition-colors"
          >
            Next Chapter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Read; 