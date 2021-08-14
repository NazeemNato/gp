import { Resolvers } from "../../generated/graphql";

import { user } from "./users";
import { post } from "./post";
import { comment } from "./comment";

export const resolvers: Resolvers = {
  Post: {
    commentCount: (parent) => parent.comments?.length || 0,
  },
  Query: {
    hello: () => "Hello World",
    ...post.Query,
    ...user.Query,
    ...comment.Query,
  },
  Mutation: {
    ...user.Mutation,
    ...post.Mutation,
    ...comment.Mutation,
  },
};
