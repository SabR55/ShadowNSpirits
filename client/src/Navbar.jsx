import React, { useState } from 'react';
import { Instagram, Facebook, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { use } from 'react';

function Navbar(){
  const [isOpen, setIsOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [errorMsgVisible, setErrorMsgVisible] = useState(false);

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
          <div id="navbarLogo" className="flex items-center">
            <Link to={"/"}  className="text-2xl font-bold text-white">
              Shadow & Spirits
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to={"/ourDrinks"} className="text-white hover:text-gray-300 transition duration-300">
              Our Drinks
            </Link>
            <Link to={"/findUs"}  className="text-white hover:text-gray-300 transition duration-300">
              Find Us
            </Link>
            <Link to={"/about"}  className="text-white hover:text-gray-300 transition duration-300">
              About
            </Link>
            <Link 
              to={"/checkReservation"} 
              className="text-white hover:text-gray-300 transition duration-300">
              Check Reservation
            </Link>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <Instagram size={22} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <Facebook size={23} />
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
          <div className="md:hidden z-10">
            <div className="px-[15%] pt-2 pb-3 space-y-1 text-center">
            <Link 
                to={"/ourDrinks"}
                className="text-white block px-3 py-2 text-center"
              >
                Our Drinks
              </Link>
              <Link 
                to={"/findUs"}
                className="text-white block px-3 py-2 text-center"
              >
                Find Us
              </Link>
              <Link 
                to={"/about"}
                className="text-white block px-3 py-2 text-center"
              >
                About
              </Link>
              <Link 
                to={"/checkReservation"}
                className="text-white block px-3 py-2 text-center"
              >
                Check Reservation
              </Link>
              
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