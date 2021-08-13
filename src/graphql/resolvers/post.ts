import { ApolloError } from "apollo-server";
import { Resolvers } from "../../generated/graphql";

export const post: Resolvers = {
  Query: {
    post: async (_, args, context) => {
      const { prisma } = context;
      const post = await prisma.post.findMany({
        include: {
          author: true,
          comments: true,
        },
      });
      return post;
    },
  },
  Mutation: {
    createPost: async (_, args, context) => {
      const { prisma, token } = context;

      console.log(token);

      const { body } = args;
      const user = await prisma.users.findUnique({
        where: {
          username: "nazeem",
        },
      });

      if (!user) {
        throw new ApolloError("Invalid username");
      }

      const post = await prisma.post.create({
        data: {
          body,
          authorId: user.id,
        },
      });
      return {
        message:"done"
      };
    },
  },
};
