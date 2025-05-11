import React, { useState } from 'react';
import { User, Bookmark, Clock, MessageSquare, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProfileStats {
  watching: number;
  completed: number;
  planned: number;
  dropped: number;
}

interface Activity {
  id: string;
  type: 'watch' | 'read' | 'comment';
  title: string;
  timestamp: string;
  details: string;
}

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'anime' | 'manga' | 'activity'>('overview');
  const [stats] = useState<ProfileStats | null>(null);
  const [activities] = useState<Activity[]>([]);

  return (
    <div className="min-h-screen bg-bg-100">
      {/* Profile Header */}
      <div className="bg-[var(--secondary-bg)] shadow-sm transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-6">
            <div className="h-24 w-24 rounded-full bg-[var(--accent-8)]/20 flex items-center justify-center">
              <User className="h-12 w-12 text-[var(--accent-2)]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-100)]">
                Username
              </h1>
              <p className="text-[var(--text-200)]">Member since 2024</p>
            </div>
            <button className="ml-auto p-2 rounded-full hover:bg-[var(--accent-6)]/20 transition-colors">
              <Settings className="h-5 w-5 text-[var(--accent-2)]" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[var(--card)] rounded-lg p-6 shadow-lg border border-[var(--border)]/60 backdrop-blur-xl">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[var(--accent-6)]/20 rounded-lg">
                <Clock className="h-6 w-6 text-[var(--accent-4)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--accent-7)]">Watching</p>
                <p className="text-2xl font-bold text-[var(--accent-8)]">
                  {/* TODO: Render stats.watching from backend */}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--card)] rounded-lg p-6 shadow-lg border border-[var(--border)]/60 backdrop-blur-xl">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[var(--accent-6)]/20 rounded-lg">
                <Bookmark className="h-6 w-6 text-[var(--accent-1)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--accent-7)]">Completed</p>
                <p className="text-2xl font-bold text-[var(--accent-8)]">
                  {/* TODO: Render stats.completed from backend */}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--card)] rounded-lg p-6 shadow-lg border border-[var(--border)]/60 backdrop-blur-xl">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[var(--accent-6)]/20 rounded-lg">
                <Bookmark className="h-6 w-6 text-[var(--accent-2)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--accent-7)]">Planned</p>
                <p className="text-2xl font-bold text-[var(--accent-8)]">
                  {/* TODO: Render stats.planned from backend */}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--card)] rounded-lg p-6 shadow-lg border border-[var(--border)]/60 backdrop-blur-xl">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[var(--accent-6)]/20 rounded-lg">
                <Bookmark className="h-6 w-6 text-[var(--accent-3)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--accent-7)]">Dropped</p>
                <p className="text-2xl font-bold text-[var(--accent-8)]">
                  {/* TODO: Render stats.dropped from backend */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="border-b border-[var(--border)]/40 mb-6 transition-colors duration-500">
          <nav className="-mb-px flex space-x-8">
            {(['overview', 'anime', 'manga', 'activity'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
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
          {activeTab === 'overview' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-[var(--accent-8)] mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {/* TODO: Render activities from backend */}
              </div>
            </div>
          )}

          {activeTab === 'anime' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-[var(--accent-8)] mb-4">
                Anime List
              </h2>
              <p className="text-[var(--text-200)]">
                Coming soon: View and manage your anime list
              </p>
            </div>
          )}

          {activeTab === 'manga' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-[var(--accent-8)] mb-4">
                Manga List
              </h2>
              <p className="text-[var(--text-200)]">
                Coming soon: View and manage your manga list
              </p>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-[var(--accent-8)] mb-4">
                Activity History
              </h2>
              <p className="text-[var(--text-200)]">
                Coming soon: View your complete activity history
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 