import { Home, Search, MessageCircle, User, Settings, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-gray-800 p-5 shadow-lg border-r border-gray-700 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Close button for mobile */}
        <div className="flex items-center justify-between mb-10 md:justify-start">
          <h1 className="text-2xl font-bold text-blue-400">ClyRo</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <X size={24} className="text-gray-300" />
          </button>
        </div>
        
        <nav className="flex flex-col gap-5 text-lg">
          <Link 
            to="/" 
            onClick={handleLinkClick}
            className={`flex items-center gap-3 transition-colors p-2 rounded-lg ${
              isActive('/') ? 'text-blue-400 bg-blue-900/20' : 'text-gray-300 hover:text-blue-400 hover:bg-gray-700'
            }`}
          >
            <Home size={20} /> Home
          </Link>
          <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-blue-400 hover:bg-gray-700 transition-colors p-2 rounded-lg">
            <Search size={20} /> Explore
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-blue-400 hover:bg-gray-700 transition-colors p-2 rounded-lg">
            <MessageCircle size={20} /> Messages
          </a>
          <Link 
            to="/profile" 
            onClick={handleLinkClick}
            className={`flex items-center gap-3 transition-colors p-2 rounded-lg ${
              isActive('/profile') ? 'text-blue-400 bg-blue-900/20' : 'text-gray-300 hover:text-blue-400 hover:bg-gray-700'
            }`}
          >
            <User size={20} /> Profile
          </Link>
          <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-blue-400 hover:bg-gray-700 transition-colors p-2 rounded-lg">
            <Settings size={20} /> Settings
          </a>
        </nav>
      </aside>
    </>
  );
}
