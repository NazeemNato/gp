import { Resolvers } from "../../generated/graphql";

export const user: Resolvers = {
  Query: {
    users: async (_, args, context) => {
      const { prisma, token } = context;
      console.log(token);

      const users = await prisma.users.findMany({
        include: {
          post: true,
        },
      });
      return users;
    },
  },
  Mutation: {
    createUser: async (_, args, context) => {
      const { prisma } = context;

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
  },
};
