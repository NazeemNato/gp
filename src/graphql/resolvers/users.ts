import { Resolvers } from "../../generated/graphql";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server-errors";

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

      const { input } = args;
      const { email, fullName, username, password } = input;

      // check if username and email already taken

      const checkUsername = await prisma.users.findUnique({
        where: {
          username,
        },
      });

      const checkEmail = await prisma.users.findUnique({
        where: {
          email,
        },
      });

      if (checkUsername) {
        throw new UserInputError("Username already taken");
      }

      if (checkEmail) {
        throw new UserInputError("Email already taken");
      }

      const saltRounds = 12;
      const hashPassword = await bcrypt.hash(password, saltRounds);

      const user = await prisma.users.create({
        data: {
          email,
          fullName,
          username,
          password: hashPassword,
        },
      });

      const tokenData = {
        userId: user.id,
        username,
      };

      const ac_secret = process.env.JWT_AT || "";
      const accessToken = jwt.sign(tokenData, ac_secret, { expiresIn: "10m" });

      const rc_secret = process.env.JWT_RT || "";
      const refreshToken = jwt.sign(tokenData, rc_secret, { expiresIn: "2h" });

      return {
        accessToken,
        refreshToken,
      };
    },
    loginUser: async (_, args, context) => {
      const { prisma } = context;
      const { username, password } = args;

      const user = await prisma.users.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        throw new UserInputError("Invalid username");
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        throw new UserInputError("Invalid password");
      }

      const tokenData = {
        userId: user.id,
        username,
      };

      const ac_secret = process.env.JWT_AT || "";
      const accessToken = jwt.sign(tokenData, ac_secret, { expiresIn: "10m" });

      const rc_secret = process.env.JWT_RT || "";
      const refreshToken = jwt.sign(tokenData, rc_secret, { expiresIn: "2h" });

      return {
        accessToken,
        refreshToken,
      };
    },
  },
};
