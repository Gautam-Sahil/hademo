// src/components/FilterPanel.js
import React, { useState, useEffect } from 'react';
import { 
  XMarkIcon, 
  CheckIcon, 
  FunnelIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';

const FilterPanel = ({
  categories,
  statuses,
  selectedCategories,
  selectedStatuses,
  onCategoryChange,
  onStatusChange,
  onClose
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);
  
  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setAnimateIn(true), 50);
  }, []);

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const toggleStatus = (status) => {
    if (selectedStatuses.includes(status)) {
      onStatusChange(selectedStatuses.filter(s => s !== status));
    } else {
      onStatusChange([...selectedStatuses, status]);
    }
  };

  const clearAll = () => {
    onCategoryChange([]);
    onStatusChange([]);
    // Add subtle animation feedback
    const buttons = document.querySelectorAll('.filter-option');
    buttons.forEach(btn => {
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => btn.style.transform = '', 200);
    });
  };

  const applyFilters = () => {
    // Animate close with success feedback
    const panel = document.querySelector('.filter-panel');
    panel.style.transform = 'translateY(20px)';
    panel.style.opacity = '0.8';
    
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const totalSelected = selectedCategories.length + selectedStatuses.length;

  return (
    <div className={`fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 ${animateIn ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-institutional-blue/20 to-institutional-accent/10 backdrop-blur-md"
        onClick={onClose}
      ></div>
      
      <div 
        className={`filter-panel relative w-full max-w-4xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden transition-all duration-500 ${animateIn ? 'translate-y-0' : 'translate-y-10'}`}
        style={{
          boxShadow: '0 20px 60px rgba(0, 71, 187, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.8) inset'
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-institutional-accent/5 to-transparent rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-institutional-blue/5 to-transparent rounded-full translate-x-10 translate-y-10"></div>
        
        {/* Header with glass effect */}
        <div className="relative bg-gradient-to-r from-white to-white/90 border-b border-white/50 px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-gradient-to-br from-institutional-accent to-institutional-accent-hover shadow-lg mr-4">
                <AdjustmentsHorizontalIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-2xl bg-gradient-to-r from-institutional-blue to-institutional-accent bg-clip-text text-transparent">
                  Advanced Filters
                </h3>
                <div className="flex items-center mt-1">
                  <p className="text-sm text-institutional-slate/80">
                    Refine your product search with precision
                  </p>
                  {totalSelected > 0 && (
                    <span className="ml-3 px-2.5 py-0.5 text-xs font-bold bg-gradient-to-r from-institutional-accent to-institutional-accent-hover text-white rounded-full animate-pulse-subtle">
                      {totalSelected} active
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2.5 rounded-xl bg-gray-100 border border-institutional-slate-border/30 text-institutional-slate hover:text-institutional-blue hover:bg-white hover:border-institutional-blue/30 transition-all duration-300 hover:scale-105"
                aria-label={isExpanded ? "Collapse" : "Expand"}
                title={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? (
                  <ArrowsPointingInIcon className="h-5 w-5" />
                ) : (
                  <ArrowsPointingOutIcon className="h-5 w-5" />
                )}
              </button>
              
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl bg-gray-100 border border-institutional-slate-border/30 text-institutional-slate hover:text-institutional-blue hover:bg-white/80 hover:border-institutional-blue/30 transition-all duration-300 hover:scale-105"
                aria-label="Close filters"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className={`p-8  bg-gray-100 ${isExpanded ? '' : 'max-h-[500px] overflow-y-auto'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Category Filter Section */}
            <div className="relative">
              <div 
                className={`p-6 rounded-2xl transition-all duration-500 ${activeSection === 'categories' ? 'bg-gradient-to-br from-white to-white/80 border-2 border-institutional-accent/30 shadow-xl' : 'bg-white/60 border border-white/50 hover:border-institutional-slate-border/50'}`}
                onMouseEnter={() => setActiveSection('categories')}
                onMouseLeave={() => setActiveSection(null)}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 mr-3">
                      <FunnelIcon className="h-5 w-5 text-institutional-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-institutional-blue text-lg flex items-center">
                        Categories
                        <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-institutional-blue/10 text-institutional-blue rounded-full">
                          {categories.length} options
                        </span>
                      </h4>
                      <p className="text-sm text-institutional-slate/70 mt-1">Filter by product type</p>
                    </div>
                  </div>
                  
                  {selectedCategories.length > 0 && (
                    <div className="flex -space-x-2">
                      {selectedCategories.slice(0, 3).map(cat => (
                        <div key={cat} className="h-8 w-8 rounded-full bg-gradient-to-br from-institutional-accent to-institutional-accent-hover flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm">
                          {cat.charAt(0)}
                        </div>
                      ))}
                      {selectedCategories.length > 3 && (
                        <div className="h-8 w-8 rounded-full bg-institutional-slate-light flex items-center justify-center text-institutional-slate text-xs font-bold border-2 border-white">
                          +{selectedCategories.length - 3}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`filter-option  w-full flex items-center justify-between px-4 py-3.5 text-sm rounded-xl transition-all duration-300 ${selectedCategories.includes(category) 
                        ? 'bg-gradient-to-r from-institutional-accent/10 to-institutional-accent/5 border border-institutional-accent/30 shadow-sm' 
                        : 'bg-gray-100/90 border border-transparent hover:border-institutional-slate-border/50 hover:bg-white/80'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`h-3 w-3 rounded-full mr-3 transition-all duration-300 ${selectedCategories.includes(category) 
                          ? 'bg-gradient-to-r from-institutional-accent to-institutional-accent-hover scale-125' 
                          : 'bg-institutional-slate-border'
                        }`}></div>
                        <span className={`font-medium ${selectedCategories.includes(category) ? 'text-institutional-blue' : 'text-institutional-slate'}`}>
                          {category}
                        </span>
                      </div>
                      {selectedCategories.includes(category) && (
                        <div className="flex items-center">
                          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-institutional-accent to-institutional-accent-hover flex items-center justify-center mr-2">
                            <CheckIcon className="h-3 w-3 text-white" />
                          </div>
                          <div className="h-1.5 w-1.5 rounded-full bg-institutional-accent animate-pulse"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                
                {selectedCategories.length > 0 && (
                  <button
                    onClick={() => onCategoryChange([])}
                    className="mt-4 text-xs font-medium text-institutional-slate hover:text-institutional-blue transition-colors duration-200"
                  >
                    Clear categories
                  </button>
                )}
              </div>
            </div>

            {/* Status Filter Section */}
            <div className="relative">
              <div 
                className={`p-6 rounded-2xl transition-all duration-500 ${activeSection === 'status' ? 'bg-gradient-to-br from-white to-white/80 border-2 border-institutional-accent/30 shadow-xl' : 'bg-white/60 border border-white/50 hover:border-institutional-slate-border/50'}`}
                onMouseEnter={() => setActiveSection('status')}
                onMouseLeave={() => setActiveSection(null)}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="p-2.5 rounded-lg bg-gradient-to-br from-green-50 to-emerald-100 mr-3">
                      <SparklesIcon className="h-5 w-5 text-status-published" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-institutional-blue text-lg">Status</h4>
                      <p className="text-sm text-institutional-slate/70 mt-1">Filter by publication status</p>
                    </div>
                  </div>
                  
                  {selectedStatuses.length > 0 && (
                    <div className="flex items-center">
                      {selectedStatuses.map(status => (
                        <div 
                          key={status}
                          className={`h-2 w-2 rounded-full ml-1 ${getStatusDotColor(status)}`}
                          title={status}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {statuses.map(status => (
                    <button
                      key={status}
                      onClick={() => toggleStatus(status)}
                      className={`filter-option w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 ${selectedStatuses.includes(status) 
                        ? getStatusButtonClass(status) + ' shadow-sm transform scale-[1.02]'
                        : 'bg-gray-100/90 border border-transparent hover:border-institutional-slate-border/50 hover:bg-white/80'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`h-3 w-3 rounded-full mr-3 ${getStatusDotColor(status)}`}></div>
                        <span className={`font-medium ${selectedStatuses.includes(status) ? getStatusTextColor(status) : 'text-institutional-slate'}`}>
                          {status}
                        </span>
                        <div className="ml-3 text-xs px-2 py-0.5 rounded-full bg-white/80 border border-institutional-slate-border/30">
                          {getStatusDescription(status)}
                        </div>
                      </div>
                      {selectedStatuses.includes(status) && (
                        <div className="h-6 w-6 rounded-full bg-white/80 border border-institutional-slate-border/30 flex items-center justify-center">
                          <CheckIcon className={`h-3.5 w-3.5 ${getStatusTextColor(status)}`} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                
                {selectedStatuses.length > 0 && (
                  <button
                    onClick={() => onStatusChange([])}
                    className="mt-4 text-xs font-medium text-institutional-slate hover:text-institutional-blue transition-colors duration-200"
                  >
                    Clear status filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stats & Action Buttons */}
          <div className="mt-10 pt-8 border-t border-white/50">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              <div className="mb-6 lg:mb-0">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-institutional-blue/10 to-institutional-accent/10 flex items-center justify-center mr-4">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-institutional-blue to-institutional-accent flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{totalSelected}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-institutional-slate/70">Active filters</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-institutional-blue to-institutional-accent bg-clip-text text-transparent">
                      {totalSelected} of {categories.length + statuses.length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={clearAll}
                  className="px-6 py-3.5 text-sm font-medium text-institutional-slate hover:text-institutional-blue hover:bg-white/80 bg-white/60 border border-white/50 rounded-xl transition-all duration-300 hover:border-institutional-slate-border/50 hover:shadow-md flex items-center justify-center group"
                  disabled={totalSelected === 0}
                >
                  <span>Clear All Filters</span>
                  {totalSelected > 0 && (
                    <span className="ml-2 h-5 w-5 rounded-full bg-gradient-to-r from-institutional-accent to-institutional-accent-hover text-white text-xs flex items-center justify-center group-hover:scale-110 transition-transform">
                      {totalSelected}
                    </span>
                  )}
                </button>
                
                <button
                  onClick={applyFilters}
                  className="px-8 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-institutional-accent to-institutional-accent-hover rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center group"
                >
                  <span>Apply Filters</span>
                  <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
            
            {totalSelected === 0 && (
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-institutional-blue/5 to-institutional-accent/5 border border-institutional-blue/10 text-center">
                <p className="text-sm text-institutional-slate/70">
                  <span className="font-medium text-institutional-blue">Tip:</span> Select at least one filter to refine your results
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const getStatusButtonClass = (status) => {
  switch (status.toLowerCase()) {
    case 'draft':
      return 'bg-gradient-to-r from-status-draft/10 to-status-draft/5 border border-status-draft/30';
    case 'submitted':
      return 'bg-gradient-to-r from-status-submitted/10 to-status-submitted/5 border border-status-submitted/30';
    case 'published':
      return 'bg-gradient-to-r from-status-published/10 to-status-published/5 border border-status-published/30';
    default:
      return 'bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200';
  }
};

const getStatusTextColor = (status) => {
  switch (status.toLowerCase()) {
    case 'draft':
      return 'text-status-draft';
    case 'submitted':
      return 'text-status-submitted';
    case 'published':
      return 'text-status-published';
    default:
      return 'text-gray-600';
  }
};

const getStatusDotColor = (status) => {
  switch (status.toLowerCase()) {
    case 'draft':
      return 'bg-status-draft';
    case 'submitted':
      return 'bg-status-submitted';
    case 'published':
      return 'bg-status-published';
    default:
      return 'bg-gray-400';
  }
};

const getStatusDescription = (status) => {
  switch (status.toLowerCase()) {
    case 'draft':
      return 'In progress';
    case 'submitted':
      return 'Under review';
    case 'published':
      return 'Live';
    default:
      return 'Unknown';
  }
};

export default FilterPanel;