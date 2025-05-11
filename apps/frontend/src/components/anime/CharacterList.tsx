import React from 'react';
import { motion } from 'framer-motion';

interface Character {
  name: string;
  image: string;
  vaName?: string;
  vaImage?: string;
}

interface CharacterListProps {
  characters: Character[];
}

const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="overflow-x-auto py-2"
    >
      <div className="flex gap-6 min-w-full">
        {characters.map((char, idx) => (
          <div
            key={char.name + idx}
            className="flex flex-col items-center bg-card/80 rounded-xl shadow p-3 min-w-[120px] max-w-[120px] border border-border"
          >
            <img src={char.image} alt={char.name} className="w-16 h-16 rounded-full object-cover border-2 border-primary mb-2" />
            <span className="text-xs font-semibold text-center line-clamp-2 mb-1">{char.name}</span>
            {char.vaName && char.vaImage && (
              <div className="flex flex-col items-center mt-1">
                <img src={char.vaImage} alt={char.vaName} className="w-8 h-8 rounded-full object-cover border border-accent mb-1" />
                <span className="text-[10px] text-muted-foreground text-center line-clamp-1">{char.vaName}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CharacterList; 