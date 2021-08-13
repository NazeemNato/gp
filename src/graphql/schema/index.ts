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
    title: String
    body: String
    comment: [Comment!]
  }

  type Comment {
    id: Int
    user: User
    body: String!
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
    createPost(title: String!, body: String!): Post
  }
`;
