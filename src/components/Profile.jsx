import { useState } from 'react';
import { Camera, Edit3, MapPin, Calendar, Mail, Phone, Globe, Users, Heart, MessageCircle } from 'lucide-react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    username: '@johndoe',
    bio: 'Photographer & Digital Creator | Capturing moments that matter ✨',
    location: 'New York, USA',
    website: 'www.johndoe.com',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    joinDate: 'January 2023',
    followers: 1234,
    following: 567,
    posts: 89
  });

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
      {/* Header Section */}
      <div className="relative">
        {/* Cover Photo */}
        <div className="h-64 bg-gradient-to-r from-blue-600 to-purple-600 relative">
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <button className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all">
            <Camera size={20} />
          </button>
        </div>

        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          {/* Profile Picture */}
          <div className="flex items-end -mt-16 mb-4">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/120"
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-gray-800 bg-gray-800"
              />
              <button className="absolute bottom-2 right-2 p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                <Camera size={16} />
              </button>
            </div>
            <div className="ml-6 flex-1">
              <div className="flex items-center justify-between">
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="text-2xl font-bold bg-gray-800 border border-gray-600 rounded px-3 py-1 mb-1"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold">{profileData.name}</h1>
                  )}
                  <p className="text-gray-400">{profileData.username}</p>
                </div>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleEdit}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <Edit3 size={16} />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bio and Info */}
          <div className="mb-6">
            {isEditing ? (
              <textarea
                value={tempData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 mb-4 resize-none"
                rows="3"
              />
            ) : (
              <p className="text-gray-300 mb-4">{profileData.bio}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                {isEditing ? (
                  <input
                    type="text"
                    value={tempData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="bg-gray-800 border border-gray-600 rounded px-2 py-1 flex-1"
                  />
                ) : (
                  <span>{profileData.location}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Globe size={16} />
                {isEditing ? (
                  <input
                    type="text"
                    value={tempData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="bg-gray-800 border border-gray-600 rounded px-2 py-1 flex-1"
                  />
                ) : (
                  <a href={`https://${profileData.website}`} className="text-blue-400 hover:underline">
                    {profileData.website}
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                {isEditing ? (
                  <input
                    type="email"
                    value={tempData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-gray-800 border border-gray-600 rounded px-2 py-1 flex-1"
                  />
                ) : (
                  <span>{profileData.email}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Joined {profileData.joinDate}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold">{profileData.posts}</div>
              <div className="text-gray-400 text-sm">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{profileData.followers.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{profileData.following}</div>
              <div className="text-gray-400 text-sm">Following</div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="px-6">
        <div className="border-t border-gray-700 pt-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Users size={20} />
            My Posts
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {userPosts.map(post => (
              <div key={post.id} className="relative group cursor-pointer">
                <img
                  src={post.image}
                  alt={`Post ${post.id}`}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex items-center gap-4 text-white">
                    <div className="flex items-center gap-1">
                      <Heart size={20} />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={20} />
                      <span>{post.comments}</span>
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
