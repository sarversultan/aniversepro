import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, Tag } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  image: string;
  category: string;
  date: string;
  excerpt: string;
}

interface HoloNewsDeckProps {
  items: NewsArticle[];
}

const HoloNewsDeck: React.FC<HoloNewsDeckProps> = ({ items }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [flipped, setFlipped] = useState<number | null>(null);

  const filters = [
    { id: 'all', label: 'All News' },
    { id: 'anime', label: 'Anime' },
    { id: 'manga', label: 'Manga' },
    { id: 'industry', label: 'Industry' }
  ];

  const filteredItems = activeFilter === 'all' 
    ? items 
    : items.filter(item => item.category.toLowerCase() === activeFilter);

  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[var(--primary)] via-[var(--accent-2)] to-[var(--accent-6)] bg-clip-text text-transparent">
          Latest News
        </h2>
        <div className="flex gap-2">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter.id
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--secondary-bg)] text-[var(--text-200)] hover:bg-[var(--accent-2)]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((article) => (
          <motion.div
            key={article.id}
            className="relative h-[300px] perspective-1000"
            whileHover={{ scale: 1.02 }}
            onClick={() => setFlipped(flipped === parseInt(article.id) ? null : parseInt(article.id))}
          >
            <motion.div
              className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-lg border border-[var(--border)]/40 bg-[var(--card)]/90"
              style={{
                transformStyle: 'preserve-3d',
                transform: flipped === parseInt(article.id) ? 'rotateY(180deg)' : 'rotateY(0deg)',
                transition: 'transform 0.6s'
              }}
            >
              {/* Front */}
              <div className="absolute inset-0 w-full h-full backface-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--primary-bg)] to-transparent p-4">
                  <h3 className="text-lg font-bold text-[var(--text-100)] mb-2">{article.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-[var(--text-200)]">
                    <span className="flex items-center gap-1">
                      <Tag size={14} />
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {article.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Back */}
              <div 
                className="absolute inset-0 w-full h-full backface-hidden bg-[var(--card)] p-6"
                style={{ transform: 'rotateY(180deg)' }}
              >
                <h3 className="text-lg font-bold text-[var(--text-100)] mb-4">{article.title}</h3>
                <p className="text-[var(--text-200)] mb-6">{article.excerpt}</p>
                <button className="flex items-center gap-2 text-[var(--primary)] hover:text-[var(--accent-2)] transition-colors">
                  Read More
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HoloNewsDeck; 