// Mock user data for demonstration
export const mockUsers = {
  'user1': {
    id: 'user1',
    name: 'Alex Johnson',
    username: '@alexj',
    bio: 'Street photographer & visual storyteller 📸',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    followers: 1250,
    following: 340,
    posts: 89
  },
  'user2': {
    id: 'user2',
    name: 'Sarah Chen',
    username: '@sarahc',
    bio: 'Nature lover & landscape photographer 🌲',
    profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    followers: 890,
    following: 210,
    posts: 156
  },
  'user3': {
    id: 'user3',
    name: 'Mike Rodriguez',
    username: '@mikerod',
    bio: 'Urban explorer & architecture enthusiast 🏙️',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    followers: 2100,
    following: 450,
    posts: 203
  },
  'user4': {
    id: 'user4',
    name: 'Emma Wilson',
    username: '@emmaw',
    bio: 'Portrait photographer & creative director ✨',
    profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    followers: 3200,
    following: 180,
    posts: 127
  },
  'user5': {
    id: 'user5',
    name: 'David Kim',
    username: '@davidk',
    bio: 'Travel photographer & adventure seeker 🌍',
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    followers: 1800,
    following: 290,
    posts: 245
  }
};

// Function to get a random user for posts/comments
export const getRandomUser = () => {
  const userIds = Object.keys(mockUsers);
  const randomId = userIds[Math.floor(Math.random() * userIds.length)];
  return mockUsers[randomId];
};

// Function to get user by ID
export const getUserById = (userId) => {
  return mockUsers[userId] || null;
};

// Function to assign users to existing posts
export const assignUsersToPost = (postId) => {
  const users = Object.values(mockUsers);
  // Use postId to consistently assign the same user to the same post
  const userIndex = (postId - 1) % users.length;
  return users[userIndex];
};
