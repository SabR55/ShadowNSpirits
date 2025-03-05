import React, { useState } from 'react';
import { Instagram, Facebook, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

function Navbar(){
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav id="navbar">
      <div id="navbarExpand" className="max-w-6xl mx-auto">
        <div 
          className="flex justify-between items-center py-4"
        >
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-white">
              Shadow & Spirits
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/page1" className="text-white hover:text-gray-300 transition duration-300">
              Our Drinks
            </a>
            <a href="/services" className="text-white hover:text-gray-300 transition duration-300">
              Find Us
            </a>
            <a href="/contact" className="text-white hover:text-gray-300 transition duration-300">
              About
            </a>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <Instagram size={24} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <Facebook size={24} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-[15%] pt-2 pb-3 space-y-1 text-center">
              <a 
                href="/about" 
                className="text-white block px-3 py-2 text-center"
              >
                About
              </a>
              <a 
                href="/services" 
                className="text-white block px-3 py-2 text-center"
              >
                Services
              </a>
              <a 
                href="/contact" 
                className="text-white block px-3 py-2 text-center"
              >
                Contact
              </a>
              
              {/* Mobile Social Media Icons */}
              <div className="flex justify-center space-x-6 pt-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
                  <Instagram size={24} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
                  <Facebook size={24} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;