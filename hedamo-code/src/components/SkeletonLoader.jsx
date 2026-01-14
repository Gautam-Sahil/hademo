// src/components/SkeletonLoader.js
import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Page Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-3">
          <div className="h-8 w-48 bg-institutional-slate-light2 rounded"></div>
          <div className="h-4 w-64 bg-institutional-slate-light2 rounded"></div>
        </div>
        <div className="h-10 w-32 bg-institutional-slate-light2 rounded-lg"></div>
      </div>

      {/* Search Bar Skeleton */}
      <div className="bg-white rounded-xl border border-institutional-slate-border2 p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1 max-w-xl">
            <div className="h-11 bg-institutional-slate-light2 rounded-lg"></div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2">
              <div className="h-10 w-24 bg-institutional-slate-light2 rounded-lg"></div>
            </div>
            <div className="h-10 w-28 bg-institutional-slate-light2 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Product Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-white rounded-xl border border-institutional-slate-border2 p-5">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-20 bg-institutional-slate-light2 rounded-full"></div>
                  <div className="h-4 w-16 bg-institutional-slate-light2 rounded"></div>
                </div>
                <div className="h-6 w-48 bg-institutional-slate-light2 rounded"></div>
              </div>
              <div className="h-5 w-5 bg-institutional-slate-light2 rounded"></div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center">
                <div className="h-4 w-4 bg-institutional-slate-light2 rounded mr-2"></div>
                <div className="h-4 w-32 bg-institutional-slate-light2 rounded"></div>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 bg-institutional-slate-light rounded mr-2"></div>
                <div className="h-4 w-40 bg-institutional-slate-light2 rounded"></div>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 bg-institutional-slate-light2 rounded mr-2"></div>
                <div className="h-4 w-36 bg-institutional-slate-light2 rounded"></div>
              </div>
            </div>
            
            <div className="h-4 w-full bg-institutional-slate-light2 rounded mb-4"></div>
            
            <div className="pt-4 border-t border-institutional-slate-border2">
              <div className="flex justify-between">
                <div className="h-3 w-16 bg-institutional-slate-light2 rounded"></div>
                <div className="h-3 w-20 bg-institutional-slate-light2 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;