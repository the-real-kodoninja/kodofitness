import React from 'react';
import PostCard from '../components/PostCard';
import { useState } from 'react';

const dummyPosts = [
  {
    id: '1',
    username: 'fitninja',
    userPhoto: 'https://via.placeholder.com/40',
    timeAgo: '2h ago',
    content: 'Just crushed a 5K run! 🏃‍♂️ Feeling unstoppable.',
    media: 'https://via.placeholder.com/300',
    likes: 42,
    comments: 8,
  },
  // Add more dummy posts
];

const HomeScreen: React.FC = () => {
  const [aiInsight, setAiInsight] = useState('');

  const fetchAiInsight = async () => {
    // Mocked API call
    setAiInsight('Nimbus.ai: Try a 20-min HIIT workout today!');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-4">
      <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
        KodoFitness
      </h1>
      <button
        onClick={fetchAiInsight}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 mx-auto block"
      >
        Get Nimbus.ai Insight
      </button>
      {aiInsight && (
        <p className="text-gray-900 dark:text-white text-center">{aiInsight}</p>
      )}
      <div className="flex flex-col items-center">
        {dummyPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
