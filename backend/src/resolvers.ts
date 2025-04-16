import { PubSub } from 'graphql-subscriptions';
import { Firestore } from 'firebase-admin/firestore';

const pubsub = new PubSub();

export const resolvers = {
  Query: {
    posts: async (_: any, __: any, { db }: { db: Firestore }) => {
      const snapshot = await db.collection('posts').orderBy('createdAt', 'desc').get();
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timeAgo: new Date(doc.data().createdAt).toLocaleString(), // Simplified
      }));
    },
  },
  Mutation: {
    createPost: async (
      _: any,
      { username, userPhoto, content, media }: any,
      { db }: { db: Firestore }
    ) => {
      const newPost = {
        username,
        userPhoto,
        content,
        media: media || null,
        likes: 0,
        comments: 0,
        createdAt: Date.now(),
      };
      const docRef = await db.collection('posts').add(newPost);
      const doc = await docRef.get();
      const post = { id: doc.id, ...doc.data(), timeAgo: new Date().toLocaleString() };
      pubsub.publish('POST_ADDED', { postAdded: post });
      return post;
    },
  },
  Subscription: {
    postAdded: {
      subscribe: () => pubsub.asyncIterator(['POST_ADDED']),
    },
  },
};
