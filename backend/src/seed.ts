import { db } from './index';

async function seedPosts() {
  const posts = [
    {
      username: 'fitninja',
      userPhoto: 'https://via.placeholder.com/40',
      content: 'Crushed a 5K run! 🏃‍♂️',
      media: 'https://via.placeholder.com/300',
      likes: 42,
      comments: 8,
      createdAt: Date.now(),
    },
    // Add more
  ];

  for (const post of posts) {
    await db.collection('posts').add(post);
  }
  console.log('Posts seeded');
}

seedPosts();
