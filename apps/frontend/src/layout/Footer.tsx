import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, MessageCircle, Instagram, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      href: 'https://github.com/yourusername/aniverse',
      label: 'GitHub',
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      href: 'https://twitter.com/aniverse',
      label: 'Twitter',
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      href: 'https://discord.gg/aniverse',
      label: 'Discord',
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      href: 'https://instagram.com/aniverse',
      label: 'Instagram',
    },
  ];

  const footerLinks = [
    {
      title: 'Content',
      links: [
        { label: 'Anime', href: '/anime' },
        { label: 'Manga', href: '/manga' },
        { label: 'News', href: '/news' },
        { label: 'Community', href: '/community' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'DMCA', href: '/dmca' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Report Issue', href: '/report' },
      ],
    },
  ];

  return (
    <footer className="bg-[var(--primary-bg)] border-t border-[var(--border)] relative" role="contentinfo">
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 rounded-full bg-[var(--accent-2)] text-white shadow-lg hover:bg-[var(--accent-3)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-2)] focus:ring-offset-2"
            aria-label="Back to top"
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center group" aria-label="AniVersePro Home">
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
            <p className="text-sm text-[var(--text-200)]">
              Your ultimate destination for anime, manga, and community.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-200)] hover:text-[var(--accent-2)] transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-[var(--text-100)] uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-[var(--text-200)] hover:text-[var(--accent-2)] transition-colors"
                      aria-label={link.label}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border)] text-center text-sm text-[var(--text-200)]">
          <p>© {currentYear} AniVersePro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 