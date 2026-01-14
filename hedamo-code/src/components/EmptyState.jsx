// src/components/EmptyState.js
import React from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

const EmptyState = ({ searchTerm, selectedCategories, selectedStatuses, onClearFilters }) => {
  return (
    <div className="bg-white rounded-xl border border-institutional-slate-border p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="h-16 w-16 bg-institutional-slate-light rounded-full flex items-center justify-center mx-auto mb-6">
          <MagnifyingGlassIcon className="h-8 w-8 text-institutional-slate" />
        </div>
        
        <h3 className="text-xl font-semibold text-institutional-blue mb-3">
          No products match your criteria
        </h3>
        
        <p className="text-institutional-slate mb-8">
          {searchTerm
            ? `No products found matching "${searchTerm}"`
            : 'Try adjusting your filters or search terms to find what you\'re looking for.'}
        </p>
        
        {(searchTerm || selectedCategories.length > 0 || selectedStatuses.length > 0) && (
          <button
            onClick={onClearFilters}
            className="inline-flex items-center space-x-2 px-5 py-2.5 text-sm font-medium text-institutional-accent hover:text-institutional-accent-hover hover:bg-institutional-accent/10 rounded-lg border border-institutional-accent/30 transition-all duration-200"
          >
            <XMarkIcon className="h-4 w-4" />
            <span>Clear all filters and search</span>
          </button>
        )}
        
        <div className="mt-10 pt-8 border-t border-institutional-slate-border">
          <p className="text-sm text-institutional-slate mb-4">Suggestions:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 bg-institutional-slate-light text-institutional-slate text-sm rounded-lg">
              Check your spelling
            </span>
            <span className="px-3 py-1 bg-institutional-slate-light text-institutional-slate text-sm rounded-lg">
              Use more general terms
            </span>
            <span className="px-3 py-1 bg-institutional-slate-light text-institutional-slate text-sm rounded-lg">
              Try different filters
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;