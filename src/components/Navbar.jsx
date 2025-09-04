import { Bell, LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser, profilePicture, onMenuClick }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Parse user data to get the name
  const getUserName = () => {
    if (typeof user === 'string') {
      // Old format - just email
      return user.split('@')[0]; // Show part before @ as fallback
    } else if (user && typeof user === 'object') {
      // New format - user object with name
      return user.name || user.email?.split('@')[0] || 'User';
    }
    return 'User';
  };

  return (
    <header className="bg-gray-800 shadow-lg border-b border-gray-700 p-4 flex justify-between items-center">
      {/* Left section with hamburger menu */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Menu size={24} className="text-gray-300" />
        </button>
        
        {/* Search bar - responsive */}
        <input
          type="text"
          placeholder="Search..."
          className="w-32 sm:w-48 md:w-64 lg:w-80 p-2 rounded-full border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>
      
      {/* Right section */}
      <div className="flex items-center gap-2 sm:gap-4">
        <Bell className="cursor-pointer hover:text-blue-400 text-gray-300" size={20} />
        <div className="flex items-center gap-2">
          <span className="hidden sm:block text-sm text-gray-300">{getUserName()}</span>
          <img
            src={profilePicture || "https://i.pravatar.cc/40"}
            alt="User"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-600 object-cover cursor-pointer hover:border-blue-400 transition-colors"
            onClick={() => navigate('/profile')}
            title="Go to Profile"
          />
          <button
            onClick={handleLogout}
            className="p-1 sm:p-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
            title="Logout"
          >
            <LogOut size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
