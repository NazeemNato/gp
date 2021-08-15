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
    commentCount: Int
    comments: [Comment!]
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
    singlePost(id: Int!): Post
    comment(id: Int!): [Comment!]
  }

  type Authentication {
    accessToken: String!
    refreshToken: String!
  }

  type Response {
    message: String!
  }

  input CreateUserInput {
    fullName: String!
    email: String!
    password: String!
    username: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): Authentication!
    loginUser(username: String!, password: String!): Authentication!
    createPost(body: String!): Response!
    createComment(postId: Int!, body: String!): Response!
    deletePost(id: Int!): Response!
    deleteComment(id: Int!) : Response!
  }
`;
