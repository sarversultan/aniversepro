import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import MirrorPlayer from '../components/MirrorPlayer';
import { getAnimeEpisodes, getEpisode, AnimeInfo, Episode } from '../api/watch';

const Watch: React.FC = () => {
  const { animeId, episode } = useParams<{ animeId: string; episode: string }>();
  const navigate = useNavigate();
  const [anime, setAnime] = useState<AnimeInfo | null>(null);
  const [episodeData, setEpisodeData] = useState<Episode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!animeId || !episode) {
        setError('Invalid anime or episode ID');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Fetch anime data
        const animeData = await getAnimeEpisodes(animeId);
        setAnime(animeData);

        // Fetch episode data
        const episodeNum = parseInt(episode);
        if (isNaN(episodeNum)) {
          throw new Error('Invalid episode number');
        }
        const episodeInfo = await getEpisode(animeId, episodeNum);
        setEpisodeData(episodeInfo);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load anime data');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [animeId, episode]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F0F1A] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3C9DF6]"></div>
      </div>
    );
  }

  if (error || !anime || !episodeData) {
    return (
      <div className="min-h-screen bg-[#0F0F1A] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#EDEDED] mb-2">Error</h2>
          <p className="text-[#EDEDED] mb-4">{error || 'Anime or episode not found'}</p>
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
          Back to Anime
        </button>

        {/* Anime Info */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#EDEDED] mb-2">
            {anime.title} - Episode {episodeData.number}
          </h1>
          {episodeData.title && (
            <h2 className="text-xl text-[#EDEDED]/80">{episodeData.title}</h2>
          )}
        </div>

        {/* Video Player */}
        <div className="mb-8">
          <MirrorPlayer
            mirrors={episodeData.sources.map(source => ({
              name: source.quality,
              src: source.url,
              isM3U8: source.isM3U8
            }))}
          />
        </div>

        {/* Episode Navigation */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(`/watch/${animeId}/${episodeData.number - 1}`)}
            disabled={episodeData.number <= 1}
            className="px-4 py-2 bg-[#1A1A2E] text-[#EDEDED] rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2A2A3E] transition-colors"
          >
            Previous Episode
          </button>
          <button
            onClick={() => navigate(`/watch/${animeId}/${episodeData.number + 1}`)}
            disabled={episodeData.number >= anime.totalEpisodes}
            className="px-4 py-2 bg-[#1A1A2E] text-[#EDEDED] rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2A2A3E] transition-colors"
          >
            Next Episode
          </button>
        </div>
      </div>
    </div>
  );
};

export default Watch; 