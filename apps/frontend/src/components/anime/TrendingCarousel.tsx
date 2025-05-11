import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TrendingCarouselProps {
  animeList: any[];
}

export const TrendingCarousel: React.FC<TrendingCarouselProps> = ({ animeList }) => {
  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-hide">
      {animeList.map((anime) => (
        <motion.div
          key={anime.id}
          className="min-w-[180px] bg-gray-900 rounded-2xl overflow-hidden shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <img src={anime.coverImage?.large || anime.coverImage} alt={anime.rewrittenTitle} className="w-full h-48 object-cover" />
          <div className="p-2 text-center text-sm font-medium">{anime.rewrittenTitle}</div>
        </motion.div>
      ))}
    </div>
  );
};
