import React from 'react';
import { motion } from 'framer-motion';

interface NewsDetailContentProps {
  title: string;
  content: string;
  banner?: string;
  pubDate?: string;
}

const NewsDetailContent: React.FC<NewsDetailContentProps> = ({ title, content, banner, pubDate }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="max-w-3xl mx-auto bg-card/80 rounded-2xl shadow-xl overflow-hidden mb-8"
    >
      {banner && (
        <div className="h-56 w-full relative overflow-hidden">
          <img src={banner} alt="banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
      )}
      <div className="p-6 flex flex-col gap-3">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground mb-4">{pubDate}</p>
        <div className="prose prose-invert max-w-none mt-2 text-base">{content}</div>
      </div>
    </motion.article>
  );
};

export default NewsDetailContent; 