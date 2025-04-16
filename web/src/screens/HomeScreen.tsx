import React from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { gql } from '@apollo/client';
import PostCard from '../components/PostCard';

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      username
      userPhoto
      timeAgo
      content
      media
      likes
      comments
    }
  }
`;

const POST_ADDED = gql`
  subscription PostAdded {
    postAdded {
      id
      username
      userPhoto
      timeAgo
      content
      media
      likes
      comments
    }
  }
`;

const HomeScreen: React.FC = () => {
  const { data, loading, error } = useQuery(GET_POSTS);
  const { data: subscriptionData } = useSubscription(POST_ADDED);

  const posts = React.useMemo(() => {
    const fetchedPosts = data?.posts || [];
    if (subscriptionData?.postAdded) {
      return [subscriptionData.postAdded, ...fetchedPosts];
    }
    return fetchedPosts;
  }, [data, subscriptionData]);

  if (loading) return <p className="text-center text-gray-900 dark:text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-4">
      <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
        KodoFitness
      </h1>
      <div className="flex flex-col items-center">
        {posts.map((post: any) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
