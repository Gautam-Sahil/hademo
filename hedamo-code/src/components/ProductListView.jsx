// src/components/ProductListView.js
import React, { useState, useMemo } from 'react';

import { useNavigate } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  ChevronUpDownIcon,
  ClockIcon,
  DocumentTextIcon,
  AdjustmentsHorizontalIcon,
  PlusCircleIcon,
  ChartBarIcon,
  TableCellsIcon,
  ViewColumnsIcon,
  ArrowPathIcon,
  BellIcon,
  UserCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { 
  FireIcon,
  RocketLaunchIcon,
  StarIcon 
} from '@heroicons/react/24/solid';
import ProductCard from './ProductCard';
import FilterPanel from './FilterPanel';
import SkeletonLoader from './SkeletonLoader';
import EmptyState from './EmptyState';

const ProductListView = ({ products, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid, list, compact

  const navigate = useNavigate();

  // Extract unique categories and statuses
  const categories = [...new Set(products.map(p => p.category))];
  const statuses = ['Draft', 'Submitted', 'Published'];

  // Calculate stats
// Calculate stats (derived from products)
const stats = useMemo(() => {
  const published = products.filter(p => p.status === 'Published').length;
  const draft = products.filter(p => p.status === 'Draft').length;
  const submitted = products.filter(p => p.status === 'Submitted').length;

  return {
    total: products.length,
    published,
    draft,
    submitted
  };
}, [products]);


  // Filter and sort logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.producer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(product.category);
      
      const matchesStatus = selectedStatuses.length === 0 || 
        selectedStatuses.includes(product.status);

      return matchesSearch && matchesCategory && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === 'priority') {
        return sortOrder === 'asc'
          ? (a.priority || 0) - (b.priority || 0)
          : (b.priority || 0) - (a.priority || 0);
      } else {
        return sortOrder === 'asc'
          ? new Date(a.lastUpdated) - new Date(b.lastUpdated)
          : new Date(b.lastUpdated) - new Date(a.lastUpdated);
      }
    });
  }, [products, searchTerm, selectedCategories, selectedStatuses, sortBy, sortOrder]);

  const handleSortToggle = (type) => {
    if (sortBy === type) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(type);
      setSortOrder('desc');
    }
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedStatuses([]);
    // Add animation feedback
    const container = document.querySelector('.product-list-container');
    container.style.transform = 'scale(0.99)';
    setTimeout(() => {
      container.style.transform = '';
    }, 200);
  };

  const totalFilters = selectedCategories.length + selectedStatuses.length + (searchTerm ? 1 : 0);

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="product-list-container min-h-screen  p-4 md:p-6 transition-all duration-300">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-institutional-accent/5 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-institutional-blue/5 to-transparent rounded-full translate-x-1/3 translate-y-1/3"></div>
      </div>

      {/* Main Content */}
      <div className="relative space-y-6 max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <div className="flex items-center mb-2">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-institutional-blue to-institutional-accent shadow-lg mr-4">
                    <RocketLaunchIcon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-institutional-blue via-institutional-blue to-institutional-accent bg-clip-text text-transparent">
                      Product Registry
                    </h1>
                    <p className="text-institutional-slate/80 mt-2 text-lg">
                      Advanced management for producer-declared products
                      <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-institutional-accent/10 to-institutional-blue/10 text-institutional-accent border border-institutional-accent/20">
                        <SparklesIcon className="h-3 w-3 mr-1" />
                        Premium
                      </span>
                    </p>
                  </div>
                </div>
                
                {/* Stats Cards */}
                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-white to-white/80 border border-white/50 backdrop-blur-sm shadow-sm">
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg bg-blue-50 mr-3">
                        <DocumentTextIcon className="h-5 w-5 text-institutional-blue" />
                      </div>
                      <div>
                        <p className="text-sm text-institutional-slate/70">Total Products</p>
                        <p className="text-2xl font-bold text-institutional-blue">{stats.total}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-white to-white/80 border border-white/50 backdrop-blur-sm shadow-sm">
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg bg-green-50 mr-3">
                        <FireIcon className="h-5 w-5 text-status-published" />
                      </div>
                      <div>
                        <p className="text-sm text-institutional-slate/70">Published</p>
                        <p className="text-2xl font-bold text-status-published">{stats.published}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-white to-white/80 border border-white/50 backdrop-blur-sm shadow-sm">
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg bg-amber-50 mr-3">
                        <ClockIcon className="h-5 w-5 text-status-draft" />
                      </div>
                      <div>
                        <p className="text-sm text-institutional-slate/70">In Draft</p>
                        <p className="text-2xl font-bold text-status-draft">{stats.draft}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-4">
                <button 
                  onClick={() => navigate('/product/new')}
                  className="group relative px-6 py-3.5 text-white bg-gradient-to-r from-institutional-accent to-institutional-accent-hover rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center font-semibold overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                  <PlusCircleIcon className="h-5 w-5 mr-2" />
                  New Product Entry
                </button>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-institutional-slate">Last updated</p>
                    <p className="text-sm text-institutional-slate/70">Just now</p>
                  </div>
                  <button className="p-2.5 rounded-xl bg-white/80 border border-white/50 hover:bg-white hover:border-institutional-accent/30 transition-all duration-200">
                    <ArrowPathIcon className="h-5 w-5 text-institutional-slate" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Search Bar */}
              <div className="flex-1 max-w-2xl">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-institutional-accent/20 to-institutional-blue/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-institutional-slate/70" />
                    <input
                      type="text"
                      placeholder="Search products, producers, categories, or keywords..."
                      className="w-full pl-12 pr-4 py-3.5 bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl focus:border-institutional-accent/50 focus:ring-2 focus:ring-institutional-accent/20 transition-all duration-300 shadow-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      aria-label="Search products"
                    />
                    {searchTerm && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-institutional-accent to-institutional-accent-hover flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{filteredProducts.length}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Control Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                {/* View Mode Toggle */}
                <div className="flex items-center bg-white/90 border border-white/50 rounded-xl p-1.5">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'grid' ? 'bg-gradient-to-r from-institutional-accent/10 to-institutional-blue/10 text-institutional-accent' : 'text-institutional-slate hover:text-institutional-blue'}`}
                    title="Grid View"
                  >
                    <ViewColumnsIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'list' ? 'bg-gradient-to-r from-institutional-accent/10 to-institutional-blue/10 text-institutional-accent' : 'text-institutional-slate hover:text-institutional-blue'}`}
                    title="List View"
                  >
                    <TableCellsIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('compact')}
                    className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'compact' ? 'bg-gradient-to-r from-institutional-accent/10 to-institutional-blue/10 text-institutional-accent' : 'text-institutional-slate hover:text-institutional-blue'}`}
                    title="Compact View"
                  >
                    <ChartBarIcon className="h-5 w-5" />
                  </button>
                </div>
                
                {/* Sort Controls */}
                <div className="hidden md:flex items-center space-x-2">
                  <span className="text-sm font-medium text-institutional-slate/80">Sort by:</span>
                  <div className="flex bg-white/90 border border-white/50 rounded-xl p-1.5">
                    <button
                      onClick={() => handleSortToggle('name')}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${sortBy === 'name' ? 'bg-gradient-to-r from-institutional-accent/10 to-institutional-blue/10 text-institutional-accent shadow-sm' : 'text-institutional-slate hover:text-institutional-blue hover:bg-white/50'}`}
                    >
                      <DocumentTextIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">Name</span>
                      {sortBy === 'name' && (
                        <ChevronUpDownIcon className={`h-3 w-3 transition-transform duration-300 ${sortOrder === 'asc' ? '' : 'rotate-180'}`} />
                      )}
                    </button>
                    <button
                      onClick={() => handleSortToggle('date')}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${sortBy === 'date' ? 'bg-gradient-to-r from-institutional-accent/10 to-institutional-blue/10 text-institutional-accent shadow-sm' : 'text-institutional-slate hover:text-institutional-blue hover:bg-white/50'}`}
                    >
                      <ClockIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">Date</span>
                      {sortBy === 'date' && (
                        <ChevronUpDownIcon className={`h-3 w-3 transition-transform duration-300 ${sortOrder === 'asc' ? '' : 'rotate-180'}`} />
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Filter Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`group flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all duration-300 relative overflow-hidden ${totalFilters > 0 
                    ? 'bg-gradient-to-r from-institutional-accent/10 to-institutional-blue/10 border-institutional-accent/30 text-institutional-accent shadow-sm' 
                    : 'bg-white/90 border-white/50 text-institutional-slate hover:text-institutional-blue hover:border-institutional-accent/30'
                  }`}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-institutional-accent/0 via-institutional-accent/5 to-institutional-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                  <AdjustmentsHorizontalIcon className="h-5 w-5 relative z-10" />
                  <span className="text-sm font-medium relative z-10">Filters</span>
                  {totalFilters > 0 && (
                    <span className="relative z-10 h-6 w-6 rounded-full bg-gradient-to-r from-institutional-accent to-institutional-accent-hover text-white text-xs flex items-center justify-center font-bold animate-pulse-subtle">
                      {totalFilters}
                    </span>
                  )}
                </button>
              </div>
            </div>
            
            {/* Active Filters Display */}
            {totalFilters > 0 && (
              <div className="mt-6 pt-5 border-t border-white/50">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-medium text-institutional-slate/80 flex items-center">
                    <FunnelIcon className="h-4 w-4 mr-2" />
                    Active filters:
                  </span>
                  
                  {searchTerm && (
                    <div className="group relative">
                      <div className="px-3 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 text-institutional-blue text-sm font-medium flex items-center">
                        <MagnifyingGlassIcon className="h-3.5 w-3.5 mr-2" />
                        "{searchTerm}"
                        <button 
                          onClick={() => setSearchTerm('')}
                          className="ml-2 h-5 w-5 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors duration-200"
                        >
                          ×
                        </button>
                      </div>
                      <div className="absolute bottom-full left-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        Click to remove
                      </div>
                    </div>
                  )}
                  
                  {selectedCategories.map(category => (
                    <div key={category} className="group relative">
                      <div className="px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-50 to-indigo-100/50 border border-indigo-200 text-institutional-blue text-sm font-medium flex items-center">
                        <div className="h-2 w-2 rounded-full bg-indigo-500 mr-2"></div>
                        {category}
                        <button 
                          onClick={() => setSelectedCategories(prev => prev.filter(c => c !== category))}
                          className="ml-2 h-5 w-5 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors duration-200"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {selectedStatuses.map(status => (
                    <div key={status} className="group relative">
                      <div className={`px-3 py-2 rounded-lg border text-sm font-medium flex items-center ${getStatusBadgeClass(status)}`}>
                        <div className={`h-2 w-2 rounded-full mr-2 ${getStatusDotColor(status)}`}></div>
                        {status}
                        <button 
                          onClick={() => setSelectedStatuses(prev => prev.filter(s => s !== status))}
                          className="ml-2 h-5 w-5 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors duration-200"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    onClick={clearAllFilters}
                    className="ml-2 px-3 py-2 text-sm font-medium text-institutional-slate hover:text-institutional-blue hover:bg-white/50 rounded-lg transition-all duration-200 flex items-center"
                  >
                    <span>Clear all</span>
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center">
            <h3 className="text-xl font-bold text-institutional-blue">
              Products
              <span className="ml-2 px-2.5 py-0.5 text-sm font-medium bg-gradient-to-r from-institutional-accent/10 to-institutional-blue/10 text-institutional-accent rounded-full">
                {filteredProducts.length} results
              </span>
            </h3>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-institutional-slate/80">
              Showing <span className="font-bold text-institutional-blue">{filteredProducts.length}</span> of{' '}
              <span className="font-bold text-institutional-blue">{products.length}</span> total products
            </div>
            
            {filteredProducts.length > 0 && (
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-status-published animate-pulse"></div>
                <span className="text-xs text-institutional-slate/70">
                  {filteredProducts.filter(p => p.status === 'Published').length} published
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length > 0 ? (
          <div className={`transition-all duration-500 ${viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : viewMode === 'list' 
            ? 'space-y-4'
            : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'
          }`}>
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="transform transition-all duration-500 hover:scale-[1.02]"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard
                  product={product}
                  viewMode={viewMode}
                  onClick={() => navigate(`/product/${product.id}`)}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            searchTerm={searchTerm}
            selectedCategories={selectedCategories}
            selectedStatuses={selectedStatuses}
            onClearFilters={clearAllFilters}
          />
        )}

        {/* Floating Action Button for Mobile */}
        <div className="fixed bottom-6 right-6 md:hidden">
          <button
            onClick={() => setShowFilters(true)}
            className="h-14 w-14 rounded-full bg-gradient-to-r from-institutional-accent to-institutional-accent-hover text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform duration-300"
          >
            <AdjustmentsHorizontalIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Filter Panel Overlay */}
      {showFilters && (
        <FilterPanel
          categories={categories}
          statuses={statuses}
          selectedCategories={selectedCategories}
          selectedStatuses={selectedStatuses}
          onCategoryChange={setSelectedCategories}
          onStatusChange={setSelectedStatuses}
          onClose={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};

const getStatusBadgeClass = (status) => {
  switch (status.toLowerCase()) {
    case 'draft':
      return 'bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200 text-status-draft';
    case 'submitted':
      return 'bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 text-status-submitted';
    case 'published':
      return 'bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200 text-status-published';
    default:
      return 'bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200 text-gray-600';
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

export default ProductListView;