import React from 'react';
import { Users, MessageSquare } from 'lucide-react';

const CommunityHub: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="bg-[#0F0F1A] rounded-lg border border-[#3C9DF6] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#EDEDED]">Community Hub</h2>
            <div className="flex items-center gap-2 text-[#3C9DF6]">
              <Users className="w-5 h-5" />
              <span className="text-sm">1.2k Active Users</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Discussions */}
            <div className="bg-[#1A1A2E] rounded-lg p-4">
              <h3 className="text-lg font-semibold text-[#EDEDED] mb-3">Recent Discussions</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-[#0F0F1A] rounded-lg">
                  <MessageSquare className="w-5 h-5 text-[#3C9DF6]" />
                  <div>
                    <p className="text-[#EDEDED]">Best Anime of 2024</p>
                    <p className="text-sm text-[#EDEDED]/60">12 new comments</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#0F0F1A] rounded-lg">
                  <MessageSquare className="w-5 h-5 text-[#3C9DF6]" />
                  <div>
                    <p className="text-[#EDEDED]">Manga Recommendations</p>
                    <p className="text-sm text-[#EDEDED]/60">8 new comments</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-[#1A1A2E] rounded-lg p-4">
              <h3 className="text-lg font-semibold text-[#EDEDED] mb-3">Community Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0F0F1A] rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-[#3C9DF6]">1.2k</p>
                  <p className="text-sm text-[#EDEDED]/60">Active Users</p>
                </div>
                <div className="bg-[#0F0F1A] rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-[#3C9DF6]">5.6k</p>
                  <p className="text-sm text-[#EDEDED]/60">Total Posts</p>
                </div>
                <div className="bg-[#0F0F1A] rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-[#3C9DF6]">12.3k</p>
                  <p className="text-sm text-[#EDEDED]/60">Comments</p>
                </div>
                <div className="bg-[#0F0F1A] rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-[#3C9DF6]">45</p>
                  <p className="text-sm text-[#EDEDED]/60">New Today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityHub; 