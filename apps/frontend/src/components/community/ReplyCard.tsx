import React from 'react';
import { motion } from 'framer-motion';

interface ReplyCardProps {
  content: string;
  username: string;
  createdAt: Date | string;
}

const ReplyCard: React.FC<ReplyCardProps> = ({ content, username, createdAt }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-700 rounded-md p-3 mb-2 shadow-sm"
    >
      <p className="text-gray-300">{content}</p>
      <div className="text-xs text-gray-500 mt-1 flex justify-between">
        <span>By {username}</span>
        <span>{new Date(createdAt).toLocaleString()}</span>
      </div>
    </motion.div>
  );
};

export default ReplyCard;
