import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clapperboard, BookOpen, Newspaper } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const genres = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural'
];

const HeroPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('anime');
  const [searchQuery, setSearchQuery] = useState('');
  const [genre, setGenre] = useState('');
  const navigate = useNavigate();

  const tabs = [
    { key: 'anime', label: 'Anime', icon: <Clapperboard className="h-4 w-4" /> },
    { key: 'manga', label: 'Manga', icon: <BookOpen className="h-4 w-4" /> },
    { key: 'news', label: 'News', icon: <Newspaper className="h-4 w-4" /> },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    let url = `/search?type=${activeTab}&q=${encodeURIComponent(searchQuery.trim())}`;
    if ((activeTab === 'anime' || activeTab === 'manga') && genre) {
      url += `&genre=${encodeURIComponent(genre)}`;
    }
    navigate(url);
  };

  // Reset genre when switching to a non-genre tab
  React.useEffect(() => {
    if (activeTab !== 'anime' && activeTab !== 'manga') setGenre('');
  }, [activeTab]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[var(--primary-bg)] overflow-hidden">
      {/* Cosmic background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-bg)] via-[var(--primary)]/30 to-[var(--tertiary-bg)] animate-gradient-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,193,225,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[url('/src/assets/noise.png')] opacity-[0.12] mix-blend-overlay" />
        {/* Animated cosmic particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ background: `linear-gradient(135deg, var(--accent-6), var(--accent-2))` }}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: [null, Math.random() * 100 - 50],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="relative z-10 w-full max-w-xl mx-auto rounded-3xl bg-gradient-to-br from-[var(--tertiary-bg)]/70 via-[var(--primary)]/10 to-[var(--secondary-bg)]/80 shadow-[0_8px_32px_rgba(79,47,155,0.18)] border border-[var(--primary)]/40 backdrop-blur-2xl px-10 py-12 flex flex-col items-center"
      >
        {/* Section Title */}
        <motion.h2
          className="text-2xl font-extrabold text-center mb-4 bg-gradient-to-r from-[var(--accent-2)] via-[var(--primary)] to-[var(--accent-6)] bg-clip-text text-transparent drop-shadow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          What's Hot in AniVerse
        </motion.h2>

        {/* Animated Logo with enhanced effects */}
        <motion.div
          className="relative w-20 h-20 mb-4 flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
          whileHover={{ scale: 1.1, rotate: 12 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="/src/assets/aniversepro-logo.svg"
            alt="AniVersePro Logo"
            className="relative w-full h-full drop-shadow-[0_0_10px_rgba(0,193,225,0.4)]"
          />
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[var(--primary)] via-[var(--accent-2)] to-[var(--accent-6)] bg-clip-text text-transparent mb-2 text-center drop-shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Explore. Watch. <span className="text-[var(--accent-6)]">Hot</span> Anime.
        </motion.h1>

        <motion.p
          className="mb-8 text-lg text-[var(--text-200)]/80 text-center max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          AniVerse isn't just a site — it's a universe.
        </motion.p>

        {/* Enhanced Multi-tab Search Bar */}
        <div className="w-full mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-6)]/20 via-transparent to-[var(--accent-2)]/20 blur-xl" />
          <div className="relative">
            <div className="flex gap-2 mb-2 justify-center flex-wrap">
              {tabs.map(tab => (
                <motion.button
                  key={tab.key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-1.5 rounded-full font-semibold flex items-center gap-1 transition-all duration-300 ${
                    activeTab === tab.key
                      ? 'bg-gradient-to-r from-[var(--accent-6)] via-[var(--accent-2)] to-[var(--primary)] text-[var(--text-100)] shadow-[0_2px_10px_rgba(0,193,225,0.18)]'
                      : 'bg-[var(--secondary-bg)]/60 text-[var(--text-200)]/70 hover:bg-[var(--accent-2)]/10 hover:text-[var(--text-100)]'
                  }`}
                  aria-label={tab.label}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.icon} {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Genre Selector */}
            {(activeTab === 'anime' || activeTab === 'manga') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="w-full mt-4"
              >
                <div className="relative">
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-[var(--secondary-bg)]/80 border border-[var(--border)] text-[var(--text-100)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-2)] focus:border-transparent transition-all duration-300 appearance-none pr-10"
                    style={{
                      backgroundImage: `url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23${getComputedStyle(document.documentElement).getPropertyValue('--accent-2').trim().slice(1)}'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1.5em 1.5em',
                      paddingRight: '2.5rem',
                      color: genre ? 'var(--text-100)' : 'var(--accent-2)',
                    }}
                  >
                    <option value="" disabled selected hidden>Genre</option>
                    <option value="" className="bg-[var(--secondary-bg)] text-[var(--text-100)]">All Genres</option>
                    {genres.map((g) => (
                      <option key={g} value={g} className="bg-[var(--secondary-bg)] text-[var(--text-100)]">
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}

            {/* Search Form */}
            <motion.form
              onSubmit={handleSearch}
              className="w-full mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${activeTab}...`}
                  className="w-full px-4 py-3 pl-12 rounded-lg bg-[var(--secondary-bg)]/50 border border-[var(--border)] text-[var(--text-100)] placeholder-[var(--text-200)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-2)] focus:border-transparent transition-all duration-300"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[var(--text-200)]" />
              </div>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroPortal; 