import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostsContext';

export default function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { posts } = usePosts();
  const [post, setPost] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoLikes, setPhotoLikes] = useState({});
  const [photoComments, setPhotoComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');

  useEffect(() => {
    // Find the post by ID
    const foundPost = posts.find(p => p.id === parseInt(postId));
    if (foundPost) {
      // If this is the first post (id === 1), set its title to 'lakshya 2k25'
      if (foundPost.id === 1) {
        setPost({ ...foundPost, title: 'lakshya 2k25' });
      } else {
        setPost(foundPost);
      }
    } else {
      // If post not found, redirect to home
      navigate('/');
    }
  }, [postId, navigate, posts]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedPhoto) {
          setSelectedPhoto(null);
        } else {
          navigate('/');
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, selectedPhoto]);

  const handlePhotoLike = (photoIndex) => {
    setPhotoLikes(prev => ({
      ...prev,
      [photoIndex]: !prev[photoIndex]
    }));
  };

  const handlePhotoComment = (photoIndex) => {
    const commentText = commentInputs[photoIndex] || '';
    if (commentText.trim()) {
      const newComment = {
        id: Date.now(),
        text: commentText.trim(),
        author: 'You',
        timestamp: new Date().toLocaleString()
      };
      
      setPhotoComments(prev => ({
        ...prev,
        [photoIndex]: [...(prev[photoIndex] || []), newComment]
      }));
      
      // Clear the input
      setCommentInputs(prev => ({
        ...prev,
        [photoIndex]: ''
      }));
    }
  };

  const handleCommentInputChange = (photoIndex, value) => {
    setCommentInputs(prev => ({
      ...prev,
      [photoIndex]: value
    }));
  };



  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Feed
            </button>
            <div className="flex items-center gap-2">
              {isEditingTitle ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={e => setEditedTitle(e.target.value)}
                  className="text-lg font-semibold px-2 py-1 rounded text-black"
                  autoFocus
                  onBlur={() => setIsEditingTitle(false)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      setPost(prev => ({ ...prev, title: editedTitle }));
                      setIsEditingTitle(false);
                    }
                  }}
                />
              ) : (
                <>
                  <h1 className="text-lg font-semibold text-white">{post.title}</h1>
                  <button
                    className="ml-2 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => {
                      setEditedTitle(post.title);
                      setIsEditingTitle(true);
                    }}
                  >Edit</button>
                </>
              )}
            </div>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Post Info */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">{post.title}</h2>
          <p className="text-gray-300 text-lg">{post.photos.length} photo{post.photos.length !== 1 ? 's' : ''}</p>
        </div>

                 {/* Photos Grid - 3 columns */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {post.photos.map((photo, index) => (
             <div
               key={index}
               className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gray-800"
             >
               <img
                 src={photo}
                 alt={`${post.title} - Photo ${index + 1}`}
                 className="w-full h-80 object-cover transition-opacity duration-300 cursor-pointer"
                 loading="lazy"
                 onClick={() => setSelectedPhoto({ photo, index })}
               />
               
               {/* Photo number overlay */}
               <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-sm font-medium">
                 {index + 1}
               </div>

               {/* Like and Comment Section for each photo */}
               <div className="p-4 bg-gray-800">
                 {/* Like Section */}
                 <div className="flex items-center gap-3 mb-3">
                   <button
                     onClick={(e) => {
                       e.stopPropagation();
                       handlePhotoLike(index);
                     }}
                     className={`flex items-center gap-1 transition-colors ${
                       photoLikes[index] 
                         ? 'text-red-500' 
                         : 'text-gray-300 hover:text-red-500'
                     }`}
                   >
                     <svg 
                       className={`w-5 h-5 ${photoLikes[index] ? 'fill-current' : 'fill-none'}`} 
                       stroke="currentColor" 
                       viewBox="0 0 24 24"
                     >
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                     </svg>
                     <span className="text-sm font-medium">
                       {photoLikes[index] ? 'Liked' : 'Like'}
                     </span>
                   </button>
                   <button
                     onClick={(e) => {
                       e.stopPropagation();
                       // Focus on comment input
                       const input = document.querySelector(`input[data-photo="${index}"]`);
                       if (input) input.focus();
                     }}
                     className="flex items-center gap-1 text-gray-300 hover:text-blue-400 transition-colors"
                   >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                     </svg>
                     <span className="text-sm font-medium">Comment</span>
                   </button>
                 </div>

                 {/* Comment Input */}
                 <div className="flex gap-2">
                   <input
                     type="text"
                     data-photo={index}
                     value={commentInputs[index] || ''}
                     onChange={(e) => handleCommentInputChange(index, e.target.value)}
                     placeholder="Add a comment..."
                     className="flex-1 px-3 py-2 text-sm border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-gray-700 text-white placeholder-gray-400"
                     onClick={(e) => e.stopPropagation()}
                   />
                   <button
                     className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                     disabled={!commentInputs[index] || !commentInputs[index].trim()}
                     onClick={(e) => {
                       e.stopPropagation();
                       handlePhotoComment(index);
                     }}
                   >
                     Post
                   </button>
                 </div>

                 {/* Show existing comments */}
                 {(photoComments[index] || []).length > 0 && (
                   <div className="mt-3 space-y-2">
                     {photoComments[index].map((comment) => (
                       <div key={comment.id} className="text-xs bg-gray-700 p-2 rounded">
                         <div className="flex items-center gap-2 mb-1">
                           <span className="font-medium text-white">{comment.author}</span>
                           <span className="text-gray-400">{comment.timestamp}</span>
                         </div>
                         <p className="text-gray-200">{comment.text}</p>
                       </div>
                     ))}
                   </div>
                 )}
               </div>
             </div>
           ))}
         </div>



                 {/* Full Screen Photo Modal */}
         {selectedPhoto && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black bg-opacity-70">
             <div className="relative max-w-4xl w-full max-h-[90vh]">
               {/* Close button */}
               <button
                 onClick={() => setSelectedPhoto(null)}
                 className="absolute top-4 right-4 z-10 bg-gray-800 bg-opacity-90 text-white p-3 rounded-full hover:bg-opacity-100 transition-colors shadow-lg"
               >
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                 </svg>
               </button>

               {/* Photo counter */}
               <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium">
                 {selectedPhoto.index + 1} / {post.photos.length}
               </div>

               {/* Main Image */}
               <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                 <img
                   src={selectedPhoto.photo}
                   alt={`${post.title} - Photo ${selectedPhoto.index + 1}`}
                   className="w-full h-auto max-h-[80vh] object-contain"
                 />
               </div>
             </div>
           </div>
         )}
      </div>
    </div>
  );
}
