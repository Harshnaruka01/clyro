import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostsContext';

export default function Feed() {
  const navigate = useNavigate();
  const { posts, addPhotosToPost } = usePosts();
  const [imageStates, setImageStates] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Add useEffect for keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedPost) return;
      
      if (e.key === 'Escape') {
        closePhotoViewer();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextPhoto();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevPhoto();
      }
    };

    // Add event listener to document
    document.addEventListener('keydown', handleKeyDown);
    
    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPost, currentPhotoIndex]);

  const handleImageLoad = (postId, photoIndex) => {
    setImageStates((prev) => ({
      ...prev,
      [`${postId}-${photoIndex}`]: { loaded: true, error: false },
    }));
  };

  const handleImageError = (postId, photoIndex) => {
    setImageStates((prev) => ({
      ...prev,
      [`${postId}-${photoIndex}`]: { loaded: false, error: true },
    }));
  };

  const handleImageUpload = (e, postId) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    
    console.log(`Uploading ${files.length} photos to Post ${postId}:`, files.map(f => f.name));
    console.log('New image URLs:', newImages);
    
    addPhotosToPost(postId, newImages);
  };

  const openPhotoViewer = (post) => {
    setSelectedPost(post);
    setCurrentPhotoIndex(0);
  };

  const openPhotoGallery = (post) => {
    setSelectedPost(post);
    setCurrentPhotoIndex(0);
  };

  const closePhotoViewer = () => {
    setSelectedPost(null);
    setCurrentPhotoIndex(0);
  };

  const nextPhoto = () => {
    if (selectedPost && currentPhotoIndex < selectedPost.photos.length - 1) {
      setCurrentPhotoIndex(prev => prev + 1);
    }
  };

  const prevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(prev => prev - 1);
    }
  };

  return (
    <main className="flex-1 p-2 sm:p-4 md:p-6 flex flex-col items-center overflow-y-auto">
      {/* Posts Grid - Improved responsive layout */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 transition-all duration-300 max-w-7xl w-full ${selectedPost ? 'blur-[1px]' : ''}`}>
        {posts.map((post) => {
          const displayTitle = post.id === 1 ? 'lakshya 2k25' : post.title;
          return (
            <div
              key={post.id}
              className="group relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 bg-gray-800 cursor-pointer"
              onClick={() => navigate(`/post/${post.id}`)}
            >
              {/* Show first photo as main image with reduced brightness and scale on hover */}
              <img
                src={post.photos[0]}
                alt={displayTitle}
                className="w-full h-64 sm:h-72 md:h-80 object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-100 brightness-60"
                loading="lazy"
                onLoad={() => handleImageLoad(post.id, 0)}
                onError={() => handleImageError(post.id, 0)}
                style={{ filter: 'brightness(60%)', borderRadius: '0.75rem' }}
              />
              {/* Title overlay at bottom-left, responsive text size */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white font-extrabold text-lg sm:text-xl md:text-2xl drop-shadow pointer-events-none select-none transition-all duration-300 group-hover:text-pink-400 group-hover:scale-105" style={{textShadow: '0 1px 2px rgba(0,0,0,0.4)'}}>
                {displayTitle}
              </div>
              {/* ...existing code for grid preview, upload, etc... */}
              {post.photos.length > 1 && (
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <div className="flex gap-1 overflow-x-auto">
                    {post.photos.slice(0, 4).map((photo, photoIdx) => (
                      <div key={photoIdx} className="flex-shrink-0">
                        <img
                          src={photo}
                          alt={`${displayTitle} photo ${photoIdx + 1}`}
                          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded object-cover border-2 border-gray-300"
                        />
                      </div>
                    ))}
                    {post.photos.length > 4 && (
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gray-800 bg-opacity-90 rounded flex items-center justify-center border-2 border-gray-300">
                        <span className="text-white text-xs font-bold">+{post.photos.length - 4}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* ...existing code for upload button, indicators, etc... */}
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                <label className="cursor-pointer w-8 h-8 sm:w-9 sm:h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-gray-300 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, post.id)}
                  />
                </label>
              </div>
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10 opacity-30 group-hover:opacity-0 transition-opacity duration-300">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-700 text-white rounded-full border-2 border-gray-300 flex items-center justify-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
              {post.photos.length > 1 && (
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 text-white px-2 py-1 rounded-full text-xs font-medium bg-black bg-opacity-50">
                  +{post.photos.length - 1} more
                </div>
              )}
            </div>
        );
      })}
      </div>

      {/* Selected Post Overlay - Mobile-optimized photo viewer */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-[0.5px] bg-black bg-opacity-50">
          <div className="relative max-w-4xl w-full max-h-[95vh] overflow-hidden">
            {/* Close button */}
            <button
              onClick={closePhotoViewer}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 bg-gray-800 bg-opacity-90 text-white p-2 sm:p-3 rounded-full hover:bg-opacity-100 transition-colors shadow-lg"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation arrows - mobile-friendly positioning */}
            {selectedPost.photos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  disabled={currentPhotoIndex === 0}
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-80 text-white p-2 sm:p-3 rounded-full hover:bg-opacity-100 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={nextPhoto}
                  disabled={currentPhotoIndex === selectedPost.photos.length - 1}
                  className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-80 text-white p-2 sm:p-3 rounded-full hover:bg-opacity-100 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Selected post display - mobile-optimized */}
            <div className="bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border border-gray-700 max-h-full flex flex-col">
              <div className="flex-1 flex items-center justify-center min-h-0">
                <img
                  src={selectedPost.photos[currentPhotoIndex]}
                  alt={`${selectedPost.title} - Photo ${currentPhotoIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="p-3 sm:p-4 flex-shrink-0">
                <h3 className="text-base sm:text-lg font-semibold text-white">{selectedPost.id === 1 ? 'lakshya 2k25' : selectedPost.title}</h3>
                <p className="text-sm sm:text-base text-gray-300">{selectedPost.photos.length} photo{selectedPost.photos.length !== 1 ? 's' : ''}</p>
                
                {/* Photo counter - only show if multiple photos */}
                {selectedPost.photos.length > 1 && (
                  <div className="mt-2 text-center">
                    <span className="text-sm text-gray-400">
                      {currentPhotoIndex + 1} / {selectedPost.photos.length}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
