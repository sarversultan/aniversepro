import React from 'react';
import { motion } from 'framer-motion';
import CommentSection from '../common/CommentSection';
import { User } from '../../types/auth';

interface MangaCommentsProps {
  mangaId: string;
  user: User | null;
}

const MangaComments: React.FC<MangaCommentsProps> = ({ mangaId, user }) => {
  const handleCommentSubmit = async (content: string, parentId?: string) => {
    // This will be implemented later with Firebase/Supabase
    console.log('Comment submitted:', { content, parentId, mangaId });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="rounded-2xl bg-card/80 shadow-xl overflow-hidden mb-8"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Community Discussion
        </h2>
        <CommentSection
          contentType="manga"
          contentId={mangaId}
          user={user}
          onCommentSubmit={handleCommentSubmit}
        />
      </div>
    </motion.section>
  );
};

export default MangaComments; 