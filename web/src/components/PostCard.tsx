import React from 'react';

interface Post {
  id: string;
  username: string;
  userPhoto: string;
  timeAgo: string;
  content: string;
  media?: string;
  likes: number;
  comments: number;
}

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={post.userPhoto}
            alt="User"
            className="w-10 h-10 rounded-full mr-2"
          />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{post.username}</p>
            <p className="text-sm text-gray-500">{post.timeAgo}</p>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700">⋯</button>
      </div>
      {/* Body */}
      <div className="mt-2">
        <p className="text-gray-900 dark:text-white">{post.content}</p>
        {post.media && (
          <img src={post.media} alt="Media" className="mt-2 rounded-lg w-full" />
        )}
      </div>
      {/* Footer */}
      <div className="flex justify-between mt-2 text-gray-500">
        <button className="flex items-center">
          <span className="mr-1">❤️</span> {post.likes}
        </button>
        <button className="flex items-center">
          <span className="mr-1">💬</span> {post.comments}
        </button>
        <button>↻ Share</button>
      </div>
    </div>
  );
};

export default PostCard;
