import React, { useState } from 'react';
import { motion } from 'framer-motion';

const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance'];
const statuses = ['Completed', 'Airing', 'Not Yet Aired'];
const ratings = ['G', 'PG', 'R', 'R+', 'Rx'];
const seasons = ['Winter', 'Spring', 'Summer', 'Fall'];

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<string>('');
  const [selectedSeason, setSelectedSeason] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);
    try {
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      if (selectedGenres.length) params.append('genres', selectedGenres.join(','));
      if (selectedStatus) params.append('status', selectedStatus);
      if (selectedRating) params.append('rating', selectedRating);
      if (selectedSeason) params.append('season', selectedSeason);
      const res = await fetch(`/api/search?${params.toString()}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      setError('Failed to fetch search results');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111111] via-[#B0B0B0] to-[#111111] p-4">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search for anime, manga, or news..."
              className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 text-white font-bold shadow-md hover:scale-[1.03] transition-transform duration-150"
            >
              Search
            </button>
          </div>
        </form>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 bg-[#111111]/80 backdrop-blur-md rounded-xl p-4 border border-[#0D0D0D]/40">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0D0D0D] via-[#E63946] to-[#B0B0B0] mb-4">Filters</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Genre</label>
                <select
                  multiple
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedGenres}
                  onChange={e => setSelectedGenres(Array.from(e.target.selectedOptions, option => option.value))}
                >
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Status</label>
                <select
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedStatus}
                  onChange={e => setSelectedStatus(e.target.value)}
                >
                  <option value="">All</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Rated</label>
                <select
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedRating}
                  onChange={e => setSelectedRating(e.target.value)}
                >
                  <option value="">All</option>
                  {ratings.map(rating => (
                    <option key={rating} value={rating}>{rating}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Season</label>
                <select
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedSeason}
                  onChange={e => setSelectedSeason(e.target.value)}
                >
                  <option value="">All</option>
                  {seasons.map(season => (
                    <option key={season} value={season}>{season}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-[300px]">
            {loading && (
              <div className="flex items-center justify-center h-full"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>
            )}
            {error && (
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-center">{error}</div>
            )}
            {!loading && !error && results.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-400 text-lg text-center">
                No results found.
              </motion.div>
            )}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
              {results.map((item, idx) => (
                <motion.div key={item.id || idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="rounded-xl border border-border bg-card/70 shadow-lg p-4">
                  <div className="flex gap-4">
                    <img src={item.coverImage?.large || item.coverImage || item.thumbnail} alt={item.rewrittenTitle} className="w-20 h-28 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg line-clamp-1 mb-1">{item.rewrittenTitle}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{item.rewrittenDescription || item.rewrittenContent}</p>
                      <div className="flex flex-wrap gap-1 text-xs">
                        {item.genres && item.genres.map((g: string) => <span key={g} className="bg-primary/10 text-primary rounded-full px-2 py-0.5">{g}</span>)}
                        {item.pubDate && <span className="text-muted-foreground ml-2">{item.pubDate}</span>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search; 