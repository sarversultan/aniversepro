import React from 'react';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#0F0F1A] rounded-lg border border-[#3C9DF6] p-6 w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#EDEDED]/60 hover:text-[#EDEDED] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#EDEDED] mb-4">Welcome to AniVerse</h2>
          <p className="text-[#EDEDED]/80 mb-6">Sign in to access your account and continue watching</p>

          {/* Sign In Form */}
          <div className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-[#1A1A2E] border border-[#3C9DF6]/20 rounded-lg px-4 py-2 text-[#EDEDED] focus:outline-none focus:border-[#3C9DF6]"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-[#1A1A2E] border border-[#3C9DF6]/20 rounded-lg px-4 py-2 text-[#EDEDED] focus:outline-none focus:border-[#3C9DF6]"
              />
            </div>
            <button className="w-full bg-[#3C9DF6] text-[#EDEDED] py-2 rounded-lg hover:bg-[#2B8CE6] transition-colors">
              Sign In
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-4 text-[#EDEDED]/60">
            Don't have an account?{' '}
            <button className="text-[#3C9DF6] hover:text-[#2B8CE6] transition-colors">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal; 