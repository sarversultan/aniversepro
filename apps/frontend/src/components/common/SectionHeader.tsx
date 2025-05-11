import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className="flex items-center gap-4 mb-8"
    >
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/80 to-accent/80 shadow-lg border border-primary/30">
        {icon}
      </div>
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-lg">
          {title}
        </h1>
        {children && <div className="mt-1">{children}</div>}
      </div>
    </motion.div>
  );
};

export default SectionHeader; 