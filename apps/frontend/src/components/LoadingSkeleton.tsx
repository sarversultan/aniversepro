import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse bg-[#1A1A2E] rounded-md ${className}`}
    />
  );
};

interface SkeletonTextProps extends SkeletonProps {
  lines?: number;
  lineHeight?: string;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  lineHeight = 'h-4',
  className = ''
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={`w-full ${lineHeight}`}
        />
      ))}
    </div>
  );
};

interface SkeletonCardProps extends SkeletonProps {
  width?: string;
  height?: string;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  width = 'w-full',
  height = 'h-48',
  className = ''
}) => {
  return (
    <div className={`${width} ${className}`}>
      <Skeleton className={`${height} mb-2`} />
      <SkeletonText lines={2} />
    </div>
  );
};

export default {
  Skeleton,
  SkeletonText,
  SkeletonCard
}; 