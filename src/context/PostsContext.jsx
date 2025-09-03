import { createContext, useContext, useState } from 'react';

const PostsContext = createContext();

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      photos: ["https://picsum.photos/300/400"],
      title: "Post 1"
    },
    {
      id: 2,
      photos: ["https://picsum.photos/300/350"],
      title: "fresher 2k25"
    },
    {
      id: 3,
      photos: ["https://picsum.photos/300/500"],
      title: "Dandiya Night"
    }
  ]);

  const addPhotosToPost = (postId, newPhotos) => {
    setPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { ...post, photos: [...post.photos, ...newPhotos] }
          : post
      )
    );
  };

  const value = {
    posts,
    setPosts,
    addPhotosToPost
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};
