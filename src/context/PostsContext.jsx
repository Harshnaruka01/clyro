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
      title: "Post 2"
    },
    {
      id: 3,
      photos: ["https://picsum.photos/300/500"],
      title: "Post 3"
    },
    {
      id: 4,
      photos: ["https://picsum.photos/300/450"],
      title: "Post 4"
    },
    {
      id: 5,
      photos: ["https://picsum.photos/300/300"],
      title: "Post 5"
    },
    {
      id: 6,
      photos: ["https://picsum.photos/300/360"],
      title: "Post 6"
    },
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
