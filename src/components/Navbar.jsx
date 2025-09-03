import { Bell, LogOut } from "lucide-react";

export default function Navbar({ user, setUser, profilePicture }) {
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
      <input
        type="text"
        placeholder="Search..."
        className="w-1/2 p-2 rounded-full border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
      />
      <div className="flex items-center gap-4">
        <Bell className="cursor-pointer hover:text-blue-400 text-gray-300" />
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">{getUserName()}</span>
          <img
            src={profilePicture || "https://i.pravatar.cc/40"}
            alt="User"
            className="w-10 h-10 rounded-full border-2 border-gray-600 object-cover"
          />
          <button
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
