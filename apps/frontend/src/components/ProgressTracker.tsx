import React from 'react';
import { BookOpen, Play } from 'lucide-react';

interface ProgressTrackerProps {
  type: 'watch' | 'read';
  current: number;
  total: number;
  title: string;
  onUpdate?: (progress: number) => void;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  type,
  current,
  total,
  title,
  onUpdate
}) => {
  const progress = (current / total) * 100;
  const Icon = type === 'watch' ? Play : BookOpen;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onUpdate) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const newProgress = Math.round((percentage / 100) * total);

    onUpdate(Math.min(Math.max(newProgress, 0), total));
  };

  return (
    <div className="bg-[#1A1A2E] rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-5 h-5 text-[#3C9DF6]" />
        <h3 className="text-[#EDEDED] font-medium">{title}</h3>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm text-[#EDEDED]/80">
          {current} / {total}
        </span>
        <span className="text-sm text-[#EDEDED]/60">
          ({Math.round(progress)}%)
        </span>
      </div>
      <div
        className="h-2 bg-[#2A2A3E] rounded-full cursor-pointer"
        onClick={handleProgressClick}
      >
        <div
          className="h-full bg-[#3C9DF6] rounded-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressTracker; 