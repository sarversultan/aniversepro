import React from 'react';

interface SkeletonProps {
  type?: 'card' | 'text' | 'avatar' | 'banner';
  className?: string;
}

const LoadingSkeleton: React.FC<SkeletonProps> = ({ type = 'card', className = '' }) => {
  const baseClasses = 'animate-pulse bg-ash rounded shadow';

  switch (type) {
    case 'card':
      return (
        <div className={`${baseClasses} ${className}`}>
          <div className="aspect-[2/3] w-full rounded-t-lg" />
          <div className="p-4 space-y-3">
            <div className="h-4 w-3/4 rounded" />
            <div className="h-3 w-1/2 rounded" />
          </div>
        </div>
      );

    case 'text':
      return (
        <div className={`${baseClasses} ${className}`}>
          <div className="space-y-3">
            <div className="h-4 w-full rounded" />
            <div className="h-4 w-5/6 rounded" />
            <div className="h-4 w-4/6 rounded" />
          </div>
        </div>
      );

    case 'avatar':
      return (
        <div className={`${baseClasses} ${className}`}>
          <div className="w-12 h-12 rounded-full" />
        </div>
      );

    case 'banner':
      return (
        <div className={`${baseClasses} ${className}`}>
          <div className="aspect-[16/9] w-full rounded-lg" />
        </div>
      );

    default:
      return <div className={`${baseClasses} ${className}`} />;
  }
};

export const CardGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <LoadingSkeleton key={index} type="card" />
      ))}
    </div>
  );
};

export const TextSkeleton: React.FC<{ lines?: number }> = ({ lines = 3 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, index) => (
        <LoadingSkeleton key={index} type="text" className="h-4" />
      ))}
    </div>
  );
};

export default LoadingSkeleton; 