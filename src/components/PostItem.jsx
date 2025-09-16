import { useState } from 'react';

const PostItem = ({ post, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative group cursor-pointer" onClick={onClick}>
      {!imageLoaded && !imageError && (
        <div className="w-full aspect-square flex items-center justify-center bg-gray-800 rounded-lg">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        </div>
      )}
      {post.photos && post.photos.length > 0 ? (
        <img
          src={post.photos[0]}
          alt={post.title || 'Post image'}
          className={`w-full aspect-square object-cover rounded-lg ${!imageLoaded ? 'hidden' : ''}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
        />
      ) : (
        <div className="w-full aspect-square bg-gray-800 rounded-lg flex items-center justify-center">
          <span className="text-gray-500 text-sm">No image</span>
        </div>
      )}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
        <div className="flex items-center gap-2 sm:gap-4 text-white">
          <div className="flex items-center gap-1">
            <Heart size={16} className="sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">{post.likes || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle size={16} className="sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">{post.comments?.length || 0}</span>
          </div>
        </div>
      </div>
      {post.title && (
        <div className="absolute bottom-1 left-1 right-1 bg-black bg-opacity-70 text-white text-xs p-1 rounded truncate">
          {post.title}
        </div>
      )}
    </div>
  );
};

export default PostItem;
