import React from 'react';

const SkeletonCard: React.FC = () => (
  <div className="rounded-lg border bg-card p-4 animate-pulse flex flex-col gap-3 w-full h-56">
    <div className="h-32 w-full bg-muted rounded-md" />
    <div className="h-4 w-2/3 bg-muted rounded" />
    <div className="h-3 w-1/2 bg-muted rounded" />
    <div className="h-3 w-1/3 bg-muted rounded" />
  </div>
);

export default SkeletonCard; 