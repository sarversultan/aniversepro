import { useState, useEffect, useRef } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, RefreshCw, Flag } from 'lucide-react';

interface MirrorSource {
  name: string;
  src: string;
}

interface MirrorPlayerProps {
  mirrors: MirrorSource[];
  className?: string;
}

const MirrorPlayer = ({ mirrors, className = '' }: MirrorPlayerProps) => {
  const [selectedMirror, setSelectedMirror] = useState<MirrorSource>(mirrors[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const playerRef = useRef<HTMLVideoElement>(null);
  const plyrInstance = useRef<Plyr | null>(null);

  useEffect(() => {
    if (playerRef.current) {
      plyrInstance.current = new Plyr(playerRef.current, {
        controls: [
          'play-large',
          'play',
          'progress',
          'current-time',
          'mute',
          'volume',
          'captions',
          'settings',
          'pip',
          'airplay',
          'fullscreen',
        ],
      });

      // Load the last working mirror from localStorage if available
      const lastWorkingMirror = localStorage.getItem('lastWorkingMirror');
      if (lastWorkingMirror) {
        const mirror = mirrors.find(m => m.src === lastWorkingMirror);
        if (mirror) {
          setSelectedMirror(mirror);
        }
      }

      return () => {
        if (plyrInstance.current) {
          plyrInstance.current.destroy();
        }
      };
    }
  }, []);

  const handleMirrorChange = (mirror: MirrorSource) => {
    setIsLoading(true);
    setHasError(false);
    setSelectedMirror(mirror);

    // Save the selected mirror to localStorage
    localStorage.setItem('lastWorkingMirror', mirror.src);

    // Reset the video source
    if (playerRef.current) {
      playerRef.current.src = mirror.src;
      playerRef.current.load();
    }
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoadedData = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    if (playerRef.current) {
      playerRef.current.load();
    }
  };

  return (
    <div className={`w-full max-w-6xl mx-auto ${className}`}>
      <div className="bg-[#0F0F1A] rounded-lg border border-[#3C9DF6] p-4">
        {/* Mirror Selector */}
        <div className="mb-4">
          <select
            value={selectedMirror.src}
            onChange={(e) => {
              const mirror = mirrors.find(m => m.src === e.target.value);
              if (mirror) handleMirrorChange(mirror);
            }}
            className="w-full bg-[#1A1A2E] text-[#EDEDED] border border-[#3C9DF6] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3C9DF6]"
          >
            {mirrors.map((mirror) => (
              <option key={mirror.src} value={mirror.src}>
                {mirror.name}
              </option>
            ))}
          </select>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video">
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-[#0F0F1A]/80 z-10"
              >
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3C9DF6]"></div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {hasError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-[#0F0F1A]/80 z-10 p-4"
              >
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <p className="text-[#EDEDED] text-center mb-4">
                  Failed to load video. Please try another mirror or retry.
                </p>
                <button
                  onClick={handleRetry}
                  className="flex items-center gap-2 px-4 py-2 bg-[#3C9DF6] text-[#EDEDED] rounded-md hover:bg-[#2B8CE6] transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <video
            ref={playerRef}
            className="w-full h-full"
            onError={handleError}
            onLoadedData={handleLoadedData}
            controls
          >
            <source src={selectedMirror.src} type="video/mp4" />
          </video>
        </div>

        {/* Report Button */}
        <div className="mt-4 flex justify-end">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-[#1A1A2E] text-[#EDEDED] rounded-md hover:bg-[#2A2A3E] transition-colors"
            onClick={() => {
              // TODO: Implement report functionality
              console.log('Report broken link:', selectedMirror.src);
            }}
          >
            <Flag className="w-4 h-4" />
            Report Broken Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default MirrorPlayer; 