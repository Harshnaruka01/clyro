import { Home, Search, MessageCircle, User, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white p-5 shadow-lg flex flex-col">
      <h1 className="text-2xl font-bold mb-10 text-blue-600">SocialApp</h1>
      <nav className="flex flex-col gap-5 text-lg">
        <a href="#" className="flex items-center gap-3 hover:text-blue-600">
          <Home /> Home
        </a>
        <a href="#" className="flex items-center gap-3 hover:text-blue-600">
          <Search /> Explore
        </a>
        <a href="#" className="flex items-center gap-3 hover:text-blue-600">
          <MessageCircle /> Messages
        </a>
        <a href="#" className="flex items-center gap-3 hover:text-blue-600">
          <User /> Profile
        </a>
        <a href="#" className="flex items-center gap-3 hover:text-blue-600">
          <Settings /> Settings
        </a>
      </nav>
    </aside>
  );
}
