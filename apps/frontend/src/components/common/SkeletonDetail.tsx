import React from 'react';

const SkeletonDetail: React.FC = () => (
  <div className="flex flex-col md:flex-row gap-8 animate-pulse">
    <div className="w-full md:w-64 h-80 bg-muted rounded-lg" />
    <div className="flex-1 space-y-4">
      <div className="h-8 w-2/3 bg-muted rounded" />
      <div className="h-4 w-1/2 bg-muted rounded" />
      <div className="h-4 w-1/3 bg-muted rounded" />
      <div className="h-3 w-full bg-muted rounded" />
      <div className="h-3 w-5/6 bg-muted rounded" />
      <div className="h-3 w-4/6 bg-muted rounded" />
    </div>
  </div>
);

export default SkeletonDetail; 