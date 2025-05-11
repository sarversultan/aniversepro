import React from 'react';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  category: string;
  description?: string;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, description, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="cursor-pointer bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <h3 className="text-xl font-semibold text-white">{category}</h3>
      {description && <p className="text-gray-400 mt-2">{description}</p>}
    </motion.div>
  );
};

export default CategoryCard;
