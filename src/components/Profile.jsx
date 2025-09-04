import { useState, useEffect } from 'react';
import { Camera, Edit3, MapPin, Calendar, Mail, Phone, Globe, Users, Heart, MessageCircle } from 'lucide-react';

export default function Profile({ profilePicture, setProfilePicture, backgroundPhoto, setBackgroundPhoto }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    username: '',
    bio: 'Photographer & Digital Creator | Capturing moments that matter ✨',
    location: 'New York, USA',
    website: 'www.johndoe.com',
    email: '',
    phone: '+1 (555) 123-4567',
    joinDate: 'January 2023',
    followers: 1234,
    following: 567,
    posts: 89
  });

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setProfileData(prev => ({
          ...prev,
          name: userData.name || userData.email?.split('@')[0] || 'User',
          username: '@' + (userData.name?.toLowerCase().replace(/\s+/g, '') || userData.email?.split('@')[0] || 'user'),
          email: userData.email || '',
          phone: userData.contact || '+1 (555) 123-4567'
        }));
      } catch {
        // Handle old string format
        setProfileData(prev => ({
          ...prev,
          name: storedUser.split('@')[0] || 'User',
          username: '@' + storedUser.split('@')[0] || '@user',
          email: storedUser || ''
        }));
      }
    }
  }, []);

  const [tempData, setTempData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setTempData(profileData);
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePicture(imageUrl);
      localStorage.setItem('profilePicture', imageUrl);
    }
  };

  const handleBackgroundPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackgroundPhoto(imageUrl);
      localStorage.setItem('backgroundPhoto', imageUrl);
    }
  };

  // Sample user posts for the profile
  const userPosts = [
    { id: 1, image: "https://picsum.photos/300/300?random=1", likes: 42, comments: 8 },
    { id: 2, image: "https://picsum.photos/300/300?random=2", likes: 38, comments: 12 },
    { id: 3, image: "https://picsum.photos/300/300?random=3", likes: 56, comments: 15 },
    { id: 4, image: "https://picsum.photos/300/300?random=4", likes: 29, comments: 6 },
    { id: 5, image: "https://picsum.photos/300/300?random=5", likes: 73, comments: 21 },
    { id: 6, image: "https://picsum.photos/300/300?random=6", likes: 45, comments: 9 }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header Section - Mobile optimized */}
      <div className="relative">
        {/* Cover Photo */}
        <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-lg overflow-hidden">
          {backgroundPhoto && (
            <img
              src={backgroundPhoto}
              alt="Background"
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <label className="absolute top-2 sm:top-4 right-2 sm:right-4 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all cursor-pointer">
            <Camera size={16} className="sm:w-5 sm:h-5" />
            <input
              type="file"
              accept="image/*"
              onChange={handleBackgroundPhotoChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Profile Info - Mobile optimized */}
        <div className="relative px-3 sm:px-4 md:px-6 pb-4 sm:pb-6">
          {/* Profile Picture */}
          <div className="flex flex-col sm:flex-row sm:items-end -mt-12 sm:-mt-16 mb-4">
            <div className="relative mx-auto sm:mx-0">
              <img
                src={profilePicture}
                alt="Profile"
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-gray-800 bg-gray-800 object-cover"
              />
              <label className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 p-1.5 sm:p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors cursor-pointer">
                <Camera size={14} className="sm:w-4 sm:h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                />
              </label>
            </div>
            <div className="sm:ml-4 md:ml-6 flex-1 text-center sm:text-left mt-4 sm:mt-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="text-xl sm:text-2xl font-bold bg-gray-800 border border-gray-600 rounded px-3 py-1 mb-1 w-full sm:w-auto"
                    />
                  ) : (
                    <h1 className="text-xl sm:text-2xl font-bold">{profileData.name}</h1>
                  )}
                  <p className="text-gray-400 text-sm sm:text-base">{profileData.username}</p>
                </div>
                <div className="flex gap-2 justify-center sm:justify-start">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm sm:text-base"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-3 sm:px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors text-sm sm:text-base"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleEdit}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm sm:text-base"
                    >
                      <Edit3 size={14} className="sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Edit Profile</span>
                      <span className="sm:hidden">Edit</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bio and Info - Mobile optimized */}
          <div className="mb-4 sm:mb-6">
            {isEditing ? (
              <textarea
                value={tempData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 mb-4 resize-none text-sm sm:text-base"
                rows="3"
              />
            ) : (
              <p className="text-gray-300 mb-4 text-sm sm:text-base text-center sm:text-left">{profileData.bio}</p>
            )}
          </div>

          {/* Stats - Mobile optimized */}
          <div className="flex justify-center sm:justify-start gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold">{profileData.posts}</div>
              <div className="text-gray-400 text-xs sm:text-sm">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold">{profileData.followers.toLocaleString()}</div>
              <div className="text-gray-400 text-xs sm:text-sm">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold">{profileData.following}</div>
              <div className="text-gray-400 text-xs sm:text-sm">Following</div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid - Mobile optimized */}
      <div className="px-3 sm:px-4 md:px-6">
        <div className="border-t border-gray-700 pt-6 sm:pt-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 justify-center sm:justify-start">
            <Users size={18} className="sm:w-5 sm:h-5" />
            My Posts
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
            {userPosts.map(post => (
              <div key={post.id} className="relative group cursor-pointer">
                <img
                  src={post.image}
                  alt={`Post ${post.id}`}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex items-center gap-2 sm:gap-4 text-white">
                    <div className="flex items-center gap-1">
                      <Heart size={16} className="sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={16} className="sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm">{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
