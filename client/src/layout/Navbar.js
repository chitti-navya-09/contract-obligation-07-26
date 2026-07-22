import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Admin User');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error(e);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <nav className="h-16 bg-white shadow-sm flex justify-between items-center px-4 md:px-6 z-20 border-b border-gray-200 sticky top-0">
      <div className="flex items-center gap-4">
        {/* Hamburger Menu for Mobile */}
        <button 
          className="md:hidden text-gray-600 hover:text-[#1E3A8A] focus:outline-none"
          onClick={toggleSidebar}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Search Input */}
        <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-3 py-2 border border-gray-200 focus-within:border-[#1E3A8A] focus-within:ring-1 focus-within:ring-[#1E3A8A] transition-all">
          <i className="fa-solid fa-search text-gray-400 mr-2"></i>
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none text-sm w-48 lg:w-64 text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4 md:gap-6">
        {/* Notification Bell */}
        <div className="relative cursor-pointer text-gray-500 hover:text-[#1E3A8A] transition-colors" onClick={() => navigate('/notifications')}>
          <i className="fa-regular fa-bell text-xl"></i>
          <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full border border-white"></span>
        </div>
        
        <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="w-8 h-8 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white font-bold text-sm shadow-sm">
              {userName.substring(0, 2).toUpperCase()}
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-sm font-semibold text-gray-700 leading-none">{userName}</span>
            </div>
            <i className="fa-solid fa-chevron-down text-gray-400 text-xs hidden md:block"></i>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 z-50">
              <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100 mb-1">
                Signed in as <br /><strong className="text-gray-700">{userName}</strong>
              </div>
              <button 
                onClick={() => { setIsDropdownOpen(false); navigate('/settings'); }}
                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1E3A8A]"
              >
                <i className="fa-solid fa-gear mr-2 w-4 text-center"></i> Settings
              </button>
              <button 
                onClick={handleLogout}
                className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-50 hover:text-red-700"
              >
                <i className="fa-solid fa-arrow-right-from-bracket mr-2 w-4 text-center"></i> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
