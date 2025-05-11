import React, { useState } from 'react';
import ChatRoom from '../components/community/ChatRoom';
import { MessageSquare, Users, TrendingUp, Star } from 'lucide-react';

const CommunityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'threads' | 'trending'>('chat');

  const communityStats = [
    { icon: <Users className="h-5 w-5" />, label: 'Active Users', value: '1.2K' },
    { icon: <MessageSquare className="h-5 w-5" />, label: 'Daily Posts', value: '856' },
    { icon: <TrendingUp className="h-5 w-5" />, label: 'Trending Topics', value: '24' },
    { icon: <Star className="h-5 w-5" />, label: 'Top Contributors', value: '48' },
  ];

  return (
    <div className="min-h-screen bg-[var(--primary-bg)] text-[var(--text-100)] transition-colors duration-500">
      {/* Community Header */}
      <div className="bg-[var(--secondary-bg)] shadow-sm transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-[var(--text-100)]">
            AniVerse Community
          </h1>
          <p className="mt-2 text-[var(--text-200)]">
            Join the conversation with fellow anime and manga enthusiasts
          </p>
        </div>
      </div>

      {/* Community Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {communityStats.map((stat, index) => (
            <div
              key={index}
              className="bg-card rounded-lg p-6 shadow-lg border border-ash"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-imperial/20 rounded-lg">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-ash">{stat.label}</p>
                  <p className="text-2xl font-bold text-alabaster">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab Navigation */}
        <div className="border-b border-[var(--border)]/40 mb-6 transition-colors duration-500">
          <nav className="-mb-px flex space-x-8">
            {['chat', 'threads', 'trending'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-[var(--accent-6)] via-[var(--accent-2)] to-[var(--primary)] bg-clip-text text-transparent border-[var(--accent-2)] scale-105 shadow'
                    : 'border-transparent text-[var(--text-200)] hover:text-[var(--accent-6)] hover:scale-105'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-[var(--secondary-bg)] rounded-lg shadow-sm transition-colors duration-500">
          {activeTab === 'chat' && <ChatRoom />}
          {activeTab === 'threads' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-[var(--accent-8)] mb-4">
                Discussion Threads
              </h2>
              <p className="text-[var(--text-200)]">
                Coming soon: Browse and participate in community discussions
              </p>
            </div>
          )}
          {activeTab === 'trending' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-[var(--accent-8)] mb-4">
                Trending Topics
              </h2>
              <p className="text-[var(--text-200)]">
                Coming soon: See what's trending in the anime and manga community
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage; 