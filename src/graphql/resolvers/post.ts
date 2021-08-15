import { ApolloError, ForbiddenError, UserInputError } from "apollo-server";
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
    singlePost: (_, args, context) => {
      const { prisma, authenticated } = context;
      const { id } = args;

      if (!authenticated) {
        throw new ForbiddenError("You don't have permission to view");
      }

      if (!id) {
        throw new UserInputError("Please input post id");
      }

      const post = prisma.post.findUnique({
        where: {
          id,
        },
        include: {
          author: true,
          comments: true,
        },
      });

      if (!post) {
        throw new UserInputError("Invalid post id");
      }

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
    deletePost: async (_,args, context) => {

      const {id} = args
      const {prisma,authenticated} = context

      if(!authenticated){
        throw new ForbiddenError("You don't have  permission to delete")
      }

      const post = await prisma.post.findUnique({
        where: {
          id
        },
        include: {
          author: true
        }
      });

      if(!post){
        throw new UserInputError("Invalid post id")
      }

      if(authenticated?.userId !== post.author.id){
        throw new ForbiddenError("You cant delete")
      }

      await prisma.post.delete({
        where: {
          id
        },
        include: {
          comments: true
        }
      });

      return {
        message: "Successfully deleted"
      }
    }
  },
};
