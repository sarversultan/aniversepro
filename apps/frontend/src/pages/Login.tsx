import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';

const auth = getAuth();
const provider = new GoogleAuthProvider();

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111111] relative overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#111111] via-[#E63946]/10 to-[#111111]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(230,57,70,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('/src/assets/noise.png')] opacity-[0.15] mix-blend-overlay" />
      </div>
      <div className="relative z-10 w-full max-w-md">
        <div className="absolute inset-0 bg-gradient-to-r from-[#E63946]/20 via-transparent to-[#E63946]/20 blur-xl transform translate-y-1/2" />
        <div className="relative bg-gradient-to-br from-[#111111]/80 via-[#E63946]/5 to-[#111111]/80 backdrop-blur-2xl rounded-2xl shadow-[0_8px_32px_rgba(230,57,70,0.15)] border border-[#E63946]/20 p-8">
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl pointer-events-none" />
          <h1 className="relative text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F9F9F9] via-[#E63946] to-[#F9F9F9] mb-6 text-center drop-shadow-2xl">
            AniVersePro
          </h1>
          <form onSubmit={handleAuth} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-3 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-3 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
            />
            {error && <div className="text-red-400 text-sm text-center">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 text-white font-bold shadow-md hover:scale-[1.03] transition-transform duration-150 disabled:opacity-60"
            >
              {loading ? (isSignUp ? 'Signing up...' : 'Logging in...') : isSignUp ? 'Sign Up' : 'Login'}
            </button>
          </form>
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
            <span className="mx-3 text-gray-400 text-xs">or</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
          </div>
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold shadow-md border border-gray-700 transition-colors duration-150 disabled:opacity-60"
          >
            <FcGoogle className="text-xl" /> Continue with Google
          </button>
          <div className="mt-6 text-center">
            <span className="text-gray-400 text-sm">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            </span>
            <button
              className="ml-2 text-blue-400 hover:underline text-sm font-semibold"
              onClick={() => setIsSignUp(v => !v)}
              disabled={loading}
            >
              {isSignUp ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 