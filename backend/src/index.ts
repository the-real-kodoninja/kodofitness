import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import * as admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json'; // Download from Firebase Console

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});
export const db = admin.firestore();

const app = express();

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ db }),
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
