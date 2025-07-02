import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* Logo */}
            <div>

<Link to="/" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
  <span className="font-bold">MySite</span>
</Link>

            </div>
          </div>
          
          {/* Navigation Links */}
          
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="py-5 px-3 text-gray-700 hover:text-gray-900">Home</Link>

            <a href="#about" className="py-5 px-3 text-gray-700 hover:text-gray-900">About</a>
            <a href="#contact" className="py-5 px-3 text-gray-700 hover:text-gray-900">Contact</a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="mobile-menu-button">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`mobile-menu md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Home</a>
        <a href="#about" className="block py-2 px-4 text-sm hover:bg-gray-200">About</a>
        <a href="#contact" className="block py-2 px-4 text-sm hover:bg-gray-200">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;
