import { ApolloError, ForbiddenError } from "apollo-server";
import { Resolvers } from "../../generated/graphql";

export const post: Resolvers = {
  
  Query: {
    post: async (_, args, context) => {
      const { prisma, authenticated } = context;
      if (!authenticated) {
        throw new ForbiddenError("You don't have permission to view");
      }
      const post = await prisma.post.findMany({
        include: {
          author: true,
          comments: {
            include: {
              user: true,
            },
          },
        },
      });
      return post;
    },
  },
  Mutation: {
    createPost: async (_, args, context) => {
      const { prisma, authenticated } = context;

      if (!authenticated) {
        throw new ForbiddenError("You don't have permission to view");
      }

      const { body } = args;
      const user = await prisma.users.findUnique({
        where: {
          username: authenticated?.username,
        },
      });

      if (!user) {
        throw new ApolloError("Invalid username");
      }

      await prisma.post.create({
        data: {
          body,
          authorId: user.id,
        },
      });
      return {
        message: "Post created successfully",
      };
    },
  },
};
