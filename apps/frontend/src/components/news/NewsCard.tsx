import React from 'react';
import { motion } from 'framer-motion';

interface NewsCardProps {
  id: string;
  title: string;
  content: string;
  banner: string;
  thumbnail?: string;
  pubDate: string;
  excerpt?: string;
  onClick?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ id, title, content, banner, thumbnail, pubDate, excerpt, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: '0 8px 32px 0 rgba(80,80,180,0.10)' }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, type: 'spring' }}
      className="group cursor-pointer rounded-xl border border-border bg-card/80 shadow-lg flex gap-4 p-4 hover:shadow-2xl transition-all"
      onClick={onClick}
    >
      {thumbnail && (
        <img src={thumbnail} alt={title} className="w-24 h-24 object-cover rounded-lg flex-shrink-0" />
      )}
      <div className="flex flex-col flex-1">
        <h3 className="font-semibold line-clamp-1 text-lg" title={title}>{title}</h3>
        <span className="text-xs text-muted-foreground mb-2">{new Date(pubDate).toLocaleDateString()}</span>
        <p className="text-xs text-muted-foreground line-clamp-2" title={content}>{content}</p>
      </div>
    </motion.div>
  );
};

export default NewsCard; 