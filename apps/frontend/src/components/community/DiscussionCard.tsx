import React from 'react';
import { motion } from 'framer-motion';

interface DiscussionCardProps {
  title: string;
  contentPreview: string;
  username: string;
  createdAt: Date | string;
  repliesCount: number;
  onClick?: () => void;
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({
  title,
  contentPreview,
  username,
  createdAt,
  repliesCount,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="text-gray-400 mt-1 text-sm line-clamp-2">{contentPreview}</p>
      <div className="flex justify-between items-center mt-3 text-gray-500 text-xs">
        <span>By {username}</span>
        <span>{new Date(createdAt).toLocaleDateString()}</span>
        <span>{repliesCount} replies</span>
      </div>
    </motion.div>
  );
};

export default DiscussionCard;
