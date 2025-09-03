import { Home, Search, MessageCircle, User, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-gray-800 p-5 shadow-lg border-r border-gray-700 flex flex-col">
      <h1 className="text-2xl font-bold mb-10 text-blue-400">ClyRo</h1>
      <nav className="flex flex-col gap-5 text-lg">
        <Link 
          to="/" 
          className={`flex items-center gap-3 transition-colors ${
            isActive('/') ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
          }`}
        >
          <Home /> Home
        </Link>
        <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors">
          <Search /> Explore
        </a>
        <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors">
          <MessageCircle /> Messages
        </a>
        <Link 
          to="/profile" 
          className={`flex items-center gap-3 transition-colors ${
            isActive('/profile') ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
          }`}
        >
          <User /> Profile
        </Link>
        <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors">
          <Settings /> Settings
        </a>
      </nav>
    </aside>
  );
}
