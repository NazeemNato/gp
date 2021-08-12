import { Resolvers } from "../../generated/graphql";
import { PrismaClient } from "@prisma/client";
import { ApolloError } from "apollo-server";

const prisma = new PrismaClient();

export const resolvers: Resolvers = {
  Query: {
    hello: () => "Hello World",
    post: async (_, args, __) => {
      const post = await prisma.post.findMany({
        include: {
          author: true,
        },
      });
      return post;
    },
    users: async (_, args, __) => {
      const users = await prisma.users.findMany({
        include: {
          post: true,
        },
      });
      return users;
    },
  },
  Mutation: {
    createUser: async (_, args, __) => {
      const { email, fullName, username, password } = args;
      const user = await prisma.users.create({
        data: {
          email,
          fullName,
          username,
          password,
        },
      });
      return user;
    },
    createPost: async (_, args, __) => {
      const { username, title, body } = args;
      const user = await prisma.users.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        throw new ApolloError("Invalid username");
      }

      const post = await prisma.post.create({
        data: {
          title,
          body,
          authorId: user.id,
        },
      });
      return post;
    },
  },
};
