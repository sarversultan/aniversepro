import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold text-[var(--accent-2)] mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-[var(--text-100)] mb-6">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-[var(--text-200)] mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-[var(--accent-2)] text-white font-medium hover:bg-[var(--accent-3)] transition-colors"
        >
          Return Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound; 