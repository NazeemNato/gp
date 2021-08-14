import { ApolloServer } from "apollo-server";
import { resolvers } from "./graphql/resolvers";
import { schema } from "./graphql/schema";

import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { Context } from "./graphql/context";
import { verify } from "./utils/verify";

dotenv.config();

const startServer = () => {
  const prisma = new PrismaClient();
  const server = new ApolloServer({
    resolvers,
    typeDefs: schema,
    context: ({ req }) : Context => {
      const authenticated = verify(req);
      return {
        authenticated,
        prisma
      };
    },
  });

  const PORT = process.env.PORT || 4000;
  server.listen(PORT, () => {
    console.log(`🚀 Server started at http://localhost:${PORT}`);
  });
};

startServer();
