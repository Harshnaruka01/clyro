import { Bell, LogOut } from "lucide-react";

export default function Navbar({ user, setUser }) {
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <input
        type="text"
        placeholder="Search..."
        className="w-1/2 p-2 rounded-full border border-gray-300"
      />
      <div className="flex items-center gap-4">
        <Bell className="cursor-pointer hover:text-blue-600" />
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">{user}</span>
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <button
            onClick={handleLogout}
            className="p-2 text-gray-500 hover:text-red-600 transition-colors duration-200"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
