import React from 'react';
import { Newspaper, Clock, ArrowRight } from 'lucide-react';

const NewsUpdates: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="bg-[#0F0F1A] rounded-lg border border-[#3C9DF6] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#EDEDED]">News & Updates</h2>
            <div className="flex items-center gap-2 text-[#3C9DF6]">
              <Newspaper className="w-5 h-5" />
              <span className="text-sm">Latest Updates</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* News Item 1 */}
            <div className="bg-[#1A1A2E] rounded-lg p-4">
              <div className="flex items-center gap-2 text-[#3C9DF6] mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">2 hours ago</span>
              </div>
              <h3 className="text-lg font-semibold text-[#EDEDED] mb-2">
                New Season Announcement: Demon Slayer Season 4
              </h3>
              <p className="text-[#EDEDED]/80 mb-3">
                The highly anticipated fourth season of Demon Slayer has been announced, with a release date set for Spring 2024.
              </p>
              <button className="flex items-center gap-2 text-[#3C9DF6] hover:text-[#2B8CE6] transition-colors">
                Read More
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* News Item 2 */}
            <div className="bg-[#1A1A2E] rounded-lg p-4">
              <div className="flex items-center gap-2 text-[#3C9DF6] mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">5 hours ago</span>
              </div>
              <h3 className="text-lg font-semibold text-[#EDEDED] mb-2">
                New Manga Series: "The Last Hero" by Renowned Author
              </h3>
              <p className="text-[#EDEDED]/80 mb-3">
                Award-winning manga artist announces new series set to release next month, featuring a unique blend of fantasy and sci-fi elements.
              </p>
              <button className="flex items-center gap-2 text-[#3C9DF6] hover:text-[#2B8CE6] transition-colors">
                Read More
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsUpdates; 