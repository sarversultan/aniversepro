import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnimeDetailInfo from '../components/anime/AnimeDetailInfo';
import CharacterList from '../components/anime/CharacterList';
import EpisodeSelector from '../components/anime/EpisodeSelector';
import AnimeComments from '../components/anime/AnimeComments';
import SectionHeader from '../components/common/SectionHeader';

const TVIcon = (
  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-primary w-8 h-8">
    <rect x="3" y="6" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="2" />
    <path d="M8 20h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 16v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const AnimeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentEp, setCurrentEp] = useState(1);
  const [user, setUser] = useState<any>(null); // This will be replaced with actual auth context
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/anime/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        setAnime(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load anime details');
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
  if (error || !anime) {
    return <div className="text-destructive bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-center">{error || 'Not found'}</div>;
  }

  const characters = anime.characters || [];
  const totalEpisodes = anime.episodes || 12;

  return (
    <div className="container mx-auto py-10">
      <SectionHeader title="Anime Details" icon={TVIcon}>
        <span className="text-muted-foreground text-base font-normal">All info is AI-rewritten for a unique experience.</span>
      </SectionHeader>
      <div className="bg-card rounded-xl shadow-lg border border-ash p-6">
        <h1 className="text-3xl font-bold text-alabaster mb-4">{anime.title}</h1>
        <p className="text-ash mb-4">{anime.description}</p>
        <button className="rounded-lg bg-imperial text-alabaster font-semibold py-2 px-6 shadow hover:bg-imperial/90 transition">Watch Now</button>
      </div>
      <SectionHeader title="Characters & Voice Actors" icon={TVIcon} />
      <div className="rounded-2xl bg-card/80 shadow-lg border border-border p-6 mb-8">
        <CharacterList characters={characters} />
      </div>
      <SectionHeader title="Episodes" icon={TVIcon} />
      <div className="rounded-2xl bg-card/80 shadow-lg border border-border p-6 mb-8">
        <EpisodeSelector
          total={totalEpisodes}
          current={currentEp}
          onSelect={(ep) => {
            setCurrentEp(ep);
            navigate(`/watch/${anime.id}/${ep}`);
          }}
        />
      </div>
      <SectionHeader title="Community Discussion" icon={TVIcon} />
      <AnimeComments animeId={anime.id} user={user} />
    </div>
  );
};

export default AnimeDetail; 