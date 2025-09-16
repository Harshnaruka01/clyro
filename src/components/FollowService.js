import { database, auth } from './firebase';
import { ref, set, get, remove, push, onValue, off } from 'firebase/database';

export class FollowService {
  // Follow a user
  static async followUser(currentUserId, targetUserId) {
    try {
      const followingRef = ref(database, `users/${currentUserId}/following/${targetUserId}`);
      const followerRef = ref(database, `users/${targetUserId}/followers/${currentUserId}`);
      
      // Add to current user's following list
      await set(followingRef, {
        timestamp: Date.now(),
        userId: targetUserId
      });
      
      // Add to target user's followers list
      await set(followerRef, {
        timestamp: Date.now(),
        userId: currentUserId
      });
      
      // Update follow counts
      await this.updateFollowCounts(currentUserId);
      await this.updateFollowCounts(targetUserId);
      
      return { success: true };
    } catch (error) {
      console.error('Error following user:', error);
      return { success: false, error: error.message };
    }
  }

  // Unfollow a user
  static async unfollowUser(currentUserId, targetUserId) {
    try {
      const followingRef = ref(database, `users/${currentUserId}/following/${targetUserId}`);
      const followerRef = ref(database, `users/${targetUserId}/followers/${currentUserId}`);
      
      // Remove from current user's following list
      await remove(followingRef);
      
      // Remove from target user's followers list
      await remove(followerRef);
      
      // Update follow counts
      await this.updateFollowCounts(currentUserId);
      await this.updateFollowCounts(targetUserId);
      
      return { success: true };
    } catch (error) {
      console.error('Error unfollowing user:', error);
      return { success: false, error: error.message };
    }
  }

  // Check if current user is following target user
  static async isFollowing(currentUserId, targetUserId) {
    try {
      const followingRef = ref(database, `users/${currentUserId}/following/${targetUserId}`);
      const snapshot = await get(followingRef);
      return snapshot.exists();
    } catch (error) {
      console.error('Error checking follow status:', error);
      return false;
    }
  }

  // Get follower count for a user
  static async getFollowerCount(userId) {
    try {
      const followersRef = ref(database, `users/${userId}/followers`);
      const snapshot = await get(followersRef);
      return snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
    } catch (error) {
      console.error('Error getting follower count:', error);
      return 0;
    }
  }

  // Get following count for a user
  static async getFollowingCount(userId) {
    try {
      const followingRef = ref(database, `users/${userId}/following`);
      const snapshot = await get(followingRef);
      return snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
    } catch (error) {
      console.error('Error getting following count:', error);
      return 0;
    }
  }

  // Update follow counts in user profile
  static async updateFollowCounts(userId) {
    try {
      const followerCount = await this.getFollowerCount(userId);
      const followingCount = await this.getFollowingCount(userId);
      const postCount = await this.getUserPostCount(userId);
      
      const countsRef = ref(database, `users/${userId}/counts`);
      await set(countsRef, {
        followers: followerCount,
        following: followingCount,
        posts: postCount,
        lastUpdated: Date.now()
      });
      
      return { followers: followerCount, following: followingCount, posts: postCount };
    } catch (error) {
      console.error('Error updating follow counts:', error);
      return null;
    }
  }

  // Get user's followers list
  static async getFollowers(userId) {
    try {
      const followersRef = ref(database, `users/${userId}/followers`);
      const snapshot = await get(followersRef);
      
      if (!snapshot.exists()) return [];
      
      const followers = snapshot.val();
      return Object.keys(followers).map(followerId => ({
        userId: followerId,
        timestamp: followers[followerId].timestamp
      }));
    } catch (error) {
      console.error('Error getting followers:', error);
      return [];
    }
  }

  // Get user's following list
  static async getFollowing(userId) {
    try {
      const followingRef = ref(database, `users/${userId}/following`);
      const snapshot = await get(followingRef);
      
      if (!snapshot.exists()) return [];
      
      const following = snapshot.val();
      return Object.keys(following).map(followingId => ({
        userId: followingId,
        timestamp: following[followingId].timestamp
      }));
    } catch (error) {
      console.error('Error getting following:', error);
      return [];
    }
  }

  // Listen to follow count changes
  static subscribeToFollowCounts(userId, callback) {
    const countsRef = ref(database, `users/${userId}/counts`);
    onValue(countsRef, (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.val());
      }
    });
    
    return () => off(countsRef);
  }

  // Get user profile data
  static async getUserProfile(userId) {
    try {
      const userRef = ref(database, `users/${userId}`);
      const snapshot = await get(userRef);
      
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  }

  // Initialize user profile if it doesn't exist
  static async initializeUserProfile(userId, userData) {
    try {
      const userRef = ref(database, `users/${userId}`);
      const snapshot = await get(userRef);
      
      if (!snapshot.exists()) {
        await set(userRef, {
          ...userData,
          counts: {
            followers: 0,
            following: 0,
            posts: 0
          },
          posts: {}, // Initialize empty posts object
          createdAt: Date.now(),
          lastActive: Date.now()
        });
      } else {
        // Update last active time for existing users
        const lastActiveRef = ref(database, `users/${userId}/lastActive`);
        await set(lastActiveRef, Date.now());
      }
      
      return true;
    } catch (error) {
      console.error('Error initializing user profile:', error);
      return false;
    }
  }

  // Add a post to user's profile
  static async addUserPost(userId, postData) {
    try {
      const postId = `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const userPostRef = ref(database, `users/${userId}/posts/${postId}`);
      
      const postInfo = {
        id: postId,
        title: postData.title || 'Untitled',
        photos: postData.photos || [],
        createdAt: Date.now(),
        likes: 0,
        comments: 0
      };
      
      await set(userPostRef, postInfo);
      
      // Update post count
      const currentCount = await this.getUserPostCount(userId);
      const countsRef = ref(database, `users/${userId}/counts/posts`);
      await set(countsRef, currentCount + 1);
      
      return { success: true, postId, postInfo };
    } catch (error) {
      console.error('Error adding user post:', error);
      return { success: false, error: error.message };
    }
  }

  // Get user's posts
  static async getUserPosts(userId) {
    try {
      const postsRef = ref(database, `users/${userId}/posts`);
      const snapshot = await get(postsRef);
      
      if (!snapshot.exists()) return [];
      
      const posts = snapshot.val();
      return Object.values(posts).sort((a, b) => b.createdAt - a.createdAt);
    } catch (error) {
      console.error('Error getting user posts:', error);
      return [];
    }
  }

  // Get user's post count
  static async getUserPostCount(userId) {
    try {
      const postsRef = ref(database, `users/${userId}/posts`);
      const snapshot = await get(postsRef);
      
      if (!snapshot.exists()) return 0;
      
      const posts = snapshot.val();
      return Object.keys(posts).length;
    } catch (error) {
      console.error('Error getting user post count:', error);
      return 0;
    }
  }

  // Update post counts for a user
  static async updatePostCount(userId) {
    try {
      const postCount = await this.getUserPostCount(userId);
      const countsRef = ref(database, `users/${userId}/counts/posts`);
      await set(countsRef, postCount);
      
      return postCount;
    } catch (error) {
      console.error('Error updating post count:', error);
      return 0;
    }
  }
}
