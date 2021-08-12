import {ApolloServer} from "apollo-server";
import {resolvers} from "./graphql/resolvers";
import {schema} from "./graphql/schema";

import { PrismaClient } from "@prisma/client";

const startServer = () => {
    const prisma = new PrismaClient();
    const server = new ApolloServer({
        resolvers,
        typeDefs: schema,
        context: () => {
            return {
                prisma
            }
        }
    });

    const PORT = process.env.PORT || 4000;
    server.listen(PORT, ()=> {
        console.log(`🚀 Server started at http://localhost:${PORT}`)
    })
}

startServer();