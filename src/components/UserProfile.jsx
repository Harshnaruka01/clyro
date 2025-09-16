import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Profile from './Profile';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        return storedUser;
      }
    }
    return null;
  });

  const [profilePicture, setProfilePicture] = useState('/src/assets/default_photo.jpg');

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
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
            {/* Back button */}
            <div className="sticky top-0 z-10 bg-gray-900 border-b border-gray-700 px-4 py-3">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back</span>
              </button>
            </div>
            
            <Profile 
              profilePicture={profilePicture} 
              setProfilePicture={setProfilePicture}
              backgroundPhoto={null}
              setBackgroundPhoto={() => {}}
              userId={userId}
              isOwnProfile={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
