import { useState, useEffect } from 'react';
import { Camera, Edit3, MapPin, Calendar, Mail, Phone, Globe, Users, UserPlus, UserMinus, X } from 'lucide-react';
import { FollowService } from './FollowService';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostsContext';
import PostItem from './PostItem';

export default function Profile({ profilePicture, setProfilePicture, backgroundPhoto, setBackgroundPhoto, userId, isOwnProfile = true }) {
  const { posts, setPosts } = usePosts();
  const navigate = useNavigate();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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
    followers: 0,
    following: 0,
    posts: 0
  });
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Load user data and initialize follow status
  useEffect(() => {
    let isMounted = true;
    
    const initializeProfile = async () => {
      if (!isMounted) return;
      
      try {
        // Get current user ID
        const user = auth.currentUser;
        if (user) {
          setCurrentUserId(user.uid);
        }

        if (isOwnProfile) {
          if (!user) return;
          
          // Load own profile from localStorage
          const storedUser = localStorage.getItem('user');
          if (!storedUser) return;
          
          try {
            const userData = typeof storedUser === 'string' ? JSON.parse(storedUser) : storedUser;
            const profileInfo = {
              name: userData.name || (userData.email ? userData.email.split('@')[0] : 'User'),
              username: '@' + (userData.name ? userData.name.toLowerCase().replace(/\s+/g, '') : (userData.email ? userData.email.split('@')[0] : 'user')),
              email: userData.email || '',
              phone: userData.contact || '+1 (555) 123-4567'
            };
            
            if (isMounted) {
              setProfileData(prev => ({ ...prev, ...profileInfo }));
            }
            
            // Initialize user profile in Firebase if needed
            if (user && user.uid) {
              await FollowService.initializeUserProfile(user.uid, profileInfo);
              
              // Load real follow counts
              const counts = await FollowService.updateFollowCounts(user.uid);
              if (counts && isMounted) {
                setProfileData(prev => ({
                  ...prev,
                  followers: counts.followers || 0,
                  following: counts.following || 0,
                  posts: counts.posts || 0
                }));
              }
            }
          } catch (error) {
            console.error('Error parsing user data:', error);
            // Handle old string format
            if (typeof storedUser === 'string') {
              const profileInfo = {
                name: storedUser.split('@')[0] || 'User',
                username: '@' + (storedUser.split('@')[0] || 'user'),
                email: storedUser || ''
              };
              if (isMounted) {
                setProfileData(prev => ({ ...prev, ...profileInfo }));
              }
            }
          }
        } else if (userId) {
          // Load other user's profile from Firebase
          const userProfile = await FollowService.getUserProfile(userId);
          if (userProfile && isMounted) {
            setProfileData(prev => ({
              ...prev,
              ...userProfile,
              followers: userProfile.counts?.followers || 0,
              following: userProfile.counts?.following || 0,
              posts: userProfile.counts?.posts || 0
            }));
          }
          
          // Check if current user is following this user
          if (user?.uid && userId !== user.uid) {
            const followStatus = await FollowService.isFollowing(user.uid, userId);
            if (isMounted) {
              setIsFollowing(!!followStatus);
            }
          }
        }
      } catch (error) {
        console.error('Error initializing profile:', error);
      }
    };

    initializeProfile();
    
    return () => {
      isMounted = false;
    };
  }, [userId, isOwnProfile, currentUserId]);

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

  const handleFollowToggle = async () => {
    if (!currentUserId || !userId || followLoading) return;
    
    setFollowLoading(true);
    
    try {
      if (isFollowing) {
        const result = await FollowService.unfollowUser(currentUserId, userId);
        if (result.success) {
          setIsFollowing(false);
          setProfileData(prev => ({
            ...prev,
            followers: Math.max(0, prev.followers - 1)
          }));
        }
      } else {
        const result = await FollowService.followUser(currentUserId, userId);
        if (result.success) {
          setIsFollowing(true);
          setProfileData(prev => ({
            ...prev,
            followers: prev.followers + 1
          }));
        }
      }
    } catch (error) {
      console.error('Error toggling follow status:', error);
    } finally {
      setFollowLoading(false);
    }
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

  const handlePostImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!postContent.trim() && !postImage) return;

    try {
      // Create a unique ID for the post
      const postId = Date.now();
      
      // Create a file reader to handle the image data
      const getImageData = (file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(file);
        });
      };

      // Process the image if one was uploaded
      let imageUrl = '';
      if (postImage) {
        imageUrl = await getImageData(postImage);
      }

      const newPost = {
        id: postId,
        title: postContent.split('\n')[0].substring(0, 30) + (postContent.length > 30 ? '...' : ''),
        photos: imageUrl ? [imageUrl] : [],
        userId: auth.currentUser.uid,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: [],
        content: postContent
      };

      // Add the new post to the beginning of the posts array
      setPosts(prevPosts => [newPost, ...prevPosts]);

      // Reset form
      setPostContent('');
      setPostImage(null);
      setImagePreview(null);
      setShowCreatePost(false);

      // Update the post count in the profile
      setProfileData(prev => ({
        ...prev,
        posts: prev.posts + 1
      }));
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const [userPosts, setUserPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);

  // Filter posts to show only current user's posts
  useEffect(() => {
    if (posts) {
      const userPosts = posts.filter(post => 
        isOwnProfile 
          ? post.userId === auth.currentUser?.uid 
          : post.userId === userId
      );
      setUserPosts(userPosts);
      
      // Update the post count in profile data
      setProfileData(prev => ({
        ...prev,
        posts: userPosts.length
      }));
    }
  }, [posts, currentUserId, userId, isOwnProfile]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header Section - Mobile optimized */}
      <div className="relative">
        {/* Create Post Button - Fixed at top right */}
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={() => setShowCreatePost(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline">Create Post</span>
          </button>
        </div>
        
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
                  {isOwnProfile ? (
                    isEditing ? (
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
                    )
                  ) : (
                    <button
                      onClick={handleFollowToggle}
                      disabled={followLoading}
                      className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                        isFollowing
                          ? 'bg-gray-600 hover:bg-gray-700 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      } ${followLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {followLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : isFollowing ? (
                        <UserMinus size={14} className="sm:w-4 sm:h-4" />
                      ) : (
                        <UserPlus size={14} className="sm:w-4 sm:h-4" />
                      )}
                      <span className="hidden sm:inline">
                        {isFollowing ? 'Unfollow' : 'Follow'}
                      </span>
                      <span className="sm:hidden">
                        {isFollowing ? 'Unfollow' : 'Follow'}
                      </span>
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
            {isOwnProfile ? 'My Posts' : 'Posts'}
          </h2>
          
          {postsLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-400">Loading posts...</span>
            </div>
          ) : userPosts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
              {userPosts.map(post => (
                <PostItem 
                  key={post.id} 
                  post={post}
                  onClick={() => {
                    // Handle post click (e.g., open post detail)
                    console.log('Post clicked:', post.id);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Users size={48} className="mx-auto mb-2 opacity-50" />
                <p className="text-lg">No posts yet</p>
                <p className="text-sm">
                  {isOwnProfile ? 'Start sharing your photos!' : 'This user hasn\'t posted anything yet.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg w-full max-w-md p-6 relative">
            <button 
              onClick={() => setShowCreatePost(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold mb-4">Create Post</h2>
            
            <form onSubmit={handleCreatePost}>
              <div className="mb-4">
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
              </div>
              
              {imagePreview && (
                <div className="mb-4 relative">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPostImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70"
                  >
                    <X size={20} className="text-white" />
                  </button>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <label className="cursor-pointer p-2 rounded-full hover:bg-gray-700">
                  <Camera size={24} className="text-blue-500" />
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handlePostImageChange}
                  />
                </label>
                
                <button
                  type="submit"
                  disabled={!postContent.trim() && !postImage}
                  className={`px-4 py-2 rounded-full font-medium ${
                    (!postContent.trim() && !postImage)
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white`}
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
