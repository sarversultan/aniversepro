import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Moon, Sun, Menu, X, Clapperboard, BookOpen, Newspaper, Users, Bell, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  // Professional theme toggle with animation and persistence
  useEffect(() => {
    const root = window.document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const setDark = (val: boolean) => {
      if (val) {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    };
    if (savedTheme === 'dark' || (!savedTheme && darkQuery.matches)) {
      setDark(true);
    } else {
      setDark(false);
    }
    const listener = (e: MediaQueryListEvent) => setDark(e.matches);
    darkQuery.addEventListener('change', listener);
    return () => darkQuery.removeEventListener('change', listener);
  }, []);

  const isDark = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');

  const toggleTheme = () => {
    const root = window.document.documentElement;
    const currentlyDark = root.classList.contains('dark');
    if (currentlyDark) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  const navItems = [
    { path: '/anime', label: 'Anime', icon: <Clapperboard className="h-5 w-5 mr-1" /> },
    { path: '/manga', label: 'Manga', icon: <BookOpen className="h-5 w-5 mr-1" /> },
    { path: '/news', label: 'News', icon: <Newspaper className="h-5 w-5 mr-1" /> },
    { path: '/community', label: 'Community', icon: <Users className="h-5 w-5 mr-1" /> },
  ];

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, path: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.location.href = path;
    }
  };

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="fixed top-0 left-0 right-0 z-50 bg-[var(--primary-bg)]/90 backdrop-blur-lg border-b border-[var(--border)]/60"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand as Home */}
          <Link 
            to="/" 
            className="flex items-center group"
            aria-label="AniVersePro Home"
          >
            <motion.img 
              src="/src/assets/aniversepro-logo.svg" 
              alt="AniVersePro Logo" 
              className="w-10 h-10 mr-2 group-hover:rotate-12 transition-transform duration-300 drop-shadow-[0_0_10px_var(--accent-2)]"
              whileHover={{ scale: 1.1, rotate: 12 }}
              whileTap={{ scale: 0.95 }}
            />
            <motion.span 
              className="text-2xl font-bold bg-gradient-to-r from-[var(--primary)] via-[var(--accent-2)] to-[var(--accent-6)] bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              AniVersePro
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center text-sm font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'text-[var(--accent-2)] border-b-2 border-[var(--accent-2)] pb-1'
                      : 'text-[var(--text-200)] hover:text-[var(--accent-6)]'
                  }`}
                  onKeyDown={(e) => handleKeyDown(e, item.path)}
                  role="menuitem"
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  {item.icon}
                  <span className="sr-only">{item.label}</span>
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full hover:bg-[var(--accent-2)]/20 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-[var(--accent-2)]" />
            </motion.button>

            {/* Notification */}
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-[var(--accent-2)]/20 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-[var(--accent-2)]" />
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-2 rounded-full hover:bg-[var(--accent-2)]/20 transition-colors ${isDark ? 'ring-2 ring-[var(--accent-2)]' : ''}`}
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-[var(--accent-2)]" />
              ) : (
                <Moon className="h-5 w-5 text-[var(--accent-6)]" />
              )}
            </motion.button>

            {/* Profile */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/profile" 
                className="p-2 rounded-full hover:bg-[var(--accent-2)]/20 transition-colors"
                aria-label="Profile"
              >
                <UserCircle className="h-6 w-6 text-[var(--accent-6)]" />
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-[var(--accent-2)]/20 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-[var(--accent-2)]" />
              ) : (
                <Menu className="h-5 w-5 text-[var(--accent-2)]" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden py-4 space-y-4"
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'text-[var(--accent-2)] border-b-2 border-[var(--accent-2)] pb-1'
                        : 'text-[var(--text-200)] hover:text-[var(--accent-6)]'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="py-4"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search anime, manga, news..."
                  className="w-full px-4 py-2 rounded-lg bg-[var(--secondary-bg)] text-[var(--text-100)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-2)] transition-all duration-300"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-[var(--accent-2)]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar; 