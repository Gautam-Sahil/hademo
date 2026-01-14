// src/components/ProductDetailView.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  DocumentCheckIcon,
  ClockIcon,
  UserIcon,
  ExclamationTriangleIcon,
  BuildingOfficeIcon,
  TagIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ArrowDownTrayIcon,
  FlagIcon,
  ShareIcon,
  PrinterIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';

const ProductDetailView = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-institutional-slate">Product not found</h3>
          <p className="text-institutional-slate mt-2">The requested product could not be located in the registry.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 px-4 py-2 text-sm font-medium text-institutional-accent hover:text-institutional-accent-hover"
          >
            Return to product list
          </button>
        </div>
      </div>
    );
  }

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'published':
        return <CheckCircleIcon className="h-5 w-5 text-status-published " />;
      case 'submitted':
        return <DocumentCheckIcon className="h-5 w-5 text-status-submitted" />;
      case 'draft':
        return <DocumentTextIcon className="h-5 w-5 text-status-draft" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status, light = false) => {
    const base = light ? '' : 'border ';
    switch (status.toLowerCase()) {
      case 'draft':
        return `${base}bg-status-draft/10 text-status-draft border-status-draft/20`;
      case 'submitted':
        return `${base}bg-status-submitted/10 text-status-submitted border-status-submitted/20`;
      case 'published':
        return `${base}bg-status-published/10 text-status-published border-status-published/20 `;
      default:
        return `${base}bg-gray-100 text-gray-600 border-gray-200`;
    }
  };

  const getVersionStatusColor = (status) => {
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

  return (
    <div className="max-w-6xl mx-auto ">
      {/* Back Navigation */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center space-x-2 text-institutional-slate hover:text-institutional-blue mb-8 group transition-all duration-200"
      >
        <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
        <span className="font-medium">Back to Registry</span>
      </button>

      {/* Main Content */}
      <div className="bg-gradient-to-b px-3 sm:px-10 from-[#F5F7FF] via-[#fffbee] to-[#E6EFFF] pt-6 h-full rounded-xl shadow-sm border border-institutional-slate-border overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-institutional-slate-border">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${getStatusClass(product.status)}`}>
                  {getStatusIcon(product.status)}
                  <span className="ml-2 font-medium">{product.status}</span>
                </span>
                <span className="text-sm text-institutional-slate font-mono bg-institutional-slate-light px-2 py-1 rounded">
                  ID: {product.id}
                </span>
              </div>
              <h1 className="text-2xl font-semibold text-institutional-blue font-display">
                {product.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <span className="flex items-center text-institutional-slate text-sm">
                  <TagIcon className="h-4 w-4 mr-1.5 text-institutional-slate" />
                  <span className="font-medium">{product.category}</span>
                </span>
                <span className="flex items-center text-institutional-slate text-sm">
                  <BuildingOfficeIcon className="h-4 w-4 mr-1.5 text-institutional-slate" />
                  {product.producer}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="bg-amber-100/50 border-b border-teal-500 px-8 py-4">
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-800">
                Institutional Notice
              </p>
              <p className="text-sm text-amber-700 mt-0.5">
                This page presents producer-declared information; it is not certification or verification. All data is submitted by the producer and has not been independently verified by RegistryPro.
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Disclosure Summary & Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Disclosure Summary */}
              <section>
                <h2 className="text-lg font-semibold text-institutional-blue mb-4 flex items-center">
                  <DocumentCheckIcon className="h-5 w-5 mr-2 text-institutional-slate" />
                  Disclosure Summary
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-institutional-slate-light rounded-lg p-5 hover:bg-institutional-slate-light/80 transition-all duration-200">
                    <p className="text-sm text-institutional-slate mb-2">Declared By</p>
                    <p className="font-medium text-institutional-blue flex items-center">
                      <UserIcon className="h-4 w-4 mr-2 text-institutional-slate" />
                      {product.declaredBy}
                    </p>
                  </div>
                  <div className="bg-institutional-slate-light rounded-lg p-5 hover:bg-institutional-slate-light/80 transition-all duration-200">
                    <p className="text-sm text-institutional-slate mb-2">Declaration Date</p>
                    <p className="font-medium text-institutional-blue flex items-center">
                      <ClockIcon className="h-4 w-4 mr-2 text-institutional-slate" />
                      {formatDateTime(product.declaredDate)}
                    </p>
                  </div>
                  <div className="bg-institutional-slate-light rounded-lg p-5 hover:bg-institutional-slate-light/80 transition-all duration-200">
                    <p className="text-sm text-institutional-slate mb-2">Evidence Documents</p>
                    <p className="font-medium text-institutional-blue">
                      {product.evidenceCount > 0 ? (
                        <>
                          <span className="text-xl">{product.evidenceCount}</span>
                          <span className="text-sm ml-2">attached document{product.evidenceCount !== 1 ? 's' : ''}</span>
                        </>
                      ) : (
                        'No documents attached'
                      )}
                    </p>
                  </div>
                  <div className="bg-institutional-slate-light rounded-lg p-5 hover:bg-institutional-slate-light/80 transition-all duration-200">
                    <p className="text-sm text-institutional-slate mb-2">Last Updated</p>
                    <p className="font-medium text-institutional-blue">
                      {formatDateTime(product.lastUpdated)}
                    </p>
                  </div>
                </div>
              </section>

              {/* Product Description */}
              {product.description && (
                <section>
                  <h2 className="text-lg font-semibold text-institutional-blue mb-4">
                    Product Description
                  </h2>
                  <div className="bg-institutional-slate-light rounded-lg p-5">
                    <p className="text-institutional-slate leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </section>
              )}

              {/* Certifications */}
              {product.certifications && product.certifications.length > 0 && (
                <section>
                  <h2 className="text-lg font-semibold text-institutional-blue mb-4">
                    Declared Certifications
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {product.certifications.map((cert, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded-lg border border-green-100 hover:bg-green-100 transition-all duration-200"
                      >
                        <CheckCircleIcon className="h-4 w-4 mr-1.5 text-green-600" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column - Version History & Actions */}
            <div className="space-y-8">
              {/* Version History */}
              <section>
                <h2 className="text-lg font-semibold text-institutional-blue mb-4">
                  Version History
                </h2>
                <div className="space-y-4">
                  {product.versions.map((version, index) => (
                    <div 
                      key={index} 
                      className={`relative pl-5 pb-4 ${index < product.versions.length - 1 ? 'border-l border-institutional-slate-border' : ''}`}
                    >
                      {/* Timeline dot */}
                      <div 
                        className={`absolute left-0 top-0 w-3 h-3 rounded-full border-2 border-white -translate-x-1/5 ${getVersionStatusColor(version.status)}`}
                      ></div>
                      
                      <div className="ml-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="font-medium text-institutional-blue">
                              Version {version.version}
                            </span>
                            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getStatusClass(version.status, true)}`}>
                              {version.status}
                            </span>
                          </div>
                          <span className="text-sm text-institutional-slate whitespace-nowrap">
                            {version.date}
                          </span>
                        </div>
                        {version.notes && (
                          <p className="text-sm text-institutional-slate mt-2">
                            {version.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Actions Panel */}
              <section className="bg-institutional-slate-light rounded-xl p-5">
                <h3 className="font-medium text-institutional-blue mb-4">
                  Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2.5 text-sm font-medium text-white bg-institutional-accent hover:bg-institutional-accent-hover rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                    <DocumentArrowDownIcon className="h-4 w-4" />
                    Download Full Disclosure
                  </button>
                  <button className="w-full px-4 py-2.5 text-sm font-medium text-institutional-blue hover:bg-white border border-institutional-slate-border rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                    <DocumentTextIcon className="h-4 w-4" />
                    Request Clarification
                  </button>
                  <button className="w-full px-4 py-2.5 text-sm font-medium text-institutional-slate hover:bg-white border border-institutional-slate-border rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                    <FlagIcon className="h-4 w-4" />
                    Flag for Review
                  </button>
                </div>
              </section>

              {/* Record Information */}
              <section className="bg-institutional-slate-light rounded-xl p-5">
                <h3 className="font-medium text-institutional-blue mb-4">
                  Record Information
                </h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-institutional-slate-border/50">
                    <dt className="text-institutional-slate">Record ID</dt>
                    <dd className="font-medium font-mono">{product.id}</dd>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-institutional-slate-border/50">
                    <dt className="text-institutional-slate">Created</dt>
                    <dd className="font-medium">
                      {product.versions.length > 0 ? formatDateTime(product.versions[product.versions.length - 1].date) : 'N/A'}
                    </dd>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-institutional-slate-border/50">
                    <dt className="text-institutional-slate">Total Updates</dt>
                    <dd className="font-medium">{product.versions.length - 1}</dd>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <dt className="text-institutional-slate">Audit Trail</dt>
                    <dd className="font-medium text-institutional-accent hover:underline cursor-pointer">
                      View log
                    </dd>
                  </div>
                </dl>
              </section>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-institutional-slate-border bg-institutional-slate-light/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-sm text-institutional-slate">
              Last accessed: {new Date().toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center text-sm text-institutional-slate hover:text-institutional-blue transition-colors duration-200 gap-1">
                <PrinterIcon className="h-4 w-4" />
                Print Summary
              </button>
              <button className="flex items-center text-sm text-institutional-slate hover:text-institutional-blue transition-colors duration-200 gap-1">
                <ArrowDownTrayIcon className="h-4 w-4" />
                Export as PDF
              </button>
              <button className="flex items-center text-sm text-institutional-slate hover:text-institutional-blue transition-colors duration-200 gap-1">
                <ShareIcon className="h-4 w-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;