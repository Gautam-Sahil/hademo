// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BuildingLibraryIcon, BellIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${
        isScrolled ? 'pt-4' : 'pt-0'
      }`}
    >
      <div
        className={`relative overflow-hidden flex items-center justify-between transition-all duration-500 ${
          isScrolled
            ? 'rounded-full shadow-lg w-[95%] max-w-2xl mt-2 px-6 py-3'
            : 'bg-transparent w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4'
        }`}
      >
        {/* Gradient Background */}
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage:
              "url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gradientBackground.png')",
          }}
        />

        {/* Glass blur */}
        <div
          className={`absolute inset-0 backdrop-blur-xl transition-opacity duration-500 ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-between w-full">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur opacity-0 group-hover:opacity-40 transition duration-500" />
              <BuildingLibraryIcon className="h-9 w-9 text-blue-600 transition-transform group-hover:scale-105" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-blue-600 font-display tracking-tight">
                Hedamo
              </h1>
              <p className="text-xs text-gray-600">Product Disclosure Platform</p>
            </div>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Help Button */}
            <button className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <span>Help</span>
            </button>

            {/* Notifications */}
            <button className="relative p-1.5 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* Profile */}
            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-gray-300">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                G
              </div>
              <div className="text-sm">
                <p className="font-medium text-blue-600">Gautam</p>
                <p className="text-xs text-gray-600">Regulatory Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
