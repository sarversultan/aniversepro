import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Discord } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F0F1A] border-t border-[#3C9DF6]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-[#EDEDED] mb-4">About AniVerse</h3>
            <p className="text-[#EDEDED]/80">
              Your ultimate destination for anime and manga. Watch, read, and connect with fellow fans.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#EDEDED] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/anime" className="text-[#EDEDED]/80 hover:text-[#3C9DF6] transition-colors">
                  Anime
                </Link>
              </li>
              <li>
                <Link to="/manga" className="text-[#EDEDED]/80 hover:text-[#3C9DF6] transition-colors">
                  Manga
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-[#EDEDED]/80 hover:text-[#3C9DF6] transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-[#EDEDED]/80 hover:text-[#3C9DF6] transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-[#EDEDED] mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-[#EDEDED]/80 hover:text-[#3C9DF6] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-[#EDEDED]/80 hover:text-[#3C9DF6] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/dmca" className="text-[#EDEDED]/80 hover:text-[#3C9DF6] transition-colors">
                  DMCA
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#EDEDED] mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/yourusername/aniverse"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EDEDED]/80 hover:text-[#3C9DF6] transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com/aniverse"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EDEDED]/80 hover:text-[#3C9DF6] transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://discord.gg/aniverse"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EDEDED]/80 hover:text-[#3C9DF6] transition-colors"
              >
                <Discord className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-[#3C9DF6]/20 text-center text-[#EDEDED]/60">
          <p>&copy; {new Date().getFullYear()} AniVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 