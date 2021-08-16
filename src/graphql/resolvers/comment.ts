import { ForbiddenError, UserInputError } from "apollo-server";
import { Resolvers } from "../../generated/graphql";

export const comment: Resolvers = {
  Query: {
    comment: async (_, args, context) => {
      const { id } = args;

      const { authenticated, prisma } = context;

      if (!authenticated) {
        throw new ForbiddenError("You don't have permission to view");
      }

      if (!id) {
        throw new UserInputError("Post id can't be empty");
      }

      const hashPost = await prisma.post.findUnique({
        where: {
          id,
        },
      });

      if (!hashPost) {
        throw new UserInputError("Invalid post id");
      }

      const comment = await prisma.comment.findMany({
        where: {
          postId: id,
        },
        include: {
          user: true,
        },
      });

      return comment;
    },
  },

  Mutation: {
    createComment: async (_, args, context) => {
      const { postId, body } = args;

      const { prisma, authenticated } = context;

      if (!authenticated) {
        throw new ForbiddenError("You don't have permission to write comment");
      }

      if (!postId) {
        throw new UserInputError("Post Id can't be empty");
      }

      if (!body) {
        throw new UserInputError("Body can't be empty");
      }

      const hashPost = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      const hasUser = await prisma.users.findUnique({
        where: {
          id: authenticated.userId,
        },
      });

      if (!hasUser) {
        throw new ForbiddenError("Invalid user");
      }

      if (!hashPost) {
        throw new UserInputError("Invalid post id");
      }

      await prisma.comment.create({
        data: {
          body,
          postId,
          userId: authenticated.userId,
        },
      });

      return {
        message: "Comment added",
      };
    },
    deleteComment: async (_, args, context) => {
      const { id } = args;

      const { prisma, authenticated } = context;

      if (!authenticated) {
        throw new ForbiddenError("You don't have permission to view");
      }

      const comment = await prisma.comment.findUnique({
        where: {
          id,
        },
        include: {
          user: true,
        },
      });

      if(authenticated?.userId !== comment?.user.id){
        throw new ForbiddenError("You can't delete")
      }

      await prisma.comment.delete({
        where: {
          id
        }
      });


      return {
        message: "Comment deleted successfully",
      };
    },
  },
};
