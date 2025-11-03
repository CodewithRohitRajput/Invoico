'use client';

import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Invoico
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition duration-200">
              Home
            </a>
            <a href="/invoices" className="text-gray-700 hover:text-blue-600 font-medium transition duration-200">
              Invoices
            </a>
            <a href="/clients" className="text-gray-700 hover:text-blue-600 font-medium transition duration-200">
              Clients
            </a>
            <a href="/pricing" className="text-gray-700 hover:text-blue-600 font-medium transition duration-200">
              Pricing
            </a>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/login" className="text-gray-700 hover:text-blue-600 font-medium transition duration-200">
              Sign In
            </a>
            <a 
              href="/signup" 
              className="bg-gradient-to-br from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition duration-200 shadow-md hover:shadow-lg"
            >
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 p-2 rounded-lg transition duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition duration-200">
                Home
              </a>
              <a href="/invoices" className="text-gray-700 hover:text-blue-600 font-medium transition duration-200">
                Invoices
              </a>
              <a href="/clients" className="text-gray-700 hover:text-blue-600 font-medium transition duration-200">
                Clients
              </a>
              <a href="/pricing" className="text-gray-700 hover:text-blue-600 font-medium transition duration-200">
                Pricing
              </a>
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <a href="/login" className="block text-gray-700 hover:text-blue-600 font-medium transition duration-200">
                  Sign In
                </a>
                <a 
                  href="/signup" 
                  className="block bg-gradient-to-br from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-medium text-center hover:from-blue-700 hover:to-purple-700 transition duration-200"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}