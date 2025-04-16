import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Post {
    id: ID!
    username: String!
    userPhoto: String!
    timeAgo: String!
    content: String!
    media: String
    likes: Int!
    comments: Int!
  }

  type Query {
    posts: [Post!]!
  }

  type Mutation {
    createPost(
      username: String!
      userPhoto: String!
      content: String!
      media: String
    ): Post!
  }

  type Subscription {
    postAdded: Post!
  }
`;
