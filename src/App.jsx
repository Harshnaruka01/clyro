import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import PostDetail from "./components/PostDetail";
import Profile from "./components/Profile";
import UserProfile from "./components/UserProfile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { PostsProvider } from "./context/PostsContext";

export default function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        return storedUser; // fallback for old string format
      }
    }
    return null;
  });

  const [profilePicture, setProfilePicture] = useState(() => {
    // Clear any existing custom profile pictures and use default
    localStorage.removeItem('profilePicture');
    return '/src/assets/default_photo.jpg';
  });

  const [backgroundPhoto, setBackgroundPhoto] = useState(() => {
    return localStorage.getItem('backgroundPhoto') || null;
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If user is not logged in, show auth pages
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // If user is logged in, show main app
  return (
    <PostsProvider>
      <div className="min-h-screen bg-gray-900">
        <Routes>
          <Route path="/" element={
            <div className="flex h-screen">
              <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
              <div className="flex flex-col flex-1 md:ml-0">
                <Navbar 
                  user={user} 
                  setUser={setUser} 
                  profilePicture={profilePicture} 
                  onMenuClick={() => setSidebarOpen(true)}
                />
                <Feed />
              </div>
            </div>
          } />
          <Route path="/profile" element={
            <div className="flex h-screen">
              <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
              <div className="flex flex-col flex-1 md:ml-0">
                <Navbar 
                  user={user} 
                  setUser={setUser} 
                  profilePicture={profilePicture} 
                  onMenuClick={() => setSidebarOpen(true)}
                />
                <div className="flex-1 overflow-y-auto">
                  <Profile 
                    profilePicture={profilePicture} 
                    setProfilePicture={setProfilePicture}
                    backgroundPhoto={backgroundPhoto}
                    setBackgroundPhoto={setBackgroundPhoto}
                    isOwnProfile={true}
                  />
                </div>
              </div>
            </div>
          } />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </PostsProvider>
  );
}
