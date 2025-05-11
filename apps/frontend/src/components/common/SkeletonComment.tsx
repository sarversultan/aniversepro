import React from 'react';

const SkeletonComment: React.FC = () => (
  <div className="flex gap-4 items-start animate-pulse mb-4">
    <div className="w-10 h-10 rounded-full bg-muted" />
    <div className="flex-1 space-y-2">
      <div className="h-4 w-1/3 bg-muted rounded" />
      <div className="h-3 w-2/3 bg-muted rounded" />
      <div className="h-3 w-1/2 bg-muted rounded" />
    </div>
  </div>
);

export default SkeletonComment; 