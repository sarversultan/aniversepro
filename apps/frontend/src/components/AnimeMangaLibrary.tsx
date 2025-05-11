import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Play } from 'lucide-react';

const AnimeMangaLibrary: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#EDEDED] mb-8">Your Library</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Anime Library */}
          <div className="bg-[#0F0F1A] rounded-lg border border-[#3C9DF6] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-[#EDEDED]">Anime Library</h3>
              <Link
                to="/anime"
                className="text-[#3C9DF6] hover:text-[#2B8CE6] transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              <p className="text-[#EDEDED]">Your anime collection will appear here</p>
              <Link
                to="/anime"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#3C9DF6] text-[#EDEDED] rounded-md hover:bg-[#2B8CE6] transition-colors"
              >
                <Play className="w-4 h-4" />
                Browse Anime
              </Link>
            </div>
          </div>

          {/* Manga Library */}
          <div className="bg-[#0F0F1A] rounded-lg border border-[#3C9DF6] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-[#EDEDED]">Manga Library</h3>
              <Link
                to="/manga"
                className="text-[#3C9DF6] hover:text-[#2B8CE6] transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              <p className="text-[#EDEDED]">Your manga collection will appear here</p>
              <Link
                to="/manga"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#3C9DF6] text-[#EDEDED] rounded-md hover:bg-[#2B8CE6] transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Browse Manga
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimeMangaLibrary; 