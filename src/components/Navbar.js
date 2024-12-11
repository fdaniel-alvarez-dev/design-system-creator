import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white';
  };

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-white text-xl font-bold">Design System Creator</span>
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`rounded-md px-3 py-2 text-sm font-medium ${isActive('/')}`}
            >
              Design Systems
            </Link>
            <Link
              to="/components"
              className={`rounded-md px-3 py-2 text-sm font-medium ${isActive('/components')}`}
            >
              Components
            </Link>
            <Link
              to="/ai-config"
              className={`rounded-md px-3 py-2 text-sm font-medium ${isActive('/ai-config')}`}
            >
              AI Configuration
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}