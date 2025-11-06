'use client';

import React from 'react';

interface DiagonalDividerProps {
  className?: string;
  direction?: 'up' | 'down';
  color?: string;
}

const DiagonalDivider: React.FC<DiagonalDividerProps> = ({ 
  className = '', 
  direction = 'down',
  color = 'hsl(var(--background))'
}) => {
  // For 'down' direction: flat top, diagonal bottom (going down)
  // For 'up' direction: diagonal top (going up), flat bottom
  const pathData = direction === 'down' 
    ? 'M0,0 L1200,0 L1200,120 L0,20 Z'  // Top flat, bottom diagonal down
    : 'M0,100 L1200,100 L1200,0 L0,80 Z';  // Top diagonal up, bottom flat

  return (
    <div className={`w-full h-20 ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ fill: color }}
      >
        <path d={pathData} />
      </svg>
    </div>
  );
};

export default DiagonalDivider;
