import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, BookOpen, Users, ArrowRight, Clock } from 'lucide-react';
import HeroPortal from '../components/homepage/HeroPortal';
import ContinueWatchingSection from '../components/home/ContinueWatchingSection';
import ContinueReadingSection from '../components/home/ContinueReadingSection';
import LiveStatsPulseGrid from '../components/homepage/LiveStatsPulseGrid';
import HoloNewsDeck from '../components/homepage/HoloNewsDeck';
import LiveCommunityBoard from '../components/homepage/LiveCommunityBoard';
import SmartGenreDiscovery from '../components/homepage/SmartGenreDiscovery';
import SectionHeader from '../components/SectionHeader';
import { handleApiError } from '../utils/apiErrorHandler';

// Types for trending anime and news
interface TrendingAnime {
  id: string;
  rewrittenTitle: string;
  rewrittenDescription: string;
  bannerImage?: string;
  coverImage?: { large?: string } | string;
}

interface NewsArticle {
  id: string;
  title: string;
  image: string;
  category: string;
  date: string;
  excerpt: string;
}

interface NewEpisode {
  id: string;
  title: string;
  episodeNumber: number;
  image: string;
  timeAgo: string;
  rating: number;
}

interface NewChapter {
  id: string;
  title: string;
  chapterNumber: number;
  image: string;
  timeAgo: string;
  rating: number;
}

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newEpisodes, setNewEpisodes] = useState<NewEpisode[]>([]);
  const [newChapters, setNewChapters] = useState<NewChapter[]>([]);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [featuredAnime, setFeaturedAnime] = useState<any[]>([]);
  const [featuredManga, setFeaturedManga] = useState<any[]>([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        // TODO: Connect to backend API
        // Fetch new episodes
        const episodesRes = await fetch('/api/episodes/new');
        const episodesData = await episodesRes.json();
        setNewEpisodes(episodesData);

        // Fetch new chapters
        const chaptersRes = await fetch('/api/chapters/new');
        const chaptersData = await chaptersRes.json();
        setNewChapters(chaptersData);

        // Fetch news articles
        const newsRes = await fetch('/api/news/latest');
        const newsData = await newsRes.json();
        setNewsArticles(newsData);

        // Fetch featured content
        const featuredRes = await fetch('/api/featured');
        const featuredData = await featuredRes.json();
        setFeaturedAnime(featuredData.anime);
        setFeaturedManga(featuredData.manga);

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--primary-bg)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-2)]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--primary-bg)]">
        <div className="text-[var(--text-100)] text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Content</h2>
          <p className="text-[var(--text-200)]">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--primary-bg)]">
      <HeroPortal />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Continue Watching Section */}
        <ContinueWatchingSection />

        {/* Continue Reading Section */}
        <ContinueReadingSection />

        {/* Live Stats Pulse Grid */}
        <LiveStatsPulseGrid />

        {/* New Episodes Section */}
        <section className="py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[var(--primary)] via-[var(--accent-2)] to-[var(--accent-6)] bg-clip-text text-transparent">
              New Episodes
            </h2>
            <button className="flex items-center gap-2 text-[var(--primary)] hover:text-[var(--accent-2)] transition-colors">
              View All
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* TODO: Render newEpisodes from backend */}
          </div>
        </section>

        {/* New Chapters Section */}
        <section className="py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[var(--primary)] via-[var(--accent-2)] to-[var(--accent-6)] bg-clip-text text-transparent">
              New Chapters
            </h2>
            <button className="flex items-center gap-2 text-[var(--primary)] hover:text-[var(--accent-2)] transition-colors">
              View All
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* TODO: Render newChapters from backend */}
          </div>
        </section>

        {/* Featured Anime Section */}
        <div className="mt-12">
          <SectionHeader title="Featured Anime" subtitle="Discover the most popular anime series" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* TODO: Render featuredAnime from backend */}
        </div>

        {/* Featured Manga Section */}
        <div className="mt-12">
          <SectionHeader title="Featured Manga" subtitle="Explore the latest manga releases" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* TODO: Render featuredManga from backend */}
        </div>

        {/* Holo News Deck */}
        <HoloNewsDeck items={newsArticles} />

        {/* Live Community Board */}
        <LiveCommunityBoard />

        {/* Smart Genre Discovery */}
        <SmartGenreDiscovery />

        {/* Community Section */}
        <div className="mt-12">
          <SectionHeader title="Join Our Community" subtitle="Connect with fellow anime and manga enthusiasts" />
        </div>
        <div className="bg-gradient-to-r from-[var(--accent-6)]/20 via-[var(--accent-2)]/20 to-[var(--primary)]/20 rounded-2xl p-8 mt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[var(--text-100)] mb-4">Be Part of Something Amazing</h3>
              <p className="text-[var(--text-200)] mb-6">
                Join our growing community of anime and manga fans. Share your thoughts, discover new series,
                and connect with like-minded enthusiasts from around the world.
              </p>
              <Link
                to="/community"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--accent-6)] via-[var(--accent-2)] to-[var(--primary)] text-[var(--text-100)] font-semibold hover:opacity-90 transition-opacity"
              >
                Join Community <Users className="h-5 w-5" />
              </Link>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="bg-[var(--primary-bg)]/50 rounded-xl p-4 text-center">
                {/* TODO: Replace with dynamic Active Members count from backend */}
                <div className="text-3xl font-bold text-[var(--accent-2)] mb-2">{/* Active Members */}</div>
                <div className="text-[var(--text-200)]">Active Members</div>
              </div>
              <div className="bg-[var(--primary-bg)]/50 rounded-xl p-4 text-center">
                {/* TODO: Replace with dynamic Daily Discussions count from backend */}
                <div className="text-3xl font-bold text-[var(--accent-2)] mb-2">{/* Daily Discussions */}</div>
                <div className="text-[var(--text-200)]">Daily Discussions</div>
              </div>
              <div className="bg-[var(--primary-bg)]/50 rounded-xl p-4 text-center">
                {/* TODO: Replace with dynamic Reviews & Ratings count from backend */}
                <div className="text-3xl font-bold text-[var(--accent-2)] mb-2">{/* Reviews & Ratings */}</div>
                <div className="text-[var(--text-200)]">Reviews & Ratings</div>
              </div>
              <div className="bg-[var(--primary-bg)]/50 rounded-xl p-4 text-center">
                {/* TODO: Replace with dynamic Active Support status from backend */}
                <div className="text-3xl font-bold text-[var(--accent-2)] mb-2">{/* Active Support */}</div>
                <div className="text-[var(--text-200)]">Active Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 