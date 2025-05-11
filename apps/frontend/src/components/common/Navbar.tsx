import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-purple-900 via-black to-blue-900 shadow-lg fixed top-0 left-0 w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white tracking-wide">
          <span className="text-primary">Ani</span>Verse
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6 text-white font-medium">
          <Link to="/" className="hover:text-primary transition duration-200">Home</Link>
          <Link to="/anime" className="hover:text-primary transition duration-200">Anime</Link>
          <Link to="/manga" className="hover:text-primary transition duration-200">Manga</Link>
          <Link to="/news" className="hover:text-primary transition duration-200">News</Link>
          <Link to="/community" className="hover:text-primary transition duration-200">Community</Link>
        </nav>

        {/* Login / Profile */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="bg-primary text-black px-4 py-1.5 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </motion.header>
  );
};
