import { Resolvers } from "../../generated/graphql";

import { user } from "./users";
import { post } from "./post";

export const resolvers: Resolvers = {
  Query: {
    hello: () => "Hello World",
    ...post.Query,
    ...user.Query,
  },
  Mutation: {
    ...user.Mutation,
    ...post.Mutation,
  },
};
