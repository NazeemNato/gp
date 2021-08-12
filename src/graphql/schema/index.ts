import { gql } from "apollo-server";

export const schema = gql`
  type User {
    id: Int
    fullName: String
    email: String
    username: String
    post: [Post!]
  }

  type Post {
    id: Int
    author: User
    authorId: Int
    title: String
    body: String
  }

  type Query {
    hello: String
    users: [User!]
    post: [Post!]
  }

  type Mutation {
    createUser(
      fullName: String!
      email: String!
      password: String!
      username: String!
    ): User!
    createPost(username: String!, title: String!, body: String!): Post
  }
`;
