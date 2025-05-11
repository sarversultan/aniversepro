import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MessageSquare, Heart, Share2 } from 'lucide-react';

interface CommunityPost {
  id: string;
  user: string;
  avatar: string;
  msg: string;
  time: string;
  likes: number;
  comments: number;
}

const LiveCommunityBoard: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommunityPosts = async () => {
      try {
        setLoading(true);
        // TODO: Connect to backend API
        const response = await fetch('/api/community/live-feed');
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load community feed');
        setLoading(false);
      }
    };

    fetchCommunityPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-destructive bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="bg-[var(--secondary-bg)] rounded-lg shadow-sm p-6 transition-colors duration-500">
        <h2 className="text-xl font-bold text-[var(--accent-8)] mb-4">Live Community Board</h2>
        <p className="text-[var(--text-200)]">Real-time community updates</p>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-[var(--card)]/90 rounded-2xl border border-[var(--border)]/40 shadow-xl max-w-2xl mx-auto p-6 mb-6 overflow-y-auto max-h-72 backdrop-blur-xl"
      >
        <AnimatePresence>
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-start gap-4 p-4 border-b border-[var(--border)]/20 last:border-0"
            >
              <img
                src={post.avatar || '/src/assets/aniverse-logo.svg'}
                alt={post.user}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-[var(--text-100)]">@{post.user}</span>
                  <span className="text-sm text-[var(--text-200)]">{post.time}</span>
                </div>
                <p className="text-[var(--text-200)] mb-2">{post.msg}</p>
                <div className="flex items-center gap-4 text-sm text-[var(--text-200)]">
                  <button className="flex items-center gap-1 hover:text-[var(--primary)] transition-colors">
                    <Heart className="w-4 h-4" />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-1 hover:text-[var(--primary)] transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    {post.comments}
                  </button>
                  <button className="flex items-center gap-1 hover:text-[var(--primary)] transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default LiveCommunityBoard; 