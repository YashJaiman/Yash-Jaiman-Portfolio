import React from 'react';

/**
 * LeetCodeStatsSkeleton
 * Shimmering skeleton loader for progressive/lazy loading of the LeetCode Journey section
 */
export const LeetCodeStatsSkeleton = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 relative z-10 animate-pulse">
      {/* Header Skeleton */}
      <div className="text-center mb-16 flex flex-col items-center">
        <div className="h-6 w-32 bg-white/5 border border-white/10 rounded-full mb-4 shimmer" />
        <div className="h-14 w-80 bg-white/5 rounded-2xl mb-4 shimmer" />
        <div className="h-6 w-96 bg-white/5 rounded-lg shimmer" />
      </div>

      {/* Cards Row Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className="glass-premium rounded-[2rem] p-8 border border-white/5 min-h-[280px] flex flex-col justify-between relative overflow-hidden"
          >
            {/* Shimmer sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer-sweep" />
            
            <div className="flex justify-between items-start">
              <div>
                <div className="h-3 w-16 bg-white/10 rounded-md mb-2" />
                <div className="h-8 w-24 bg-white/10 rounded-lg" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full" />
            </div>

            <div className="h-24 w-full bg-white/5 rounded-2xl my-4 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-transparent animate-spin" />
            </div>

            <div className="h-3 w-2/3 bg-white/10 rounded-md" />
          </div>
        ))}
      </div>

      {/* Heatmap Row Skeleton */}
      <div className="glass-premium rounded-[2rem] p-8 border border-white/5 min-h-[300px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer-sweep" />
        
        <div className="flex justify-between items-center mb-8">
          <div className="h-5 w-48 bg-white/10 rounded-md" />
          <div className="h-4 w-32 bg-white/10 rounded-md" />
        </div>

        {/* Heatmap grid mockup */}
        <div className="flex flex-col gap-2 overflow-x-auto pb-4">
          <div className="flex gap-1.5 min-w-[600px]">
            {Array.from({ length: 40 }).map((_, wIndex) => (
              <div key={wIndex} className="flex flex-col gap-1.5">
                {Array.from({ length: 7 }).map((_, dIndex) => (
                  <div key={dIndex} className="w-3.5 h-3.5 rounded-sm bg-white/5" />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5">
          <div className="h-4 w-36 bg-white/10 rounded-md" />
          <div className="h-9 w-32 bg-white/10 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default LeetCodeStatsSkeleton;
